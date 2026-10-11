# Kanchan — Shopify Developer Portfolio

This repository contains a static portfolio website built with HTML, CSS and vanilla JavaScript. The four storefront/product-page examples are independent concept demos, not paid client projects.

## Run locally
Open `index.html` in a browser, use VS Code + Live Server, or run a local static server from the repository root:

```powershell
npx.cmd --yes http-server . -p 8080
```

The Work page links to the shared case-study template at `case-study.html`. Each project uses a `project` query value, for example `case-study.html?project=storefront`.

## Deploy to GitHub Pages
This repository is published at <https://kateriyakanchan.github.io/Portfolio/>.

To enable or verify publishing, open the repository's **Settings → Pages**, choose **Deploy from a branch**, and select the `main` branch and `/(root)` folder. No build command is required. After committing and pushing changes to `main`, GitHub Pages publishes the update automatically.

Keep the project email in sync with `kateriyakanchan@gmail.com`. Replace concept preview artwork in `assets/projects/` with approved project screenshots when available, and update project titles, descriptions, About copy and services with accurate information.

The contact form submits directly through Formspree and displays its submission status on the page.
