"use client";

import { motion, useReducedMotion } from "framer-motion";
import { experiences } from "@/data/experience";
import { localize } from "@/data/projects";
import { useI18n } from "@/i18n/i18n-provider";
import { SectionWrapper } from "./section-wrapper";

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -24 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

export function Experience() {
  const prefersReducedMotion = useReducedMotion();
  const { locale, t } = useI18n();

  return (
    <SectionWrapper id="experience">
      <h3 className="section-title mb-10">{t.experience.title}</h3>
      <motion.div
        className="relative space-y-10 pl-8"
        style={{ borderLeft: "1px solid var(--border)" }}
        variants={prefersReducedMotion ? undefined : containerVariants}
        initial={false}
        whileInView={prefersReducedMotion ? undefined : "visible"}
        viewport={{ once: true, margin: "-60px" }}
      >
        {experiences.map((exp) => (
          <motion.div
            key={localize(exp.company, locale)}
            className="relative"
            variants={prefersReducedMotion ? undefined : itemVariants}
            initial={false}
          >
            <div
              className="absolute -left-8 top-1 h-3 w-3 -translate-x-1/2 rounded-full border-2 border-accent-strong"
              style={{
                backgroundColor: "var(--bg-primary)",
                boxShadow: "0 0 0 3px var(--accent-soft)",
              }}
            />
            <div className="mb-1 flex flex-wrap items-baseline gap-x-3">
              <h4
                className="text-xl font-bold"
                style={{ color: "var(--text-primary)" }}
              >
                {localize(exp.company, locale)}
              </h4>
              <span
                className="text-sm"
                style={{ color: "var(--text-muted)" }}
              >
                {localize(exp.role, locale)}
              </span>
            </div>
            <p
              className="mb-2 font-mono text-xs"
              style={{ color: "var(--text-muted)" }}
            >
              {exp.period}
            </p>
            <p
              className="mb-4 text-sm"
              style={{ color: "var(--text-muted)" }}
            >
              {localize(exp.description, locale)}
            </p>
            {exp.projects && exp.projects.length > 0 ? (
              <div className="grid gap-3 sm:grid-cols-2">
                {exp.projects.map((project, index) => (
                  <article
                    key={localize(project.name, locale)}
                    className="group relative overflow-hidden rounded-xl border p-4 transition duration-200 hover:-translate-y-0.5"
                    style={{
                      borderColor: "var(--border)",
                      background: "var(--bg-card)",
                      boxShadow: "var(--panel-shadow)",
                    }}
                  >
                    <div
                      className="absolute inset-x-0 top-0 h-1"
                      style={{ background: "linear-gradient(90deg, var(--accent-strong), var(--accent-vivid))" }}
                    />
                    <div className="mb-3 flex items-start justify-between gap-3">
                      <div>
                        <p
                          className="font-mono text-[11px] font-semibold"
                          style={{ color: "var(--accent-strong)" }}
                        >
                          PROJECT {String(index + 1).padStart(2, "0")}
                        </p>
                        <h5 className="mt-1 text-base font-extrabold" style={{ color: "var(--text-primary)" }}>
                          {localize(project.name, locale)}
                        </h5>
                      </div>
                      <span
                        className="shrink-0 rounded-full px-2 py-1 font-mono text-[10px]"
                        style={{
                          color: "var(--accent-strong)",
                          backgroundColor: "var(--accent-soft)",
                        }}
                      >
                        {project.stack[0]}
                      </span>
                    </div>
                    <p className="text-xs leading-5" style={{ color: "var(--text-muted)" }}>
                      {localize(project.scope, locale)}
                    </p>
                    <p className="mt-3 text-sm font-bold leading-6" style={{ color: "var(--text-primary)" }}>
                      {localize(project.result, locale)}
                    </p>
                    <div className="mt-3 space-y-2">
                      {project.details.map((detail, detailIndex) => (
                        <p
                          key={localize(detail, locale)}
                          className="grid grid-cols-[22px_1fr] gap-2 text-sm leading-6"
                          style={{ color: "var(--text-secondary)" }}
                        >
                          <span
                            className="font-mono text-[11px]"
                            style={{ color: "var(--accent-strong)" }}
                          >
                            {String(detailIndex + 1).padStart(2, "0")}
                          </span>
                          <span>{localize(detail, locale)}</span>
                        </p>
                      ))}
                    </div>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {project.stack.slice(1).map((stack) => (
                        <span
                          key={stack}
                          className="rounded-md border px-2 py-1 font-mono text-[10px]"
                          style={{
                            borderColor: "var(--border)",
                            color: "var(--text-muted)",
                            backgroundColor: "var(--bg-primary)",
                          }}
                        >
                          {stack}
                        </span>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            ) : exp.highlights.length > 0 ? (
              <ul className="space-y-1.5 text-sm" style={{ color: "var(--text-secondary)" }}>
                {exp.highlights.map((h, i) => (
                  <li key={i} className="flex gap-2">
                    <span
                      className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                      style={{ backgroundColor: "var(--text-muted)" }}
                    />
                    {localize(h, locale)}
                  </li>
                ))}
              </ul>
            ) : null}
          </motion.div>
        ))}
      </motion.div>
    </SectionWrapper>
  );
}
