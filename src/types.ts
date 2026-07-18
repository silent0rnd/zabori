export interface CatalogItem {
  id: string;
  title: string;
  category: 'fence' | 'gate' | 'other';
  oldPrice: number;
  price: number;
  unit: string;
  description: string;
  image: string;
  features: string[];
}

export interface Gift {
  id: string;
  title: string;
  value: number;
  description: string;
  guarantee?: string;
  icon: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface QuizState {
  material: string;
  height: string;
  length: number;
  gatesNeeded: string;
  gateType: string;
  timing: string;
  deliveryMethod: string;
  name: string;
  phone: string;
}

export interface Lead {
  id: string;
  type: 'quiz_calculator' | 'site_measurer' | 'consultation' | 'gift_request';
  name: string;
  phone: string;
  timestamp: string;
  details?: string;
  status: 'new' | 'called' | 'completed';
}
