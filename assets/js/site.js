/* Ziming Zang — Academic Homepage
   Progressive enhancement only. Handles the EN/ZH language switch, the
   light/dark theme switch, the mobile nav, active nav highlighting and the
   back-to-top button. No dependencies.

   Language model: every translatable fragment exists twice in the DOM as
   [data-lang-block="en"] / [data-lang-block="zh"], and CSS hides the inactive
   one. This script only flips `data-lang` on <html> and syncs the strings that
   cannot be expressed as DOM nodes (<title>, <meta>, aria-labels, img alt). */
(function () {
  "use strict";

  var root = document.documentElement;
  var THEME_KEY = "zz-theme";
  var LANG_KEY = "zz-lang";

  /* Strings used by this script (and therefore not expressible as markup). */
  var UI = {
    en: {
      themeToDark: "Switch to dark mode",
      themeToLight: "Switch to light mode",
      navToggle: "Toggle navigation menu",
      toTop: "Back to top",
      langToggle: "切换到中文"
    },
    zh: {
      themeToDark: "切换到深色模式",
      themeToLight: "切换到浅色模式",
      navToggle: "展开导航菜单",
      toTop: "回到顶部",
      langToggle: "Switch to English"
    }
  };

  function currentLang() {
    return root.getAttribute("data-lang") === "zh" ? "zh" : "en";
  }

  function t() {
    return UI[currentLang()];
  }

  function currentTheme() {
    return root.getAttribute("data-theme") === "dark" ? "dark" : "light";
  }

  function store(key, value) {
    try {
      window.localStorage.setItem(key, value);
    } catch (e) {
      /* storage unavailable (private mode / some file:// contexts) — ignore */
    }
  }

  function read(key) {
    try {
      return window.localStorage.getItem(key);
    } catch (e) {
      return null;
    }
  }

  /* ------------------------------------------------------------- theme --- */

  function syncThemeLabels() {
    var isDark = currentTheme() === "dark";
    var label = isDark ? t().themeToLight : t().themeToDark;
    document.querySelectorAll("[data-theme-toggle]").forEach(function (btn) {
      btn.setAttribute("aria-pressed", String(isDark));
      btn.setAttribute("title", label);
      btn.setAttribute("aria-label", label);
    });
  }

  function applyTheme(theme, persist) {
    root.setAttribute("data-theme", theme);
    if (persist) {
      store(THEME_KEY, theme);
    }
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) {
      meta.setAttribute("content", theme === "dark" ? "#141617" : "#0b6e5f");
    }
    syncThemeLabels();
  }

  function initTheme() {
    document.querySelectorAll("[data-theme-toggle]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        applyTheme(currentTheme() === "dark" ? "light" : "dark", true);
      });
    });

    // Follow the OS preference until the visitor makes an explicit choice.
    if (window.matchMedia) {
      var query = window.matchMedia("(prefers-color-scheme: dark)");
      var onChange = function (event) {
        if (!read(THEME_KEY)) {
          applyTheme(event.matches ? "dark" : "light", false);
        }
      };
      if (query.addEventListener) {
        query.addEventListener("change", onChange);
      } else if (query.addListener) {
        query.addListener(onChange);
      }
    }

    applyTheme(currentTheme(), false);
  }

  /* -------------------------------------------------------------- lang --- */

  function applyLang(value, persist) {
    var next = value === "zh" ? "zh" : "en";
    root.setAttribute("data-lang", next);
    root.setAttribute("lang", next === "zh" ? "zh-CN" : "en");

    if (persist) {
      store(LANG_KEY, next);
    }

    // <title>
    var title = document.querySelector("title[data-en][data-zh]");
    if (title) {
      title.textContent = title.getAttribute("data-" + next);
    }

    // <meta name="description"> and any other meta carrying both variants.
    document.querySelectorAll("meta[data-en][data-zh]").forEach(function (meta) {
      meta.setAttribute("content", meta.getAttribute("data-" + next));
    });

    // <img alt> for images whose caption should follow the language.
    document.querySelectorAll("img[data-alt-en][data-alt-zh]").forEach(function (img) {
      img.setAttribute("alt", img.getAttribute("data-alt-" + next));
    });

    var strings = UI[next];
    document.querySelectorAll("[data-nav-toggle]").forEach(function (btn) {
      btn.setAttribute("aria-label", strings.navToggle);
    });
    document.querySelectorAll("[data-to-top]").forEach(function (btn) {
      btn.setAttribute("aria-label", strings.toTop);
    });
    document.querySelectorAll("[data-lang-toggle]").forEach(function (btn) {
      btn.setAttribute("title", strings.langToggle);
      btn.setAttribute("aria-label", strings.langToggle);
    });

    // The theme button label is language dependent too.
    syncThemeLabels();
  }

  function initLang() {
    document.querySelectorAll("[data-lang-toggle]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        applyLang(currentLang() === "zh" ? "en" : "zh", true);
      });
    });

    applyLang(currentLang(), false);
  }

  /* --------------------------------------------------------- mobile nav --- */

  function initNav() {
    var toggle = document.querySelector("[data-nav-toggle]");
    var links = document.querySelector("[data-navlinks]");
    if (!toggle || !links) {
      return;
    }

    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
    });

    links.addEventListener("click", function (event) {
      if (event.target.closest && event.target.closest("a") && links.classList.contains("is-open")) {
        links.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ------------------------------------------------------ active navlink --- */

  function initActiveLink() {
    var here = window.location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll("[data-navlinks] a").forEach(function (link) {
      var target = (link.getAttribute("href") || "").split("#")[0].split("/").pop();
      if (target && target === here) {
        link.classList.add("is-active");
        link.setAttribute("aria-current", "page");
      }
    });
  }

  /* --------------------------------------------------------- back to top --- */

  function initToTop() {
    var button = document.querySelector("[data-to-top]");
    if (!button) {
      return;
    }

    var update = function () {
      button.classList.toggle("is-visible", window.scrollY > 420);
    };

    window.addEventListener("scroll", update, { passive: true });
    button.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
    update();
  }

  /* ---------------------------------------------------------------- init --- */

  function init() {
    initLang();
    initTheme();
    initNav();
    initActiveLink();
    initToTop();

    document.querySelectorAll("[data-year]").forEach(function (node) {
      node.textContent = String(new Date().getFullYear());
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
