/* ==========================================================
   Unit Converter
   - converters: one entry per category (units + conversion logic)
   - tabs: switch which converter is shown in #converter-panel
   To add a new converter: add an entry to `converters` and a
   matching tab button (data-converter="<key>") in the HTML.
   ========================================================== */

"use strict";

const SIGNIFICANT_DIGITS = 6;

/* ---------- Generic helpers ---------- */

/**
 * Converts with a factor table: every unit has a `factor`
 * that says how many base units (e.g. meters) one unit is.
 */
function convertByFactor(value, from, to, units) {
  return (value * units[from].factor) / units[to].factor;
}

/** Rounds to 6 significant digits and removes trailing zeros. */
function formatNumber(number) {
  if (number === 0) return "0";

  const abs = Math.abs(number);
  if (abs >= 1e-6 && abs < 1e15) {
    const rounded = Number(number.toPrecision(SIGNIFICANT_DIGITS));
    return rounded.toLocaleString("en-US", { maximumFractionDigits: 12 });
  }

  // Very large or very small numbers: scientific notation, e.g. 1.5e-9
  return Number(number.toPrecision(SIGNIFICANT_DIGITS)).toExponential().replace("e+", "e");
}

/* ---------- Converter definitions ---------- */
const converters = {
  length: {
    label: "Length",
    baseUnit: "meter",
    allowNegative: false,
    defaults: { from: "mi", to: "km" },
    units: {
      mm: { name: "Millimeter", symbol: "mm", factor: 0.001 },
      cm: { name: "Centimeter", symbol: "cm", factor: 0.01 },
      m:  { name: "Meter",      symbol: "m",  factor: 1 },
      km: { name: "Kilometer",  symbol: "km", factor: 1000 },
      in: { name: "Inch",       symbol: "in", factor: 0.0254 },
      ft: { name: "Foot",       symbol: "ft", factor: 0.3048 },
      yd: { name: "Yard",       symbol: "yd", factor: 0.9144 },
      mi: { name: "Mile",       symbol: "mi", factor: 1609.344 },
    },
    convert(value, from, to) {
      return convertByFactor(value, from, to, this.units);
    },
  },

  temperature: {
    label: "Temperature",
    units: {},
    convert: null,           // not implemented yet
  },
};

/* ---------- Rendering ---------- */
const panel = document.getElementById("converter-panel");

const SWAP_ICON = `
  <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false">
    <path d="M7 4 3 8l4 4M3 8h14M17 20l4-4-4-4M21 16H7" fill="none" stroke="currentColor"
          stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`;

function unitOptions(units, selected) {
  return Object.entries(units)
    .map(([key, unit]) =>
      `<option value="${key}"${key === selected ? " selected" : ""}>${unit.name} (${unit.symbol})</option>`)
    .join("");
}

function renderConverter(key) {
  const converter = converters[key];

  // Converters that are not ready yet
  if (!converter.convert) {
    panel.innerHTML = `
      <div class="card-head">
        <h2 class="card-title">${converter.label}</h2>
      </div>
      <p class="placeholder">The ${converter.label.toLowerCase()} converter is coming soon.</p>`;
    return;
  }

  const symbols = Object.values(converter.units).map((u) => u.symbol).join(" · ");

  panel.innerHTML = `
    <div class="card-head">
      <h2 class="card-title">${converter.label}</h2>
      <p class="card-units">${symbols}</p>
    </div>

    <form class="converter-form" novalidate>
      <div class="field">
        <label for="cv-value">Value</label>
        <input id="cv-value" class="value-input" type="number" inputmode="decimal"
               step="any" value="1" autocomplete="off">
      </div>

      <div class="unit-row">
        <div class="field">
          <label for="cv-from">From</label>
          <select id="cv-from">${unitOptions(converter.units, converter.defaults.from)}</select>
        </div>
        <button type="button" class="swap-btn" aria-label="Swap units" title="Swap units">${SWAP_ICON}</button>
        <div class="field">
          <label for="cv-to">To</label>
          <select id="cv-to">${unitOptions(converter.units, converter.defaults.to)}</select>
        </div>
      </div>

      <div class="result">
        <p class="result-label">Result</p>
        <output id="cv-result" class="result-value" for="cv-value cv-from cv-to"></output>
        <p id="cv-detail" class="result-detail"></p>
      </div>

      <p id="cv-message" class="message" aria-live="polite"></p>
    </form>`;

  const form = panel.querySelector(".converter-form");
  const input = panel.querySelector("#cv-value");
  const fromSelect = panel.querySelector("#cv-from");
  const toSelect = panel.querySelector("#cv-to");

  const update = () => updateResult(converter, input, fromSelect, toSelect);

  form.addEventListener("submit", (event) => event.preventDefault());
  input.addEventListener("input", update);
  fromSelect.addEventListener("change", update);
  toSelect.addEventListener("change", update);

  panel.querySelector(".swap-btn").addEventListener("click", (event) => {
    [fromSelect.value, toSelect.value] = [toSelect.value, fromSelect.value];
    event.currentTarget.classList.toggle("is-flipped");
    update();
  });

  update();
}

/* ---------- Validation and result ---------- */

/** Returns { type, text } when the input cannot be converted, otherwise null. */
function validate(converter, input, value, from) {
  if (input.validity.badInput) {
    return { type: "error", text: "That doesn't look like a number. Please enter digits only." };
  }
  if (input.value.trim() === "") {
    return { type: "info", text: "Enter a number to convert." };
  }
  if (!Number.isFinite(value)) {
    return { type: "error", text: "Please enter a valid number." };
  }
  if (value < 0 && !converter.allowNegative) {
    return { type: "error", text: `${converter.label} can't be negative. Please enter 0 or more.` };
  }
  if (converter.validate) {
    return converter.validate(value, from);
  }
  return null;
}

function updateResult(converter, input, fromSelect, toSelect) {
  const value = input.valueAsNumber;
  const from = fromSelect.value;
  const to = toSelect.value;

  const resultEl = panel.querySelector("#cv-result");
  const detailEl = panel.querySelector("#cv-detail");
  const messageEl = panel.querySelector("#cv-message");

  const problem = validate(converter, input, value, from);
  input.setAttribute("aria-invalid", String(problem?.type === "error"));

  if (problem) {
    resultEl.innerHTML = `<span class="result-number is-empty">—</span>`;
    detailEl.textContent = "";
    messageEl.textContent = problem.text;
    messageEl.className = `message is-${problem.type}`;
    return;
  }

  const result = converter.convert(value, from, to);
  const fromUnit = converter.units[from];
  const toUnit = converter.units[to];

  resultEl.innerHTML = `
    <span class="result-number">${formatNumber(result)}</span>
    <span class="result-unit">${toUnit.symbol}</span>`;
  detailEl.textContent = `${formatNumber(value)} ${fromUnit.symbol} = ${formatNumber(result)} ${toUnit.symbol}`;
  messageEl.textContent = "";
  messageEl.className = "message";
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
