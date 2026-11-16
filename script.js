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
