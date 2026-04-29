"use client";

import { profile } from "@/data/profile";
import { useI18n } from "@/i18n/i18n-provider";
import { SectionWrapper } from "./section-wrapper";

export function Contact() {
  const { t } = useI18n();

  return (
    <SectionWrapper id="contact" className="pb-8">
      <h3 className="section-title mb-6">{t.contact.title}</h3>
      <div className="flex flex-wrap gap-6 text-sm">
        <a
          href={`mailto:${profile.email}`}
          className="transition"
          style={{ color: "var(--text-secondary)" }}
        >
          {profile.email}
        </a>
        <a
          href={profile.github}
          target="_blank"
          rel="noopener noreferrer"
          className="transition"
          style={{ color: "var(--text-secondary)" }}
        >
          GitHub
        </a>
        <a
          href={profile.siteRepo}
          target="_blank"
          rel="noopener noreferrer"
          className="transition"
          style={{ color: "var(--text-secondary)" }}
        >
          {t.nav.githubRepo}
        </a>
      </div>
      <div
        className="mt-16 pt-6 text-center"
        style={{ borderTop: "1px solid var(--border)" }}
      >
        <p
          className="font-mono text-xs"
          style={{ color: "var(--text-muted)" }}
        >
          © 2026 김지동
        </p>
      </div>
    </SectionWrapper>
  );
}
