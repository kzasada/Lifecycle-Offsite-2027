// Writes the committed JSON snapshot in data/ and the Sanity seed file.
// All content is fictional. Run: npm run data:refresh
import { mkdir, writeFile } from "node:fs/promises";

const generatedAt = new Date().toISOString();

const days = [
  { day: 1, title: "Onboarding", summary: "Arrival, activation, and the first of many leis." },
  { day: 2, title: "Expansion", summary: "Growth, retention, and a sandcastle with breakpoints." },
  { day: 3, title: "Win-Back", summary: "Farewells, second chances, and a magnet." },
];

// [day, time, name, description, themes]
const rows = [
  [1, "8:00 AM", "Arrival and Welcome Series", "Landing triggers the first message in a five-part welcome series, delivered in person by a man holding a sign. Open rates are expected to be high, as he is standing right there.", ["lifecycle"]],
  [1, "10:00 AM", "Hotel Check-In and Segmentation", "Guests are segmented by room type, floor, and tolerance for ocean-view upsells. Expansion revenue begins at the minibar.", ["lifecycle", "revenue"]],
  [1, "12:00 PM", "Lunch on the Lanai", "Seating has been arranged so the best view sits above the fold. Anyone placed below it may scroll.", ["websites"]],
  [1, "2:00 PM", "Lei-Making Workshop", "Teams string plumeria and orchids into leis, a hands-on lesson in nurture. Like any onboarding drip, each lei is slow, fragrant, and prone to tangling.", ["flowers", "lifecycle"]],
  [1, "5:00 PM", "Sunset Pipeline Review", "The forecast will be reviewed at sunset, ideal lighting for any number that needs to look warm. Pipeline is measured in coconuts, and coverage is currently described as generous.", ["revenue"]],
  [2, "7:30 AM", "Wireframe Yoga", "Participants hold poses drawn in low fidelity. Downward dog will be rendered in grayscale until approved.", ["websites"]],
  [2, "9:30 AM", "Snorkeling and Net Revenue Retention", "Everyone is counted entering the water and again on exit. Anyone drifting toward open water will be classified as churn and gently re-engaged by a lifeguard.", ["revenue", "lifecycle"]],
  [2, "12:00 PM", "Botanical Garden Tour", "A guide introduces the hibiscus, the bird of paradise, and a plumeria tree that blooms without a single nurture email. Questions are welcome, but the tree will not be taking any.", ["flowers", "lifecycle"]],
  [2, "2:30 PM", "Shave Ice A/B Test", "Group A receives lime and Group B receives mango. Statistical significance is reached when someone says \"the orange one\" and nobody corrects them.", ["lifecycle"]],
  [2, "4:30 PM", "Publish Day at the Beach", "Teams build a sandcastle, publish it at low tide, and verify its breakpoints against the incoming wave. Rollback is automatic.", ["websites"]],
  [2, "7:00 PM", "Luau and Quarterly Business Review", "Dinner doubles as a quarterly review of the roast pig, which has been in the oven since the previous quarter. Slides are optional; napkins are not.", ["revenue"]],
  [3, "8:30 AM", "Farewell Brunch", "The buffet is organized like a sitemap: eggs to the left, pastries to the right, and a table of untouched melon that returns a 404.", ["websites"]],
  [3, "10:00 AM", "Waterfall Hike", "The trail loads slowly but rewards patience. Load times are measured in switchbacks, and the view is considered a strong above-average experience.", ["websites"]],
  [3, "12:00 PM", "Souvenir Shop Win-Back Campaign", "Anyone who abandoned a snack in their cart on Day 1 will receive a win-back offer: a second chance and a magnet.", ["lifecycle"]],
  [3, "2:00 PM", "Hibiscus Tea and Annual Review", "Annual recurring revenue will be discussed over hibiscus tea, in annual recurring pineapples. Please direct questions to the suggestion box, which is shaped like a lei.", ["revenue", "flowers"]],
  [3, "4:00 PM", "Lei Exchange", "Each attendee gives one lei and receives one, a perfectly balanced trade and the only forecast this week with no variance.", ["flowers", "revenue"]],
];

const slugify = (s) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

