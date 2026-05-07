document.getElementById("year").textContent = new Date().getFullYear();

const burger = document.getElementById("burger");
const mobileMenu = document.getElementById("mobileMenu");
const mobileOverlay = document.getElementById("mobileOverlay");
const mobileMenuClose = document.getElementById("mobileMenuClose");

function setMenuState(open) {
  document.body.classList.toggle("menu-open", open);
  burger.setAttribute("aria-expanded", String(open));
  mobileMenu.setAttribute("aria-hidden", String(!open));
}

burger.addEventListener("click", () => {
  const isOpen = document.body.classList.contains("menu-open");
  setMenuState(!isOpen);
});

mobileOverlay.addEventListener("click", () => setMenuState(false));
mobileMenuClose?.addEventListener("click", () => setMenuState(false));
mobileMenu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => setMenuState(false));
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") setMenuState(false);
});

function smoothScrollTo(targetY, duration = 850) {
  const startY = window.scrollY;
  const distance = targetY - startY;
  const startTime = performance.now();

  function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  function step(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = easeInOutCubic(progress);
    window.scrollTo(0, startY + distance * eased);
    if (progress < 1) requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
}

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const targetId = link.getAttribute("href");
    if (!targetId || targetId === "#") return;

    const target = document.querySelector(targetId);
    if (!target) return;

    event.preventDefault();
    const targetY = target.getBoundingClientRect().top + window.scrollY;
    smoothScrollTo(targetY);
    history.replaceState(null, "", targetId);
  });
});

const contactForm = document.querySelector(".contact-form");
const successToast = document.getElementById("successToast");
const successToastBackdrop = document.getElementById("successToastBackdrop");
const successToastClose = document.getElementById("successToastClose");
let toastTimer;

function showSuccessToast() {
  if (!successToast) return;
  successToast.classList.add("is-visible");
  successToast.setAttribute("aria-hidden", "false");
  successToastBackdrop?.classList.add("is-visible");
  successToastBackdrop?.setAttribute("aria-hidden", "false");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(hideSuccessToast, 3800);
}

function hideSuccessToast() {
  if (!successToast) return;
  successToast.classList.remove("is-visible");
  successToast.setAttribute("aria-hidden", "true");
  successToastBackdrop?.classList.remove("is-visible");
  successToastBackdrop?.setAttribute("aria-hidden", "true");
}

contactForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!contactForm.checkValidity()) {
    contactForm.reportValidity();
    return;
  }
  contactForm.reset();
  showSuccessToast();
});

successToastClose?.addEventListener("click", hideSuccessToast);
successToastBackdrop?.addEventListener("click", hideSuccessToast);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") hideSuccessToast();
});

const revealTargets = document.querySelectorAll(".hero, .section, .footer");
revealTargets.forEach((element) => element.classList.add("reveal-on-scroll"));

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      obs.unobserve(entry.target);
    });
  }, { threshold: 0.15 });

  revealTargets.forEach((element) => observer.observe(element));
} else {
  revealTargets.forEach((element) => element.classList.add("is-visible"));
}
