# Restaurant table-ordering demo: "Meher Darbar" (fictional)

Static demo (HTML, CSS and vanilla JS) of QR table ordering for a full-service Indian restaurant. It was built from the cafe demo's architecture (config-driven theme, `store.js` with BroadcastChannel and a localStorage fallback) and has its own design. The cafe project was not modified. **Meher Darbar is a fictional sample restaurant. All prices are sample prices ("Demo menu"). There are no reviews or claims.**

## Pages
| Page | Who | What |
|---|---|---|
| `index.html?table=4&seat=2` | Guest | Landing (table and seat card), menu, item sheet (half/full portions, add-ons, quantity), cart with kitchen note, live "My orders" status, **Call waiter**, **Request bill**. Without a valid `table` and `seat`, the guest is asked for them. |
| `kitchen.html` | Kitchen | Kitchen display: tickets by table and seat in New, On the pass and Ready columns. Tap a line to advance it (New, Cooking, Ready, Served), or bump the whole ticket. Shows waiter-call alerts (tap to dismiss). |
| `billing.html` | Floor / cashier | A running bill per table, split by seat, with GST. Waiter and bill-request alerts (Acknowledge). **Mark table as paid** clears that table and its alerts. |
| `credits.html` | — | Photo credits. |

Open the guest page and the staff pages in tabs of the same browser to see the live sync. There is no backend: state lives in localStorage under `rdemo:<id>:v1`. "Reset demo" on the staff pages clears it.

## Menu
47 items across Starters (10), Main Course (12), Breads (5), Rice & Biryani (6), Thalis (4), Beverages (8) and Desserts (2). Each item has a veg or non-veg marker and a spice level (0 to 3). 22 items have Half/Full portions and 35 have add-ons. Every item has its own real photo, and the dish names were chosen to match what each photo shows.

## Personalising
Edit `config.js` only: `name`, `wordmark`, `logoMark`, `tagline`, `colors`, `charges`, `orderPrefix` and `menu`. Change `id` so each restaurant gets separate storage. Replace images in `assets/img/` and update CREDITS.md and credits.html.

## Design
Midnight-green and brass, set in Bodoni Moda (display) and Hanken Grotesk (text). Both fonts are self-hosted woff2 and not used by any cafe theme. Mobile-first, with 2 to 3 menu columns on desktop.

## Tests & media
- Playwright suite: `/workspace/restaurant-test/test.py`. Serve this folder on port 8766 (`python3 -m http.server 8766`), then run `/workspace/.venv-pw/bin/python test.py`.
- Screenshots: `screenshots/` (mobile 390 @2x and desktop 1440).
- Video: `restaurant-demo.mp4` (made by `/workspace/restaurant-test/video.py`).

Not deployed.
