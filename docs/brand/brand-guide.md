# Lifecycle Offsite 2027: Brand Guide

An original brand for a fictional offsite. The idea: a deadpan corporate memo, printed on a tropical postcard.

## Colors

| Token | Hex | Role |
|---|---|---|
| Teal 900 | `#0B3C49` | Header, inverse surfaces, headings on light |
| Teal 700 | `#14606F` | Links, focus ring |
| Teal 100 | `#D7ECEE` | Tag backgrounds |
| Cream 50 | `#FBF5E9` | Page background |
| Sand 200 | `#F1E6CF` | Alternate sections, hero |
| Sand 400 | `#D9CDB3` | Borders and dividers |
| White | `#FFFFFF` | Cards, inputs |
| Ink 900 | `#17262B` | Body text |
| Ink 600 | `#4F6168` | Muted text |
| Hibiscus 600 | `#C0304B` | Primary action (white text) |
| Hibiscus 700 | `#9E243B` | Action hover, accent text |
| Hibiscus 100 | `#F8DDE2` | Soft accent background |

Use hibiscus sparingly: one action color per screen.

## Typography

- **Headings:** Fraunces (Google Fonts), weights 400-700.
- **Body and UI:** Inter (Google Fonts), weights 400-600.

| Step | Size | Use |
|---|---|---|
| xs | 12px | Tags, captions |
| sm | 14px | Meta, helper text |
| base | 16px | Body |
| lg | 20px | Card titles, lead text |
| xl | 24px | Subheads |
| 2xl | 32px | Section headings |
| 3xl | 44px | Page titles |

Line height: 1.15 for headings, 1.6 for body.

## Spacing, radius, shadow

- **Spacing** (4px base): 4, 8, 12, 16, 24, 32, 48, 72.
- **Radius:** 6 (inputs), 12 (cards), 20 (large panels), pill (tags, buttons).
- **Shadow:** `sm` for resting cards, `md` for hover. Both use a teal-tinted shadow, never pure black.

## Voice and tone

Dry, specific, affectionate. Funny through understatement, never through volume. No exclamation marks, no emoji. Write like a status update about a vacation. Never joke about people's jobs, pay, or health.

## Component guidance

- **Card:** white surface, 1px sand border, 12px radius, `sm` shadow. Whole card is one link.
- **Tag:** pill, teal 100 background, uppercase 12px label.
- **Button:** hibiscus 600 fill, white text, pill radius.
- **Search input:** white, sand border, 6px radius, always paired with a visible label.
- **FAQ item:** native disclosure (`details`), card styling, muted answer text.
- **Empty and not-found states:** plain sentence, one clear way back.
