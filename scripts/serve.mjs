import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { watch } from "node:fs";
import { spawnSync } from "node:child_process";
import path from "node:path";

const root = process.cwd();
const output = path.join(root, "dist");
const port = Number(process.env.PORT || 4173);
const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css",
  ".js": "text/javascript",
  ".svg": "image/svg+xml",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".webp": "image/webp",
  ".woff2": "font/woff2",
  ".pdf": "application/pdf",
  ".json": "application/json",
  ".txt": "text/plain",
  ".xml": "application/xml",
};
function build() {
  const result = spawnSync(process.execPath, ["scripts/build.mjs"], {
    cwd: root,
    stdio: "inherit",
  });
  if (result.status !== 0) throw new Error("Build failed");
}
build();
if (process.argv.includes("--watch")) {
  let timer;
  for (const entry of [
    "index.html",
    "styles.css",
    "script.js",
    "site-config.js",
    "components",
    "animations",
    "data",
    "assets",
  ]) {
    watch(path.join(root, entry), { recursive: true }, () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        try {
          build();
        } catch (error) {
          console.error(error.message);
        }
      }, 200);
    });
  }
}
createServer(async (request, response) => {
  try {
    const pathname = decodeURIComponent(
      new URL(request.url, "http://localhost").pathname,
    );
    let file = path.resolve(output, `.${pathname}`);
    if (file !== output && !file.startsWith(output + path.sep)) {
      response.writeHead(403).end();
      return;
    }
    if ((await stat(file)).isDirectory()) file = path.join(file, "index.html");
    const body = await readFile(file);
    response.writeHead(200, {
      "Content-Type": types[path.extname(file)] || "application/octet-stream",
      "Cache-Control": "no-cache",
      "X-Content-Type-Options": "nosniff",
    });
    response.end(request.method === "HEAD" ? undefined : body);
  } catch {
    response.writeHead(404, { "Content-Type": "text/plain" }).end("Not found");
  }
}).listen(port, "127.0.0.1", () =>
  console.log(`Portfolio: http://127.0.0.1:${port}`),
);
