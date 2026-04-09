"use client";

import { motion, useReducedMotion } from "framer-motion";

interface SectionWrapperProps {
  id: string;
  children: React.ReactNode;
  className?: string;
}

export function SectionWrapper({ id, children, className = "" }: SectionWrapperProps) {
  const prefersReducedMotion = useReducedMotion();

  const initial = prefersReducedMotion
    ? { opacity: 0 }
    : { opacity: 0, y: 32, scale: 0.96, filter: "blur(4px)" };

  const animate = prefersReducedMotion
    ? { opacity: 1 }
    : { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" };

  return (
    <motion.section
      id={id}
      initial={initial}
      whileInView={animate}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className={`mx-auto max-w-4xl px-6 py-20 ${className}`}
    >
      {children}
    </motion.section>
  );
}
