import { SAMPLE } from '../data/constants';
import type { OnboardingData } from '../types';

/**
 * Falls back to realistic sample content for empty fields, so the Review
 * screen and certificate preview always look finished — matches the design
 * intent that Review is prefilled for a great-looking preview even before
 * every field is filled in.
 */
export function pv<K extends keyof OnboardingData>(data: OnboardingData, key: K): OnboardingData[K] {
  const v = data[key];
  if (Array.isArray(v)) {
    return (v.length ? v : SAMPLE[key]) as OnboardingData[K];
  }
  if (v != null && String(v).trim() !== '') return v;
  return SAMPLE[key];
}
