(function () {
  var nav = document.querySelector('nav'), burger = document.querySelector('.burger'), btn = document.querySelector('.lang');
  document.getElementById('year').textContent = new Date().getFullYear();
  burger.addEventListener('click', function () {
    var o = nav.classList.toggle('open'); burger.setAttribute('aria-expanded', o);
  });
  nav.addEventListener('click', function (e) { if (e.target.tagName === 'A') nav.classList.remove('open'); });
  function setLang(l) {
    document.documentElement.lang = l;
    document.querySelectorAll('[data-fr]').forEach(function (el) { el.innerHTML = el.getAttribute('data-' + l); });
    btn.textContent = l === 'fr' ? 'EN' : 'FR';
    try { localStorage.setItem('lang', l); } catch (e) {}
  }
  var saved = 'fr'; try { saved = localStorage.getItem('lang') || 'fr'; } catch (e) {}
  if (saved === 'en') setLang('en');
  btn.addEventListener('click', function () { setLang(document.documentElement.lang === 'fr' ? 'en' : 'fr'); });
})();

(function () {
  var f = document.getElementById('contact-form'); if (!f) return;
  var st = f.querySelector('.form-status'), b = f.querySelector('button');
  var T = {
    fr: { sending: 'Envoi en cours…', ok: 'Message envoyé. Je vous réponds sous 48 h.', invalid: 'Remplissez votre nom, un email valide et votre message.', err: 'Envoi impossible. Écrivez-moi directement à rcyberfreelancermg@gmail.com.' },
    en: { sending: 'Sending…', ok: 'Message sent. I will reply within 48 hours.', invalid: 'Please enter your name, a valid email and your message.', err: 'Could not send. Please email me directly at rcyberfreelancermg@gmail.com.' }
  };
  function say(k, c) { var l = document.documentElement.lang === 'en' ? 'en' : 'fr'; st.textContent = T[l][k]; st.className = 'form-status ' + (c || ''); }
  f.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!f.checkValidity()) { say('invalid', 'err'); return; }
    b.disabled = true; say('sending');
    fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(Object.fromEntries(new FormData(f)))
    }).then(function (r) { return r.json(); }).then(function (d) {
      if (d.success) { f.reset(); say('ok', 'ok'); } else { say('err', 'err'); }
    }).catch(function () { say('err', 'err'); }).then(function () { b.disabled = false; });
  });
})();

