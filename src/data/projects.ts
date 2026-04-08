export interface Project {
  name: string;
  description: string;
  stack: string[];
  metric?: string;
  loc?: string;
  isAI?: boolean;
  github?: string;
}

export const projects: Project[] = [
  {
    name: "PIXATIVE v1→v2",
    description: "위성영상 GIS 제공 플랫폼. OpenLayers + MapLibre 이중 지도, 좌표계 변환, WMTS 타일 캐시.",
    stack: ["Next.js", "React", "OpenLayers", "MapLibre", "Zustand"],
    metric: "로딩 불가 → 0.2초",
    loc: "~17K",
  },
  {
    name: "Bluebon",
    description: "위성 미션 계획 풀스택 플랫폼. SGP4 궤도 전파, 3D 시각화, 관측 접근성 분석.",
    stack: ["Next.js 15", "Three.js", "Mapbox GL", "Drizzle ORM", "LibSQL"],
    loc: "~25K",
  },
  {
    name: "telepix-ui",
    description: "사내 UI 디자인 시스템. 100+ 디자인 토큰, ESM/CJS 듀얼 번들, Storybook 문서화.",
    stack: ["React", "Radix UI", "TailwindCSS 4", "Rollup", "Storybook v9"],
    loc: "37K",
  },
  {
    name: "LIC 플랫폼",
    description: "지역혁신클러스터 GIS 플랫폼. 5개 항목 실시간 관측소 데이터, AOI 폴리곤, 리포트 시스템.",
    stack: ["Remix v2", "Mapbox GL", "turf.js", "react-pdf"],
    loc: "~11K",
  },
  {
    name: "멀티모달 AI 시각화",
    description: "AI 산출물 파싱 알고리즘 자체 설계(742줄). 지식 그래프 500노드 + 원문 하이라이트 연동.",
    stack: ["React", "react-force-graph", "Canvas API", "MSW"],
    metric: "500노드 시각화",
    isAI: true,
  },
  {
    name: "Orgentic",
    description: "4계층 멀티 테넌트 AI 에이전트 오케스트레이션 플랫폼. 실시간 WebSocket, 태스크 그래프.",
    stack: ["React 19", "FastAPI", "Claude Agent SDK", "@xyflow/react", "WebSocket"],
    loc: "34K",
    isAI: true,
    github: "https://github.com/AustinKimDev/orgentic",
  },
  {
    name: "사내 인프라 구축",
    description: "네트워크(2년+ 무중단), Jenkins CI/CD, Docker Registry, AWS IaC(Terraform) 전면 구축.",
    stack: ["Docker", "Jenkins", "Terraform", "AWS", "Portainer"],
    metric: "1~2일 중단 → 2년+ 무중단",
  },
  {
    name: "신송식당지도 (Lunchix)",
    description: "AI 추천 맛집 지도. OpenAI + pgvector 벡터/공간 하이브리드 검색, 크롤러, 어드민.",
    stack: ["Next.js", "KakaoMap", "OpenAI", "pgvector", "PostGIS"],
    loc: "~19K",
    isAI: true,
  },
];
