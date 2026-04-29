"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useI18n } from "@/i18n/i18n-provider";
import { SectionWrapper } from "./section-wrapper";

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.42, ease: "easeOut" as const } },
};

export function About() {
  const prefersReducedMotion = useReducedMotion();
  const { t } = useI18n();

  return (
    <SectionWrapper id="about" className="max-w-6xl">
      <div className="mb-8 flex flex-col gap-2">
        <h3 className="section-title">{t.about.title}</h3>
        <p className="max-w-3xl text-sm leading-6" style={{ color: "var(--text-secondary)" }}>
          {t.about.body}
        </p>
      </div>

      <p className="mb-3 text-xs font-bold text-accent">{t.about.proofTitle}</p>
      <div className="mb-6 grid gap-3 sm:grid-cols-4">
        {t.profile.stats.map((stat) => (
          <div key={stat.label} className="cyber-panel p-4">
            <p className="text-xs font-semibold leading-5" style={{ color: "var(--text-secondary)" }}>
              {stat.label}
            </p>
            <p className="mt-3 text-2xl font-black text-accent">{stat.value}</p>
            <p className="mt-2 text-xs leading-5" style={{ color: "var(--text-muted)" }}>
              {stat.detail}
            </p>
          </div>
        ))}
      </div>

      <motion.div
        className="grid gap-5 md:grid-cols-3"
        variants={prefersReducedMotion ? undefined : containerVariants}
        initial={false}
        whileInView={prefersReducedMotion ? undefined : "visible"}
        viewport={{ once: true, margin: "-60px" }}
      >
        {t.about.cards.map((item, index) => (
          <motion.div
            key={item.title}
            className="cyber-panel p-5"
            variants={prefersReducedMotion ? undefined : cardVariants}
            initial={false}
          >
            <p className="mb-2 font-mono text-[11px] text-accent">
              {String(index + 1).padStart(2, "0")}
            </p>
            <h4 className="mb-2 text-sm font-semibold">{item.title}</h4>
            <p className="text-sm leading-6" style={{ color: "var(--text-secondary)" }}>
              {item.body}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </SectionWrapper>
  );
}
