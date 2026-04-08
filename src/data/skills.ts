export interface SkillCategory {
  name: string;
  items: SkillItem[];
}

export interface SkillItem {
  name: string;
  projectCount?: string;
  level?: "primary" | "secondary" | "experience";
}

export const skillCategories: SkillCategory[] = [
  {
    name: "Frontend",
    items: [
      { name: "React", projectCount: "20+", level: "primary" },
      { name: "Next.js", projectCount: "12+", level: "primary" },
      { name: "TypeScript", projectCount: "44", level: "primary" },
      { name: "Remix", projectCount: "3", level: "secondary" },
      { name: "TailwindCSS", level: "primary" },
      { name: "Framer Motion", level: "secondary" },
    ],
  },
  {
    name: "GIS / 지도",
    items: [
      { name: "OpenLayers", projectCount: "5", level: "primary" },
      { name: "Mapbox GL / MapLibre", projectCount: "8", level: "primary" },
      { name: "Leaflet", projectCount: "4", level: "secondary" },
      { name: "KakaoMap", projectCount: "3", level: "secondary" },
    ],
  },
  {
    name: "데이터 시각화",
    items: [
      { name: "Canvas API", projectCount: "9", level: "primary" },
      { name: "Recharts", projectCount: "4", level: "secondary" },
      { name: "react-force-graph", projectCount: "4", level: "secondary" },
      { name: "Three.js", projectCount: "2", level: "secondary" },
    ],
  },
  {
    name: "Backend",
    items: [
      { name: "Python (FastAPI)", projectCount: "8", level: "secondary" },
      { name: "C# (.NET / WPF)", projectCount: "6", level: "secondary" },
      { name: "Rust (Axum)", projectCount: "1", level: "experience" },
    ],
  },
  {
    name: "Infra / DevOps",
    items: [
      { name: "Docker", projectCount: "12", level: "secondary" },
      { name: "Jenkins / GitHub Actions", level: "secondary" },
      { name: "Terraform", level: "experience" },
      { name: "AWS", level: "secondary" },
    ],
  },
  {
    name: "AI Tools",
    items: [
      { name: "Claude Code", level: "primary" },
      { name: "Claude Agent SDK", level: "secondary" },
      { name: "OpenAI API", level: "secondary" },
      { name: "Gemini", level: "experience" },
    ],
  },
];
