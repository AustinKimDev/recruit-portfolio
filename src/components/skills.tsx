"use client";

import type React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { skillCategories, type SkillItem } from "@/data/skills";
import { SectionWrapper } from "./section-wrapper";

// Level → bar width (%)
const levelWidth: Record<NonNullable<SkillItem["level"]>, number> = {
  primary: 92,
  secondary: 68,
  experience: 38,
};

// Level → bar color class
const levelBarColor: Record<NonNullable<SkillItem["level"]>, string> = {
  primary: "bg-accent",
  secondary: "",
  experience: "",
};

// Level → label inline color (theme-aware)
const levelTagStyle: Record<NonNullable<SkillItem["level"]>, React.CSSProperties> = {
  primary: { color: "#8b5cf6" },
  secondary: { color: "var(--text-secondary)" },
  experience: { color: "var(--text-muted)" },
};

// Category icon map
const categoryIcon: Record<string, string> = {
  Frontend: "⚛️",
  "GIS / 지도": "🗺️",
  "데이터 시각화": "📊",
  Backend: "⚙️",
  Database: "🗄️",
  "Infra / DevOps": "🐳",
  "AI Tools": "🤖",
};

// Stagger container
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// Bar fill animation
const barVariants = {
  hidden: { width: 0 },
  visible: (targetWidth: number) => ({
    width: `${targetWidth}%`,
    transition: {
      duration: 0.8,
      ease: "easeOut" as const,
    },
  }),
};

// Row fade-in
const rowVariants = {
  hidden: { opacity: 0, x: -8 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.06, duration: 0.4 },
  }),
};

// Card hover elevation
const cardVariants = {
  rest: { y: 0 },
  hover: {
    y: -4,
    transition: { duration: 0.2 },
  },
};

// Category container stagger
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

interface SkillBarProps {
  item: SkillItem;
  index: number;
}

function SkillBar({ item, index }: SkillBarProps) {
  const level = item.level ?? "secondary";
  const targetWidth = levelWidth[level];
  const barColor = levelBarColor[level];
  const tagStyle = levelTagStyle[level];

  return (
    <motion.div className="group relative" custom={index} variants={rowVariants}>
      {/* Skill label row */}
      <div className="mb-1.5 flex items-center justify-between">
        <span className="text-sm font-medium" style={tagStyle}>{item.name}</span>
        {item.projectCount && (
          <span className="text-xs tabular-nums" style={{ color: "var(--text-muted)" }}>
            {item.projectCount} projects
          </span>
        )}
      </div>

      {/* Progress bar track */}
      <div className="relative h-1.5 w-full overflow-hidden rounded-full" style={{ backgroundColor: "var(--bg-secondary)" }}>
        <motion.div
          className={`absolute left-0 top-0 h-full rounded-full ${barColor}`}
          style={
            level === "secondary"
              ? { backgroundColor: "var(--text-muted)" }
              : level === "experience"
              ? { backgroundColor: "var(--border)" }
              : undefined
          }
          custom={targetWidth}
          variants={barVariants}
          role="progressbar"
          aria-valuenow={targetWidth}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`${item.name} proficiency`}
        />
      </div>
    </motion.div>
  );
}

interface CategoryCardProps {
  name: string;
  items: SkillItem[];
  prefersReducedMotion: boolean | null;
}

function CategoryCard({ name, items, prefersReducedMotion }: CategoryCardProps) {
  const icon = categoryIcon[name] ?? "💡";

  return (
    <motion.div
      className="rounded-xl p-5 backdrop-blur-sm"
      style={{ border: "1px solid var(--border)", backgroundColor: "var(--bg-card)" }}
      variants={prefersReducedMotion ? undefined : cardVariants}
      initial="rest"
      whileHover={prefersReducedMotion ? undefined : "hover"}
    >
      {/* Card header */}
      <div className="mb-4 flex items-center gap-2">
        <span className="text-xl leading-none" aria-hidden="true">
          {icon}
        </span>
        <h4 className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>{name}</h4>
      </div>

      {/* Skill bars with stagger, animate on scroll */}
      <motion.div
        className="flex flex-col gap-3"
        variants={prefersReducedMotion ? undefined : containerVariants}
        initial={prefersReducedMotion ? undefined : "hidden"}
        whileInView={prefersReducedMotion ? undefined : "visible"}
        viewport={{ once: true, margin: "-60px" }}
      >
        {items.map((item, i) => (
          <SkillBar key={item.name} item={item} index={i} />
        ))}
      </motion.div>
    </motion.div>
  );
}

export function Skills() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <SectionWrapper id="skills">
      <h3 className="mb-10 text-lg font-semibold text-accent">Skills</h3>
      <motion.div
        className="grid gap-5 sm:grid-cols-2"
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
            <CategoryCard name={cat.name} items={cat.items} prefersReducedMotion={prefersReducedMotion} />
          </motion.div>
        ))}
      </motion.div>
    </SectionWrapper>
  );
}
