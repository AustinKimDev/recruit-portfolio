import type { Locale } from "@/i18n/content";
import { localize, type LocalizedText } from "./projects";

export interface SkillCategory {
  name: LocalizedText;
  summary: LocalizedText;
  items: SkillItem[];
}

export interface SkillItem {
  name: string;
  evidence: LocalizedText;
}

const lt = (ko: string, en: string): LocalizedText => ({ ko, en });

export const skillCategories: SkillCategory[] = [
  {
    name: lt("Frontend", "Frontend"),
    summary: lt("React/Next.js 중심으로 지도, 대시보드, 운영툴을 반복적으로 만들었습니다.", "Built map, dashboard, and operations tools mostly with React and Next.js."),
    items: [
      { name: "React", evidence: lt("지도/대시보드/AI UI 대부분의 기본 런타임", "Primary runtime for map, dashboard, and AI interfaces") },
      { name: "Next.js", evidence: lt("App Router, Route Handler, 인증/배포 포함 풀스택 사용", "App Router, Route Handlers, auth, and deployment-aware full-stack flows") },
      { name: "TypeScript", evidence: lt("데이터 모델, API 타입, 지도 레이어 상태 관리", "Data models, API types, and map layer state management") },
      { name: "Remix", evidence: lt("LIC 플랫폼 SSR, 리포트/지도 운영 화면", "SSR operations UI for LIC map/report workflows") },
      { name: "TailwindCSS / Radix UI", evidence: lt("telepix-ui 디자인 시스템과 제품 UI 표준화", "Design system and reusable product UI") },
    ],
  },
  {
    name: lt("GIS / Map", "GIS / Map"),
    summary: lt("단순 지도 표시보다 좌표계, 타일, 레이어, 대용량 마커 문제를 많이 다뤘습니다.", "Worked beyond basic maps: CRS, tiles, layers, AOI, and marker-heavy workflows."),
    items: [
      { name: "OpenLayers", evidence: lt("WMTS/WMS, proj4 좌표계 변환, 위성영상 정합", "WMTS/WMS, proj4 CRS transforms, satellite imagery alignment") },
      { name: "Mapbox GL / MapLibre", evidence: lt("AOI, 마커/레이어, 미션 계획, 이 사이트의 Project Atlas", "AOI, markers/layers, mission planning, and this Project Atlas") },
      { name: "Leaflet", evidence: lt("선박탐지 PoC, AIS 마커 회전, VWorld 위성타일", "Ship detection PoC, AIS rotated markers, VWorld satellite tiles") },
      { name: "turf.js / PostGIS", evidence: lt("AOI 폴리곤 계산, 위치 기반 추천/거리 정렬", "AOI polygon calculation, spatial recommendations, distance ranking") },
    ],
  },
  {
    name: lt("Visualization", "Visualization"),
    summary: lt("AI 산출물, 금융 데이터, 위성 궤도처럼 읽기 어려운 데이터를 화면으로 풀었습니다.", "Turned hard-to-read outputs like AI files, financial data, and orbits into usable interfaces."),
    items: [
      { name: "Canvas API", evidence: lt("커스텀 그래프 렌더링, 이미지 필터, 차트 구현", "Custom graph rendering, image filters, chart rendering") },
      { name: "react-force-graph / @xyflow", evidence: lt("500노드 지식그래프, AI 에이전트 태스크 그래프", "500-node knowledge graphs and AI agent task graphs") },
      { name: "Three.js", evidence: lt("지구/위성 3D 궤도, 이 사이트의 3D 히어로", "3D Earth/orbit views and this site's 3D hero") },
      { name: "Recharts / Chart.js", evidence: lt("운영 대시보드, 트렌드/금융 차트", "Operations dashboards, trend and finance charts") },
    ],
  },
  {
    name: lt("Backend / Data", "Backend / Data"),
    summary: lt("프론트엔드에 필요한 API, DB, 인증 흐름은 직접 설계하고 검증합니다.", "I design and validate the API, data, and auth flows frontend products depend on."),
    items: [
      { name: "FastAPI / Flask", evidence: lt("AI 연동, 크롤러, 프록시 API, 에이전트 백엔드", "AI integrations, crawlers, proxy APIs, agent backends") },
      { name: "C# / ASP.NET Core", evidence: lt("Comitsu Clean Architecture API, WPF 카메라 프로그램", "Comitsu Clean Architecture API and WPF camera tools") },
      { name: "Node.js", evidence: lt("Fruiting 증권 플랫폼 장기 유지보수와 결제/알림 흐름", "Long-term Fruiting maintenance with payment and notification flows") },
      { name: "PostgreSQL", evidence: lt("pgvector, PostGIS, Prisma/EF 연동 프로젝트", "pgvector, PostGIS, Prisma, and EF-backed projects") },
    ],
  },
  {
    name: lt("Infra / Streaming", "Infra / Streaming"),
    summary: lt("개발 환경, 배포 병목, 방송 인프라를 직접 해결한 경험이 강점입니다.", "I have directly handled deployment bottlenecks, network issues, and live streaming infrastructure."),
    items: [
      { name: "Docker / K8s", evidence: lt("앱 배포, 스트리밍 서버, 백엔드 운영 환경", "App deployments, streaming servers, backend runtime environments") },
      { name: "LiveKit / HLS / FFmpeg", evidence: lt("방송 송출과 시청 경로 분리, 트랜스코딩 파이프라인", "Separated broadcast and viewer paths with transcoding pipelines") },
      { name: "Nginx / CloudFront", evidence: lt("라이브 스트림 프록시와 CDN 배포 경로", "Live stream proxying and CDN delivery paths") },
      { name: "Jenkins / AWS / Terraform", evidence: lt("사내 자율 배포 파이프라인과 IaC 운영", "Internal deployment pipelines and IaC operations") },
    ],
  },
  {
    name: lt("AI Product", "AI Product"),
    summary: lt("AI API를 붙이는 수준을 넘어 결과를 검증하고 사람이 쓰는 UI로 만드는 데 초점을 둡니다.", "I focus on validating AI output and turning it into human-usable workflows, not just calling APIs."),
    items: [
      { name: "Claude Code / Agent SDK", evidence: lt("멀티 에이전트 작업 흐름, task graph, worktree 운영 실험", "Multi-agent workflows, task graphs, and worktree operations") },
      { name: "OpenAI / Gemini", evidence: lt("추천, 생성, 분석 워크플로우와 스트리밍 UI", "Recommendation, generation, analysis workflows, and streaming UI") },
      { name: "pgvector / RAG", evidence: lt("식당 추천과 의미 기반 검색 실험", "Restaurant recommendation and semantic search experiments") },
      { name: "AI output parsing", evidence: lt("LTF/Graph/Entity 결과를 FE에서 직접 구조화", "Structured LTF/Graph/Entity outputs directly in the frontend") },
    ],
  },
];

export function skillText(value: LocalizedText, locale: Locale) {
  return localize(value, locale);
}
