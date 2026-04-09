"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useInView } from "framer-motion";
import { profile } from "@/data/profile";
import { SectionWrapper } from "./section-wrapper";

// Parse stat value into prefix, number, suffix
function parseStatValue(value: string): { prefix: string; num: number; suffix: string } {
  const match = value.match(/^([^0-9]*)(\d+)(.*)$/);
  if (!match) return { prefix: "", num: 0, suffix: value };
  return { prefix: match[1], num: parseInt(match[2], 10), suffix: match[3] };
}

function CountUp({ target, duration = 1500 }: { target: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const startedRef = useRef(false);

  useEffect(() => {
    if (!inView || startedRef.current) return;
    startedRef.current = true;

    if (prefersReducedMotion) {
      setCount(target);
      return;
    }

    const startTime = performance.now();
    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOut quad
      const eased = 1 - (1 - progress) * (1 - progress);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, target, duration, prefersReducedMotion]);

  return <span ref={ref}>{count}</span>;
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

export function About() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <SectionWrapper id="about">
      <h3 className="mb-8 text-lg font-semibold text-accent">About</h3>
      <motion.div
        className="grid grid-cols-2 gap-4 sm:grid-cols-4"
        variants={prefersReducedMotion ? undefined : containerVariants}
        initial={prefersReducedMotion ? undefined : "hidden"}
        whileInView={prefersReducedMotion ? undefined : "visible"}
        viewport={{ once: true, margin: "-60px" }}
      >
        {profile.stats.map((stat) => {
          const { prefix, num, suffix } = parseStatValue(stat.value);
          return (
            <motion.div
              key={stat.label}
              variants={prefersReducedMotion ? undefined : cardVariants}
              className="rounded-xl p-5 text-center"
              style={{
                border: "1px solid var(--border)",
                backgroundColor: "var(--bg-card)",
              }}
            >
              <p className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>
                {prefix}
                <CountUp target={num} />
                {suffix}
              </p>
              <p className="mt-1 text-sm" style={{ color: "var(--text-muted)" }}>
                {stat.label}
              </p>
            </motion.div>
          );
        })}
      </motion.div>
      <p className="mt-6 text-sm" style={{ color: "var(--text-secondary)" }}>
        AI 에이전트 플랫폼 설계부터 LLM API 연동, 벡터 검색까지 — AI를 활용한 프로덕트를 직접 만듭니다.
      </p>
    </SectionWrapper>
  );
}
