"use strict";

(function () {
  var FILLS = {
    welcome: "#F6C453",
    quote: "#E4D4F7",
    dates: "#F3B183",
    money: "#A9DDB8",
    tension: "#F3A7A1",
    NOTES: "#F6D58A",
    ASSETS: "#A9CBF6",
    EVENTS: "#F6C1D0",
    REFLECTION: "#CDBFF5",
    FINANCES: "#8ED4C6",
    COCOS: "#E6D2A4",
    DEBTWISE: "#F0C39A",
    MZBOX: "#D9D3C5"
  };

  var ICONS = {
    welcome: '<circle cx="0" cy="-1" r="5" fill="#241c14"/><path d="M0-12v3M0 8v3M-11-1h3M8-1h3M-8-8l2 2M6 6l2 2M8-8l-2 2M-6 6l-2 2"/>',
    quote: '<path fill="#241c14" stroke="none" d="M-12 6c0-6 2.6-10 7-11.2V-1c-2 .8-3.2 2.4-3.2 4.4H-4V8h-8zm10 0c0-6 2.6-10 7-11.2V-1c-2 .8-3.2 2.4-3.2 4.4H6V8h-8z"/>',
    dates: '<rect x="-9" y="-7" width="18" height="15" rx="2"/><path d="M-9-2h18M-5-11v4M5-11v4"/><circle cx="-4" cy="3" r="1.1" fill="#241c14" stroke="none"/><circle cx="4" cy="3" r="1.1" fill="#241c14" stroke="none"/>',
    money: '<ellipse cx="0" cy="2" rx="9" ry="3.4"/><path d="M-9 2v4.2c0 1.9 4 3.4 9 3.4s9-1.5 9-3.4V2"/><ellipse cx="0" cy="-2.2" rx="9" ry="3.4"/>',
    tension: '<path d="M-12 1h5l3-8 5 14 3-6h8"/>',
    NOTES: '<path d="M-8-11h8l6 6v14a2 2 0 0 1-2 2h-12a2 2 0 0 1-2-2v-18a2 2 0 0 1 2-2z"/><path d="M0-11v6h6M-6 1h10M-6 5h6"/>',
    ASSETS: '<path d="M-11 1 0-9l11 10v9h-22z"/><path d="M-3 11V5h6v6"/>',
    EVENTS: '<path d="M0 12s8-7 8-13a8 8 0 1 0-16 0c0 6 8 13 8 13z"/><circle cx="0" cy="-1" r="2.4" fill="#241c14" stroke="none"/>',
    REFLECTION: '<circle cx="-4" cy="-2" r="6"/><circle cx="6" cy="4" r="3.6"/><circle cx="10" cy="9" r="1.4" fill="#241c14" stroke="none"/>',
    FINANCES: '<path d="M-10 10V2M-3 10V-4M4 10V-1M11 10V-8"/><path d="M-12 10h24"/>',
    COCOS: '<circle cx="0" cy="2" r="9"/><circle cx="-3" cy="1" r="1" fill="#241c14" stroke="none"/><circle cx="3" cy="1" r="1" fill="#241c14" stroke="none"/><circle cx="0" cy="5" r="1" fill="#241c14" stroke="none"/><path d="M0-12c1.4 2.2 1.4 4 0 6"/>',
    DEBTWISE: '<path d="M0-11v16M-8 8h16M-10-8h20"/><path d="M-10-8-14 1h8zM10-8l-4 9h8z"/>',
    MZBOX: '<path d="M0-11 11-5v10L0 11-11 5V-5z"/><path d="M-11-5 0 1 11-5M0 1v10"/>'
  };

  var HINTS = {
    NOTES: "Заметки и дедлайны",
    ASSETS: "Имущество и цели",
    EVENTS: "Праздники и даты",
    REFLECTION: "Короткие мысли",
    FINANCES: "Доходы, расходы, вклады и кредиты",
    COCOS: "Планы на день и месяц",
    DEBTWISE: "Срок, платёж и запас по бюджету",
    MZBOX: "Портфель и разбор позиций",
    WIP: "Раздел ещё собирается"
  };

  function stickerHTML(key) {
    var fill = FILLS[key] || "#E7E1D6";
    var icon = ICONS[key] || ICONS.MZBOX;
    return (
      '<svg class="sticker" viewBox="-32 -32 64 64" overflow="visible" aria-hidden="true" focusable="false">' +
        '<rect x="-30" y="-30" width="60" height="60" rx="16" fill="' + fill + '"/>' +
        '<g fill="none" stroke="#241c14" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">' +
          icon +
        "</g>" +
      "</svg>"
    );
  }

  window.MZBOX_POLISH_CSS = [
    ".brand{background:none!important;letter-spacing:-.03em}",
    "body.dark .brand{color:#f4f1ea!important;-webkit-text-fill-color:#f4f1ea!important}",
    "body:not(.dark) .brand{color:#171717!important;-webkit-text-fill-color:#171717!important}",
    "button:focus-visible,input:focus-visible,select:focus-visible{outline:2px solid #c6a15a;outline-offset:2px}",
    ".card,.stat,.level,.forecast-stat{border-radius:16px}",
    ".btn,.refresh-main{border-radius:12px}",
    "body{text-rendering:optimizeLegibility}"
  ].join("");

  function fillSlots(root) {
    (root || document).querySelectorAll("[data-sticker]").forEach(function (el) {
      if (el.querySelector(".sticker")) return;
      el.innerHTML = stickerHTML(el.getAttribute("data-sticker"));
    });
  }

  function setCurrent(key) {
    document.querySelectorAll(".sticker-link").forEach(function (btn) {
      var on = key && (btn.getAttribute("data-go") === key || btn.getAttribute("data-target") === key);
      btn.classList.toggle("is-current", !!on);
      if (on) btn.setAttribute("aria-current", "true");
      else btn.removeAttribute("aria-current");
    });
  }

  function syncScreens() {
    document.querySelectorAll(".screen").forEach(function (screen) {
      var on = screen.classList.contains("active");
      screen.setAttribute("aria-hidden", on ? "false" : "true");
    });
  }

  function decorateDashboard() {
    var root = document.getElementById("dashboard");
    if (!root) return;
    root.querySelectorAll(".nav-card").forEach(function (btn) {
      var key = btn.getAttribute("data-section");
      if (!key || btn.querySelector(".nav-sticker")) return;
      var slot = document.createElement("span");
      slot.className = "nav-sticker";
      slot.innerHTML = stickerHTML(key);
      btn.insertBefore(slot, btn.firstChild);
      if (!btn.getAttribute("aria-label")) {
        var name = btn.querySelector(".name");
        btn.setAttribute("aria-label", (name && name.textContent) || key);
      }
    });
  }

  function markSection(key) {
    var mark = document.getElementById("sectionMark");
    if (mark) mark.innerHTML = stickerHTML(key);
    var hint = document.getElementById("sectionHint");
    if (hint) hint.textContent = HINTS[key] || "";
    setCurrent(key);
  }

  function scrollToId(id) {
    var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.setTimeout(function () {
      var el = document.getElementById(id);
      if (!el) return;
      el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    }, 40);
  }

  fillSlots(document);

  var strip = document.getElementById("stickerStrip");
  if (strip) {
    strip.addEventListener("click", function (event) {
      var btn = event.target.closest(".sticker-link");
      if (!btn) return;
      var target = btn.getAttribute("data-target");
      var go = btn.getAttribute("data-go");
      if (target) {
        if (window.__injHome) window.__injHome(event);
        setCurrent(target);
        scrollToId(target);
        return;
      }
      if (go === "MZBOX") {
        if (window.__injMzbox) window.__injMzbox(event);
        setCurrent("MZBOX");
        return;
      }
      if (go && window.__injOpen) window.__injOpen(go);
    });
  }

  if (typeof renderDashboard === "function") {
    var renderDashboardOrig = renderDashboard;
    window.renderDashboard = function () {
      renderDashboardOrig();
      decorateDashboard();
    };
  }

  if (typeof openSection === "function") {
    var openSectionOrig = openSection;
    window.openSection = function (key) {
      openSectionOrig(key);
      markSection(key);
      syncScreens();
    };
  }

  if (typeof showScreen === "function") {
    var showScreenOrig = showScreen;
    window.showScreen = function (id) {
      showScreenOrig(id);
      syncScreens();
      if (id === "home") setCurrent("");
    };
  }

  ["__injHome", "__injBack"].forEach(function (name) {
    var orig = window[name];
    if (typeof orig !== "function") return;
    window[name] = function (event) {
      var frame = document.getElementById("mzboxFrame");
      var stage = document.getElementById("mzboxOverlay");
      var view = document.getElementById("mzboxView");
      if (stage) { stage.classList.add("hidden"); stage.style.display = "none"; stage.setAttribute("aria-hidden", "true"); }
      if (view) view.classList.add("hidden");
      document.body.classList.remove("mzbox-open");
      if (frame) { try { frame.removeAttribute("srcdoc"); frame.removeAttribute("src"); } catch (err) {} }
      var result = orig(event);
      setCurrent("");
      syncScreens();
      return result;
    };
  });

  window.__injMzbox = function (event) {
    if (event) { event.preventDefault(); event.stopPropagation(); }
    if (window.__injOpen) window.__injOpen("MZBOX");
  };

  document.addEventListener("keydown", function (event) {
    if (event.key !== "Escape") return;
    var modal = document.getElementById("settingsModal");
    if (!modal || modal.classList.contains("hidden")) return;
    if (typeof requestCloseSettings === "function") requestCloseSettings();
  });

  try {
    if (typeof renderHome === "function") renderHome();
  } catch (err) {
    console.error(err);
  }
  syncScreens();
})();
