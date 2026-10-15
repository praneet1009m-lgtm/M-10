/* Shared state + live sync (BroadcastChannel with localStorage 'storage' fallback). No backend. */
(function () {
  const C = window.CAFE_CONFIG;
  const KEY = "qrdemo:" + C.id + ":v1";
  const listeners = new Set();
  let bc = null;
  try { bc = new BroadcastChannel(KEY); } catch (e) { bc = null; }

  function fresh() {
    const stock = {};
    C.menu.forEach(c => c.items.forEach(i => { stock[i.id] = !(C.defaultOutOfStock || []).includes(i.id); }));
    return { v: 1, orders: [], stock, carts: {}, seq: 100 };
  }
  function read() {
    try { const s = JSON.parse(localStorage.getItem(KEY)); if (s && s.v === 1) { return s; } } catch (e) {}
    const f = fresh(); localStorage.setItem(KEY, JSON.stringify(f)); return f;
  }
  function emit(src) { const s = read(); listeners.forEach(fn => { try { fn(s, src); } catch (e) { console.error(e); } }); }
  function update(mutator) {
    const s = read(); mutator(s); s.updatedAt = Date.now();
    localStorage.setItem(KEY, JSON.stringify(s));
    if (bc) bc.postMessage({ t: "sync", at: s.updatedAt });
    emit("local");
    return s;
  }
  if (bc) bc.onmessage = () => emit("remote");
  window.addEventListener("storage", e => { if (e.key === KEY) emit("remote"); });

  const items = {}; C.menu.forEach(c => c.items.forEach(i => { items[i.id] = Object.assign({ category: c.id }, i); }));

  const money = n => C.currency.symbol + Math.round(n).toLocaleString(C.currency.locale || "en-IN");
  function lineUnit(line) {
    const it = items[line.itemId]; if (!it) return 0;
    let p = it.price;
    (it.addons || []).forEach(g => (line.choices[g.id] || []).forEach(oid => { const o = g.options.find(x => x.id === oid); if (o) p += o.price; }));
    return p;
  }
  function totals(lines) {
    const subtotal = lines.reduce((a, l) => a + lineUnit(l) * l.qty, 0);
    const charges = (C.charges || []).map(ch => ({ label: ch.label + " (" + ch.percent + "%)", amount: subtotal * ch.percent / 100 }));
    return { subtotal, charges, total: subtotal + charges.reduce((a, c) => a + c.amount, 0) };
  }
  function choiceLabels(line) {
    const it = items[line.itemId]; const out = [];
    (it && it.addons || []).forEach(g => (line.choices[g.id] || []).forEach(oid => { const o = g.options.find(x => x.id === oid); if (o) out.push(o.name); }));
    return out;
  }
  const THEME = Object.assign({ name: "classic", landing: "photo", icons: false }, C.themeMeta || {});
  function catIcon(name) {
    const n = name.toLowerCase();
    const k = /chai|coffee|tea|kaapi/.test(n) ? "cup" : /cool|mocktail|shake|drink|lassi/.test(n) ? "glass" : /dessert|sweet|bake|cake|cookie|waffle/.test(n) ? "cake" : /breakfast|brunch|nashta/.test(n) ? "plate" : /pasta|bowl|main|plate/.test(n) ? "bowl" : /burger|wrap/.test(n) ? "burger" : "sandwich";
    return '<svg class="cico" viewBox="0 0 100 100" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="6" stroke-linecap="round" stroke-linejoin="round">' + SHAPES[k] + '</svg>';
  }
  function applyTheme() {
    document.documentElement.dataset.theme = C.theme || "classic";
    const r = document.documentElement.style, k = C.colors;
    r.setProperty("--primary", k.primary); r.setProperty("--accent", k.accent);
    r.setProperty("--bg", k.background); r.setProperty("--ink", k.text);
  }
  /* Illustrated tile for items without a verified photo: generated SVG, same visual language everywhere */
  const SHAPES = {
    cup: '<path d="M30 44h40v18a16 16 0 0 1-16 16h-8a16 16 0 0 1-16-16z"/><path d="M70 50h5a7 7 0 0 1 0 14h-6"/><path d="M40 30c0-5 4-5 4-10M50 32c0-5 4-5 4-10"/>',
    glass: '<path d="M34 26h32l-4 52H38z"/><path d="M36 44h28"/><path d="M58 20l-6 16"/><circle cx="46" cy="58" r="3"/><circle cx="54" cy="66" r="2.5"/>',
    plate: '<circle cx="50" cy="54" r="26"/><circle cx="50" cy="54" r="16"/><path d="M18 30v14M14 30v10a4 4 0 0 0 8 0V30M86 30c-6 4-6 14 0 18v20"/>',
    bowl: '<path d="M22 50h56a28 22 0 0 1-56 0z"/><path d="M36 74h28"/><path d="M38 42c2-6 8-8 12-4 4-6 12-4 12 4"/>',
    sandwich: '<path d="M20 60L50 30l30 30z"/><path d="M24 66h52"/><path d="M28 72h44"/>',
    wrap: '<rect x="28" y="30" width="44" height="44" rx="22" transform="rotate(30 50 52)"/><path d="M40 40l20 26"/>',
    burger: '<path d="M24 46a26 18 0 0 1 52 0z"/><path d="M22 54h56"/><path d="M24 62h52a0 0 0 0 1 0 0 8 8 0 0 1-8 8H32a8 8 0 0 1-8-8z"/>',
    pasta: '<path d="M22 50h56a28 22 0 0 1-56 0z"/><path d="M34 46c4-10 8-10 10 0M46 46c4-12 8-12 10 0M58 46c3-8 6-8 8 0"/><path d="M68 18L56 46"/>',
    cake: '<path d="M24 50l52-14v34H24z"/><path d="M24 58h52"/><path d="M50 30v-6"/><circle cx="50" cy="21" r="2"/>',
    jar: '<rect x="32" y="30" width="36" height="46" rx="6"/><path d="M32 46h36M32 58h36"/><path d="M36 24h28"/>',
    kulfi: '<path d="M38 24h24v34a12 12 0 0 1-24 0z"/><path d="M50 70v14"/><path d="M42 36h16"/>'
  };
  function hueFor(id) { let h = 0; for (const ch of id) h = (h * 31 + ch.charCodeAt(0)) % 360; return h; }
  function tile(it) {
    const h = (hueFor(it.id) % 34) + 22; // warm band only: ambers, terracottas, ochres
    return '<div class="tile" style="--h:' + h + '"><svg viewBox="0 0 100 100" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">' + (SHAPES[it.tile] || SHAPES.plate) + '</svg></div>';
  }
  function media(it, cls) {
    return it.image ? '<img class="' + (cls || "") + '" src="' + it.image + '" alt="' + it.name.replace(/"/g, "") + '" loading="lazy" decoding="async" onerror="Store.fallback(this,\'' + it.id + '\')">' : tile(it);
  }
  function fallback(img, id) { const t = document.createElement('div'); t.innerHTML = tile(items[id] || { id: id }); img.replaceWith(t.firstChild); }
  window.Store = { fallback, THEME, catIcon, KEY, read, update, on: fn => listeners.add(fn), reset: () => update(s => Object.assign(s, fresh())), items, money, lineUnit, totals, choiceLabels, applyTheme, media, C };
})();
