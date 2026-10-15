(function () {
  const S = window.Store, C = S.C, $ = q => document.querySelector(q);
  S.applyTheme(); document.title = C.name + " · Kitchen dashboard";
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const I = {
    bell: '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 1 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>',
    mute: '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8.7 3A6 6 0 0 1 18 8c0 2.9.6 4.9 1.3 6.3M17 17H3s3-2 3-9a4.67 4.67 0 0 1 .3-1.7"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0M2 2l20 20"/></svg>',
    box: '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 8 12 3 3 8v8l9 5 9-5z"/><path d="M3 8l9 5 9-5M12 13v8"/></svg>',
    reset: '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/></svg>',
    clock: '<svg class="ico" style="width:14px;height:14px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
    x: '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"/></svg>'
  };
  const PREF = S.KEY + ":dash";
  const pref = Object.assign({ muted: false, filter: "received" }, JSON.parse(localStorage.getItem(PREF) || "{}"));
  const savePref = () => localStorage.setItem(PREF, JSON.stringify(pref));
  let ctx = null, soundReady = false;
  const seen = new Set(S.read().orders.map(o => o.id)); const fresh = new Set();

  function chime() {
    if (!ctx || pref.muted || ctx.state !== "running") return;
    const t = ctx.currentTime;
    [[880, 0], [1318.5, .14]].forEach(([f, d]) => {
      const o = ctx.createOscillator(), g = ctx.createGain();
      o.type = "sine"; o.frequency.value = f; o.connect(g); g.connect(ctx.destination);
      g.gain.setValueAtTime(0, t + d); g.gain.linearRampToValueAtTime(.22, t + d + .015); g.gain.exponentialRampToValueAtTime(.0001, t + d + .55);
      o.start(t + d); o.stop(t + d + .6);
    });
  }
  function enableSound() {
    try { ctx = ctx || new (window.AudioContext || window.webkitAudioContext)(); ctx.resume(); soundReady = true; pref.muted = false; savePref(); chime(); } catch (e) { soundReady = false; }
    render();
  }
  function toast(m) { const t = $("#toast"); t.textContent = m; t.classList.add("on"); clearTimeout(toast.t); toast.t = setTimeout(() => t.classList.remove("on"), 2000); }
  const ago = ms => { const s = Math.floor((Date.now() - ms) / 1000); if (s < 45) return "just now"; const m = Math.floor(s / 60); if (m < 60) return (m || 1) + " min ago"; return Math.floor(m / 60) + "h " + (m % 60) + "m ago"; };

  document.getElementById("dash").innerHTML =
    '<header class="top"><div class="in"><div class="brand"><div class="mono">' + esc(C.logoMark) + '</div><div><b>' + esc(C.wordmark) + '</b><small>Kitchen dashboard</small></div></div>' +
    '<span class="live"><i></i>Live</span>' + (C.demo ? '<span class="demo">Demo</span>' : "") + '<span class="sp"></span>' +
    '<button class="tbtn" id="mute"></button><button class="tbtn" id="stockBtn" aria-haspopup="dialog">' + I.box + '<span class="lbl">Menu &amp; stock</span></button>' +
    '<button class="tbtn" id="reset" title="Reset demo data">' + I.reset + '<span class="lbl">Reset demo</span></button></div>' +
    '<div class="sub"><div class="filters" role="group" aria-label="Filter orders" id="filters"></div><div class="stats" id="stats"></div></div></header>' +
    '<div class="sound" id="soundBox"></div><main><div class="grid" id="grid" aria-live="polite"></div></main>' +
    '<div class="scrim" id="scrim"></div><aside class="drawer" id="drawer" role="dialog" aria-modal="true" aria-labelledby="dtitle"><header><h2 id="dtitle">Menu &amp; stock</h2><button class="x" id="dx" aria-label="Close">' + I.x + '</button></header>' +
    '<div class="search"><input id="ds" type="search" placeholder="Search items…" aria-label="Search items"></div><div class="body" id="dbody"></div></aside>';

  $("#mute").onclick = () => { if (!soundReady) return enableSound(); pref.muted = !pref.muted; savePref(); render(); toast(pref.muted ? "Sound muted" : "Sound on"); if (!pref.muted) chime(); };
  $("#reset").onclick = () => { if (confirm("Reset all demo orders, carts and stock?")) { S.reset(); seen.clear(); fresh.clear(); toast("Demo data reset"); } };
  $("#filters").onclick = e => { const b = e.target.closest("button"); if (!b) return; pref.filter = b.dataset.f; savePref(); render(); };
  const openDrawer = on => { $("#drawer").classList.toggle("on", on); $("#scrim").classList.toggle("on", on); if (on) setTimeout(() => $("#ds").focus(), 50); else $("#stockBtn").focus(); };
  $("#stockBtn").onclick = () => openDrawer(true); $("#dx").onclick = () => openDrawer(false); $("#scrim").onclick = () => openDrawer(false);
  document.addEventListener("keydown", e => { if (e.key === "Escape") openDrawer(false); });
  $("#ds").oninput = () => drawStock(S.read());
  $("#dbody").onclick = e => { const b = e.target.closest("[data-sid]"); if (!b) return; const id = b.dataset.sid; let now; S.update(s => { s.stock[id] = s.stock[id] === false; now = s.stock[id]; }); toast(S.items[id].name + (now ? " back in stock" : " marked out of stock")); };
  $("#grid").onclick = e => { const b = e.target.closest("[data-act]"); if (!b) return; const [act, id] = b.dataset.act.split(":");
    S.update(s => { const o = s.orders.find(x => x.id === id); if (!o) return; o.status = act; (o.times ||= {})[act] = Date.now(); }); fresh.delete(id); toast("#" + id + " → " + (act === "preparing" ? "Preparing" : act === "served" ? "Served" : "Received")); };

  function drawStock(s) {
    const q = $("#ds").value.trim().toLowerCase();
    $("#dbody").innerHTML = C.menu.map(c => { const its = c.items.filter(i => !q || i.name.toLowerCase().includes(q)); if (!its.length) return "";
      return '<h3>' + esc(c.name) + '</h3>' + its.map(i => { const on = s.stock[i.id] !== false; return '<div class="srow' + (on ? "" : " off") + '"><span class="vm' + (i.veg ? "" : " nv") + '"></span><span class="n">' + esc(i.name) + '<small>' + S.money(i.price) + (on ? "" : " · Out of stock") + '</small></span><button class="sw" role="switch" aria-checked="' + on + '" aria-label="' + esc(i.name) + ' in stock" data-sid="' + i.id + '"></button></div>'; }).join(""); }).join("");
  }
  function render() {
    const s = S.read();
    s.orders.forEach(o => { if (!seen.has(o.id)) { seen.add(o.id); fresh.add(o.id); chime(); setTimeout(() => { fresh.delete(o.id); const el = document.querySelector('[data-oid="' + o.id + '"]'); el && el.classList.remove('fresh'); }, 8000); } });
    const counts = { received: 0, preparing: 0, served: 0 }; s.orders.forEach(o => counts[o.status]++);
    const F = [["received", "New"], ["preparing", "Preparing"], ["served", "Served"], ["all", "All"]];
    $("#filters").innerHTML = F.map(([k, l]) => '<button data-f="' + k + '" aria-pressed="' + (pref.filter === k) + '">' + l + '<span class="c num' + (k === "received" && counts.received ? " hot" : "") + '">' + (k === "all" ? s.orders.length : counts[k]) + '</span></button>').join("");
    const rev = s.orders.filter(o => o.status === "served").reduce((a, o) => a + o.total, 0);
    const tables = new Set(s.orders.filter(o => o.status !== "served").map(o => o.table));
    $("#stats").innerHTML = '<span><b class="num">' + tables.size + '</b>active tables</span><span><b class="num">' + (counts.received + counts.preparing) + '</b>open orders</span><span><b class="num">' + S.money(rev) + '</b>served today</span>';
    $("#mute").innerHTML = (!soundReady || pref.muted ? I.mute : I.bell) + '<span class="lbl">' + (!soundReady ? "Sound off" : pref.muted ? "Muted" : "Sound on") + '</span>';
    $("#mute").classList.toggle("on", soundReady && !pref.muted); $("#mute").setAttribute("aria-pressed", soundReady && !pref.muted);
    $("#soundBox").innerHTML = soundReady ? "" : '<div class="box">' + I.bell + '<p><b>Turn on new-order alerts.</b> Browsers need one tap before a page can play sound.</p><button class="btn btn-l" id="enable">Enable sound</button></div>';
    if (!soundReady) $("#enable").onclick = enableSound;
    const list = s.orders.filter(o => pref.filter === "all" || o.status === pref.filter);
    const groups = {}; list.forEach(o => (groups[o.table] ||= []).push(o));
    const keys = Object.keys(groups).sort((a, b) => Math.min(...groups[a].map(o => o.placedAt)) - Math.min(...groups[b].map(o => o.placedAt)));
    const label = { received: "New", preparing: "Preparing", served: "Served" };
    $("#grid").innerHTML = keys.length ? keys.map(t => { const os = groups[t].sort((a, b) => a.placedAt - b.placedAt);
      return '<section class="tgroup" aria-label="Table ' + t + '"><header><h2><em>Table</em>' + esc(t) + '</h2><span class="amt num">' + os.length + ' order' + (os.length > 1 ? "s" : "") + ' · ' + S.money(os.reduce((a, o) => a + o.total, 0)) + '</span></header>' +
        os.map(o => { const mins = (Date.now() - o.placedAt) / 60000;
          return '<article class="order' + (fresh.has(o.id) ? " fresh" : "") + '" data-oid="' + o.id + '"><div class="oh"><span class="id">#' + o.id + '</span><span class="st ' + o.status + '">' + label[o.status] + '</span><span class="ago' + (o.status !== "served" && mins > 15 ? " late" : "") + '" data-ago="' + o.placedAt + '">' + I.clock + ago(o.placedAt) + '</span></div>' +
            '<ul class="items">' + o.lines.map(l => '<li><span class="q">' + l.qty + '×</span><span class="vm' + (l.veg ? "" : " nv") + '"></span><span class="n">' + esc(l.name) + (l.labels.length ? '<small>' + esc(l.labels.join(" · ")) + '</small>' : "") + '</span></li>').join("") + '</ul>' +
            (o.note ? '<div class="note">“' + esc(o.note) + '”</div>' : "") +
            (o.status === "received" ? '<div class="acts"><button class="btn btn-p" data-act="preparing:' + o.id + '">Start preparing</button><button class="btn btn-g" data-act="served:' + o.id + '">Served</button></div>'
              : o.status === "preparing" ? '<div class="acts"><button class="btn btn-ok" data-act="served:' + o.id + '">Mark served</button></div>'
              : '<div class="done-l">Served ' + (o.times && o.times.served ? new Date(o.times.served).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }) : "") + ' · ' + S.money(o.total) + '</div>') + '</article>'; }).join("") + '</section>'; }).join("")
      : '<div class="empty"><h3>' + (pref.filter === "received" ? "No new orders" : pref.filter === "all" ? "No orders yet" : "Nothing " + label[pref.filter].toLowerCase()) + '</h3><p>Orders appear here the moment a guest places them. Try it: open <a href="index.html?table=5" target="_blank" rel="noopener">the guest menu for Table 5</a> in another tab.</p></div>';
    if ($("#drawer").classList.contains("on") || !$("#dbody").innerHTML) drawStock(s);
  }
  S.on(() => { render(); drawStock(S.read()); });
  setInterval(() => document.querySelectorAll("[data-ago]").forEach(el => { el.lastChild.textContent = ago(+el.dataset.ago); }), 15000);
  render();
})();
