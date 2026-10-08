import "server-only";
import defaults from "@/data/site-defaults.json";
import { sanityClient } from "@/sanity/client";
import type { Faq, FeaturedStop, PackingItem, SiteContent, SiteSettings } from "./types";

const fallback: SiteContent = {
  settings: defaults.settings,
  featured: defaults.featured,
  faqs: defaults.faqs,
  packing: defaults.packing,
};

const QUERY = `{
  "settings": *[_type == "siteSettings"][0]{siteTitle, heroTitle, heroSubtitle},
  "featured": *[_type == "featuredStop" && pinned == true] | order(rank asc){
    title, "slug": slug.current, stopSlug, blurb, rank, pinned
  },
  "faqs": *[_type == "faq" && published != false] | order(order asc){
    title, "slug": slug.current, answer, order, published
  },
  "packing": *[_type == "packingItem"] | order(title asc){
    title, "slug": slug.current, note, quantity, essential
  }
}`;

type Raw = {
  settings: Partial<SiteSettings> | null;
  featured: FeaturedStop[];
  faqs: Faq[];
  packing: PackingItem[];
};

/** Reads published Sanity content per request; falls back to bundled defaults. */
export async function getSiteContent(): Promise<SiteContent> {
  if (!sanityClient) return fallback;
  try {
    const raw = await sanityClient.fetch<Raw>(QUERY, {}, { cache: "no-store" });
    return {
      settings: { ...fallback.settings, ...stripNulls(raw.settings ?? {}) },
      featured: raw.featured?.length ? raw.featured : fallback.featured,
      faqs: raw.faqs?.length ? raw.faqs : fallback.faqs,
      packing: raw.packing?.length ? raw.packing : fallback.packing,
    };
  } catch {
    return fallback;
  }
}

function stripNulls<T extends object>(obj: T): Partial<T> {
  return Object.fromEntries(Object.entries(obj).filter(([, v]) => v != null)) as Partial<T>;
}
