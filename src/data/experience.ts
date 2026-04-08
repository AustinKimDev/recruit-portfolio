export interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  description: string;
  highlights: string[];
  isMain?: boolean;
}

export const experiences: ExperienceItem[] = [
  {
    company: "텔레픽스(주)",
    role: "주임연구원 / SW개발팀",
    period: "2022.07 ~ 재직중",
    description: "위성 데이터 플랫폼 전문 기업. 프론트엔드 개발 및 사내 인프라/디자인 시스템 구축.",
    isMain: true,
    highlights: [
      "PIXATIVE v1→v2: 위성영상 GIS 플랫폼. OpenLayers + MapLibre 이중 지도, WMTS 캐시로 로딩 불가→0.2초 개선",
      "Bluebon: 위성 미션 계획 풀스택. SGP4 궤도 전파, Three.js 3D, ~25K LOC",
      "telepix-ui: Radix UI + TailwindCSS 사내 디자인 시스템. 37K LOC, Storybook v9",
      "LIC 플랫폼: Remix v2 SSR + Mapbox, 텔레픽스 최대 FE 프로젝트 ~11K LOC",
      "멀티모달 AI 시각화: react-force-graph 500노드, XML 파싱 알고리즘 자체 설계 742줄",
      "사내 인프라 전면 개선: 네트워크(2년+ 무중단), Jenkins CI/CD, AWS IaC(Terraform)",
    ],
  },
  {
    company: "(주)아키아카",
    role: "사원/매니저",
    period: "2022.01 ~ 2022.07",
    description: "공공기관 웹사이트 유지보수. Spring 백엔드, Docker 기반 GitLab/Nexus 구축.",
    highlights: [],
  },
  {
    company: "(주)웹비즈크리에이티브",
    role: "사원 / SW개발팀 (메인 개발자)",
    period: "2021.06 ~ 2022.01",
    description: "풀스택 개발. 부동산 지도 검색, 모바일 앱, 글로벌 쇼핑몰.",
    highlights: [
      "검색 쿼리 10초→0.5초 (95% 개선), Timeout 4분→2초 (90%+ 단축)",
    ],
  },
];
