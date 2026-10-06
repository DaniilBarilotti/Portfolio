# Portfolio source review — 6 October 2026

This review distinguishes inspected source from runtime verification. Documentation changes do not establish that every existing deployment works.

| Project | Inspected evidence | Limit / follow-up |
| --- | --- | --- |
| Phone Catalog | package.json, Root routes, cart slice, sorting component | Static data; storage side effects in reducers; malformed localStorage may break initialisation. Homepage refreshed; production build, TypeScript and component lint pass. Published desktop checked. |
| PromptGuard UI | API client, chat hook, package.json | Mock queue ignores prompt content. Detector/proxy live elsewhere. Incident errors silently become an empty list. Full application build not run. |
| To-do App | fetch client, task editing hook, package.json | External Mate API, not localStorage task persistence. Existing install scripts update tooling. Full application build not run. |
| 2048 | Complete main.js, package.json | Pre-start keyboard access fixed; key-guard and merge regression checks pass. Pointer-event swipes added in four directions, with threshold/cancellation tests. Board adapts to narrow screens; physical-phone verification not performed. Full application build not run. |
| Bose Landing Page | src/index.html and existing README | `miami-landing` repository actually contains a Bose training layout. Contact form has no submission backend. |
| FORNO | app.js, index.html, existing README | Fictional venue; bilingual presentation rather than a booking or ordering application. |

## Selection

Lead with Phone Catalog for frontend roles; follow with PromptGuard for API / security UI and FORNO for visual design. Use 2048 as evidence of JavaScript fundamentals. Keep small isolated exercises out of the main CV.

ContentFlow AI, the iPhone webcam application and the island game were not found in the available repository inventory or relevant Library results. They are not claimed as completed work.

## Validation boundaries

The refreshed static portfolio and the new SupportDesk demo are validated separately. Earlier React apps were inspected, not rebuilt or comprehensively tested. Existing demo links were retained from repository documentation; remote availability is not guaranteed by source inspection.

## Checks completed for this refresh

- `node --check main.js`: passed.
- HTML unique IDs, referenced local resources and EN / DE translation keys: passed.
- German CV: generated as a one-page A4 PDF and visually inspected.
- Browser layout and interaction checks could not run: the environment has no usable Chromium executable, and its download failed. Desktop/mobile layout is not claimed as browser-verified.

Phone Catalog: existing catalogue packshots now replace the hero/category artwork. Published desktop screenshot and image loading verified. Independent mobile browser rendering was not tested.
