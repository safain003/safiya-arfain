const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle?.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", open);
});

document.querySelectorAll("#navLinks a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded", "false");
  });
});

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));


// Dark mode with saved preference.
const themeToggle = document.getElementById("themeToggle");
const savedTheme = localStorage.getItem("safiya-theme");

if (savedTheme === "dark") {
  document.body.classList.add("dark-mode");
}

function updateThemeButton() {
  const dark = document.body.classList.contains("dark-mode");
  themeToggle?.setAttribute(
    "aria-label",
    dark ? "Switch to light mode" : "Switch to dark mode"
  );
  themeToggle?.setAttribute(
    "title",
    dark ? "Switch to light mode" : "Switch to dark mode"
  );
}

themeToggle?.addEventListener("click", () => {
  const dark = document.body.classList.toggle("dark-mode");
  localStorage.setItem("safiya-theme", dark ? "dark" : "light");
  updateThemeButton();
});

updateThemeButton();

// Show the floating contact pop-up after the visitor starts scrolling.
const floatingContact = document.getElementById("floatingContact");
const contactSection = document.getElementById("contact");

function updateFloatingContact() {
  if (!floatingContact || !contactSection) return;
  const contactBottom = contactSection.getBoundingClientRect().bottom;
  const show = window.scrollY > 420 && contactBottom < 0;
  floatingContact.classList.toggle("visible", show);
}

window.addEventListener("scroll", updateFloatingContact, { passive: true });
updateFloatingContact();

