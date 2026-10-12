/* ==========================================================
   certificates.js — gallery, category filter and search.
   State lives in one small object; every change re-renders
   the grid from the data (a simple "state → view" pattern).
   ========================================================== */
(function () {
  const D = window.PORTFOLIO;
  const h = D.h;
  const state = { category: "all", query: "" };
  let visible = [];

  function toItem(c) {
    return {
      src: c.preview,
      alt: c.title + " — certificate issued by " + c.issuer,
      title: c.title,
      meta: c.issuer + " · " + c.dateLabel,
      detail: c.detail,
      original: c.file,
      originalLabel: "Open original (" + c.fileType + ")",
      verify: c.verifyUrl || null,
    };
  }
  D.certToItem = toItem;

  function matches(c) {
    if (state.category !== "all" && c.category !== state.category) return false;
    const q = state.query.trim().toLowerCase();
    if (!q) return true;
    return (c.title + " " + c.issuer + " " + c.kind + " " + c.dateLabel).toLowerCase().indexOf(q) !== -1;
  }

  function sorted(list) {
    // newest first; certificates without a date go last
    return list.slice().sort(function (a, b) {
      if (!a.date && !b.date) return 0;
      if (!a.date) return 1;
      if (!b.date) return -1;
      return a.date < b.date ? 1 : -1;
    });
  }

  function renderChips() {
    const wrap = document.getElementById("cert-filters");
    wrap.textContent = "";
    D.certCategories.forEach(function (cat) {
      const n = cat.id === "all" ? D.certificates.length : D.certificates.filter((c) => c.category === cat.id).length;
      if (cat.id !== "all" && n === 0) return;
      wrap.appendChild(
        h(
          "button",
          {
            class: "chip",
            type: "button",
            "aria-pressed": String(state.category === cat.id),
            onclick: function () {
              state.category = cat.id;
              renderChips();
              renderGrid();
            },
          },
          cat.label,
          h("span", { class: "n", text: String(n) })
        )
      );
    });
  }

  function renderGrid() {
    const grid = document.getElementById("cert-grid");
    grid.textContent = "";
    visible = sorted(D.certificates.filter(matches));

    visible.forEach(function (c, i) {
      grid.appendChild(
        h(
          "button",
          { class: "cert-card", type: "button", "data-index": String(i), "aria-label": "Open preview: " + c.title + ", " + c.issuer },
          h("div", { class: "cert-thumb" }, h("img", { src: c.thumb, alt: "", loading: "lazy", width: "640", height: "480" }), h("span", { class: "cert-type", text: c.fileType })),
          h(
            "div",
            { class: "cert-body" },
            h("span", { class: "cert-kind", text: c.kind }),
            h("span", { class: "cert-title", text: c.title }),
            h("span", { class: "cert-issuer", text: c.issuer }),
            h("span", { class: "cert-date", text: c.dateLabel })
          )
        )
      );
    });

    document.getElementById("cert-empty").hidden = visible.length !== 0;
    document.getElementById("cert-count").textContent = "Showing " + visible.length + " of " + D.certificates.length + " certificates";
  }

  D.initCertificates = function () {
    document.getElementById("cert-sub").textContent =
      D.certificates.length + " certificates, from professional certifications and internships to competitions. Select a card to read the full certificate.";

    renderChips();
    renderGrid();

    document.getElementById("cert-search").addEventListener("input", function (e) {
      state.query = e.target.value;
      renderGrid();
    });

    // One click handler for all cards (event delegation)
    document.getElementById("cert-grid").addEventListener("click", function (e) {
      const card = e.target.closest(".cert-card");
      if (!card) return;
      D.lightbox.open(visible.map(toItem), Number(card.dataset.index), card);
    });
  };
})();
