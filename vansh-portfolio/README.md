# Vansh Mahant — Self-Portfolio Website

Personal portfolio for the **JavaScript Lab CA3 mini project**. Plain HTML, CSS and JavaScript — no frameworks, no build step, no dependencies.

## Features
- Seven sections: Home, About & Education, Skills, Projects, Experience & Achievements, Certifications, Contact — plus a Resume button
- 15 real certificates with category filter, search and a keyboard-friendly lightbox (originals stay untouched)
- Dark theme by default with a light option (remembered), responsive menu, scroll-spy, progress bar, back-to-top
- Contact form with JavaScript validation (opens the visitor's email app; no backend)
- All content lives in `js/data/*.js` — edit data, not markup

## Run locally
Double-click `index.html`, or serve it:
```bash
cd portfolio
python3 -m http.server 8000     # then open http://localhost:8000
```

## Fill in the missing details
Open `js/data/profile.js` and `js/data/content.js` and replace the `null` / empty items:
`github` (the button appears automatically once you add it), and any new projects, certificates or timeline entries. Anything left as `null` is hidden — no empty buttons.

## Folder structure
```
index.html
css/        base.css (tokens) · layout.css · components.css
js/         main.js · render.js · certificates.js · lightbox.js · contact.js · ui.js · icons.js
js/data/    profile.js · certificates.js · content.js
assets/     certificates/{originals,previews,thumbs} · gallery · img
```

## Upload to GitHub
```bash
cd portfolio
git init
git add .
git commit -m "Add self-portfolio website"
git branch -M main
git remote add origin https://github.com/<your-username>/<repo-name>.git
git push -u origin main
```
(Create the empty repository on github.com first.)

## Deploy free with GitHub Pages
Repo → **Settings → Pages → Build and deployment → Deploy from a branch → `main` / `(root)` → Save**.
Your site appears at `https://<your-username>.github.io/<repo-name>/` after about a minute. All paths are relative and there is no client-side routing, so it works from a sub-folder URL. Then paste that URL into a `links` entry of the Personal Portfolio project in `js/data/content.js` (`{ label: "Live site", href: "https://..." }`).

## Technologies
HTML5 (semantic, `<dialog>`), CSS3 (custom properties, grid, flexbox, media queries), JavaScript ES6 (DOM, events, IntersectionObserver, localStorage). Fonts: Fraunces, Inter, JetBrains Mono (Google Fonts, with system fallbacks).
