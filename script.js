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
