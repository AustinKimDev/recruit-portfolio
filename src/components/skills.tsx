import { skillCategories } from "@/data/skills";
import { SectionWrapper } from "./section-wrapper";

const levelStyle = {
  primary: "border-accent/50 text-accent",
  secondary: "border-zinc-700 text-zinc-300",
  experience: "border-zinc-800 text-zinc-500",
} as const;

export function Skills() {
  return (
    <SectionWrapper id="skills">
      <h3 className="mb-10 text-lg font-semibold text-accent">Skills</h3>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {skillCategories.map((cat) => (
          <div key={cat.name}>
            <h4 className="mb-3 text-sm font-semibold text-zinc-400">
              {cat.name}
            </h4>
            <div className="flex flex-wrap gap-2">
              {cat.items.map((item) => (
                <span
                  key={item.name}
                  className={`rounded-lg border px-3 py-1.5 text-sm ${levelStyle[item.level ?? "secondary"]}`}
                >
                  {item.name}
                  {item.projectCount && (
                    <span className="ml-1 text-xs opacity-60">
                      ({item.projectCount})
                    </span>
                  )}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
