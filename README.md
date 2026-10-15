# M10 / Praneet Kamble portfolio v4 (manga theme, premium pass)

Static single page: index.html, style.css, script.js. No build step. Only external dependency: Google Fonts
(Bebas Neue headings, Inter body, Knewave for the M10 logo, Permanent Marker for brush section titles).

Run locally: `python3 -m http.server 8080` in this folder, open http://localhost:8080 (http, not file://, so the QR demos sync).

## Files
- assets/art/   original manga ink illustrations (WebP, fictional spiky-haired character): hero-main, panel-ideas/code/impact, about-portrait, contact-skyline.
               v4 art is rendered procedurally by _src/v4 (two-layer ink + screentone engine in headless Chrome), not traced or generated from any real person.
- assets/img/   real project screenshots (reused from portfolio-v2)
- demos/        cafe + restaurant QR table-ordering demos (fictional businesses, sample prices)
- screens/      headless Chrome verification screenshots (1440px desktop, 375px mobile)
- _src/         v4 art generator (_src/v4: ink.py, chars.py, scenes.py, run.py) and screenshot script (shoot.py); not needed to host the site
- M10-website-walkthrough-v4.mp4  screen-recorded walkthrough (1440x900, 30fps); not needed to host the site

## What's new in v4
- New ink artwork with screentone shading, rim light and rough brush edges (same filenames and aspect ratios as v3).
- One accent colour (red #ff2b2b on ink, #c8102e on paper) used for underlines, shadows, counters and hover states.
- Motion: staggered scroll reveals, image wipe-ins, hero panel parallax (pointer + scroll), two marquees, magnetic buttons and chips,
  card/service tilt with glare, ink-splash click bursts, animated counters (they count up to the real numbers recounted from the page),
  scroll progress bar, torn-paper section edges, film-grain overlay and an optional cursor ring on mouse devices.
- All motion is switched off under prefers-reduced-motion; touch devices get no tilt, magnet or cursor effects.

## TODO before publishing
- Replace the "Case studies" note when a client agrees to be named.
- Optional: swap assets/art/*.webp for higher-detail artwork (keep filenames and aspect ratios).

---
## v4b changes (AI projects added)
- Two new project cards (09 DocQ, 10 LeadAgent) in the AI & tools filter; stat and chip counters now read 10 / 5 (script.js recounts them from the page).
- Card thumbnails are real screenshots of the running apps (`assets/img/proj-docq.webp`, `proj-leadagent.webp`).
- Source links point to `https://github.com/praneetkamble/docq` and `/leadagent`. **These repos have not been created yet**, so the links 404 until they are.
- Metrics on the cards are only the ones measured by `ai-projects/docq/eval/run_eval.py` (25-question test set, author-written sample docs).
- Contact details unchanged from v4. Verification screenshots: `screens-new/`.

---
## v4c changes (Delta added)
- New project card 11, "Delta: Personal PC assistant", in the AI & tools filter. Stat and chip counters now read 11 / 6 (script.js recounts them from the page; Web 3 and Local business 2 are unchanged).
- Thumbnail `assets/img/proj-delta.webp` is a crop of a real screenshot of the running Delta UI (mock adapter, headless Chrome on Linux).
- The card says only what is measured: 375 pytest cases passing on Linux with a mock adapter. It does **not** claim Windows testing, user counts or any other number.
- Link `https://github.com/praneetkamble/delta` is a placeholder: **the repo has not been created yet**, so the link 404s until it is.
- Section sub-text now says "The AI projects" instead of "The two AI projects". Contact details unchanged.
- Verification screenshots: `screens-v4c/` (not shipped in the zip).

---
## v4d changes (Delta OS dashboard)
- Copied from v4c; v4c is untouched.
- Card 11 thumbnail `assets/img/proj-delta.webp` is now a downscaled (1000x625) screenshot of the new Delta OS dashboard, taken from the running app in demo mode (mock adapter, headless Chrome on Linux). The values in it are simulated and the card text says so.
- Card 11 text now says 439 pytest cases passing (was 375) and mentions the dashboard. Windows is still stated as untested.
- GitHub link is still a placeholder; the repo has not been created.
- Not shipped in the zip: `screens*/`, `_src/`, `*.mp4`.

