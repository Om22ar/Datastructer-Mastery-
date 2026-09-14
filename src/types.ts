export type TaskDifficulty = 'Beginner' | 'Intermediate' | 'Advanced';

export interface Module {
  id: string;
  title: string;
  description: string;
  tasks: Task[];
}

export interface Task {
  id: string;
  title: string;
  description: string;
  difficulty: TaskDifficulty;
  optimalTimeComplexity: string;
  optimalSpaceComplexity?: string;
  complexityNotes?: string;
  initialCode: string;
  solutionCode?: string;
  solutionRegex?: string; // Very simple validation for MVP
  frames: SimulationFrame[]; // Hardcoded visualization steps on success
}

export interface SimulationFrame {
  description: string;
  pointers?: Record<string, number>; // e.g., { i: 0, j: 1, mid: 2 }
  array?: (number | string | null)[]; // e.g., [5, 3, 8]
  highlightIndices?: number[];
  variables?: Record<string, string | number | boolean>; // Top-level variables (e.g. location = -1)
}

export interface ChatMessage {
  role: 'user' | 'model';
  parts: { text: string }[];
}

export interface GlossaryConcept {
  id: string;
  term: string;
  definition: string;
  category: 'Arrays & Memory' | 'Algorithms' | 'OOP' | 'Stacks' | 'Queues' | 'Linked Lists' | 'Complexity';
  cppExample?: string;
  complexity?: string;
  moduleId: string;
  taskId?: string;
  moduleTitle: string;
  tags: string[];
}

