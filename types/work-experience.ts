// Types for Work Experience System
export interface BaseCard {
  id: number;
  year: string;
  description: string;
  detailed_content: string;
  logo_url: string;
  order_index: number;
  created_at: string;
  updated_at: string;
}

export interface WorkExperienceCard extends BaseCard {
  company_name: string;
  job_title: string;
}

export interface EducationCard extends BaseCard {
  institution_name: string;
  degree_title: string;
}

export interface PortfolioProjectCard extends BaseCard {
  project_name: string;
  job_title: string;
}

export interface AboutMeCard {
  id: number;
  title: string;
  description: string;
  created_at: string;
  updated_at: string;
}

export interface WorkExperienceData {
  aboutMe: AboutMeCard | null;
  workExperience: WorkExperienceCard[];
  portfolioProjects: PortfolioProjectCard[];
  education: EducationCard[];
}

// Types for editing
export interface EditableField {
  value: string;
  isEditing: boolean;
  hasChanges: boolean;
}

export interface CardEditState {
  [key: string]: EditableField;
}

export interface WorkExperienceEditState {
  workExperience: { [id: number]: CardEditState };
  education: { [id: number]: CardEditState };
  portfolioProjects: { [id: number]: CardEditState };
  aboutMe: CardEditState | null;
}

// API Response types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface UpdateCardRequest {
  id: number;
  cardType: 'work_experience' | 'education' | 'portfolio_projects' | 'about_me';
  fields: Record<string, string>;
}

export interface UpdateCardResponse {
  success: boolean;
  data?: any;
  error?: string;
}
