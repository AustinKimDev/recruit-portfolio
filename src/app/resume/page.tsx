"use client";

import { profile } from "@/data/profile";
import { experiences } from "@/data/experience";
import { localize, projects } from "@/data/projects";
import { skillCategories } from "@/data/skills";
import { useI18n } from "@/i18n/i18n-provider";
import "@/styles/print.css";

export default function ResumePage() {
  const { locale, t } = useI18n();

  return (
    <div className="mx-auto max-w-[210mm] bg-white p-8 text-zinc-900 print:p-0">
      {/* Print Button */}
      <button
        onClick={() => window.print()}
        className="no-print mb-6 rounded-lg bg-teal-700 px-4 py-2 text-sm text-white hover:bg-teal-800"
      >
        PDF로 저장 (Ctrl+P)
      </button>

      {/* Header */}
      <header className="mb-6 border-b border-zinc-200 pb-4">
        <h1 className="text-2xl font-bold">{profile.name}</h1>
        <p className="text-sm text-zinc-600">{t.profile.title}</p>
        <div className="mt-2 flex flex-wrap gap-4 text-xs text-zinc-500">
          <span>{profile.email}</span>
          <span>{profile.phone}</span>
          <span>{profile.github}</span>
        </div>
      </header>

      {/* Summary */}
      <section className="mb-5">
        <p className="text-xs leading-relaxed text-zinc-700">{t.profile.tagline}</p>
      </section>

      <section className="mb-5">
        <h2 className="mb-3 border-b border-zinc-200 pb-1 text-sm font-bold">
          핵심 성과
        </h2>
        <ul className="list-inside list-disc space-y-0.5 text-[10px] text-zinc-700">
          {t.profile.impact.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      {/* Experience */}
      <section className="mb-5">
        <h2 className="mb-3 border-b border-zinc-200 pb-1 text-sm font-bold">
          경력
        </h2>
        {experiences.map((exp) => (
          <div key={localize(exp.company, locale)} className="mb-3">
            <div className="flex items-baseline justify-between">
              <span className="text-sm font-semibold">{localize(exp.company, locale)}</span>
              <span className="text-[10px] text-zinc-500">{exp.period}</span>
            </div>
            <p className="text-[10px] text-zinc-500">{localize(exp.role, locale)}</p>
            {exp.projects && exp.projects.length > 0 ? (
              <div className="mt-1 space-y-1">
                {exp.projects.map((project) => (
                  <div key={localize(project.name, locale)} className="border-l border-zinc-200 pl-2 text-[10px]">
                    <div className="flex items-baseline gap-1">
                      <span className="font-semibold text-zinc-800">{localize(project.name, locale)}</span>
                      <span className="text-zinc-400">— {localize(project.scope, locale)}</span>
                    </div>
                    <p className="text-zinc-700">{localize(project.result, locale)}</p>
                    <p className="text-zinc-500">
                      {project.stack.join(", ")} / {project.details.map((detail) => localize(detail, locale)).join(" ")}
                    </p>
                  </div>
                ))}
              </div>
            ) : exp.highlights.length > 0 ? (
              <ul className="mt-1 list-inside list-disc space-y-0.5 text-[10px] text-zinc-700">
                {exp.highlights.map((h, i) => (
                  <li key={i}>{localize(h, locale)}</li>
                ))}
              </ul>
            ) : null}
          </div>
        ))}
      </section>

      {/* Projects */}
      <section className="mb-5">
        <h2 className="mb-3 border-b border-zinc-200 pb-1 text-sm font-bold">
          주요 프로젝트
        </h2>
        <div className="space-y-2">
          {projects
            .filter((p) => p.featured || ["Orgentic", "Comitsu", "Lunchix"].includes(localize(p.name, "ko")))
            .map((p) => (
            <div key={localize(p.name, "ko")} className="text-[10px]">
              <div className="flex items-baseline gap-1">
                <span className="font-semibold">{localize(p.name, locale)}</span>
                {p.isAI && <span className="text-teal-700">[AI]</span>}
                <span className="text-zinc-400">— {localize(p.summary, locale)}</span>
              </div>
              {p.caseStudy && (
                <p className="mt-0.5 text-zinc-600">
                  {t.projects.role}: {localize(p.caseStudy.role, locale)} / {t.projects.result}: {localize(p.caseStudy.outcome, locale)}
                </p>
              )}
              <ul className="mt-0.5 list-inside list-disc space-y-0 text-zinc-600">
                {p.details.slice(0, 2).map((d, i) => (
                  <li key={i}>{localize(d, locale)}</li>
                ))}
              </ul>
              {p.metric && (
                <p className="mt-0.5 text-emerald-700">{t.projects.result}: {localize(p.metric, locale)}</p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section className="mb-5">
        <h2 className="mb-3 border-b border-zinc-200 pb-1 text-sm font-bold">
          기술 스택
        </h2>
        <div className="space-y-1 text-[10px]">
          {skillCategories.map((cat) => (
            <div key={localize(cat.name, locale)} className="flex gap-2">
              <span className="w-24 shrink-0 font-semibold text-zinc-600">
                {localize(cat.name, locale)}
              </span>
              <span className="text-zinc-700">
                {cat.items.map((i) => i.name).join(", ")}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Education */}
      <section className="mb-5">
        <h2 className="mb-3 border-b border-zinc-200 pb-1 text-sm font-bold">
          학력
        </h2>
        <div className="space-y-0.5 text-[10px] text-zinc-700">
          <p>대덕대학교 컴퓨터공학과 졸업 (4.13/4.5) — 2020~2022</p>
          <p>부산컴퓨터과학고등학교 스마트소프트웨어 — 2017~2020</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-200 pt-3 text-center text-[9px] text-zinc-400">
        © 2026 김지동
      </footer>
    </div>
  );
}
