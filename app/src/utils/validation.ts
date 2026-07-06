import { FOUNDER_QUESTIONS } from '../data/constants';
import type { FieldErrors, OnboardingData, Screen } from '../types';

export function validateScreen(
  screen: Screen,
  data: OnboardingData,
  founderQuestionIndex: number,
): FieldErrors {
  const errors: FieldErrors = {};
  const str = (v: unknown) => (typeof v === 'string' ? v : '');

  if (screen === 'founder') {
    const cur = FOUNDER_QUESTIONS[founderQuestionIndex];
    if (cur.required && !str(data[cur.key]).trim()) {
      errors[cur.key as string] = 'This one we do need — just your name.';
    }
  }

  if (screen === 's2') {
    if (!str(data.businessName).trim()) errors.businessName = 'Your business needs a name.';
    if (!str(data.category).trim()) errors.category = 'Pick a category.';
    if (
      !str(data.facebook).trim() &&
      !str(data.instagram).trim() &&
      !str(data.website).trim()
    ) {
      errors.social = 'Add at least one — Facebook, Instagram, or a website.';
    }
  }

  if (screen === 's3') {
    if (!str(data.privilege).trim()) errors.privilege = 'Choose one experience to offer.';
  }

  if (screen === 's4') {
    if (!data.cover) errors.cover = 'A cover photo is required.';
  }

  return errors;
}
