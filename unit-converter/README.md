# Unit Converter

Exercise 3: a small unit converter web app in plain HTML, CSS and vanilla JavaScript.

## Files

```text
unit-converter/
├── unit-converter.html   # Page: header, category tabs, converter panel, footer
├── unit-converter.css    # All styles (light theme, centered card layout)
├── unit-converter.js     # Converter definitions and tab switching
└── README.md             # This file
```

## Converters

| Category    | Status      |
|-------------|-------------|
| Length      | Done        |
| Temperature | Done        |
| Weight      | Done        |
| Volume      | Done        |
| Area        | Done        |
| Pressure    | Done        |

## Run locally

Open `unit-converter.html` in a browser, or use **Code Runner → Run Code** in VS Code.

## Adding a converter

1. Add an entry to the `converters` object in `unit-converter.js`.
2. Add a tab button with a matching `data-converter` value in `unit-converter.html`.
