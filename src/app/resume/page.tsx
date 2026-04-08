"use client";

import { profile } from "@/data/profile";
import { experiences } from "@/data/experience";
import { projects } from "@/data/projects";
import { skillCategories } from "@/data/skills";
import "@/styles/print.css";

export default function ResumePage() {
  return (
    <div className="mx-auto max-w-[210mm] bg-white p-8 text-zinc-900 print:p-0">
      {/* Print Button */}
      <button
        onClick={() => window.print()}
        className="no-print mb-6 rounded-lg bg-violet-600 px-4 py-2 text-sm text-white hover:bg-violet-700"
      >
        PDF로 저장 (Ctrl+P)
      </button>

      {/* Header */}
      <header className="mb-6 border-b border-zinc-200 pb-4">
        <h1 className="text-2xl font-bold">{profile.name}</h1>
        <p className="text-sm text-zinc-600">{profile.title}</p>
        <div className="mt-2 flex flex-wrap gap-4 text-xs text-zinc-500">
          <span>{profile.email}</span>
          <span>{profile.phone}</span>
          <span>{profile.github}</span>
        </div>
      </header>

      {/* Summary */}
      <section className="mb-5">
        <p className="text-xs leading-relaxed text-zinc-700">{profile.tagline}</p>
      </section>

      {/* Experience */}
      <section className="mb-5">
        <h2 className="mb-3 border-b border-zinc-200 pb-1 text-sm font-bold">
          경력
        </h2>
        {experiences.map((exp) => (
          <div key={exp.company} className="mb-3">
            <div className="flex items-baseline justify-between">
              <span className="text-sm font-semibold">{exp.company}</span>
              <span className="text-[10px] text-zinc-500">{exp.period}</span>
            </div>
            <p className="text-[10px] text-zinc-500">{exp.role}</p>
            {exp.highlights.length > 0 && (
              <ul className="mt-1 list-inside list-disc space-y-0.5 text-[10px] text-zinc-700">
                {exp.highlights.map((h, i) => (
                  <li key={i}>{h}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </section>

      {/* Projects */}
      <section className="mb-5">
        <h2 className="mb-3 border-b border-zinc-200 pb-1 text-sm font-bold">
          주요 프로젝트
        </h2>
        <div className="grid grid-cols-2 gap-2">
          {projects.map((p) => (
            <div key={p.name} className="text-[10px]">
              <span className="font-semibold">{p.name}</span>
              {p.isAI && <span className="ml-1 text-violet-600">[AI]</span>}
              <span className="text-zinc-500"> — {p.stack.slice(0, 3).join(", ")}</span>
              {p.metric && (
                <span className="ml-1 text-emerald-700">({p.metric})</span>
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
            <div key={cat.name} className="flex gap-2">
              <span className="w-24 shrink-0 font-semibold text-zinc-600">
                {cat.name}
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
        Built with Claude Code ✦ 2026
      </footer>
    </div>
  );
}
