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
      className="hero-surface relative flex min-h-[92vh] items-center overflow-hidden px-6 pb-20 pt-32"
    >
      <div className="cyber-grid absolute inset-0" aria-hidden="true" />
      <div className="plasma-field absolute inset-0" aria-hidden="true" />

      <motion.div
        initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 24 }}
        animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className="relative z-10 mx-auto grid w-full max-w-7xl gap-10 lg:grid-cols-[1fr_520px] lg:items-center"
      >
        <div>
          <h1 className="max-w-4xl text-5xl font-black leading-[1.02] tracking-normal sm:text-7xl">
            {t.hero.headline}
          </h1>
          <p
            className="mt-7 max-w-2xl text-lg leading-8"
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

        <div className="relative">
          <div className="orbit-aura absolute inset-x-4 bottom-[-52px] top-10 rounded-lg blur-3xl" aria-hidden="true" />
          <CyberOrbit />
        </div>
      </motion.div>
    </section>
  );
}
