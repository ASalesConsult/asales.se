const langToggle = document.getElementById("langToggle");
const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.getElementById("mainNav");
let language = "sv";

function setLanguage(nextLanguage) {
  language = nextLanguage;
  document.documentElement.lang = nextLanguage;
  document.querySelectorAll("[data-sv][data-en]").forEach((element) => {
    element.textContent = element.dataset[nextLanguage];
  });

  const labels = langToggle.querySelectorAll("span");
  labels[0].classList.toggle("lang-active", nextLanguage === "sv");
  labels[2].classList.toggle("lang-active", nextLanguage === "en");

  document.title = nextLanguage === "sv"
    ? "A SalesConsult AB | Försäljning, KAM & affärsutveckling"
    : "A SalesConsult AB | Sales, KAM & Business Development";
}

langToggle.addEventListener("click", () => {
  setLanguage(language === "sv" ? "en" : "sv");
});

menuToggle.addEventListener("click", () => {
  const open = mainNav.classList.toggle("open");
  document.body.classList.toggle("menu-open", open);
  menuToggle.setAttribute("aria-expanded", String(open));
});

document.querySelectorAll(".main-nav a").forEach((link) => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("open");
    document.body.classList.remove("menu-open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
document.getElementById("year").textContent = new Date().getFullYear();
