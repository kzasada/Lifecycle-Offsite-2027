export type Theme = "revenue" | "lifecycle" | "websites" | "flowers";

export type Stop = {
  slug: string;
  order: number;
  day: number;
  time: string;
  name: string;
  description: string;
  themes: Theme[];
};

export type Day = { day: number; title: string; summary: string };

export type SiteSettings = { siteTitle: string; heroTitle: string; heroSubtitle: string };

export type FeaturedStop = {
  title: string;
  slug: string;
  stopSlug: string;
  blurb: string;
  rank: number;
  pinned: boolean;
};

export type Faq = { title: string; slug: string; answer: string; order: number; published: boolean };

export type PackingItem = {
  title: string;
  slug: string;
  note: string;
  quantity: number;
  essential: boolean;
};

export type SiteContent = {
  settings: SiteSettings;
  featured: FeaturedStop[];
  faqs: Faq[];
  packing: PackingItem[];
};
