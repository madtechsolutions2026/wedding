export interface Ceremony {
  id: string;
  name: string;
  tagline: string;
  date: string;
  time: string;
  muhurat?: string;
  venue: string;
  description: string;
  dressCode: string;
  dressColor: string;
  iconName: string;
  rituals: string[];
}

export interface Blessing {
  id: string;
  name: string;
  relation: string;
  message: string;
  date: string;
}

export interface CoupleProfile {
  name: string;
  title: string;
  parents: string;
  grandparents: string;
  education: string;
  profession: string;
  zodiac: string;
  star: string;
  bio: string;
  quote: string;
  image: string;
  interests: string[];
}

export type ColorTheme = 'champagne' | 'rose' | 'emerald';
