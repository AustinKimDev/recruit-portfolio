"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { profile } from "@/data/profile";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Parallax: orbs move slower than scroll
  const orb1Y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const orb2Y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const orb3Y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative flex min-h-[80vh] flex-col justify-center overflow-hidden px-6"
    >
      {/* Decorative background orbs */}
      {!prefersReducedMotion && (
        <>
          {/* Primary orb — top right */}
          <motion.div
            aria-hidden="true"
            style={{ y: orb1Y, willChange: "transform" }}
            className="pointer-events-none absolute right-[-10%] top-[-5%] h-[480px] w-[480px] rounded-full bg-accent/10 blur-[120px]"
          />
          {/* Secondary orb — bottom left */}
          <motion.div
            aria-hidden="true"
            style={{ y: orb2Y, willChange: "transform" }}
            className="pointer-events-none absolute bottom-[0%] left-[-15%] h-[360px] w-[360px] rounded-full bg-indigo-500/8 blur-[100px]"
          />
          {/* Accent orb — center right */}
          <motion.div
            aria-hidden="true"
            style={{ y: orb3Y, willChange: "transform" }}
            className="pointer-events-none absolute right-[20%] top-[40%] h-[200px] w-[200px] rounded-full bg-violet-500/6 blur-[80px]"
          />
        </>
      )}

      {/* Content with subtle parallax */}
      <motion.div
        style={prefersReducedMotion ? undefined : { y: contentY, willChange: "transform" }}
        className="relative mx-auto max-w-4xl"
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="mb-3 font-mono text-sm text-accent">안녕하세요,</p>
          <h1
            className="mb-2 text-5xl font-bold tracking-tight sm:text-6xl"
            style={{ color: "var(--text-primary)" }}
          >
            {profile.name}
          </h1>
          <h2
            className="mb-6 text-2xl font-medium sm:text-3xl"
            style={{ color: "var(--text-muted)" }}
          >
            {profile.title}
          </h2>
          <p
            className="mb-8 max-w-2xl text-lg leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            {profile.tagline}
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="/resume"
              target="_blank"
              className="rounded-lg bg-accent px-6 py-3 font-medium text-white transition hover:bg-accent-light"
            >
              이력서 PDF
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg px-6 py-3 font-medium transition"
              style={{
                border: "1px solid var(--border)",
                color: "var(--text-secondary)",
              }}
            >
              GitHub
            </a>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