const stops = rows.map(([day, time, name, description, themes], i) => ({
  slug: slugify(name),
  order: i + 1,
  day,
  time,
  name,
  description,
  themes,
}));

const featured = [
  { title: "Lei-Making Workshop", slug: "lei-making-workshop", stopSlug: "lei-making-workshop", blurb: "The flagship activity. Bring patience and a tolerance for tangling.", rank: 1, pinned: true },
  { title: "Publish Day at the Beach", slug: "publish-day-at-the-beach", stopSlug: "publish-day-at-the-beach", blurb: "The only launch with a built-in rollback.", rank: 2, pinned: true },
  { title: "Shave Ice A/B Test", slug: "shave-ice-ab-test", stopSlug: "shave-ice-a-b-test", blurb: "Rigorous methodology, flavorful results.", rank: 3, pinned: true },
  { title: "Souvenir Shop Win-Back Campaign", slug: "souvenir-shop-win-back-campaign", stopSlug: "souvenir-shop-win-back-campaign", blurb: "A second chance, with a magnet.", rank: 4, pinned: true },
];

const faqs = [
  { title: "Who owns the sunscreen?", slug: "who-owns-the-sunscreen", answer: "Whoever brought it. This makes it a shared service with no roadmap.", order: 1, published: true },
  { title: "What is the dress code?", slug: "what-is-the-dress-code", answer: "Business casual, with an emphasis on casual and a minimum of one flower.", order: 2, published: true },
  { title: "Will there be Wi-Fi?", slug: "will-there-be-wifi", answer: "At the pool, the lobby, and the pond, where a small golden goose has been asked to stop sitting on the router. Coverage elsewhere is described as aspirational.", order: 3, published: true },
  { title: "Do I need to open my laptop?", slug: "do-i-need-to-open-my-laptop", answer: "No. Please bring it anyway, so it can feel included.", order: 4, published: true },
  { title: "What should my out-of-office say?", slug: "what-should-my-out-of-office-say", answer: "\"Back Monday, fragrant.\" Edits are permitted, but fragrance is encouraged.", order: 5, published: true },
];

const packing = [
  { title: "Reef-safe sunscreen", slug: "reef-safe-sunscreen", note: "Ownership is addressed in the FAQ.", quantity: 1, essential: true },
  { title: "Floral shirt", slug: "floral-shirt", note: "Hibiscus print preferred. Dignified.", quantity: 1, essential: true },
  { title: "Walking shoes", slug: "walking-shoes", note: "For the waterfall hike.", quantity: 1, essential: true },
  { title: "Laptop you intend not to open", slug: "laptop-you-intend-not-to-open", note: "Optional, and emotionally supportive.", quantity: 1, essential: false },
  { title: "Printed copy of the forecast", slug: "printed-copy-of-the-forecast", note: "Useful for shade.", quantity: 1, essential: false },
];

const settings = {
  siteTitle: "Lifecycle Offsite 2027",
  heroTitle: "Three days, one island, zero open tabs",
  heroSubtitle:
    "A team itinerary prepared with the rigor of a quarterly review and the sun protection of a first draft.",
};

const json = (v) => JSON.stringify(v, null, 2) + "\n";

await mkdir("data", { recursive: true });
await mkdir("sanity/seed", { recursive: true });
await writeFile("data/days.json", json({ generatedAt, days }));
await writeFile("data/stops.json", json({ generatedAt, stops }));
await writeFile("data/site-defaults.json", json({ generatedAt, settings, featured, faqs, packing }));

const doc = (type, id, fields) => JSON.stringify({ _id: id, _type: type, ...fields });
const slug = (s) => ({ _type: "slug", current: s });
const lines = [
  doc("siteSettings", "siteSettings", settings),
  ...featured.map((f) => doc("featuredStop", `featuredStop.${f.slug}`, { ...f, slug: slug(f.slug) })),
  ...faqs.map((f) => doc("faq", `faq.${f.slug}`, { ...f, slug: slug(f.slug) })),
  ...packing.map((p) => doc("packingItem", `packingItem.${p.slug}`, { ...p, slug: slug(p.slug) })),
];
await writeFile("sanity/seed/seed.ndjson", lines.join("\n") + "\n");

console.log(`Wrote ${stops.length} stops, ${lines.length} seed documents (${generatedAt}).`);
