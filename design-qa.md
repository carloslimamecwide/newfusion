# Design QA — WebFusionLab

## Visual truth and capture setup

- Source of visual truth: `/Users/carloslima/Downloads/imagem.png`
- Final implementation capture: `/Users/carloslima/.codex/visualizations/2026/07/30/019fb544-5e69-71e3-92a7-74b95fa91b75/webfusionlab-qa/home-863-production.png`
- Full side-by-side comparison: `/Users/carloslima/.codex/visualizations/2026/07/30/019fb544-5e69-71e3-92a7-74b95fa91b75/webfusionlab-qa/comparison-production-final.jpg`
- Focused hero comparison: `/Users/carloslima/.codex/visualizations/2026/07/30/019fb544-5e69-71e3-92a7-74b95fa91b75/webfusionlab-qa/comparison-hero-final.jpg`
- Focused sections comparison: `/Users/carloslima/.codex/visualizations/2026/07/30/019fb544-5e69-71e3-92a7-74b95fa91b75/webfusionlab-qa/comparison-sections-final.jpg`
- Viewport: 863 × 1823 CSS px.
- Source pixels: 863 × 1823. Implementation pixels: 863 × 1823.
- Device pixel ratio: 1. Density normalization was not required.
- State: PT homepage, light monochrome theme, initial loaded state, WebGL ready, no authentication.

## Comparison history

### Pass 1

Evidence: `home-863.png`

- P1: the 863 px viewport entered the mobile structure too early and no longer matched the reference composition.
- P1: the hero fallback had an opaque rectangular background.
- Fixes: moved the structural breakpoint to 800 px, exported a transparent fallback and resized the hero sculpture.

### Pass 2

Evidence: `home-863-v4.png`

- P2: vertical rhythm was too tall; the same 1823 px frame ended around the studio section instead of showing the process and CTA.
- Fixes: measured and reduced medium-width paddings, media heights, process spacing, CTA height and footer spacing.

### Pass 3

Evidence: `home-863-final.png`

- P2: the development badge prevented the screenshot from being clean production evidence.
- P2: touch-target and CTA/footer tuning remained.
- Fixes: captured the production build, restored 48 px interactive targets with compensated spacing and hardened the WebGL capability guard.

### Final pass

Evidence: `home-863-production.png`

- No remaining actionable P0, P1 or P2 differences.
- P3: the data-flow sculpture has an original silhouette rather than copying the source object; it keeps the same monochrome mass, contour rhythm and motion direction.
- P3: capability and studio subjects are explicitly digital and conceptual, avoiding fictitious projects, clients or team members.
- P3: Manrope is used consistently as specified and closely matches the light grotesk character of the source.

### Targeted correction — 3D scale

- User evidence: `/var/folders/qp/bt2pwhgx1j9475s991rzjg7w0000gp/T/codex-clipboard-f6526f60-c1dc-4c25-85b1-27d69fd96e9a.png`.
- Revised implementation: `/Users/carloslima/Desktop/webfusionlab/.design/qa-home-1900-scale-adjusted.png`.
- Side-by-side evidence: `/Users/carloslima/Desktop/webfusionlab/.design/qa-3d-before-after.jpg`.
- Viewport and pixels: 1900 × 846 CSS px, DPR 1; both captures are 1900 × 846 pixels and required no density normalization.
- P2 before the fix: the live sculpture touched the top and bottom of the hero and overlapped the title region.
- Fix: added a container-width-responsive scene scale clamped between 0.76 and 1, plus the equivalent wide-screen fallback scale.
- Post-fix result: the sculpture remains dominant but is fully framed, preserves a clear gap from the title and no longer clips against the hero edges. No remaining actionable P0, P1 or P2 issue.

### Targeted correction — title clipping and digital relevance

