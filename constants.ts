import { PortfolioData } from './types';

export const RESUME_DATA: PortfolioData = {
  profile: {
    name: "박충효",
    englishName: "Park Chunghyo",
    email: "chunghyo@troe.kr",
    phone: "010-9174-1074",
    summary: `20년차 마케팅 전략 전문가 & AI X 마케팅 빌더,
웹서비스, 리서치, 콘텐츠, 에이전시, 컨설팅 펌을 거쳐
개인 비즈니스까지 다양한 스펙트럼 보유

'현장에서 답을 찾고, Learn-by-Doing'을 모토로
그로스, 브랜드, 콘텐츠, 커뮤니케이션 및
데이터 기반의 의사결정을 아우르는 통합적인 마케팅 전략을 수립

AI 기술, 데이터와 크리에이티브의 결합을 통해 
지속적인 Expert로 성장하고 있습니다.`,
    links: [
      { label: "Website", url: "https://troe.kr" },
      { label: "LinkedIn", url: "https://www.linkedin.com/in/chunghyopark/" },
      { label: "GitHub", url: "https://github.com/saewookkangboy" },
      { label: "Brunch", url: "https://brunch.co.kr/@saewookkangboy" }
    ]
  },
  projects: [
    {
      id: "p1",
      client: "플로우(Flow)",
      role: "마케팅 전략 및 콘텐츠 기획, 분석 파트너",
      period: "2025.04 - 2025.06",
      category: "Consulting",
      description: "커머스 플랫폼의 디지털 전략 및 팀 빌딩, 커뮤니케이션 자문",
      tasks: [
        "커머스 플랫폼 브랜드(4개)의 디지털 전략 및 데이터 기반 그로스 전략 자문",
        "브랜드 방향성에 맞춘 콘텐츠 기획 및 오가닉 채널(Owned/Earned Media) 운영 체계화",
        "팀 빌딩, R&R 수립, 운영 가이드라인 및 데이터 거버넌스 프로세스 정립"
      ],
      tags: ["Digital Strategy", "Team Building", "Growth Strategy", "Data Governance"]
    },
    {
      id: "p2",
      client: "버거킹 코리아(BKR)",
      role: "데이터 분석 파트너",
      period: "2025.03 - 2025.06",
      category: "Consulting",
      description: "온라인 버즈 분석 및 디지털 트렌드 리포트 서비스",
      tasks: [
        "온라인 주요 채널 버즈(VOC)의 정량 및 정성 분석",
        "경쟁사 이슈 교차 분석 및 시사점 발굴",
        "감성 분석(Sentimental) 및 글로벌 테크 릴리즈 이슈 트렌드 모니터링"
      ],
      tags: ["Data Analysis", "VOC", "Trend Report", "Social Listening"]
    },
    {
      id: "p3",
      client: "카카오(Kakao Corp)",
      role: "마케팅 전략 및 콘텐츠 기획",
      period: "2024.08 - 2024.12",
      category: "Consulting",
      description: "카카오 테크(if kakaoAI 2024) 온라인 콘텐츠 마케팅",
      tasks: [
        "if(kakaoAI) 2024 주요 온라인 및 개발자 회의 콘텐츠 개발 참여",
        "CTO 키노트 및 기술 영상 제작 리드",
        "Kakao Tech 블로그 활용 행사 프리뷰/리캡 콘텐츠 기획",
        "Index Governance 및 Metric Guideline 개발"
      ],
      tags: ["Content Marketing", "Tech Conference", "Video Production", "KPI Design"]
    },
    {
      id: "p4",
      client: "주식회사 팔도",
      role: "데이터 분석",
      period: "2024.07 - 2024.09",
      category: "Consulting",
      description: "틈새라면 콜라보 캠페인 성과 측정 프로젝트",
      tasks: [
        "틈새라면 X ZB1 하이브리드 캠페인 데이터 모니터링 및 리포트 개발",
        "디지털 채널(유튜브, 인스타그램, 틱톡, X) 성과 측정 리드"
      ],
      tags: ["Performance Analysis", "Collaboration Campaign", "Social Metrics"]
    },
    {
      id: "p5",
      client: "ExxonMobil (Mobil 1)",
      role: "컨설턴트",
      period: "2024.03 - 2024.07",
      category: "Consulting",
      description: "커머스 플랫폼 구축 및 가이드라인 설계",
      tasks: [
        "기 운영 사이트 마케팅 관점 운영 진단 및 체크리스트 설계",
        "커머스 플랫폼 설계에 필요한 고객 행동 여정 기반 KPI 개발",
        "네이버 스마트스토어 운영 가이드라인 및 플레이북 개발"
      ],
      tags: ["Commerce Strategy", "UX/UI Audit", "Playbook", "Naver Smart Store"]
    },
    {
      id: "p6",
      client: "카카오브레인",
      role: "디지털 채널 운영 및 전략",
      period: "2023.04 - 2024.03",
      category: "Consulting",
      description: "디지털 채널 운영, 콘텐츠 기획, 플레이북 제작",
      tasks: [
        "기업 디지털 커뮤니케이션 전략 기획 및 자문",
        "페이스북/유튜브 월간 운영 전략 및 인사이트 분석",
        "대외 커뮤니케이션 가이드라인 및 플레이북 아젠다 설정"
      ],
      tags: ["AI Marketing", "Digital Communication", "Channel Management"]
    },
    {
      id: "p7",
      client: "(주)마플 코퍼레이션",
      role: "성장 자문",
      period: "2023.06 - 2024.01",
      category: "Consulting",
      description: "디지털 이니셔티브 및 콘텐츠 마케팅 성장 자문",
      tasks: [
        "콘텐츠 마케터 핵심 업무 역량 고도화",
        "팀 조직 개편을 위한 대표 자문역",
        "커뮤니케이션 가이드 자문 및 실무 교육"
      ],
      tags: ["Mentoring", "Organizational Structure", "Content Strategy"]
    },
    {
      id: "p8",
      client: "SK브로드밴드",
      role: "데이터 분석",
      period: "2019.06 - 2020.07",
      category: "Consulting",
      description: "웹사이트 분석 및 퍼포먼스 리포트",
      tasks: [
        "GA 중심 웹사이트 측정 및 분석, 퍼포먼스 월 3~5% 상승 기여",
        "고객 여정 분석 및 전환 기여도 분석",
        "맞춤 리포트 제작 및 고객 커뮤니케이션"
      ],
      tags: ["Google Analytics", "Web Performance", "Customer Journey"]
    }
  ],
  careerHistory: [
    {
      id: "c1",
      company: "트로이 (Troe)",
      role: "대표 파트너 (마케터)",
      period: "2016.01 - 현재",
      type: "Founder",
      details: [
        "다양한 기업의 디지털 전략, 데이터 분석, 콘텐츠 기획 자문 수행",
        "주요 고객사: 플로우, 버거킹, 카카오, 팔도, 엑손모빌, SK브로드밴드 등"
      ]
    },
    {
      id: "c2",
      company: "메디케어랩스 (NUGU)",
      role: "정규직 (팀 리드급)",
      period: "2022.04 - 2023.02",
      type: "In-House",
      details: [
        "Paid Media Buying, Operation, Growth Action 총괄",
        "Full Funnel Campaign Activation (Meta, Google, TikTok, etc.)",
        "North Star KPI 운영 및 유지 (월간 Active Buyer 3~5% 성장)",
        "Paid 기반 누적 ROAS 1500% 달성"
      ]
    },
    {
      id: "c3",
      company: "고미코퍼레이션",
      role: "마케팅 총괄/팀 리드",
      period: "2020.07 - 2022.03",
      type: "In-House",
      details: [
        "베트남/태국 시장 대상 디지털 마케팅 전략 수립 및 실행",
        "평균 CAC 1,200에서 45까지 하향, Retention Rate 41%에서 51% 상향",
        "조직 내 미디어 믹스 모델 구체화 및 퍼포먼스 최적화",
        "시리즈 투자 라운드 서포트 (지표 발굴)"
      ]
    },
    {
      id: "c4",
      company: "비알피알컴퍼니",
      role: "정규직 (전략 이사)",
      period: "2017.10 - 2021.02",
      type: "Agency",
      details: [
        "아머 스포츠 코리아 디지털 마케팅 리테이너 총괄 (살로몬, 윌슨 등)",
        "디지털 마케팅 전략 기획 및 온/오프라인 행사 콘텐츠 기획"
      ]
    },
    {
      id: "c5",
      company: "워너뮤직코리아",
      role: "디지털 마케팅 자문",
      period: "2016.06 - 2019.02",
      type: "Consulting",
      details: [
        "디지털 마케팅 전략 기획 및 피드백",
        "월간 Engagement Rate 1~2% 성장 기여"
      ]
    },
    {
      id: "c6",
      company: "삼성전자",
      role: "광고 플랫폼 교육/자문",
      period: "2017.05 - 2019.02",
      type: "Consulting",
      details: [
        "모바일 사업부 내 DMP 개발 및 운영 교육",
        "프로그래머틱 광고 이론 및 기술 교육"
      ]
    }
  ],
  skills: [
    {
      name: "Strategy & Planning",
      items: ["Digital Strategy", "Growth Marketing", "Brand Strategy", "KPI/OKR Design", "Media Mix Modeling"]
    },
    {
      name: "Data & Analytics",
      items: ["Google Analytics (GA4)", "Google Search Console", "Social Listening", "Attribution Modeling", "Excel"]
    },
    {
      name: "Advertising & Channels",
      items: ["Meta Ads (FB/IG)", "Google Ads", "YouTube", "TikTok Ads", "Apple Search Ads", "SEO"]
    },
    {
      name: "Tools & Production",
      items: ["Slack", "Notion", "PowerPoint", "Content Creation", "Video Production Lead"]
    }
  ],
  certifications: [
    { name: "Meta Creative Strategy Professional", date: "2022.06", issuer: "Meta" },
    { name: "Meta Media Planning Professional", date: "2022.04", issuer: "Meta" },
    { name: "Apple Search Ads Certificate", date: "2021.11" }
  ],
  lectures: [
    {
      id: "l1",
      title: "디지털 콘텐츠 마케팅 실무 교육",
      organizer: "(주)마플 코퍼레이션",
      period: "2023",
      role: "Instructor",
      description: "마케팅 팀 대상 콘텐츠 기획, 커뮤니케이션 가이드라인 및 성과 측정 방법론 교육",
      details: [
        "콘텐츠 기획 프로세스 및 템플릿 제공",
        "브랜드 톤앤매너 설정 및 커뮤니케이션 가이드라인 수립",
        "콘텐츠 성과 측정을 위한 핵심 데이터 지표(KPI) 설정 방법론",
        "실무자를 위한 카피라이팅 및 크리에이티브 워크샵"
      ],
      tags: ["Content Planning", "Brand Guideline", "Performance Metrics", "Workshop"]
    },
    {
      id: "l2",
      title: "프로그래머틱 광고 및 DMP 운영 교육",
      organizer: "삼성전자 (Samsung Electronics)",
      period: "2017 - 2019",
      role: "Technical Instructor",
      description: "모바일 사업부 대상 프로그래머틱 광고 생태계 이해 및 DMP 활용 기술 교육",
      details: [
        "Ad Tech Ecosystem (DSP, DMP, SSP, Ad Exchange)의 구조적 이해",
        "DMP(Data Management Platform) 기반 오디언스 세그먼테이션 기술",
        "Global RTB(Real Time Bidding) 시스템 작동 원리 및 사례 분석",
        "모바일 디바이스 데이터 활용 및 프라이버시 이슈 대응"
      ],
      tags: ["Ad Tech", "DMP", "Programmatic Ads", "Mobile Data"]
    },
    {
      id: "l3",
      title: "Google Analytics 4 기초 실무",
      organizer: "Corporate / Public",
      period: "2023.10",
      role: "Instructor",
      description: "GA4 기본 설정 및 데이터 분석 기초 실무 강의",
      details: [
        "UA(Universal Analytics)와 GA4의 주요 차이점 및 데이터 모델 이해",
        "이벤트(Event) 기반 수집 구조 및 매개변수 설정 실습",
        "탐색(Explore) 보고서를 활용한 고객 여정 및 유입 경로 분석",
        "맞춤 보고서(Custom Report) 생성 및 데이터 시각화 기초"
      ],
      tags: ["GA4", "Data Analysis", "Tracking Setup", "Visualization"]
    },
    {
      id: "l4",
      title: "디지털 마케팅 전략 및 트렌드 특강",
      organizer: "각종 기업 및 대학",
      period: "2018 - Present",
      role: "Speaker",
      description: "디지털 마케팅 최신 트렌드, 데이터 기반 의사결정, 브랜드 커뮤니케이션 전략 특강 다수 진행",
      details: [
        "AI 시대의 디지털 마케팅 트렌드 변화 및 대응 전략",
        "데이터 드리븐(Data-Driven) 의사결정 프로세스 및 성공 사례",
        "소비자 행동 심리학과 브랜드 스토리텔링 전략",
        "퍼포먼스 마케팅과 브랜딩의 균형 성장(Growth) 전략"
      ],
      tags: ["Marketing Trends", "Data Driven", "Brand Storytelling", "Growth Strategy"]
    }
  ]
};