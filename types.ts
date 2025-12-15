export type Language = 'ko' | 'en' | 'ja';

export interface ProjectItem {
  id: string;
  client: string;
  role: string;
  period: string;
  description: string;
  tasks: string[];
  results?: string[];
  tags: string[];
  category: 'Consulting' | 'In-House' | 'Project';
}

export interface CareerItem {
  id: string;
  company: string;
  role: string;
  period: string;
  type: string;
  description?: string;
  details: string[];
}

export interface SkillCategory {
  name: string;
  items: string[];
}

export interface Certification {
  name: string;
  date: string;
  issuer?: string;
}

export interface LectureItem {
  id: string;
  title: string;
  organizer: string;
  period: string;
  role: string;
  description: string;
  details: string[];
  tags: string[];
}

export interface PortfolioData {
  profile: {
    name: string;
    englishName: string;
    email: string;
    phone: string;
    summary: string;
    quote: string;
    links: { label: string; url: string }[];
  };
  projects: ProjectItem[];
  careerHistory: CareerItem[];
  skills: SkillCategory[];
  certifications: Certification[];
  lectures: LectureItem[];
}

export interface UILabels {
  nav: {
    about: string;
    projects: string;
    expertise: string;
    lectures: string;
  };
  hero: {
    role: string;
    yearsExp: string;
    maxRoas: string;
    emailMe: string;
  };
  experience: {
    title: string;
    subtitle: string;
    description: string;
    historyTitle: string;
    historySubtitle: string;
    chronological: string;
    modalOverview: string;
    modalResponsibilities: string;
    modalResults: string;
    modalTech: string;
    modalClose: string;
  };
  skills: {
    title: string;
    subtitle: string;
    education: string;
    certifications: string;
  };
  lectures: {
    title: string;
    subtitle: string;
    description: string;
    modalSummary: string;
    modalCurriculum: string;
    modalKeywords: string;
  };
  chat: {
    openButton: string;
    closeButton: string;
    welcome: string;
    placeholder: string;
    assistantName: string;
    poweredBy: string;
  };
  footer: {
    rights: string;
    builtWith: string;
  };
}