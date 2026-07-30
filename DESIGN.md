---
name: WebFusionLab
description: Dark premium design system for a boutique digital studio
colors:
  electric-blue: "oklch(0.67 0.19 255)"
  electric-blue-strong: "oklch(0.59 0.20 255)"
  midnight-canvas: "oklch(0.135 0.018 265)"
  ink-surface: "oklch(0.175 0.020 265)"
  steel-surface: "oklch(0.215 0.022 265)"
  porcelain-text: "oklch(0.94 0.008 255)"
  mist-text: "oklch(0.72 0.018 255)"
  quiet-text: "oklch(0.64 0.018 255)"
  graphite-line: "oklch(0.30 0.020 265)"
  success: "oklch(0.72 0.14 155)"
  danger: "oklch(0.68 0.18 25)"
typography:
  display:
    fontFamily: "Bricolage Grotesque, system-ui, sans-serif"
    fontSize: "clamp(3.25rem, 9vw, 7.5rem)"
    fontWeight: 650
    lineHeight: 0.9
    letterSpacing: "-0.055em"
  headline:
    fontFamily: "Bricolage Grotesque, system-ui, sans-serif"
    fontSize: "clamp(2.25rem, 5vw, 4.5rem)"
    fontWeight: 620
    lineHeight: 0.96
    letterSpacing: "-0.04em"
  body:
    fontFamily: "Source Sans 3, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: "Source Sans 3, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 650
    lineHeight: 1.2
    letterSpacing: "0.14em"
rounded:
  sm: "6px"
  md: "12px"
  lg: "20px"
spacing:
  xs: "8px"
  sm: "16px"
  md: "24px"
  lg: "48px"
  section: "clamp(5rem, 10vw, 9rem)"
components:
  button-primary:
    backgroundColor: "{colors.electric-blue}"
    textColor: "{colors.midnight-canvas}"
    rounded: "{rounded.sm}"
    padding: "14px 24px"
  button-secondary:
    backgroundColor: "{colors.ink-surface}"
    textColor: "{colors.porcelain-text}"
    rounded: "{rounded.sm}"
    padding: "14px 24px"
  input:
    backgroundColor: "{colors.ink-surface}"
    textColor: "{colors.porcelain-text}"
    rounded: "{rounded.sm}"
    padding: "14px 16px"
---

# Design System: WebFusionLab

## Overview

**Creative North Star: "The Blue Hour Workshop"**

The interface feels like entering a precise workshop after sunset: dark mineral surfaces, controlled blue light and real work pinned into a strict architectural grid. It translates the confidence of the Atelier reference into a digital studio without copying its serif editorial language or invented award culture.

The system is intentionally dark and restrained. Scale, whitespace and imagery create impact; decoration does not. Components are quiet enough to keep case studies and conversion copy in control.

**Key Characteristics:**

- Asymmetric 12-column compositions with deliberate negative space.
- Large sans-serif display type with sharp weight and scale contrast.
- Real screenshots treated as the primary visual material.
- Electric blue used sparingly for action and orientation.
- Motion limited to short, coordinated opacity and transform transitions.

## Colors

The palette is blue-hour monochrome: mineral blacks, cool steel neutrals and one electric signal color.

### Primary

- **Electric Signal** (`oklch(0.67 0.19 255)`): primary actions, focus and small navigational cues.
- **Pressed Signal** (`oklch(0.59 0.20 255)`): hover and active states.

### Neutral

- **Midnight Canvas** (`oklch(0.135 0.018 265)`): page background and browser canvas.
- **Ink Surface** (`oklch(0.175 0.020 265)`): fields and quiet grouped regions.
- **Steel Surface** (`oklch(0.215 0.022 265)`): raised or interactive surfaces.
- **Porcelain Text** (`oklch(0.94 0.008 255)`): primary text, never pure white.
- **Mist Text** (`oklch(0.72 0.018 255)`): body copy.
- **Graphite Line** (`oklch(0.30 0.020 265)`): borders and structural rules.

