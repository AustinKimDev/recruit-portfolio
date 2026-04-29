"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import maplibregl, { type GeoJSONSource, type Map as MapLibreMap } from "maplibre-gl";
import { localize, projects } from "@/data/projects";
import { useI18n } from "@/i18n/i18n-provider";
import { useTheme } from "./theme-provider";

const HUB: [number, number] = [126.7, 37.3];
const INITIAL_SELECTED_PROJECT = "Bluebon / Bluebon-prod";
type MappedProject = (typeof projects)[number];
type RouteKind = "base" | "active";
type MarkerRecord = {
  marker: maplibregl.Marker;
  element: HTMLButtonElement;
  project: MappedProject;
};

const categoryColor = {
  gis: "#38bdf8",
  ai: "#a855f7",
  backend: "#f472b6",
  fullstack: "#f59e0b",
  infra: "#94a3b8",
  default: "#c084fc",
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

export function PortfolioMap() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<MapLibreMap | null>(null);
  const markersRef = useRef<Map<string, MarkerRecord>>(new Map());
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
        ],
      },
    });

    map.addControl(new maplibregl.NavigationControl({ showCompass: false }), "top-right");
    map.addControl(new maplibregl.AttributionControl({ compact: true }), "bottom-right");

    mapRef.current = map;
    const markerStore = markersRef.current;

    return () => {
      markerStore.forEach(({ marker }) => marker.remove());
      markerStore.clear();
      map.remove();
      mapRef.current = null;
    };
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    const markerStore = markersRef.current;

    mappedProjects.forEach((project) => {
      const projectName = localize(project.name, "ko");
      if (markerStore.has(projectName)) return;

      const element = document.createElement("button");
      element.type = "button";
      element.className = "portfolio-map-marker";
      element.setAttribute("aria-label", `${projectName} 지도 마커`);
      element.style.setProperty("--marker-color", getProjectColor(project));
      element.dataset.selected = String(INITIAL_SELECTED_PROJECT === projectName);
      element.addEventListener("click", () => setSelectedName(projectName));

      const marker = new maplibregl.Marker({ element, anchor: "center" })
        .setLngLat(project.map!.coordinates)
        .addTo(map);

      markerStore.set(projectName, { marker, element, project });
    });

    return () => {
      markerStore.forEach(({ marker }) => marker.remove());
      markerStore.clear();
    };
  }, [mappedProjects]);

  useEffect(() => {
    markersRef.current.forEach(({ element, project }, projectName) => {
      element.dataset.selected = String(selectedName === projectName);
      element.setAttribute("aria-label", `${localize(project.name, locale)} 지도 마커`);
    });
  }, [locale, selectedName]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !selectedProject) return;

    const updateRoutes = () => {
      const source = map.getSource("routes") as GeoJSONSource | undefined;
      source?.setData(buildRouteGeoJson(localize(selectedProject.name, "ko")));
      const endpointSource = map.getSource("routeEndpoints") as GeoJSONSource | undefined;
      endpointSource?.setData(buildEndpointGeoJson(localize(selectedProject.name, "ko")));
    };

    if (map.isStyleLoaded()) {
      updateRoutes();
    } else {
      map.once("load", updateRoutes);
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
    <section id="map" className="mx-auto max-w-6xl px-6 py-20">
      <div className="mb-7 flex flex-col gap-2">
        <h3 className="section-title">{t.map.title}</h3>
        <p className="max-w-3xl text-sm leading-6" style={{ color: "var(--text-secondary)" }}>
          {t.map.body}
        </p>
      </div>

      <div
        className="cyber-panel grid overflow-hidden rounded-lg lg:grid-cols-[1fr_360px]"
        style={{
          boxShadow: "0 20px 60px rgba(15, 23, 42, 0.10)",
        }}
      >
        <div ref={containerRef} className="h-[520px] min-h-0 lg:h-[680px]" />

        <aside
          className="flex h-[520px] min-h-0 flex-col overflow-y-auto border-t p-4 lg:h-[680px] lg:border-l lg:border-t-0"
          style={{ borderColor: "var(--border)" }}
        >
          <div className="mb-4">
            <p className="font-mono text-[11px]" style={{ color: "var(--text-muted)" }}>
              {selectedProject?.map && localize(selectedProject.map.label, locale)}
            </p>
            <h4 className="mt-1 text-xl font-bold leading-tight" style={{ color: "var(--text-primary)" }}>
              {selectedProject && localize(selectedProject.name, locale)}
            </h4>
            <p className="mt-2 text-sm leading-6" style={{ color: "var(--text-secondary)" }}>
              {selectedProject && localize(selectedProject.summary, locale)}
            </p>
          </div>

          {selectedProject?.map?.note && (
            <p
              className="mb-4 rounded-md px-3 py-2 text-xs leading-5"
              style={{
                backgroundColor: "var(--bg-secondary)",
                color: "var(--text-secondary)",
              }}
            >
              {localize(selectedProject.map.note, locale)}
            </p>
          )}

          {selectedProject?.caseStudy && (
            <dl className="mb-4 space-y-3 text-sm">
              <div>
                <dt className="mb-1 text-xs font-semibold text-accent">{t.map.decision}</dt>
                <dd className="leading-6" style={{ color: "var(--text-secondary)" }}>
                  {localize(selectedProject.caseStudy.approach, locale)}
                </dd>
              </div>
              <div>
                <dt className="mb-1 text-xs font-semibold text-accent">{t.map.result}</dt>
                <dd className="leading-6" style={{ color: "var(--text-secondary)" }}>
                  {localize(selectedProject.caseStudy.outcome, locale)}
                </dd>
              </div>
            </dl>
          )}

          <div className="mt-auto space-y-2">
            {mappedProjects.map((project) => {
              const selected = selectedName === localize(project.name, "ko");
              return (
                <button
                  key={localize(project.name, "ko")}
                  type="button"
                  onClick={() => setSelectedName(localize(project.name, "ko"))}
                  className="flex w-full items-center justify-between gap-3 rounded-md px-3 py-2 text-left text-sm transition"
                  style={{
                    backgroundColor: selected ? "color-mix(in srgb, var(--accent) 12%, transparent)" : "transparent",
                    color: selected ? "var(--text-primary)" : "var(--text-secondary)",
                  }}
                >
                  <span className="truncate">{localize(project.name, locale)}</span>
                  <span
                    className="h-2.5 w-2.5 shrink-0 rounded-full"
                    style={{ backgroundColor: getProjectColor(project) }}
                  />
                </button>
              );
            })}
          </div>
        </aside>
      </div>
    </section>
  );
}
