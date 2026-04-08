import { Hero } from "@/components/hero";
import { About } from "@/components/about";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <About />
    </main>
  );
}
