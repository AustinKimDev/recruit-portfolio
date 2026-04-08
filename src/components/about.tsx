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
      <p className="mt-6 text-sm text-zinc-300">
        AI 에이전트 플랫폼 설계부터 LLM API 연동, 벡터 검색까지 — AI를 활용한 프로덕트를 직접 만듭니다.
      </p>
    </SectionWrapper>
  );
}
