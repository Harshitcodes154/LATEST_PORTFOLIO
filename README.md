<<<<<<< HEAD
<!-- HARSHIT KUMAR / AI ENGINEERING COMMAND CENTER -->
<picture>
  <source media="(max-width: 600px)" srcset="assets/hero-mobile.png">
  <img src="assets/hero.png" width="100%" alt="HARSHIT KUMAR — AI Engineering Command Center. AI/ML engineer, GenAI builder, computer vision and systems explorer.">
</picture>

<p align="center">
  <a href="assets/resume/Harshit-Kumar-Resume.pdf"><img src="assets/ui/resume.svg" height="38" alt="Download resume"></a>
  <a href="https://www.linkedin.com/in/harshit-kumar-59783b311/"><img src="assets/ui/linkedin.svg" height="38" alt="Connect on LinkedIn"></a>
  <a href="mailto:harshitkumar7212@gmail.com"><img src="assets/ui/mail.svg" height="38" alt="Send email"></a>
</p>

![Profile boot sequence: neural modules, computer vision, generative AI, agents, cloud and Linux loaded. System online.](assets/ui/boot.gif)

## `$ whoami`

I'm **Harshit Kumar**, a **pre-final-year B.Tech student in Computer Science and Engineering, specializing in Artificial Intelligence & Machine Learning at VIT-AP University**.

I build around the full AI application loop: understanding data, training models, inspecting predictions, exposing APIs, and creating interfaces people can use. My projects span **computer vision, generative AI, software engineering, and cloud-backed applications**. Linux, agentic systems, game development, hackathons, and experimental engineering keep me exploring beyond a single stack.

**From wafer maps to satellite hotspots — turning signals into useful software.**

## `$ cat /etc/harshit/current_focus`

![Current focus: AI systems, computer vision, generative AI, agentic systems, Linux, cloud, game development and system design.](assets/ui/current-focus.svg)

**Building:** AI systems · Computer vision · Generative AI · Software engineering  
**Exploring:** Agentic systems · Linux · Cloud · Game development · System design

## `$ ls -la ~/projects/`

### 01 / WAFER-GPT

![WAFER-GPT — AI-powered wafer defect intelligence. CNN classification, Grad-CAM and Gemini.](assets/projects/wafer-gpt.svg)

**Wafer-map classification with an explanation layer.** A TensorFlow/Keras CNN classifies nine wafer-pattern categories; Grad-CAM highlights model attention, while Gemini adds contextual interpretation and follow-up chat. A FastAPI backend connects the model to a browser interface.

`Wafer image → grayscale quantization → 224×224 RGB → CNN → class + Grad-CAM → FastAPI → browser result`

`Prediction context → Gemini → interpretation / chat`

**Stack:** Python · TensorFlow/Keras · OpenCV · FastAPI · Gemini · HTML/CSS/JavaScript · Docker  
**Deployment configuration:** Vercel frontend · Railway API  
**Achievement:** Hackathon winner — WAFER-GPT, Android Club, VIT-AP.

