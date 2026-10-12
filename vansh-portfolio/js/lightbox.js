/* ==========================================================
   lightbox.js — image preview built on the native <dialog>
   element (it already traps focus, handles Esc and restores
   focus). Arrow keys move between images.
   ========================================================== */
(function () {
  const D = window.PORTFOLIO;
  const dlg = document.getElementById("lightbox");
  const img = document.getElementById("lb-img");
  let items = [];
  let index = 0;

  function show(i) {
    index = (i + items.length) % items.length;
    const it = items[index];
    img.src = it.src;
    img.alt = it.alt;
    document.getElementById("lb-title").textContent = it.title;
    document.getElementById("lb-meta").textContent = it.meta || "";
    document.getElementById("lb-detail").textContent = it.detail || "";
    document.getElementById("lb-counter").textContent = index + 1 + " / " + items.length;

    const orig = document.getElementById("lb-original");
    orig.hidden = !it.original;
    if (it.original) {
      orig.href = it.original;
      orig.firstChild.textContent = (it.originalLabel || "Open original") + " ";
    }
    const v = document.getElementById("lb-verify");
    v.hidden = !it.verify;
    if (it.verify) v.href = it.verify;

    const single = items.length < 2;
    document.getElementById("lb-prev").hidden = single;
    document.getElementById("lb-next").hidden = single;
  }

  function open(list, start) {
    items = list;
    show(start || 0);
    if (!dlg.open) dlg.showModal();
  }

  function init() {
    document.getElementById("lb-close").addEventListener("click", () => dlg.close());
    document.getElementById("lb-prev").addEventListener("click", () => show(index - 1));
    document.getElementById("lb-next").addEventListener("click", () => show(index + 1));

    dlg.addEventListener("keydown", function (e) {
      if (e.key === "ArrowLeft") { e.preventDefault(); if (items.length > 1) show(index - 1); }
      if (e.key === "ArrowRight") { e.preventDefault(); if (items.length > 1) show(index + 1); }
    });
    // click on the dark backdrop closes it
    dlg.addEventListener("click", function (e) { if (e.target === dlg) dlg.close(); });

    // Elements elsewhere on the page that open a specific certificate / photo
    document.addEventListener("click", function (e) {
      const c = e.target.closest("[data-open-cert]");
      if (c) {
        const all = D.certificates;
        const i = all.findIndex((x) => x.id === c.dataset.openCert);
        if (i > -1) open(all.map(D.certToItem), i);
        return;
      }
      const d = e.target.closest("[data-open-doc]");
      if (d) {
        const doc = D.documents[d.dataset.openDoc];
        if (doc) open([{ src: doc.src, alt: doc.alt, title: doc.title, meta: doc.meta, detail: doc.detail, original: doc.original, originalLabel: doc.originalLabel }], 0);
        return;
      }
      const p = e.target.closest("[data-open-photo]");
      if (p) {
        const all = D.gallery;
        const i = all.findIndex((x) => x.id === p.dataset.openPhoto);
        if (i > -1) open(all.map((g) => ({ src: g.src, alt: g.alt, title: g.caption, meta: "", detail: "", original: g.src, originalLabel: "Open full size" })), i);
      }
    });
  }

  D.lightbox = { open: open, init: init };
})();
