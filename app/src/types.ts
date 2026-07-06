export type Screen =
  | 'landing'
  | 'founder'
  | 's2'
  | 'catdetail'
  | 's3'
  | 's4'
  | 'review'
  | 'pay'
  | 'welcome';

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
  different?: string;
  favorite?: string;

  businessName?: string;
  category?: string;
  priceRange?: string;
  description?: string;
  city?: string;
  address?: string;
  maps?: string;
  facebook?: string;
  instagram?: string;
  website?: string;
  tiktok?: string;
  phone?: string;
  email?: string;
  hours?: string;
  highlights?: string[];

  privilege?: string;
  privOther?: string;
  minSpend?: string;
  terms?: string;

  cover?: string;
  logo?: string;
  menu?: string;
  gallery?: string[];

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
