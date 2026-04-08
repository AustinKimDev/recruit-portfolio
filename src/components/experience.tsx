import { experiences } from "@/data/experience";
import { SectionWrapper } from "./section-wrapper";

export function Experience() {
  return (
    <SectionWrapper id="experience">
      <h3 className="mb-10 text-lg font-semibold text-accent">Experience</h3>
      <div className="relative space-y-10 border-l border-zinc-800 pl-8">
        {experiences.map((exp) => (
          <div key={exp.company} className="relative">
            <div className="absolute -left-[41px] top-1 h-3 w-3 rounded-full border-2 border-accent bg-zinc-950" />
            <div className="mb-1 flex flex-wrap items-baseline gap-x-3">
              <h4 className="text-xl font-bold text-white">{exp.company}</h4>
              <span className="text-sm text-zinc-500">{exp.role}</span>
            </div>
            <p className="mb-2 font-mono text-xs text-zinc-600">{exp.period}</p>
            <p className="mb-3 text-sm text-zinc-400">{exp.description}</p>
            {exp.highlights.length > 0 && (
              <ul className="space-y-1.5 text-sm text-zinc-300">
                {exp.highlights.map((h, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-600" />
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
