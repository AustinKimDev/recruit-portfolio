"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import maplibregl, {
  type GeoJSONSource,
  type Map as MapLibreMap,
  type MapLayerMouseEvent,
} from "maplibre-gl";
import { localize, projects, type ProjectCategory } from "@/data/projects";
import { useI18n } from "@/i18n/i18n-provider";
import { useTheme } from "./theme-provider";

const HUB: [number, number] = [126.7, 37.3];
const INITIAL_SELECTED_PROJECT = "Bluebon / Bluebon-prod";
type MappedProject = (typeof projects)[number];
type RouteKind = "base" | "active";

const categoryColor = {
  gis: "#38bdf8",
  ai: "#a855f7",
  backend: "#f472b6",
  fullstack: "#f59e0b",
  infra: "#94a3b8",
  default: "#c084fc",
};

const categoryLabel: Record<ProjectCategory, { ko: string; en: string }> = {
  gis: { ko: "GIS", en: "GIS" },
  ai: { ko: "AI", en: "AI" },
  backend: { ko: "백엔드", en: "Backend" },
  fullstack: { ko: "풀스택", en: "Full-stack" },
  infra: { ko: "인프라", en: "Infra" },
};

function getProjectColor(project: MappedProject) {
  const category = project.categories?.[0] ?? "default";
  return categoryColor[category] ?? categoryColor.default;
}

function sameCoordinate(a: [number, number], b: [number, number]) {
  return Math.abs(a[0] - b[0]) < 0.0001 && Math.abs(a[1] - b[1]) < 0.0001;
}

function buildRouteGeoJson(selectedName: string | null) {
  const visibleProjects = projects.filter((project) => project.map);
  const selectedProject =
    visibleProjects.find((project) => localize(project.name, "ko") === selectedName) ??
    visibleProjects[0];
  const selectedCoordinates = selectedProject?.map?.coordinates;
  const features = visibleProjects
    .filter((project) => !sameCoordinate(project.map!.coordinates, HUB))
    .map((project) => {
      const projectName = localize(project.name, "ko");
      return {
        type: "Feature" as const,
        properties: {
          name: projectName,
          kind: "base" as RouteKind,
        },
        geometry: {
          type: "LineString" as const,
          coordinates: [HUB, project.map!.coordinates],
        },
      };
    });

  if (selectedCoordinates && !sameCoordinate(selectedCoordinates, HUB)) {
    features.push({
      type: "Feature" as const,
      properties: {
        name: localize(selectedProject.name, "ko"),
        kind: "active" as RouteKind,
      },
      geometry: {
        type: "LineString" as const,
        coordinates: [HUB, selectedCoordinates],
      },
    });
  }

  return {
    type: "FeatureCollection" as const,
    features,
  };
}

function buildEndpointGeoJson(selectedName: string | null) {
  const visibleProjects = projects.filter((project) => project.map);
  const selectedProject =
    visibleProjects.find((project) => localize(project.name, "ko") === selectedName) ??
    visibleProjects[0];
  const selectedCoordinates = selectedProject?.map?.coordinates;
  const features = [
    {
      type: "Feature" as const,
      properties: {
        kind: "hub",
      },
      geometry: { type: "Point" as const, coordinates: HUB },
    },
  ];

  if (selectedCoordinates && !sameCoordinate(selectedCoordinates, HUB)) {
    features.push({
      type: "Feature" as const,
      properties: {
        kind: "active",
      },
      geometry: { type: "Point" as const, coordinates: selectedCoordinates },
    });
  }

  return {
    type: "FeatureCollection" as const,
    features,
  };
}

function buildProjectMarkerGeoJson(selectedName: string | null) {
  const visibleProjects = projects.filter((project) => project.map);
  return {
    type: "FeatureCollection" as const,
    features: visibleProjects.map((project) => {
      const projectName = localize(project.name, "ko");
      return {
        type: "Feature" as const,
        properties: {
          name: projectName,
          color: getProjectColor(project),
          selected: selectedName === projectName,
        },
        geometry: {
          type: "Point" as const,
          coordinates: project.map!.coordinates,
        },
      };
    }),
  };
}

