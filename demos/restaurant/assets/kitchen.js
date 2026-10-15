(function () {
  const S = Store, C = S.C, esc = S.esc, $ = q => document.querySelector(q);
  S.applyTheme(); $("#rname").textContent = C.name; document.querySelector('nav a[href="kitchen.html"]').classList.add("on");
  $("#reset").onclick = () => { if (confirm("Clear all demo orders?")) S.reset(); };
  const NEXT = { queued: "cooking", cooking: "ready", ready: "served", served: "served" }, LBL = { queued: "New", cooking: "Cooking", ready: "Ready", served: "Served" };
  const age = t => { const m = Math.floor((Date.now() - t) / 60000); return m < 1 ? "just now" : m + " min"; };
  function render(s) {
    const open = s.orders.filter(o => S.orderStatus(o) !== "served");
    const al = s.alerts.filter(a => !a.done && a.type === "waiter");
    $("#alerts").innerHTML = al.map(a => '<div class="al waiter" data-alert="' + a.id + '"><b>Waiter called</b> Table ' + a.table + ' · Seat ' + a.seat + ' <small>' + age(a.at) + '</small></div>').join("");
    const cols = ["queued", "cooking", "ready"];
    $("#board").innerHTML = '<div class="kds">' + cols.map(c => { const os = open.filter(o => S.orderStatus(o) === c);
      return '<section class="col"><h2>' + { queued: "New tickets", cooking: "On the pass", ready: "Ready to serve" }[c] + '<span>' + os.length + '</span></h2>' +
      (os.map(o => '<article class="ticket t-' + c + '" data-order="' + o.id + '"><header><b>T' + o.table + ' · S' + o.seat + '</b><span>' + o.id + '</span><small>' + age(o.at) + '</small></header><ul>' +
        o.lines.map((l, i) => { const it = S.items[l.itemId]; return '<li><button class="ln ls-' + l.status + '" data-o="' + o.id + '" data-i="' + i + '" title="Tap to advance"><span class="q">' + l.qty + '×</span><span class="nm"><span class="vm' + (it.veg ? "" : " nv") + '"></span>' + esc(it.name) + '<small>' + esc(S.lineLabel(l).join(" · ")) + '</small></span><em>' + LBL[l.status] + '</em></button></li>'; }).join("") +
        '</ul>' + (o.note ? '<p class="nt">“' + esc(o.note) + '”</p>' : '') + '<button class="bump" data-bump="' + o.id + '">' + (c === "ready" ? "Mark served" : c === "cooking" ? "All ready" : "Start all") + '</button></article>').join("") || '<p class="empty">No tickets</p>') + '</section>'; }).join("") + '</div>';
  }
  document.addEventListener("click", e => {
    const l = e.target.closest(".ln"); if (l) return S.update(s => { const o = s.orders.find(x => x.id === l.dataset.o); const ln = o.lines[l.dataset.i]; ln.status = NEXT[ln.status]; });
    const b = e.target.closest("[data-bump]"); if (b) return S.update(s => { const o = s.orders.find(x => x.id === b.dataset.bump); const st = S.orderStatus(o); const to = st === "queued" ? "cooking" : st === "cooking" ? "ready" : "served"; o.lines.forEach(x => { if (x.status !== "served") x.status = to; }); });
    const a = e.target.closest("[data-alert]"); if (a) S.update(s => { s.alerts.find(x => x.id === a.dataset.alert).done = true; });
  });
  S.on(render); render(S.read()); document.addEventListener("visibilitychange", () => render(S.read())); setInterval(() => render(S.read()), 30000);
})();
