import { projects, archive } from "../data/projects.js";
import { skills } from "../data/skills.js";
import { achievements } from "../data/achievements.js";
import { socials } from "../data/socials.js";
import { icon } from "./icons.js";

export const escape = (value) =>
  String(value).replace(
    /[&<>"']/g,
    (char) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        char
      ],
  );
const external = 'target="_blank" rel="noopener noreferrer"';
export function renderProjects() {
  return projects
    .map(
      (
        p,
      ) => `<article class="project-story reveal" data-category="${p.category}" id="${p.id}">
    <div class="project-visual visual-${p.visual}">
      <img src="assets/projects/${p.visual}.svg" width="1000" height="720" alt="${escape(p.name)} conceptual illustration" loading="lazy" decoding="async">
      <div class="visual-top"><span>${p.number} / SELECTED WORK</span><span class="visual-symbol">+</span></div>
      <span class="visual-caption">${p.visual === "wafer" ? "PATTERN → PREDICTION → UNDERSTANDING" : p.visual === "flight" ? "INPUT → RESPONSE → EXPERIENCE" : "OBSERVE → CONNECT → INTERPRET"}</span>
      <a href="${p.repo}" class="visual-open" data-project="${p.id}" data-cursor="VIEW" aria-label="View ${escape(p.name)} case study">${icon("arrow")}</a>
    </div>
    <div class="project-copy"><span class="eyebrow">${p.discipline}</span><h3><a href="${p.repo}" data-project="${p.id}" data-cursor="VIEW">${p.name}</a></h3><p class="project-headline">${p.headline}</p><p>${p.description}</p><ul class="tags">${p.stack.map((s) => `<li>${s}</li>`).join("")}</ul><a class="text-link" href="${p.repo}" data-project="${p.id}" data-cursor="VIEW">Explore the project ${icon("arrow")}</a></div>
  </article>`,
    )
    .join("");
}
export function renderArchive() {
  return archive
    .map(
      (p, i) =>
        `<a class="archive-row" href="${p.repo}" ${external} data-category="${p.category}" data-cursor="OPEN"><span class="archive-number">0${i + 4}</span><div><h4>${p.name}</h4><p>${p.description}</p></div><span class="archive-stack">${p.stack}<small>${p.discipline}</small></span>${icon("arrow")}</a>`,
    )
    .join("");
}
export function renderSkills() {
  return skills
    .map(
      (s, i) =>
        `<details class="skill-row"${i === 0 ? " open" : ""}><summary><span class="skill-index">0${i + 1}</span><h3>${s.name}</h3><span class="skill-preview">${s.items.slice(0, 3).join(" / ")}</span><span class="plus" aria-hidden="true">+</span></summary><div class="skill-content"><ul class="tags">${s.items.map((t) => `<li>${t}</li>`).join("")}</ul><p>${s.context}</p>${s.project ? `<a class="text-link" href="${projects.find((p) => p.id === s.project).repo}" data-project="${s.project}">See it in a project ${icon("arrow")}</a>` : s.url ? `<a class="text-link" href="${s.url}" ${external}>Explore the source ${icon("arrow")}</a>` : ""}</div></details>`,
    )
    .join("");
}
export function renderAchievements() {
  return achievements
    .map(
      (a) =>
        `<li class="timeline-item reveal"><div class="timeline-date">${a.year || '<span aria-hidden="true">—</span><span class="sr-only">Date not specified</span>'}<span class="timeline-dot"></span></div><div class="timeline-copy"><span class="eyebrow">${a.organization}</span><h3>${a.title}</h3><p>${a.description}</p></div><span class="outcome ${a.outcome === "Winner" ? "winner" : ""}">${a.outcome === "Winner" ? "↗ " : ""}${a.outcome}</span></li>`,
    )
    .join("");
}
export function renderSocials() {
  return socials
    .map(
      (s) =>
        `<a href="${s.url}" ${s.url.startsWith("https") ? external : ""} data-cursor="OPEN">${icon(s.icon)}<span>${s.name}</span>${icon("arrow", "social-arrow")}</a>`,
    )
    .join("");
}
