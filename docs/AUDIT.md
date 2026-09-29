# Portfolio audit and implementation notes

Inspected 28 September 2026. Starting commit: `9569c53`.

## Original repository

The complete tracked application consisted of `index.html`, `styles.css`, `script.js`, `site-config.js`, the supplied résumé, README and two S3 deployment scripts. No framework, package manifest, client router, external JavaScript dependencies or build pipeline existed.

Preserved: static hosting, existing résumé, verified social URLs, project filtering, project content supported by sources and the two deployment entry points.

Problems found:

- A full-screen loader depended on window load and delayed access to the site.
- Appended CSS duplicated transforms, hover rules and animation declarations.
- Project cards and repeated skill cards weakened the content hierarchy.
- Mobile navigation lacked expanded state, Escape handling and focus management.
- Pointer effects ran on touch/reduced-motion devices and modified layout properties for the cursor.
- `site-config.js` was unused; link values were duplicated.
- No portrait, favicon, social preview, structured metadata or project details.
- Hardcoded repository count was stale; several project descriptions overstated current code.
- Deployment scripts synchronized the entire repository with `--delete`, risking source upload and deletion of unrelated bucket objects.

## Content verification

Primary references are the supplied résumé, original portfolio, GitHub profile and actual project code. The résumé was extracted, including embedded hyperlinks. No LeetCode URL was found.

| Content | Evidence / decision |
| --- | --- |
| Identity and education | Supplied résumé and [public profile](https://github.com/Harshitcodes154). B.Tech CSE, AI/ML specialization, VIT-AP; résumé starts August 2024. No employment invented. |
| WAFER-GPT | [main.py](https://github.com/Harshitcodes154/WAFER-GPT/blob/main/backend/main.py), [llm.py](https://github.com/Harshitcodes154/WAFER-GPT/blob/main/backend/llm.py), requirements: TensorFlow CNN, OpenCV, Grad-CAM, FastAPI and Gemini calls. No accuracy claims. |
| Operation Sindoor | [source](https://github.com/Harshitcodes154/OperationSindoor): Unity C# scripts under `Assets/_Project/Scripts` and `Assets/Scripts`, including input smoothing, testbed, camera, radar and HUD. Corrected old browser/Cesium attribution. Explicitly a prototype, not a shipped combat game. |
| ThermoWatch AI | [source](https://github.com/Harshitcodes154/ThermoWatch-AI): requirements, app, clustering and inference scripts; satellite data, spatial grouping, facility attribution and Streamlit. No emergency-forecast claims. |
| Acadence | [source](https://github.com/Harshitcodes154/Acadence), formerly SIH_TimeTable. Current README explicitly describes local planning and per-timetable room/batch collision prevention; faculty scheduling and cloud synchronization are future work. Removed earlier Redis/BullMQ claims. |
| Ashoka Cooling Point | [package and application](https://github.com/Harshitcodes154/Ashoka-Cooling-Point): React, TypeScript, Supabase. No client relationship claimed. |
| Malware Detection | [source](https://github.com/Harshitcodes154/Malware_detection): Python analysis files and YARA signatures. |
| Web Flight Simulator | GitHub API reports `fork: true`. Clearly credited as a fork of Dimar Tarmizi’s project; no original-authorship claim. |
| WAFER hackathon, PixelHack, Technical Expo | Existing portfolio and public profile. No unverified dates or ranks added. |
| Null Chapter CTF | Current public profile names this event; the supplied résumé uses “Null Matrix CTF.” Used the current profile wording, retaining the supported winner outcome without a numeric ranking. |
| Academy 2026 | Current profile names APAC 2026; résumé supports Tracks 1 & 2 and cloud/GenAI learning. |
| SanDisk hackathon | Existing portfolio supports participation only. |
| Viral Assistant | Original site describes a concept but links only to the general profile. Omitted from featured projects without a specific verified implementation. |

Project covers are original SVG **concept illustrations**, not fabricated screenshots or performance dashboards. The supplied portrait is unchanged except for responsive compression; display treatment is CSS.

## Architecture

Static HTML is rendered at build time from small data modules. Browser ES modules add navigation, motion, filtering, lazy native-dialog case studies and lazy GitHub metadata. No hydration, framework runtime or animation dependency. The shipped site remains readable without JavaScript.

Canonical URL and absolute social-preview URL are generated only after `siteUrl` is set. No deployed domain was invented. The GitHub panel uses actual repository metadata; it does not fabricate a contribution calendar or activity totals.

## Validation

See `tests/portfolio.spec.js` for behavioral and responsive coverage. ESLint validates JavaScript; html-validate checks generated markup; Playwright exercises Chrome and axe checks WCAG A/AA rules. Screenshots are stored locally in ignored `artifacts/` for visual review. Browser testing does not establish compatibility with every browser or guarantee third-party demo uptime.
