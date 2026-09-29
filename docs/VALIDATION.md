# Validation — 28 September 2026

Rechecked on 29 September after resuming the task: build and lint pass, and all 13 browser tests pass. The final additional test verifies graceful handling of missing case-study artwork.

## Local checks

- `npm install`: complete; lockfile included.
- `npm run build`: complete; static output in `dist/`.
- `npm run lint`: ESLint and generated HTML validation pass.
- `npm test`: 13 Playwright tests pass in installed Google Chrome.
- `npm audit`: 0 vulnerabilities, including development dependencies, after upgrading Sharp to 0.35.5.
- No TypeScript is introduced; the project retains its native JavaScript foundation.

## Browser coverage

Tested widths: 360, 390, 768, 1024 and 1440 pixels, with no document overflow. Reviewed desktop and mobile screenshots, full-page layout, three conceptual project covers and the case-study modal. Checked keyboard navigation, Escape handling, focus restoration, responsive menu, project filters, loaded media, résumé download, no-JavaScript content, reduced motion, GitHub success/cache/failure/malformed payloads and image/résumé failure paths. Axe scans pass for both the main page and open dialog against WCAG 2 A/AA and 2.1 AA tags.

These automated scans supplement visual and interaction testing; they do not certify every accessibility requirement or every browser engine.

## Lighthouse

Lighthouse 13.5.0, localhost, mobile simulation, 4× CPU slowdown and simulated mobile network:

| Category | Score |
| --- | ---: |
| Performance | 97 |
| Accessibility | 100 |
| Best practices | 100 |
| SEO | 100 |

LCP: 2.5 seconds. Total blocking time: 0 ms. Cumulative layout shift: 0. Measured initial page resources: 332 KiB. This is a local lab measurement; deployed hosting, network and device conditions change results. The full local report is in ignored `artifacts/lighthouse-final.json`.

## External checks

All seven displayed project repository URLs and both featured frontend URLs returned HTTP 200 during verification. This confirms reachable pages, not backend health or future availability. LinkedIn rejects automated HEAD requests with HTTP 405; its URL is the exact supplied and résumé-supported profile. Email uses the exact supplied address. No LeetCode URL is guessed.

## Release configuration

Set the actual deployed HTTPS `siteUrl` in `site-config.js` before publishing for canonical metadata, absolute social preview and sitemap generation. Publish `dist/`, not the source root. Hosting has not been changed or deployed. The existing S3 scripts now upload only the build and preserve unrelated bucket objects.
