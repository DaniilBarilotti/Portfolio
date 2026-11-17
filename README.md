# Daniil Barilotti — Portfolio

Bilingual (English / German) portfolio of a cybersecurity student with a software and IT focus.

[Live site](https://daniilbarilotti.github.io/Portfolio/) · [GitHub](https://github.com/DaniilBarilotti)

## Selected work

| Project | Focus |
| --- | --- |
| Security Headers Scanner | React, TypeScript, serverless function, SSRF protection |
| My Atlas | 3D globe (three.js), Supabase auth and Postgres, Wikipedia data (public demo) |
| Phone Catalog | React, TypeScript, Redux, routing |
| CineDrop | Next.js, React, TypeScript, film discovery with daily catalog updates (public demo) |
| PromptGuard UI | React, chat UI, API integration (team project) |
| FORNO Pizzeria | Responsive UI, DE / EN, accessibility |
| 2048 | JavaScript game state |
| Bose Landing Page | HTML, SCSS, BEM (training project) |

## Run locally

```bash
python3 -m http.server 8000
```

Open `http://localhost:8000`. No build step required.

## Structure

- `index.html`, `styles.css`, `main.js`: the website.
- `career/`: CV (HTML and PDF) and the project portfolio (HTML and PDF).
- `projects/`: description pages for the featured projects (CineDrop, My Atlas), whose source
  code is private. English and German, sharing the language setting with the main site.
