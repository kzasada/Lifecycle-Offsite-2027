import { defineField, defineType } from "sanity";

const slugField = defineField({
  name: "slug",
  title: "Slug",
  type: "slug",
  options: { source: "title", maxLength: 96 },
  validation: (r) => r.required(),
});

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  fields: [
    defineField({ name: "siteTitle", title: "Site title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "heroTitle", title: "Hero title", type: "string" }),
    defineField({ name: "heroSubtitle", title: "Hero subtitle", type: "text", rows: 3 }),
  ],
  preview: { select: { title: "siteTitle" } },
});

export const featuredStop = defineType({
  name: "featuredStop",
  title: "Featured stop",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    slugField,
    defineField({
      name: "stopSlug",
      title: "Itinerary stop slug",
      type: "string",
      description: "Slug of the stop in data/stops.json, e.g. lei-making-workshop.",
      validation: (r) => r.required(),
    }),
    defineField({ name: "blurb", title: "Blurb", type: "text", rows: 3 }),
    defineField({ name: "rank", title: "Rank", type: "number", initialValue: 1 }),
    defineField({ name: "pinned", title: "Pinned to home page", type: "boolean", initialValue: true }),
  ],
  preview: { select: { title: "title", subtitle: "blurb" } },
});

export const faq = defineType({
  name: "faq",
  title: "FAQ",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Question", type: "string", validation: (r) => r.required() }),
    slugField,
    defineField({ name: "answer", title: "Answer", type: "text", rows: 4 }),
    defineField({ name: "order", title: "Order", type: "number", initialValue: 1 }),
    defineField({ name: "published", title: "Show on site", type: "boolean", initialValue: true }),
  ],
  preview: { select: { title: "title", subtitle: "answer" } },
});

export const packingItem = defineType({
  name: "packingItem",
  title: "Packing item",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Item", type: "string", validation: (r) => r.required() }),
    slugField,
    defineField({ name: "note", title: "Note", type: "text", rows: 2 }),
    defineField({ name: "quantity", title: "Quantity", type: "number", initialValue: 1 }),
    defineField({ name: "essential", title: "Essential", type: "boolean", initialValue: false }),
  ],
  preview: { select: { title: "title", subtitle: "note" } },
});

export const schemaTypes = [siteSettings, featuredStop, faq, packingItem];
