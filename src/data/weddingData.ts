import type { Ceremony, CoupleProfile, Blessing } from '../types';

export const WEDDING_DATE = new Date('2026-11-25T11:15:00+05:30');

export const GROOM_PROFILE: CoupleProfile = {
  name: 'Suryaveer Raghavendra Rathore',
  title: 'The Groom',
  parents: 'Mrs. Gayatri Devi & Mr. Vikramaditya Rathore',
  grandparents: 'Late Mrs. Devaki Devi & Late Major Ranveer Singh Rathore',
  education: 'M.S. in Robotics & AI (IIT Bombay & Stanford University)',
  profession: 'Principal Robotics Architect & Founder',
  zodiac: 'Pisces',
  star: 'Uttara Bhadrapada',
  bio: 'An architectural enthusiast, sitar player, and avid mountaineer. Suryaveer believes in deep-rooted family traditions, mindful innovation, and grounded living.',
  quote: '“In Ananya, I found not just my life partner, but a soul that brings effortless grace, boundless intellect, and warm laughter to every room.”',
  image: '/images/groom.jpg',
  interests: ['Vedic Architecture', 'Classical Music', 'High-Altitude Trekking', 'Horology']
};

export const BRIDE_PROFILE: CoupleProfile = {
  name: 'Ananya Meenakshi Deshmukh',
  title: 'The Bride',
  parents: 'Mrs. Sunita Devi & Mr. Rajeshwar Deshmukh',
  grandparents: 'Mrs. Padmavati Devi & Late Dr. Yashwantrao Deshmukh',
  education: 'Master of Fine Arts & Classical Dance Maestro',
  profession: 'Heritage Textile Designer & Creative Director',
  zodiac: 'Taurus',
  star: 'Rohini',
  bio: 'A celebrated classical artist and sustainable textile patron. Ananya brings vibrant artistic curiosity, warmth, and heartfelt joy to everyone around her.',
  quote: '“Suryaveer brings calm strength, devotion, and kindness. Stepping into this lifelong journey by his side is my happiest celebration.”',
  image: '/images/bride.jpg',
  interests: ['Handloom Revival', 'Classical Dance', 'Art History', 'Culinary Experiments']
};

export const CEREMONIES: Ceremony[] = [
  {
    id: 'haldi-ceremony',
    name: 'Sunlit Haldi & Floral Celebration',
    tagline: 'Auspicious Golden Turmeric & Fresh Blossom Showers',
    date: 'Tuesday, 24th November 2026',
    time: '10:00 AM onwards',
    muhurat: 'Auspicious Golden Hour: 10:15 AM - 11:45 AM',
    venue: 'Golden Lotus Courtyard, The Rajvilas Palace',
    description: 'An open-air sun-drenched morning featuring traditional fragrant turmeric paste, chandan, live acoustic dholak music, and a celebratory flower shower with fresh yellow marigold and rose petals.',
    dressCode: 'Sunlit Yellow, Ochre, Mustard & Floral Summer Chic',
    dressColor: '#eab308',
    iconName: 'Sun',
    rituals: [
      'Blessing prayer invocation for health, protection and good fortune',
      'Turmeric & Sandalwood application by loving family and friends',
      'Petal Shower (Phoolon Ki Holi) with fresh seasonal blossoms',
      'Festive garden brunch featuring royal artisan sweets and coolers'
    ]
  },
  {
    id: 'sangeet-gala',
    name: 'The Royal Sangeet & Musical Soiree',
    tagline: 'An Evening of Melody, Dance, Sparkles & Revelry',
    date: 'Tuesday, 24th November 2026',
    time: '06:30 PM onwards',
    venue: 'The Palace Amphitheatre & Illuminated Poolside Lawn',
    description: 'A starlit celebration marked by intricate bridal henna designs, live Sufi and Bollywood fusion bands, family choreographed dance showdowns, and high-energy music late into the night.',
    dressCode: 'Gilded Emerald, Midnight Sapphire, or Shimmering Cocktail Ethnic',
    dressColor: '#10b981',
    iconName: 'Music',
    rituals: [
      'Artisan bridal henna application with hidden personalized monograms',
      'Live classical fusion welcome orchestra with flute & percussion',
      'Choreographed family dance performances & couple spotlight',
      'Gourmet royal street delicacies and signature cocktail lounge'
    ]
  },
  {
    id: 'baraat-varmala',
    name: 'The Royal Procession & Varmala',
    tagline: 'The Grand Groom Entry & Sacred Exchange of Garlands',
    date: 'Wednesday, 25th November 2026',
    time: '09:30 AM (Procession) | 10:45 AM (Garland Exchange)',
    venue: 'Palace Elephant Gateway & Grand Royal Mandap',
    description: 'The regal procession of the groom accompanied by royal brass bands, traditional percussionists, and family dancers, followed by the enchanting bridal entry under a floral canopy.',
    dressCode: 'Royal Heritage Silk, Bespoke Sherwanis, Turbans & Silk Sarees',
    dressColor: '#f97316',
    iconName: 'Crown',
    rituals: [
      'Turban tying ceremony and mother’s blessings',
      'Grand musical procession towards the palace gates',
      'Bridal entry under an illuminated canopy of fresh jasmine and orchids',
      'Exchange of sacred floral garlands amidst golden flower showers'
    ]
  },
  {
    id: 'holy-wedding',
    name: 'The Sacred Wedding & Seven Vows',
    tagline: 'The Holy Nuptial Sacraments Around the Eternal Flame',
    date: 'Wednesday, 25th November 2026',
    time: '11:15 AM (Auspicious Wedding Hour)',
    muhurat: 'Most Auspicious Planetary Alignment: 11:15 AM - 12:45 PM',
    venue: 'Lakefront Heritage Mandapam, Lake Palace Grounds',
    description: 'The timeless spiritual ceremony where two souls unite for life around the holy fire, solemnized with the sacred knot tying, exchange of seven lifelong vows, sacred vermilion, and ancestral blessings.',
    dressCode: 'Grand Traditional Silk: Kanjeevaram, Banarasi or Royal Gold Brocade',
    dressColor: '#dc2626',
    iconName: 'Flame',
    rituals: [
      'Tying of the holy nuptial knot connecting the couple’s stoles',
      'Walking seven sacred steps around the holy fire for lifelong companionship',
      'Adorning the sacred wedding necklace and holy vermilion',
      'Seeking heartfelt blessings from elders and family members'
    ]
  },
  {
    id: 'grand-reception',
    name: 'The Grand Reception & Evening Banquet',
    tagline: 'A Formal Gala of Royal Hospitality & Feast',
    date: 'Wednesday, 25th November 2026',
    time: '07:30 PM onwards',
    venue: 'The Palace Mirror Ballroom & Starlit Terrace',
    description: 'An elegant black-tie dinner celebration with symphony strings, heartfelt congratulatory toasts, couple portrait sessions, and a multi-course royal banquet.',
    dressCode: 'Black-Tie Ethnic, Contemporary Velvet Achkans or High-Fashion Couture',
    dressColor: '#8b5cf6',
    iconName: 'UtensilsCrossed',
    rituals: [
      'Grand red carpet entrance of the newlyweds',
      'Celebratory champagne toast & royal cake cutting',
      'Congratulatory greetings and family portraits',
      'Curated 56-dish royal dinner buffet and artisanal dessert lounge'
    ]
  }
];

