# Kanchan — Shopify Developer Portfolio

This repository contains a static portfolio website built with HTML, CSS and vanilla JavaScript. The four storefront/product-page examples are independent concept demos, not paid client projects.

## Run locally
Open `index.html` in a browser, use VS Code + Live Server, or run a local static server from the repository root:

```powershell
npx.cmd --yes http-server . -p 8080
```

The Work page links to the shared case-study template at `case-study.html`. Each project uses a `project` query value, for example `case-study.html?project=storefront`.

## Before publishing the site
1. Replace the `yourdomain.com` placeholders in social metadata, structured data, `robots.txt` and `sitemap.xml` with the actual public domain.
2. Keep the project email in sync with `kateriyakanchan@gmail.com`.
3. Replace concept preview artwork in `assets/projects/` with approved project screenshots when available.
4. Update project titles, descriptions, About copy and services with accurate information.

## Deploy to Netlify
Drag the entire `kanchan-portfolio` folder into Netlify's manual deploy area, or connect the folder through a Git repository.
