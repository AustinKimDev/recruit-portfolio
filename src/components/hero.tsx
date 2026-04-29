"use client";

import { motion, useReducedMotion } from "framer-motion";
import { CyberOrbit } from "@/components/cyber-orbit";
import { profile } from "@/data/profile";
import { useI18n } from "@/i18n/i18n-provider";

export function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const { t } = useI18n();

  return (
    <section
      id="hero"
      className="hero-surface relative flex min-h-[88vh] items-center overflow-hidden px-6 pb-20 pt-28"
    >
      <CyberOrbit />
      <div className="cyber-grid absolute inset-0 z-[1]" aria-hidden="true" />
      <div className="plasma-field absolute inset-0 z-[1]" aria-hidden="true" />
      <div className="hero-space-fade absolute inset-0 z-[2]" aria-hidden="true" />

      <motion.div
        initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 24 }}
        animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className="relative z-10 mx-auto w-full max-w-6xl"
      >
        <div className="max-w-3xl">
          <h1 className="max-w-3xl text-4xl font-black leading-[1.08] tracking-normal sm:text-6xl">
            {t.hero.headline}
          </h1>
          <p
            className="mt-6 max-w-2xl text-base leading-7 sm:text-lg sm:leading-8"
            style={{ color: "var(--text-secondary)" }}
          >
            {t.profile.tagline}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#projects" className="cyber-button">
              {t.hero.primary}
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="cyber-button-secondary"
            >
              {t.hero.secondary}
            </a>
            <a
              href={profile.siteRepo}
              target="_blank"
              rel="noopener noreferrer"
              className="cyber-button-secondary"
            >
              {t.nav.githubRepo}
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
