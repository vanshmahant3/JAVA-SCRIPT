# Viva preparation

**1. Why no React?** I built it with plain HTML/CSS/JS so every line is mine to explain, and it needs no build tools.
**2. How is the page built from data?** `render.js` reads `window.PORTFOLIO` (from `js/data`) and creates elements with a helper `h()`. Changing data changes the page.
**3. Why `textContent` instead of `innerHTML`?** It treats data as text, so it can't inject HTML/scripts (XSS safety).
**4. How does the certificate filter work?** A `state` object holds `category` and `query`. Any change re-filters the array (`filter`), sorts it, and re-renders the grid.
**5. What is event delegation?** One click listener on `#cert-grid` handles every card via `e.target.closest(".cert-card")`.
**6. How does the lightbox work?** A native `<dialog>`; `showModal()` gives focus trapping and Esc. Arrow keys call `show(index ± 1)` with modulo wrap-around.
**7. How does dark mode work?** CSS variables on `:root[data-theme="dark"]`; JS toggles the attribute and stores it in `localStorage` (inside try/catch). A tiny inline script in `<head>` applies it before paint.
**8. How is the contact form validated?** Rules per field (empty, length, email regex), checked on blur and submit; errors go in `aria`-linked `<p role="alert">`. Valid input builds a `mailto:` link.
**9. What is scroll-spy / reveal?** `IntersectionObserver` watches sections and adds `.active` / `.in` classes — more efficient than scroll listeners.
**10. How is it responsive?** CSS grid with `auto-fit/minmax`, `clamp()` font sizes, and media queries at 1120px and 860px; the nav becomes a hamburger menu.
**11. Accessibility?** Skip link, semantic landmarks, alt text, visible focus, `aria-expanded`, `aria-live`, reduced-motion support.
**12. What is not yet filled in, and why?** Resume, GitHub/LinkedIn, marks, other projects — no verified data was supplied, so they show "to be added" notices instead of invented content.
