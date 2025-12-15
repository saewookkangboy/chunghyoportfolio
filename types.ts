export interface ProjectItem {
  id: string;
  client: string;
  role: string;
  period: string;
  description: string;
  tasks: string[];
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
    links: { label: string; url: string }[];
  };
  projects: ProjectItem[];
  careerHistory: CareerItem[];
  skills: SkillCategory[];
  certifications: Certification[];
  lectures: LectureItem[];
}