**The Signal Rule.** Electric blue occupies less than ten percent of a screen. Its rarity makes it useful.

## Typography

**Display Font:** Bricolage Grotesque (with system sans fallback)  
**Body Font:** Source Sans 3 (with system sans fallback)

**Character:** Bricolage supplies compressed, architectural confidence; Source Sans keeps commercial copy calm and readable. The pairing preserves the existing identity without entering the saturated serif-editorial lane.

### Hierarchy

- **Display** (650, `clamp(3.25rem, 9vw, 7.5rem)`, 0.9): hero statements only.
- **Headline** (620, `clamp(2.25rem, 5vw, 4.5rem)`, 0.96): major section openings.
- **Title** (600, `clamp(1.35rem, 2vw, 2rem)`, 1.1): services and projects.
- **Body** (400, 1.125rem, 1.65): readable copy capped at 68ch.
- **Label** (650, 0.75rem, 0.14em): short navigation and metadata only.

**The One Loud Sentence Rule.** Each viewport gets one dominant statement; supporting copy remains visibly quieter.

## Elevation

The system is flat by default. Depth comes from tonal layering, borders and photographic contrast. Shadows appear only on actionable media or controls during interaction and remain broad and low-opacity.

### Shadow Vocabulary

- **Interactive lift** (`0 18px 60px oklch(0.06 0.02 265 / 0.32)`): hovered featured work and the mobile navigation panel only.

**The Structural Depth Rule.** If a surface needs a permanent shadow to be understood, its hierarchy is wrong.

## Components

### Buttons

- **Shape:** compact architectural corners (6px), minimum height 48px.
- **Primary:** Electric Signal background, Midnight Canvas text, 14px by 24px padding.
- **Hover / Focus:** darker signal on hover; 2px visible focus ring with 3px offset.
- **Secondary:** transparent or Ink Surface background with a Graphite Line border.

### Chips

- **Style:** small structural labels with a quiet surface, 1px border and sentence-case text.
- **State:** selected chips use Electric Signal border and Porcelain Text, never a glowing fill.

### Cards / Containers

- **Corner Style:** 12px for standard media, 20px only for the hero mosaic.
- **Background:** Ink Surface or transparent.
- **Shadow Strategy:** flat at rest.
- **Border:** 1px Graphite Line.
- **Internal Padding:** varies between 24px and 48px to preserve rhythm.

### Inputs / Fields

- **Style:** Ink Surface, Graphite Line border, 6px corners and minimum 48px height.
- **Focus:** Electric Signal border plus a visible external focus ring.
- **Error / Disabled:** error text and icon use the Danger token; disabled state lowers contrast but remains readable.

### Navigation

The header uses a compact dark rail with the logo, short labels and one blue CTA. Mobile navigation opens inline below the header, keeps natural DOM order and exposes `aria-expanded` and `aria-controls`.

### Project Mosaic

The signature component combines real screenshots in an asymmetric grid. One image leads; supporting frames provide context. Every image has localized alt text and only the leading LCP candidate receives fetch priority.

## Do's and Don'ts

### Do:

- **Do** make real work the largest visual object on the page.
- **Do** use Electric Signal for actions, focus and orientation only.
- **Do** vary section rhythm between compact proof bands and expansive showcases.
- **Do** preserve WCAG AA contrast and a complete reduced-motion experience.
- **Do** use concise, factual copy with PT and EN parity.

### Don't:

- **Don't** build landing pages SaaS genéricas with identical cards and decorative icons.
- **Don't** use estética cyberpunk with neon, excessive glow or purple gradients.
- **Don't** use editorial artificial with luxury serifs, gratuitous italics or repeated metadata labels.
- **Don't** use glassmorphism decorativo, gradient text or purposeless animation.
- **Don't** present stock photography as the team, office or real work.
- **Don't** invent awards, testimonials, clients or metrics.
- **Don't** use colored side-stripe borders or nested cards.
