import { canAnimate } from "../animations/motion.js";

export function navigation() {
  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector("#navigation");
  const links = [...document.querySelectorAll(".nav-sections a")];
  const sections = links.map((link) => document.querySelector(link.hash));
  const progress = document.querySelector(".scroll-progress");
  const portrait = document.querySelector(".portrait-stage");
  const mobile = matchMedia("(max-width: 900px)");
  header.classList.add("enhanced");
  function setMenu(open, returnFocus = false) {
    header.classList.toggle("menu-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.querySelector("span").textContent = open ? "Close" : "Menu";
    if (open) nav.querySelector("a").focus();
    if (returnFocus) toggle.focus();
  }
  toggle.addEventListener("click", () =>
    setMenu(toggle.getAttribute("aria-expanded") !== "true"),
  );
  nav.addEventListener("click", (event) => {
    const link = event.target.closest("a");
    if (!link) return;
    const wasOpen = toggle.getAttribute("aria-expanded") === "true";
    setMenu(false);
    if (wasOpen && link.hash) {
      const section = document.querySelector(link.hash);
      if (section) {
        section.tabIndex = -1;
        section.focus({ preventScroll: true });
        section.addEventListener(
          "blur",
          () => section.removeAttribute("tabindex"),
          { once: true },
        );
      }
    }
  });
  document.addEventListener("click", (event) => {
    if (
      !header.contains(event.target) &&
      toggle.getAttribute("aria-expanded") === "true"
    )
      setMenu(false);
  });
  header.addEventListener("keydown", (event) => {
    if (toggle.getAttribute("aria-expanded") !== "true") return;
    if (event.key === "Escape") {
      event.preventDefault();
      setMenu(false, true);
    }
    if (event.key === "Tab") {
      const focusable = [toggle, ...nav.querySelectorAll("a")];
      const first = focusable[0],
        last = focusable.at(-1);
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      }
      if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  });
  mobile.addEventListener("change", () => setMenu(false));
  let pending = false;
  function update() {
    header.classList.toggle("scrolled", scrollY > 30);
    const height = document.documentElement.scrollHeight - innerHeight;
    progress.style.transform = `scaleX(${height > 0 ? scrollY / height : 0})`;
    let active = sections[0];
    for (const section of sections) {
      if (section.getBoundingClientRect().top <= innerHeight * 0.38)
        active = section;
    }
    links.forEach((link) => {
      if (link.hash === `#${active.id}`)
        link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    });
    if (canAnimate() && scrollY < innerHeight)
      portrait.style.setProperty(
        "--portrait-scroll",
        `${Math.min(scrollY * 0.055, 38)}px`,
      );
    else portrait.style.removeProperty("--portrait-scroll");
    pending = false;
  }
  addEventListener(
    "scroll",
    () => {
      if (!pending) {
        pending = true;
        requestAnimationFrame(update);
      }
    },
    { passive: true },
  );
  addEventListener("resize", update, { passive: true });
  update();
}
