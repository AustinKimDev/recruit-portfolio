export type Locale = "ko" | "en";

export const localeMeta: Record<Locale, { label: string; htmlLang: string }> = {
  ko: { label: "KO", htmlLang: "ko-KR" },
  en: { label: "EN", htmlLang: "en-US" },
};

export const copy = {
  ko: {
    nav: {
      about: "소개",
      map: "아틀라스",
      experience: "경력",
      projects: "프로젝트",
      skills: "스킬",
      contact: "연락",
      githubRepo: "사이트 코드",
    },
    profile: {
      name: "김지동",
      title: "Frontend Engineer",
      tagline:
        "지도/GIS, 데이터 시각화, 인증, 배포까지 직접 다루며 데이터가 무거운 제품을 끝까지 굴리는 프론트엔드 개발자입니다.",
      githubRepo: "https://github.com/AustinKimDev/recruit-portfolio",
      stats: [
        { label: "위성영상 응답 개선", value: "0.2초" },
        { label: "인프라 안정 운영", value: "2년+" },
        { label: "지식그래프 시각화", value: "500노드" },
        { label: "라이브/근태 운영 모듈", value: "HLS + Timesheet" },
      ],
      impact: [
        "위성영상 로딩 불가 상태를 WMTS 캐시 구성으로 0.2초 응답 흐름까지 개선",
        "사내 네트워크/배포 인프라를 정비해 1~2일 단위 장애를 2년+ 무중단 운영으로 전환",
        "MateYou에서 LiveKit/HLS 방송 인프라와 Supabase 기반 출근부/근태 운영 모듈을 함께 구현",
      ],
    },
    hero: {
      eyebrow: "Cyber GIS Frontend",
      headline: "지도, 시각화, 운영 도구를 실제 서비스로 완성합니다.",
      primary: "프로젝트 보기",
      secondary: "GitHub",
    },
    about: {
      title: "소개",
      body:
        "백엔드와 인프라에서 시작해 프론트엔드로 옮겨왔습니다. 그래서 화면을 만들 때도 API, 데이터 모델, 인증, 배포 경로까지 같이 봅니다.",
      cards: [
        {
          title: "지도/GIS 화면",
          body: "OpenLayers, Mapbox GL, MapLibre, Leaflet을 프로젝트 성격에 맞게 선택했고 WMTS/WMS, AOI, 좌표계 변환, 마커 클러스터링까지 다뤘습니다.",
        },
        {
          title: "방송/운영 인프라",
          body: "LiveKit, HLS, FFmpeg, Nginx, CloudFront, Docker Compose로 방송 경로를 만들고, MateYou 내부 timesheet 운영 모듈까지 연결했습니다.",
        },
        {
          title: "제품 운영 감각",
          body: "인증, 네트워크 장애, CI/CD, 사내 패키지 운영까지 처리했습니다. 화면 구현에서 멈추지 않고 제품이 돌아가는 조건을 챙깁니다.",
        },
      ],
    },
    map: {
      title: "Project Atlas",
      body:
        "실제 위치가 아닌 기술 도메인별 배치입니다. 지도 레이어, 마커 상태, 경로 라인, 선택 패널을 코드로 연결해 GIS 경험을 보여줍니다.",
      decision: "구현 판단",
      result: "남긴 결과",
    },
    projects: {
      title: "프로젝트",
      body:
        "기술 스택을 나열하기보다 문제를 어떻게 쪼개고 어떤 판단으로 결과를 만들었는지 중심으로 정리했습니다.",
      role: "역할",
      problem: "문제",
      build: "구현",
      result: "결과",
      tabs: {
        all: "전체",
        gis: "GIS",
        ai: "AI",
        backend: "백엔드",
        fullstack: "풀스택",
        infra: "인프라",
      },
    },
    experience: {
      title: "경력",
    },
    skills: {
      title: "스킬",
      body: "숙련도를 막대로 과장하지 않고, 어떤 프로젝트에서 어떤 문제를 풀었는지 기준으로 정리했습니다.",
    },
    contact: {
      title: "연락",
    },
  },
  en: {
    nav: {
      about: "About",
      map: "Atlas",
      experience: "Experience",
      projects: "Projects",
      skills: "Skills",
      contact: "Contact",
      githubRepo: "Site Code",
    },
    profile: {
      name: "Jidong Kim",
      title: "Frontend Engineer",
      tagline:
        "I build data-heavy frontend products across GIS, visualization, auth, streaming, deployment, and the infrastructure around them.",
      githubRepo: "https://github.com/AustinKimDev/recruit-portfolio",
      stats: [
        { label: "Satellite imagery response", value: "0.2s" },
        { label: "Stable infra operation", value: "2y+" },
        { label: "Knowledge graph render", value: "500 nodes" },
        { label: "Live/timesheet module", value: "HLS + Timesheet" },
      ],
      impact: [
        "Reduced blank satellite imagery loading paths into a 0.2s WMTS cache-backed flow",
        "Rebuilt network and deployment infrastructure that had failed every few days into a stable long-running environment",
        "Built both MateYou live streaming infrastructure and a Supabase-backed timesheet operations module",
      ],
    },
    hero: {
      eyebrow: "Cyber GIS Frontend",
      headline: "I turn maps, visualization, and operations tools into working products.",
      primary: "View Projects",
      secondary: "GitHub",
    },
    about: {
      title: "About",
      body:
        "I started from backend and infrastructure, then moved into frontend. That background makes me design UI with APIs, data models, auth, and deployment paths in mind.",
      cards: [
        {
          title: "GIS interfaces",
          body: "I have used OpenLayers, Mapbox GL, MapLibre, and Leaflet for WMTS/WMS, AOI editing, CRS transforms, and marker-heavy workflows.",
        },
        {
          title: "Streaming infra",
          body: "I built live streaming paths with LiveKit, HLS, FFmpeg, Nginx, CloudFront, and Docker Compose, plus MateYou's internal timesheet module.",
        },
        {
          title: "Product operations",
          body: "I handle auth, network issues, CI/CD, and internal packages so the product can keep running beyond the UI layer.",
        },
      ],
    },
    map: {
      title: "Project Atlas",
      body:
        "These are not real project locations. The atlas maps technical domains with interactive layers, markers, route lines, and a selected detail panel.",
      decision: "Decision",
      result: "Result",
    },
    projects: {
      title: "Projects",
      body:
        "Each project is framed around the problem, implementation choices, and the result rather than a stack list.",
      role: "Role",
      problem: "Problem",
      build: "Build",
      result: "Result",
      tabs: {
        all: "All",
        gis: "GIS",
        ai: "AI",
        backend: "Backend",
        fullstack: "Full-stack",
        infra: "Infra",
      },
    },
    experience: {
      title: "Experience",
    },
    skills: {
      title: "Skills",
      body:
        "No percentage bars. I describe skills through the project evidence behind them.",
    },
    contact: {
      title: "Contact",
    },
  },
} as const;
