/* ==========================================================
   contact.js — form validation (no backend needed).
   On success the form opens the visitor's email app using a
   mailto: link addressed to the email in profile.js.
   ========================================================== */
(function () {
  const D = window.PORTFOLIO;

  const rules = {
    name: function (v) {
      if (!v.trim()) return "Please enter your name.";
      if (v.trim().length < 2) return "Your name should be at least 2 characters.";
      return "";
    },
    email: function (v) {
      if (!v.trim()) return "Please enter your email address.";
      // simple pattern: something@something.something
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim())) return "That doesn't look like a valid email address.";
      return "";
    },
    message: function (v) {
      if (!v.trim()) return "Please write a message.";
      if (v.trim().length < 10) return "Please write at least 10 characters.";
      return "";
    },
  };

  function setError(field, msg) {
    const wrap = field.closest(".field");
    wrap.classList.toggle("invalid", !!msg);
    field.setAttribute("aria-invalid", msg ? "true" : "false");
    document.getElementById(field.id + "-err").textContent = msg;
  }

  function validateField(field) {
    const msg = rules[field.name](field.value);
    setError(field, msg);
    return !msg;
  }

  D.initContact = function () {
    const form = document.getElementById("contact-form");
    const status = document.getElementById("form-status");
    const fields = Array.from(form.querySelectorAll("input, textarea"));

    // validate when the user leaves a field, and re-check while typing once it was flagged
    fields.forEach(function (f) {
      f.addEventListener("blur", () => validateField(f));
      f.addEventListener("input", function () {
        if (f.closest(".field").classList.contains("invalid")) validateField(f);
      });
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      status.textContent = "";
      const results = fields.map(validateField);
      const firstBad = fields[results.indexOf(false)];
      if (firstBad) {
        firstBad.focus();
        status.textContent = "Please fix the highlighted fields.";
        return;
      }
      if (!D.profile.email) {
        status.textContent = "No email address is configured yet.";
        return;
      }
      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const msg = form.message.value.trim();
      const subject = "Portfolio message from " + name;
      const body = msg + "\n\n— " + name + " (" + email + ")";
      window.location.href = "mailto:" + D.profile.email + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
      status.textContent = "Opening your email app…";
      form.reset();
    });
  };
})();
