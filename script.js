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
