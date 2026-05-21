export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  problem: string;
  impact: string;
  technologies: string[];
  image?: string;
  icon?: string;
  githubUrl?: string;
  liveUrl?: string;
  accentColor: 'emerald' | 'gold';
  caseStudy: {
    architecturalHighlights: string[];
    technicalChallenge: string;
    solutionDetail: string;
    metrics: string[];
    codeSnippetTitle?: string;
    codeSnippet?: string;
  };
  category?: 'WEB' | 'APP' | 'AI' | 'UI_UX' | 'RESEARCH';
  isPrivate?: boolean;
  year?: string;
  phases?: any[];
  codeSnippetTitle?: string;
  codeSnippet?: string;
  features?: string[];
  challenges?: string[];
  metrics?: any;
}

export interface DeepDive {
  id: string;
  title: string;
  icon: string;
  description: string;
  accentColor: 'emerald' | 'gold';
  fullContent: {
    problemStatement: string;
    architectureDescription: string;
    keyDecisions: string[];
    diagramData?: string; // Representation of workflow/architecture
  };
}

export interface PhilosophyItem {
  title: string;
  description: string;
  borderAccent: 'emerald' | 'gold';
}

export interface SkillCategory {
  category: string;
  icon: string;
  skills: string[];
  accentColor: 'emerald' | 'gold';
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  timestamp: string;
}

export interface BlogPost {
  id: string;
  title: string;
  category: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  tags: string[];
  views: number;
  isPrivate?: boolean;
}

export interface DesignVaultItem {
  id: string;
  title: string;
  category: 'web' | 'app' | 'component' | 'layout';
  description: string;
  imageUrl?: string;
  demoUrl?: string;
  accentColor: string;
  stitchesProjectUrl?: string; // e.g. for Google Stitch embeds
  isPrivate?: boolean;
}

export interface WorkTemplate {
  id: string;
  type: 'web' | 'app' | 'research';
  title: string;
  description: string;
  technologies: string[];
  installation: string[];
  features: string[];
  fileStructure: {
    name: string;
    type: 'file' | 'directory';
    children?: any[];
    content?: string;
  }[];
  isPrivate?: boolean;
}

export interface ProjectJourneyUpdate {
  id: string;
  title: string;
  date: string;
  text: string;
  mediaType?: 'image' | 'video' | 'link' | 'none';
  mediaUrl?: string;
  phase: string; // e.g. 'Concept', 'Prototype', 'Alpha', 'Beta', 'Production'
}

export interface ProjectJourney {
  id: string;
  projectName: string;
  startDate: string;
  status: 'In Progress' | 'Shipped' | 'Paused';
  description: string;
  accentColor: string;
  isPrivate?: boolean;
  updates: ProjectJourneyUpdate[];
}

