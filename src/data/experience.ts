import type { LocalizedText } from "./projects";

export interface ExperienceItem {
  company: LocalizedText;
  role: LocalizedText;
  period: string;
  description: LocalizedText;
  highlights: LocalizedText[];
  isMain?: boolean;
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
      lt("PIXATIVE v1/v2: OpenLayers + MapLibre 지도 구조, proj4 좌표계 정합, WMTS 캐시 구성으로 영상 로딩 불가 상태를 0.2초 응답 흐름까지 개선", "PIXATIVE v1/v2: improved satellite imagery loading through OpenLayers, MapLibre, proj4, and WMTS cache paths."),
      lt("Bluebon/Bluebon-prod: TLE 기반 SGP4 궤도 전파, Mapbox/Deck.gl 레이어, Three.js 3D 뷰, Keycloak SSO + FastAPI 프록시까지 프로덕션 구조 확장", "Bluebon/Bluebon-prod: built SGP4 orbit propagation, Mapbox/Deck.gl layers, Three.js 3D view, Keycloak SSO, and FastAPI proxy flows."),
      lt("LIC 플랫폼: Remix SSR + Mapbox GL, WKT/turf.js AOI 편집, 관측소 데이터 5종, PDF 리포트/모바일 Drawer까지 포함한 B2G 운영 화면 완수", "LIC platform: delivered B2G operations UI with Remix SSR, Mapbox GL, WKT/turf.js AOI editing, station data, PDF reports, and mobile drawers."),
      lt("멀티모달 AI 시각화: LTF/Graph/Entity 산출물을 FE에서 직접 파싱하고, react-force-graph + Canvas로 500노드 지식 그래프와 원문 하이라이트를 연결", "Multimodal AI visualization: parsed LTF/Graph/Entity output in the frontend and linked a 500-node graph with source text highlighting."),
      lt("telepix-ui: Radix UI + TailwindCSS 4 기반 사내 NPM 패키지, 100+ 디자인 토큰, Storybook v9 문서화와 릴리즈 운영", "telepix-ui: operated an internal Radix/Tailwind package with semantic tokens, Storybook docs, and releases."),
      lt("사내 인프라: Switch/Router/방화벽/VPN/DNS/VLAN, Jenkins + Docker 배포, AWS/Terraform을 직접 정비해 1~2일 장애를 2년+ 무중단 환경으로 전환", "Infrastructure: rebuilt network, Jenkins/Docker deployments, and AWS/Terraform flows from frequent outages into long-running stable operations."),
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
      lt("BootPay 정기결제 등록/콜백, Expo 푸시 토큰, 회원탈퇴 시 예약결제 확인 등 운영 이슈에 직접 대응", "Handled BootPay recurring payment callbacks, Expo push tokens, and subscription checks during account deletion."),
      lt("Next.js/Redux 화면과 Node.js 백엔드, Elasticsearch 검색, React Native WebView/Push 초기 설정까지 이어지는 유지보수 범위 담당", "Covered Next.js/Redux UI, Node.js backend maintenance, Elasticsearch search, and React Native WebView/Push setup."),
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
