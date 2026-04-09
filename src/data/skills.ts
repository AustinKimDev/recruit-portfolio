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
      { name: "Next.js", projectCount: "14+", level: "primary" },
      { name: "TypeScript", projectCount: "44", level: "primary" },
      { name: "React Native / Expo", projectCount: "2", level: "secondary" },
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
      { name: "Highcharts / Chart.js", projectCount: "2", level: "secondary" },
      { name: "Recharts", projectCount: "4", level: "secondary" },
      { name: "react-force-graph / React Flow", projectCount: "5", level: "secondary" },
      { name: "Three.js", projectCount: "2", level: "secondary" },
    ],
  },
  {
    name: "Backend",
    items: [
      { name: "Node.js (Express)", projectCount: "3", level: "secondary" },
      { name: "Python (FastAPI)", projectCount: "8", level: "secondary" },
      { name: "C# (ASP.NET Core / WPF)", projectCount: "7", level: "secondary" },
      { name: "Rust (Axum)", projectCount: "1", level: "experience" },
    ],
  },
  {
    name: "Database",
    items: [
      { name: "PostgreSQL / Supabase", projectCount: "6", level: "secondary" },
      { name: "MongoDB", projectCount: "3", level: "secondary" },
      { name: "Elasticsearch", projectCount: "2", level: "experience" },
    ],
  },
  {
    name: "Infra / DevOps",
    items: [
      { name: "Docker / K8s", projectCount: "14", level: "secondary" },
      { name: "Jenkins / GitHub Actions", level: "secondary" },
      { name: "Terraform", level: "experience" },
      { name: "AWS", level: "secondary" },
      { name: "LiveKit / WebRTC", projectCount: "2", level: "experience" },
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