- User evidence: the final `s` in “experiências” and the descender of the `g` in “digitais” appeared clipped; the 3D subject and editorial imagery needed an explicit connection to digital technology.
- Final wide capture: `/Users/carloslima/Desktop/webfusionlab/.design/qa-home-1900-tech-final.png`.
- Final full-page capture: `/Users/carloslima/Desktop/webfusionlab/.design/qa-home-863-tech-final.png`.
- Reduced-motion fallback: `/Users/carloslima/Desktop/webfusionlab/.design/qa-home-863-reduced-tech.png`.
- Reference comparison: `/Users/carloslima/Desktop/webfusionlab/.design/qa-comparison-tech-final.jpg`.
- P2 before the fix: the heading reveal relied on a line-level overflow mask that could crop terminal glyphs and descenders.
- Fix: moved the reveal to a padded `clip-path`, widened the copy measure and kept the semantic heading above the artwork. Browser range measurements confirm the full glyph bounds for all three lines.
- P2 before the fix: the vase-like sculpture and lifestyle objects did not communicate the WebFusionLab offer clearly enough.
- Fix: rebuilt the Three.js scene as a connected signal surface with 68 data lines, 11 transverse connectors and visible nodes; replaced all seven rendered editorial assets with interfaces, data topology, checkout, devices, product-design tooling, compute infrastructure and a dashboard laptop.
- Cache integrity: rendered assets use new versioned file names so a browser cannot reuse the previous editorial imagery.
- Post-fix runtime: WebGL ready, zero fresh console errors and no horizontal overflow at 1900 × 846 or 863 × 1823. Reduced motion uses the exported data-flow frame with the canvas disabled.

### Targeted correction — glyph overhang and descenders

- User evidence: `/var/folders/qp/bt2pwhgx1j9475s991rzjg7w0000gp/T/codex-clipboard-8b463578-fd82-43ce-a343-0411f4c98062.png`, `/var/folders/qp/bt2pwhgx1j9475s991rzjg7w0000gp/T/codex-clipboard-aacd5886-1a5d-483c-a5f5-b3d3af8f7778.png` and `/var/folders/qp/bt2pwhgx1j9475s991rzjg7w0000gp/T/codex-clipboard-e3905ad7-a78c-4976-99d2-5e60c2ae9e29.png`.
- Direct before/after comparison: `/Users/carloslima/Desktop/webfusionlab/.design/qa-typefix-comparison.png`.
- P2 before the fix: word-level `overflow: clip` removed the overhang of the final `m` in “imagem” and the final `o` in “trabalho”; the hero line mask did not leave enough room below the `g` in “digitais”.
- Fix: word reveals now keep `overflow: visible`; the hero `clip-path` includes a `0.36em` bottom bleed and `0.28em` side bleeds throughout the animation.
- Desktop evidence: `qa-typefix-home.png`, `qa-typefix-services.png` and `qa-typefix-about.png`, all at 1900 × 846 CSS px.
- Mobile evidence: `qa-typefix-home-390.png`, `qa-typefix-services-390.png`, `qa-typefix-about-390.png` and `qa-typefix-390-contact.png`.
- Post-fix result: the `g`, `m` and `o` render completely after and during the reveal. PT headings reflow correctly at 390 px; the tested pages produced zero fresh console errors.

## Mandatory surface review

- Typography: scale, weight, line breaks, tracking and lowercase hero treatment align with the reference at the measured viewport.
- Spacing and layout: header, near-viewport hero, alternating bands, gallery, studio, process, CTA and footer match the source sequence and density.
- Colors: neutral paper, soft-black bands, graphite copy and low-contrast rules remain fully monochrome.
- Image quality and assets: seven local, optimized and versioned technology WebPs plus the transparent data-flow fallback; no stock URLs or placeholder graphics.
- Copy and content: localized PT/EN studio copy; conceptual imagery is labelled as capability rather than proof of completed work.
- Icons: interface icons come from the existing typed icon component; no emoji or improvised decorative SVGs.
- Interactions: menu focus trap and Escape behavior, gallery controls and native scroll-snap, contact validation, FAQ disclosure, locale routes and 3D pause/fallback behavior were exercised.
- Responsive and accessibility: checked at true 390, 768, 863 and 1440 CSS px; no horizontal overflow, 48 px targets, visible focus, semantic headings, localized alt text, reduced-motion fallback and accessible live form feedback.

## Runtime evidence

- Mobile menu: `aria-expanded`, focus entry, `inert` background, body scroll lock, Escape close and focus restoration all passed.
- Contact form: six empty-field messages render beside their fields and focus moves to the first invalid field; no request is sent.
- WebGL-ready state: canvas visible and fallback hidden.
- WebGL-unavailable state: local fallback visible with zero fresh console errors.
- Wide-screen scale state: WebGL ready, canvas opacity 1, no horizontal overflow and zero fresh page-console errors at 1900 × 846.
- Routes: canonical PT/EN pages return 200; invalid service, case and route paths return 404; localized legacy paths redirect as expected.
- Responsive captures: `home-390-final.png`, `home-768.png`, `home-1440.png` and `contact-390-final.png`.

final result: passed
