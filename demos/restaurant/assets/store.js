/* Shared state + live sync for guest, kitchen and billing (BroadcastChannel + localStorage 'storage' fallback). No backend. */
(function () {
  const C = window.REST_CONFIG, KEY = "rdemo:" + C.id + ":v1", listeners = new Set();
  let bc = null; try { bc = new BroadcastChannel(KEY); } catch (e) {}
  const fresh = () => ({ v: 1, orders: [], carts: {}, alerts: [], seq: 100, aseq: 1 });
  function read() { try { const s = JSON.parse(localStorage.getItem(KEY)); if (s && s.v === 1) return s; } catch (e) {} const f = fresh(); localStorage.setItem(KEY, JSON.stringify(f)); return f; }
  function emit(src) { const s = read(); listeners.forEach(fn => { try { fn(s, src); } catch (e) { console.error(e); } }); }
  function update(m) { const s = read(); m(s); s.updatedAt = Date.now(); localStorage.setItem(KEY, JSON.stringify(s)); if (bc) bc.postMessage(s.updatedAt); emit("local"); return s; }
  if (bc) bc.onmessage = () => emit("remote");
  addEventListener("storage", e => { if (e.key === KEY) emit("remote"); });
  const items = {}; C.menu.forEach(c => c.items.forEach(i => items[i.id] = Object.assign({ category: c.id }, i)));
  const money = n => C.currency.symbol + Math.round(n).toLocaleString(C.currency.locale);
  const basePrice = (it, portion) => it.portions ? (it.portions.find(p => p.id === portion) || it.portions[0]).price : it.price;
  const fromPrice = it => it.portions ? Math.min(...it.portions.map(p => p.price)) : it.price;
  function unit(l) { const it = items[l.itemId]; if (!it) return 0; let p = basePrice(it, l.portion); (it.addons || []).forEach(g => g.options.forEach(o => { if ((l.addons || []).includes(o.id)) p += o.price; })); return p; }
  function lineLabel(l) { const it = items[l.itemId]; const out = []; if (it.portions) out.push((it.portions.find(p => p.id === l.portion) || {}).name); (it.addons || []).forEach(g => g.options.forEach(o => { if ((l.addons || []).includes(o.id)) out.push(o.name); })); return out.filter(Boolean); }
  function totals(lines) { const sub = lines.reduce((a, l) => a + unit(l) * l.qty, 0); const ch = (C.charges || []).map(c => ({ label: c.label + " " + c.percent + "%", amount: sub * c.percent / 100 })); return { sub, ch, total: sub + ch.reduce((a, c) => a + c.amount, 0) }; }
  function orderStatus(o) { const st = o.lines.map(l => l.status); if (st.every(x => x === "served")) return "served"; if (st.every(x => x === "ready" || x === "served")) return "ready"; if (st.some(x => x !== "queued")) return "cooking"; return "queued"; }
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  function applyTheme() { const r = document.documentElement.style, k = C.colors; r.setProperty("--gold", k.primary); r.setProperty("--wine", k.accent); r.setProperty("--bg", k.background); r.setProperty("--surface", k.surface); r.setProperty("--ink", k.text); }
  function alert(table, seat, type) { return update(s => { if (s.alerts.some(a => !a.done && a.table === table && a.seat === seat && a.type === type)) return; s.alerts.push({ id: "A" + (s.aseq++), table, seat, type, at: Date.now(), done: false }); }); }
  window.Store = { C, KEY, read, update, on: f => listeners.add(f), reset: () => update(s => Object.assign(s, fresh())), items, money, basePrice, fromPrice, unit, lineLabel, totals, orderStatus, esc, applyTheme, alert };
})();
