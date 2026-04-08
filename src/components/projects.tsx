import { projects } from "@/data/projects";
import { SectionWrapper } from "./section-wrapper";

export function Projects() {
  return (
    <SectionWrapper id="projects">
      <h3 className="mb-10 text-lg font-semibold text-accent">Projects</h3>
      <div className="grid gap-5 sm:grid-cols-2">
        {projects.map((p) => (
          <div
            key={p.name}
            className="group rounded-xl border border-zinc-800 bg-zinc-900/50 p-5 transition hover:border-zinc-700"
          >
            <div className="mb-2 flex items-center gap-2">
              <h4 className="font-bold text-white">{p.name}</h4>
              {p.isAI && (
                <span className="rounded-full bg-accent/20 px-2 py-0.5 text-[10px] font-semibold text-accent">
                  AI
                </span>
              )}
            </div>
            <p className="mb-3 text-sm leading-relaxed text-zinc-400">
              {p.description}
            </p>
            <div className="mb-3 flex flex-wrap gap-1.5">
              {p.stack.map((s) => (
                <span
                  key={s}
                  className="rounded-md bg-zinc-800 px-2 py-0.5 font-mono text-[11px] text-zinc-400"
                >
                  {s}
                </span>
              ))}
            </div>
            <div className="flex gap-4 text-xs text-zinc-500">
              {p.loc && <span>{p.loc} LOC</span>}
              {p.metric && (
                <span className="font-medium text-emerald-500">{p.metric}</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
