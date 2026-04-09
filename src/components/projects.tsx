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
            className="group rounded-xl p-5 transition"
            style={{
              border: "1px solid var(--border)",
              backgroundColor: "var(--bg-card)",
            }}
          >
            <div className="mb-1 flex items-center gap-2">
              <h4
                className="font-bold"
                style={{ color: "var(--text-primary)" }}
              >
                {p.name}
              </h4>
              {p.isAI && (
                <span className="rounded-full bg-accent/20 px-2 py-0.5 text-[10px] font-semibold text-accent">
                  AI
                </span>
              )}
            </div>
            <p
              className="mb-3 text-xs"
              style={{ color: "var(--text-muted)" }}
            >
              {p.summary}
            </p>
            <ul className="mb-4 space-y-1.5">
              {p.details.map((d, i) => (
                <li
                  key={i}
                  className="flex gap-2 text-sm leading-relaxed"
                  style={{ color: "var(--text-secondary)" }}
                >
                  <span
                    className="mt-2 h-1 w-1 shrink-0 rounded-full"
                    style={{ backgroundColor: "var(--text-muted)" }}
                  />
                  {d}
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-1.5">
              {p.stack.map((s) => (
                <span
                  key={s}
                  className="rounded-md px-2 py-0.5 font-mono text-[11px]"
                  style={{
                    backgroundColor: "var(--bg-secondary)",
                    color: "var(--text-muted)",
                  }}
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
                    className="rounded-md px-2.5 py-1 text-xs transition"
                    style={{
                      border: "1px solid var(--border)",
                      color: "var(--text-muted)",
                    }}
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
