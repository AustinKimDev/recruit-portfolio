"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { localize, projects, type LocalizedText, type ProjectCategory } from "@/data/projects";
import { useI18n } from "@/i18n/i18n-provider";
import { SectionWrapper } from "./section-wrapper";
import { TiltCard } from "./tilt-card";

type FilterTab = "all" | ProjectCategory;
type ProjectTabKey = "all" | "gis" | "ai" | "backend" | "fullstack" | "infra";

const TABS: { id: FilterTab; labelKey: ProjectTabKey }[] = [
  { id: "all", labelKey: "all" },
  { id: "gis", labelKey: "gis" },
  { id: "ai", labelKey: "ai" },
  { id: "backend", labelKey: "backend" },
  { id: "fullstack", labelKey: "fullstack" },
  { id: "infra", labelKey: "infra" },
];

const tagVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.04 } },
};

const tagItemVariants = {
  hidden: { opacity: 0, y: 6 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" as const } },
};

export function Projects() {
  const [activeTab, setActiveTab] = useState<FilterTab>("all");
  const prefersReducedMotion = useReducedMotion();
  const { locale, t } = useI18n();

  const filtered = projects
    .filter((p) => {
      if (activeTab === "all") return true;
      return p.categories?.includes(activeTab) ?? false;
    })
    .sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)));

  return (
    <SectionWrapper id="projects">
      <div className="mb-7 flex flex-col gap-2">
        <h3 className="section-title">{t.projects.title}</h3>
        <p className="max-w-3xl text-sm leading-6" style={{ color: "var(--text-secondary)" }}>
          {t.projects.body}
        </p>
      </div>

      {/* Filter tabs */}
      <div
        role="tablist"
        aria-label="프로젝트 카테고리 필터"
        className="mb-8 flex flex-wrap gap-1"
      >
        {TABS.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={activeTab === tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={[
              "relative rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
              activeTab === tab.id
                ? "text-accent"
                : "",
            ].join(" ")}
            style={activeTab !== tab.id ? { color: "var(--text-muted)" } : undefined}
          >
            {activeTab === tab.id && (
              <motion.span
                layoutId="tab-indicator"
                className="absolute inset-0 rounded-md bg-accent/10"
                transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
              />
            )}
            <span className="relative z-10">{t.projects.tabs[tab.labelKey]}</span>
            {activeTab === tab.id && (
              <motion.span
                layoutId="tab-underline"
                className="absolute bottom-0 left-3 right-3 h-px bg-accent"
                transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Project grid */}
      <motion.div layout className="grid gap-5 sm:grid-cols-2">
        <AnimatePresence mode="popLayout" initial={false}>
          {filtered.map((p) => (
            <motion.div
              key={localize(p.name, locale)}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <TiltCard
                className="group relative h-full rounded-lg p-5 transition"
                style={{
                  border: "1px solid var(--border)",
                  backgroundColor: "var(--bg-card)",
                }}
              >
                {/* Gradient glow on hover */}
                <div
                  className="pointer-events-none absolute inset-0 rounded-lg opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(168,85,247,0.14), rgba(34,211,238,0.08), rgba(217,70,239,0.10))",
                    boxShadow: "inset 0 0 0 1px color-mix(in srgb, var(--accent) 24%, transparent)",
                  }}
                />

                <div className="relative">
                  <div className="mb-2 flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h4 className="font-bold leading-tight" style={{ color: "var(--text-primary)" }}>
                        {localize(p.name, locale)}
                      </h4>
                      {p.scope && (
                        <p className="mt-1 text-[11px]" style={{ color: "var(--text-muted)" }}>
                          {localize(p.scope, locale)}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      {p.period && (
                        <span className="font-mono text-[11px]" style={{ color: "var(--text-muted)" }}>
                          {p.period}
                        </span>
                      )}
                      {p.isAI && (
                        <span className="rounded-md bg-accent/10 px-2 py-0.5 text-[10px] font-semibold text-accent">
                          AI
                        </span>
                      )}
                    </div>
                  </div>
                  <p className="mb-4 text-sm leading-6" style={{ color: "var(--text-secondary)" }}>
                    {localize(p.summary, locale)}
                  </p>

                  {p.caseStudy && (
                    <dl className="mb-4 space-y-2 text-sm">
                      {([
                        [t.projects.role, p.caseStudy.role],
                        [t.projects.problem, p.caseStudy.challenge],
                        [t.projects.build, p.caseStudy.approach],
                        [t.projects.result, p.caseStudy.outcome],
                      ] satisfies [string, LocalizedText][]).map(([label, value]) => (
                        <div
                          key={label}
                          className="grid grid-cols-[42px_1fr] gap-3 border-t py-2 first:border-t-0 first:pt-0"
                          style={{ borderColor: "var(--border)" }}
                        >
                          <dt className="text-xs font-semibold text-accent">{label}</dt>
                          <dd className="text-xs leading-5" style={{ color: "var(--text-secondary)" }}>
                            {localize(value, locale)}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  )}

                  <ul className="mb-4 space-y-1.5">
                    {p.details.map((d, i) => (
                      <li
                        key={i}
                        className="flex gap-2 text-xs leading-relaxed"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        <span
                          className="mt-2 h-1 w-1 shrink-0 rounded-full"
                          style={{ backgroundColor: "var(--text-muted)" }}
                        />
                        {localize(d, locale)}
                      </li>
                    ))}
                  </ul>

                  {/* Stack tags with stagger */}
                  <motion.div
                    className="flex flex-wrap gap-1.5"
                    variants={prefersReducedMotion ? undefined : tagVariants}
                    initial={prefersReducedMotion ? undefined : "hidden"}
                    whileInView={prefersReducedMotion ? undefined : "visible"}
                    viewport={{ once: true }}
                  >
                    {p.stack.map((s) => (
                      <motion.span
                        key={s}
                        variants={prefersReducedMotion ? undefined : tagItemVariants}
                        className="rounded-md px-2 py-0.5 font-mono text-[11px] transition-colors"
                        style={{
                          backgroundColor: "var(--bg-secondary)",
                          color: "var(--text-muted)",
                        }}
                      >
                        {s}
                      </motion.span>
                    ))}
                  </motion.div>

                  {p.metric && (
                    <p className="mt-3 text-xs font-semibold text-accent">
                      {localize(p.metric, locale)}
                    </p>
                  )}
                  {(p.github || p.link) && (
                    <div className="mt-3 flex gap-2">
                      {p.github && (
                        <a
                          href={p.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-md px-2.5 py-1 text-xs transition"
                          style={{
                            border: "1px solid var(--border)",
                            color: "var(--text-muted)",
                          }}
                        >
                          GitHub -&gt;
                        </a>
                      )}
                      {p.link && (
                        <a
                          href={p.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-md border border-accent/30 bg-accent/10 px-2.5 py-1 text-xs text-accent transition hover:border-accent/60 hover:bg-accent/20"
                        >
                          Live -&gt;
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </SectionWrapper>
  );
}
