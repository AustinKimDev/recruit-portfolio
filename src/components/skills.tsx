"use client";

import { motion, useReducedMotion } from "framer-motion";
import { skillCategories, type SkillItem } from "@/data/skills";
import { localize } from "@/data/projects";
import { useI18n } from "@/i18n/i18n-provider";
import { SectionWrapper } from "./section-wrapper";

const categoryContainerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const categoryVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" as const } },
};

function SkillRow({ item }: { item: SkillItem }) {
  const { locale } = useI18n();

  return (
    <div className="border-t py-3 first:border-t-0 first:pt-0" style={{ borderColor: "var(--border)" }}>
      <div className="mb-1 flex flex-wrap items-center gap-2">
        <span className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
          {item.name}
        </span>
      </div>
      <p className="text-xs leading-5" style={{ color: "var(--text-secondary)" }}>
        {localize(item.evidence, locale)}
      </p>
    </div>
  );
}

export function Skills() {
  const prefersReducedMotion = useReducedMotion();
  const { locale, t } = useI18n();

  return (
    <SectionWrapper id="skills">
      <div className="mb-10 flex flex-col gap-2">
        <h3 className="section-title">{t.skills.title}</h3>
        <p className="max-w-3xl text-sm leading-6" style={{ color: "var(--text-secondary)" }}>
          {t.skills.body}
        </p>
      </div>
      <motion.div
        className="grid gap-5 md:grid-cols-2"
        variants={prefersReducedMotion ? undefined : categoryContainerVariants}
        initial={false}
        whileInView={prefersReducedMotion ? undefined : "visible"}
        viewport={{ once: true, margin: "-60px" }}
      >
        {skillCategories.map((cat) => (
          <motion.div
            key={localize(cat.name, "ko")}
            className="rounded-lg p-5"
            variants={prefersReducedMotion ? undefined : categoryVariants}
            initial={false}
            style={{ border: "1px solid var(--border)", backgroundColor: "var(--bg-card)" }}
          >
            <h4 className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
              {localize(cat.name, locale)}
            </h4>
            <p className="mt-2 min-h-10 text-xs leading-5" style={{ color: "var(--text-muted)" }}>
              {localize(cat.summary, locale)}
            </p>
            <div className="mt-4">
              {cat.items.map((item) => (
                <SkillRow key={item.name} item={item} />
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </SectionWrapper>
  );
}
