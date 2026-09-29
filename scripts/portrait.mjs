import sharp from "sharp";
import { SITE_CONFIG } from "../site-config.js";
import { mkdir, copyFile } from "node:fs/promises";

await mkdir("assets/portrait", { recursive: true });
const source = process.argv[2] || SITE_CONFIG.portrait;
if (source !== "assets/portrait/harshit-original.jpeg")
  await copyFile(source, "assets/portrait/harshit-original.jpeg");
for (const width of [640, 960, 1254]) {
  await sharp(source)
    .rotate()
    .resize({ width, withoutEnlargement: true })
    .webp({ quality: 87 })
    .toFile(`assets/portrait/harshit-${width}.webp`);
}
console.log("Created responsive portrait files; no facial or body alteration.");
