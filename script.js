const header = document.querySelector("[data-header]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const nav = document.querySelector("[data-nav]");

const syncHeader = () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 32);
};

syncHeader();
window.addEventListener("scroll", syncHeader, { passive: true });

const closeMenu = () => {
  menuToggle?.setAttribute("aria-expanded", "false");
  menuToggle?.setAttribute("aria-label", "Open navigation");
  nav?.classList.remove("is-open");
  document.body.classList.remove("menu-open");
};

menuToggle?.addEventListener("click", () => {
  const open = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!open));
  menuToggle.setAttribute("aria-label", open ? "Open navigation" : "Close navigation");
  nav?.classList.toggle("is-open", !open);
  document.body.classList.toggle("menu-open", !open);
});

nav?.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeMenu();
});

const revealItems = document.querySelectorAll(".reveal");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (reduceMotion || !("IntersectionObserver" in window)) {
  revealItems.forEach((item) => item.classList.add("is-visible"));
} else {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -5% 0px" },
  );

  revealItems.forEach((item) => revealObserver.observe(item));
}

document.querySelectorAll(".faq-item button").forEach((button) => {
  button.addEventListener("click", () => {
    const expanded = button.getAttribute("aria-expanded") === "true";
    document.querySelectorAll(".faq-item button").forEach((other) => {
      other.setAttribute("aria-expanded", "false");
    });
    button.setAttribute("aria-expanded", String(!expanded));
  });
});

const levelContent = {
  beginner: {
    number: "01",
    kicker: "Start with strong foundations",
    title: "From first swing to full rally.",
    items: [
      "Learn forehand, backhand, serve and volley technique",
      "Build court movement, control and rally confidence",
      "Understand scoring and play your first real points",
    ],
  },
  intermediate: {
    number: "02",
    kicker: "Add range and intention",
    title: "Turn consistency into strategy.",
    items: [
      "Create directional control, spin and shot variety",
      "Improve returns, footwork and attacking patterns",
      "Read the court and adapt to different playing styles",
    ],
  },
  advanced: {
    number: "03",
    kicker: "Perform when the point matters",
    title: "Make your weapons match-ready.",
    items: [
      "Refine power, placement and advanced shot patterns",
      "Build pressure-ready footwork and transition play",
      "Develop match plans, mental strength and tournament habits",
    ],
  },
};

const levelPanel = document.querySelector(".level-panel");
const levelNumber = document.querySelector("[data-level-number]");
const levelKicker = document.querySelector("[data-level-kicker]");
const levelTitle = document.querySelector("[data-level-title]");
const levelList = document.querySelector("[data-level-list]");

document.querySelectorAll("[data-level]").forEach((button) => {
  button.addEventListener("click", () => {
    const data = levelContent[button.dataset.level];
    if (!data || button.getAttribute("aria-selected") === "true") return;

    document.querySelectorAll("[data-level]").forEach((tab) => {
      tab.setAttribute("aria-selected", String(tab === button));
    });

    levelNumber.textContent = data.number;
    levelKicker.textContent = data.kicker;
    levelTitle.textContent = data.title;
    levelList.innerHTML = data.items.map((item) => `<li>${item}</li>`).join("");
    levelPanel.classList.remove("is-changing");
    void levelPanel.offsetWidth;
    levelPanel.classList.add("is-changing");
  });
});

document.querySelector("[data-year]").textContent = new Date().getFullYear();
