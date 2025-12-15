import { PortfolioData, UILabels } from './types';

// ==========================================
// KOREAN DATA (Original)
// ==========================================
export const RESUME_DATA_KO: PortfolioData = {
  profile: {
    name: "박충효",
    englishName: "Park Chunghyo",
    email: "chunghyo@troe.kr",
    phone: "010-9174-1074",
    summary: `20년차 마케팅 전략 전문가 &
AI기반 마케팅 빌더(Team & Empowerment)

웹서비스, 리서치, 콘텐츠, 에이전시, 컨설팅 펌을 거쳐
개인 비즈니스까지 다양한 스펙트럼 보유

'현장에서 답을 찾고,
지속적인 Learn-by-Doing'을 토대로
그로스, 퍼포먼스, 브랜드, 콘텐츠,
커뮤니케이션에 이르기까지
데이터 기반의 의사결정을 기반으로
통합적인 마케팅 전략 전문가로 활동

AI 기술과 책임있는 AI의 실력을 기반으로
데이터와 크리에이티브의 결합 중심의
지속적인 Expert로 성장하고 있습니다.`,
    links: [
      { label: "Website", url: "https://troe.kr" },
      { label: "LinkedIn", url: "https://www.linkedin.com/in/chunghyopark/" },
      { label: "GitHub", url: "https://github.com/saewookkangboy" },
      { label: "Brunch", url: "https://brunch.co.kr/@saewookkangboy" },
      { label: "AI Project: Prompt", url: "https://prompt.allrounder.im/" },
      { label: "AI Project: Gaeo", url: "https://gaeo.allrounder.im/" }
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
        "브랜드 방향성에 맞춘 콘텐츠 기획 및 오가닉 채널(Owned/Earned Media) 운영 체계화"
      ],
      results: [
        "팀 빌딩 및 R&R 수립 완료",
        "운영 가이드라인 및 데이터 거버넌스 프로세스 정립"
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
        "경쟁사 이슈 교차 분석 및 시사점 발굴"
      ],
      results: [
        "감성 분석(Sentimental) 모델 적용",
        "글로벌 테크 릴리즈 이슈 트렌드 모니터링 체계 구축"
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
        "Kakao Tech 블로그 활용 행사 프리뷰/리캡 콘텐츠 기획"
      ],
      results: [
        "Index Governance 및 Metric Guideline 개발 및 적용"
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
        "틈새라면 X ZB1 하이브리드 캠페인 데이터 모니터링",
        "디지털 채널(유튜브, 인스타그램, 틱톡, X) 성과 측정 리드"
      ],
      results: [
        "캠페인 통합 리포트 개발 및 성과 시각화"
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
        "커머스 플랫폼 설계에 필요한 고객 행동 여정 기반 KPI 개발"
      ],
      results: [
        "네이버 스마트스토어 운영 가이드라인 및 플레이북 개발 완료"
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
        "페이스북/유튜브 월간 운영 전략 및 인사이트 분석"
      ],
      results: [
        "대외 커뮤니케이션 가이드라인 수립",
        "채널 운영 플레이북 제작"
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
        "콘텐츠 마케터 핵심 업무 역량 고도화 멘토링",
        "팀 조직 개편을 위한 대표 자문역 수행"
      ],
      results: [
        "커뮤니케이션 가이드라인 정립",
        "실무 교육 커리큘럼 개발 및 적용"
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
        "GA 중심 웹사이트 측정 및 분석",
        "고객 여정 분석 및 전환 기여도 분석",
        "맞춤 리포트 제작 및 고객 커뮤니케이션"
      ],
      results: [
        "퍼포먼스 월 3~5% 상승 기여",
        "데이터 기반 의사결정 프로세스 도입"
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
        "DMP(Data Management Platform)基盤의 오디언스 세그먼테이션 기술",
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

// ==========================================
// ENGLISH DATA (Native/Professional)
// ==========================================
export const RESUME_DATA_EN: PortfolioData = {
  profile: {
    ...RESUME_DATA_KO.profile,
    summary: `20-Year Marketing Strategy Expert &
AI-Driven Marketing Builder (Team & Empowerment).

Possessing a diverse spectrum of experience spanning web services, research, content, agencies, consulting firms, and private business.

Based on the motto of "finding answers in the field and continuous Learn-by-Doing," I operate as an integrated marketing strategy expert covering Growth, Performance, Branding, Content, and Communication, grounded in Data-Driven decision making.

I am continuously growing as an Expert focused on the convergence of data and creativity, built upon AI technology and Responsible AI capabilities.`,
  },
  projects: [
    {
      id: "p1",
      client: "Flow",
      role: "Marketing Strategy & Analytics Partner",
      period: "2025.04 - 2025.06",
      category: "Consulting",
      description: "Digital strategy formulation, team building, and communication advisory for a commerce platform.",
      tasks: [
        "Advised on digital and data-driven growth strategies for 4 commerce platform brands.",
        "Planned content aligned with brand direction and systematized organic channel (Owned/Earned Media) operations."
      ],
      results: [
        "Established team structure and R&R.",
        "Defined operational guidelines and data governance processes."
      ],
      tags: ["Digital Strategy", "Team Building", "Growth Strategy", "Data Governance"]
    },
    {
      id: "p2",
      client: "Burger King Korea (BKR)",
      role: "Data Analysis Partner",
      period: "2025.03 - 2025.06",
      category: "Consulting",
      description: "Online buzz analysis and digital trend reporting service.",
      tasks: [
        "Conducted quantitative and qualitative analysis of VOC (Voice of Customer) across major online channels.",
        "Performed cross-analysis of competitor issues and derived actionable insights."
      ],
      results: [
        "Applied sentimental analysis models.",
        "Established a monitoring system for global tech release trends."
      ],
      tags: ["Data Analysis", "VOC", "Trend Report", "Social Listening"]
    },
    {
      id: "p3",
      client: "Kakao Corp",
      role: "Marketing Strategy & Content Planning",
      period: "2024.08 - 2024.12",
      category: "Consulting",
      description: "Online content marketing for Kakao Tech (if kakaoAI 2024).",
      tasks: [
        "Participated in content development for 'if(kakaoAI) 2024' major online and developer sessions.",
        "Led the production of the CTO keynote and technical videos.",
        "Planned event preview/recap content utilizing the Kakao Tech Blog."
      ],
      results: [
        "Developed and applied Index Governance and Metric Guidelines."
      ],
      tags: ["Content Marketing", "Tech Conference", "Video Production", "KPI Design"]
    },
    {
      id: "p4",
      client: "Paldo Co., Ltd.",
      role: "Data Analysis",
      period: "2024.07 - 2024.09",
      category: "Consulting",
      description: "Performance measurement project for Teumsae Ramyun collaboration campaign.",
      tasks: [
        "Monitored data for the Teumsae Ramyun X ZB1 hybrid campaign.",
        "Led performance measurement across digital channels (YouTube, Instagram, TikTok, X)."
      ],
      results: [
        "Developed integrated campaign reports and visualized performance."
      ],
      tags: ["Performance Analysis", "Collaboration Campaign", "Social Metrics"]
    },
    {
      id: "p5",
      client: "ExxonMobil (Mobil 1)",
      role: "Consultant",
      period: "2024.03 - 2024.07",
      category: "Consulting",
      description: "Commerce platform construction and guideline design.",
      tasks: [
        "Diagnosed existing site operations from a marketing perspective and designed checklists.",
        "Developed KPIs based on customer behavioral journeys required for commerce platform design."
      ],
      results: [
        "Completed development of Naver Smart Store operational guidelines and playbooks."
      ],
      tags: ["Commerce Strategy", "UX/UI Audit", "Playbook", "Naver Smart Store"]
    },
    {
      id: "p6",
      client: "Kakao Brain",
      role: "Digital Channel Strategy & Operation",
      period: "2023.04 - 2024.03",
      category: "Consulting",
      description: "Digital channel operation, content planning, and playbook creation.",
      tasks: [
        "Planned and advised on corporate digital communication strategies.",
        "Analyzed monthly operational strategies and insights for Facebook/YouTube."
      ],
      results: [
        "Established external communication guidelines.",
        "Created channel operation playbooks."
      ],
      tags: ["AI Marketing", "Digital Communication", "Channel Management"]
    },
    {
      id: "p7",
      client: "Marpple Corporation",
      role: "Growth Advisor",
      period: "2023.06 - 2024.01",
      category: "Consulting",
      description: "Advisory on digital initiatives and content marketing growth.",
      tasks: [
        "Mentored content marketers to enhance core competencies.",
        "Advised the CEO on team reorganization."
      ],
      results: [
        "Established communication guidelines.",
        "Developed and applied practical training curricula."
      ],
      tags: ["Mentoring", "Organizational Structure", "Content Strategy"]
    },
    {
      id: "p8",
      client: "SK Broadband",
      role: "Data Analysis",
      period: "2019.06 - 2020.07",
      category: "Consulting",
      description: "Website analysis and performance reporting.",
      tasks: [
        "Measured and analyzed websites centering on GA.",
        "Analyzed customer journeys and attribution models.",
        "Created customized reports and managed client communication."
      ],
      results: [
        "Contributed to a 3-5% monthly performance increase.",
        "Introduced data-driven decision-making processes."
      ],
      tags: ["Google Analytics", "Web Performance", "Customer Journey"]
    }
  ],
  careerHistory: [
    {
      id: "c1",
      company: "Troe",
      role: "Representative Partner",
      period: "2016.01 - Present",
      type: "Founder",
      details: [
        "Providing advisory on digital strategy, data analysis, and content planning for various enterprises.",
        "Key Clients: Flow, Burger King, Kakao, Paldo, ExxonMobil, SK Broadband, etc."
      ]
    },
    {
      id: "c2",
      company: "Medicare Labs (NUGU)",
      role: "Team Lead",
      period: "2022.04 - 2023.02",
      type: "In-House",
      details: [
        "Oversaw Paid Media Buying, Operation, and Growth Action.",
        "Executed Full Funnel Campaign Activation (Meta, Google, TikTok, etc.).",
        "Managed North Star KPIs (achieved 3-5% monthly growth in Active Buyers).",
        "Achieved a cumulative ROAS of 1500% based on paid channels."
      ]
    },
    {
      id: "c3",
      company: "Gomi Corporation",
      role: "Head of Marketing / Team Lead",
      period: "2020.07 - 2022.03",
      type: "In-House",
      details: [
        "Established and executed digital marketing strategies for Vietnam/Thailand markets.",
        "Reduced average CAC from 1,200 to 45; Increased Retention Rate from 41% to 51%.",
        "Concretized internal media mix models and optimized performance.",
        "Supported Series investment rounds (Metric discovery)."
      ]
    },
    {
      id: "c4",
      company: "BRPR Company",
      role: "Strategy Director",
      period: "2017.10 - 2021.02",
      type: "Agency",
      details: [
        "Oversaw Digital Marketing Retainer for Amer Sports Korea (Salomon, Wilson, etc.).",
        "Planned digital marketing strategies and on/offline event content."
      ]
    },
    {
      id: "c5",
      company: "Warner Music Korea",
      role: "Digital Marketing Advisor",
      period: "2016.06 - 2019.02",
      type: "Consulting",
      details: [
        "Planned and provided feedback on digital marketing strategies.",
        "Contributed to 1-2% growth in monthly Engagement Rate."
      ]
    },
    {
      id: "c6",
      company: "Samsung Electronics",
      role: "Ad Platform Instructor/Advisor",
      period: "2017.05 - 2019.02",
      type: "Consulting",
      details: [
        "Educated Mobile Division on DMP development and operation.",
        "Conducted training on Programmatic Advertising theory and technology."
      ]
    }
  ],
  skills: RESUME_DATA_KO.skills,
  certifications: RESUME_DATA_KO.certifications,
  lectures: [
    {
      id: "l1",
      title: "Digital Content Marketing Practice",
      organizer: "Marpple Corporation",
      period: "2023",
      role: "Instructor",
      description: "Training for marketing teams on content planning, communication guidelines, and performance measurement methodologies.",
      details: [
        "Provided content planning processes and templates.",
        "Established brand tone & manner and communication guidelines.",
        "Taught methodologies for setting key data indicators (KPIs) for content performance measurement.",
        "Conducted copywriting and creative workshops for practitioners."
      ],
      tags: ["Content Planning", "Brand Guideline", "Performance Metrics", "Workshop"]
    },
    {
      id: "l2",
      title: "Programmatic Ads & DMP Operation",
      organizer: "Samsung Electronics",
      period: "2017 - 2019",
      role: "Technical Instructor",
      description: "Education on the Programmatic Advertising ecosystem and DMP utilization technologies for the Mobile Division.",
      details: [
        "Structural understanding of Ad Tech Ecosystem (DSP, DMP, SSP, Ad Exchange).",
        "Audience segmentation technology based on DMP (Data Management Platform).",
        "Operational principles and case studies of Global RTB (Real Time Bidding) systems.",
        "Utilization of mobile device data and response to privacy issues."
      ],
      tags: ["Ad Tech", "DMP", "Programmatic Ads", "Mobile Data"]
    },
    {
      id: "l3",
      title: "Google Analytics 4 Fundamentals",
      organizer: "Corporate / Public",
      period: "2023.10",
      role: "Instructor",
      description: "Basic setup of GA4 and fundamental data analysis practice.",
      details: [
        "Understanding major differences between UA (Universal Analytics) and GA4 and data models.",
        "Practice on Event-based collection structures and parameter settings.",
        "Analysis of customer journeys and acquisition paths using Explore reports.",
        "Creation of Custom Reports and basics of data visualization."
      ],
      tags: ["GA4", "Data Analysis", "Tracking Setup", "Visualization"]
    },
    {
      id: "l4",
      title: "Digital Marketing Strategy & Trends",
      organizer: "Various Corps & Universities",
      period: "2018 - Present",
      role: "Speaker",
      description: "Numerous special lectures on the latest digital marketing trends, data-driven decision making, and brand communication strategies.",
      details: [
        "Digital marketing trend changes and response strategies in the AI era.",
        "Data-Driven decision-making processes and success stories.",
        "Consumer behavioral psychology and brand storytelling strategies.",
        "Balanced growth strategies between Performance Marketing and Branding."
      ],
      tags: ["Marketing Trends", "Data Driven", "Brand Storytelling", "Growth Strategy"]
    }
  ]
};

// ==========================================
// JAPANESE DATA (Native Business Level)
// ==========================================
export const RESUME_DATA_JA: PortfolioData = {
  profile: {
    ...RESUME_DATA_KO.profile,
    summary: `20年以上の経験を持つマーケティング戦略専門家 &
AIベースのマーケティングビルダー (Team & Empowerment)。

Webサービス、リサーチ、コンテンツ、エージェンシー、コンサルティングファームを経て、個人ビジネスまで幅広いスペクトルを保有しています。

「現場で答えを見つけ、持続的なLearn-by-Doing（実践を通じて学ぶ）」を基盤に、グロース、パフォーマンス、ブランド、コンテンツ、コミュニケーションに至るまで、データに基づく意思決定を中心とした統合的なマーケティング戦略専門家として活動しています。

AI技術と責任あるAIの実力を基に、データとクリエイティブの融合を中心とした持続的なExpertとして成長し続けています。`,
  },
  projects: [
    {
      id: "p1",
      client: "Flow（フロー）",
      role: "マーケティング戦略およびコンテンツ企画・分析パートナー",
      period: "2025.04 - 2025.06",
      category: "Consulting",
      description: "コマースプラットフォームのデジタル戦略立案、チームビルディング、コミュニケーション顧問。",
      tasks: [
        "コマースプラットフォーム・ブランド（4つ）のデジタル戦略およびデータドリブンなグロース戦略の助言。",
        "ブランドの方向性に合わせたコンテンツ企画およびオガニックチャネル（Owned/Earned Media）の運営体系化。"
      ],
      results: [
        "チームビルディングおよびR&R（役割と責任）の策定完了。",
        "運営ガイドラインおよびデータガバナンス・プロセスの確立。"
      ],
      tags: ["Digital Strategy", "Team Building", "Growth Strategy", "Data Governance"]
    },
    {
      id: "p2",
      client: "バーガーキング・コリア (BKR)",
      role: "データ分析パートナー",
      period: "2025.03 - 2025.06",
      category: "Consulting",
      description: "オンライン・バズ分析およびデジタルトレンドレポートサービス。",
      tasks: [
        "主要オンラインチャネルのバズ（VOC）の定量的・定性的分析。",
        "競合他社のイシューとのクロス分析および示唆点の導出。"
      ],
      results: [
        "センチメント分析（感情分析）モデルの適用。",
        "グローバルテックリリースのイシュートレンドモニタリング体系の構築。"
      ],
      tags: ["Data Analysis", "VOC", "Trend Report", "Social Listening"]
    },
    {
      id: "p3",
      client: "カカオ (Kakao Corp)",
      role: "マーケティング戦略およびコンテンツ企画",
      period: "2024.08 - 2024.12",
      category: "Consulting",
      description: "カカオテック (if kakaoAI 2024) オンラインコンテンツマーケティング。",
      tasks: [
        "if(kakaoAI) 2024の主要オンラインおよび開発者セッションのコンテンツ開発に参加。",
        "CTOキーノートおよび技術映像制作のリード。",
        "Kakao Techブログを活用したイベントプレビュー/リキャップ・コンテンツの企画。"
      ],
      results: [
        "Index GovernanceおよびMetric Guidelineの開発と適用。"
      ],
      tags: ["Content Marketing", "Tech Conference", "Video Production", "KPI Design"]
    },
    {
      id: "p4",
      client: "株式会社パルド (Paldo)",
      role: "データ分析",
      period: "2024.07 - 2024.09",
      category: "Consulting",
      description: "トゥムセラーメン（Teumsae Ramyun）コラボレーション・キャンペーンの成果測定プロジェクト。",
      tasks: [
        "トゥムセラーメン X ZB1 ハイブリッドキャンペーンのデータモニタリング。",
        "デジタルチャネル（YouTube, Instagram, TikTok, X）における成果測定のリード。"
      ],
      results: [
        "キャンペーン統合レポートの開発および成果の可視化。"
      ],
      tags: ["Performance Analysis", "Collaboration Campaign", "Social Metrics"]
    },
    {
      id: "p5",
      client: "エクソンモービル (Mobil 1)",
      role: "コンサルタント",
      period: "2024.03 - 2024.07",
      category: "Consulting",
      description: "コマースプラットフォーム構築およびガイドライン設計。",
      tasks: [
        "既運営サイトのマーケティング観点からの運営診断およびチェックリスト設計。",
        "コマースプラットフォーム設計に必要な顧客行動ジャーニーに基づくKPI開発。"
      ],
      results: [
        "Naverスマートストア運営ガイドラインおよびプレイブックの開発完了。"
      ],
      tags: ["Commerce Strategy", "UX/UI Audit", "Playbook", "Naver Smart Store"]
    },
    {
      id: "p6",
      client: "カカオブレイン (Kakao Brain)",
      role: "デジタルチャネル運営および戦略",
      period: "2023.04 - 2024.03",
      category: "Consulting",
      description: "デジタルチャネル運営、コンテンツ企画、プレイブック制作。",
      tasks: [
        "企業のデジタルコミュニケーション戦略の企画および助言。",
        "Facebook/YouTubeの月間運営戦略およびインサイト分析。"
      ],
      results: [
        "対外コミュニケーションガイドラインの策定。",
        "チャネル運営プレイブックの制作。"
      ],
      tags: ["AI Marketing", "Digital Communication", "Channel Management"]
    },
    {
      id: "p7",
      client: "(株)マープルコーポレーション",
      role: "グロース・アドバイザー",
      period: "2023.06 - 2024.01",
      category: "Consulting",
      description: "デジタル・イニシアティブおよびコンテンツマーケティングの成長に関する助言。",
      tasks: [
        "コンテンツマーケターの核心業務能力の高度化メンタリング。",
        "チーム組織改編のための代表アドバイザリー。"
      ],
      results: [
        "コミュニケーションガイドラインの確立。",
        "実務教育カリキュラムの開発および適用。"
      ],
      tags: ["Mentoring", "Organizational Structure", "Content Strategy"]
    },
    {
      id: "p8",
      client: "SKブロードバンド",
      role: "データ分析",
      period: "2019.06 - 2020.07",
      category: "Consulting",
      description: "ウェブサイト分析およびパフォーマンスレポート。",
      tasks: [
        "GAを中心としたウェブサイト測定および分析。",
        "顧客ジャーニー分析およびアトリビューション分析。",
        "カスタムレポートの制作およびクライアント・コミュニケーション。"
      ],
      results: [
        "パフォーマンス月3〜5%向上に寄与。",
        "データに基づく意思決定プロセスの導入。"
      ],
      tags: ["Google Analytics", "Web Performance", "Customer Journey"]
    }
  ],
  careerHistory: [
    {
      id: "c1",
      company: "Troe（トロイ）",
      role: "代表パートナー (マーケター)",
      period: "2016.01 - 現在",
      type: "Founder",
      details: [
        "多様な企業のデジタル戦略、データ分析、コンテンツ企画に関する助言を提供。",
        "主要顧客：Flow、バーガーキング、カカオ、パルド、エクソンモービル、SKブロードバンドなど。"
      ]
    },
    {
      id: "c2",
      company: "メディケアラボ (NUGU)",
      role: "チームリード",
      period: "2022.04 - 2023.02",
      type: "In-House",
      details: [
        "Paid Mediaのバイイング、オペレーション、グロースアクションを統括。",
        "フルファネル・キャンペーンのアクティベーション (Meta, Google, TikTokなど)。",
        "North Star KPIの運営・維持 (月間Active Buyer 3~5%成長)。",
        "Paid媒体ベースで累積ROAS 1500%を達成。"
      ]
    },
    {
      id: "c3",
      company: "Gomi Corporation",
      role: "マーケティング統括 / チームリード",
      period: "2020.07 - 2022.03",
      type: "In-House",
      details: [
        "ベトナム・タイ市場対象のデジタルマーケティング戦略の策定および実行。",
        "平均CACを1,200から45へ削減、Retention Rateを41%から51%へ向上。",
        "組織内のメディアミックスモデルの具体化およびパフォーマンス最適化。",
        "シリーズ投資ラウンドのサポート (指標発掘)。"
      ]
    },
    {
      id: "c4",
      company: "BRPRカンパニー",
      role: "戦略ディレクター (理事)",
      period: "2017.10 - 2021.02",
      type: "Agency",
      details: [
        "アメアスポーツ・コリアのデジタルマーケティング・リテーナー統括 (Salomon, Wilsonなど)。",
        "デジタルマーケティング戦略企画およびオン/オフライン行事のコンテンツ企画。"
      ]
    },
    {
      id: "c5",
      company: "ワーナーミュージック・コリア",
      role: "デジタルマーケティング顧問",
      period: "2016.06 - 2019.02",
      type: "Consulting",
      details: [
        "デジタルマーケティング戦略企画およびフィードバック。",
        "月間Engagement Rateの1〜2%成長に寄与。"
      ]
    },
    {
      id: "c6",
      company: "サムスン電子",
      role: "広告プラットフォーム教育/顧問",
      period: "2017.05 - 2019.02",
      type: "Consulting",
      details: [
        "モバイル事業部内のDMP開発および運営教育。",
        "プログラマティック広告の理論および技術教育。"
      ]
    }
  ],
  skills: RESUME_DATA_KO.skills,
  certifications: RESUME_DATA_KO.certifications,
  lectures: [
    {
      id: "l1",
      title: "デジタルコンテンツマーケティング実務教育",
      organizer: "(株)マープルコーポレーション",
      period: "2023",
      role: "Instructor",
      description: "マーケティングチーム対象のコンテンツ企画、コミュニケーションガイドラインおよび成果測定方法論の教育。",
      details: [
        "コンテンツ企画プロセスおよびテンプレートの提供。",
        "ブランドトンマナの設定およびコミュニケーションガイドラインの策定。",
        "コンテンツ成果測定のための核心データ指標(KPI)設定方法論。",
        "実務者のためのコピーライティングおよびクリエイティブ・ワークショップ。"
      ],
      tags: ["Content Planning", "Brand Guideline", "Performance Metrics", "Workshop"]
    },
    {
      id: "l2",
      title: "プログラマティック広告およびDMP運営教育",
      organizer: "サムスン電子",
      period: "2017 - 2019",
      role: "Technical Instructor",
      description: "モバイル事業部対象のプログラマティック広告エコシステムの理解およびDMP活用技術教育。",
      details: [
        "Ad Tech Ecosystem (DSP, DMP, SSP, Ad Exchange)の構造的理解。",
        "DMP(Data Management Platform)基盤のオーディエンス・セグメンテーション技術。",
        "Global RTB(Real Time Bidding)システムの作動原理および事例分析。",
        "モバイルデバイスデータの活用およびプライバシー問題への対応。"
      ],
      tags: ["Ad Tech", "DMP", "Programmatic Ads", "Mobile Data"]
    },
    {
      id: "l3",
      title: "Google Analytics 4 基礎実務",
      organizer: "企業 / 公共機関",
      period: "2023.10",
      role: "Instructor",
      description: "GA4の基本設定およびデータ分析基礎実務講義。",
      details: [
        "UA(Universal Analytics)とGA4の主な違いおよびデータモデルの理解。",
        "イベント(Event)基盤の収集構造およびパラメータ設定の実習。",
        "探索(Explore)レポートを活用した顧客ジャーニーおよび流入経路の分析。",
        "カスタムレポート(Custom Report)作成およびデータ可視化の基礎。"
      ],
      tags: ["GA4", "Data Analysis", "Tracking Setup", "Visualization"]
    },
    {
      id: "l4",
      title: "デジタルマーケティング戦略およびトレンド特講",
      organizer: "各種企業および大学",
      period: "2018 - 現在",
      role: "Speaker",
      description: "デジタルマーケティングの最新トレンド、データに基づく意思決定、ブランドコミュニケーション戦略に関する多数の特別講義。",
      details: [
        "AI時代のデジタルマーケティングトレンドの変化および対応戦略。",
        "データドリブン(Data-Driven)な意思決定プロセスおよび成功事例。",
        "消費者行動心理学とブランドストーリーテリング戦略。",
        "パフォーマンスマーケティングとブランディングの均衡ある成長(Growth)戦略。"
      ],
      tags: ["Marketing Trends", "Data Driven", "Brand Storytelling", "Growth Strategy"]
    }
  ]
};

// ==========================================
// UI LABELS
// ==========================================
export const UI_LABELS: Record<'ko' | 'en' | 'ja', UILabels> = {
  ko: {
    nav: {
      about: 'About',
      projects: 'Projects',
      expertise: 'Expertise',
      lectures: 'Lectures',
    },
    hero: {
      role: 'Portfolio 2025',
      yearsExp: 'Years Exp',
      maxRoas: 'Max ROAS',
      emailMe: '이메일 보내기',
    },
    experience: {
      title: 'Projects',
      subtitle: 'Selected Works 2016 — 2025',
      description: '프로젝트를 클릭하면 상세 역할과 성과를 확인할 수 있습니다.',
      historyTitle: 'Professional History',
      historySubtitle: 'Full Career Timeline',
      chronological: 'Chronological Order',
      modalOverview: '개요',
      modalResponsibilities: '주요 역할 및 성과',
      modalResults: '주요 성과 및 임팩트',
      modalTech: '사용 기술 및 도메인',
      modalClose: '닫기',
    },
    skills: {
      title: 'Expertise',
      subtitle: 'Capabilities & Credentials',
      education: 'Education',
      certifications: 'Certifications',
    },
    lectures: {
      title: 'Lectures',
      subtitle: 'Speaking & Teaching',
      description: '기업 교육 및 강연을 통해 현장 경험과 지식을 공유합니다.',
      modalSummary: '요약',
      modalCurriculum: '커리큘럼 및 주요 주제',
      modalKeywords: '키워드',
    },
    chat: {
      openButton: 'AI에게 질문하기',
      closeButton: '닫기',
      welcome: "안녕하세요! 박충효님의 AI 포트폴리오 어시스턴트입니다. 경력이나 프로젝트에 대해 궁금한 점을 물어보세요.",
      placeholder: "예: 버거킹 프로젝트 성과는?",
      assistantName: 'Portfolio Assistant',
      poweredBy: 'Powered by Gemini',
    },
    footer: {
      rights: 'All Rights Reserved.',
      builtWith: 'Built with React & Gemini AI',
    }
  },
  en: {
    nav: {
      about: 'About',
      projects: 'Projects',
      expertise: 'Expertise',
      lectures: 'Lectures',
    },
    hero: {
      role: 'Portfolio 2025',
      yearsExp: 'Years Exp',
      maxRoas: 'Max ROAS',
      emailMe: 'Email Me',
    },
    experience: {
      title: 'Projects',
      subtitle: 'Selected Works 2016 — 2025',
      description: 'Click on any project to view detailed case studies, roles, and outcomes.',
      historyTitle: 'Professional History',
      historySubtitle: 'Full Career Timeline',
      chronological: 'Chronological Order',
      modalOverview: 'Overview',
      modalResponsibilities: 'Key Responsibilities & Achievements',
      modalResults: 'Key Results & Impact',
      modalTech: 'Technologies & Domains',
      modalClose: 'Close Details',
    },
    skills: {
      title: 'Expertise',
      subtitle: 'Capabilities & Credentials',
      education: 'Education',
      certifications: 'Certifications',
    },
    lectures: {
      title: 'Lectures',
      subtitle: 'Speaking & Teaching',
      description: 'Sharing knowledge and field expertise through corporate training and educational sessions.',
      modalSummary: 'Summary',
      modalCurriculum: 'Curriculum & Key Topics',
      modalKeywords: 'Keywords',
    },
    chat: {
      openButton: 'Ask AI Assistant',
      closeButton: 'Close',
      welcome: "Hello! I am Park Chunghyo's AI Portfolio Assistant. Ask me anything about his career or projects.",
      placeholder: "Ex: What were the results of the Burger King project?",
      assistantName: 'Portfolio Assistant',
      poweredBy: 'Powered by Gemini',
    },
    footer: {
      rights: 'All Rights Reserved.',
      builtWith: 'Built with React & Gemini AI',
    }
  },
  ja: {
    nav: {
      about: 'About',
      projects: 'Projects',
      expertise: 'Expertise',
      lectures: 'Lectures',
    },
    hero: {
      role: 'Portfolio 2025',
      yearsExp: 'Years Exp',
      maxRoas: 'Max ROAS',
      emailMe: 'メールを送る',
    },
    experience: {
      title: 'Projects',
      subtitle: 'Selected Works 2016 — 2025',
      description: 'プロジェクトをクリックすると、詳細なケーススタディ、役割、成果を確認できます。',
      historyTitle: 'Professional History',
      historySubtitle: 'Full Career Timeline',
      chronological: 'Chronological Order',
      modalOverview: '概要',
      modalResponsibilities: '主な役割と成果',
      modalResults: '主な成果とインパクト',
      modalTech: '使用技術・ドメイン',
      modalClose: '閉じる',
    },
    skills: {
      title: 'Expertise',
      subtitle: 'Capabilities & Credentials',
      education: 'Education',
      certifications: 'Certifications',
    },
    lectures: {
      title: 'Lectures',
      subtitle: 'Speaking & Teaching',
      description: '企業研修や講演を通じて、現場の経験と知識を共有しています。',
      modalSummary: '要約',
      modalCurriculum: 'カリキュラムおよび主要トピック',
      modalKeywords: 'キーワード',
    },
    chat: {
      openButton: 'AIに質問する',
      closeButton: '閉じる',
      welcome: "こんにちは！パク・チュンヒョのAIポートフォリオ・アシスタントです。経歴やプロジェクトについてお気軽にご質問ください。",
      placeholder: "例：バーガーキングのプロジェクト成果は？",
      assistantName: 'Portfolio Assistant',
      poweredBy: 'Powered by Gemini',
    },
    footer: {
      rights: 'All Rights Reserved.',
      builtWith: 'Built with React & Gemini AI',
    }
  }
};