import { projects } from "../data/projects.js";
import { icon } from "./icons.js";
// All markup below comes from the local, reviewed project data. No API HTML is inserted.
export function openProject(id, trigger) {
  const project = projects.find((item) => item.id === id);
  const dialog = document.querySelector("#project-dialog");
  if (!project || typeof dialog.showModal !== "function") return false;
  document.querySelector("#dialog-content").innerHTML =
    `<article class="dialog-body">
    <span class="eyebrow">${project.discipline}</span><h2 id="dialog-title" tabindex="-1">${project.name}</h2><p>${project.headline}</p>
    <ul class="tags">${project.stack.map((item) => `<li>${item}</li>`).join("")}</ul>
    <img class="dialog-visual" src="assets/projects/${project.visual}.svg" alt="Conceptual illustration for ${project.name}" width="1000" height="720">
    <div class="dialog-grid"><div><h3>The problem</h3><p>${project.problem}</p></div><div><h3>The approach</h3><p>${project.solution}</p></div></div>
    <div class="dialog-features"><h3>Inside the implementation</h3><ul>${project.features.map((feature) => `<li>${feature}</li>`).join("")}</ul></div>
    <h3>How it connects</h3><ol class="architecture">${project.architecture.map((step) => `<li>${step}</li>`).join("")}</ol>
    <p class="dialog-note">${project.note}</p><div class="dialog-actions"><a class="button button-primary" href="${project.repo}" target="_blank" rel="noopener noreferrer">Explore source ${icon("github")}</a>${project.live ? `<a class="text-link" href="${project.live}" target="_blank" rel="noopener noreferrer">${project.liveLabel} ${icon("arrow")}</a>` : ""}</div>
    <p class="dialog-source">Implementation reference: ${project.source}</p></article>`;
  const illustration = dialog.querySelector(".dialog-visual");
  // Artwork is supplementary; keep the case study usable if the asset is unavailable.
  const hideIllustration = () => { illustration.hidden = true; };
  illustration.addEventListener("error", hideIllustration, { once: true });
  if (illustration.complete && !illustration.naturalWidth) hideIllustration();
  dialog.showModal();
  document.body.classList.add("modal-open");
  dialog.scrollTop = 0;
  dialog.querySelector(".dialog-close").focus({ preventScroll: true });
  const controller = new AbortController();
  const { signal } = controller;
  dialog
    .querySelector(".dialog-close")
    .addEventListener("click", () => dialog.close(), { signal });
  dialog.addEventListener(
    "click",
    (event) => {
      if (event.target !== dialog) return;
      const rect = dialog.getBoundingClientRect();
      if (
        event.clientX < rect.left ||
        event.clientX > rect.right ||
        event.clientY < rect.top ||
        event.clientY > rect.bottom
      )
        dialog.close();
    },
    { signal },
  );
  dialog.addEventListener(
    "close",
    () => {
      document.body.classList.remove("modal-open");
      controller.abort();
      trigger?.focus({ preventScroll: true });
    },
    { once: true },
  );
  return true;
}
