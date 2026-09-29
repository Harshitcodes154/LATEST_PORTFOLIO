// Lightweight, code-native concept illustrations. These are not product screenshots.
import { mkdir, writeFile } from "node:fs/promises";
import sharp from "sharp";
await mkdir("assets/projects", { recursive: true });
const svg = (body) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="720" viewBox="0 0 1000 720">${body}</svg>`;
const grid = `<defs><pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse"><path d="M50 0H0V50" fill="none" stroke="#b8c698" stroke-opacity=".055"/></pattern><radialGradient id="light"><stop stop-color="#5f6240" stop-opacity=".34"/><stop offset="1" stop-color="#171c15" stop-opacity="0"/></radialGradient></defs><rect width="1000" height="720" fill="#171c15"/><rect width="1000" height="720" fill="url(#grid)"/><ellipse cx="500" cy="360" rx="480" ry="330" fill="url(#light)"/>`;
let cells = "";
for (let y = -13; y <= 13; y++) {
  for (let x = -13; x <= 13; x++) {
    if (x * x + y * y > 170) continue;
    const defect =
      (x - 2) ** 2 + (y + 1) ** 2 > 26 && (x - 2) ** 2 + (y + 1) ** 2 < 47;
    const opacity = 0.35 + ((x * x + y * 7 + 100) % 9) / 17;
    cells += `<rect x="${x * 17}" y="${y * 17}" width="13" height="13" rx="1" fill="${defect ? "#d5af75" : "#718066"}" opacity="${opacity.toFixed(2)}"/>`;
  }
}
await writeFile(
  "assets/projects/wafer.svg",
  svg(
    `${grid}<g transform="translate(500 355) rotate(-27) skewX(12) scale(1.16 .88)"><circle r="256" fill="#0f140e" stroke="#a2a47a" stroke-width="1"/><circle r="246" fill="none" stroke="#626d50" stroke-width=".5"/>${cells}<path d="M-255 0H255M0-255V255" stroke="#c6c09a" stroke-opacity=".22" stroke-width=".5"/><path d="M-15 255 0 239 15 255" fill="#171c15" stroke="#a2a47a"/></g><g fill="none" stroke="#c2b184" stroke-opacity=".55"><path d="m220 235-80-45H82m692 266 88 35h55"/><circle cx="222" cy="235" r="4"/><circle cx="774" cy="501" r="4"/><path d="M499 89v27M485 103h28"/></g><g fill="#a7ae91" font-family="monospace" font-size="10" letter-spacing="2"><text x="81" y="175">WAFER MAP</text><text x="775" y="561">MODEL ATTENTION</text><text x="449" y="632">EXPLAINABLE AI</text></g>`,
  ),
);
let terrain = "";
for (let i = 0; i < 19; i++) {
  let d = "";
  for (let x = -50; x <= 1050; x += 15) {
    const y =
      390 + i * 17 + Math.sin(x / 110 + i * 0.16) * 29 + Math.cos(x / 210) * 44;
    d += `${x === -50 ? "M" : "L"}${x},${y.toFixed(1)} `;
  }
  terrain += `<path d="${d}" fill="none" stroke="#849477" stroke-opacity="${(0.06 + i * 0.004).toFixed(3)}"/>`;
}
await writeFile(
  "assets/projects/flight.svg",
  svg(
    `${grid}${terrain}<g fill="none" stroke="#b6c4a1"><ellipse cx="500" cy="345" rx="272" ry="235" stroke-opacity=".11"/><ellipse cx="500" cy="345" rx="213" ry="184" stroke-opacity=".12" stroke-dasharray="3 10"/><path d="M180 345H820M500 92V605" stroke-opacity=".16" stroke-dasharray="7 8"/></g><g transform="translate(500 355) rotate(-26)"><path d="M0-235 19-112 35-68 189 85 185 103 36 53 27 125 80 175 78 189 12 171 0 194-12 171-78 189-80 175-27 125-36 53-185 103-189 85-35-68-19-112Z" fill="#2b3428" stroke="#a0b88b" stroke-width="1.6"/><path d="M0-235V194M0-183 19-112 0-65-19-112ZM0-65 35-68 36 53 0 83-36 53-35-68ZM35-68 185 103M-35-68-185 103M36 53 27 125 0 155-27 125-36 53M0 155 78 189M0 155-78 189" fill="none" stroke="#a0b88b" stroke-opacity=".65"/><path d="M0-167 10-118 0-88-10-118Z" fill="#b4c497" opacity=".3"/><path d="M-8 176-8 206M8 176V206" stroke="#d2ac79" opacity=".8"/></g><g fill="#a7b397" font-family="monospace" font-size="10" letter-spacing="2"><text x="93" y="180">FLIGHT SYSTEMS</text><text x="728" y="567">INPUT / RESPONSE</text><text x="420" y="629">PROTOTYPE STUDY</text></g><g fill="none" stroke="#91a57b" stroke-opacity=".5"><path d="M98 197h150l44 42m412 259 46 50h117"/><path d="M100 290v75m-5-75h10m-10 25h10m-10 25h10m-10 25h10"/></g>`,
  ),
);
let contours = "";
for (let i = 0; i < 28; i++) {
  let d = "";
  for (let j = 0; j <= 100; j++) {
    const a = (j / 100) * Math.PI * 2;
    const r =
      40 + i * 12 + Math.sin(a * 3 + i * 0.13) * 24 + Math.cos(a * 7) * 10;
    const x = 520 + Math.cos(a) * r * 1.5;
    const y = 360 + Math.sin(a) * r * 0.8;
    d += `${j === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)} `;
  }
  contours += `<path d="${d}Z" fill="none" stroke="${i < 8 ? "#b9a578" : "#748369"}" stroke-opacity="${i < 8 ? ".34" : ".22"}" stroke-width=".8"/>`;
}
const hotspots = [
  [455, 329, 30],
  [585, 382, 22],
  [650, 267, 13],
  [326, 445, 9],
]
  .map(
    ([x, y, r]) =>
      `<g transform="translate(${x} ${y})"><circle r="${r * 2}" fill="#d0984e" opacity=".055"/><circle r="${r}" fill="#d0984e" opacity=".12"/><circle r="4" fill="#d6b579"/><circle r="${r * 1.5}" fill="none" stroke="#d6b579" stroke-opacity=".35" stroke-dasharray="2 5"/></g>`,
  )
  .join("");
