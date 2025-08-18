// Project Data
// Centralized project information for the portfolio

export interface ProjectData {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  link: string;
  technologies?: string[];
  featured?: boolean;
  year?: number;
}

export const projects: ProjectData[] = [
  {
    id: 'prescriberx',
    title: 'PrescribeRX',
    category: 'Mobile App',
    description: 'Advanced Prescription Management System',
    image: '/images/projects/update5172025/PrescribeRX - Advanced Prescription Management.png',
    link: 'https://devpost.com/software/prescriberx',
    technologies: ['React Native', 'Node.js', 'MongoDB', 'AI/ML'],
    featured: true,
    year: 2024
  },
  {
    id: 'uhbotai',
    title: 'UHBotAI',
    category: 'AI Chatbot',
    description: 'University of Houston AI Assistant',
    image: '/images/projects/update5172025/UHBotAI.png',
    link: 'https://devpost.com/software/cougarcare-cwldbu',
    technologies: ['Python', 'LangChain', 'OpenAI', 'React'],
    featured: true,
    year: 2024
  },
  {
    id: 'restoreio',
    title: 'RestoreIO',
    category: 'Healthcare Platform',
    description: 'Physical Therapy Management System',
    image: '/images/projects/update5172025/RestoreIO - Bridging Recovery and Wellness.png',
    link: 'https://www.restoreio.com',
    technologies: ['Next.js', 'TypeScript', 'PostgreSQL', 'AWS'],
    featured: true,
    year: 2024
  },
  {
    id: 'cougargpt',
    title: 'CougarGPT',
    category: 'AI Platform',
    description: 'AI-powered Student Assistant',
    image: '/images/projects/update5172025/CougarGPT - AI-Powered Student Assistant.png',
    link: 'https://github.com/OfficialCodeVoyage/CougarGPT',
    technologies: ['Python', 'GPT-4', 'Flask', 'React'],
    featured: false,
    year: 2024
  },
  {
    id: 'nurseai',
    title: 'NurseAI',
    category: 'Healthcare AI',
    description: 'AI Assistant for Healthcare Professionals',
    image: '/images/projects/update5172025/NurseAI - Your Healthcare Assistant.png',
    link: 'https://devpost.com/software/nurseai',
    technologies: ['Python', 'TensorFlow', 'React', 'Node.js'],
    featured: false,
    year: 2024
  },
  {
    id: 'sizeme',
    title: 'SizeMe',
    category: 'E-commerce Tool',
    description: 'Virtual Fitting Room Technology',
    image: '/images/projects/update5172025/SizeMe - Virtual Fitting Room.png',
    link: 'https://github.com/OfficialCodeVoyage',
    technologies: ['Computer Vision', 'Python', 'React', 'Three.js'],
    featured: false,
    year: 2024
  },
  {
    id: 'memory-palace',
    title: 'Memory Palace',
    category: 'Educational App',
    description: 'Advanced Memory Training Platform',
    image: '/images/projects/update5172025/Memory Palace - Advanced Memory Training.png',
    link: 'https://github.com/OfficialCodeVoyage',
    technologies: ['React', 'Node.js', 'MongoDB', 'WebGL'],
    featured: false,
    year: 2023
  },
  {
    id: 'see-the-future',
    title: 'See The Future',
    category: 'AI Vision',
    description: 'Predictive Analytics Platform',
    image: '/images/projects/update5172025/See The Future - Predictive Analytics.png',
    link: 'https://github.com/OfficialCodeVoyage',
    technologies: ['Python', 'Machine Learning', 'React', 'D3.js'],
    featured: false,
    year: 2023
  },
  {
    id: 'amber-tesla',
    title: 'Amber Tesla',
    category: 'IoT Project',
    description: 'Smart Vehicle Integration System',
    image: '/images/projects/update5172025/Amber Tesla - Smart Vehicle Integration.png',
    link: 'https://github.com/OfficialCodeVoyage',
    technologies: ['IoT', 'Python', 'React Native', 'Tesla API'],
    featured: false,
    year: 2023
  },
  {
    id: 'astros-analytics',
    title: 'Astros Analytics',
    category: 'Sports Analytics',
    description: 'Baseball Performance Analysis Platform',
    image: '/images/projects/update5172025/Astros - Performance Analytics Platform.png',
    link: 'https://github.com/OfficialCodeVoyage',
    technologies: ['Python', 'Data Science', 'React', 'Chart.js'],
    featured: false,
    year: 2023
  },
  {
    id: 'plate-recognition',
    title: 'Plate Recognition',
    category: 'Computer Vision',
    description: 'License Plate Recognition System',
    image: '/images/projects/update5172025/Plate Recognition System.png',
    link: 'https://github.com/OfficialCodeVoyage',
    technologies: ['OpenCV', 'Python', 'TensorFlow', 'React'],
    featured: false,
    year: 2023
  }
];

// Helper functions for filtering and sorting projects
export const getFeaturedProjects = () => projects.filter(p => p.featured);
export const getProjectsByCategory = (category: string) => projects.filter(p => p.category === category);
export const getProjectsByYear = (year: number) => projects.filter(p => p.year === year);
export const getProjectById = (id: string) => projects.find(p => p.id === id);

// Categories for filtering
export const projectCategories = Array.from(new Set(projects.map(p => p.category)));

// Years for filtering
export const projectYears = Array.from(new Set(projects.map(p => p.year).filter(Boolean))).sort((a, b) => (b ?? 0) - (a ?? 0));