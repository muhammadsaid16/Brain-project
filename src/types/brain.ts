export type BrainCategory = "lobes" | "hindbrain" | "language";

export interface BrainRegion {
  id: string;
  nameEn: string;
  nameAr: string;
  latinName?: string;
  category: BrainCategory;
  categoryLabelEn: string;
  categoryLabelAr: string;
  position: [number, number, number];
  cameraPosition: [number, number, number];
  cameraTarget: [number, number, number];
  color: string;
  overview: {
    summaryEn: string;
    summaryAr: string;
    locationEn: string;
    locationAr: string;
    keyLandmarks: string[];
  };
  functions: {
    en: string[];
    ar: string[];
  };
  clinical: {
    syndromesEn: string[];
    syndromesAr: string[];
    symptomsEn: string[];
    symptomsAr: string[];
    classicCaseEn: string;
    classicCaseAr: string;
  };
  vascularSupply: {
    arteriesEn: string[];
    arteriesAr: string[];
    strokeManifestationEn: string;
    strokeManifestationAr: string;
  };
}

export type QuizQuestionType = "anatomical" | "clinical";

export interface QuizQuestion {
  id: string;
  type: QuizQuestionType;
  promptEn: string;
  promptAr: string;
  clinicalScenarioEn?: string;
  clinicalScenarioAr?: string;
  targetRegionId: string;
  hintEn: string;
  hintAr: string;
  explanationEn: string;
  explanationAr: string;
}

export type ClippingAxis = "sagittal" | "axial" | "coronal";
export type InspectorTab = "overview" | "functions" | "clinical" | "vascular";
