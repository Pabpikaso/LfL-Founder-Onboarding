export type Screen =
  | 'landing'
  | 'founder'
  | 's2'
  | 'catdetail'
  | 'review'
  | 'pay'
  | 'welcome'
  | 'agreement';

export interface AgreementChecks {
  authorized: boolean;
  giftPass: boolean;
  journey: boolean;
  feeUnderstanding: boolean;
  partnerTerms: boolean;
  privacyPolicy: boolean;
}

export interface JourneyVisit {
  title: string;
  description: string;
}

export type JourneyMode = 'suggested' | 'custom';

export interface JourneyConfig {
  mode: JourneyMode;
  visits: JourneyVisit[];
}

export interface AgreementRecord {
  checks: AgreementChecks;
  journey: JourneyConfig;
  agreedAt: string;
}

export interface Dish {
  name: string;
  desc: string;
  price: string;
  photo: string;
}

export interface OnboardingData {
  founderName?: string;
  founderPhoto?: string;
  why?: string;
  proud?: string;
  remember?: string;
  signature?: string;
  favorite?: string;

  businessName?: string;
  category?: string;
  priceRange?: string;
  description?: string;
  city?: string;
  facebook?: string;
  instagram?: string;
  website?: string;
  tiktok?: string;
  phone?: string;
  email?: string;
  hours?: string;
  highlights?: string[];

  dishes?: Dish[];
  paymentRef?: string;

  // category-specific dynamic fields (chip-group selections, free-text numbers)
  [key: string]: string | string[] | Dish[] | undefined;
}

export type FieldErrors = Record<string, string | undefined>;

export interface FounderQuestion {
  key: keyof OnboardingData;
  question: string;
  type: 'text' | 'area' | 'photo';
  placeholder?: string;
  help?: string;
  max?: number;
  required?: boolean;
}

export type CategorySectionType = 'chips' | 'number' | 'dishes';

export interface CategorySection {
  key: string;
  type: CategorySectionType;
  label: string;
  hint?: string;
  max?: number;
  options?: string[];
}

export interface CategoryConfig {
  title: string;
  intro: string;
  sections: CategorySection[];
}
