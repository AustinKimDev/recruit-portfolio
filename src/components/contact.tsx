import { profile } from "@/data/profile";
import { SectionWrapper } from "./section-wrapper";

export function Contact() {
  return (
    <SectionWrapper id="contact" className="pb-8">
      <h3 className="mb-6 text-lg font-semibold text-accent">Contact</h3>
      <div className="flex flex-wrap gap-6 text-sm">
        <a
          href={`mailto:${profile.email}`}
          className="text-zinc-300 transition hover:text-white"
        >
          {profile.email}
        </a>
        <a
          href={profile.github}
          target="_blank"
          rel="noopener noreferrer"
          className="text-zinc-300 transition hover:text-white"
        >
          GitHub
        </a>
      </div>
      <div className="mt-16 border-t border-zinc-800 pt-6 text-center">
        <p className="font-mono text-xs text-zinc-600">
          이 사이트는 Claude Code로 제작되었습니다 ✦ 2026
        </p>
      </div>
    </SectionWrapper>
  );
}
