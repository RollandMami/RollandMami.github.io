const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav-links");
const languageButton = document.querySelector(".language-toggle");
let language = "fr";

menuButton.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
  menuButton.textContent = isOpen ? "×" : "☰";
});

nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.textContent = "☰";
  });
});

languageButton.addEventListener("click", () => {
  language = language === "fr" ? "en" : "fr";
  document.documentElement.lang = language;
  document.querySelectorAll("[data-fr][data-en]").forEach((element) => {
    element.innerHTML = element.dataset[language];
  });
  languageButton.textContent = language === "fr" ? "EN" : "FR";
});

document.getElementById("year").textContent = new Date().getFullYear();


/* =========================================
   HERO SCROLL ANIMATION
========================================= */

const hero = document.querySelector(".hero");
const portrait = document.querySelector(".hero-portrait");
const heroText = document.querySelector(".hero-text");

const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

let scrollScheduled = false;

function updateHeroScroll() {
  if (!hero || !portrait || !heroText || prefersReducedMotion) {
    return;
  }

  const rect = hero.getBoundingClientRect();

  // Progression de 0 à 1 pendant le défilement
  const start = window.innerHeight * 0.15;
  const distance = hero.offsetHeight * 0.75;

  const progress = Math.min(
    1,
    Math.max(0, (start - rect.top) / distance)
  );

  // La photo remonte et disparaît
  portrait.style.opacity = String(1 - progress);
  portrait.style.transform =
    `translateY(${-progress * 110}px) scale(${1 - progress * 0.06})`;

  // Le texte remonte légèrement sans disparaître complètement
  heroText.style.transform =
    `translateY(${-progress * 45}px)`;

  heroText.style.opacity = String(1 - progress * 0.15);

  scrollScheduled = false;
}

function requestHeroUpdate() {
  if (!scrollScheduled) {
    requestAnimationFrame(updateHeroScroll);
    scrollScheduled = true;
  }
}

window.addEventListener("scroll", requestHeroUpdate, {
  passive: true
});

window.addEventListener("resize", requestHeroUpdate);

updateHeroScroll();
