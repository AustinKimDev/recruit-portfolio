export type ProjectCategory = "ai" | "gis" | "fullstack" | "infra";

export interface Project {
  name: string;
  summary: string;
  details: string[];
  stack: string[];
  metric?: string;
  isAI?: boolean;
  github?: string;
  link?: string;
  categories?: ProjectCategory[];
}

export const projects: Project[] = [
  {
    name: "PIXATIVE v1→v2",
    summary: "위성영상 GIS 제공 플랫폼 — 산업통상자원부 과제",
    details: [
      "OpenLayers + MapLibre 이중 지도 시스템 설계, proj4 좌표계 변환으로 다양한 좌표체계 위성영상을 단일 맵에 정합",
      "WMTS Cache 서버 도입으로 네트워크 병목 시 로딩 불가 상태를 0.2초로 개선",
      "v2에서 Recoil→Zustand, MUI→TailwindCSS 마이그레이션 주도",
    ],
    stack: ["Next.js", "React", "OpenLayers", "MapLibre", "Zustand"],
    metric: "로딩 불가 → 0.2초",
    categories: ["gis"],
  },
  {
    name: "Bluebon",
    summary: "위성 미션 계획 풀스택 플랫폼 — 사내 핵심 프로덕트",
    details: [
      "SGP4 궤도 전파 알고리즘으로 위성 지상 궤적 계산 및 관측 접근성 분석 구현",
      "Three.js로 지구-위성 3D 시각화, supercluster로 대량 마커 클러스터링",
      "Drizzle ORM + LibSQL 풀스택 아키텍처, NextAuth 인증, zod 스키마 검증",
    ],
    stack: ["Next.js 15", "Three.js", "Mapbox GL", "Drizzle ORM"],
    categories: ["gis", "fullstack"],
  },
  {
    name: "telepix-ui",
    summary: "사내 UI 디자인 시스템 — NPM 패키지로 배포",
    details: [
      "Radix UI + TailwindCSS 4 기반 컴포넌트 라이브러리 설계, 100+ 시맨틱 디자인 토큰",
      "Rollup ESM/CJS 듀얼 번들링, Storybook v9 문서화 (a11y 접근성 포함)",
      "v0.8.5까지 반복 릴리즈, 사내 전 프로젝트에서 공통 사용",
    ],
    stack: ["React", "Radix UI", "TailwindCSS 4", "Rollup", "Storybook"],
    categories: [],
  },
  {
    name: "LIC 플랫폼",
    summary: "지역혁신클러스터 해양 관측 GIS — 정부 R&D",
    details: [
      "Remix v2 SSR + Mapbox GL 통합, WKT 기반 AOI 폴리곤 시스템",
      "5개 관측소 항목(조위/수온/파고/풍향/풍속) 실시간 데이터 시각화",
      "react-pdf 리포트 뷰어, Vaul 모바일 Drawer — 텔레픽스 최대 규모 FE 프로젝트",
    ],
    stack: ["Remix v2", "Mapbox GL", "turf.js", "react-pdf"],
    categories: ["gis"],
  },
  {
    name: "멀티모달 AI 시각화",
    summary: "AI 분석 결과를 지식 그래프로 시각화 — 미래도전과제 R&D",
    details: [
      "AI 산출물 3개 파일(LTF, Graph, Entity)을 FE에서 직접 파싱하는 알고리즘 자체 설계",
      "react-force-graph + Canvas API로 최대 500노드 그래프 렌더링",
      "그래프 노드 호버 시 원문 텍스트 토큰 하이라이트 양방향 연동",
    ],
    stack: ["React", "react-force-graph", "Canvas API", "MSW"],
    metric: "500노드 실시간 시각화",
    isAI: true,
    categories: ["ai"],
  },
  {
    name: "Orgentic",
    summary: "멀티 테넌트 AI 에이전트 오케스트레이션 플랫폼 — 사이드 프로젝트",
    details: [
      "4계층 구조(Org→Team→Agent→Task) 멀티 테넌트 아키텍처 설계",
      "Claude Agent SDK + FastAPI 백엔드, WebSocket 실시간 브로드캐스트",
      "@xyflow/react로 에이전트 간 태스크 흐름 그래프 시각화",
    ],
    stack: ["React 19", "FastAPI", "Claude Agent SDK", "@xyflow/react"],
    isAI: true,
    github: "https://github.com/AustinKimDev/orgentic",
    categories: ["ai", "fullstack"],
  },
  {
    name: "사내 인프라 전면 구축",
    summary: "네트워크부터 CI/CD, 클라우드까지 자발적으로 구축",
    details: [
      "Switch/Router/방화벽/VPN/DNS 세팅, VLAN 분리 → 1~2일 중단 → 2년+ 무중단",
      "Jenkins + Docker(Portainer) CI/CD 파이프라인 → 배포 담당자 상시 대기 → 팀 자율 배포",
      "사내 전용 서버 → AWS 이관, Terraform IaC 도입",
    ],
    stack: ["Docker", "Jenkins", "Terraform", "AWS", "Portainer"],
    metric: "2년+ 무중단 운영",
    categories: ["infra"],
  },
  {
    name: "Lunchix",
    summary: "AI 추천 맛집 지도 — 사내 사이드 프로젝트",
    link: "https://lunchix.peo.kr",
    details: [
      "OpenAI API + pgvector 임베딩으로 벡터/공간 하이브리드 검색 구현",
      "PostGIS 기반 거리순 정렬 + AI 취향 매칭 결합 추천 알고리즘",
      "Kakao Map 시각화, Recharts 트렌드 분석, 크롤러 + 어드민 풀스택 구성",
    ],
    stack: ["Next.js", "KakaoMap", "OpenAI", "pgvector", "PostGIS"],
    isAI: true,
    categories: ["ai", "fullstack"],
  },
  {
    name: "Comitsu",
    summary: "코스플레이어 네트워킹 및 일정 관리 플랫폼 — 1인 개발",
    details: [
      "SwiftUI iOS 앱 + ASP.NET Core C# 백엔드 풀스택 아키텍처, ~25K LOC",
      "이벤트 초대/참여, 캘린더 일정 공유, 코스플레이어 검색/팔로우 소셜 기능",
      "FCM 푸시 알림 + 딥링크, Keychain 인증, Docker/K8s 인프라 구성",
    ],
    stack: ["SwiftUI", "ASP.NET Core", "Entity Framework", "Docker", "K8s"],
    categories: ["fullstack"],
  },
  {
    name: "MateYou",
    summary: "매칭 기반 라이브 방송 플랫폼 — 프론트엔드 및 스트리밍 인프라 담당",
    details: [
      "LiveKit WebRTC → HLS 라이브 스트리밍 전환, FFmpeg 트랜스코딩, Nginx 역프록시 + CloudFront 배포",
      "모바일 세로 방송 해상도/레터박스 최적화, 보이스룸 마이크 권한 및 미션 타임아웃 처리",
      "Docker Compose 기반 스트리밍 서버 인프라 구성, RTMP 인증 및 스트림 정리 자동화",
    ],
    stack: ["React", "TypeScript", "LiveKit", "HLS", "FFmpeg", "Docker", "Nginx"],
    categories: ["fullstack", "infra"],
  },
  {
    name: "증권사 웹사이트",
    summary: "증권 플랫폼 프론트엔드 리팩토링 및 백엔드 결제 시스템 — 외주",
    details: [
      "Next.js 13 + Redux 프론트엔드 UI 리팩토링, 댓글 권한 로직, 모바일 프로필/배포 자동화",
      "정기결제(BootPay) 등록/콜백 처리, Expo 푸시 알림 토큰 관리, 회원탈퇴 시 예약결제 확인",
      "Expo React Native 앱 초기 설정 (EAS 빌드, WebView, 푸시알림 훅)",
    ],
    stack: ["Next.js 13", "Redux", "Node.js", "BootPay", "Expo", "Elasticsearch"],
    categories: ["fullstack"],
  },
  {
    name: "Stockelper",
    summary: "AI 주식 투자 분석 플랫폼 — 프론트엔드 개발 담당",
    details: [
      "Next.js 15 + React 19 풀스택, Prisma ORM, TanStack Query, Docker/PM2 배포 파이프라인",
      "SSE 스트리밍 AI 채팅 UI, 백테스팅 페이지/상세, 포트폴리오 추천 테이블 구현",
      "StockForceGraph 관계 시각화, 리사이즈 가능 네트워크 패널, 커스텀 애니메이션",
    ],
    stack: ["Next.js 15", "React 19", "Prisma", "TanStack Query", "Docker"],
    isAI: true,
    categories: ["ai", "fullstack"],
  },
];
