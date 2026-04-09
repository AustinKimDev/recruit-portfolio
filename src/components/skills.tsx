"use client";

import { motion, useReducedMotion } from "framer-motion";
import { skillCategories } from "@/data/skills";
import { SectionWrapper } from "./section-wrapper";

const levelStyle = {
  primary: "border-accent/50 text-accent",
  secondary: "border-zinc-700 text-zinc-300",
  experience: "border-zinc-800 text-zinc-500",
} as const;

const categoryContainerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const categoryVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

const tagContainerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.05, delayChildren: 0.1 },
  },
};

const tagVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.3, ease: "easeOut" } },
};

export function Skills() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <SectionWrapper id="skills">
      <h3 className="mb-10 text-lg font-semibold text-accent">Skills</h3>
      <motion.div
        className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
        variants={prefersReducedMotion ? undefined : categoryContainerVariants}
        initial={prefersReducedMotion ? undefined : "hidden"}
        whileInView={prefersReducedMotion ? undefined : "visible"}
        viewport={{ once: true, margin: "-60px" }}
      >
        {skillCategories.map((cat) => (
          <motion.div
            key={cat.name}
            variants={prefersReducedMotion ? undefined : categoryVariants}
          >
            <h4 className="mb-3 text-sm font-semibold text-zinc-400">{cat.name}</h4>
            <motion.div
              className="flex flex-wrap gap-2"
              variants={prefersReducedMotion ? undefined : tagContainerVariants}
            >
              {cat.items.map((item) => (
                <motion.span
                  key={item.name}
                  variants={prefersReducedMotion ? undefined : tagVariants}
                  className={`rounded-lg border px-3 py-1.5 text-sm ${levelStyle[item.level ?? "secondary"]}`}
                >
                  {item.name}
                  {item.projectCount && (
                    <span className="ml-1 text-xs opacity-60">({item.projectCount})</span>
                  )}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </SectionWrapper>
  );
}
