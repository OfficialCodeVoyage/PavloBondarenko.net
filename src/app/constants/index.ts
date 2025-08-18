// Application Constants
// This file contains all hardcoded values used throughout the application

// Internal Routes
export const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  PROJECTS: '/projects',
  CONTACT: '/contact',
  BLOG: '/blog',
  CREDENTIALS: '/credentials',
  WORK_DETAILS: '/work-details',
  BLOG_DETAILS: '/blog-details',
} as const;

// External Links
export const EXTERNAL_LINKS = {
  LINKEDIN: 'https://www.linkedin.com/in/mrbondarenko/',
  GITHUB: 'https://github.com/OfficialCodeVoyage',
  YOUTUBE: 'https://www.youtube.com/@OfficialCodeVoyage',
  INSTAGRAM: 'https://www.instagram.com/pasha.369.bond/',
  XE_COM: 'https://www.xe.com',
} as const;

// API Endpoints
export const API_ENDPOINTS = {
  CONTACT: '/api/contact',
} as const;

// Animation Configuration
export const ANIMATION_CONFIG = {
  AOS_DURATION: 1500,
  AOS_ONCE: true,
  AOS_OFFSET: 100,
} as const;

// Personal Information
export const PERSONAL_INFO = {
  NAME: 'Pavlo Bondarenko',
  TITLE: 'Product @ Xe.com',
  EMAIL: 'bondarenkopavloua@yahoo.com',
  LOCATION: 'United States',
  YEARS_EXPERIENCE: 4,
  TOTAL_PROJECTS: 76,
  RESUME_URL: '/Pavlo_Bondarenko_Resume.pdf',
} as const;

// Site Metadata
export const SITE_METADATA = {
  TITLE: 'Pavlo Bondarenko - Product & AI',
  DESCRIPTION: 'Personal website of Pavlo Bondarenko - Full-stack developer & tech enthusiast. Explore my projects, skills, and professional journey.',
  URL: 'https://pavlobondarenko.net',
  KEYWORDS: ['Pavlo Bondarenko', 'full-stack developer', 'software engineer', 'web development', 'portfolio', 'projects'],
} as const;

// Image Paths
export const IMAGES = {
  LOGO: '/images/LOGO/pavlopic3.png',
  SIGNATURE: '/images/pbsignature.png',
  BACKGROUND: '/images/bg1.png',
  MY_WORKS: '/images/1my-works.png',
  ICON: '/images/icon.svg',
  ICON2: '/images/icon2.png',
  ICON3: '/images/icon3.png',
  STAR: '/images/star1.svg',
  YOUTUBE_THUMBNAIL: '/images/yt1.png',
} as const;

// Three.js Configuration
export const THREE_CONFIG = {
  MAGIC_EFFECT_PARTICLES: 1000,
  BACKGROUND_COLS: 300,
  BACKGROUND_GAP: 3,
  PARTICLE_SIZE: 2,
} as const;

// Form Configuration
export const FORM_CONFIG = {
  RATE_LIMIT_REQUESTS: 3,
  RATE_LIMIT_WINDOW: 60, // seconds
  MAX_MESSAGE_LENGTH: 1000,
  MAX_SUBJECT_LENGTH: 100,
  MAX_NAME_LENGTH: 50,
} as const;

// Social Links (for easy iteration)
export const SOCIAL_LINKS = [
  { name: 'LinkedIn', url: EXTERNAL_LINKS.LINKEDIN, icon: 'iconoir-linkedin' },
  { name: 'GitHub', url: EXTERNAL_LINKS.GITHUB, icon: 'iconoir-github' },
  { name: 'Instagram', url: EXTERNAL_LINKS.INSTAGRAM, icon: 'iconoir-instagram' },
  { name: 'YouTube', url: EXTERNAL_LINKS.YOUTUBE, icon: 'iconoir-youtube' },
] as const;

// Navigation Items
export const NAV_ITEMS = [
  { label: 'Home', href: ROUTES.HOME },
  { label: 'About', href: ROUTES.ABOUT },
  { label: 'Projects', href: ROUTES.PROJECTS },
  { label: 'Contact', href: ROUTES.CONTACT },
] as const;