await writeFile(
  "assets/projects/thermal.svg",
  svg(
    `${grid}${contours}${hotspots}<g fill="none" stroke="#d6b579" stroke-opacity=".4"><path d="m455 329 130 53 65-115M455 329 326 445" stroke-dasharray="4 6"/><path d="M85 165h28m-14-14v28m771 366h28m-14-14v28"/></g><g fill="#b2b79f" font-family="monospace" font-size="10" letter-spacing="2"><text x="85" y="201">SPATIAL CONTEXT</text><text x="726" y="595">THERMAL SIGNATURES</text><text x="412" y="635">SIGNAL → INTELLIGENCE</text></g>`,
  ),
);
const social = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"><rect width="1200" height="630" fill="#101110"/><circle cx="990" cy="200" r="270" fill="#23291d"/><circle cx="990" cy="200" r="220" fill="none" stroke="#d2ac79" stroke-opacity=".3"/><path d="M60 65H1140M60 565H1140" stroke="#3c4235"/><g font-family="Arial,sans-serif"><text x="70" y="127" font-size="14" letter-spacing="4" fill="#d2ac79">AI/ML · ENGINEERING · CREATIVE TECHNOLOGY</text><text x="60" y="290" font-size="128" font-weight="bold" letter-spacing="-8" fill="#efeee7">HARSHIT</text><text x="60" y="419" font-size="128" font-weight="bold" letter-spacing="-8" fill="#efeee7">KUMAR<tspan fill="#d2ac79">.</tspan></text><text x="70" y="504" font-size="22" fill="#b2baa7">Intelligent systems. Tangible experiences.</text><text x="70" y="602" font-size="12" letter-spacing="2" fill="#a2a59c">PERSONAL PORTFOLIO / 2026</text></g></svg>`;
await sharp(Buffer.from(social))
  .jpeg({ quality: 88 })
  .toFile("assets/social-preview.jpg");
console.log(
  "Generated three conceptual project illustrations and social preview.",
);
