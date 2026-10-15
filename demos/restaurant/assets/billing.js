(function () {
  const S = Store, C = S.C, esc = S.esc, $ = q => document.querySelector(q);
  S.applyTheme(); $("#rname").textContent = C.name; document.querySelector('nav a[href="billing.html"]').classList.add("on");
  $("#reset").onclick = () => { if (confirm("Clear all demo orders?")) S.reset(); };
  const age = t => { const m = Math.floor((Date.now() - t) / 60000); return m < 1 ? "just now" : m + " min ago"; };
  function render(s) {
    const al = s.alerts.filter(a => !a.done);
    $("#alerts").innerHTML = al.map(a => '<div class="al ' + a.type + '" data-type="' + a.type + '"><b>' + (a.type === "bill" ? "Bill requested" : "Waiter called") + '</b> Table ' + a.table + ' · Seat ' + a.seat + ' <small>' + age(a.at) + '</small><button class="sm" data-ack="' + a.id + '">Acknowledge</button></div>').join("");
    const tables = [...new Set(s.orders.filter(o => !o.paid).map(o => o.table))].sort((a, b) => a - b);
    const paidToday = s.orders.filter(o => o.paid);
    $("#board").innerHTML = '<div class="bills">' + (tables.map(t => {
      const os = s.orders.filter(o => o.table === t && !o.paid), seats = [...new Set(os.map(o => o.seat))].sort((a, b) => a - b);
      const all = S.totals(os.flatMap(o => o.lines)), billReq = al.some(a => a.table === t && a.type === "bill");
      return '<article class="bill' + (billReq ? " req" : "") + '" data-table="' + t + '"><header><h2>Table ' + t + '</h2>' + (billReq ? '<span class="flag">Bill requested</span>' : '') + '<small>' + os.length + ' order' + (os.length > 1 ? "s" : "") + '</small></header>' +
        seats.map(se => { const lines = os.filter(o => o.seat === se).flatMap(o => o.lines), tt = S.totals(lines);
          return '<section class="seatb" data-seat="' + se + '"><h3>Seat ' + se + '<b>' + S.money(tt.total) + '</b></h3><ul>' + lines.map(l => '<li><span>' + l.qty + '× ' + esc(S.items[l.itemId].name) + '<small>' + esc(S.lineLabel(l).join(" · ")) + '</small></span><span>' + S.money(S.unit(l) * l.qty) + '</span></li>').join("") + '</ul></section>'; }).join("") +
        '<dl><dt>Subtotal</dt><dd>' + S.money(all.sub) + '</dd>' + all.ch.map(c => '<dt>' + c.label + '</dt><dd>' + S.money(c.amount) + '</dd>').join("") + '<dt class="g">Table total</dt><dd class="g tot">' + S.money(all.total) + '</dd></dl>' +
        '<button class="pay" data-pay="' + t + '">Mark table ' + t + ' as paid</button></article>'; }).join("") || '<p class="empty">No open bills. New orders from guests appear here live.</p>') + '</div>' +
      (paidToday.length ? '<p class="paidnote">' + paidToday.length + ' order(s) settled in this demo session.</p>' : '');
  }
  document.addEventListener("click", e => {
    const a = e.target.closest("[data-ack]"); if (a) return S.update(s => { s.alerts.find(x => x.id === a.dataset.ack).done = true; });
    const p = e.target.closest("[data-pay]"); if (p) { const t = Number(p.dataset.pay); S.update(s => { s.orders.forEach(o => { if (o.table === t) o.paid = true; }); s.alerts.forEach(x => { if (x.table === t) x.done = true; }); }); }
  });
  S.on(render); render(S.read()); document.addEventListener("visibilitychange", () => render(S.read())); setInterval(() => render(S.read()), 30000);
})();
