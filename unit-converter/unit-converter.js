/* ==========================================================
   Unit Converter
   - converters: one entry per category (units + conversion logic)
   - tabs: switch which converter is shown in #converter-panel
   To add a new converter: add an entry to `converters` and a
   matching tab button (data-converter="<key>") in the HTML.
   ========================================================== */

"use strict";

/* ---------- Converter definitions ---------- */
// Conversions are not implemented yet; each converter only has a label for now.
const converters = {
  length: {
    label: "Length",
    units: {},
    convert: null,
  },
  temperature: {
    label: "Temperature",
    units: {},
    convert: null,
  },
};

/* ---------- Rendering ---------- */
const panel = document.getElementById("converter-panel");

function renderConverter(key) {
  const converter = converters[key];

  panel.innerHTML = `
    <div class="card-head">
      <h2 class="card-title">${converter.label}</h2>
    </div>
    <p class="placeholder">The ${converter.label.toLowerCase()} converter is coming soon.</p>
  `;
}

/* ---------- Tabs ---------- */
const tabs = Array.from(document.querySelectorAll('[role="tab"]'));

function selectTab(tab, moveFocus) {
  tabs.forEach((t) => {
    const selected = t === tab;
    t.setAttribute("aria-selected", String(selected));
    t.tabIndex = selected ? 0 : -1;
  });

  panel.setAttribute("aria-labelledby", tab.id);
  renderConverter(tab.dataset.converter);

  if (moveFocus) tab.focus();
  tab.scrollIntoView({ block: "nearest", inline: "nearest" });
}

tabs.forEach((tab, index) => {
  tab.addEventListener("click", () => selectTab(tab, false));

  // Arrow keys, Home and End move between tabs
  tab.addEventListener("keydown", (event) => {
    const keys = {
      ArrowRight: tabs[(index + 1) % tabs.length],
      ArrowLeft: tabs[(index - 1 + tabs.length) % tabs.length],
      Home: tabs[0],
      End: tabs[tabs.length - 1],
    };
    const next = keys[event.key];
    if (!next) return;

    event.preventDefault();
    selectTab(next, true);
  });
});

// Start with the first tab
selectTab(tabs[0], false);
