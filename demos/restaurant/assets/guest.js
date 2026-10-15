(function () {
  const S = Store, C = S.C, esc = S.esc, $ = (q, el = document) => el.querySelector(q);
  S.applyTheme(); document.title = C.name + " · Order at your table (demo)";
  const app = $("#app"), sheet = $("#sheet"), scrim = $("#scrim");
  const qp = new URLSearchParams(location.search);
  const num = (v, max) => { if (v == null) return null; const n = Number(String(v).trim()); return Number.isInteger(n) && n >= 1 && n <= max ? n : NaN; };
  let table = num(qp.get("table"), 99), seat = num(qp.get("seat"), 12);
  const K = () => table + "-" + seat;
  let vegOnly = false, view = "";
  const vm = v => '<span class="vm' + (v ? "" : " nv") + '" role="img" aria-label="' + (v ? "Vegetarian" : "Non-vegetarian") + '"></span>';
  const chili = n => n ? '<span class="spice" aria-label="Spice level ' + n + ' of 3">' + Array.from({ length: 3 }, (_, i) => '<i class="' + (i < n ? "on" : "") + '"></i>').join("") + '</span>' : '<span class="spice mild">Mild</span>';
  const cart = s => s.carts[K()] || [];
  const count = s => cart(s).reduce((a, l) => a + l.qty, 0);
  function toast(m) { const t = $("#toast"); t.textContent = m; t.classList.add("on"); clearTimeout(toast.t); toast.t = setTimeout(() => t.classList.remove("on"), 2400); }
  const head = (back) => '<header class="top">' + (back ? '<a class="ib" href="#" aria-label="Back">‹</a>' : '<span class="mono">' + esc(C.logoMark) + '</span>') + '<div class="tt"><b>' + esc(C.wordmark) + '</b><small>Table ' + table + ' · Seat ' + seat + '</small></div>' + (C.demo ? '<span class="demo">Demo menu</span>' : '') + '</header>';
  const svcBtns = () => '<div class="svc"><button class="ghost" data-call="waiter">Call waiter</button><button class="ghost" data-call="bill">Request bill</button></div>';

  function route() {
    closeSheet();
    if (table == null || seat == null || Number.isNaN(table) || Number.isNaN(seat)) return ask();
    const h = location.hash.slice(1);
    if (h === "menu") return menu();
    if (h === "status") return status();
    if (h === "cart") { menu(); return openCart(); }
    landing();
  }
  addEventListener("hashchange", route);

  function ask() {
    view = "ask";
    app.innerHTML = '<section class="ask"><span class="mono big">' + esc(C.logoMark) + '</span><h1>' + esc(C.name) + '</h1>' +
      ((table !== null && Number.isNaN(table)) || (seat !== null && Number.isNaN(seat)) ? '<p class="err">That table or seat number didn\'t look right. Please check the card on your table.</p>' : '<p>Enter the table and seat number printed on your table card.</p>') +
      '<form id="askf"><label>Table<input id="tno" inputmode="numeric" value="' + (table > 0 ? table : "") + '"></label><label>Seat<input id="sno" inputmode="numeric" value="' + (seat > 0 ? seat : "") + '"></label><button class="gold">Continue</button><p id="terr" class="err" aria-live="polite"></p></form></section>';
    $("#askf").onsubmit = e => { e.preventDefault(); const t = num($("#tno").value, 99), st = num($("#sno").value, 12);
      if (!t || Number.isNaN(t)) return $("#terr").textContent = "Table must be between 1 and 99.";
      if (!st || Number.isNaN(st)) return $("#terr").textContent = "Seat must be between 1 and 12.";
      location.search = "?table=" + t + "&seat=" + st; };
  }

  function landing() {
    view = "landing";
    app.innerHTML = '<section class="landing"><img class="hero" src="' + C.hero + '" alt="An Indian spread of curries, rice and breads (illustrative photo)">' +
      '<div class="veil"></div><div class="lc">' + (C.demo ? '<span class="demo">Demo menu · sample restaurant</span>' : '') +
      '<span class="mono big">' + esc(C.logoMark) + '</span><p class="eyebrow">Welcome to</p><h1>' + esc(C.name) + '</h1><p class="tag">' + esc(C.tagline) + '</p>' +
      '<div class="seatcard"><div><small>Table</small><b id="tbl">' + table + '</b></div><span></span><div><small>Seat</small><b id="seat">' + seat + '</b></div></div>' +
      '<a class="gold wide" id="viewMenu" href="#menu">View menu &amp; order</a>' + svcBtns() +
      '<a class="mine" href="#status">My orders</a></div></section>';
  }

  function card(it) {
    return '<article class="card" data-id="' + it.id + '"><img src="' + it.image + '" alt="' + esc(it.name) + '" loading="lazy">' +
      '<div class="cb"><div class="cn">' + vm(it.veg) + '<h3>' + esc(it.name) + '</h3></div><p>' + esc(it.description) + '</p>' +
      '<div class="cf"><span class="pr">' + (it.portions ? '<small>Half / Full</small> ' + S.money(it.portions[0].price) + ' / ' + S.money(it.portions[1].price) : S.money(it.price)) + '</span>' + chili(it.spice) + '</div>' +
      '<button class="add" data-add="' + it.id + '" aria-label="Add ' + esc(it.name) + '">Add</button></div></article>';
  }
  function menu() {
    view = "menu";
    const cats = C.menu.map(c => ({ c, items: c.items.filter(i => !vegOnly || i.veg) })).filter(x => x.items.length);
    app.innerHTML = head(true) + '<nav class="tabs" id="tabs">' + cats.map(x => '<a href="#menu" data-cat="' + x.c.id + '">' + esc(x.c.name) + '</a>').join("") + '</nav>' +
      '<div class="tools"><label class="tog"><input type="checkbox" id="veg"' + (vegOnly ? " checked" : "") + '><span></span>Veg only</label><span class="legend">' + vm(true) + 'Veg ' + vm(false) + 'Non-veg</span></div>' +
      '<main class="menu">' + cats.map(x => '<section class="cat" id="c-' + x.c.id + '"><h2>' + esc(x.c.name) + '<small>' + x.items.length + ' dishes</small></h2>' + x.items.map(card).join("") + '</section>').join("") +
      '<p class="foot">Demo menu with sample prices for a fictional restaurant. Photos are illustrative. <a href="credits.html">Photo credits</a></p>' + svcBtns() + '</main>' +
      '<button class="cartbar" id="cartbtn" hidden></button>';
    $("#veg").onchange = e => { vegOnly = e.target.checked; menu(); };
    app.querySelectorAll("[data-cat]").forEach(a => a.onclick = e => { e.preventDefault(); $("#c-" + a.dataset.cat).scrollIntoView({ behavior: "smooth" }); });
    paintCart(S.read());
  }
  function paintCart(s) { const b = $("#cartbtn"); if (!b) return; const n = count(s); b.hidden = !n; b.innerHTML = '<span>' + n + ' item' + (n > 1 ? "s" : "") + '</span><b>View cart · ' + S.money(S.totals(cart(s)).sub) + '</b>'; }

  function openSheet(html) { sheet.innerHTML = html; sheet.hidden = false; scrim.hidden = false; requestAnimationFrame(() => sheet.classList.add("on")); }
  function closeSheet() { sheet.classList.remove("on"); sheet.hidden = true; scrim.hidden = true; }
  scrim.onclick = closeSheet;

  function openItem(id) {
    const it = S.items[id]; let portion = it.portions ? "full" : null, addons = [], qty = 1;
    const price = () => S.unit({ itemId: id, portion, addons }) * qty;
    openSheet('<button class="x" data-close aria-label="Close">×</button><img class="shimg" src="' + it.image + '" alt="' + esc(it.name) + '"><div class="shb"><div class="cn">' + vm(it.veg) + '<h2 id="sheetTitle">' + esc(it.name) + '</h2></div><p>' + esc(it.description) + '</p>' + chili(it.spice) +
      (it.portions ? '<fieldset class="grp"><legend>Portion <em>Required</em></legend>' + it.portions.map(p => '<label class="opt"><input type="radio" name="portion" value="' + p.id + '"' + (p.id === portion ? " checked" : "") + '><span>' + p.name + '</span><b>' + S.money(p.price) + '</b></label>').join("") + '</fieldset>' : '') +
      (it.addons || []).map(g => '<fieldset class="grp"><legend>' + esc(g.name) + ' <em>Optional</em></legend>' + g.options.map(o => '<label class="opt"><input type="checkbox" name="addon" value="' + o.id + '"><span>' + esc(o.name) + '</span><b>' + (o.price ? "+" + S.money(o.price) : "Free") + '</b></label>').join("") + '</fieldset>').join("") +
      '<div class="qtyrow"><div class="qty"><button data-q="-1" aria-label="Less">−</button><b id="qty">1</b><button data-q="1" aria-label="More">+</button></div><button class="gold" id="addbtn"></button></div></div>');
    const paint = () => { $("#qty").textContent = qty; $("#addbtn").textContent = "Add · " + S.money(price()); };
    sheet.querySelectorAll('input[name=portion]').forEach(r => r.onchange = () => { portion = r.value; paint(); });
    sheet.querySelectorAll('input[name=addon]').forEach(r => r.onchange = () => { addons = [...sheet.querySelectorAll('input[name=addon]:checked')].map(x => x.value); paint(); });
    sheet.querySelectorAll("[data-q]").forEach(b => b.onclick = () => { qty = Math.max(1, Math.min(20, qty + Number(b.dataset.q))); paint(); });
    $("#addbtn").onclick = () => { S.update(s => { const c = s.carts[K()] ||= []; const sig = id + "|" + portion + "|" + addons.slice().sort().join(","); const ex = c.find(l => l.sig === sig); ex ? ex.qty += qty : c.push({ sig, itemId: id, portion, addons, qty }); }); closeSheet(); toast(it.name + " added"); };
    paint();
  }

  function openCart() {
    const s = S.read(), c = cart(s);
    if (!c.length) { closeSheet(); return toast("Your cart is empty"); }
    const t = S.totals(c);
    openSheet('<button class="x" data-close aria-label="Close">×</button><div class="shb"><h2>Your order</h2><p class="muted">Table ' + table + ' · Seat ' + seat + '</p><ul class="lines">' + c.map((l, i) => { const it = S.items[l.itemId]; return '<li>' + vm(it.veg) + '<div><b>' + esc(it.name) + '</b><small>' + esc(S.lineLabel(l).join(" · ")) + '</small></div><div class="qty sm"><button data-l="' + i + '" data-d="-1" aria-label="Less">−</button><b>' + l.qty + '</b><button data-l="' + i + '" data-d="1" aria-label="More">+</button></div><span class="lp">' + S.money(S.unit(l) * l.qty) + '</span></li>'; }).join("") + '</ul>' +
      '<label class="note">Note for the kitchen<textarea id="note" maxlength="140" placeholder="e.g. less oil, no coriander"></textarea></label>' +
      '<dl class="tot"><dt>Subtotal</dt><dd>' + S.money(t.sub) + '</dd>' + t.ch.map(x => '<dt>' + x.label + '</dt><dd>' + S.money(x.amount) + '</dd>').join("") + '<dt class="g">Total</dt><dd class="g">' + S.money(t.total) + '</dd></dl>' +
      '<button class="gold wide" id="place">Send order to kitchen</button><p class="muted c">Demo: no payment is taken. Your bill is settled with staff.</p></div>');
    sheet.querySelectorAll("[data-l]").forEach(b => b.onclick = () => { S.update(s => { const c = s.carts[K()]; const l = c[b.dataset.l]; l.qty += Number(b.dataset.d); if (l.qty < 1) c.splice(b.dataset.l, 1); }); openCart(); });
    $("#place").onclick = () => { const note = $("#note").value.trim(); let id;
      S.update(s => { const c = s.carts[K()] || []; if (!c.length) return; id = C.orderPrefix + (++s.seq);
        s.orders.push({ id, table, seat, note, at: Date.now(), paid: false, lines: c.map(l => ({ itemId: l.itemId, portion: l.portion, addons: l.addons, qty: l.qty, status: "queued" })) }); s.carts[K()] = []; });
      closeSheet(); location.hash = "status"; toast("Order " + id + " sent to the kitchen"); };
  }

  const LBL = { queued: "Received", cooking: "Being cooked", ready: "Ready to serve", served: "Served" };
  function status() {
    view = "status";
    const s = S.read(), mine = s.orders.filter(o => o.table === table && o.seat === seat && !o.paid);
    const al = s.alerts.filter(a => !a.done && a.table === table && a.seat === seat);
    const all = mine.flatMap(o => o.lines), t = S.totals(all);
    app.innerHTML = head(true) + '<main class="status"><h1>My orders</h1>' +
      (al.length ? '<div class="pending">' + al.map(a => '<p>' + (a.type === "bill" ? "Bill requested. Staff will bring it to your table." : "A waiter has been called to your table.") + '</p>').join("") + '</div>' : '') +
      (mine.length ? mine.slice().reverse().map(o => { const st = S.orderStatus(o); return '<article class="ord" data-order="' + o.id + '"><header><b>' + o.id + '</b><span class="st st-' + st + '">' + LBL[st] + '</span></header>' +
        '<ol class="steps">' + ["queued", "cooking", "ready", "served"].map((k, i, a) => '<li class="' + (a.indexOf(st) >= i ? "done" : "") + '">' + LBL[k] + '</li>').join("") + '</ol>' +
        '<ul>' + o.lines.map(l => { const it = S.items[l.itemId]; return '<li>' + vm(it.veg) + '<span>' + l.qty + '× ' + esc(it.name) + '<small>' + esc(S.lineLabel(l).join(" · ")) + '</small></span><em class="st st-' + l.status + '">' + LBL[l.status] + '</em></li>'; }).join("") + '</ul>' + (o.note ? '<p class="muted">Note: ' + esc(o.note) + '</p>' : '') + '</article>'; }).join("") +
        '<div class="runbill"><span>Seat ' + seat + ' running total</span><b>' + S.money(t.total) + '</b><small>incl. ' + t.ch.map(x => x.label).join(", ") + '</small></div>'
        : '<p class="muted">No open orders for this seat yet.</p>') +
      '<a class="gold wide" href="#menu">Order more</a>' + svcBtns() + '</main>';
  }

  document.addEventListener("click", e => {
    const a = e.target.closest("[data-add]"); if (a) return openItem(a.dataset.add);
    const cd = e.target.closest(".card"); if (cd && !e.target.closest("button")) return openItem(cd.dataset.id);
    if (e.target.closest("[data-close]")) return closeSheet();
    if (e.target.closest("#cartbtn")) return openCart();
    const bk = e.target.closest(".ib"); if (bk) { e.preventDefault(); location.hash = view === "menu" ? "" : "menu"; return; }
    const c = e.target.closest("[data-call]"); if (c) { S.alert(table, seat, c.dataset.call); toast(c.dataset.call === "bill" ? "Bill requested. Staff will bring it shortly." : "Waiter called. Someone will be with you shortly."); if (view === "status") status(); }
  });
  addEventListener("keydown", e => { if (e.key === "Escape") closeSheet(); });
  S.on((s, src) => { if (view === "menu") paintCart(s); if (view === "status" && sheet.hidden) status(); });
  route();
})();
