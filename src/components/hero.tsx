"use client";

import { motion } from "framer-motion";
import { profile } from "@/data/profile";

export function Hero() {
  return (
    <section className="flex min-h-[80vh] flex-col justify-center px-6">
      <div className="mx-auto max-w-4xl">
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
      </div>
    </section>
  );
}
