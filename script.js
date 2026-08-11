/* A SalesConsult AB — Website v7.3.1 */
const languageSwitch = document.getElementById("languageSwitch");
const languageOptions = document.querySelectorAll(".language-option");
const menuToggle = document.querySelector(".menu-toggle");
const mobileNav = document.getElementById("mobileNav");

let language = localStorage.getItem("asales-language") || "sv";

function setLanguage(nextLanguage) {
  language = nextLanguage;
  localStorage.setItem("asales-language", nextLanguage);
  document.documentElement.lang = nextLanguage;

  document.querySelectorAll("[data-sv][data-en]").forEach((element) => {
    element.textContent = element.dataset[nextLanguage];
  });

  languageOptions.forEach((option) => {
    option.classList.toggle("active", option.dataset.lang === nextLanguage);
  });

  menuToggle.setAttribute(
    "aria-label",
    nextLanguage === "sv" ? "Öppna meny" : "Open menu"
  );
}

function closeMenu() {
  mobileNav.classList.remove("open");
  document.body.classList.remove("menu-open");
  menuToggle.setAttribute("aria-expanded", "false");
}

languageSwitch.addEventListener("click", () => {
  setLanguage(language === "sv" ? "en" : "sv");
});

menuToggle.addEventListener("click", () => {
  const open = mobileNav.classList.toggle("open");
  document.body.classList.toggle("menu-open", open);
  menuToggle.setAttribute("aria-expanded", String(open));
});

document.querySelectorAll(".mobile-nav a").forEach((link) => {
  link.addEventListener("click", closeMenu);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMenu();
  }
});

const observer = new IntersectionObserver(
  (entries, activeObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        activeObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".reveal").forEach((element) => {
  observer.observe(element);
});

document.getElementById("year").textContent = new Date().getFullYear();
setLanguage(language);
