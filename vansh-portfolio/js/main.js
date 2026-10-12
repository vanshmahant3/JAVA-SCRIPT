/* ==========================================================
   main.js — entry point. Order matters:
   1) build the page from data, 2) fill icons, 3) switch on
   behaviour (certificates, lightbox, form, UI effects).
   ========================================================== */
(function () {
  const D = window.PORTFOLIO;
  document.documentElement.classList.add("js"); // lets CSS apply reveal animations only when JS runs

  D.render();
  D.initCertificates();
  D.hydrateIcons(document);
  D.lightbox.init();
  D.initContact();
  D.initUI();

  // Icons inside cards created later (certificate filter re-renders) need no icons, but keep this safe:
  new MutationObserver(() => D.hydrateIcons(document)).observe(document.getElementById("main"), { childList: true, subtree: true });
})();
