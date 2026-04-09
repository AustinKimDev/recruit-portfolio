import { profile } from "@/data/profile";
import { SectionWrapper } from "./section-wrapper";

export function Contact() {
  return (
    <SectionWrapper id="contact" className="pb-8">
      <h3 className="mb-6 text-lg font-semibold text-accent">Contact</h3>
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
