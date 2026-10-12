/* ==========================================================
   ui.js — general interface behaviour:
   theme toggle, mobile menu, scroll-spy, progress bar,
   back-to-top and scroll-reveal animations.
   ========================================================== */
(function () {
  const D = window.PORTFOLIO;

  function safeStorage(action, key, value) {
    try {
      return action === "get" ? localStorage.getItem(key) : localStorage.setItem(key, value);
    } catch (e) {
      return null; // storage can be blocked (private mode) — the site still works
    }
  }

  /* ----- Theme ----- */
  function initTheme() {
    const root = document.documentElement;
    const btn = document.getElementById("theme-toggle");
    const meta = document.querySelector('meta[name="theme-color"]');

    function apply(theme) {
      root.setAttribute("data-theme", theme);
      btn.setAttribute("aria-label", theme === "dark" ? "Switch to light theme" : "Switch to dark theme");
      if (meta) meta.setAttribute("content", theme === "dark" ? "#0e0e12" : "#f6f4ef");
    }
    apply(root.getAttribute("data-theme") || "dark");
    btn.addEventListener("click", function () {
      const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      apply(next);
      safeStorage("set", "theme", next);
    });
  }

  /* ----- Mobile menu ----- */
  function initMenu() {
    const toggle = document.getElementById("nav-toggle");
    const nav = document.getElementById("site-nav");

    function set(open) {
      nav.classList.toggle("open", open);
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    }
    toggle.addEventListener("click", () => set(!nav.classList.contains("open")));
    nav.addEventListener("click", (e) => { if (e.target.closest("a")) set(false); });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("open")) { set(false); toggle.focus(); }
    });
  }

  /* ----- Scroll-spy: highlight the nav link of the section in view ----- */
  function initSpy() {
    const links = Array.from(document.querySelectorAll("#nav-list a"));
    const map = new Map();
    links.forEach(function (a) {
      const sec = document.querySelector(a.getAttribute("href"));
      if (sec) map.set(sec, a);
    });
    if (!("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (en) {
          if (!en.isIntersecting) return;
          links.forEach((l) => { l.classList.remove("active"); l.removeAttribute("aria-current"); });
          const a = map.get(en.target);
          if (a) { a.classList.add("active"); a.setAttribute("aria-current", "true"); }
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    map.forEach((_, sec) => io.observe(sec));
  }

  /* ----- Progress bar + back-to-top ----- */
  function initScroll() {
    const bar = document.getElementById("scroll-progress");
    const top = document.getElementById("to-top");
    let ticking = false;

    function update() {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      bar.style.transform = "scaleX(" + p.toFixed(4) + ")";
      top.hidden = window.scrollY < 600;
      ticking = false;
    }
    window.addEventListener("scroll", function () {
      if (!ticking) { requestAnimationFrame(update); ticking = true; }
    }, { passive: true });
    update();

    top.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
      document.getElementById("top").focus({ preventScroll: true });
    });
  }

  /* ----- Reveal on scroll ----- */
  function initReveal() {
    const els = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) { els.forEach((e) => e.classList.add("in")); return; }
    const io = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (en) {
          if (en.isIntersecting) { en.target.classList.add("in"); obs.unobserve(en.target); }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );
    els.forEach((e) => io.observe(e));
  }

  D.initUI = function () {
    initTheme();
    initMenu();
    initSpy();
    initScroll();
    initReveal();
  };
})();
