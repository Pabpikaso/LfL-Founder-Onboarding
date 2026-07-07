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
    key: 'founderPhoto',
    question: 'Add a photo of yourself',
    type: 'photo',
    help: "A natural photo, not a headshot — we'll polish it in your video shoot.",
  },
  {
    key: 'why',
    question: 'Why did you start this business?',
    type: 'area',
    max: 200,
    help: 'One or two honest sentences.',
  },
  { key: 'proud', question: 'What are you most proud of?', type: 'area', max: 200 },
  {
    key: 'remember',
    question: 'If someone only visits once, what do you hope they remember?',
    type: 'area',
    max: 200,
  },
  {
    key: 'signature',
    question: "What's the one thing you're known for?",
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
  'Your Local Privilege',
  'Business Profile Assets',
  'Review Your Story',
  'Founding Membership',
];

export const STEP_SHORT = [
  'Founder',
  'Business',
  'Privilege',
  'Photos',
  'Review',
  'Payment',
];

export const CATEGORIES = ['Cafe', 'Restaurant', 'Wellness', 'Retail', 'Studio', 'Other'];

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

export const PRIVILEGES: Array<[string, string]> = [
  ['Complimentary dessert', 'A small treat on the house'],
  ['Signature drink upgrade', 'Bump their order up, our pick'],
  ['Birthday treat', 'Free cake on their birthday'],
  ['Discount on products or services', 'A percentage off'],
  ['Other', 'Something uniquely yours'],
];

export const PRIVCONFIG: Record<string, Array<[string, string]>> = {
  Cafe: [
    ['Free signature iced latte', 'With any main entrée or pastry — first visit'],
    ['Free upsize + extra shot', 'Upsize to large with an extra shot — first 3 orders'],
  ],
  Restaurant: [
    ['Free siopao or basket of fries', 'With any premium main course'],
    ['Free dessert', 'With a ₱500 minimum table spend'],
  ],
  Wellness: [
    ['Free 15-min hot stone or foot scrub', 'With any 1-hour full body massage'],
    ['Free hydrating facial mask add-on', 'During a body scrub — first booking'],
  ],
  Retail: [
    ['Free 3kg laundry', 'Valid on 8kg+ orders — first drop-off'],
    ['Free interior fogging & vacuum', 'With an Executive exterior wash & wax'],
  ],
};

export const PRICE_LEVELS: Array<[string, string]> = [
  ['₱', 'Budget'],
  ['₱₱', 'Moderate'],
  ['₱₱₱', 'Premium'],
  ['₱₱₱₱', 'Fine'],
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
  Retail: {
    title: 'Retail Information',
    intro: 'Show members what they can discover in-store.',
    sections: [
      { key: 'products', type: 'chips', label: 'What do you sell?', options: ['Apparel', 'Accessories', 'Home Goods', 'Beauty', 'Local Crafts', 'Food & Drink', 'Books', 'Plants', 'Gifts', 'Vintage'] },
      { key: 'services', type: 'chips', label: 'Services', options: ['Custom Orders', 'Gift Wrapping', 'Delivery', 'Repairs', 'Personal Shopping', 'Loyalty Program'] },
      { key: 'catAmenities', type: 'chips', label: 'Amenities', options: ['Parking', 'Airconditioned', 'Fitting Rooms', 'Free Wi-Fi', 'Wheelchair Accessible', 'Card Payments'] },
      { key: 'goodfor', type: 'chips', label: 'Good for', options: ['Gifts', 'Souvenirs', 'Everyday', 'Special Occasions', 'Collectors'] },
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
  address: 'Purok 3, Juna Subdivision, Matina, Davao City',
  priceRange: '₱₱',
  instagram: '@kalinawcoffee',
  facebook: '',
  website: '',
  tiktok: '',
  phone: '+63 917 555 0142',
  email: 'hello@kalinawcoffee.ph',
  hours: 'Tue–Sun · 7:00 AM – 8:00 PM',
  highlights: ['Specialty Coffee', 'Great for Remote Work', 'Free Wi-Fi', 'Alfresco'],
  privilege: 'Signature drink upgrade',
  privSecondary: '',
  minSpend: '300',
  terms: 'Dine-in only. One upgrade per visit.',
};

export const emptyDish = (): Dish => ({ name: '', desc: '', price: '', photo: '' });
