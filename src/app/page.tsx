import dynamic from "next/dynamic";
import { Hero } from "@/components/hero";
import { Navbar } from "@/components/navbar";

// 폴드 위: Hero, Navbar는 즉시 로드
// 폴드 아래: dynamic import로 lazy loading

function SectionSkeleton() {
  return (
    <div className="py-20 px-4 max-w-4xl mx-auto animate-pulse">
      <div className="h-8 bg-zinc-200 dark:bg-zinc-800 rounded w-48 mb-8" />
      <div className="space-y-4">
        <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-full" />
        <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-5/6" />
        <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-4/6" />
      </div>
    </div>
  );
}

const About = dynamic(
  () => import("@/components/about").then((m) => ({ default: m.About })),
  { loading: () => <SectionSkeleton /> }
);

const Experience = dynamic(
  () =>
    import("@/components/experience").then((m) => ({ default: m.Experience })),
  { loading: () => <SectionSkeleton /> }
);

const Projects = dynamic(
  () => import("@/components/projects").then((m) => ({ default: m.Projects })),
  { loading: () => <SectionSkeleton /> }
);

const Skills = dynamic(
  () => import("@/components/skills").then((m) => ({ default: m.Skills })),
  { loading: () => <SectionSkeleton /> }
);

const Contact = dynamic(
  () => import("@/components/contact").then((m) => ({ default: m.Contact })),
  { loading: () => <SectionSkeleton /> }
);

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Contact />
      </main>
    </>
  );
}