/* Navigation de page en page au défilement (next / prev) */
(function () {
  var ORDER = ['index', 'services', 'projects', 'experience', 'skills', 'contact'];
  var name = location.pathname.split('/').pop().replace(/\.html$/, '') || 'index';
  var i = ORDER.indexOf(name); if (i < 0) return;
  var next = i < ORDER.length - 1 ? ORDER[i + 1] + '.html' : null;   // pas de next sur contact
  var prev = i > 0 ? (i === 1 ? 'index.html' : ORDER[i - 1] + '.html') : null; // pas de prev sur index
  var de = document.documentElement, nav = document.querySelector('nav');

  // arrivée via "prev" : on se place en bas de la page précédente
  try {
    if (sessionStorage.getItem('goto') === 'bottom') {
      sessionStorage.removeItem('goto');
      window.scrollTo({ top: de.scrollHeight, behavior: 'instant' });
    }
  } catch (e) {}

  function atTop() { return window.scrollY <= 1; }
  function atBottom() { return window.scrollY + window.innerHeight >= de.scrollHeight - 2; }
  function go(dir) {
    var url = dir > 0 ? next : prev; if (!url || going) return;
    going = true;
    try { sessionStorage.setItem('goto', dir > 0 ? 'top' : 'bottom'); } catch (e) {}
    location.href = url;
  }
  function blocked(t) {
    return de.classList.contains('lb-open') || (nav && nav.classList.contains('open')) || (t && t.closest && t.closest('textarea,input,select'));
  }

  var going = false, last = Date.now(), acc = 0, startTop = false, startBottom = false;

  // molette / pavé tactile : un geste ne compte que s'il COMMENCE déjà à la limite de la page
  window.addEventListener('wheel', function (e) {
    var now = Date.now();
    if (now - last > 200) { startTop = atTop(); startBottom = atBottom(); acc = 0; }
    last = now;
    if (blocked(e.target)) return;
    if (e.deltaY > 0 && startBottom && atBottom()) { acc += e.deltaY; if (acc > 80) go(1); }
    else if (e.deltaY < 0 && startTop && atTop()) { acc += e.deltaY; if (acc < -80) go(-1); }
    else acc = 0;
  }, { passive: true });

  // écran tactile : balayage depuis la limite de la page
  var ty = 0, tTop = false, tBottom = false;
  window.addEventListener('touchstart', function (e) {
    ty = e.touches[0].clientY; tTop = atTop(); tBottom = atBottom();
  }, { passive: true });
  window.addEventListener('touchend', function (e) {
    if (blocked(e.target)) return;
    var d = ty - e.changedTouches[0].clientY;
    if (d > 70 && tBottom && atBottom()) go(1);
    else if (d < -70 && tTop && atTop()) go(-1);
  }, { passive: true });

  // clavier : flèches / PageUp / PageDown / Espace
  var lastKey = 0;
  window.addEventListener('keydown', function (e) {
    if (blocked(e.target) || e.altKey || e.ctrlKey || e.metaKey) return;
    var now = Date.now(), fresh = now - lastKey > 400; lastKey = now;
    if (!fresh) return;
    if (['ArrowDown', 'PageDown', ' '].indexOf(e.key) > -1 && atBottom()) go(1);
    else if (['ArrowUp', 'PageUp'].indexOf(e.key) > -1 && atTop()) go(-1);
  });
})();

/* Agrandissement des captures (lightbox) */
(function () {
  var shots = document.querySelectorAll('.shot'); if (!shots.length) return;
  var de = document.documentElement, box, img, cap, list = [], idx = 0, opener;
  function build() {
    box = document.createElement('div'); box.className = 'lb'; box.hidden = true;
    box.setAttribute('role', 'dialog'); box.setAttribute('aria-modal', 'true');
    box.innerHTML = '<button class="x" type="button" aria-label="Fermer">×</button>' +
      '<button class="pv" type="button" aria-label="Précédente">‹</button>' +
      '<button class="nx" type="button" aria-label="Suivante">›</button><img alt=""><p></p>';
    document.body.appendChild(box);
    img = box.querySelector('img'); cap = box.querySelector('p');
    box.addEventListener('click', function (e) {
      if (e.target.classList.contains('x') || e.target === box) close();
      else if (e.target.classList.contains('pv')) show(idx - 1);
      else if (e.target.classList.contains('nx')) show(idx + 1);
    });
  }
  function show(i) {
    idx = (i + list.length) % list.length;
    var a = list[idx], l = de.lang === 'en' ? 'en' : 'fr';
    img.src = a.href; img.alt = a.querySelector('img').alt;
    cap.textContent = a.getAttribute('data-cap-' + l) || img.alt;
    box.querySelector('.pv').style.display = box.querySelector('.nx').style.display = list.length > 1 ? '' : 'none';
  }
  function open(a) {
    if (!box) build();
    list = Array.prototype.slice.call(a.parentNode.querySelectorAll('.shot')); opener = a;
    box.hidden = false; de.classList.add('lb-open'); show(list.indexOf(a)); box.querySelector('.x').focus();
  }
  function close() { box.hidden = true; de.classList.remove('lb-open'); img.removeAttribute('src'); if (opener) opener.focus(); }
  shots.forEach(function (a) { a.addEventListener('click', function (e) { e.preventDefault(); open(a); }); });
  document.addEventListener('keydown', function (e) {
    if (!box || box.hidden) return;
    if (e.key === 'Escape') close();
    else if (e.key === 'ArrowLeft') show(idx - 1);
    else if (e.key === 'ArrowRight') show(idx + 1);
  });
})();
