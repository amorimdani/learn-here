export type SeniorityLevel = 'junior' | 'mid' | 'senior' | 'staff' | 'principal';

export interface CareerLevelData {
  id: SeniorityLevel;
  title: string;
  badge: string;
  experienceYears: string;
  compensationRange: string;
  tagline: string;
  summary: string;
  coreLanguages: {
    name: string;
    role: string;
    marketDemand: 'Ultra-High' | 'High' | 'Specialized';
    description: string;
    codeExample: string;
  }[];
  primaryTools: {
    category: string;
    tools: string[];
    description: string;
  }[];
  workflows: {
    name: string;
    description: string;
    marketStandard: string;
  }[];
  systemDesignExpectations: {
    scope: string;
    keySkills: string[];
    sampleProblem: string;
    recommendedApproach: string;
  };
  dayInTheLife: {
    time: string;
    activity: string;
    detail: string;
  }[];
  promotionChecklist: string[];
  antiPatterns: string[];
}

export interface CodeSnippet {
  title: string;
  language: string;
  code: string;
  explanation: string;
  runnableNotes?: string;
}

export interface TechDeepDive {
  id: string;
  name: string;
  category: 'Language' | 'Cloud & DevOps' | 'Systems & Distributed' | 'Databases & APIs';
  tagline: string;
  iconName: string;
  popularityRank: string;
  historyAndEvolution: {
    originYear: number;
    creator: string;
    background: string;
    keyMilestones: { year: number; event: string }[];
    modernStatus: string;
  };
  realWorldUseCases: {
    industry: string;
    exampleCompany: string;
    problemSolved: string;
    architectureFit: string;
  }[];
  deepTechnicalConcepts: {
    title: string;
    explanation: string;
    internals: string;
  }[];
  codeExamples: CodeSnippet[];
  gettingStartedRoadmap: {
    step: number;
    phase: string;
    actionableTasks: string[];
    keyCommands: string[];
  }[];
  commonPitfalls: {
    mistake: string;
    whyItHurts: string;
    solution: string;
  }[];
}

export interface AiTopic {
  id: string;
  title: string;
  category: 'Fundamentals' | 'LLM Architecture' | 'AI Agents' | 'RAG Systems' | 'Developer Tooling' | 'Applied Workflows & Evals';
  tagline: string;
  readTime: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  summary: string;
  coreConcepts: {
    title: string;
    description: string;
    mathOrDiagram?: string;
    practicalImpact: string;
  }[];
  interactiveDemo?: {
    type: 'tokenization' | 'rag-simulator' | 'agent-loop' | 'prompt-eval';
    title: string;
    description: string;
  };
  codeImplementation: CodeSnippet;
  productionBestPractices: string[];
  benchmarksAndPitfalls: {
    benchmark: string;
    observation: string;
    workaround: string;
  }[];
}

export interface TrendingTopic {
  id: string;
  title: string;
  category: 'Architecture' | 'Languages & Runtimes' | 'AI-Native Dev' | 'Infrastructure';
  status: 'Bleeding Edge' | 'Accelerating' | 'Enterprise Adoption' | 'Standardizing';
  dateAdded: string;
  summary: string;
  whyItMatters: string;
  whoIsLeadingIt: string[];
  deepDiveAnalysis: string;
  architecturalComparison: {
    legacyWay: string;
    modernWay: string;
    efficiencyGain: string;
  };
  practicalCodeOrConfig: CodeSnippet;
  keyTakeaways: string[];
}

export interface LearningTrack {
  id: string;
  title: string;
  institutionInspiration: string;
  duration: string;
  level: string;
  description: string;
  prerequisites: string[];
  syllabus: {
    moduleNumber: number;
    title: string;
    estimatedHours: number;
    topicsCovered: string[];
    handsOnLab: {
      title: string;
      objective: string;
      deliverable: string;
      codeStarter: string;
    };
    selfAssessmentQuestions: {
      question: string;
      answer: string;
    }[];
  }[];
  capstoneProject: {
    title: string;
    description: string;
    requirements: string[];
    architectureTip: string;
  };
}

export interface InterviewQuestion {
  id: string;
  category: 'Recruiter Screening' | 'Behavioral (STAR)' | 'System Design' | 'Data Structures & Algorithms' | 'Staff/Principal Leadership';
  difficulty: 'Standard' | 'Challenging' | 'Staff-Level';
  question: string;
  context: string;
  recruiterPerspective: string;
  modelAnswer: {
    strategy: string;
    fullResponse: string;
    breakdown?: {
      situation?: string;
      task?: string;
      action?: string;
      result?: string;
    };
    keyPhrasesToUse: string[];
    redFlagsToAvoid: string[];
  };
  technicalDiagramOrCode?: string;
}
