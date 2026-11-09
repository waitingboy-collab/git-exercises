# Git & GitHub упражнение — структурирани prompts за VS Code (Copilot Agent)

> **Как се ползва:** Copilot Chat → режим **Agent** → избери модел → копирай prompt-а от съответната стъпка.
> След всяка стъпка: **Run Code** → провери → **Stage → Commit message → Commit → Sync Changes**.
> Git действията се правят **ръчно през Source Control** (това е целта на упражнението), затова всеки prompt казва на Copilot да НЕ пипа git.
>
> Примерната фирма е **Radoslav Aerial Videography** (дрон заснемане, Крумовград). За друга фирма смени само блока `CONTEXT` в Prompt 0.

---

## 0. Подготовка

**Code Runner → settings.json** (`code-runner.executorMap`), добави:

```json
"html": "start chrome",
"css": "start chrome",
"javascript": "node",
```

**По желание — постоянни инструкции за Copilot.** Създай файл `.github/copilot-instructions.md` в проекта и постави това вътре. Copilot ги прилага автоматично към всеки prompt, така че по-нататъшните prompts могат да са кратки:

```markdown
# Project rules
- Static website: plain HTML5, ONE shared CSS file (style.css), vanilla JavaScript only if needed. No frameworks, no build tools, no CDNs except Google Fonts.
- Light color theme (white / light grey backgrounds, dark text, one accent color). No dark theme.
- Semantic HTML (header, nav, main, section, footer), responsive (mobile-first, works at 360px), accessible (alt texts, labels, contrast).
- Every page shares the same header (logo + title + nav) and footer. Nav links: Home, Services, About, Contacts (+ new pages when added).
- Do NOT run any git commands, do NOT commit, push or create branches. I do version control manually.
- Change only what the task asks for. After finishing, list the files you created/changed in 1–2 lines.
```

---

## Задача 1 — Company Website

### Prompt 1 · Структура на сайта (index.html + style.css)

```text
ROLE: You are a front-end developer building a small business website.

CONTEXT:
- Company: Radoslav Aerial Videography — drone aerial photography & videography (A1/A3 certified pilot) based in Krumovgrad, Bulgaria.
- Audience: local businesses, hotels, events, real estate.
- Project folder is open in VS Code and contains an empty index.html.

TASK: Create ONLY the site structure — not the full website.
1. index.html with:
   - <header>: logo placeholder + company name + <nav> with links: Home (index.html), Services (services.html), About (about.html), Contacts (contacts.html). The pages do not exist yet — just link to them.
   - <main>: a hero section (headline + short tagline + call-to-action button "Contact us") and one short intro section.
   - <footer>: © 2026 Radoslav Aerial Videography, email and phone placeholders, nav links repeated.
2. style.css linked from index.html — this is the ONLY stylesheet for the whole site.

REQUIREMENTS:
- Light theme: white/light background, dark text, sky-blue accent.
- Sticky header, responsive nav (stacks on mobile), clean modern font (system font stack).
- Use CSS variables for colors and spacing so other pages can reuse them.

CONSTRAINTS:
- No frameworks, no JavaScript yet, no git commands.
- Do not create the other pages yet.

OUTPUT: Create/edit the files directly, then list them in one line.
```

✅ Commit: `Add base site structure (header, main, footer) and style.css` → **Publish to GitHub**

### Prompt 2 · README.md

```text
TASK: Create README.md for this repository.

Include:
- Project title and one-sentence description (business website for Radoslav Aerial Videography).
- Tech stack: HTML5, CSS3 (single stylesheet), hosted on Netlify with continuous deployment from GitHub (main branch).
- Project structure: list the files with one line each.
- How to run locally: open index.html in a browser (or Code Runner → Run Code).
- Pages: Home, Services, About, Contacts — mark which are done.
- Live site: placeholder link https://<subdomain>.netlify.app

CONSTRAINTS: Markdown only, concise, no badges, no git commands.
```

✅ Commit: `Add README`

### Prompt 3 · Services страница

```text
TASK: Implement the "Services" page (services.html).

REQUIREMENTS:
- Reuse EXACTLY the same header, nav and footer as index.html.
- Use only the existing style.css (add new classes there if needed — do not add <style> blocks or a new CSS file).
- Content: page title + a responsive grid of 6 service cards:
  Real estate aerial photos, Event videography, Hotel & tourism promo videos, Construction progress monitoring, Roof & infrastructure inspection, Video editing & post-production.
  Each card: icon or emoji, title, 1–2 sentence description, "Ask for a quote" link to contacts.html.
- Mark "Services" as the active nav item.

CONSTRAINTS: Do not change index.html content except if a nav link is broken. No git commands.
```

✅ Commit: `Add Services page`

### Prompt 4 · About страница

```text
TASK: Implement the "About" page (about.html).

REQUIREMENTS:
- Same header, nav, footer and style.css as the other pages (no inline <style>, no new CSS file).
- Sections:
  1. Intro: who we are — local drone videography studio in Krumovgrad, Eastern Rhodopes.
  2. Credentials: EU A1/A3 drone pilot certificate, safety & legal compliance.
  3. Why choose us: 3–4 short benefit points.
  4. Short call-to-action linking to contacts.html.
- Mark "About" as the active nav item.

CONSTRAINTS: No git commands. Only touch about.html and style.css.
```

