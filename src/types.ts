export interface Herb {
  id: string;
  name: string;
  scientificName: string;
  image: string;
  safetyLevel: 'safe' | 'caution' | 'danger';
  description: string;
  properties: string[];
  preparationMethods: string[];
  drugInteractions: string[];
}

export interface FormulaSection {
  materials: string[];
  tools: string[];
  steps: string[];
  safety: string[];
}

export interface InventionFormula {
  title: string;
  description: string;
  simple: FormulaSection;
  advanced: FormulaSection;
  p5Code: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'ai';
  text: string;
  audioBase64?: string;
  isStreaming?: boolean;
}
