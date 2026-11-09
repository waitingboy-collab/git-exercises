# Radoslav Aerial Videography

Business website for Radoslav Aerial Videography, a drone photography and videography studio (EU A1/A3 certified pilot) in Krumovgrad, Bulgaria.

## Tech stack

- HTML5
- CSS3 (one shared stylesheet, no frameworks, no JavaScript)
- Google Fonts: Instrument Serif, Manrope, JetBrains Mono

## Design

- Light, editorial look with an aerial "camera viewfinder" theme: corner brackets, REC and altitude readouts, and real Krumovgrad coordinates.
- Layered Rhodope mountain ridges, a hovering drone and topographic contour lines, all drawn with inline SVG and CSS. No image files.
- CSS-only motion: hero fade-in, parallax ridges and a header shadow while scrolling, and sections that fade in as they appear. Motion turns off for visitors who ask for reduced motion.

## Project structure

```text
company-website/
├── index.html       # Home page: hero and intro
├── services.html    # Services page: service cards and call to action
├── about.html       # About page: story, values, founder, key numbers
├── contacts.html    # Contacts page: contact details, form and map
├── styles.css       # Shared stylesheet for all pages
└── README.md        # This file
```

## Pages

| Page     | File            | Status  |
|----------|-----------------|---------|
| Home     | `index.html`    | Done    |
| Services | `services.html` | Done    |
| About    | `about.html`    | Done    |
| Contacts | `contacts.html` | Done    |

## Run locally

No build step is needed.

- Open `index.html` in a web browser, **or**
- In VS Code, open `index.html` and use **Code Runner → Run Code**.

## Live demo

Coming soon (Netlify)

## Author

Radoslav Chakarov
