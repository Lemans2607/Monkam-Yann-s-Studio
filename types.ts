export enum UserRole {
  GUEST = 'GUEST',
  STUDENT = 'STUDENT',
  BUSINESS = 'BUSINESS',
  ADMIN = 'ADMIN'
}

export enum ContentCategory {
  AUDIO = 'AUDIO',
  VIDEO = 'VIDEO',
  SLIDE = 'SLIDE',
  INFOGRAPHIC = 'INFOGRAPHIC'
}

export interface ContentItem {
  id: string;
  title: string;
  description: string;
  category: ContentCategory;
  url: string;
  isZeroData: boolean;
  date: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

export enum PricingPlan {
  STUDENT = 'STUDENT',
  ENTREPRENEUR = 'ENTREPRENEUR',
  EXPERT = 'EXPERT'
}
