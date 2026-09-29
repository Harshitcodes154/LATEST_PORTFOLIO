import { SITE_CONFIG } from "../site-config.js";
export const socials = [
  { name: "GitHub", url: SITE_CONFIG.github, icon: "github" },
  { name: "LinkedIn", url: SITE_CONFIG.linkedin, icon: "linkedin" },
  { name: "Email", url: `mailto:${SITE_CONFIG.email}`, icon: "mail" },
  ...(SITE_CONFIG.leetcode
    ? [{ name: "LeetCode", url: SITE_CONFIG.leetcode, icon: "code" }]
    : []),
];
