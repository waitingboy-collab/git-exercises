/* ==========================================================
   Radoslav Aerial Videography — tab switching
   Each section of the single-page site is a tab panel.
   The URL hash (#home, #services, ...) decides which one is shown.
   Without JavaScript all sections stay visible, one after another.
   ========================================================== */

(function () {
  "use strict";

  const SITE_NAME = "Radoslav Aerial Videography";
  const DEFAULT_TAB = "home";

  const tabs = Array.from(document.querySelectorAll('[role="tab"]'));
  const panels = Array.from(document.querySelectorAll('[role="tabpanel"]'));
  const panelIds = panels.map((panel) => panel.id);

  document.documentElement.classList.replace("no-js", "js");

  // We scroll to the top ourselves when a tab changes.
  if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
  }

  /** Returns a valid panel id from a hash such as "#services". */
  function idFromHash(hash) {
    const id = (hash || "").replace("#", "");
    return panelIds.includes(id) ? id : DEFAULT_TAB;
  }

  /** Shows one panel, hides the others and updates the tab states. */
  function showTab(id) {
    let activeTab = null;

    tabs.forEach((tab) => {
      const selected = tab.getAttribute("aria-controls") === id;
      tab.setAttribute("aria-selected", String(selected));
      tab.tabIndex = selected ? 0 : -1;          // only the active tab is in the Tab order
      tab.classList.toggle("active", selected);
      if (selected) activeTab = tab;
    });

    panels.forEach((panel) => {
      panel.hidden = panel.id !== id;
    });

    document.title = `${activeTab.textContent.trim()} | ${SITE_NAME}`;

    // On narrow screens the tab bar scrolls sideways: keep the active tab visible.
    activeTab.scrollIntoView({ block: "nearest", inline: "nearest" });
    window.scrollTo(0, 0);
  }

  /**
   * Opens a tab and records it in the URL hash, so back / forward work.
   * focusTarget: "tab" keeps focus on the tab, "panel" moves it to the content.
   */
  function openTab(id, focusTarget) {
    if (location.hash !== `#${id}`) {
      history.pushState(null, "", `#${id}`);
    }
    showTab(id);

    if (focusTarget === "panel") {
      document.getElementById(id).focus({ preventScroll: true });
    } else {
      tabs.find((tab) => tab.getAttribute("aria-controls") === id).focus({ preventScroll: true });
    }
  }

  // Clicks on the tabs in the header
  tabs.forEach((tab) => {
    tab.addEventListener("click", (event) => {
      event.preventDefault();
      openTab(tab.getAttribute("aria-controls"), "tab");
    });
  });

  // Keyboard: arrow keys, Home and End move between tabs
  tabs.forEach((tab, index) => {
    tab.addEventListener("keydown", (event) => {
      let next = null;
      if (event.key === "ArrowRight") next = tabs[(index + 1) % tabs.length];
      if (event.key === "ArrowLeft") next = tabs[(index - 1 + tabs.length) % tabs.length];
      if (event.key === "Home") next = tabs[0];
      if (event.key === "End") next = tabs[tabs.length - 1];
      if (!next) return;

      event.preventDefault();
      openTab(next.getAttribute("aria-controls"), "tab");
    });
  });

  // Any other link inside the page (logo, buttons, "Get a quote", "Read more", ...)
  document.addEventListener("click", (event) => {
    const link = event.target.closest('a[href^="#"]');
    if (!link || link.getAttribute("role") === "tab") return;

    const id = link.getAttribute("href").slice(1);

    // Placeholder links (href="#") must not jump back to the Home tab.
    if (id === "") {
      event.preventDefault();
      return;
    }

    if (panelIds.includes(id)) {
      event.preventDefault();
      openTab(id, "panel");
    }
  });

  // Hash changes from the address bar or browser back / forward
  window.addEventListener("hashchange", () => showTab(idFromHash(location.hash)));
  window.addEventListener("popstate", () => showTab(idFromHash(location.hash)));

  // First load: open the tab from the URL, e.g. index.html#services
  showTab(idFromHash(location.hash));
  window.addEventListener("load", () => window.scrollTo(0, 0));
})();
