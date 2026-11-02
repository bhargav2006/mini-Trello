/**
 * Verdant & Obsidian Global Design System — theme.js
 * Universal, Framework-Agnostic Theme Manager (Vanilla JS, React, Next.js, Vue)
 */

(function (global, factory) {
  if (typeof exports === "object" && typeof module !== "undefined") {
    module.exports = factory();
  } else if (typeof define === "function" && define.amd) {
    define(factory);
  } else {
    global = typeof globalThis !== "undefined" ? globalThis : global || self;
    global.GDSTheme = factory();
  }
})(this, function () {
  "use strict";

  var STORAGE_KEY = "gds-theme";
  var THEME_COLORS = {
    light: "#F6F8F5",
    dark: "#0E1111"
  };

  var listeners = [];

  function getStoredTheme() {
    try {
      var val = localStorage.getItem(STORAGE_KEY);
      return val === "light" || val === "dark" ? val : null;
    } catch (e) {
      return null;
    }
  }

  function getSystemPreference() {
    if (typeof window !== "undefined" && window.matchMedia) {
      return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
    return "light";
  }

  function updateMetaThemeColor(theme) {
    if (typeof document === "undefined") return;
    var meta = document.querySelector('meta[name="theme-color"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "theme-color");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", THEME_COLORS[theme] || THEME_COLORS.dark);
  }

  function applyTheme(theme) {
    if (typeof document === "undefined") return theme;
    var validTheme = theme === "dark" ? "dark" : "light";

    document.documentElement.dataset.theme = validTheme;
    document.documentElement.setAttribute("data-theme", validTheme);
    document.documentElement.style.colorScheme = validTheme;

    updateMetaThemeColor(validTheme);

    // Notify registered listeners & dispatch CustomEvent
    listeners.forEach(function (fn) {
      try { fn(validTheme); } catch (err) {}
    });

    if (typeof window !== "undefined" && typeof window.CustomEvent === "function") {
      window.dispatchEvent(new CustomEvent("gds-theme-change", { detail: { theme: validTheme } }));
    }

    return validTheme;
  }

  var GDSTheme = {
    /**
     * Initializes theme on load. Checks localStorage, falls back to system preference.
     * Prevents Flash of Unstyled Theme (FOUC).
     */
    init: function () {
      var initial = getStoredTheme() || getSystemPreference();
      applyTheme(initial);

      // Listen for OS system theme changes if user hasn't explicitly saved
      if (typeof window !== "undefined" && window.matchMedia) {
        window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", function (e) {
          if (!getStoredTheme()) {
            applyTheme(e.matches ? "dark" : "light");
          }
        });
      }

      return initial;
    },

    /**
     * Sets the active theme explicitly and persists choice to localStorage.
     */
    setTheme: function (theme) {
      var nextTheme = applyTheme(theme);
      try {
        localStorage.setItem(STORAGE_KEY, nextTheme);
      } catch (e) {}
      return nextTheme;
    },

    /**
     * Toggles between 'light' and 'dark'.
     */
    toggleTheme: function () {
      var current = GDSTheme.getTheme();
      var next = current === "dark" ? "light" : "dark";
      return GDSTheme.setTheme(next);
    },

    /**
     * Returns the active theme ('light' or 'dark').
     */
    getTheme: function () {
      if (typeof document === "undefined") return "light";
      return document.documentElement.dataset.theme === "dark" ||
        document.documentElement.getAttribute("data-theme") === "dark"
        ? "dark"
        : "light";
    },

    /**
     * Subscribes to theme changes. Returns an unsubscribe function.
     */
    subscribe: function (callback) {
      if (typeof callback === "function") {
        listeners.push(callback);
      }
      return function () {
        listeners = listeners.filter(function (fn) { return fn !== callback; });
      };
    }
  };

  return GDSTheme;
});