✅ Commit: `Add About page`

### Prompt 5 · Contacts страница

```text
TASK: Implement the "Contacts" page (contacts.html).

REQUIREMENTS:
- Same header, nav, footer and style.css as the other pages.
- Two-column layout (stacks on mobile):
  - Left: contact info — phone, email, location "Krumovgrad, Bulgaria", working hours.
  - Right: contact form with Name, Email, Phone (optional), Service (select with the 6 services), Message, Submit button.
    Use HTML5 validation (required, type="email"). The form is front-end only — no backend.
- Mark "Contacts" as the active nav item.

CONSTRAINTS: No git commands.
```

✅ Commit: `Add Contacts page`

### Prompt 6 · Проверка на навигацията

```text
TASK: Audit navigation across ALL HTML pages in the project.

Check and fix:
- Every nav link and footer link points to an existing file (index.html, services.html, about.html, contacts.html).
- The header and footer markup is identical on every page.
- The current page is marked as active on each page.
- All pages link the same style.css and have a proper <title> and meta viewport.

Report what was broken and what you fixed (short list). No git commands.
```

✅ Commit: `Fix navigation links across pages`

---

## Задача 2 — Publish to Netlify

*(Регистрация, Import from Git, subdomain, branch `main` — всичко се прави в Netlify, без prompt.)*

### Prompt 7 · News страница (тест на Continuous Deployment)

```text
TASK: Add a new "News" page (news.html) and add "News" to the nav on ALL pages.

REQUIREMENTS:
- Same header, footer and style.css.
- 3 news cards (date, title, short text, "Read more" placeholder link), e.g. new drone equipment, recent project, seasonal offer.
- Mark "News" as active on news.html.

CONSTRAINTS: No git commands.
```

✅ Commit + Sync → отвори Netlify линка и провери, че News е live.

### Prompt 8 · Кликаемо лого и заглавие

```text
TASK: Make the site logo and company name in the header clickable on ALL pages — both link to index.html.

REQUIREMENTS:
- Keep the current look (no underline, same colors); add a subtle hover effect in style.css.
- Add an accessible label (aria-label="Home").

CONSTRAINTS: Change only the header markup and style.css. No git commands.
```

✅ Commit + Sync → провери auto-deploy в Netlify.

---

## Задача 3 — Using Branches

*(Source Control → Graph → main → **Create new branch** `v2` → **Publish Branch**.)*

### Prompt 9 · Видима промяна в v2

```text
TASK: Make a clearly visible redesign of the website (we are on a separate branch "v2").

- Change the hero section to a full-width banner with a gradient overlay and larger headline.
- Change the accent color to a teal tone (keep the light theme).
- Add a "Featured project" section on the home page.

CONSTRAINTS: Keep all pages working. No git commands.
```

✅ Commit в **v2** → Sync (няма да се deploy-не — Netlify гледа `main`).

### Prompt 10 · Сливане на страниците в една с табове

```text
TASK: Refactor the multi-page website into a SINGLE-PAGE website with tabs.

TARGET STRUCTURE (only these files):
- index.html — contains all sections: Home, Services, About, News, Contacts, each as a tab panel.
- styles.css — merge style.css into it (rename), remove unused rules.
- scripts.js — tab switching logic.

REQUIREMENTS:
- The nav becomes a tab bar; clicking a tab shows its panel and hides the others, without page reload.
- Support direct links via URL hash (e.g. index.html#services opens the Services tab) and browser back/forward.
- Accessible tabs: role="tablist" / "tab" / "tabpanel", aria-selected, keyboard arrows to switch tabs.
- Logo/title click opens the Home tab.
- Delete services.html, about.html, contacts.html, news.html and style.css after merging their content.
- Keep the light theme and responsive layout.

CONSTRAINTS: Vanilla JS, no frameworks. No git commands.
OUTPUT: List deleted, created and changed files.
```

### Prompt 11 · Полиране и бъгове

```text
TASK: Review index.html, styles.css and scripts.js for bugs and polish.

Check: broken links/anchors, console errors, tab state on page load, mobile layout at 360px, contrast, duplicate CSS, unused code.
Fix the issues and give me a short list of what you changed. No git commands.
```

✅ Commit в **v2** → Sync → **Pull Request** (base: `main`, compare: `v2`) → Merge → изтрий `v2` → върни се на `main` → Sync.

### Prompt 12 · Описание за Pull Request (по желание)

```text
Compare the current branch "v2" with "main" and write a Pull Request title and description in Markdown:
- Title (max 70 chars)
- Summary (2–3 sentences)
- Changes (bullet list: added / changed / removed files and features)
- How to test (3–5 steps)
Do not run any git commands that change anything — read-only.
```

---

## Задача 4 — Unit Converter App (нов проект / ново repo)