export const SEVEN_VOWS = [
  {
    step: 1,
    title: 'First Vow: Nourishment & Well-Being',
    subtitle: 'Nurturing Our Home & Health',
    description: '“We promise to nourish one another with wholesome food, pure intentions, and vibrant health, walking together in shared responsibility and mindful living.”'
  },
  {
    step: 2,
    title: 'Second Vow: Strength & Lifelong Protection',
    subtitle: 'Standing Together Through All Challenges',
    description: '“We promise to be unwavering pillars of emotional, mental, and physical strength for each other, protecting our bond and sheltering our home through every chapter.”'
  },
  {
    step: 3,
    title: 'Third Vow: Prosperity & Righteous Wealth',
    subtitle: 'Creating Abundance with Integrity',
    description: '“We promise to earn our living through ethical, noble paths, manage our resources with wisdom, and share our prosperity generously with society.”'
  },
  {
    step: 4,
    title: 'Fourth Vow: Family Harmony & Mutual Respect',
    subtitle: 'Honoring Heritage, Parents & Loved Ones',
    description: '“We promise to honor and cherish our parents and families, bringing joy, gratitude, and mutual respect to both households as one united family.”'
  },
  {
    step: 5,
    title: 'Fifth Vow: Compassion & Future Generations',
    subtitle: 'Raising a Conscious & Kind Tomorrow',
    description: '“We pray for compassionate, wise children, pledging to raise them with kindness, education, moral values, and respect for all living beings.”'
  },
  {
    step: 6,
    title: 'Sixth Vow: Enduring Companionship Through the Seasons',
    subtitle: 'Unshakable Love Across Time',
    description: '“We promise to stand hand in hand across every change of season, every triumph, and every sorrow, keeping love, humor, and serenity alive forever.”'
  },
  {
    step: 7,
    title: 'Seventh Vow: Eternal Friendship & Spiritual Oneness',
    subtitle: 'True Equals, Soulmates & Best Friends',
    description: '“With our seventh step, we become eternal companions and truest friends. Our minds, hearts, and destinies are intertwined as one soul in lifelong devotion.”'
  }
];

export const INITIAL_BLESSINGS: Blessing[] = [
  {
    id: '1',
    name: 'Dr. Sameer & Neha Deshmukh',
    relation: 'Family (Pune)',
    message: 'To our dearest Ananya and our wonderful brother Suryaveer: May your journey together be illuminated with everlasting warmth, laughter, and triumph!',
    date: '10 mins ago'
  },
  {
    id: '2',
    name: 'Major Gen. Alok & Rekha Rathore',
    relation: 'Paternal Family (Jaipur)',
    message: 'Heartiest congratulations to the gorgeous couple! Ananya, welcome to the family. Suryaveer, you make us so proud. See you both at the palace!',
    date: '1 hour ago'
  },
  {
    id: '3',
    name: 'Aditi, Kabir & Rohan',
    relation: 'Stanford & Mumbai Friends',
    message: 'The absolute dream duo! Cannot wait for the Sangeet dance battles and the royal Udaipur sunset. Wishing you a lifetime of endless adventures together!',
    date: '2 hours ago'
  }
];
