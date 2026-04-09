import { experiences } from "@/data/experience";
import { SectionWrapper } from "./section-wrapper";

export function Experience() {
  return (
    <SectionWrapper id="experience">
      <h3 className="mb-10 text-lg font-semibold text-accent">Experience</h3>
      <div
        className="relative space-y-10 pl-8"
        style={{ borderLeft: "1px solid var(--border)" }}
      >
        {experiences.map((exp) => (
          <div key={exp.company} className="relative">
            <div
              className="absolute -left-[41px] top-1 h-3 w-3 rounded-full border-2 border-accent"
              style={{ backgroundColor: "var(--bg-primary)" }}
            />
            <div className="mb-1 flex flex-wrap items-baseline gap-x-3">
              <h4
                className="text-xl font-bold"
                style={{ color: "var(--text-primary)" }}
              >
                {exp.company}
              </h4>
              <span
                className="text-sm"
                style={{ color: "var(--text-muted)" }}
              >
                {exp.role}
              </span>
            </div>
            <p
              className="mb-2 font-mono text-xs"
              style={{ color: "var(--text-muted)" }}
            >
              {exp.period}
            </p>
            <p
              className="mb-3 text-sm"
              style={{ color: "var(--text-muted)" }}
            >
              {exp.description}
            </p>
            {exp.highlights.length > 0 && (
              <ul className="space-y-1.5 text-sm" style={{ color: "var(--text-secondary)" }}>
                {exp.highlights.map((h, i) => (
                  <li key={i} className="flex gap-2">
                    <span
                      className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                      style={{ backgroundColor: "var(--text-muted)" }}
                    />
                    {h}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
