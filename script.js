import { navigation } from "./components/navigation.js";
import { SITE_CONFIG } from "./site-config.js";
import { sectionReveal, pointerEffects } from "./animations/motion.js";

navigation();
sectionReveal();
pointerEffects();

const filters = [...document.querySelectorAll("[data-filter]")];
const entries = [...document.querySelectorAll("[data-category]")];
filters.forEach((button) =>
  button.addEventListener("click", () => {
    filters.forEach((item) =>
      item.setAttribute("aria-pressed", String(item === button)),
    );
    let visible = 0;
    entries.forEach((entry) => {
      entry.hidden =
        button.dataset.filter !== "all" &&
        button.dataset.filter !== entry.dataset.category;
      if (!entry.hidden) {
        visible++;
        entry.classList.add("visible");
      }
    });
    document.querySelector(".project-archive").hidden = !document.querySelector(
      ".archive-row:not([hidden])",
    );
    document.querySelector("#filter-status").textContent =
      `${visible} projects shown`;
  }),
);

let dialogModule;
let opening = false;
document.addEventListener("click", async (event) => {
  const link = event.target.closest("[data-project]");
  if (!link || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)
    return;
  if (typeof document.querySelector("#project-dialog").showModal !== "function")
    return;
  event.preventDefault();
  if (opening) return;
  opening = true;
  try {
    dialogModule ||= await import("./components/project-dialog.js");
    if (!dialogModule.openProject(link.dataset.project, link))
      location.assign(link.href);
  } catch {
    location.assign(link.href);
  } finally {
    opening = false;
  }
});

function imageFallback(img) {
  if (img.dataset.fallbackTried) {
    img
      .closest(".portrait-frame, .project-visual")
      ?.classList.add("image-failed");
    return;
  }
  img.dataset.fallbackTried = "true";
  const picture = img.closest("picture");
  if (picture) {
    picture.querySelectorAll("source").forEach((source) => source.remove());
    img.src = "assets/portrait/harshit-original.jpeg";
  } else {
    img.closest(".project-visual")?.classList.add("image-failed");
  }
}
document.querySelectorAll("img").forEach((img) => {
  img.addEventListener("error", () => imageFallback(img));
  if (img.complete && !img.naturalWidth) imageFallback(img);
});

// Resolve an optional résumé once; leave other links usable during the request.
const resumeLinks = [...document.querySelectorAll("[data-resume]")];
if (resumeLinks.length && !resumeLinks[0].href.startsWith("mailto:")) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 4500);
  fetch(resumeLinks[0].href, { method: "HEAD", signal: controller.signal })
    .then((response) => {
      if (
        response.ok &&
        response.headers.get("content-type")?.includes("application/pdf")
      )
        return;
      resumeLinks.forEach((link) => {
        link.href = `mailto:${SITE_CONFIG.email}?subject=Resume%20request`;
        link.removeAttribute("download");
        link.setAttribute("aria-label", "Request résumé by email");
        link.firstChild.textContent = "Request résumé ";
      });
    })
    .catch(() => {
      /* Do not disable a real file just because a HEAD request timed out. */
    })
    .finally(() => clearTimeout(timeout));
}

// Load optional network functionality only when the notebook enters view.
const notebook = document.querySelector("#github");
async function github() {
  try {
    const module = await import("./components/github.js");
    await module.loadGitHub();
  } catch {
    /* Server-rendered repository links remain functional. */
  }
}
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        observer.disconnect();
        github();
      }
    },
    { rootMargin: "200px" },
  );
  observer.observe(notebook);
} else {
  github();
}
