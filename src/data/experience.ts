import type { LocalizedText } from "./projects";

export interface ExperienceItem {
  company: LocalizedText;
  role: LocalizedText;
  period: string;
  description: LocalizedText;
  highlights: LocalizedText[];
  projects?: ExperienceProject[];
  isMain?: boolean;
}

export interface ExperienceProject {
  name: LocalizedText;
  scope: LocalizedText;
  result: LocalizedText;
  details: LocalizedText[];
  stack: string[];
}

const lt = (ko: string, en: string): LocalizedText => ({ ko, en });

export const experiences: ExperienceItem[] = [
  {
    company: lt("텔레픽스(주)", "TelePIX"),
    role: lt("주임연구원 / SW개발팀", "Research Engineer / SW Team"),
    period: "2022.07 ~",
    description: lt(
      "위성 데이터 플랫폼 전문 기업. 지도/GIS 프론트엔드, 데이터 시각화, 사내 디자인 시스템, 배포/네트워크 인프라를 함께 담당.",
      "Satellite data company. Worked across GIS frontend, visualization, internal design systems, deployment, and network infrastructure."
    ),
    isMain: true,
    highlights: [
      lt("지도/GIS, 데이터 시각화, 디자인 시스템, 인프라까지 제품 운영에 필요한 영역을 프로젝트 단위로 맡았습니다.", "Owned GIS, visualization, design system, and infrastructure work across product projects."),
    ],
    projects: [
      {
        name: lt("PIXATIVE v1/v2", "PIXATIVE v1/v2"),
        scope: lt("위성영상 GIS 플랫폼 / 프론트엔드 주도", "Satellite imagery GIS platform / frontend lead"),
        result: lt("영상 로딩 불가 흐름을 0.2초 응답 경로로 개선", "Improved blank imagery loading into a 0.2s response path"),
        details: [
          lt("OpenLayers와 MapLibre를 프로젝트 성격에 맞게 분리하고, proj4 좌표계 정합 계층을 구성했습니다.", "Split OpenLayers and MapLibre responsibilities and built a proj4 CRS alignment layer."),
          lt("WMTS 캐시 경로를 붙여 지도 탐색 중 빈 화면으로 멈추던 병목을 줄였습니다.", "Added a WMTS cache route to reduce blank-map bottlenecks during map navigation."),
        ],
        stack: ["OpenLayers", "MapLibre", "proj4", "WMTS", "Zustand"],
      },
      {
        name: lt("Bluebon / Bluebon-prod", "Bluebon / Bluebon-prod"),
        scope: lt("위성 미션 계획 / 프로덕션 확장", "Satellite mission planning / production expansion"),
        result: lt("CLI 중심 궤도 계산을 웹 기반 운영 화면으로 전환", "Moved CLI-first orbit workflows into an operational web product"),
        details: [
          lt("TLE 기반 SGP4 궤도 전파, Mapbox/Deck.gl 레이어, Three.js 3D 뷰를 연결했습니다.", "Connected TLE-based SGP4 propagation with Mapbox, Deck.gl, and Three.js views."),
          lt("Keycloak SSO와 FastAPI 프록시를 붙여 외부 운영 버전까지 확장했습니다.", "Extended it for production usage with Keycloak SSO and a FastAPI proxy."),
        ],
        stack: ["SGP4", "Mapbox GL", "Deck.gl", "Three.js", "Keycloak", "FastAPI"],
      },
      {
        name: lt("LIC 플랫폼", "LIC Platform"),
        scope: lt("B2G 운영 화면 / 지도·리포트", "B2G operations UI / maps and reports"),
        result: lt("AOI 편집부터 PDF 리포트까지 한 화면 흐름으로 완수", "Delivered one workflow from AOI editing to PDF reporting"),
        details: [
          lt("Remix SSR과 Mapbox GL 기반으로 관측소 데이터 5종, WKT/turf.js AOI 편집을 구현했습니다.", "Built five station data layers and WKT/turf.js AOI editing with Remix SSR and Mapbox GL."),
          lt("모바일 Drawer와 PDF 리포트까지 포함해 현장 운영에 필요한 화면 흐름을 정리했습니다.", "Organized mobile drawers and PDF reporting for field operations."),
        ],
        stack: ["Remix", "Mapbox GL", "WKT", "turf.js", "PDF"],
      },
      {
        name: lt("멀티모달 AI 시각화", "Multimodal AI Visualization"),
        scope: lt("지식 그래프 / 원문 하이라이트", "Knowledge graph / source highlighting"),
        result: lt("500노드 지식 그래프와 원문 근거를 같은 화면에서 추적", "Linked a 500-node graph with source evidence in one view"),
        details: [
          lt("LTF, Graph, Entity 산출물을 프론트엔드에서 직접 파싱해 시각화 데이터로 변환했습니다.", "Parsed LTF, Graph, and Entity outputs in the frontend into visualization data."),
          lt("react-force-graph와 Canvas로 그래프 노드, 문서 하이라이트, 엔티티 흐름을 연결했습니다.", "Connected graph nodes, document highlights, and entity flows with react-force-graph and Canvas."),
        ],
        stack: ["React", "Canvas", "react-force-graph", "LTF", "Entity"],
      },
      {
        name: lt("telepix-ui", "telepix-ui"),
        scope: lt("사내 디자인 시스템 / NPM 패키지", "Internal design system / NPM package"),
        result: lt("100+ 토큰과 Storybook 문서로 반복 UI 구현을 표준화", "Standardized repeated UI work with 100+ tokens and Storybook docs"),
        details: [
          lt("Radix UI와 TailwindCSS 4 기반 컴포넌트, 토큰, 릴리즈 흐름을 운영했습니다.", "Operated components, tokens, and release flows on Radix UI and TailwindCSS 4."),
          lt("프로젝트마다 달라지던 폼, 버튼, 패널, 테이블 패턴을 패키지 기준으로 맞췄습니다.", "Aligned forms, buttons, panels, and table patterns through a shared package."),
        ],
        stack: ["Radix UI", "TailwindCSS 4", "Storybook v9", "NPM"],
      },
      {
        name: lt("사내 인프라 전면 구축", "Internal Infrastructure Rebuild"),
        scope: lt("네트워크·배포·클라우드 운영", "Network, deployment, and cloud operations"),
        result: lt("1~2일 단위 장애가 반복되던 환경을 2년+ 안정 운영으로 전환", "Turned recurring 1-2 day outages into 2+ years of stable operations"),
        details: [
          lt("Switch, Router, 방화벽, VPN, DNS, VLAN을 직접 정비해 개발 조직의 운영 기반을 만들었습니다.", "Rebuilt switches, routers, firewall, VPN, DNS, and VLAN foundations for the engineering team."),
          lt("Jenkins, Docker 배포와 AWS/Terraform 흐름을 정리해 프론트엔드 밖의 문제까지 처리했습니다.", "Organized Jenkins, Docker deployment, and AWS/Terraform flows beyond frontend-only work."),
        ],
        stack: ["Network", "Jenkins", "Docker", "AWS", "Terraform"],
      },
    ],
  },
  {
    company: lt("Fruiting 증권 플랫폼", "Fruiting Securities Platform"),
    role: lt("백엔드 유지보수 / 풀스택 지원", "Backend Maintenance / Full-stack Support"),
    period: "~ 2026.02",
    description: lt(
      "증권사 프로젝트에서 장기간 운영 이슈, 결제, 알림, 권한, 검색, 모바일 연동 흐름을 유지보수.",
      "Maintained long-running securities product flows across payments, notifications, permissions, search, and mobile integration."
    ),
    highlights: [
      lt("Next.js 화면과 Python/Django 백엔드, 모바일 연동까지 이어지는 운영 이슈를 장기간 유지보수했습니다.", "Maintained long-running issues across Next.js screens, Python/Django backend, and mobile integration."),
    ],
    projects: [
      {
        name: lt("Fruiting 증권 플랫폼", "Fruiting Securities Platform"),
        scope: lt("증권사 서비스 / 백엔드 유지보수", "Securities service / backend maintenance"),
        result: lt("2026.02까지 4년간 결제·알림·회원·검색 흐름을 안정 운영", "Operated payments, notifications, users, and search flows for four years until 2026.02"),
        details: [
          lt("BootPay 정기결제 등록/콜백, 회원탈퇴 시 예약결제 확인 등 돈이 오가는 운영 이슈를 직접 처리했습니다.", "Handled payment-sensitive issues including BootPay recurring callbacks and subscription checks on account deletion."),
          lt("Python/Django 백엔드, Elasticsearch 검색, Expo 푸시 토큰, React Native WebView/Push 초기 설정까지 대응했습니다.", "Covered Python/Django backend, Elasticsearch search, Expo push tokens, and React Native WebView/Push setup."),
        ],
        stack: ["Python", "Django", "Next.js", "Redux", "Elasticsearch", "BootPay"],
      },
    ],
  },
  {
    company: lt("(주)아키아카", "Akiaka"),
    role: lt("사원/매니저", "Engineer / Manager"),
    period: "2022.01 ~ 2022.07",
    description: lt(
      "공공기관 웹사이트 유지보수와 사내 개발 인프라 구축을 담당.",
      "Maintained public-sector websites and built internal development infrastructure."
    ),
    highlights: [
      lt("서울기록원/국가기록원/경찰청 기록물 사이트 Spring 기반 유지보수, 서울기록원은 풀스택 이슈 대응", "Maintained Spring-based public archive systems and handled full-stack issues for the Seoul Archives site."),
      lt("Docker 기반 GitLab/Nexus, Apache 리버스 프록시, 도메인/포트포워딩 설정으로 코드와 빌드 산출물 관리 체계화", "Set up Docker-based GitLab/Nexus, Apache reverse proxying, domains, and port forwarding for source and build artifact management."),
    ],
  },
  {
    company: lt("(주)웹비즈크리에이티브", "Webbiz Creative"),
    role: lt("사원 / SW개발팀 (메인 개발자)", "Software Engineer / Main Developer"),
    period: "2021.06 ~ 2022.01",
    description: lt(
      "소규모 팀에서 지도 검색, 모바일 앱, 결제, 레거시 성능 개선을 풀스택으로 담당.",
      "Worked as a full-stack developer on map search, mobile apps, payments, and legacy performance improvements."
    ),
    highlights: [
      lt("부동산 지도 검색 플랫폼 메인 개발. KakaoMap 기반 검색, Selenium 크롤러, IE11 호환 커스텀 차트 구현", "Main developer for a real-estate map search platform with KakaoMap search, Selenium crawlers, and IE11-compatible custom charts."),
      lt("강남3구 2~3천건 매물 검색 쿼리를 10초 -> 0.5초로 개선하고, 차량정비 검색 Timeout 4~5분 -> 2~20초로 단축", "Improved real-estate search from 10s to 0.5s and reduced vehicle maintenance query timeouts from 4-5 minutes to 2-20s."),
      lt("모바일 구인구직 앱에서 무한스크롤, 직접 구현한 채팅, Firebase Push 알림을 개발", "Built infinite scroll, custom chat, and Firebase Push notifications for a mobile job app."),
    ],
  },
];
