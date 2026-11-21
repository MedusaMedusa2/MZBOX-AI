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
    welcome:
      '<circle cx="36" cy="34" r="7" fill="#241c14"/>' +
      '<path d="M36 18v5M36 45v5M20 34h5M47 34h5M24 22l3.4 3.4M44.6 42.6 48 46M48 22l-3.4 3.4M27.4 42.6 24 46" fill="none" stroke="#241c14" stroke-width="2.2" stroke-linecap="round"/>',
    quote:
      '<path fill="#241c14" d="M22 42c0-9 4.2-15 11-17.2V30c-3.2 1.2-5 4-5 7.2H33V48H22zm18 0c0-9 4.2-15 11-17.2V30c-3.2 1.2-5 4-5 7.2H51V48H40z"/>',
    dates:
      '<rect x="22" y="24" width="28" height="24" rx="4" fill="none" stroke="#241c14" stroke-width="2.2"/>' +
      '<path d="M22 32h28M29 20v7M43 20v7" fill="none" stroke="#241c14" stroke-width="2.2" stroke-linecap="round"/>' +
      '<circle cx="31" cy="40" r="1.7" fill="#241c14"/><circle cx="41" cy="40" r="1.7" fill="#241c14"/>',
    money:
      '<ellipse cx="36" cy="40" rx="13" ry="6" fill="none" stroke="#241c14" stroke-width="2.2"/>' +
      '<path d="M23 40v7c0 3.3 5.8 6 13 6s13-2.7 13-6v-7" fill="none" stroke="#241c14" stroke-width="2.2"/>' +
      '<ellipse cx="36" cy="32" rx="13" ry="6" fill="#fff6" stroke="#241c14" stroke-width="2.2"/>',
    tension:
      '<path d="M16 36h8l4-11 7 22 5-11h16" fill="none" stroke="#241c14" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>',
    NOTES:
      '<path d="M26 20h14l10 10v22a3 3 0 0 1-3 3H26a3 3 0 0 1-3-3V23a3 3 0 0 1 3-3z" fill="none" stroke="#241c14" stroke-width="2.2" stroke-linejoin="round"/>' +
      '<path d="M40 20v10h10M28 38h16M28 44h10" fill="none" stroke="#241c14" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>',
    ASSETS:
      '<path d="M18 34 36 20l18 14v18H18z" fill="none" stroke="#241c14" stroke-width="2.2" stroke-linejoin="round"/>' +
      '<path d="M31 52V40h10v12" fill="none" stroke="#241c14" stroke-width="2.2" stroke-linejoin="round"/>',
    EVENTS:
      '<path d="M36 52s12-11 12-20a12 12 0 1 0-24 0c0 9 12 20 12 20z" fill="none" stroke="#241c14" stroke-width="2.2" stroke-linejoin="round"/>' +
      '<circle cx="36" cy="32" r="3.4" fill="#241c14"/>',
    REFLECTION:
      '<circle cx="30" cy="32" r="9" fill="none" stroke="#241c14" stroke-width="2.2"/>' +
      '<circle cx="44" cy="42" r="5.5" fill="none" stroke="#241c14" stroke-width="2.2"/>' +
      '<circle cx="51" cy="50" r="2.2" fill="#241c14"/>',
    FINANCES:
      '<path d="M22 48V34M32 48V26M42 48V32M52 48V22" fill="none" stroke="#241c14" stroke-width="3.2" stroke-linecap="round"/>' +
      '<path d="M18 50h38" fill="none" stroke="#241c14" stroke-width="2.2" stroke-linecap="round"/>',
    COCOS:
      '<circle cx="36" cy="38" r="14" fill="none" stroke="#241c14" stroke-width="2.2"/>' +
      '<circle cx="31" cy="36" r="1.6" fill="#241c14"/><circle cx="40" cy="36" r="1.6" fill="#241c14"/><circle cx="35.5" cy="43" r="1.6" fill="#241c14"/>' +
      '<path d="M36 16c2 4 2.2 7 0 10" fill="none" stroke="#241c14" stroke-width="2.2" stroke-linecap="round"/>',
    DEBTWISE:
      '<path d="M36 22v28M22 50h28M20 26h32" fill="none" stroke="#241c14" stroke-width="2.2" stroke-linecap="round"/>' +
      '<path d="M20 26 14 38h12zM52 26l-6 12h12z" fill="none" stroke="#241c14" stroke-width="2" stroke-linejoin="round"/>',
    MZBOX:
      '<path d="M36 20 52 28v16L36 52 20 44V28z" fill="none" stroke="#241c14" stroke-width="2.2" stroke-linejoin="round"/>' +
      '<path d="M20 28l16 8 16-8M36 36v16" fill="none" stroke="#241c14" stroke-width="2.2" stroke-linejoin="round"/>'
  };

  var HINTS = {
    NOTES: "Заметки и дедлайны",
    ASSETS: "Имущество и цели",
    EVENTS: "Праздники и даты",
    REFLECTION: "Короткие мысли",
    FINANCES: "Доходы, расходы, вклады и кредиты",
    COCOS: "Планы на день и месяц",
    DEBTWISE: "Срок, платёж и запас по бюджету",
    WIP: "Раздел ещё собирается"
  };

  function stickerHTML(key) {
    var fill = FILLS[key] || "#E7E1D6";
    var icon = ICONS[key] || ICONS.MZBOX;
    return (
      '<svg class="sticker" viewBox="0 0 72 72" aria-hidden="true" focusable="false">' +
        '<rect x="4" y="6" width="60" height="60" rx="18" fill="' + fill + '"/>' +
        '<path d="M48 6h16v14L50 8a8 8 0 0 1-2-2z" fill="#fff" opacity=".62"/>' +
        icon +
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
    if (key === "DEBTWISE") {
      var brand = document.querySelector("#debtwiseView .dw-brand");
      if (brand && !brand.querySelector(".sticker")) {
        brand.insertAdjacentHTML("afterbegin", stickerHTML("DEBTWISE"));
      }
    }
    if (key === "FINANCES") {
      var head = document.querySelector("#financesView .book-head");
      if (head && !head.querySelector(".book-sticker")) {
        head.insertAdjacentHTML("afterbegin", '<span class="book-sticker">' + stickerHTML("FINANCES") + "</span>");
      }
    }
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
      var result = orig(event);
      setCurrent("");
      syncScreens();
      return result;
    };
  });

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
