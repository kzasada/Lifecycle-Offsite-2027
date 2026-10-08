# Lifecycle Offsite 2027: Brand Guide

An original brand for a fictional offsite. The idea: a deadpan corporate memo, printed on a tropical postcard: lagoon blues, sunset warmth, a sun in the corner and wavy edges.

## Colors

| Token | Hex | Role |
|---|---|---|
| Teal 900 | `#034C5A` | Header, footer, inverse surfaces, headings on light |
| Teal 700 | `#07707F` | Links, focus ring |
| Teal 500 | `#12B5BF` | Lagoon accent, gradient end |
| Teal 100 | `#CDF3F1` | Light text on teal |
| Cream 50 | `#FFF8E7` | Page background |
| Sand 200 | `#FFE9B8` | Alternate sections |
| Sand 400 | `#F2CF8A` | Borders and dividers |
| White | `#FFFFFF` | Cards, inputs |
| Ink 900 | `#10292F` | Body text |
| Ink 600 | `#3F5A62` | Muted text |
| Mango 400 | `#FFB627` | Sun, highlights, sunset gradient start (dark text on top) |
| Mango 100 | `#FFE7A3` | Tag backgrounds |
| Palm 700 | `#137A52` | Featured card variant (white text) |
| Coral 500 | `#FF6F4F` | Heading underlines, accents (not for text) |
| Hibiscus 600 | `#D81E5B` | Primary action (white text) |
| Hibiscus 700 | `#B3124A` | Action hover, accent text |
| Hibiscus 100 | `#FFD9E4` | Soft accent background |

**Gradients:** Sunset (mango, coral, hibiscus) for stripes and rules. Lagoon (teal 900, 700, 500) for the hero.

Use hibiscus for actions only: one action color per screen. Mango and coral are for decoration, not body text.

## Typography

- **Headings:** Fredoka (Google Fonts), weights 400-700.
- **Body and UI:** Nunito (Google Fonts), weights 400-700.

| Step | Size | Use |
|---|---|---|
| xs | 12px | Tags, captions |
| sm | 14px | Meta, helper text |
| base | 16px | Body |
| lg | 20px | Card titles, lead text |
| xl | 24px | Subheads |
| 2xl | 32px | Section headings |
| 3xl | 40-64px (fluid) | Page titles |

Line height: 1.15 for headings, 1.6 for body.

## Spacing, radius, shadow

- **Spacing** (4px base): 4, 8, 12, 16, 24, 32, 48, 72.
- **Radius:** 6 (small), 16 (inputs, list items), 28 (cards, panels), pill (tags, buttons).
- **Shadow:** `sm` for resting cards, `md` for hover. Both use a deep-teal-tinted shadow, never pure black.

## Voice and tone

Dry, specific, affectionate. Funny through understatement, never through volume. No exclamation marks, no emoji. Write like a status update about a vacation. Never joke about people's jobs, pay, or health.

## Component guidance

- **Card:** white surface, 2px sand border, 28px radius, `sm` shadow, sunset gradient stripe on top, lifts on hover. Whole card is one link.
- **Tag:** pill, mango 100 background, teal 900 uppercase 12px label.
- **Button:** hibiscus 600 fill, white text, pill radius.
- **Search input:** white, sand border, 16px radius, always paired with a visible label.
- **FAQ item:** native disclosure (`details`), card styling, muted answer text.
- **Empty and not-found states:** plain sentence, one clear way back.