[![View WAFER-GPT source](assets/ui/source.svg)](https://github.com/Harshitcodes154/WAFER-GPT)
[![Open WAFER-GPT interface](assets/ui/interface.svg)](https://wafer-gpt.vercel.app/)

<details>
<summary>Implementation notes</summary>

The preprocessing pipeline maps wafer pixels to three grayscale levels, resizes with nearest-neighbor interpolation, converts to RGB, and normalizes model input. Classification and Grad-CAM are separate from the language-model interpretation. The interface URL is reachable; the configured backend health endpoint returned 404 during inspection. No accuracy or service-uptime claim is implied.

</details>

### 02 / ThermoWatch-AI

![ThermoWatch-AI — satellite thermal and industrial risk. NASA FIRMS, geospatial ML and Streamlit.](assets/projects/thermowatch-ai.svg)

**Satellite hotspots with facility context.** A geospatial pipeline clusters NASA FIRMS detections, associates nearby OpenStreetMap facilities, classifies likely source types, and prioritizes results using a heuristic risk score. The Streamlit dashboard provides Folium maps and CSV/PDF exports, with Open-Meteo weather context.

`VIIRS detections → DBSCAN clusters → OSM facility attribution → source classifier → risk score → map / report`

**Stack:** Python · pandas · NumPy · scikit-learn · Streamlit · Folium · OpenStreetMap · Open-Meteo  
**Architecture:** Data ingestion → spatial attribution with BallTree → classification → dashboard. Risk prioritization is displayed in the application; external emergency-alert delivery is not claimed.

[![View ThermoWatch-AI source](assets/ui/source.svg)](https://github.com/Harshitcodes154/ThermoWatch-AI)
[![Open ThermoWatch-AI app](assets/ui/demo.svg)](https://thermowatch-aigit-sih.streamlit.app/)

### 03 / Operation Sindoor

![Operation Sindoor — fictional aerial combat and game development. Radar, target locking, missions and HUD.](assets/projects/operation-sindoor.svg)

**A fictional air-defense / aerial-combat game concept.** Fighter aircraft, radar sweeps, enemy threats, missile warnings, target locking, missions, weather, and a cinematic HUD shape the intended experience.

`Mission → radar awareness → threat / lock feedback → aerial encounter → mission outcome`

**Design focus:** Flight, radar, mission feedback, and atmosphere. This is the gameplay concept; implementation architecture and engine are not asserted here.

[![View Operation Sindoor source](assets/ui/source.svg)](https://github.com/Harshitcodes154/OperationSindoor)

### 04 / RazorRecover

![RazorRecover — Gemini-assisted payment recovery prototype.](assets/projects/razorrecover.svg)

**A payment-recovery decision prototype.** A Streamlit dashboard calls FastAPI services for risk analysis, root-cause checks, Gemini-assisted decisions, policy validation, and an audit trail. Recovery actions operate on simulated, in-memory transactions.

`Demo payment → risk + root cause → Gemini / fallback → guardrails → simulated retry → audit`

**Stack:** Python · FastAPI · Pydantic · Gemini · Streamlit · pandas  
**Status:** Prototype with simulated recovery; no real payment settlement or recovered-revenue claim.

[![View RazorRecover source](assets/ui/source.svg)](https://github.com/Harshitcodes154/RazorRecover)
[![Open RazorRecover interface](assets/ui/interface.svg)](https://razorrecover-buildathon.streamlit.app/)

### 05 / Ashoka Cooling Point

![Ashoka Cooling Point — appliance-service booking application.](assets/projects/ashoka-cooling-point.svg)

**A service-booking application for appliance repair.** A guided booking flow connects authentication, customer bookings, and dashboards, with an administrative technician-assignment interface.

`React interface → Supabase authentication → bookings + profiles → service dashboard`

**Stack:** TypeScript · React · Vite · Tailwind CSS · Supabase · PostgreSQL  
**Deployment configuration:** Netlify build settings are included in the repository.

[![View Ashoka Cooling Point source](assets/ui/source.svg)](https://github.com/Harshitcodes154/Ashoka-Cooling-Point)

## `$ neofetch --engineering`

| Layer | Technologies and working areas |
| :--- | :--- |
| **Programming** | Python · Java · C · SQL · JavaScript · TypeScript |
| **AI / ML** | TensorFlow · Keras · scikit-learn · OpenCV · CNNs · Grad-CAM · Computer Vision |
| **Generative AI** | Gemini API · LLM applications · Prompt engineering · Agentic workflows |
| **Backend** | FastAPI · Pydantic · REST APIs · Node.js · Express |
| **Interfaces** | React · Streamlit · HTML · CSS · Vite · Tailwind CSS |
| **Data / Spatial** | pandas · NumPy · PostgreSQL · Supabase · Folium · DBSCAN · BallTree |
| **Cloud** | Google Cloud · Vertex AI · Cloud Run · AWS EC2 / S3 / Lambda / IAM / API Gateway |
| **Environment / Tools** | Linux · Git · GitHub · Docker |
| **Game development** | Fictional aerial-combat design · Radar / HUD concepts · Mission systems |

Repository implementations and resume-supported skills inform this stack. Cloud and agentic learning include Google Gen AI Academy work; project-specific stacks are listed above.

## `$ trace --from data --to deployment`

![Engineering loop: data, model, inference, API, application, deployment. Observe, train, evaluate, integrate, ship, improve.](assets/ui/engineering-pipeline.svg)

**Data → Model → Inference → API → Application → Deployment**  
My engineering workflow: inspect the inputs, evaluate behavior, expose useful interfaces, and iterate from what the system actually does.

## `$ ./achievements --verbose`

| Record | Outcome / context |
| :--- | :--- |
| **WAFER-GPT / Android Club Hackathon, VIT-AP** | Winner; built and presented the wafer-defect intelligence project. |
| **Null Chapter CTF** | Winner; hands-on competition challenges. |
| **Google Gen AI Academy — APAC 2026** | Participation; Tracks 1 & 2, GenAI, agentic workflows, and Google Cloud. |
| **PixelHack / DAG Club, VIT-AP** | Hackathon participation and game-development exploration. |
| **Technical Expo** | WAFER-GPT presentation and technical project demonstration. |

### `$ ./ctf_status`

![Null Chapter CTF. Status: winner. Cryptography, web challenges and reverse engineering.](assets/achievements/ctf.svg)

**Null Chapter CTF — Winner.** A competition milestone in problem-solving and security challenges.

## `$ git status` · GIT ACTIVITY / CONTRIBUTION MATRIX

```text
harshit@github:~/activity $ git status --short
REPOSITORIES ...... PUBLIC SNAPSHOT
CONTRIBUTIONS ..... TRACKING GITHUB DATA
REFRESH ........... DAILY WORKFLOW INCLUDED
```

[![Actual GitHub contribution calendar, with exact daily contribution counts and snapshot date.](assets/contribution/calendar.svg)](https://github.com/Harshitcodes154?tab=overview)

[![GitHub statistics: public repositories, stars, active days, contribution streaks, language share and repository activity.](assets/contribution/stats.svg)](https://github.com/Harshitcodes154?tab=repositories)

<details>
<summary>How this activity display stays honest</summary>

The calendar preserves GitHub's familiar week/day grid and uses actual public contribution-page counts. It is a dated snapshot, refreshed by the included workflow after installation. Streaks count consecutive dates with at least one contribution; the longest streak covers the displayed window. Language shares use GitHub Linguist bytes across public, non-fork repositories, not proficiency or time spent. GitHub contribution counts are broader than commits.

[Inspect the data](assets/contribution/activity-source.json) · [Refresh workflow](.github/workflows/update-activity.yml) · [Open the live GitHub profile](https://github.com/Harshitcodes154)

</details>

## `$ cat education.txt`

**B.Tech — Computer Science and Engineering**  
**Specialization:** Artificial Intelligence & Machine Learning  
**Stage:** Pre-final year  
**University:** VIT-AP University

## `$ resume --open`

[![Download Harshit Kumar's supplied resume](assets/ui/resume.svg)](assets/resume/Harshit-Kumar-Resume.pdf)

[Open the original supplied PDF](assets/resume/Harshit-Kumar-Resume.pdf)

## `$ contact --open`

[![Send email](assets/ui/mail.svg)](mailto:harshitkumar7212@gmail.com)
[![Connect on LinkedIn](assets/ui/linkedin.svg)](https://www.linkedin.com/in/harshit-kumar-59783b311/)
[![Open GitHub](assets/ui/github.svg)](https://github.com/Harshitcodes154)

**Mail:** [harshitkumar7212@gmail.com](mailto:harshitkumar7212@gmail.com)  
**LinkedIn:** [Harshit Kumar](https://www.linkedin.com/in/harshit-kumar-59783b311/)  
**GitHub:** [@Harshitcodes154](https://github.com/Harshitcodes154)

## `$ sudo ./harshit_profile --deep-scan`

![Animated profile diagnostics. Harshit Kumar, AI/ML, Linux, Python, AI systems, building projects, hackathon participant and winner. Status online.](assets/ui/deep-scan.gif)

![harshit@github: next iteration. Online. Build, test, learn, ship. Better questions. Stronger systems. One commit at a time.](assets/ui/signature.svg)

<p align="center"><a href="docs/STATIC-PROFILE.md">Low-motion profile</a> · <a href="docs/EVIDENCE.md">Project evidence</a></p>
=======
# Harshit Kumar — Intelligence, engineered.

A cinematic, accessible portfolio built on the existing HTML/CSS/JavaScript site. Static pages, original photography, verified project stories, and a small native JavaScript interaction layer. No production dependencies, API key or backend required.

## Run locally

Use Node.js 24 (see `.nvmrc`) and npm:

```sh
npm install
npm run dev
```

Open http://127.0.0.1:4173. The development server rebuilds when source files change; refresh the browser to see updates.

```sh
npm run build    # renders the complete static site into dist/
npm run preview  # builds and serves dist/ on port 4173
npm run lint     # ESLint and HTML validation; build first
npm test         # Chrome browser, accessibility and responsive checks
npm run check    # build, lint and browser tests
```

Browser tests use installed Google Chrome. If it is not present, run `npx playwright install chrome` before testing. `PORT` overrides the preview server port. No TypeScript is used; JavaScript and HTML are validated directly.

## Structure

- `index.html`: page template, editorial content, landmarks and hero layers.
- `styles.css`: tokens, typography, layouts, breakpoints and CSS motion.
- `site-config.js`: identity, social URLs, résumé, portrait source and deployed URL.
- `data/projects.js`: featured case studies and compact project archive.
- `data/skills.js`, `data/achievements.js`, `data/socials.js`: structured content.
- `components/render.js`: build-time section rendering, with all content present in HTML.
- `components/navigation.js`: sticky navigation, focus handling, active section and progress.
- `components/project-dialog.js`: lazy-loaded accessible native modal.
- `components/github.js`: on-demand repository metadata, validation, timeout and session cache.
- `animations/motion.js`: section reveals, desktop cursor, portrait parallax, magnetic links and project tilt.
- `scripts/`: deterministic static build, local server, portrait compression and project artwork generation.
- `assets/`: original résumé, responsive portrait, self-hosted fonts and license files, SVG project illustrations, favicon and social preview.
- `tests/portfolio.spec.js`: browser tests and axe accessibility scans.
- `docs/AUDIT.md`: audit findings, evidence sources, content corrections and limitations.

## Replace the portrait

The supplied photograph is retained at `assets/portrait/harshit-original.jpeg`. To use another photograph:

```sh
npm run portrait -- "/absolute/path/to/new-photo.jpeg"
npm run build
```

The command copies the original and generates 640, 960 and 1254-pixel WebP variants at quality 87, without facial manipulation. Prefer a square, high-resolution JPEG portrait. Adjust `.portrait-image` object position in `styles.css` for a different crop; update intrinsic width/height and alt text in `index.html` if the source proportions or subject change.

Visual treatment stays in CSS: edge and reveal masks, atmosphere, rim light, static grain, five faint particles, a one-time sweep, float and scale breathing. Desktop uses subtle pointer and scroll translation. Mobile disables continuous portrait transforms. Reduced-motion mode disables animation, smooth scroll, custom cursor and pointer effects.

## Add a project

1. Add a reviewed entry to `projects` in `data/projects.js`, following an existing case study. Use a unique `id`, a filter category (`ai`, `web`, `game`, `security`), verified stack and repository URL. Omit `live` if no real demo exists.
2. Add an illustration named `assets/projects/<visual>.svg`. Set `visual` to that filename without extension. The current covers are concept illustrations, never presented as screenshots.
3. Supply a concise problem, approach, features and architecture based on the implementation. Use `note` to explain material prototype limitations and `source` to identify the inspected code.
4. For a smaller project, add only an `archive` entry. Mark forks explicitly.
5. Rebuild. The case study, filter and all-work count use the same central data.

To regenerate existing SVG covers and the social preview, run `node scripts/artwork.mjs`.

## Links, résumé and content

Edit `site-config.js` for links. GitHub, LinkedIn and email are verified. LeetCode stays `null` until an actual profile is supplied; setting it adds it to the social groups. The existing résumé remains `assets/Harshit_Kumar_Resume.pdf`.

If replacing the résumé, either overwrite that PDF or set `resume: 'public/resume.pdf'` and put the file there. Build-time and runtime missing-file handling offers an email résumé request rather than a broken download. Set `resume: null` to use the conventional `public/resume.pdf` location.

The experience section describes education and independent project work, not employment. Unverified achievement dates are omitted. No accuracy, user-count or performance statistics are invented. See the audit for source details and the corrected Unity and fork attributions.

## GitHub

The repository notebook starts with static links and descriptions. Near the viewport it fetches the public GitHub repositories endpoint once, then enhances the featured entries with language, last push date and stars when positive. Successful results are cached in session storage for 15 minutes. No token is shipped. Timeouts, rate limits, malformed data and blocked storage do not remove the static links. There is no fabricated contribution graph.

## Deployment

Set `SITE_CONFIG.siteUrl` to your actual HTTPS URL with a trailing slash, such as your real domain or GitHub Pages project URL. This enables the canonical URL, absolute Open Graph image, Person URL and sitemap. Leaving it null works locally, but social crawlers need an absolute image URL on deployment.

Run:

```sh
npm ci
npm run build
```

Publish **only `dist/`**. Do not publish the repository root: `index.html` there is a build template.

- **Netlify:** included `netlify.toml` uses `npm run build` and `dist`.
- **Cloudflare Pages / another static host:** use Node 24, build command `npm run build`, output directory `dist`.
- **GitHub Pages:** upload `dist` as the Pages artifact. Assets use relative paths for project subdirectories.
- **Existing S3 hosting:** configure the bucket and HTTPS/CloudFront separately, set `BUCKET_NAME` and optionally `AWS_REGION`, then run `./deploy.ps1` or `bash deploy.sh`. The revised scripts build first and synchronize only `dist`; they neither create buckets, change public-access policies nor delete unrelated objects. Invalidate CloudFront after an update if necessary.

The site has not been published by this implementation task. External project frontends can load while their own backends are unavailable; case studies distinguish interface availability from functional inference.

## Verification

The checked-in tests cover project filtering, modal dismissal and focus return, mobile menu behavior, GitHub success/failure/cache, portrait fallback, missing résumé, no-JavaScript content, reduced motion, local media and layouts at 360/390/768/1024/1440 pixels. Axe runs against the page and open project dialog. Local screenshots and performance audit output are ignored under `artifacts/`.
>>>>>>> 7f656f3 (Updating details and adding animations)
