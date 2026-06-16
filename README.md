# Personal Portfolio

My personal portfolio — a fast, bilingual single-page site built from scratch with vanilla HTML, CSS and JavaScript. No frameworks, no build step.

🔗 **Live:** [Portfolio](https://daniilbarilotti.github.io/Portfolio/)

## Features

- **Bilingual (EN / DE)** — full interface translation with a language switcher; the choice is saved between visits.
- **Color themes** — a palette button that smoothly transitions the whole accent scheme with an expanding color ripple.
- **Projects carousel** — a swipeable, scroll-snapping carousel that scales to any number of projects.
- **Sections** — about & education, skills with category filters, projects, university coursework, languages, motivation and contacts.
- **Mini-game** — a small "access code" memory game with sound, written from scratch on the Web Audio API.
- **Motion** — scroll-reveal animations and a typewriter effect, with full `prefers-reduced-motion` support.
- **Responsive** — works from mobile to desktop, keyboard-accessible.

## Tech stack

- HTML5
- CSS3 (custom properties, grid, scroll-snap)
- Vanilla JavaScript (IntersectionObserver, Web Audio API, Canvas)
- Google Fonts — Manrope & Space Mono

No dependencies and no bundler — the site runs straight from the files.

## Structure

```
.
├── index.html      # markup & content
├── styles.css      # styles
├── main.js         # translations, interactions, carousel, mini-game
└── assets/         # images
```

Content and translations live in the `I18N` object in `main.js`; projects are defined in the `PROJECTS` array in the same file.

## Run locally

Just open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Deploy

Hosted on GitHub Pages: push to `main`, then enable **Settings → Pages → Branch: main / root**.

## License

MIT © Daniil Barilotti
