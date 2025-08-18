// Global type definitions for the Pavel Bondarenko portfolio

// Project type definition
export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  shortDescription?: string;
  image: string;
  link: string;
  technologies: string[];
  featured?: boolean;
  github?: string;
  demo?: string;
}

// Form data types
export interface ContactFormData {
  fullName: string;
  email: string;
  subject: string;
  message: string;
}

// API Response types
export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  error?: string;
  data?: T;
}

// Social Link type
export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

// Experience type
export interface Experience {
  id: string;
  startDate: string;
  endDate?: string;
  position: string;
  company: string;
  companyUrl?: string;
  description?: string;
  technologies?: string[];
}

// Education type
export interface Education {
  id: string;
  startYear: string;
  endYear: string;
  degree: string;
  field: string;
  school: string;
  schoolUrl?: string;
  description?: string;
}

// Skill type
export interface Skill {
  name: string;
  icon?: string;
  level?: number;
  category?: 'frontend' | 'backend' | 'cloud' | 'tools' | 'other';
}

// Navigation item type
export interface NavItem {
  label: string;
  href: string;
  active?: boolean;
  external?: boolean;
}

// Page metadata type
export interface PageMeta {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
  ogUrl?: string;
}

// Animation configuration type
export interface AnimationConfig {
  duration?: number;
  delay?: number;
  easing?: string;
  once?: boolean;
}

// Three.js particle configuration
export interface ParticleConfig {
  text: string;
  amount: number;
  particleSize: number;
  particleColor: number;
  textSize: number;
  area: number;
  ease: number;
}

// Email template data
export interface EmailTemplateData {
  to: string;
  from: string;
  subject: string;
  html: string;
  text?: string;
}

// Global window extensions (if needed)
declare global {
  interface Window {
    // Add any window extensions here if needed
  }
}

export {};