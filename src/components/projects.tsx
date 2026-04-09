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
            <div className="mb-1 flex items-center gap-2">
              <h4 className="font-bold text-white">{p.name}</h4>
              {p.isAI && (
                <span className="rounded-full bg-accent/20 px-2 py-0.5 text-[10px] font-semibold text-accent">
                  AI
                </span>
              )}
            </div>
            <p className="mb-3 text-xs text-zinc-500">{p.summary}</p>
            <ul className="mb-4 space-y-1.5">
              {p.details.map((d, i) => (
                <li key={i} className="flex gap-2 text-sm leading-relaxed text-zinc-300">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-zinc-600" />
                  {d}
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-1.5">
              {p.stack.map((s) => (
                <span
                  key={s}
                  className="rounded-md bg-zinc-800 px-2 py-0.5 font-mono text-[11px] text-zinc-400"
                >
                  {s}
                </span>
              ))}
            </div>
            {p.metric && (
              <p className="mt-3 text-xs font-medium text-emerald-500">
                {p.metric}
              </p>
            )}
            {(p.github || p.link) && (
              <div className="mt-3 flex gap-2">
                {p.github && (
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-md border border-zinc-700 px-2.5 py-1 text-xs text-zinc-400 transition hover:border-zinc-500 hover:text-white"
                  >
                    GitHub &rarr;
                  </a>
                )}
                {p.link && (
                  <a
                    href={p.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-md border border-accent/30 bg-accent/10 px-2.5 py-1 text-xs text-accent transition hover:border-accent/60 hover:bg-accent/20"
                  >
                    Live &rarr;
                  </a>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
