import { SITE_CONFIG } from "../site-config.js";

const CACHE_KEY = "hk-repositories-v1";
const TTL = 15 * 60 * 1000;
const featured = ["WAFER-GPT", "OperationSindoor", "ThermoWatch-AI"];

function validRepository(repo) {
  return (
    repo &&
    featured.includes(repo.name) &&
    Number.isInteger(repo.stargazers_count) &&
    typeof repo.html_url === "string" &&
    repo.html_url === `${SITE_CONFIG.github}/${repo.name}` &&
    Number.isFinite(Date.parse(repo.pushed_at))
  );
}
function display(data, cached = false) {
  const repos = data.filter(validRepository);
  if (!repos.length) throw new Error("No matching repositories");
  const rows = document.querySelectorAll("#github-repos .repo-row");
  rows.forEach((row) => {
    const name = new URL(row.href).pathname.split("/").at(-1);
    const repo = repos.find((item) => item.name === name);
    if (!repo) return;
    const parts = [];
    if (typeof repo.language === "string") parts.push(repo.language);
    parts.push(
      `Updated ${new Intl.DateTimeFormat("en", { month: "short", day: "numeric", year: "numeric" }).format(new Date(repo.pushed_at))}`,
    );
    if (repo.stargazers_count > 0) parts.push(`${repo.stargazers_count} stars`);
    row.querySelector("small").textContent = parts.join(" · ");
  });
  document.querySelector("#github-status").textContent =
    `${cached ? "Cached" : "Live"} public repository data · GitHub`;
}
export async function loadGitHub() {
  let cached;
  try {
    cached = JSON.parse(sessionStorage.getItem(CACHE_KEY));
    if (
      cached &&
      Date.now() - cached.time < TTL &&
      Array.isArray(cached.data)
    ) {
      display(cached.data, true);
      return;
    }
  } catch {
    /* Storage is optional, including in private browsing. */
  }
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 6500);
  try {
    const response = await fetch(
      `https://api.github.com/users/${SITE_CONFIG.githubUsername}/repos?per_page=100&sort=updated`,
      {
        headers: { Accept: "application/vnd.github+json" },
        signal: controller.signal,
      },
    );
    if (!response.ok) throw new Error("GitHub unavailable");
    const data = await response.json();
    if (!Array.isArray(data)) throw new Error("Unexpected response");
    display(data);
    try {
      sessionStorage.setItem(
        CACHE_KEY,
        JSON.stringify({
          data: data.filter(validRepository),
          time: Date.now(),
        }),
      );
    } catch {
      /* Optional cache. */
    }
  } catch {
    document.querySelector("#github-status").textContent =
      "Live updates unavailable · Explore the selected repositories";
  } finally {
    clearTimeout(timeout);
  }
}
