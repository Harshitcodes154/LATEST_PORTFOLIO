import { mkdir, readFile, writeFile, cp, access, rm } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { SITE_CONFIG } from "../site-config.js";
import {
  renderProjects,
  renderArchive,
  renderSkills,
  renderAchievements,
  renderSocials,
  escape,
} from "../components/render.js";
import { icon } from "../components/icons.js";
import { projects, archive } from "../data/projects.js";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const output = path.join(root, "dist");
// The only generated directory removed by the build is this repo's exact dist path.
if (path.dirname(output) !== root || path.basename(output) !== "dist")
  throw new Error("Unsafe build path");
await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
const template = await readFile(path.join(root, "index.html"), "utf8");
let resume = SITE_CONFIG.resume || "public/resume.pdf";
try {
  await access(path.join(root, resume));
} catch {
  resume = `mailto:${SITE_CONFIG.email}?subject=Resume%20request`;
}
const url = SITE_CONFIG.siteUrl;
if (url && (!url.startsWith("https://") || !url.endsWith("/")))
  throw new Error("siteUrl must be an HTTPS URL ending in /");
const schema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: SITE_CONFIG.name,
  description: "B.Tech AI & ML student and creative technologist",
  email: SITE_CONFIG.email,
  sameAs: [
    SITE_CONFIG.github,
    SITE_CONFIG.linkedin,
    SITE_CONFIG.leetcode,
  ].filter(Boolean),
  ...(url
    ? { url, image: new URL("assets/portrait/harshit-960.webp", url).href }
    : {}),
};
const replacements = {
  PROJECTS: renderProjects(),
  ARCHIVE: renderArchive(),
  SKILLS: renderSkills(),
  PROJECT_COUNT: String(projects.length + archive.length).padStart(2, "0"),
  ACHIEVEMENTS: renderAchievements(),
  SOCIALS: renderSocials(),
  GITHUB: SITE_CONFIG.github,
  LINKEDIN: SITE_CONFIG.linkedin,
  EMAIL: SITE_CONFIG.email,
  RESUME: escape(resume),
  GITHUB_ICON: icon("github"),
  LINKEDIN_ICON: icon("linkedin"),
  ARROW: icon("arrow"),
  DOWN: icon("down"),
  PERSON_SCHEMA: JSON.stringify(schema).replace(/</g, "\\u003c"),
  OG_IMAGE: url
    ? new URL("assets/social-preview.jpg", url).href
    : "assets/social-preview.jpg",
  CANONICAL: url
    ? `<link rel="canonical" href="${escape(url)}"><meta property="og:url" content="${escape(url)}">`
    : "",
};
let html = template.replace(/\{\{([A-Z_]+)\}\}/g, (_, key) => {
  if (!(key in replacements)) throw new Error(`Unknown template key: ${key}`);
  const value = replacements[key];
  return ["PROJECTS", "ARCHIVE", "SKILLS", "ACHIEVEMENTS", "SOCIALS"].includes(
    key,
  )
    ? value.replace(/&(?!amp;|lt;|gt;|quot;|#\d+;)/g, "&amp;")
    : value;
});
if (resume.startsWith("mailto:"))
  html = html
    .replace(/data-resume download/g, "data-resume")
    .replace(/View résumé|Get my résumé|Résumé (?=<svg)/g, "Request résumé");
await writeFile(path.join(output, "index.html"), html);
for (const file of [
  "styles.css",
  "script.js",
  "site-config.js",
  "assets",
  "animations",
  "components",
  "data",
]) {
  await cp(path.join(root, file), path.join(output, file), { recursive: true });
}
// Build-only content rendering has no place in the published browser modules.
await rm(path.join(output, "components/render.js"));
try {
  await cp(path.join(root, "public"), output, { recursive: true });
} catch (error) {
  if (error.code !== "ENOENT") throw error;
}
if (SITE_CONFIG.resume === "public/resume.pdf" || !SITE_CONFIG.resume) {
  html = html.replaceAll('href="public/resume.pdf"', 'href="resume.pdf"');
  await writeFile(path.join(output, "index.html"), html);
}
// No source photo download is needed for the optimized hero; keep it only as a fallback.
await writeFile(
  path.join(output, "robots.txt"),
  `User-agent: *\nAllow: /\n${url ? `Sitemap: ${new URL("sitemap.xml", url).href}\n` : ""}`,
);
if (url)
  await writeFile(
    path.join(output, "sitemap.xml"),
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${escape(url)}</loc></url></urlset>`,
  );
await writeFile(
  path.join(output, "404.html"),
  '<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>Page not found — Harshit Kumar</title><style>body{background:#101110;color:#efeee7;font:18px/1.7 system-ui;padding:12vw}a{color:#d2ac79}</style><h1>This page has moved.</h1><p><a href="./">Return to Harshit’s portfolio →</a></p></html>',
);
console.log("Built static portfolio → dist/");
