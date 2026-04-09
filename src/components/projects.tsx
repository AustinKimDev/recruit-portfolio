"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { projects, type ProjectCategory } from "@/data/projects";
import { SectionWrapper } from "./section-wrapper";
import { TiltCard } from "./tilt-card";

type FilterTab = "all" | ProjectCategory;

const TABS: { id: FilterTab; label: string }[] = [
  { id: "all", label: "전체" },
  { id: "ai", label: "AI" },
  { id: "gis", label: "GIS" },
  { id: "fullstack", label: "풀스택" },
  { id: "infra", label: "인프라" },
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

  const filtered = projects.filter((p) => {
    if (activeTab === "all") return true;
    return p.categories?.includes(activeTab) ?? false;
  });

  return (
    <SectionWrapper id="projects">
      <h3 className="mb-6 text-lg font-semibold text-accent">Projects</h3>

      {/* Filter tabs */}
      <div
        role="tablist"
        aria-label="프로젝트 카테고리 필터"
        className="mb-8 flex gap-1"
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
            <span className="relative z-10">{tab.label}</span>
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
              key={p.name}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <TiltCard
                className="group relative h-full rounded-xl p-5 transition"
                style={{
                  border: "1px solid var(--border)",
                  backgroundColor: "var(--bg-card)",
                }}
              >
                {/* Gradient glow on hover */}
                <div
                  className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    background:
                      "radial-gradient(ellipse at 50% 0%, rgba(99,102,241,0.12) 0%, transparent 70%)",
                    boxShadow: "inset 0 0 0 1px rgba(99,102,241,0.25)",
                  }}
                />

                <div className="relative">
                  <div className="mb-1 flex items-center gap-2">
                    <h4 className="font-bold" style={{ color: "var(--text-primary)" }}>
                      {p.name}
                    </h4>
                    {p.isAI && (
                      <span className="rounded-full bg-accent/20 px-2 py-0.5 text-[10px] font-semibold text-accent">
                        AI
                      </span>
                    )}
                  </div>
                  <p className="mb-3 text-xs" style={{ color: "var(--text-muted)" }}>
                    {p.summary}
                  </p>
                  <ul className="mb-4 space-y-1.5">
                    {p.details.map((d, i) => (
                      <li
                        key={i}
                        className="flex gap-2 text-sm leading-relaxed"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        <span
                          className="mt-2 h-1 w-1 shrink-0 rounded-full"
                          style={{ backgroundColor: "var(--text-muted)" }}
                        />
                        {d}
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
                    <p className="mt-3 text-xs font-medium text-emerald-500">
                      {p.metric}
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
                          GitHub &rarr;
                        </a>
                      )}
                      {p.link && (
                        <a
                          href={p.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-md border border-accent/30 bg-accent/10 px-2.5 py-1 text-xs text-accent transition hover:border-accent/60 hover:bg-accent/20"
                        >
                          Live &rarr;
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
