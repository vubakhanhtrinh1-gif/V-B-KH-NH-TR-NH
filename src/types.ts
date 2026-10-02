export type IntegrationType = 'code_merge' | 'rest_api' | 'iframe_postmessage' | 'shared_database' | 'prompt_chaining';

export interface MethodInfo {
  id: IntegrationType;
  title: string;
  tagline: string;
  badge: string;
  recommendedFor: string;
  difficulty: 'Dễ' | 'Trung bình' | 'Nâng cao';
  speed: string;
  pros: string[];
  cons: string[];
  bestCase: string;
  steps: {
    title: string;
    description: string;
    codeSnippet?: string;
    language?: string;
  }[];
}

export interface MergerPlanConfig {
  appAName: string;
  appAType: string;
  appAUrl?: string;
  appBName: string;
  appBType: string;
  appBUrl?: string;
  selectedMethod: IntegrationType;
  authRequired: boolean;
  realtimeNeeded: boolean;
}
