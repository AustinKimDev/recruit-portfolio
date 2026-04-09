"use client";

import { motion, useReducedMotion } from "framer-motion";
import { projects } from "@/data/projects";
import { SectionWrapper } from "./section-wrapper";

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

const tagVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.04 } },
};

const tagItemVariants = {
  hidden: { opacity: 0, y: 6 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
};

export function Projects() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <SectionWrapper id="projects">
      <h3 className="mb-10 text-lg font-semibold text-accent">Projects</h3>
      <motion.div
        className="grid gap-5 sm:grid-cols-2"
        variants={prefersReducedMotion ? undefined : containerVariants}
        initial={prefersReducedMotion ? undefined : "hidden"}
        whileInView={prefersReducedMotion ? undefined : "visible"}
        viewport={{ once: true, margin: "-60px" }}
      >
        {projects.map((p) => (
          <motion.div
            key={p.name}
            variants={prefersReducedMotion ? undefined : cardVariants}
            whileHover={
              prefersReducedMotion
                ? undefined
                : { scale: 1.02, transition: { duration: 0.2 } }
            }
            className="group relative rounded-xl p-5 transition"
            style={{
              border: "1px solid var(--border)",
              backgroundColor: "var(--bg-card)",
              willChange: "transform",
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
                <p className="mt-3 text-xs font-medium text-emerald-500">{p.metric}</p>
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
          </motion.div>
        ))}
      </motion.div>
    </SectionWrapper>
  );
}
