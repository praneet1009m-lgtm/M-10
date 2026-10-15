/* M10 portfolio v4 (manga theme): no dependencies */
(function () {
  'use strict';

  // TODO(Praneet): add your WhatsApp number (digits only, with country code, e.g. '9198XXXXXXXX').
  // While empty, the WhatsApp button stays disabled and shows "TODO: number".
  var WHATSAPP_NUMBER = '917249364351';
  var EMAIL = 'praneetkamble051112@gmail.com';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  /* Mobile nav */
  var toggle = $('#navToggle'), menu = $('#navMenu');
  function setMenu(open) { toggle.setAttribute('aria-expanded', String(open)); menu.classList.toggle('is-open', open); }
  toggle.addEventListener('click', function () { setMenu(toggle.getAttribute('aria-expanded') !== 'true'); });
  $$('a', menu).forEach(function (a) { a.addEventListener('click', function () { setMenu(false); }); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && menu.classList.contains('is-open')) { setMenu(false); toggle.focus(); }
  });

  /* Stagger: index siblings inside groups so they reveal one after another */
  ['.cards', '.services', '.extras', '.faq', '.stats', '.hero__copy', '.about__copy', '.contact__grid'].forEach(function (sel) {
    $$(sel).forEach(function (g) {
      var i = 0;
      Array.prototype.forEach.call(g.children, function (el) { if (el.classList.contains('reveal')) { el.style.setProperty('--i', String(i % 6)); i++; } });
    });
  });

  /* Reveal on scroll */
  var reveals = $$('.reveal');
  if ('IntersectionObserver' in window && !reduceMotion) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); } });
    }, { rootMargin: '0px 0px -6% 0px', threshold: 0.06 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('is-in'); });
  }

  /* Current section in nav */
  var navLinks = $$('.nav__menu a[href^="#"]:not(.btn)');
  if ('IntersectionObserver' in window) {
    var secIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        navLinks.forEach(function (a) {
          var on = a.getAttribute('href') === '#' + en.target.id;
          a.classList.toggle('is-current', on);
          if (on) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    ['home', 'about', 'projects', 'services', 'contact'].forEach(function (id) { var el = document.getElementById(id); if (el) secIO.observe(el); });
  }

  /* Honest stats: recount from the cards actually on the page */
  var cards = $$('.card');
  var setCount = function (sel, n) { $$(sel).forEach(function (el) { el.textContent = String(n); }); };
  setCount('[data-count="projects"]', cards.length);
  setCount('[data-count="demos"]', $$('.card[data-demo]').length);
  setCount('[data-chip-count="all"]', cards.length);
  ['ai', 'web', 'local'].forEach(function (c) { setCount('[data-chip-count="' + c + '"]', $$('.card[data-cat="' + c + '"]').length); });

  /* Animated counters: count up to the real number already in the DOM */
  var counters = $$('.stat strong[data-count]');
  function runCounter(el) {
    var target = parseInt(el.textContent, 10) || 0, t0 = null, dur = 1100;
    if (reduceMotion || !target) return;
    el.textContent = '0';
    function step(t) {
      if (t0 === null) t0 = t;
      var k = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - k, 3);
      el.textContent = String(Math.round(target * e));
      if (k < 1) requestAnimationFrame(step); else el.textContent = String(target);
    }
    requestAnimationFrame(step);
  }
  if ('IntersectionObserver' in window && !reduceMotion) {
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { runCounter(en.target); cio.unobserve(en.target); } });
    }, { threshold: 0.6 });
    counters.forEach(function (el) { cio.observe(el); });
  }

  /* Project filters */
  var chips = $$('.chip'), status = $('#filterStatus');
  chips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      var f = chip.getAttribute('data-filter'), shown = 0;
      chips.forEach(function (c) { var on = c === chip; c.classList.toggle('is-active', on); c.setAttribute('aria-pressed', String(on)); });
      cards.forEach(function (card) {
        var show = f === 'all' || card.getAttribute('data-cat') === f;
        card.classList.toggle('is-hidden', !show);
        card.classList.remove('pop');
        if (show) {
          card.classList.add('is-in');
          if (!reduceMotion) { card.style.setProperty('--i', String(shown % 6)); void card.offsetWidth; card.classList.add('pop'); }
          shown++;
        }
      });
      if (status) status.textContent = 'Showing ' + shown + ' project' + (shown === 1 ? '' : 's');
    });
  });

  /* Copy email */
  var copyBtn = $('#copyEmail'), copyStatus = $('#copyStatus');
  function copied(ok) {
    copyStatus.textContent = ok ? 'Copied ✓' : 'Copy failed. Select the address above.';
    copyBtn.textContent = ok ? 'Copied ✓' : 'Copy email';
    setTimeout(function () { copyBtn.textContent = 'Copy email'; copyStatus.textContent = ''; }, 2500);
  }
  function fallbackCopy(text) {
    var ta = document.createElement('textarea');
    ta.value = text; ta.setAttribute('readonly', ''); ta.style.position = 'fixed'; ta.style.opacity = '0';
    document.body.appendChild(ta); ta.select();
    var ok = false; try { ok = document.execCommand('copy'); } catch (e) {}
    document.body.removeChild(ta); return ok;
  }
  copyBtn.addEventListener('click', function () {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(EMAIL).then(function () { copied(true); }, function () { copied(fallbackCopy(EMAIL)); });
    } else { copied(fallbackCopy(EMAIL)); }
  });

  /* WhatsApp: disabled until a number is set */
  var wa = $('#waLink');
  if (WHATSAPP_NUMBER) {
    wa.href = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent('Hi Praneet, I saw your M10 portfolio and would like to talk about a project.');
    wa.target = '_blank'; wa.rel = 'noopener';
    wa.innerHTML = 'WhatsApp <span aria-hidden="true">↗</span><span class="sr-only"> (opens in a new tab)</span>';
    wa.classList.remove('is-disabled'); wa.removeAttribute('aria-disabled'); wa.removeAttribute('tabindex'); wa.removeAttribute('role');
  }

  /* Contact form: opens the visitor's email app (mailto) */
  var form = $('#contactForm'), err = $('#formError');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var F = function (n) { return form.elements.namedItem(n); };
    var name = F('name').value.trim(), email = F('email').value.trim(), msg = F('message').value.trim(), type = F('type').value;
    var bad = [];
    [['name', !name], ['email', !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)], ['message', !msg]].forEach(function (p) {
      F(p[0]).setAttribute('aria-invalid', String(p[1]));
      if (p[1]) bad.push(p[0]);
    });
    if (bad.length) {
      err.textContent = 'Please fill in: ' + bad.map(function (b) { return b === 'email' ? 'a valid email' : 'your ' + b; }).join(', ') + '.';
      F(bad[0]).focus();
      return;
    }
    err.textContent = '';
    var subject = 'Project enquiry: ' + type + ' (from ' + name + ')';
    var body = 'Name: ' + name + '\nEmail: ' + email + '\nNeed: ' + type + '\n\n' + msg;
    var url = 'mailto:' + EMAIL + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
    form.setAttribute('data-mailto', url);
    window.location.href = url;
  });

  var y = $('#year'); if (y) y.textContent = String(new Date().getFullYear());

  /* ---------- v4 motion layer ---------- */
  var finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  var root = document.documentElement;

  /* Scroll progress, nav state, hero + banner parallax (one rAF-throttled handler) */
  var progress = $('#progress'), nav = $('#nav'), panels = $('#heroPanels'), banner = $('.contact__banner img');
  var ticking = false;
  function onScroll() {
    ticking = false;
    var sy = window.scrollY, max = root.scrollHeight - window.innerHeight;
    if (progress) progress.style.setProperty('--p', max > 0 ? (sy / max).toFixed(4) : '0');
    if (nav) nav.classList.toggle('is-scrolled', sy > 20);
    if (reduceMotion) return;
    if (panels && sy < window.innerHeight * 1.2) {
      $$('.mpanel', panels).forEach(function (p) {
        var d = parseFloat(p.getAttribute('data-depth') || '1');
        p.style.setProperty('--iy', (sy * 0.025 * d).toFixed(1) + 'px');
      });
    }
    if (banner) {
      var r = banner.getBoundingClientRect();
      if (r.bottom > 0 && r.top < window.innerHeight) {
        var c = (r.top + r.height / 2 - window.innerHeight / 2) / window.innerHeight;
        banner.style.setProperty('--bp', (c * -26).toFixed(1) + 'px');
      }
    }
  }
  window.addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  onScroll();

  if (!reduceMotion && finePointer) {
    /* Hero panels follow the pointer at different depths */
    var hero = $('#home');
    if (hero && panels) {
      hero.addEventListener('pointermove', function (e) {
        var r = hero.getBoundingClientRect();
        var nx = (e.clientX - r.left) / r.width - 0.5, ny = (e.clientY - r.top) / r.height - 0.5;
        $$('.mpanel', panels).forEach(function (p) {
          var d = parseFloat(p.getAttribute('data-depth') || '1');
          p.style.setProperty('--px', (nx * -6 * d).toFixed(1) + 'px');
          p.style.setProperty('--py', (ny * -6 * d).toFixed(1) + 'px');
          p.style.setProperty('--ix', (nx * 10 * d).toFixed(1) + 'px');
        });
        panels.style.transform = 'rotate(.6deg) rotateY(' + (nx * 5).toFixed(2) + 'deg) rotateX(' + (ny * -4).toFixed(2) + 'deg)';
      });
      hero.addEventListener('pointerleave', function () {
        $$('.mpanel', panels).forEach(function (p) { p.style.setProperty('--px', '0px'); p.style.setProperty('--py', '0px'); p.style.setProperty('--ix', '0px'); });
        panels.style.transform = '';
      });
    }

    /* Magnetic buttons and chips + ink fill origin */
    $$('.btn:not(.is-disabled), .chip, .footer__top').forEach(function (b) {
      b.addEventListener('pointermove', function (e) {
        var r = b.getBoundingClientRect();
        var x = e.clientX - r.left, y = e.clientY - r.top;
        b.style.setProperty('--bx', x + 'px'); b.style.setProperty('--by', y + 'px');
        b.style.setProperty('--mx', ((x - r.width / 2) * 0.22).toFixed(1) + 'px');
        b.style.setProperty('--my', ((y - r.height / 2) * 0.3).toFixed(1) + 'px');
      });
      b.addEventListener('pointerleave', function () { b.style.setProperty('--mx', '0px'); b.style.setProperty('--my', '0px'); });
    });

    /* Card + service tilt with glare */
    $$('.card').forEach(function (c) {
      var g = document.createElement('span'); g.className = 'card__glare'; g.setAttribute('aria-hidden', 'true'); c.appendChild(g);
    });
    $$('.card, .svc').forEach(function (c) {
      var max = c.classList.contains('card') ? 7 : 4;
      c.addEventListener('pointermove', function (e) {
        var r = c.getBoundingClientRect();
        var nx = (e.clientX - r.left) / r.width, ny = (e.clientY - r.top) / r.height;
        c.style.setProperty('--ry', ((nx - 0.5) * max).toFixed(2) + 'deg');
        c.style.setProperty('--rx', ((0.5 - ny) * max).toFixed(2) + 'deg');
        c.style.setProperty('--gx', (nx * 100).toFixed(1) + '%');
        c.style.setProperty('--gy', (ny * 100).toFixed(1) + '%');
      });
      c.addEventListener('pointerleave', function () { c.style.setProperty('--rx', '0deg'); c.style.setProperty('--ry', '0deg'); });
    });

    /* Custom cursor ring (decorative; native cursor is kept) */
    var cur = $('#cursor');
    if (cur) {
      document.addEventListener('pointermove', function (e) {
        if (e.pointerType !== 'mouse') return;
        root.classList.add('has-cursor');
        cur.style.setProperty('--cx', e.clientX + 'px'); cur.style.setProperty('--cy', e.clientY + 'px');
        var hot = e.target.closest && e.target.closest('a, button, summary, .card, input, select, textarea, label');
        cur.classList.toggle('is-hot', !!hot);
      }, { passive: true });
      document.addEventListener('pointerleave', function () { root.classList.remove('has-cursor'); });
    }
  }

  /* Ink splash on button press */
  if (!reduceMotion) {
    document.addEventListener('pointerdown', function (e) {
      var t = e.target.closest && e.target.closest('.btn:not(.is-disabled), .chip, .footer__top');
      if (!t) return;
      var s = document.createElement('span'); s.className = 'splash'; s.setAttribute('aria-hidden', 'true');
      s.style.left = e.clientX + 'px'; s.style.top = e.clientY + 'px';
      for (var i = 0; i < 9; i++) {
        var a = (Math.PI * 2 * i) / 9 + Math.random() * 0.5, d = 26 + Math.random() * 26;
        var dot = document.createElement('i');
        dot.style.setProperty('--tx', (Math.cos(a) * d).toFixed(1) + 'px');
        dot.style.setProperty('--ty', (Math.sin(a) * d).toFixed(1) + 'px');
        var sz = (4 + Math.random() * 7).toFixed(1) + 'px'; dot.style.width = sz; dot.style.height = sz;
        s.appendChild(dot);
      }
      document.body.appendChild(s);
      setTimeout(function () { s.remove(); }, 700);
    });
  }
})();
