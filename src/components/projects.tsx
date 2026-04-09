"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
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

export function Projects() {
  const [activeTab, setActiveTab] = useState<FilterTab>("all");

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
                : "text-zinc-500 hover:text-zinc-300",
            ].join(" ")}
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
              <TiltCard className="group h-full rounded-xl border border-zinc-800 bg-zinc-900/50 p-5 transition-colors hover:border-zinc-700">
                <div className="mb-1 flex items-center gap-2">
                  <h4 className="font-bold text-white">{p.name}</h4>
                  {p.isAI && (
                    <span className="rounded-full bg-accent/20 px-2 py-0.5 text-[10px] font-semibold text-accent">
                      AI
                    </span>
                  )}
                </div>
                <p className="mb-3 text-xs text-zinc-500">{p.summary}</p>
                <ul className="mb-4 space-y-1.5">
                  {p.details.map((d, i) => (
                    <li
                      key={i}
                      className="flex gap-2 text-sm leading-relaxed text-zinc-300"
                    >
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-zinc-600" />
                      {d}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-1.5">
                  {p.stack.map((s) => (
                    <span
                      key={s}
                      className="rounded-md bg-zinc-800 px-2 py-0.5 font-mono text-[11px] text-zinc-400"
                    >
                      {s}
                    </span>
                  ))}
                </div>
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
                        className="rounded-md border border-zinc-700 px-2.5 py-1 text-xs text-zinc-400 transition hover:border-zinc-500 hover:text-white"
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
              </TiltCard>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </SectionWrapper>
  );
}
