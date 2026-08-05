const siteHeader = document.getElementById("siteHeader");
const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.getElementById("mainNav");
const langToggle = document.getElementById("langToggle");
const langOptions = document.querySelectorAll(".lang-option");
let currentLanguage = localStorage.getItem("asales-language") || "sv";

function updateHeader() {
  siteHeader.classList.toggle("scrolled", window.scrollY > 24);
}

function closeMenu() {
  mainNav.classList.remove("open");
  document.body.classList.remove("menu-open");
  menuToggle.setAttribute("aria-expanded", "false");
}

function setLanguage(language) {
  currentLanguage = language;
  localStorage.setItem("asales-language", language);
  document.documentElement.lang = language;

  document.querySelectorAll("[data-sv][data-en]").forEach((element) => {
    element.textContent = element.dataset[language];
  });

  langOptions.forEach((option) => {
    option.classList.toggle("lang-active", option.dataset.lang === language);
  });

  document.title = language === "sv"
    ? "A SalesConsult AB | Försäljning, KAM & affärsutveckling"
    : "A SalesConsult AB | Sales, KAM & Business Development";

  menuToggle.setAttribute(
    "aria-label",
    language === "sv" ? "Öppna meny" : "Open menu"
  );
}

window.addEventListener("scroll", updateHeader, { passive: true });
updateHeader();

menuToggle.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("open");
  document.body.classList.toggle("menu-open", isOpen);
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

document.querySelectorAll(".main-nav a").forEach((link) => {
  link.addEventListener("click", closeMenu);
});

langToggle.addEventListener("click", () => {
  setLanguage(currentLanguage === "sv" ? "en" : "sv");
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeMenu();
});

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".reveal").forEach((element) => {
  revealObserver.observe(element);
});

document.getElementById("year").textContent = new Date().getFullYear();
setLanguage(currentLanguage);
