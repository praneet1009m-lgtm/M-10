# QR table-ordering demo (static, no backend)

This is a working demo of QR-code table ordering for cafes, made for Praneet's web studio. It's plain HTML, CSS and JS with no build step, no CDN and no server. **Kesar Lane Café is a fictional sample cafe** and its menu and prices are made up.

## Pages
- `index.html?table=5` is the guest flow: table landing, menu, item sheet, cart, then live order status. Without a valid `?table=` it asks for the table number.
- `dashboard.html` is the cafe or kitchen view: live orders grouped by table, Preparing/Served buttons, new-order chime, and Menu & stock toggles.
- `credits.html` lists the photo credits (also in CREDITS.md).

## Try it locally
```
cd demo && python3 -m http.server 8080
# open http://localhost:8080/index.html?table=5 and http://localhost:8080/dashboard.html in two tabs of the same browser
```
(Use http, not `file://`. Live sync uses BroadcastChannel and localStorage, which only work in the same browser.)

## Personalise for a cafe (edit only `config.js`)
- `id`: a unique slug. It namespaces the saved data (`qrdemo:<id>:v1`).
- `name`, `wordmark`, `logoMark`, `tagline`
- `colors`: `primary`, `accent`, `background`, `text`
- `currency`: symbol, code and locale. `charges`: e.g. `[{label:"GST",percent:5}]`, or `[]` to hide taxes.
- `demo: false` removes the "Demo menu" pill and the footer note.
- `menu`: categories, then items with `{id, name, description, price, veg, image | tile, tags, addons}`.
  - `addons`: `{id, name, type:"single"|"multi", required, max?, options:[{id,name,price}]}`
  - `image`: a local path such as `assets/img/x.webp` (about 800px wide, under 150KB). If an item has no image, `tile` picks an illustrated tile: cup, glass, plate, bowl, sandwich, wrap, burger, pasta, cake, jar or kulfi.
- `defaultOutOfStock`: item ids that start out unavailable.

## Deploy (Cloudflare Pages, free)
In Cloudflare, go to Workers & Pages → Create → Pages → **Upload assets**, then drag in the `demo/` folder. You get a `*.pages.dev` URL. Make one QR code per table pointing to `https://<site>.pages.dev/index.html?table=N`.

## Limitations (it's a demo)
- Orders sync only between tabs of the **same browser** on the same device. A real cafe needs a small backend (for example Cloudflare D1/Durable Objects or Firebase) so phones and the kitchen tablet share orders.
- The dashboard chime needs one click on "Enable sound" first, because of browser autoplay rules.
- There's no payment step. The guest is told to pay at the counter.
