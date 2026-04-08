import { profile } from "@/data/profile";
import { SectionWrapper } from "./section-wrapper";

export function About() {
  return (
    <SectionWrapper id="about">
      <h3 className="mb-8 text-lg font-semibold text-accent">About</h3>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {profile.stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5 text-center"
          >
            <p className="text-2xl font-bold text-white">{stat.value}</p>
            <p className="mt-1 text-sm text-zinc-400">{stat.label}</p>
          </div>
        ))}
      </div>
      <p className="mt-6 text-sm text-zinc-500">
        Claude Code, GPT 등 AI 도구를 일상 개발 워크플로우에 통합하여 생산성을 극대화합니다.
      </p>
    </SectionWrapper>
  );
}