export function PortfolioMap() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<MapLibreMap | null>(null);
  const shouldFlyToSelectedRef = useRef(false);
  const [selectedName, setSelectedName] = useState(INITIAL_SELECTED_PROJECT);
  const { locale, t } = useI18n();
  const { theme } = useTheme();

  const mappedProjects = useMemo(
    () => projects.filter((project) => project.map),
    []
  );

  const selectedProject = useMemo(
    () =>
      mappedProjects.find((project) => localize(project.name, "ko") === selectedName) ??
      mappedProjects[0],
    [mappedProjects, selectedName]
  );

  const selectedIndex = Math.max(
    mappedProjects.findIndex((project) => localize(project.name, "ko") === selectedName),
    0
  );
  const selectedColor = selectedProject ? getProjectColor(selectedProject) : categoryColor.default;
  const selectedCategory = selectedProject?.categories?.[0];
  const selectedCategoryText = selectedCategory
    ? categoryLabel[selectedCategory][locale]
    : locale === "ko" ? "프로젝트" : "Project";
  const selectedCoordinatesText = selectedProject?.map
    ? selectedProject.map.coordinates
        .map((coordinate) => coordinate.toFixed(3))
        .join(", ")
    : "-";
  const selectedRoleText = selectedProject?.caseStudy?.role
    ? localize(selectedProject.caseStudy.role, locale)
    : selectedProject?.scope
      ? localize(selectedProject.scope, locale)
      : selectedCategoryText;
  const selectedMetricText = selectedProject?.metric
    ? localize(selectedProject.metric, locale)
    : selectedProject?.map?.note
      ? localize(selectedProject.map.note, locale)
      : "-";
  const selectedScopeText = selectedProject?.scope
    ? localize(selectedProject.scope, locale)
    : selectedCategoryText;

  const selectProject = useCallback((projectName: string) => {
    shouldFlyToSelectedRef.current = true;
    setSelectedName(projectName);
  }, []);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = new maplibregl.Map({
      container: containerRef.current,
      center: [127.12, 37.78],
      zoom: 5.8,
      minZoom: 2.3,
      maxZoom: 15,
      attributionControl: false,
      style: {
        version: 8,
        sources: {
          osm: {
            type: "raster",
            tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
            tileSize: 256,
            attribution: "OpenStreetMap",
          },
          routes: {
            type: "geojson",
            data: buildRouteGeoJson(INITIAL_SELECTED_PROJECT),
          },
          routeEndpoints: {
            type: "geojson",
            data: buildEndpointGeoJson(INITIAL_SELECTED_PROJECT),
          },
          projectMarkers: {
            type: "geojson",
            data: buildProjectMarkerGeoJson(INITIAL_SELECTED_PROJECT),
          },
          hub: {
            type: "geojson",
            data: {
              type: "FeatureCollection",
              features: [
                {
                  type: "Feature",
                  properties: { name: "Project atlas hub" },
                  geometry: { type: "Point", coordinates: HUB },
                },
              ],
            },
          },
        },
        layers: [
          {
            id: "osm",
            type: "raster",
            source: "osm",
            paint: {
              "raster-opacity": 0.26,
              "raster-saturation": -0.85,
              "raster-contrast": 0.22,
            },
          },
          {
            id: "routes-base-line",
            type: "line",
            source: "routes",
            filter: ["==", ["get", "kind"], "base"],
            layout: {
              "line-cap": "round",
              "line-join": "round",
            },
            paint: {
              "line-color": "#c084fc",
              "line-opacity": 0.32,
              "line-width": 1.4,
            },
          },
          {
            id: "routes-active-glow",
            type: "line",
            source: "routes",
            filter: ["==", ["get", "kind"], "active"],
            layout: {
              "line-cap": "round",
              "line-join": "round",
            },
            paint: {
              "line-blur": 5,
              "line-color": "#c084fc",
              "line-opacity": 0.34,
              "line-width": 12,
            },
          },
          {
            id: "routes-active-line",
            type: "line",
            source: "routes",
            filter: ["==", ["get", "kind"], "active"],
            layout: {
              "line-cap": "round",
              "line-join": "round",
            },
            paint: {
              "line-color": "#c084fc",
              "line-opacity": 0.94,
              "line-width": 3.6,
            },
          },
          {
            id: "route-endpoint-halo",
            type: "circle",
            source: "routeEndpoints",
            paint: {
              "circle-radius": ["case", ["==", ["get", "kind"], "active"], 16, 11],
              "circle-color": ["case", ["==", ["get", "kind"], "active"], "#c084fc", "#f0abfc"],
              "circle-opacity": ["case", ["==", ["get", "kind"], "active"], 0.22, 0.18],
            },
          },
          {
            id: "route-endpoint-core",
            type: "circle",
            source: "routeEndpoints",
            paint: {
              "circle-radius": ["case", ["==", ["get", "kind"], "active"], 4, 3],
              "circle-color": ["case", ["==", ["get", "kind"], "active"], "#f0abfc", "#ffffff"],
              "circle-stroke-color": "#a855f7",
              "circle-stroke-width": 2,
            },
          },
          {
            id: "hub-circle",
            type: "circle",
            source: "hub",
            paint: {
              "circle-radius": 7,
              "circle-color": "#f0abfc",
              "circle-stroke-color": "#ffffff",
              "circle-stroke-width": 2,
            },
          },
          {
            id: "project-marker-halo",
            type: "circle",
            source: "projectMarkers",
            paint: {
              "circle-radius": [
                "case",
                ["boolean", ["get", "selected"], false],
                20,
                14,
              ],
              "circle-color": ["get", "color"],
              "circle-opacity": [
                "case",
                ["boolean", ["get", "selected"], false],
                0.3,
                0.18,
              ],
              "circle-blur": 0.18,
            },
          },
          {
            id: "project-marker-ring",
            type: "circle",
            source: "projectMarkers",
            paint: {
              "circle-radius": [
                "case",
                ["boolean", ["get", "selected"], false],
                11,
                9,
              ],
              "circle-color": ["get", "color"],
              "circle-stroke-color": "#ffffff",
              "circle-stroke-width": [
                "case",
                ["boolean", ["get", "selected"], false],
                4,
                3,
              ],
            },
          },
          {
            id: "project-marker-core",
            type: "circle",
            source: "projectMarkers",
            paint: {
              "circle-radius": [
                "case",
                ["boolean", ["get", "selected"], false],
                5,
                4,
              ],
              "circle-color": "#ffffff",
              "circle-opacity": 0.92,
            },
          },
          {
            id: "project-marker-hit",
            type: "circle",
            source: "projectMarkers",
            paint: {
              "circle-radius": 20,
              "circle-color": "#000000",
              "circle-opacity": 0,
            },
          },
        ],
      },
    });

    map.addControl(new maplibregl.NavigationControl({ showCompass: false }), "top-right");
    map.addControl(new maplibregl.AttributionControl({ compact: true }), "bottom-right");

    mapRef.current = map;

    const handleMarkerClick = (event: MapLayerMouseEvent) => {
      const projectName = event.features?.[0]?.properties?.name;
      if (typeof projectName === "string") {
        selectProject(projectName);
      }
    };
    const handleMarkerEnter = () => {
      map.getCanvas().style.cursor = "pointer";
    };
    const handleMarkerLeave = () => {
      map.getCanvas().style.cursor = "";
    };

    map.on("click", "project-marker-hit", handleMarkerClick);
    map.on("mouseenter", "project-marker-hit", handleMarkerEnter);
    map.on("mouseleave", "project-marker-hit", handleMarkerLeave);

    return () => {
      map.off("click", "project-marker-hit", handleMarkerClick);
      map.off("mouseenter", "project-marker-hit", handleMarkerEnter);
      map.off("mouseleave", "project-marker-hit", handleMarkerLeave);
      map.remove();
      mapRef.current = null;
    };
  }, [selectProject]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !selectedProject) return;

    const updateRoutes = () => {
      const source = map.getSource("routes") as GeoJSONSource | undefined;
      source?.setData(buildRouteGeoJson(localize(selectedProject.name, "ko")));
      const endpointSource = map.getSource("routeEndpoints") as GeoJSONSource | undefined;
      endpointSource?.setData(buildEndpointGeoJson(localize(selectedProject.name, "ko")));
      const markerSource = map.getSource("projectMarkers") as GeoJSONSource | undefined;
      markerSource?.setData(buildProjectMarkerGeoJson(localize(selectedProject.name, "ko")));
    };

    if (map.isStyleLoaded()) {
      updateRoutes();
    } else {
      map.once("load", updateRoutes);
    }

    if (shouldFlyToSelectedRef.current && selectedProject.map) {
      shouldFlyToSelectedRef.current = false;
      map.flyTo({
        center: selectedProject.map.coordinates,
        zoom: Math.max(map.getZoom(), 6.4),
        speed: 0.9,
        curve: 1.35,
        essential: true,
      });
    }

  }, [selectedProject]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    const applyThemePaint = () => {
      const isDark = theme === "dark";
      map.setPaintProperty("osm", "raster-opacity", isDark ? 0.26 : 0.58);
      map.setPaintProperty("osm", "raster-saturation", isDark ? -0.85 : -0.35);
      map.setPaintProperty("osm", "raster-contrast", isDark ? 0.22 : -0.08);
      map.setPaintProperty("routes-base-line", "line-color", isDark ? "#c084fc" : "#6d28d9");
      map.setPaintProperty("routes-base-line", "line-opacity", isDark ? 0.32 : 0.3);
      map.setPaintProperty("routes-base-line", "line-width", isDark ? 1.4 : 1.6);
      map.setPaintProperty("routes-active-glow", "line-color", isDark ? "#c084fc" : "#7c3aed");
      map.setPaintProperty("routes-active-glow", "line-opacity", isDark ? 0.34 : 0.26);
      map.setPaintProperty("routes-active-glow", "line-width", isDark ? 12 : 14);
      map.setPaintProperty("routes-active-line", "line-color", isDark ? "#c084fc" : "#6d28d9");
      map.setPaintProperty("routes-active-line", "line-opacity", isDark ? 0.94 : 0.9);
      map.setPaintProperty("routes-active-line", "line-width", isDark ? 3.6 : 4);
      map.setPaintProperty("route-endpoint-halo", "circle-color", [
        "case",
        ["==", ["get", "kind"], "active"],
        isDark ? "#c084fc" : "#7c3aed",
        isDark ? "#f0abfc" : "#6d28d9",
      ]);
      map.setPaintProperty("route-endpoint-halo", "circle-opacity", isDark ? 0.22 : 0.16);
      map.setPaintProperty("route-endpoint-core", "circle-color", [
        "case",
        ["==", ["get", "kind"], "active"],
        isDark ? "#f0abfc" : "#6d28d9",
        "#ffffff",
      ]);
      map.setPaintProperty("route-endpoint-core", "circle-stroke-color", isDark ? "#a855f7" : "#6d28d9");
      map.setPaintProperty("hub-circle", "circle-color", isDark ? "#f0abfc" : "#6d28d9");
    };

    if (map.isStyleLoaded()) {
      applyThemePaint();
    } else {
      map.once("load", applyThemePaint);
    }
  }, [theme]);

  return (
    <section id="map" className="mx-auto max-w-7xl px-6 py-20">
      <div className="mb-7 flex flex-col gap-2">
        <h3 className="section-title">{t.map.title}</h3>
        <p className="max-w-3xl text-sm leading-6" style={{ color: "var(--text-secondary)" }}>
          {t.map.body}
        </p>
      </div>

      <div
        className="cyber-panel grid overflow-hidden rounded-lg lg:grid-cols-[minmax(0,1fr)_430px] xl:grid-cols-[minmax(0,1fr)_460px]"
        style={{
          boxShadow: "0 20px 60px rgba(15, 23, 42, 0.10)",
        }}
      >
        <div ref={containerRef} className="h-[520px] min-h-0 lg:h-[720px]" />

        <aside
          className="atlas-detail-panel flex h-[620px] min-h-0 flex-col overflow-y-auto border-t p-5 lg:h-[720px] lg:border-l lg:border-t-0"
          style={{
            borderColor: "var(--border)",
            "--project-color": selectedColor,
          } as CSSProperties}
        >
          <div className="relative z-10">
            <div className="mb-5 flex items-center justify-between gap-3">
              <span className="atlas-status-chip">
                <span className="atlas-live-dot" />
                {t.map.activeNode} {String(selectedIndex + 1).padStart(2, "0")}
              </span>
              <span className="atlas-route-chip">{t.map.routeLock}</span>
            </div>

            <div className="atlas-hero-card">
              <div className="flex items-start gap-4">
                <div className="atlas-node-orb" aria-hidden="true">
                  <span />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-mono text-[11px]" style={{ color: "var(--text-muted)" }}>
                    {selectedProject?.map && localize(selectedProject.map.label, locale)} / {selectedCategoryText}
                  </p>
                  <h4 className="mt-1 text-2xl font-black leading-tight tracking-normal" style={{ color: "var(--text-primary)" }}>
                    {selectedProject && localize(selectedProject.name, locale)}
                  </h4>
                  <p className="mt-3 text-sm leading-6" style={{ color: "var(--text-secondary)" }}>
                    {selectedProject && localize(selectedProject.summary, locale)}
                  </p>
                </div>
              </div>
            </div>

            <dl className="atlas-meta-grid mt-4">
              <div>
                <dt>{t.map.period}</dt>
                <dd>{selectedProject?.period ?? "-"}</dd>
              </div>
              <div>
                <dt>{t.map.scope}</dt>
                <dd>{selectedScopeText}</dd>
              </div>
              <div>
                <dt>{t.map.coordinates}</dt>
                <dd>{selectedCoordinatesText}</dd>
              </div>
            </dl>

            <dl className="atlas-impact-grid mt-4">
              <div>
                <dt>{t.projects.role}</dt>
                <dd>{selectedRoleText}</dd>
              </div>
              <div>
                <dt>{t.map.metric}</dt>
                <dd>{selectedMetricText}</dd>
              </div>
            </dl>

            <div className="mt-5 space-y-2">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-xs font-bold text-accent">{t.map.nodeList}</p>
                <p className="font-mono text-[10px]" style={{ color: "var(--text-muted)" }}>
                  {mappedProjects.length} nodes
                </p>
              </div>
              {mappedProjects.map((project, index) => {
                const selected = selectedName === localize(project.name, "ko");
                const projectColor = getProjectColor(project);
                const projectCategory = project.categories?.[0];
                return (
                  <button
                    key={localize(project.name, "ko")}
                    type="button"
                    onClick={() => selectProject(localize(project.name, "ko"))}
                    className={`atlas-node-button ${selected ? "is-selected" : ""}`}
                    style={{
                      "--project-color": projectColor,
                    } as CSSProperties}
                  >
                    <span className="atlas-node-index">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate">{localize(project.name, locale)}</span>
                      <span className="mt-0.5 block truncate text-[11px]">
                        {projectCategory ? categoryLabel[projectCategory][locale] : selectedCategoryText}
                        {project.period ? ` / ${project.period}` : ""}
                      </span>
                    </span>
                    <span className="atlas-node-dot" />
                  </button>
                );
              })}
            </div>
          </div>

          {selectedProject?.stack && selectedProject.stack.length > 0 && (
            <div className="relative z-10 mt-5">
              <div className="mb-2 flex items-center justify-between">
                <p className="text-xs font-bold text-accent">{t.map.stack}</p>
                <p className="font-mono text-[10px]" style={{ color: "var(--text-muted)" }}>
                  {selectedProject.stack.length} signals
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {selectedProject.stack.map((stack) => (
                  <span key={stack} className="atlas-stack-chip">
                    {stack}
                  </span>
                ))}
              </div>
            </div>
          )}

          {selectedProject?.caseStudy && (
            <dl className="atlas-case-grid relative z-10 mt-5">
              <div>
                <dt>{t.map.decision}</dt>
                <dd>
                  {localize(selectedProject.caseStudy.approach, locale)}
                </dd>
              </div>
              <div>
                <dt>{t.map.result}</dt>
                <dd>
                  {localize(selectedProject.caseStudy.outcome, locale)}
                </dd>
              </div>
            </dl>
          )}
        </aside>
      </div>
    </section>
  );
}
