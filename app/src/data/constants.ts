import type {
  CategoryConfig,
  Dish,
  FounderQuestion,
  OnboardingData,
} from '../types';

export const FOUNDER_QUESTIONS: FounderQuestion[] = [
  {
    key: 'founderName',
    question: "First — what's your name?",
    type: 'text',
    placeholder: 'Maria Elena Solano',
    required: true,
  },
  {
    key: 'why',
    question: 'Why did you start this business?',
    type: 'area',
    max: 200,
    help: 'One or two honest sentences.',
  },
  {
    key: 'remember',
    question: 'If someone only visits once, what do you hope they remember?',
    type: 'area',
    max: 200,
  },
  {
    key: 'signature',
    question: "What's something your business is known for?",
    type: 'text',
    placeholder: 'A dish, a service, a product…',
  },
  {
    key: 'different',
    question: "What's one thing that makes you different?",
    type: 'area',
    max: 200,
  },
  {
    key: 'favorite',
    question: 'What should a member try first?',
    type: 'text',
    placeholder: 'Your personal pick',
    help: "Whatever you'd most want to hand someone — this helps us recommend you to the right members.",
  },
];

export const STEP_LABELS = [
  'Meet the Founder',
  'Tell Us About Your Business',
  'Review Your Story',
  'Founding Membership',
];

export const STEP_SHORT = [
  'Founder',
  'Business',
  'Review',
  'Payment',
];

export const CATEGORIES = ['Cafe', 'Restaurant', 'Wellness', 'Studio', 'Other'];

export const CITIES = ['Davao', 'Manila', 'Cebu'];

export const HIGHLIGHTS: Array<[string, string]> = [
  ['🏆', 'Hidden Gem'],
  ['🐶', 'Pet Friendly'],
  ['🌿', 'Alfresco'],
  ['☕', 'Specialty Coffee'],
  ['📶', 'Free Wi-Fi'],
  ['☪️', 'Halal'],
  ['💻', 'Great for Remote Work'],
  ['🎂', 'Birthday Friendly'],
  ['🌅', 'Sunset Views'],
  ['🚗', 'Parking Available'],
  ['🌱', 'Vegan / Vegetarian'],
  ['🥬', 'Organic'],
  ['🧺', 'Locally Sourced'],
  ['♿', 'Wheelchair Accessible'],
  ['🪑', 'High Chairs Available'],
];

export const PRICE_LEVELS: Array<[string, string, string]> = [
  ['₱', 'Budget', 'Under ₱300'],
  ['₱₱', 'Moderate', '₱300–700'],
  ['₱₱₱', 'Premium', '₱700–1,500'],
  ['₱₱₱₱', 'Fine', '₱1,500+'],
];

