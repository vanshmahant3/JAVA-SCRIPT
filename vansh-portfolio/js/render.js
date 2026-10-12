/* ==========================================================
   render.js — turns the data files into page content.
   `h()` builds DOM elements with textContent, so data can
   never inject HTML.
   ========================================================== */
(function () {
  const D = window.PORTFOLIO;

  /** h("div", {class:"x"}, "text", childNode, ...) */
  function h(tag, attrs) {
    const node = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach(function (k) {
        const v = attrs[k];
        if (v === null || v === undefined || v === false) return;
        if (k === "class") node.className = v;
        else if (k === "text") node.textContent = v;
        else if (k.slice(0, 2) === "on" && typeof v === "function") node.addEventListener(k.slice(2), v);
        else node.setAttribute(k, v === true ? "" : v);
      });
    }
    for (let i = 2; i < arguments.length; i++) {
      const c = arguments[i];
      if (c === null || c === undefined || c === false) continue;
      node.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
    }
    return node;
  }
  D.h = h;

  const $ = (id) => document.getElementById(id);
  const icon = D.icon;

  /** Links to profiles that actually exist (missing ones are skipped). */
  function profileLinks() {
    const p = D.profile;
    const out = [];
    if (p.linkedin) out.push({ label: "LinkedIn", icon: "linkedin", href: p.linkedin, external: true });
    if (p.github) out.push({ label: "GitHub", icon: "github", href: p.github, external: true });
    if (p.email) out.push({ label: "Email", icon: "mail", href: "mailto:" + p.email, external: false });
    return out;
  }
  function renderLinks(ul) {
    profileLinks().forEach(function (l) {
      ul.appendChild(
        h(
          "li",
          null,
          h("a", { href: l.href, target: l.external ? "_blank" : null, rel: l.external ? "noopener" : null, "aria-label": l.label + (l.external ? " (opens in a new tab)" : "") }, icon(l.icon), l.label)
        )
      );
    });
  }

  /* ---------- 1. Hero ---------- */
  function renderHero() {
    const p = D.profile;
    $("hero-headline").textContent = p.headline;
    $("hero-intro").textContent = p.intro;
    const img = $("hero-photo");
    img.src = p.photo;
    img.alt = p.photoAlt;

    const meta = $("hero-meta");
    [["Expected graduation", p.graduation], ["CGPA", p.cgpa], ["Based in", p.location.split(",")[0]]].forEach(function (m) {
      meta.appendChild(h("li", null, h("span", { class: "k", text: m[0] }), h("span", { class: "v", text: m[1] })));
    });
    renderLinks($("hero-social"));
  }

  /* ---------- 2. About & education ---------- */
  function renderAbout() {
    const p = D.profile;
    const box = $("about-text");
    p.about.forEach((t) => box.appendChild(h("p", { text: t })));
    const ul = $("about-interests");
    p.interests.forEach((t) => ul.appendChild(h("li", { text: t })));

    const ol = $("education-list");
    D.education.forEach(function (e) {
      ol.appendChild(
        h(
          "li",
          { class: e.current ? "current" : "" },
          h("span", { class: "tl-period", text: e.period }),
          h("h3", null, e.title, e.current ? h("span", { class: "badge", text: "Current" }) : null),
          h("p", { class: "tl-org", text: e.place }),
          e.note ? h("p", { class: "tl-note", text: e.note }) : null
        )
      );
    });
  }

  /* ---------- 3. Skills ---------- */
  function renderSkills() {
    const grid = $("skills-grid");
    D.skills.forEach(function (g, i) {
      const ul = h("ul", { class: "tag-list skill-tags" });
      g.items.forEach((s) => ul.appendChild(h("li", { class: "tag", title: s.evidence, text: s.name })));
      grid.appendChild(h("article", { class: "skill-group reveal", style: "transition-delay:" + i * 60 + "ms" }, h("h3", { text: g.group }), ul));
    });
  }

  /* ---------- 4. Projects ---------- */
  function renderProjects() {
    const grid = $("projects-grid");
    D.projects.forEach(function (p, i) {
      const tech = h("ul", { class: "tag-list" });
      p.tech.forEach((t) => tech.appendChild(h("li", { class: "tag", text: t })));

      const row = (label, text) => h("div", { class: "p-row" }, h("dt", { text: label }), h("dd", { text: text }));

      const links = h("div", { class: "project-links" });
      (p.links || []).forEach(function (l) {
        if (l.type === "doc") links.appendChild(h("button", { class: "btn btn-small btn-outline", type: "button", "data-open-doc": l.id }, l.label, icon("external")));
        else if (l.href) links.appendChild(h("a", { class: "btn btn-small btn-outline", href: l.href, target: "_blank", rel: "noopener" }, l.label, icon("external")));
      });

      grid.appendChild(
        h(
          "article",
          { class: "project-card reveal" + (p.featured ? " featured" : ""), style: "transition-delay:" + i * 70 + "ms" },
          h("span", { class: "badge", text: p.status }),
          h("h3", { text: p.name }),
          h("dl", null, row("Problem", p.problem), row("Solution", p.solution), row("My contribution", p.contribution), row("Outcome", p.outcome)),
          tech,
          links.childNodes.length ? links : null
        )
      );
    });
  }

  /* ---------- 5. Experience & achievements ---------- */
  function renderExperience() {
    const ol = $("exp-list");
    D.timeline.forEach(function (e, i) {
      const refs = h("div", { class: "tl-links" });
      e.refs.forEach(function (r) {
        const attr = r.kind === "cert" ? "data-open-cert" : r.kind === "photo" ? "data-open-photo" : "data-open-doc";
        const o = { class: "tl-link", type: "button" };
        o[attr] = r.id;
        refs.appendChild(h("button", o, r.label, icon("external")));
      });
      ol.appendChild(
        h(
          "li",
          { class: "reveal", style: "transition-delay:" + Math.min(i, 4) * 40 + "ms" },
          h("div", { class: "tl-head" }, h("span", { class: "tl-period", text: e.when }), h("span", { class: "badge", text: e.type })),
          h("h3", { text: e.title }),
          h("p", { class: "tl-org", text: e.org }),
          h("p", { class: "tl-note", text: e.text }),
          refs.childNodes.length ? refs : null
        )
      );
    });
  }

  /* ---------- 7. Contact + footer ---------- */
  function renderContact() {
    const p = D.profile;
    const ul = $("contact-list");
    if (p.email) ul.appendChild(h("li", null, h("a", { href: "mailto:" + p.email }, icon("mail"), h("span", null, h("small", { text: "Email" }), p.email))));
    if (p.linkedin) ul.appendChild(h("li", null, h("a", { href: p.linkedin, target: "_blank", rel: "noopener" }, icon("linkedin"), h("span", null, h("small", { text: "LinkedIn" }), "vansh-mahant"))));
    if (p.github) ul.appendChild(h("li", null, h("a", { href: p.github, target: "_blank", rel: "noopener" }, icon("github"), h("span", null, h("small", { text: "GitHub" }), "Open profile"))));
    ul.appendChild(h("li", null, h("div", { class: "row" }, icon("pin"), h("span", null, h("small", { text: "Based in" }), p.location))));
  }

  function setResume() {
    const p = D.profile;
    ["header-resume", "hero-resume"].forEach(function (id) {
      const a = $(id);
      if (!p.resume) { a.hidden = true; return; } // no resume file → hide the button instead of showing a dead one
      a.href = p.resume;
      if (id === "hero-resume") a.setAttribute("download", "Vansh_Mahant_Resume.pdf");
      else { a.target = "_blank"; a.rel = "noopener"; }
    });
  }

  D.render = function () {
    renderHero();
    renderAbout();
    renderSkills();
    renderProjects();
    renderExperience();
    renderContact();
    renderLinks($("footer-social"));
    $("year").textContent = new Date().getFullYear();
    setResume();
  };
})();
