// Keep the small-screen navigation open and close when a link is chosen.
const menuButton = document.querySelector("#menu-toggle");
const navigation = document.querySelector("#primary-nav");

function closeMenu() {
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "Open navigation menu");
  navigation.classList.remove("is-open");
}

menuButton.addEventListener("click", () => {
  const isOpen = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!isOpen));
  menuButton.setAttribute(
    "aria-label",
    isOpen ? "Open navigation menu" : "Close navigation menu"
  );
  navigation.classList.toggle("is-open", !isOpen);
});

navigation.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeMenu);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMenu();
  }
});

// Let visitors switch themes and remember their choice on this device.
const themeButton = document.querySelector("#theme-toggle");
const themeLabel = themeButton.querySelector(".theme-label");
const themeIcon = themeButton.querySelector(".theme-icon");
const themeColor = document.querySelector('meta[name="theme-color"]');

function setTheme(theme, rememberChoice) {
  const isDark = theme === "dark";
  document.documentElement.dataset.theme = isDark ? "dark" : "light";
  themeButton.setAttribute("aria-pressed", String(isDark));
  themeLabel.textContent = isDark ? "Dark mode" : "Light mode";
  themeIcon.textContent = isDark ? "◐" : "☼";
  themeColor.setAttribute("content", isDark ? "#141b22" : "#f5f3ec");

  if (rememberChoice) {
    try {
      localStorage.setItem("saif-portfolio-theme", isDark ? "dark" : "light");
    } catch (error) {
      // Theme switching still works if browser storage is unavailable.
    }
  }
}

let initialTheme = "light";
try {
  const savedTheme = localStorage.getItem("saif-portfolio-theme");
  if (savedTheme === "dark" || savedTheme === "light") {
    initialTheme = savedTheme;
  } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    initialTheme = "dark";
  }
} catch (error) {
  // Use the default light theme if browser storage is unavailable.
}

setTheme(initialTheme, false);
themeButton.addEventListener("click", () => {
  const isDark = document.documentElement.dataset.theme === "dark";
  setTheme(isDark ? "light" : "dark", true);
});

// Keep the footer year up to date automatically.
document.querySelector("#current-year").textContent = new Date().getFullYear();
