(function () {
  const S = window.Store, C = S.C, $ = (q, el = document) => el.querySelector(q);
  S.applyTheme();
  document.title = C.name + " · Order at your table";
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const I = {
    search: '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>',
    x: '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"/></svg>',
    plus: '<svg class="ico" style="width:16px;height:16px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>',
    minus: '<svg class="ico" style="width:16px;height:16px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"><path d="M5 12h14"/></svg>',
    arrow: '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
    back: '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 6l-6 6 6 6"/></svg>',
    check: '<svg class="ico" style="width:16px;height:16px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>',
    flame: '<svg class="ico" style="width:16px;height:16px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3c1 4 5 5.5 5 10a5 5 0 0 1-10 0c0-2.5 1.5-3.5 2-5 1 1.5 2 2 3 2-1-2-1-4 0-7z"/></svg>',
    bell: '<svg class="ico" style="width:16px;height:16px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 18h16M6 18a6 6 0 1 1 12 0M12 6V4"/></svg>',
    clock: '<svg class="ico" style="width:15px;height:15px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
    qr: '<svg class="ico" style="width:15px;height:15px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="4" y="4" width="6" height="6" rx="1"/><rect x="14" y="4" width="6" height="6" rx="1"/><rect x="4" y="14" width="6" height="6" rx="1"/><path d="M14 14h2v2M20 14v6h-6"/></svg>'
  };
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const vm = veg => '<span class="vm' + (veg ? "" : " nv") + '" role="img" aria-label="' + (veg ? "Vegetarian" : "Non-vegetarian") + '"></span>';
  const app = $("#app");

  // ---- table param ----
  function parseTable() {
    const raw = new URLSearchParams(location.search).get("table");
    if (raw == null) return null;
    const n = Number(raw.trim());
    return Number.isInteger(n) && n >= 1 && n <= 999 ? n : NaN;
  }
  let table = parseTable();
  const T = () => String(table);
  let vegOnly = false, query = "";

  // ---- state helpers ----
  const cartOf = s => (s.carts[T()] ||= { lines: [], note: "", orders: [] });
  const cartCount = s => cartOf(s).lines.reduce((a, l) => a + l.qty, 0);
  const inStock = (s, id) => s.stock[id] !== false;

  function toast(msg) { const t = $("#toast"); t.textContent = msg; t.classList.add("on"); clearTimeout(toast.t); toast.t = setTimeout(() => t.classList.remove("on"), 2200); }

  // ---- router ----
  function route() {
    if (table === null || Number.isNaN(table)) return renderLanding(true);
    const h = location.hash.slice(1);
    if (h === "menu") return renderMenu();
    if (h.startsWith("status")) return renderStatus(h.split("/")[1]);
    if (h === "cart") { renderMenu(); return openCart(); }
    renderLanding(false);
  }
  window.addEventListener("hashchange", () => { closeSheet(true); route(); });

  // ---- landing ----
  function renderLanding(ask) {
    current = "landing";
    const bad = Number.isNaN(table);
    app.innerHTML = '<section class="landing l-' + S.THEME.landing + '">' +
      '<img class="bgimg" src="' + (C.hero || "assets/img/hero-pour.webp") + '" alt="">' +
      '<header class="rise"><div class="brand"><div class="mono" aria-hidden="true">' + esc(C.logoMark) + '</div><span class="wm">' + esc(C.wordmark) + '</span></div>' +
      (C.demo ? '<span class="pill pill-demo">Demo menu</span>' : "") + '</header>' +
      '<div class="content">' +
      (ask
        ? '<div class="eyebrow rise d1">Welcome to ' + esc(C.name) + '</div><h1 class="table-no rise d2" style="font-size:clamp(48px,14vw,84px)">Which <em>table</em>?</h1>' +
          '<form class="ask rise d3" id="askf" novalidate><label for="tno">' + (bad ? "That table number didn't look right. " : "") + 'Enter the number on your table’s QR stand.</label>' +
          '<div class="row"><input id="tno" inputmode="numeric" pattern="[0-9]*" maxlength="3" placeholder="e.g. 5" autocomplete="off" aria-describedby="terr"><button class="btn btn-primary" style="background:#fff;color:var(--ink)" type="submit">Continue ' + I.arrow + '</button></div><div class="err" id="terr" role="alert"></div></form>'
        : '<div class="eyebrow rise d1">Welcome to ' + esc(C.name) + '</div><h1 class="table-no rise d2">Table <em>' + table + '</em></h1>' +
          '<p class="lead rise d3">' + esc(C.lead || "Browse the menu, order from your seat and follow it live. We’ll bring it right over.") + '</p>' +
          '<a class="btn btn-primary rise d4" href="#menu" id="viewMenu">View menu ' + I.arrow + '</a>' +
          '<div class="meta rise d4"><span>' + I.qr + ' No app needed</span><span>' + I.clock + ' Pay at the counter</span></div>') +
      '</div></section>';
    if (ask) {
      const f = $("#askf"), inp = $("#tno");
      setTimeout(() => inp.focus({ preventScroll: true }), 400);
      f.onsubmit = e => {
        e.preventDefault();
        const n = Number(inp.value.trim());
        if (!Number.isInteger(n) || n < 1 || n > 999) { $("#terr").textContent = "Please enter a table number between 1 and 999."; inp.focus(); return; }
        const u = new URL(location.href); u.searchParams.set("table", n); u.hash = ""; history.replaceState(null, "", u);
        table = n; route();
      };
    }
  }

  // ---- menu ----
  let current = "", spy = null;
  function renderMenu() {
    const s = S.read();
    if (current !== "menu") {
      current = "menu";
      app.innerHTML = '<header class="topbar" id="topbar"><div class="wrap bar"><div class="brand"><div class="mono" aria-hidden="true">' + esc(C.logoMark) + '</div><span class="wm">' + esc(C.wordmark) + '</span></div>' +
        '<span class="tchip" aria-label="Ordering for table ' + table + '"><span class="dot"></span>Table ' + table + '</span></div></header>' +
        '<nav class="tabs" aria-label="Menu categories"><div class="scroller" id="tabs">' + C.menu.map((c, i) => '<button class="tab" data-cat="' + c.id + '"' + (i === 0 ? ' aria-current="true"' : "") + '>' + S.catIcon(c.name) + '<span>' + esc(c.name) + '</span></button>').join("") + '</div></nav>' +
        '<main class="wrap view-in"><div class="intro">' + (C.demo ? '<span class="pill pill-demo">Demo menu</span>' : "") +
        '<h1>' + (C.headline || 'Good food, <em>to your table.</em>') + '</h1><p>' + esc(C.tagline) + '</p>' +
        '<div class="tools"><label class="search"><span class="sr">Search the menu</span>' + I.search + '<input id="q" type="search" placeholder="Search dishes, drinks…" autocomplete="off"></label>' +
        '<button class="vegt" id="vegt" role="switch" aria-checked="' + vegOnly + '">' + vm(true) + 'Veg<span class="sw" aria-hidden="true"></span></button></div></div>' +
        '<div id="sections"></div>' +
        '<footer class="foot"><div class="sig">' + esc(C.name) + '</div>' + (C.demo ? 'Demo, sample menu and prices · ' : "") + 'Prices in ' + esc(C.currency.code) + (C.charges && C.charges.length ? ", taxes extra" : "") + '<br><a href="credits.html">Photo credits</a> · <a href="dashboard.html" target="_blank" rel="noopener">Staff dashboard</a></footer></main>' +
        '<div class="statusbar" id="statusbar" hidden></div>' +
        '<div class="cartbar" id="cartbar"><button id="cartbtn" aria-label="View cart"><span class="count num" id="cc">0</span><span class="lbl">View cart<small id="cl"></small></span><span class="go num" id="ct"></span></button></div>';
      $("#q").value = query;
      $("#q").addEventListener("input", e => { query = e.target.value.trim().toLowerCase(); drawSections(S.read()); });
      $("#vegt").onclick = e => { vegOnly = !vegOnly; e.currentTarget.setAttribute("aria-checked", vegOnly); drawSections(S.read()); };
      $("#tabs").addEventListener("click", e => { const b = e.target.closest(".tab"); if (!b) return; const sec = document.getElementById("cat-" + b.dataset.cat); if (sec) { spyLock = Date.now(); setTab(b.dataset.cat); sec.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" }); } });
      $("#cartbtn").onclick = () => { location.hash = "cart"; };
      $("#sections").addEventListener("click", onCardClick);
      window.addEventListener("scroll", onScroll, { passive: true });
      window.scrollTo(0, 0);
    }
    drawSections(s); drawCartBar(s, false); drawStatusBar(s);
  }
  let spyLock = 0;
  function setTab(id) {
    document.querySelectorAll(".tab").forEach(t => { const on = t.dataset.cat === id; t.setAttribute("aria-current", on); if (on) { const sc = $("#tabs"); const l = t.offsetLeft - sc.clientWidth / 2 + t.clientWidth / 2; sc.scrollTo({ left: l, behavior: reduce ? "auto" : "smooth" }); } });
  }
  function onScroll() {
    if (current !== "menu") return;
    const tb = $("#topbar"); if (tb) tb.classList.toggle("scrolled", scrollY > 8);
    if (Date.now() - spyLock < 700) return;
    let best = null;
    document.querySelectorAll(".sec").forEach(sec => { if (sec.getBoundingClientRect().top - 140 <= 0) best = sec.dataset.cat; });
    if (!best) { const f = document.querySelector(".sec"); best = f && f.dataset.cat; }
    if ((innerHeight + scrollY) >= document.body.scrollHeight - 4) { const all = document.querySelectorAll(".sec"); if (all.length) best = all[all.length - 1].dataset.cat; }
    const cur = document.querySelector('.tab[aria-current="true"]');
    if (best && (!cur || cur.dataset.cat !== best)) setTab(best);
  }
  function drawSections(s) {
    const cart = cartOf(s);
    const qtyById = {}; cart.lines.forEach(l => qtyById[l.itemId] = (qtyById[l.itemId] || 0) + l.qty);
    let html = "", any = false;
    C.menu.forEach(c => {
      const items = c.items.filter(i => (!vegOnly || i.veg) && (!query || (i.name + " " + i.description + " " + (i.tags || []).join(" ")).toLowerCase().includes(query)));
      document.querySelectorAll('.tab[data-cat="' + c.id + '"]').forEach(t => t.hidden = !items.length);
      if (!items.length) return; any = true;
      html += '<section class="sec" id="cat-' + c.id + '" data-cat="' + c.id + '" aria-labelledby="h-' + c.id + '"><h2 id="h-' + c.id + '">' + esc(c.name) + '<small>' + items.length + ' items</small></h2><div class="list">' +
        items.map(i => {
          const ok = inStock(s, i.id), q = qtyById[i.id];
          const tags = (i.tags || []).map(t => '<span class="tag' + (/spicy|bestseller/i.test(t) ? " hot" : "") + '">' + esc(t) + '</span>').join("");
          return '<article class="card' + (ok ? "" : " oos") + '" data-id="' + i.id + '" tabindex="0" role="button" aria-label="' + esc(i.name) + ", " + S.money(i.price) + (ok ? "" : ", currently unavailable") + '"' + (ok ? "" : ' aria-disabled="true"') + '>' +
            '<div><div class="t">' + vm(i.veg) + tags + '</div><h3>' + esc(i.name) + '</h3><p>' + esc(i.description) + '</p>' +
            (ok ? '<span class="price num">' + S.money(i.price) + '</span>' + ((i.addons || []).length ? ' <span style="color:var(--ink-3);font-size:12px;margin-left:6px">Customisable</span>' : "")
                : '<span class="unavail">Currently unavailable</span>') + '</div>' +
            '<div class="thumb">' + S.media(i) + '<button class="add" data-add="' + i.id + '" ' + (ok ? 'aria-label="Add ' + esc(i.name) + '"' : 'disabled aria-label="' + esc(i.name) + ' is unavailable"') + '>' +
            (ok ? (q ? '<span class="q">' + q + '</span> in cart' : "ADD " + I.plus) : "Unavailable") + '</button></div></article>';
        }).join("") + '</div></section>';
    });
    $("#sections").innerHTML = any ? html : '<div class="empty"><div class="serif" style="font-size:22px;color:var(--ink-2)">Nothing matches</div><p>Try a different search' + (vegOnly ? " or turn off Veg only" : "") + '.</p></div>';
  }
  function onCardClick(e) {
    const card = e.target.closest(".card"); if (!card) return;
    if (card.classList.contains("oos")) { toast("Sorry, that’s currently unavailable"); return; }
    openItem(card.dataset.id);
  }
  document.addEventListener("keydown", e => {
    if ((e.key === "Enter" || e.key === " ") && e.target.classList && e.target.classList.contains("card")) { e.preventDefault(); onCardClick(e); }
    if (e.key === "Escape" && sheetOpen) closeSheet();
  });
  function drawCartBar(s, bump) {
    const bar = $("#cartbar"); if (!bar) return;
    const cart = cartOf(s), n = cartCount(s), t = S.totals(cart.lines);
    bar.classList.toggle("show", n > 0);
    $("#cc").textContent = n; $("#cl").textContent = n === 1 ? "1 item" : n + " items"; $("#ct").innerHTML = S.money(t.subtotal) + " " + I.arrow;
    if (bump && !reduce) { const b = $("#cartbtn"); b.classList.remove("bump"); void b.offsetWidth; b.classList.add("bump"); }
  }
  function activeOrder(s) {
    const ids = cartOf(s).orders || [];
    for (let i = ids.length - 1; i >= 0; i--) { const o = s.orders.find(x => x.id === ids[i]); if (o && o.status !== "served") return o; }
    return null;
  }
  function drawStatusBar(s) {
    const el = $("#statusbar"); if (!el) return;
    const o = activeOrder(s);
    el.hidden = !o;
    el.style.bottom = cartCount(s) ? "" : "calc(16px + env(safe-area-inset-bottom,0px))";
    if (o) el.innerHTML = '<button onclick="location.hash=\'status/' + o.id + '\'"><span class="pulse"></span>Order #' + o.id + ' · ' + (o.status === "preparing" ? "Being prepared" : "Received by the kitchen") + '<span style="margin-left:auto;color:var(--ink-3)">Track ›</span></button>';
  }

  // ---- sheet infra ----
  let sheetOpen = false, lastFocus = null;
  const sheet = $("#sheet"), scrim = $("#scrim");
  function openSheet(html, plain) {
    lastFocus = document.activeElement;
    sheet.className = "sheet" + (plain ? " plain" : ""); sheet.innerHTML = html; sheet.hidden = false; scrim.hidden = false;
    document.body.classList.add("locked");
    void sheet.offsetWidth; sheet.classList.add("on"); scrim.classList.add("on");
    sheetOpen = true; bindDrag();
    setTimeout(() => { const c = sheet.querySelector(".close"); c && c.focus({ preventScroll: true }); }, 60);
  }
  function closeSheet(instant) {
    if (!sheetOpen) return; sheetOpen = false;
    sheet.classList.remove("on"); scrim.classList.remove("on"); sheet.style.transform = "";
    document.body.classList.remove("locked");
    const done = () => { if (!sheetOpen) { sheet.hidden = true; scrim.hidden = true; sheet.innerHTML = ""; } };
    instant || reduce ? done() : setTimeout(done, 420);
    if (location.hash === "#cart") history.replaceState(null, "", "#menu");
    lastFocus && lastFocus.focus && lastFocus.focus({ preventScroll: true });
  }
  scrim.onclick = () => closeSheet();
  sheet.addEventListener("keydown", e => { // focus trap
    if (e.key !== "Tab") return;
    const f = [...sheet.querySelectorAll('button:not([disabled]),input,textarea,[tabindex="0"]')].filter(x => x.offsetParent !== null);
    if (!f.length) return; const a = f[0], z = f[f.length - 1];
    if (e.shiftKey && document.activeElement === a) { e.preventDefault(); z.focus(); } else if (!e.shiftKey && document.activeElement === z) { e.preventDefault(); a.focus(); }
  });
  function bindDrag() {
    const body = sheet.querySelector(".body"); let y0 = null, dy = 0, t0 = 0, fromBody = false;
    const start = (e, isBody) => { if (isBody && body.scrollTop > 0) return; y0 = e.clientY; dy = 0; t0 = performance.now(); fromBody = isBody; };
    const move = e => { if (y0 == null) return; dy = Math.max(0, e.clientY - y0); if (fromBody && dy < 6) return; sheet.classList.add("dragging"); sheet.style.transform = "translateY(" + (dy < 0 ? 0 : dy) + "px)"; scrim.style.opacity = String(Math.max(0, 1 - dy / 500)); };
    const end = () => { if (y0 == null) return; const v = dy / Math.max(1, performance.now() - t0); sheet.classList.remove("dragging"); scrim.style.opacity = ""; y0 = null; if (dy > 120 || v > 0.6) closeSheet(); else sheet.style.transform = ""; };
    const g = sheet.querySelector(".grab");
    g.addEventListener("pointerdown", e => { g.setPointerCapture(e.pointerId); start(e, false); });
    g.addEventListener("pointermove", move); g.addEventListener("pointerup", end); g.addEventListener("pointercancel", end);
    body.addEventListener("touchstart", e => start(e.touches[0], true), { passive: true });
    body.addEventListener("touchmove", e => { if (y0 != null && e.touches[0].clientY - y0 > 0 && body.scrollTop <= 0) move(e.touches[0]); }, { passive: true });
    body.addEventListener("touchend", end);
  }

  // ---- item sheet ----
  function openItem(id) {
    const it = S.items[id]; if (!it) return;
    let qty = 1; const choices = {};
    (it.addons || []).forEach(g => { choices[g.id] = []; });
    const groups = (it.addons || []).map(g => '<fieldset class="grp" data-g="' + g.id + '" style="border:0;margin:22px 0 0;padding:18px 0 0;border-top:1px solid var(--line)"><legend class="sr">' + esc(g.name) + '</legend>' +
      '<div class="grp-h"><h3>' + esc(g.name) + (g.type === "multi" ? ' <span style="font-weight:500;color:var(--ink-3);font-size:13px">· choose any' + (g.max ? " (up to " + g.max + ")" : "") + '</span>' : "") + '</h3><span class="req">' + (g.required ? "Required" : "Optional") + '</span></div>' +
      g.options.map(o => '<label class="opt"><input type="' + (g.type === "single" ? "radio" : "checkbox") + '" name="g-' + g.id + '" value="' + o.id + '"><span class="box ' + (g.type === "single" ? "radio" : "check") + '"></span><span class="n">' + esc(o.name) + '</span><span class="p num">' + (o.price ? "+" + S.money(o.price) : "Free") + '</span></label>').join("") + '</fieldset>').join("");
    openSheet('<div class="grab" aria-hidden="true"></div><button class="close" aria-label="Close">' + I.x + '</button>' +
      '<div class="body"><div class="hero">' + S.media(it) + '</div><div class="inner"><div style="display:flex;gap:8px;align-items:center">' + vm(it.veg) + (it.tags || []).map(t => '<span class="tag' + (/spicy|bestseller/i.test(t) ? " hot" : "") + '">' + esc(t) + '</span>').join("") + '</div>' +
      '<h2 id="sheetTitle">' + esc(it.name) + '</h2><p class="desc">' + esc(it.description) + '</p><div class="num" style="font-weight:650;font-size:17px">' + S.money(it.price) + '</div>' + groups + '<div style="height:12px"></div></div></div>' +
      '<div class="errline" id="err" role="alert"></div>' +
      '<div class="foot"><div class="step" role="group" aria-label="Quantity"><button id="qm" aria-label="Decrease quantity">' + I.minus + '</button><output id="qv" aria-live="polite">1</output><button id="qp" aria-label="Increase quantity">' + I.plus + '</button></div>' +
      '<button class="btn btn-brand" id="addbtn"><span>Add to cart</span><span class="num" id="lt" style="opacity:.9"></span></button></div>');
    const unit = () => S.lineUnit({ itemId: id, choices });
    const draw = () => { $("#qv").textContent = qty; $("#qm").disabled = qty <= 1; $("#lt").textContent = "· " + S.money(unit() * qty); };
    draw();
    sheet.querySelector(".close").onclick = () => closeSheet();
    sheet.querySelectorAll(".grp").forEach(fs => fs.addEventListener("change", e => {
      const g = it.addons.find(x => x.id === fs.dataset.g);
      let sel = [...fs.querySelectorAll("input:checked")].map(x => x.value);
      if (g.type === "multi" && g.max && sel.length > g.max) { e.target.checked = false; sel = sel.filter(v => v !== e.target.value); toast("Up to " + g.max + " choices"); }
      choices[g.id] = sel; fs.classList.remove("invalid"); $("#err").textContent = ""; draw();
    }));
    // allow tapping a selected optional radio again to clear it
    sheet.querySelectorAll('.grp input[type=radio]').forEach(r => { r.addEventListener("click", e => { const g = it.addons.find(x => x.id === r.name.slice(2)); if (!g.required && r.dataset.was === "1") { r.checked = false; choices[g.id] = []; draw(); } sheet.querySelectorAll('input[name="' + r.name + '"]').forEach(x => x.dataset.was = x.checked ? "1" : "0"); }); });
    $("#qm").onclick = () => { if (qty > 1) { qty--; draw(); } };
    $("#qp").onclick = () => { if (qty < 20) { qty++; draw(); } };
    $("#addbtn").onclick = () => {
      const missing = (it.addons || []).filter(g => g.required && !(choices[g.id] || []).length);
      if (missing.length) {
        missing.forEach(g => { const fs = sheet.querySelector('.grp[data-g="' + g.id + '"]'); fs.classList.remove("invalid"); void fs.offsetWidth; fs.classList.add("invalid"); });
        $("#err").textContent = "Please choose " + missing.map(g => g.name.toLowerCase()).join(" and ") + " to continue.";
        { const bd = sheet.querySelector(".body"), fs0 = sheet.querySelector('.grp[data-g="' + missing[0].id + '"]'); bd.scrollTo({ top: Math.max(0, fs0.offsetTop - 60), behavior: reduce ? "auto" : "smooth" }); }
        return;
      }
      const s0 = S.read(); if (!inStock(s0, id)) { toast("Sorry, that just went out of stock"); closeSheet(); return; }
      const key = id + "|" + JSON.stringify(Object.keys(choices).sort().map(k => [k, choices[k].slice().sort()]));
      S.update(s => { const c = cartOf(s); const ex = c.lines.find(l => l.key === key); if (ex) ex.qty += qty; else c.lines.push({ key, itemId: id, qty, choices: JSON.parse(JSON.stringify(choices)) }); });
      closeSheet(); toast("Added to cart"); drawCartBar(S.read(), true);
    };
  }

  // ---- cart ----
  function openCart() {
    openSheet('<div class="grab" aria-hidden="true"></div><button class="close" aria-label="Close cart">' + I.x + '</button><div class="body cart" id="cartBody"></div><div class="errline" id="err" role="alert"></div><div class="foot" id="cartFoot"></div>', true);
    sheet.querySelector(".close").onclick = () => closeSheet();
    drawCart();
  }
  function drawCart() {
    const s = S.read(), cart = cartOf(s), body = $("#cartBody"); if (!body) return;
    if (!cart.lines.length) { body.innerHTML = '<div class="inner"><h2 id="sheetTitle" class="serif">Your cart</h2><div class="empty" style="padding:30px 0 10px"><div class="serif" style="font-size:22px;color:var(--ink-2)">Nothing here yet</div><p>Add something delicious from the menu.</p></div></div>'; $("#cartFoot").innerHTML = '<button class="btn btn-primary btn-block" id="bk">Browse menu</button>'; $("#bk").onclick = () => closeSheet(); return; }
    const t = S.totals(cart.lines); const bad = cart.lines.filter(l => !inStock(s, l.itemId));
    const focusedNote = document.activeElement && document.activeElement.id === "note";
    body.innerHTML = '<div class="inner"><h2 id="sheetTitle" class="serif">Your order</h2><p class="sub">Table ' + table + ' · ' + cartCount(s) + ' item' + (cartCount(s) > 1 ? "s" : "") + '</p>' +
      cart.lines.map((l, idx) => { const it = S.items[l.itemId]; const ok = inStock(s, l.itemId); const ch = S.choiceLabels(l);
        return '<div class="line' + (ok ? "" : " bad") + '"><div class="mini">' + S.media(it) + '</div><div><h4>' + vm(it.veg) + esc(it.name) + '</h4>' + (ch.length ? '<p class="ch">' + esc(ch.join(" · ")) + '</p>' : '<p class="ch">' + S.money(it.price) + ' each</p>') +
          (ok ? '<div class="step sm" role="group" aria-label="Quantity for ' + esc(it.name) + '"><button data-dec="' + idx + '" aria-label="Decrease">' + I.minus + '</button><output>' + l.qty + '</output><button data-inc="' + idx + '" aria-label="Increase">' + I.plus + '</button></div>' : '<div class="badnote">Currently unavailable, please remove</div>') +
          '</div><div class="r"><span class="amt num">' + S.money(S.lineUnit(l) * l.qty) + '</span><button class="rm" data-rm="' + idx + '">Remove</button></div></div>'; }).join("") +
      '<div class="notes"><label for="note">Cooking notes <span style="font-weight:500;color:var(--ink-3)">(optional)</span></label><textarea id="note" maxlength="200" placeholder="Less spicy, no onion, allergies…"></textarea></div>' +
      '<div class="sum"><div class="row"><span>Subtotal</span><span class="num">' + S.money(t.subtotal) + '</span></div>' + t.charges.map(c => '<div class="row"><span>' + esc(c.label) + '</span><span class="num">' + S.money(c.amount) + '</span></div>').join("") +
      '<div class="row tot"><span>Total</span><span class="num">' + S.money(t.total) + '</span></div></div><p class="paynote">Pay at the counter or to your server after your meal.</p><div style="height:8px"></div></div>';
    const note = $("#note"); note.value = cart.note || ""; if (focusedNote) note.focus();
    note.oninput = () => { clearTimeout(note.t); note.t = setTimeout(() => S.update(s2 => { cartOf(s2).note = note.value; }), 250); };
    body.onclick = e => { const b = e.target.closest("button"); if (!b) return;
      if (b.dataset.inc) S.update(s2 => { const l = cartOf(s2).lines[+b.dataset.inc]; if (l && l.qty < 20) l.qty++; });
      if (b.dataset.dec) S.update(s2 => { const c = cartOf(s2); const l = c.lines[+b.dataset.dec]; if (!l) return; l.qty--; if (l.qty <= 0) c.lines.splice(+b.dataset.dec, 1); });
      if (b.dataset.rm) S.update(s2 => { cartOf(s2).lines.splice(+b.dataset.rm, 1); });
    };
    $("#err").textContent = bad.length ? bad.length + " item" + (bad.length > 1 ? "s are" : " is") + " no longer available. Remove to place your order." : "";
    $("#cartFoot").innerHTML = '<button class="btn btn-brand btn-block" id="place"' + (bad.length ? " disabled" : "") + '><span>Place order</span><span class="num">· ' + S.money(t.total) + '</span></button>';
    $("#place").onclick = placeOrder;
  }
  function placeOrder() {
    const btn = $("#place"); if (btn.disabled) return;
    const note = $("#note") ? $("#note").value.trim() : "";
    let placed = null, blocked = false;
    S.update(s => {
      const c = cartOf(s);
      if (!c.lines.length) return;
      if (c.lines.some(l => s.stock[l.itemId] === false)) { blocked = true; return; }
      s.seq = (s.seq || 100) + 1;
      const id = (C.orderPrefix || "OD") + "-" + s.seq;
      const lines = c.lines.map(l => ({ itemId: l.itemId, name: S.items[l.itemId].name, veg: S.items[l.itemId].veg, qty: l.qty, labels: S.choiceLabels(l), unit: S.lineUnit(l) }));
      const tt = S.totals(c.lines);
      placed = { id, table: T(), lines, note, subtotal: tt.subtotal, charges: tt.charges, total: tt.total, status: "received", placedAt: Date.now(), times: { received: Date.now() } };
      s.orders.push(placed); c.orders = (c.orders || []).concat(id); c.lines = []; c.note = "";
    });
    if (blocked) { toast("Some items just went out of stock"); drawCart(); return; }
    if (!placed) return;
    closeSheet(true);
    location.hash = "status/" + placed.id;
  }

  // ---- status ----
  const STEPS = [
    { k: "received", t: "Order received", d: "The kitchen has your order." },
    { k: "preparing", t: "Being prepared", d: "Freshly made, just for you." },
    { k: "served", t: "Served", d: "Enjoy your meal!" }
  ];
  const fmtT = ms => new Date(ms).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
  function renderStatus(id) {
    current = "status";
    window.removeEventListener("scroll", onScroll);
    const s = S.read(); const o = s.orders.find(x => x.id === id && x.table === T());
    if (!o) { app.innerHTML = '<main class="wrap status view-in"><div class="head"><h1>Order not found</h1><p class="sub">It may have been cleared from this demo.</p></div><div class="actions"><a class="btn btn-primary" href="#menu">Back to menu</a></div></main>'; return; }
    const idx = STEPS.findIndex(x => x.k === o.status);
    const head = o.status === "served" ? 'Served. <em>Enjoy!</em>' : o.status === "preparing" ? 'It’s being <em>prepared.</em>' : 'Order <em>received.</em>';
    const prev = app.querySelector(".status[data-id]");
    const same = prev && prev.dataset.id === o.id;
    const others = (cartOf(s).orders || []).filter(x => x !== o.id).map(x => s.orders.find(y => y.id === x)).filter(Boolean).reverse();
    app.innerHTML = '<header class="topbar scrolled"><div class="wrap bar"><a class="icon-btn" href="#menu" aria-label="Back to menu">' + I.back + '</a><div class="brand" style="margin-left:4px"><span class="wm">' + esc(C.wordmark) + '</span></div><span class="tchip"><span class="dot"></span>Table ' + table + '</span></div></header>' +
      '<main class="wrap status' + (same ? "" : " view-in") + '" data-id="' + o.id + '"><div class="head">' + (C.demo ? '<span class="pill pill-demo">Demo order</span>' : "") + '<h1>' + head + '</h1><p class="sub">' + (o.status === "served" ? "Hope you love it. Hungry for more? Order again anytime." : "This page updates live. No need to refresh.") + '</p></div>' +
      '<div class="ordcard"><div class="top"><div class="oid">ORDER #' + o.id + '<small>Placed ' + fmtT(o.placedAt) + ' · Table ' + o.table + '</small></div>' + (o.status === "served" ? '<span class="served-burst">✓ Complete</span>' : '<span class="pill pill-demo" style="background:color-mix(in oklab,var(--primary) 10%,transparent);color:var(--primary);border-color:color-mix(in oklab,var(--primary) 25%,transparent)">Live</span>') + '</div>' +
      '<ol class="timeline" aria-label="Order progress">' + STEPS.map((st, i) => { const cls = i < idx || (i === idx && o.status === "served") ? "done" : i === idx ? "now done" : ""; return '<li class="' + cls + '"' + (i === idx ? ' aria-current="step"' : "") + '><span class="node">' + (i === 0 ? I.check : i === 1 ? I.flame : I.bell) + '</span><div><h4>' + st.t + '</h4><p>' + st.d + '</p></div><time>' + (o.times && o.times[st.k] ? fmtT(o.times[st.k]) : "") + '</time></li>'; }).join("") + '</ol>' +
      '<div class="items">' + o.lines.map(l => '<div class="it"><span class="qx num">' + l.qty + '×</span><div>' + esc(l.name) + (l.labels.length ? '<small>' + esc(l.labels.join(" · ")) + '</small>' : "") + '</div><span class="a num">' + S.money(l.unit * l.qty) + '</span></div>').join("") +
      (o.note ? '<div class="it" style="color:var(--ink-2)"><span class="qx">✎</span><div>' + esc(o.note) + '</div></div>' : "") + '</div>' +
      '<div class="tot"><span>Total' + (o.charges && o.charges.length ? " incl. taxes" : "") + '</span><span class="num">' + S.money(o.total) + '</span></div></div>' +
      '<div class="actions"><a class="btn btn-primary" href="#menu">Order more</a></div>' +
      (others.length ? '<div class="history"><h3>Earlier at this table</h3>' + others.map(x => '<button onclick="location.hash=\'status/' + x.id + '\'"><span>#' + x.id + ' · ' + x.lines.reduce((a, l) => a + l.qty, 0) + ' items</span><span style="color:var(--ink-3)">' + (x.status[0].toUpperCase() + x.status.slice(1)) + ' ›</span></button>').join("") + '</div>' : "") +
      '<footer class="foot" style="padding-bottom:40px">' + (C.demo ? "Demo, sample menu and prices · " : "") + '<a href="credits.html">Photo credits</a></footer></main>';
    if (!same) window.scrollTo(0, 0);
    if (same && prev.dataset.status && prev.dataset.status !== o.status) toast(o.status === "served" ? "Your order has been served" : "Your order is being prepared");
    app.querySelector(".status").dataset.status = o.status;
  }

  // ---- live sync ----
  S.on((s, src) => {
    if (current === "menu") { drawSections(s); drawCartBar(s, false); drawStatusBar(s); if (sheetOpen && $("#cartBody")) drawCart(); }
    if (current === "status") renderStatus(location.hash.split("/")[1]);
  });
  route();
})();
