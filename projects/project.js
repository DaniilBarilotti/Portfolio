// Language switch for the project description pages. Uses the same saved setting
// ("site_lang") as the main portfolio, so the language carries over between pages.
(function () {
  "use strict";
  var root = document.documentElement;
  var lang = "en";
  try {
    var requested = new URLSearchParams(location.search).get("lang");
    var saved = localStorage.getItem("site_lang");
    lang = requested === "de" || requested === "en" ? requested : saved === "de" ? "de" : "en";
  } catch (e) {}

  function apply(next) {
    lang = next;
    root.lang = next;
    document.title = root.getAttribute("data-title-" + next) || document.title;
    document.querySelectorAll(".lang-switch button").forEach(function (button) {
      button.setAttribute("aria-pressed", String(button.dataset.lang === next));
    });
    try {
      localStorage.setItem("site_lang", next);
    } catch (e) {}
  }

  document.querySelectorAll(".lang-switch button").forEach(function (button) {
    button.addEventListener("click", function () {
      apply(button.dataset.lang);
    });
  });
  apply(lang);
})();