export const CATCONFIG: Record<string, CategoryConfig> = {
  Restaurant: {
    title: 'Restaurant Information',
    intro: 'A few restaurant-specific details so members know exactly what to expect.',
    sections: [
      {
        key: 'cuisine', type: 'chips', max: 3, label: 'What type of cuisine do you serve?', hint: 'Select up to 3',
        options: ['Filipino', 'Japanese', 'Korean', 'Chinese', 'Italian', 'French', 'American', 'Thai', 'Vietnamese', 'Indian', 'Mediterranean', 'Mexican', 'Seafood', 'Steakhouse', 'Café', 'Bakery', 'Dessert', 'Fusion', 'Vegetarian', 'Vegan'],
      },
      { key: 'dishes', type: 'dishes', label: 'Signature dishes', hint: 'Add up to 5 — name, a short line, and price' },
      { key: 'dietary', type: 'chips', label: 'Dietary options', options: ['Halal', 'Vegetarian', 'Vegan', 'Gluten-Free', 'Dairy-Free', 'Organic', 'Keto-Friendly'] },
      { key: 'dining', type: 'chips', label: 'Dining style', options: ['Dine-in', 'Takeaway', 'Delivery', 'Reservations', 'Private Events', 'Catering'] },
      { key: 'goodfor', type: 'chips', label: 'Good for', hint: 'Select all that apply', options: ['Family Dining', 'Date Night', 'Barkada', 'Business Meetings', 'Solo Dining', 'Celebrations', 'Kids', 'Senior Friendly', 'Remote Work'] },
      { key: 'catAmenities', type: 'chips', label: 'Amenities', options: ['Airconditioned', 'Alfresco', 'Pet Friendly', 'Parking', 'Free Wi-Fi', 'Wheelchair Accessible', 'Private Room', 'Function Room', 'Live Music', 'Outdoor Seating', 'Charging Outlets'] },
      { key: 'atmosphere', type: 'chips', max: 5, label: 'Atmosphere', hint: 'Choose up to 5', options: ['Cozy', 'Quiet', 'Romantic', 'Casual', 'Luxury', 'Rustic', 'Modern', 'Industrial', 'Family Friendly', 'Instagram-worthy', 'Hidden Gem', 'Scenic View'] },
      { key: 'bestfor', type: 'chips', label: 'Our restaurant is best for…', options: ['Authentic Filipino Food', 'Birthday Celebrations', 'Family Gatherings', 'Romantic Dates', 'Coffee & Work', 'Brunch', 'Late Night', 'Business Lunches', 'Tourists', 'First-Time Visitors', 'Quick Meals', 'Large Groups'] },
    ],
  },
  Cafe: {
    title: 'Café Information',
    intro: "Let's capture what makes your café worth the trip.",
    sections: [
      { key: 'coffee', type: 'chips', label: 'What do you serve?', options: ['Espresso', 'Pour-over', 'Cold Brew', 'Single-Origin', 'Specialty Latte', 'Matcha', 'Tea', 'Non-Coffee', 'Frappe', 'Signature Drinks'] },
      { key: 'dishes', type: 'dishes', label: 'Signature drinks & pastries', hint: 'Add up to 5 favourites' },
      { key: 'food', type: 'chips', label: 'Food & pastries', options: ['Pastries', 'Cakes', 'Sandwiches', 'Brunch', 'All-Day Breakfast', 'Vegan Options', 'Local Delicacies'] },
      { key: 'remote', type: 'chips', label: 'Remote-work amenities', options: ['Free Wi-Fi', 'Charging Outlets', 'Quiet Zones', 'Long Tables', 'Meeting Space', 'Airconditioned', 'Bottomless Coffee'] },
      { key: 'goodfor', type: 'chips', label: 'Good for', options: ['Remote Work', 'Studying', 'Dates', 'Barkada', 'Solo', 'Meetings', 'Reading'] },
      { key: 'atmosphere', type: 'chips', max: 5, label: 'Atmosphere', hint: 'Choose up to 5', options: ['Cozy', 'Quiet', 'Minimalist', 'Rustic', 'Modern', 'Plant-filled', 'Instagram-worthy', 'Hidden Gem', 'Scenic View'] },
    ],
  },
  Wellness: {
    title: 'Wellness & Spa Information',
    intro: 'Help members find the right escape.',
    sections: [
      { key: 'treatments', type: 'chips', label: 'Treatments offered', options: ['Massage', 'Facials', 'Body Scrub', 'Sauna', 'Aromatherapy', 'Reflexology', 'Nail Care', 'Hair Removal', 'Hot Stone', 'Couples Package'] },
      { key: 'therapists', type: 'number', label: 'How many therapists on your team?', hint: 'A rough number is fine' },
      { key: 'catAmenities', type: 'chips', label: 'Amenities', options: ['Private Rooms', 'Showers', 'Lockers', 'Parking', 'Airconditioned', 'Refreshments', 'Wheelchair Accessible', 'Couples Rooms'] },
      { key: 'goodfor', type: 'chips', label: 'Good for', options: ['Relaxation', 'Couples', 'Groups', 'Solo', 'Post-Workout', 'Special Occasions'] },
      { key: 'atmosphere', type: 'chips', max: 5, label: 'Atmosphere', hint: 'Choose up to 5', options: ['Serene', 'Luxurious', 'Minimalist', 'Tropical', 'Clinical', 'Cozy'] },
    ],
  },
  Studio: {
    title: 'Studio & Gym Information',
    intro: 'Tell members how you help them move.',
    sections: [
      { key: 'classes', type: 'chips', label: 'Classes offered', options: ['Strength', 'HIIT', 'Yoga', 'Pilates', 'Spin', 'Boxing', 'CrossFit', 'Zumba', 'Personal Training', 'Functional'] },
      { key: 'equipment', type: 'chips', label: 'Equipment', options: ['Free Weights', 'Machines', 'Cardio', 'Functional Rigs', 'Recovery', 'Sauna', 'Pool'] },
      { key: 'membership', type: 'chips', label: 'Membership options', options: ['Walk-in', 'Monthly', 'Annual', 'Class Packs', 'Personal Training', 'Student Rates', 'Corporate'] },
      { key: 'catAmenities', type: 'chips', label: 'Amenities', options: ['Showers', 'Lockers', 'Parking', 'Airconditioned', 'Towel Service', 'Free Wi-Fi', 'Wheelchair Accessible', 'Juice Bar'] },
      { key: 'goodfor', type: 'chips', label: 'Good for', options: ['Beginners', 'Weight Loss', 'Strength', 'Athletes', 'Seniors', 'Group Classes'] },
    ],
  },
};

