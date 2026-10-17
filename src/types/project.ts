export type ProjectCategory =
  | "SaaS"
  | "Backend API"
  | "Full Stack"
  | "E-Commerce"
  | "AI Automation"
  | "Desktop Software"
  | "IoT & Embedded"
  | "Other";

export type DevelopmentStatus =
  | "live"
  | "completed"
  | "in-development"
  | "prototype"
  | "maintained"
  | "pending-verification";

export interface ProjectTechStack {
  core: string[];
  backend?: string[];
  frontend?: string[];
  database?: string[];
  tools?: string[];
}

export interface ProjectLinks {
  liveUrl?: string;
  sourceUrl?: string;
  caseStudyUrl?: string;
}

export interface ProjectMedia {
  thumbnail: string;
  gallery?: string[];
  badgeIcon?: string;
  accentColor?: string;
}

export interface CaseStudyArchitecture {
  frontend?: string;
  backend?: string;
  database?: string;
  apiStructure?: string;
  authAndSecurity?: string;
  infrastructure?: string;
  diagram?: string;
}

export interface CaseStudyChallenge {
  title: string;
  problem: string;
  solution: string;
}

export interface TechnicalDecision {
  decision: string;
  rationale: string;
  tradeOff: string;
}

export interface TestingValidation {
  strategy: string;
  verifiedScenarios: string[];
}

export interface CaseStudyLearnings {
  implementedOutcomes: string[];
  plannedImprovements?: string[];
  technicalTakeaways: string[];
}

export interface ProjectCaseStudy {
  isFullCaseStudy: boolean;
  targetAudience?: string;
  theChallenge?: string;
  architecture?: CaseStudyArchitecture;
  keyFeaturesDetailed?: { title: string; description: string; tag?: string }[];
  engineeringChallenges?: CaseStudyChallenge[];
  technicalDecisions?: TechnicalDecision[];
  testingAndValidation?: TestingValidation;
  resultsAndLearnings?: CaseStudyLearnings;
  problemStatement?: string;
  architecturalSolution?: string;
  technicalChallenges?: string[];
  outcomesAndImpact?: string[];
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  summary: string;
  category: ProjectCategory;
  categoryLabel?: string;
  status: DevelopmentStatus;
  isFeatured: boolean;
  displayPriority: number;
  bentoSpan?: "col-span-1" | "col-span-2";
  role: string;
  projectContext: string;
  techStack: string[];
  structuredStack?: ProjectTechStack;
  keyFeatures: [string, string, string] | string[];
  architecturalDetails?: string;
  caseStudy?: ProjectCaseStudy;
  media: ProjectMedia;
  links: ProjectLinks;
  isPrivateRepo: boolean;
  isPublished: boolean;
  verificationNotes?: string;
}
