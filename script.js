const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
const navItems = document.querySelectorAll(".nav-links a");
const yearElement = document.querySelector("#currentYear");

yearElement.textContent = new Date().getFullYear();

navToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");

  navToggle.classList.toggle("open", isOpen);
  navToggle.setAttribute("aria-expanded", isOpen);
});

navItems.forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    navToggle.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

const sections = document.querySelectorAll("main section[id]");

const highlightCurrentSection = () => {
  let currentSectionId = "home";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 120;

    if (window.scrollY >= sectionTop) {
      currentSectionId = section.id;
    }
  });

  navItems.forEach((link) => {
    const isActive = link.getAttribute("href") === `#${currentSectionId}`;
    link.classList.toggle("active", isActive);
  });
};

// Throttle scroll with requestAnimationFrame to reduce main-thread work
let rafPending = false;
window.addEventListener("scroll", () => {
  if (!rafPending) {
    rafPending = true;
    requestAnimationFrame(() => {
      highlightCurrentSection();
      rafPending = false;
    });
  }
}, { passive: true });

highlightCurrentSection();
