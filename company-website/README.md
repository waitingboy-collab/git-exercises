# Radoslav Aerial Videography

Business website for Radoslav Aerial Videography, a drone photography and videography studio (EU A1/A3 certified pilot) in Krumovgrad, Bulgaria.

## Tech stack

- HTML5
- CSS3 (one shared stylesheet, no frameworks)
- Vanilla JavaScript for tab switching (no libraries)
- Google Fonts: Instrument Serif, Manrope, JetBrains Mono

## Design

- Light "golden hour" theme with an aerial camera-viewfinder look: corner brackets, REC and altitude readouts, and real Krumovgrad coordinates.
- Layered Rhodope mountain ridges, a setting sun, a hovering drone and topographic contour lines, all drawn with inline SVG and CSS. No image files.
- CSS-only motion: hero fade-in, parallax ridges and a header shadow while scrolling, and sections that fade in as they appear. Motion turns off for visitors who ask for reduced motion.

## Project structure

```text
company-website/
├── index.html    # The whole site: five tab panels (Home, Services, About, News, Contacts)
├── styles.css    # All styles
├── scripts.js    # Tab switching and URL hash handling
├── netlify.toml  # Netlify settings (publish this folder)
└── README.md     # This file
```

## Sections (tabs)

| Tab      | Link                  | Content                                 |
|----------|-----------------------|-----------------------------------------|
| Home     | `index.html#home`     | Hero, highlights, studio intro, process |
| Services | `index.html#services` | Six service cards and a call to action  |
| About    | `index.html#about`    | Story, values, founder, key numbers     |
| News     | `index.html#news`     | Latest news cards                       |
| Contacts | `index.html#contacts` | Contact details, demo form and map      |

Each tab has its own URL hash, so links such as `index.html#services` open the right tab and the browser's back and forward buttons work. Without JavaScript all sections are shown one after another.

## Run locally

No build step is needed.

- Open `index.html` in a web browser, **or**
- In VS Code, open `index.html` and use **Code Runner → Run Code**.

## Live demo

<https://tiny-pithivier-696c88.netlify.app> (Netlify, deployed automatically from `main`)

## Author

Radoslav Chakarov
