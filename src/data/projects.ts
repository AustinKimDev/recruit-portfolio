import type { Locale } from "@/i18n/content";

export type ProjectCategory = "ai" | "gis" | "backend" | "fullstack" | "infra";
export type LocalizedText = Record<Locale, string>;

export interface ProjectCaseStudy {
  role: LocalizedText;
  challenge: LocalizedText;
  approach: LocalizedText;
  outcome: LocalizedText;
}

export interface ProjectMapPoint {
  coordinates: [number, number];
  label: LocalizedText;
  note: LocalizedText;
}

export interface Project {
  name: LocalizedText;
  summary: LocalizedText;
  details: LocalizedText[];
  stack: string[];
  metric?: LocalizedText;
  period?: string;
  scope?: LocalizedText;
  isAI?: boolean;
  featured?: boolean;
  github?: string;
  link?: string;
  categories?: ProjectCategory[];
  caseStudy?: ProjectCaseStudy;
  map?: ProjectMapPoint;
}

const lt = (ko: string, en: string): LocalizedText => ({ ko, en });

export const projects: Project[] = [
  {
    name: lt("Bluebon / Bluebon-prod", "Bluebon / Bluebon-prod"),
    summary: lt(
      "위성 미션 계획 플랫폼. TLE 궤도 계산, 접근성 분석, 운영 인증 흐름까지 확장했습니다.",
      "Satellite mission planning platform with TLE orbit propagation, access analysis, and production auth flows."
    ),
    period: "2024 -",
    scope: lt("사내 핵심 프로덕트 / 풀스택 참여", "Core internal product / full-stack contribution"),
    details: [
      lt("satellite.js 기반 SGP4 궤도 전파로 위성 지상 궤적과 관측 접근성 분석을 구현했습니다.", "Implemented ground tracks and access analysis with satellite.js-based SGP4 propagation."),
      lt("Mapbox GL/Deck.gl 지도와 Three.js 3D 지구 뷰를 함께 구성해 미션 계획의 시간/공간 맥락을 시각화했습니다.", "Combined Mapbox GL/Deck.gl maps with a Three.js globe to visualize mission planning across time and space."),
      lt("프로덕션 버전에서 Keycloak SSO, FastAPI 프록시, refresh token 재시도 흐름으로 운영 인증 구조를 보강했습니다.", "Hardened the production version with Keycloak SSO, a FastAPI proxy, and refresh-token retry flows."),
    ],
    stack: ["Next.js 15", "Mapbox GL", "Deck.gl", "Three.js", "FastAPI", "Keycloak"],
    metric: lt("운영 인증/프록시 구조까지 확장", "Expanded into production auth and proxy architecture"),
    featured: true,
    categories: ["gis", "fullstack"],
    caseStudy: {
      role: lt("지도/3D 시각화, 궤도 계산 UI, 인증 연동", "Map/3D visualization, orbit UI, auth integration"),
      challenge: lt("CLI 중심 미션 계획은 비개발 직군이 검증하기 어렵고, 궤도/시간/관측 조건을 동시에 봐야 했습니다.", "CLI-based mission planning was hard for non-engineers and required orbit, time, and access context in one view."),
      approach: lt("TLE 기반 계산 결과를 지도 레이어, 3D 궤도, 시간 컨트롤에 연결하고 운영 인증은 별도 프록시 계층으로 분리했습니다.", "Connected TLE calculations to map layers, 3D orbit paths, and time controls while isolating production auth behind a proxy layer."),
      outcome: lt("사내 미션 계획 업무에 실사용되는 웹 플랫폼이 되었고, 외부 사업용 운영 버전으로 이어졌습니다.", "It became a real internal mission planning workflow and evolved into an externally deployable production version."),
    },
    map: {
      coordinates: [126.978, 37.566],
      label: lt("미션 계획", "Mission planning"),
      note: lt("SGP4, Mapbox GL, Deck.gl, Keycloak", "SGP4, Mapbox GL, Deck.gl, Keycloak"),
    },
  },
  {
    name: lt("PIXATIVE v1 -> v2", "PIXATIVE v1 -> v2"),
    summary: lt(
      "위성영상 GIS 제공 플랫폼. 다좌표계 위성영상을 하나의 지도 경험으로 정리했습니다.",
      "Satellite imagery GIS platform that unified multi-CRS imagery into a coherent map workflow."
    ),
    period: "2022.07 - 2024",
    scope: lt("산업통상자원부 과제 / 프론트엔드 주도", "Government R&D / frontend lead"),
    details: [
      lt("OpenLayers + MapLibre 이중 지도 시스템과 proj4 좌표계 변환으로 서로 다른 위성영상을 단일 맵에 정합했습니다.", "Aligned heterogeneous satellite imagery through OpenLayers, MapLibre, and proj4 CRS transforms."),
      lt("WMTS Cache 서버를 붙여 네트워크 병목 시 영상이 멈추던 흐름을 0.2초 응답 경로로 줄였습니다.", "Added a WMTS cache path to reduce previously blank imagery loading into a 0.2s response flow."),
      lt("v2에서는 Recoil -> Zustand, MUI -> TailwindCSS/Radix UI로 전환하며 운영 UI를 재정리했습니다.", "Migrated v2 from Recoil to Zustand and from MUI to Tailwind/Radix while simplifying the operator UI."),
    ],
    stack: ["Next.js", "React", "OpenLayers", "MapLibre", "Zustand"],
    metric: lt("로딩 불가 -> 0.2초", "Blank imagery path -> 0.2s"),
    featured: true,
    categories: ["gis"],
    caseStudy: {
      role: lt("지도 렌더링, 좌표계 정합, 캐시 구조 개선", "Map rendering, CRS alignment, cache architecture"),
      challenge: lt("위성영상 원본 좌표계와 타일 응답 지연 때문에 사용자가 빈 지도를 보는 시간이 길었습니다.", "Source CRS differences and slow tile responses created long blank-map periods."),
      approach: lt("OpenLayers 래퍼와 proj4 변환 계층을 분리하고, WMTS 캐시를 영상 요청 경로 앞단에 배치했습니다.", "Separated the OpenLayers wrapper from the proj4 transform layer and placed WMTS cache in front of imagery requests."),
      outcome: lt("지도 탐색 중 빈 화면 병목을 줄였고, 이후 v2 마이그레이션의 기준 구조가 됐습니다.", "Reduced blank-map bottlenecks and set the structure for the v2 migration."),
    },
    map: {
      coordinates: [127.035, 37.508],
      label: lt("위성영상", "Satellite imagery"),
      note: lt("OpenLayers, MapLibre, WMTS, CRS 변환", "OpenLayers, MapLibre, WMTS, CRS transform"),
    },
  },
  {
    name: lt("MateYou 플랫폼", "MateYou Platform"),
    summary: lt(
      "매칭 기반 플랫폼 내부에 라이브 방송, 스토어, 출근부/근태 관리까지 붙인 운영형 서비스입니다.",
      "Operations-heavy matching platform combining live streaming, store workflows, and an internal timesheet module."
    ),
    period: "2025",
    scope: lt("외주 / 방송 인프라 + 내부 운영 모듈", "Client project / streaming infra and internal operations"),
    details: [
      lt("LiveKit WebRTC 기반 실시간 방송 구조를 HLS 시청 경로로 확장하고 FFmpeg 트랜스코딩 파이프라인을 구성했습니다.", "Extended LiveKit WebRTC streaming into an HLS viewing path with an FFmpeg transcoding pipeline."),
      lt("Nginx 리버스 프록시, CloudFront 배포, Docker Compose 기반 서버 구성을 연결해 송출/시청 경로를 분리했습니다.", "Separated broadcaster and viewer paths through Nginx reverse proxying, CloudFront delivery, and Docker Compose services."),
      lt("MateYou 프론트 내부 /timesheet 기능으로 출근/휴게/퇴근 요청, 매니저 승인/반려, 실시간 출근자 현황, 근태 통계/정산 화면을 구현했습니다.", "Built the internal /timesheet module for check-in/break/check-out requests, manager approvals, realtime working partner views, and attendance statistics/settlement screens."),
      lt("timesheet_ 네임스페이스 테이블, Supabase RPC/Realtime, 감사 로그, 스토어 수령 완료의 출근 상태 조건까지 서비스 흐름에 연결했습니다.", "Connected timesheet_ tables, Supabase RPC/Realtime, audit logs, and the store pickup flow's WORKING-state gate into the product workflow."),
    ],
    stack: ["React", "TypeScript", "Supabase", "Realtime", "LiveKit", "HLS", "FFmpeg", "Docker", "Nginx", "CloudFront"],
    metric: lt("방송 인프라 + 출근부 운영 모듈 구현", "Built streaming infrastructure and timesheet operations module"),
    featured: true,
    categories: ["fullstack", "infra", "backend"],
    caseStudy: {
      role: lt("방송 UI/인프라, 출근부/근태 운영 모듈, 스토어 연동", "Broadcast UI/infrastructure, timesheet operations, store integration"),
      challenge: lt("방송은 송출/시청 경로가 분리되어야 했고, MateYou 내부 운영은 파트너 출근 상태와 주문 수령 완료 같은 실제 업무 조건까지 묶어야 했습니다.", "Streaming needed separate broadcaster/viewer paths, while operations had to connect partner attendance state with store pickup rules."),
      approach: lt("송출은 LiveKit, 시청은 FFmpeg 기반 HLS + Nginx/CloudFront로 나누고, 출근부는 Supabase timesheet_ 테이블/RPC/Realtime과 React 라우트로 독립 모듈화했습니다.", "Separated broadcasting through LiveKit from HLS viewing via FFmpeg/Nginx/CloudFront, and modularized timesheet with Supabase timesheet_ tables, RPC, Realtime, and React routes."),
      outcome: lt("라이브 미디어 인프라와 내부 운영/정산 흐름을 같은 제품 안에서 연결한 풀스택 사례로 정리할 수 있습니다.", "This is a full-stack case where live media infrastructure and internal operations/settlement workflows shipped within one product."),
    },
    map: {
      coordinates: [126.923, 37.556],
      label: lt("라이브/운영 플랫폼", "Live and operations platform"),
      note: lt("LiveKit, HLS, FFmpeg, Supabase Timesheet, Realtime", "LiveKit, HLS, FFmpeg, Supabase Timesheet, Realtime"),
    },
  },
  {
    name: lt("Fruiting 증권 플랫폼", "Fruiting Securities Platform"),
    summary: lt(
      "증권사 웹/백엔드 유지보수 프로젝트. 2026.02까지 장기간 운영 이슈와 결제/알림/검색 흐름을 담당했습니다.",
      "Long-running securities web/backend maintenance project covering payments, notifications, search, and operational issues through 2026.02."
    ),
    period: "2022 - 2026.02",
    scope: lt("증권사 프로젝트 / 백엔드 유지보수", "Securities project / backend maintenance"),
    details: [
      lt("Next.js/Redux 기반 화면 유지보수와 함께 Python/Django 백엔드의 권한, 댓글, 회원, 배포 이슈를 처리했습니다.", "Maintained Next.js/Redux frontend flows while handling Python/Django backend issues around permissions, comments, users, and deployment."),
      lt("BootPay 정기결제 등록/콜백, Expo 푸시 토큰, 회원탈퇴 시 예약결제 확인 등 운영에 직접 닿는 흐름을 보강했습니다.", "Improved operational flows including BootPay recurring payments/callbacks, Expo push tokens, and subscription checks on account deletion."),
      lt("Elasticsearch 검색과 모바일 프로필, React Native WebView/Push 초기 설정까지 이어지는 유지보수 범위를 맡았습니다.", "Covered Elasticsearch search, mobile profile flows, and the initial React Native WebView/Push setup."),
    ],
    stack: ["Python", "Django", "Next.js", "Redux", "BootPay", "Expo", "Elasticsearch"],
    metric: lt("2026.02까지 장기 유지보수", "Long-term maintenance through 2026.02"),
    featured: true,
    categories: ["backend", "fullstack"],
    caseStudy: {
      role: lt("백엔드 유지보수, 결제/알림/검색 흐름 개선", "Backend maintenance, payment/notification/search flows"),
      challenge: lt("증권 서비스 특성상 화면 수정만으로 끝나지 않고 결제, 알림, 권한, 검색, 탈퇴 흐름이 서로 연결되어 있었습니다.", "The securities product tied UI changes to payments, notifications, permissions, search, and account deletion flows."),
      approach: lt("기존 서비스 구조를 유지하면서 콜백/토큰/권한 경계의 오류 가능성을 줄이는 방향으로 수정했습니다.", "Worked within the existing system and reduced failure points around callbacks, tokens, and permission boundaries."),
      outcome: lt("장기간 운영되는 서비스에서 안정적인 유지보수와 도메인 흐름 이해를 쌓은 프로젝트입니다.", "This project strengthened my experience maintaining a long-running domain product with backend ownership."),
    },
    map: {
      coordinates: [126.929, 37.521],
      label: lt("금융 백엔드", "Finance backend"),
      note: lt("Python, Django, BootPay, Expo Push, Elasticsearch", "Python, Django, BootPay, Expo Push, Elasticsearch"),
    },
  },
  {
    name: lt("LIC 플랫폼", "LIC Platform"),
    summary: lt(
      "지역혁신클러스터 해양 관측 GIS. AOI, 관측소, 리포트 업무를 한 화면 흐름으로 묶었습니다.",
      "Marine observation GIS platform that connected AOI management, station data, and reporting in one workflow."
    ),
    period: "2024",
    scope: lt("정부 R&D / B2G 운영 화면", "Government R&D / B2G operations UI"),
    details: [
      lt("Remix v2 SSR + Mapbox GL 기반으로 AOI 관리, 관측소 데이터, 리포트 작성 흐름을 구성했습니다.", "Built AOI management, station data, and report workflows with Remix SSR and Mapbox GL."),
      lt("WKT와 turf.js로 폴리곤 편집/계산 로직을 만들고 조위, 수온, 파고, 풍향, 풍속 데이터를 지도에 연결했습니다.", "Used WKT and turf.js for polygon editing/calculation and linked tide, temperature, wave, wind direction, and wind speed data to the map."),
      lt("react-pdf 뷰어와 Vaul 모바일 Drawer를 붙여 데스크톱/모바일 운영자 화면을 함께 대응했습니다.", "Supported desktop and mobile operator flows with react-pdf and Vaul drawer UI."),
    ],
    stack: ["Remix v2", "Mapbox GL", "turf.js", "react-pdf", "Vaul"],
    metric: lt("AOI/관측소/리포트 통합", "AOI, station data, and reports unified"),
    featured: true,
    categories: ["gis"],
    caseStudy: {
      role: lt("SSR 앱 구조, 지도 상호작용, 리포트 UX", "SSR app structure, map interactions, reporting UX"),
      challenge: lt("관측 구역, 실시간 데이터, 문서 리포트가 흩어져 있어 운영자가 맥락을 잃기 쉬웠습니다.", "Observation areas, live data, and reports were separated, making it hard for operators to keep context."),
      approach: lt("지도 AOI를 중심에 두고 관측소 데이터와 리포트 CRUD를 같은 동선으로 배치했습니다.", "Placed AOI on the map as the center and connected station data and report CRUD into one flow."),
      outcome: lt("복합 기능을 가진 B2G 플랫폼을 단일 프론트엔드 경험으로 정리했습니다.", "Turned a multi-feature B2G platform into a single coherent frontend experience."),
    },
    map: {
      coordinates: [129.075, 35.179],
      label: lt("해양 관측", "Marine observation"),
      note: lt("AOI, WKT, turf.js, Mapbox GL", "AOI, WKT, turf.js, Mapbox GL"),
    },
  },
  {
    name: lt("멀티모달 AI 시각화", "Multimodal AI Visualization"),
    summary: lt(
      "AI 산출물을 프론트엔드에서 직접 파싱하고 지식 그래프로 시각화했습니다.",
      "Parsed AI output directly in the frontend and visualized it as an interactive knowledge graph."
    ),
    period: "2022.09 - 2023.01",
    scope: lt("미래도전과제 R&D / FE 단독 파싱", "R&D / frontend-owned parsing"),
    details: [
      lt("LTF, Graph, Entity 산출물을 브라우저에서 직접 파싱해 Entity/Relation/Event 구조로 변환했습니다.", "Parsed LTF, Graph, and Entity output in the browser into Entity/Relation/Event structures."),
      lt("react-force-graph + Canvas API로 500개 노드 규모의 지식 그래프를 렌더링했습니다.", "Rendered a 500-node knowledge graph with react-force-graph and Canvas API."),
      lt("그래프 노드 호버와 원문 텍스트 토큰 하이라이트를 양방향으로 연결했습니다.", "Connected graph node hover states with source text token highlighting in both directions."),
    ],
    stack: ["React", "react-force-graph", "Canvas API", "MSW"],
    metric: lt("500노드 실시간 시각화", "500-node real-time visualization"),
    isAI: true,
    featured: true,
    categories: ["ai"],
    caseStudy: {
      role: lt("파서 설계, 그래프 렌더링, 텍스트 연동 UX", "Parser design, graph rendering, text-linked UX"),
      challenge: lt("AI 산출물 포맷이 표준화되지 않아 백엔드 API를 기다리면 화면 검증이 지연되는 상황이었습니다.", "AI output was not standardized, so waiting for backend APIs would delay UI validation."),
      approach: lt("프론트엔드 파싱 알고리즘을 직접 작성하고 MSW 기반 독립 개발 환경에서 데이터 흐름을 고정했습니다.", "Wrote frontend parsing logic and locked the data flow in an MSW-powered local environment."),
      outcome: lt("백엔드 없이 분석 결과 검증 화면을 먼저 완성했고, 모델 결과를 사람이 읽을 수 있는 그래프로 바꿨습니다.", "Completed the validation UI before backend readiness and made model output readable as a graph."),
    },
    map: {
      coordinates: [127.385, 36.351],
      label: lt("지식그래프", "Knowledge graph"),
      note: lt("Canvas, graph parsing, token highlight", "Canvas, graph parsing, token highlight"),
    },
  },
  {
    name: lt("telepix-ui", "telepix-ui"),
    summary: lt(
      "사내 UI 디자인 시스템. 프로젝트마다 반복되던 UI 구현을 패키지로 표준화했습니다.",
      "Internal design system that standardized recurring UI work across projects."
    ),
    period: "2024 -",
    scope: lt("사내 NPM 패키지 / 설계 및 운영", "Internal NPM package / design and operation"),
    details: [
      lt("Radix UI + TailwindCSS 4 기반 컴포넌트 라이브러리와 100+ 시맨틱 디자인 토큰을 설계했습니다.", "Designed a Radix UI + TailwindCSS component library with 100+ semantic design tokens."),
      lt("Rollup ESM/CJS 듀얼 번들링, Storybook v9 문서화, 접근성 애드온을 포함해 운영 가능한 패키지로 만들었습니다.", "Built an operational package with ESM/CJS bundles, Storybook v9 docs, and accessibility addons."),
      lt("반복 UI 구현 비용을 줄이고 사내 화면의 기본 품질선을 맞추는 기준 패키지로 운영했습니다.", "Reduced repeated UI work and created a baseline quality bar for internal products."),
    ],
    stack: ["React", "Radix UI", "TailwindCSS 4", "Rollup", "Storybook"],
    metric: lt("사내 공통 UI 패키지 운영", "Operated as the internal shared UI package"),
    featured: true,
    categories: ["fullstack"],
    caseStudy: {
      role: lt("컴포넌트 API, 토큰, 번들/문서화", "Component API, tokens, bundles, documentation"),
      challenge: lt("프로젝트별 UI 중복과 일관성 부족으로 신규 화면을 만들 때마다 같은 문제가 반복됐습니다.", "Duplicate UI work and inconsistent patterns kept reappearing in every project."),
      approach: lt("토큰과 컴포넌트 레이어를 분리하고, Storybook 문서와 패키지 배포 흐름을 함께 만들었습니다.", "Separated tokens from components and built documentation and package release flows together."),
      outcome: lt("반복 UI 구현 비용을 줄이고 사내 화면의 기본 품질선을 맞추는 기준 패키지가 됐습니다.", "Became the shared UI baseline that reduced repetitive implementation work."),
    },
  },
  {
    name: lt("사내 인프라 전면 구축", "Internal Infrastructure Rebuild"),
    summary: lt(
      "프론트엔드 밖의 문제까지 직접 정리해 개발 조직의 배포/운영 기반을 만들었습니다.",
      "Rebuilt the deployment and network foundation behind the frontend organization."
    ),
    period: "2023 -",
    scope: lt("네트워크, CI/CD, AWS", "Network, CI/CD, AWS"),
    details: [
      lt("Switch/Router/방화벽/VPN/DNS 세팅, VLAN 분리, NAS 전용 회선을 직접 구성했습니다.", "Configured switches, routers, firewalls, VPN, DNS, VLANs, and a dedicated NAS line."),
      lt("Jenkins + Docker(Portainer) 기반 CI/CD를 구축해 수동 배포와 상시 대기 구조를 줄였습니다.", "Built Jenkins and Docker/Portainer CI/CD to reduce manual deployment and standby work."),
      lt("사내 전용 서버에서 AWS로 운영 범위를 확장하고 Terraform IaC를 도입했습니다.", "Expanded operations from internal servers to AWS and introduced Terraform IaC."),
    ],
    stack: ["Docker", "Jenkins", "Terraform", "AWS", "Portainer"],
    metric: lt("1~2일 장애 -> 2년+ 무중단", "Frequent outages -> 2y+ stable operation"),
    featured: true,
    categories: ["infra"],
    caseStudy: {
      role: lt("네트워크/배포 인프라 설계와 운영", "Network and deployment infrastructure design"),
      challenge: lt("잦은 네트워크 장애와 수동 배포 때문에 개발 속도와 서비스 안정성이 모두 흔들렸습니다.", "Frequent network outages and manual deployments hurt both development speed and stability."),
      approach: lt("물리 네트워크, 내부 DNS/VPN, Docker 배포, Jenkins 파이프라인을 한 번에 정비했습니다.", "Reworked physical networking, internal DNS/VPN, Docker deployment, and Jenkins pipelines together."),
      outcome: lt("개발팀이 자율적으로 배포할 수 있는 환경이 되었고, 네트워크 장애는 장기간 재발하지 않았습니다.", "Enabled team-owned deployments and eliminated recurring network failures for a long period."),
    },
    map: {
      coordinates: [126.705, 37.456],
      label: lt("인프라", "Infrastructure"),
      note: lt("Network, Jenkins, Docker, Terraform", "Network, Jenkins, Docker, Terraform"),
    },
  },
  {
    name: lt("Orgentic", "Orgentic"),
    summary: lt(
      "멀티 테넌트 AI 에이전트 오케스트레이션 플랫폼. 에이전트 작업 흐름을 그래프로 다룹니다.",
      "Multi-tenant AI agent orchestration platform with graph-based task flow management."
    ),
    period: "2026",
    scope: lt("사이드 프로젝트 / 풀스택", "Side project / full-stack"),
    details: [
      lt("Org -> Team -> Agent -> Task 4계층 멀티 테넌트 모델을 설계했습니다.", "Designed a four-layer multi-tenant model: Org -> Team -> Agent -> Task."),
      lt("Claude Agent SDK + FastAPI 백엔드와 WebSocket 실시간 브로드캐스트를 연결했습니다.", "Connected Claude Agent SDK, a FastAPI backend, and WebSocket broadcasts."),
      lt("@xyflow/react로 태스크 흐름, 에이전트 상태, 산출물을 추적하는 그래프 UI를 만들었습니다.", "Built a graph UI with @xyflow/react for tasks, agent states, and artifacts."),
    ],
    stack: ["React 19", "FastAPI", "Claude Agent SDK", "@xyflow/react", "WebSocket"],
    metric: lt("멀티 테넌트 에이전트 흐름 시각화", "Multi-tenant agent flow visualization"),
    isAI: true,
    github: "https://github.com/AustinKimDev/orgentic",
    categories: ["ai", "fullstack"],
    map: {
      coordinates: [127.108, 37.402],
      label: lt("AI 오케스트레이션", "AI orchestration"),
      note: lt("Agents, WebSocket, task graph", "Agents, WebSocket, task graph"),
    },
  },
  {
    name: lt("Lunchix", "Lunchix"),
    summary: lt(
      "AI 추천 맛집 지도. 벡터 검색과 공간 검색을 결합한 지도형 추천 서비스입니다.",
      "AI restaurant map that combines vector search and spatial ranking."
    ),
    period: "2025",
    scope: lt("사내 사이드 프로젝트 / 풀스택", "Internal side project / full-stack"),
    link: "https://lunchix.peo.kr",
    details: [
      lt("OpenAI API + pgvector 임베딩으로 취향 기반 벡터 검색을 구성했습니다.", "Built preference-based vector search with OpenAI embeddings and pgvector."),
      lt("PostGIS 거리순 정렬과 AI 매칭 점수를 결합해 주변 식당 추천 알고리즘을 만들었습니다.", "Combined PostGIS distance ranking with AI match scores for nearby restaurant recommendations."),
      lt("Kakao Map 시각화, Recharts 트렌드 분석, 크롤러와 어드민까지 풀스택으로 구성했습니다.", "Built the Kakao Map UI, Recharts analytics, crawler, and admin flows."),
    ],
    stack: ["Next.js", "KakaoMap", "OpenAI", "pgvector", "PostGIS"],
    isAI: true,
    categories: ["ai", "fullstack"],
    map: {
      coordinates: [127.048, 37.503],
      label: lt("AI 맛집 지도", "AI food map"),
      note: lt("KakaoMap, pgvector, PostGIS", "KakaoMap, pgvector, PostGIS"),
    },
  },
  {
    name: lt("Comitsu", "Comitsu"),
    summary: lt(
      "코스플레이어 일정/참여/알림 플랫폼. iOS 앱과 .NET 백엔드를 함께 만들었습니다.",
      "Cosplayer schedule, participation, and notification platform with SwiftUI and .NET."
    ),
    period: "2026",
    scope: lt("1인 개발 / TestFlight", "Solo build / TestFlight"),
    details: [
      lt("SwiftUI iOS 앱과 Clean Architecture .NET 8 백엔드를 함께 설계했습니다.", "Designed both a SwiftUI iOS app and Clean Architecture .NET 8 backend."),
      lt("이벤트 초대/참여, 캘린더 일정 공유, 검색/팔로우 소셜 기능을 구현했습니다.", "Implemented event invitations, participation, shared calendars, search, and follow features."),
      lt("FCM 푸시 알림, 딥링크, Keychain 인증, Docker/K8s 인프라 구성을 붙였습니다.", "Added FCM push notifications, deep links, Keychain auth, and Docker/K8s setup."),
    ],
    stack: ["SwiftUI", "ASP.NET Core", "Entity Framework", "Firebase FCM", "Docker"],
    metric: lt("TestFlight 배포 / FCM 알림", "TestFlight delivery / FCM notifications"),
    categories: ["backend", "fullstack"],
    map: {
      coordinates: [139.765, 35.681],
      label: lt("이벤트 네트워크", "Event network"),
      note: lt("SwiftUI, .NET 8, FCM", "SwiftUI, .NET 8, FCM"),
    },
  },
  {
    name: lt("Stockelper", "Stockelper"),
    summary: lt(
      "AI 주식 투자 분석 플랫폼. 스트리밍 채팅과 금융 데이터 UI를 만들었습니다.",
      "AI stock analysis platform with streaming chat and financial data interfaces."
    ),
    period: "2025",
    scope: lt("팀 프로젝트 / 프론트엔드", "Team project / frontend"),
    details: [
      lt("Next.js 15 + React 19 기반으로 SSE 스트리밍 AI 채팅 UI를 구현했습니다.", "Implemented an SSE streaming AI chat UI with Next.js 15 and React 19."),
      lt("백테스팅 페이지, 포트폴리오 추천 테이블, 네트워크 관계 시각화 패널을 만들었습니다.", "Built backtesting pages, portfolio recommendation tables, and relationship graph panels."),
      lt("Prisma, TanStack Query, Docker/PM2 배포 흐름에 맞춰 화면과 데이터 로딩을 정리했습니다.", "Aligned UI state and loading flows with Prisma, TanStack Query, Docker, and PM2 deployment."),
    ],
    stack: ["Next.js 15", "React 19", "Prisma", "TanStack Query", "Docker"],
    isAI: true,
    categories: ["ai", "fullstack"],
    map: {
      coordinates: [127.015, 37.498],
      label: lt("금융 AI", "Financial AI"),
      note: lt("SSE, force graph, backtesting UI", "SSE, force graph, backtesting UI"),
    },
  },
];

export function localize(value: LocalizedText, locale: Locale) {
  return value[locale];
}