### Prompt 13 · Структура

```text
ROLE: You are a front-end developer building a small Unit Converter web app.

TASK: Create ONLY the app structure — no converter logic yet.

FILES:
- unit-converter.html — header (app title + nav), main area, footer (© 2026).
- unit-converter.css — the only stylesheet.
- unit-converter.js — empty module with a comment-only outline; linked with defer.

LAYOUT:
- Nav lists the converter categories (Length, Temperature, ...). Each category will be a section in <main> shown one at a time (like tabs).
- A reusable converter "card" pattern: number input, "from" unit select, "to" unit select, swap button, result output.

REQUIREMENTS: Light theme, responsive, accessible labels. Vanilla JS only. No git commands.
```

✅ Commit → **Publish to GitHub** (ново repo)

### Prompt 14 · Length (metric) converter

```text
TASK: Implement the Length converter in unit-converter.js using the existing card pattern.

Units: mm, cm, m, km, inch, foot, yard, mile.

REQUIREMENTS:
- Convert via a base unit (meters) using a factor table — no if/else chains per pair.
- Live result on input/select change; swap button swaps from/to.
- Round to max 6 significant decimals, strip trailing zeros.
- Validate: empty or non-numeric input shows a friendly message, not NaN.
- Write the logic so the next converters can reuse it (generic convert(value, from, to, table)).

CONSTRAINTS: Do not touch other categories. No git commands.
```

✅ Commit: `Add length converter`

### Prompt 15 · Temperature converter

```text
TASK: Implement the Temperature converter: Celsius, Fahrenheit, Kelvin.

REQUIREMENTS:
- Temperature is not a simple factor — use a to-Celsius / from-Celsius formula map.
- Same card UI, live result, swap button, validation.
- Kelvin cannot be below 0 (and equivalents) — show a warning for values below absolute zero.

CONSTRAINTS: Do not change the length converter. No git commands.
```

✅ Commit: `Add temperature converter`

### Prompt 16 · Currency converter (очаквано може да не стане → Discard)

```text
TASK: Implement a Currency converter: USD, EUR, GBP, BGN.

REQUIREMENTS:
- Fetch live rates from a free, no-API-key endpoint (e.g. https://api.frankfurter.app/latest?from=EUR).
- Show "Rates updated: <date>" and a loading state.
- On network/API failure, show a clear error message — do not crash the app.

CONSTRAINTS: No API keys in the code. No git commands.
```

❌ Ако не ти харесва → Source Control → **Discard Changes** (работи само за некомитнати промени).

### Prompt 17 · Още конвертори (един по един, commit след всеки)

```text
TASK: Add the {{CATEGORY}} converter using the same generic logic and card UI.

Units: {{UNITS}}

REQUIREMENTS: factor table via base unit, live result, swap, validation, same rounding rules.
Add it to the nav. Do not change existing converters. No git commands.
```

Замести `{{CATEGORY}}` / `{{UNITS}}`:

| Category | Units |
|---|---|
| Weight | mg, g, kg, metric ton, ounce, pound, stone |
| Volume | ml, l, m³, teaspoon, tablespoon, cup, US gallon, UK gallon |
| Speed | m/s, km/h, mph, knot, ft/s |
| Area | mm², cm², m², hectare, km², ft², acre |
| Pressure | Pa, kPa, bar, atm, psi, mmHg |

✅ Commit + Push след **всеки** конвертор (напр. `Add weight converter`).

### Prompt 18 · Премахване на Speed converter (в нов branch)

*(Първо: нов branch `remove-speed-converter` от последния commit.)*

```text
TASK: Remove the Speed converter completely — UI and underlying logic.

- Remove its nav item, section/card in unit-converter.html, its unit table and any handlers in unit-converter.js, and any CSS used ONLY by it.
- Keep all other converters working and the default selected tab valid.

OUTPUT: List exactly what was removed from each file. No git commands.
```

✅ Commit → PR → Merge в `main` → изтрий branch-а → върни се на `main` → Sync.

### Prompt 19 · Възстановяване на Speed converter (по желание)

*(Нов branch `restore-speed-converter`. Препоръчителен начин по упражнението: файл → **Timeline** → стара версия → копираш зелените части ръчно.)*
Ако искаш Copilot да ти помогне, след като поставиш стария код:

```text
TASK: I restored the Speed converter code from an older version of the files. Verify it integrates correctly with the current code:
- nav item present, section renders, conversions work (m/s, km/h, mph, knot, ft/s), no duplicate functions or console errors.
Fix only integration issues — do not rewrite the restored logic. No git commands.
```

✅ Commit → PR → Merge → изтрий branch → `main` → Sync.

---

## Шаблон за собствени prompts

```text
ROLE: <кой е AI-ят>
CONTEXT: <проект, файлове, какво вече има>
TASK: <една конкретна стъпка>
REQUIREMENTS: <какво точно трябва да има>
CONSTRAINTS: <какво да НЕ прави — файлове, frameworks, git>
OUTPUT: <как да отговори — списък с файлове, кратко резюме>
```
