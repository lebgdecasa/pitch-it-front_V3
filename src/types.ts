// src/types.ts
// User Types
export interface User {
  id: string;
  name: string;
  email: string;
  plan: 'free' | 'pro' | 'enterprise';
  createdAt: string;
  projectsCount: number;
  ImageUrl?: string; // Added for user profile image
}

// Pitch Types
export interface Pitch {
  problem: string;
  solution: string;
  targetMarket: string;
  businessModel: string;
  competition: string;
  uniqueSellingPoint: string;
  marketingStrategy: string;
  fullDescription?: string; // Added for the new pitch assistant workflow
}

// Pitch Deck Types
export interface PitchDeckSlide {
  id: string; // Should be string for UUIDs
  type: 'cover' | 'problem' | 'solution' | 'market' | 'product' | 'traction' | 'team' | 'competition' | 'business-model' | 'financials' | 'ask' | 'contact' | 'custom'; // Added 'custom' for flexibility
  content: Record<string, string>;
  notes?: string; // Added for presenter notes
  order: number; // Keep order for rendering
}


export interface PitchDeck {
  slides: PitchDeckSlide[];
}

// Feedback Types
export interface Feedback {
  id: string;
  vcName: string;
  overallScore: number;
  strengthPoints: string[];
  improvementPoints: string[];
  notes: string;
  createdAt: string;
}

// Project Types
export enum ProjectStage {
  IDEA = 'IDEA',
  PROTOTYPE = 'PROTOTYPE',
  MVP = 'MVP',
  PRE_SEED = 'PRE SEED',
  SEED = 'SEED',
  SERIES_A = 'SERIES A',
  SERIES_B = 'SERIES B',
  SERIES_C = 'SERIES C'
}

export interface Project {
  id: string;
  userId: string;
  name: string;
  description: string;
  tagline?: string;
  industry: string;
  createdAt: string;
  updatedAt: string;
  stage: ProjectStage;
  pitch: Pitch;
  pitchDeck?: PitchDeck;
  feedback?: Feedback[];
  score?: number;
  locked?: boolean; // New property to lock projects
}

// Group Chat Types
export interface ChatMessage {
  id: string;
  persona: 'founder' | 'investor' | 'mentor' | 'customer' | 'user' | 'Freelance Animator and Content Creator' | 'Marketing Manager at a Tech Startup' | 'Independent Online Educator';
  content: string;
  timestamp: string;
  avatarUrl?: string;
}

export interface ChatPersona {
  id: string;
  name: string;
  role: 'founder' | 'investor' | 'mentor' | 'customer' | 'user' | 'Freelance Animator and Content Creator' | 'Marketing Manager at a Tech Startup' | 'Independent Online Educator';
  avatarUrl?: string;
}

// Analytics Types
export interface ProjectMetrics {
  totalProjects: number;
  completedProjects: number;
  averageFeedbackScore: number;
  projectsByStage: Record<ProjectStage, number>;
}
