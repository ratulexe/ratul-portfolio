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


// Scroll Reveal Animations
const revealElements = document.querySelectorAll(".reveal");

const revealCallback = (entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active");
    } else {
      entry.target.classList.remove("active");
    }
  });
};

const revealOptions = {
  root: null,
  threshold: 0.15,
  rootMargin: "0px 0px -50px 0px"
};

const revealObserver = new IntersectionObserver(revealCallback, revealOptions);

revealElements.forEach((el) => {
  revealObserver.observe(el);
});


// Fade out scroll indicator on scroll
const scrollIndicator = document.querySelector(".scroll-indicator");
if (scrollIndicator) {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      scrollIndicator.style.opacity = "0";
      scrollIndicator.style.pointerEvents = "none";
    } else {
      scrollIndicator.style.opacity = "1";
      scrollIndicator.style.pointerEvents = "auto";
    }
  }, { passive: true });
}

// Scroll Progress Bar Logic
window.addEventListener('scroll', () => {
  const scrollPx = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop;
  const winHeightPx = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = (scrollPx / winHeightPx) * 100;
  const progressBar = document.querySelector('.scroll-progress-bar');
  if(progressBar) {
    progressBar.style.width = scrolled + '%';
  }
}, { passive: true });
