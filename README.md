# Git & GitHub exercises

Practice repository for Git, GitHub, branches, pull requests and Netlify deployment. Each exercise lives in its own folder.

| # | Exercise                                  | Folder                                 | Status |
|---|-------------------------------------------|----------------------------------------|--------|
| 1 | Company website (multi-page site)         | [`company-website/`](company-website/) | Done   |
| 2 | Using branches (v2 redesign, tabs, PR #1) | [`company-website/`](company-website/) | Done   |
| 3 | Unit converter app (PR #2 and #3)         | [`unit-converter/`](unit-converter/)   | Done   |

## What each exercise practised

1. **Company website:** one commit per page (Home, Services, About, Contacts, News), a navigation audit, and a Netlify-ready setup (`netlify.toml`).
2. **Using branches:** a redesign and a single-page tab refactor on branch `v2`, merged into `main` with [pull request #1](https://github.com/waitingboy-collab/git-exercises/pull/1).
3. **Unit converter:** one commit per converter. The experimental currency converter was discarded without a commit. The Speed converter was removed on a branch ([#2](https://github.com/waitingboy-collab/git-exercises/pull/2)) and restored from the file history ([#3](https://github.com/waitingboy-collab/git-exercises/pull/3)).

## Repository structure

```text
.
├── .github/
│   └── copilot-instructions.md      # Context and rules for GitHub Copilot
├── company-website/                 # Exercises 1 and 2 (single-page site with tabs)
├── unit-converter/                  # Exercise 3
├── Git-GitHub-Copilot-Prompts.md    # Step-by-step prompts for the exercises
├── netlify.toml                     # Netlify: publish the company-website folder
└── README.md                        # This file
```

## Author

Radoslav Chakarov