export const PERKS: Array<{ no: string; title: string; desc: string }> = [
  { no: '01', title: 'Professional business profile', desc: 'A polished page members browse and share.' },
  { no: '02', title: 'Founder story — three videos', desc: 'A shoot that turns your story into film.' },
  { no: '03', title: 'Founder network & trainings', desc: 'Real sessions with the best local operators.' },
  { no: '04', title: 'A seat at the Founders Table', desc: "Rooms and dinners you can't buy into later." },
  { no: '05', title: 'Visibility to Locals members', desc: 'Seen by people looking for exactly you.' },
];

export const WELCOME_NEXT_STEPS = [
  { no: '1', text: 'Review your profile and reach out to say hello.' },
  { no: '2', text: 'Schedule your Founder Story session.' },
  { no: '3', text: 'Book your video shoot — three short films.' },
  { no: '4', text: 'Publish your profile for Locals members to find.' },
];

export const FOUNDING_CAP_PER_CITY = 100;

// Fallback content used only to preview the Review screen and certificate
// with realistic content if a founder skips an optional field.
export const SAMPLE: OnboardingData = {
  founderName: 'Maria Elena Solano',
  businessName: 'Kalinaw Coffee',
  category: 'Cafe',
  why: 'I wanted a quiet corner in Davao where people could slow down over honest, local coffee.',
  proud: 'Training three baristas from our barangay who now compete nationally.',
  remember: 'That they felt unhurried — like the whole city paused for one cup.',
  signature: 'Barako cold brew with muscovado',
  different: 'Every bean is roasted in-house, sourced from small farms up on Mt. Apo.',
  favorite: 'Muscovado cold brew',
  description:
    "A slow-living cafe serving single-origin Mindanao beans, roasted in-house. Come for the barako, stay for the quiet.",
  city: 'Davao City',
  priceRange: '₱₱',
  instagram: '@kalinawcoffee',
  facebook: '',
  website: '',
  tiktok: '',
  phone: '+63 917 555 0142',
  email: 'hello@kalinawcoffee.ph',
  hours: 'Tue–Sun · 7:00 AM – 8:00 PM',
  highlights: ['Specialty Coffee', 'Great for Remote Work', 'Free Wi-Fi', 'Alfresco'],
};

export const emptyDish = (): Dish => ({ name: '', desc: '', price: '', photo: '' });
