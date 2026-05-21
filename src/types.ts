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
