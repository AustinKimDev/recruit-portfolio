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
        {
          label: "위성영상이 비어 보이던 병목",
          value: "0.2초",
          detail: "WMTS 캐시와 좌표계 정합으로 탐색 응답 흐름을 줄였습니다.",
        },
        {
          label: "잦은 네트워크/배포 장애",
          value: "2년+",
          detail: "사내 네트워크와 Jenkins/Docker 배포 기반을 안정화했습니다.",
        },
        {
          label: "AI 산출물 검증 지연",
          value: "500노드",
          detail: "브라우저 파서와 Canvas 지식그래프로 분석 결과를 연결했습니다.",
        },
        {
          label: "방송과 내부 운영의 분리",
          value: "HLS + Timesheet",
          detail: "LiveKit/HLS 방송 경로와 Supabase 근태 모듈을 함께 구현했습니다.",
        },
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
      proofTitle: "제가 맡아온 문제는 이런 형태였습니다.",
      body:
        "제가 잘하는 일은 지도, 영상, 운영 데이터처럼 무거운 제품을 사용자가 판단할 수 있는 화면으로 바꾸는 것입니다. 백엔드와 인프라를 먼저 겪었기 때문에 프론트엔드에서도 API, 데이터 모델, 인증, 배포, 장애 조건을 함께 봅니다.",
      cards: [
        {
          title: "지도/GIS를 제품 흐름의 중심에 둡니다.",
          body: "단순 지도 표시보다 좌표계 정합, 타일 캐시, AOI 편집, 관측 데이터 레이어, 대량 마커 상태를 업무 흐름에 맞게 설계했습니다.",
        },
        {
          title: "운영 기능을 프론트 밖까지 이어 붙입니다.",
          body: "LiveKit/HLS 방송, FFmpeg/Nginx/CloudFront 배포 경로, Supabase Realtime 근태 모듈처럼 화면 뒤의 실행 조건까지 같이 만들었습니다.",
        },
        {
          title: "제품이 계속 돌아가는 조건을 챙깁니다.",
          body: "인증 토큰, 권한, 결제 콜백, 네트워크 장애, CI/CD, 사내 패키지 운영까지 다루며 기능 출시 이후의 유지보수 비용을 줄이는 쪽으로 일합니다.",
        },
      ],
    },
    map: {
      title: "Project Atlas",
      body:
        "실제 위치가 아닌 기술 도메인별 배치입니다. 지도 레이어, 마커 상태, 경로 라인, 선택 패널을 코드로 연결해 GIS 경험을 보여줍니다.",
      activeNode: "활성 노드",
      routeLock: "선택 연결",
      period: "기간",
      scope: "범위",
      coordinates: "좌표",
      metric: "핵심 임팩트",
      stack: "주요 스택",
      nodeList: "노드 선택",
      decision: "구현 판단",
      result: "남긴 결과",
      missionBrief: "감시 브리핑",
      telemetry: "텔레메트리",
      console: "운용 콘솔",
      feed: "중계 로그",
      signal: "신호",
      linkState: "연결 상태",
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
        {
          label: "Blank satellite imagery bottleneck",
          value: "0.2s",
          detail: "Reduced the map exploration path with WMTS caching and CRS alignment.",
        },
        {
          label: "Recurring network/deploy failures",
          value: "2y+",
          detail: "Stabilized internal networking and Jenkins/Docker deployment foundations.",
        },
        {
          label: "Delayed AI output validation",
          value: "500 nodes",
          detail: "Linked browser parsing with a Canvas-based knowledge graph.",
        },
        {
          label: "Separated streaming and operations",
          value: "HLS + Timesheet",
          detail: "Built both LiveKit/HLS streaming and Supabase-backed timesheet workflows.",
        },
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
      proofTitle: "These are the kinds of problems I have owned.",
      body:
        "My strength is turning heavy map, media, and operations data into interfaces people can actually use to make decisions. Because I started with backend and infrastructure, I design frontend work with APIs, data models, auth, deployment paths, and failure modes in mind.",
      cards: [
        {
          title: "I place GIS at the center of product workflows.",
          body: "Beyond rendering a map, I have handled CRS alignment, tile caching, AOI editing, observation layers, and marker-heavy states around the actual operator flow.",
        },
        {
          title: "I connect operations beyond the frontend.",
          body: "I have built LiveKit/HLS streaming, FFmpeg/Nginx/CloudFront delivery paths, and Supabase Realtime timesheet modules alongside the user-facing screens.",
        },
        {
          title: "I care about what keeps the product running.",
          body: "Auth tokens, permissions, payment callbacks, network failures, CI/CD, and internal packages are part of how I reduce maintenance cost after launch.",
        },
      ],
    },
    map: {
      title: "Project Atlas",
      body:
        "These are not real project locations. The atlas maps technical domains with interactive layers, markers, route lines, and a selected detail panel.",
      activeNode: "Active Node",
      routeLock: "Selected Links",
      period: "Period",
      scope: "Scope",
      coordinates: "Coordinates",
      metric: "Core Impact",
      stack: "Primary Stack",
      nodeList: "Node List",
      decision: "Decision",
      result: "Result",
      missionBrief: "Mission Brief",
      telemetry: "Telemetry",
      console: "Ops Console",
      feed: "Relay Log",
      signal: "Signal",
      linkState: "Link State",
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
