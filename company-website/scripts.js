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

  /** Returns a valid panel id from a hash such as "#services". */
  function idFromHash(hash) {
    const id = (hash || "").replace("#", "");
    return panelIds.includes(id) ? id : DEFAULT_TAB;
  }

  /** Shows one panel, hides the others and updates the tab states. */
  function showTab(id) {
    tabs.forEach((tab) => {
      const selected = tab.getAttribute("aria-controls") === id;
      tab.setAttribute("aria-selected", String(selected));
      tab.classList.toggle("active", selected);
    });

    panels.forEach((panel) => {
      panel.hidden = panel.id !== id;
    });

    const activeTab = tabs.find((tab) => tab.getAttribute("aria-controls") === id);
    document.title = id === DEFAULT_TAB
      ? `Home | ${SITE_NAME}`
      : `${activeTab.textContent.trim()} | ${SITE_NAME}`;
  }

  /** Opens a tab, scrolls to the top and records it in the URL hash. */
  function openTab(id) {
    if (location.hash !== `#${id}`) {
      history.pushState(null, "", `#${id}`);
    }
    showTab(id);
    window.scrollTo(0, 0);
  }

  // Clicks on the tabs in the header
  tabs.forEach((tab) => {
    tab.addEventListener("click", (event) => {
      event.preventDefault();
      openTab(tab.getAttribute("aria-controls"));
    });
  });

  // Any other link to a section (logo, buttons, "Get a quote", ...)
  document.addEventListener("click", (event) => {
    const link = event.target.closest('a[href^="#"]');
    if (!link || link.getAttribute("role") === "tab") return;

    const id = link.getAttribute("href").slice(1);
    if (panelIds.includes(id)) {
      event.preventDefault();
      openTab(id);
    }
  });

  // Hash changes from the address bar or browser back / forward
  window.addEventListener("hashchange", () => showTab(idFromHash(location.hash)));

  // First load: open the tab from the URL, e.g. index.html#services
  showTab(idFromHash(location.hash));
})();
