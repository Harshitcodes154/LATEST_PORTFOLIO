export const projects = [
  {
    id: "wafer-gpt",
    number: "01",
    name: "WAFER-GPT",
    category: "ai",
    discipline: "COMPUTER VISION / GENERATIVE AI",
    visual: "wafer",
    headline: "Beyond the prediction.",
    description:
      "Turning wafer patterns into understandable insights. Computer vision meets an explanation layer built with Grad-CAM and Gemini.",
    stack: ["Python", "TensorFlow", "FastAPI", "OpenCV", "Gemini"],
    repo: "https://github.com/Harshitcodes154/WAFER-GPT",
    live: "https://wafer-gpt.vercel.app/",
    liveLabel: "Open interface",
    problem:
      "A defect label alone does not explain which parts of a wafer map influenced a model’s prediction.",
    solution:
      "A TensorFlow CNN classifies nine wafer-pattern categories. Grad-CAM visualizes model attention; Gemini supplies contextual analysis and follow-up chat through a FastAPI backend.",
    features: [
      "Wafer-map preprocessing and CNN inference",
      "Class probabilities and Grad-CAM overlays",
      "Gemini analysis and context-aware chat",
    ],
    architecture: [
      "Wafer image",
      "Preprocessing",
      "TensorFlow CNN",
      "Grad-CAM + Gemini",
      "FastAPI → interface",
    ],
    note: "The public interface is separate from the inference service. Analysis depends on the deployed model and configured Gemini service. Grad-CAM is an interpretability aid, not a confirmed defect diagnosis.",
    source: "backend/main.py, backend/llm.py, backend/requirements.txt",
  },
  {
    id: "operation-sindoor",
    number: "02",
    name: "Operation Sindoor",
    category: "game",
    discipline: "GAME DEVELOPMENT / INTERACTIVE SYSTEMS",
    visual: "flight",
    headline: "Engineering the feeling of flight.",
    description:
      "An aerial-game prototype exploring flight input, camera systems and a procedural test environment in Unity.",
    stack: ["Unity", "C#", "Unity Input System"],
    repo: "https://github.com/Harshitcodes154/OperationSindoor",
    problem:
      "Flight controls and camera feedback need to feel coherent before an aerial-game concept can become a playable experience.",
    solution:
      "The repository includes a flight input abstraction, smoothing and deadzones, a procedural flight testbed, camera scripts, and HUD and radar components.",
    features: [
      "Smoothed pitch, roll, yaw and throttle input",
      "Procedural ground grid and aircraft test geometry",
      "Camera, radar and HUD scripts",
    ],
    architecture: [
      "Unity Input System",
      "Flight input data",
      "Testbed visualizer",
      "Camera + HUD",
    ],
    note: "An in-development Unity prototype. Included scripts do not establish a complete, released combat game. The cover is a conceptual flight illustration, not gameplay.",
    source:
      "Assets/_Project/Scripts/Input, Assets/_Project/Scripts/Core, Assets/Scripts",
  },
  {
    id: "thermowatch",
    number: "03",
    name: "ThermoWatch AI",
    category: "ai",
    discipline: "GEOSPATIAL INTELLIGENCE / MACHINE LEARNING",
    visual: "thermal",
    headline: "Signals. Context. A clearer picture.",
    description:
      "Connecting satellite thermal hotspots with nearby infrastructure, spatial clustering and an interactive intelligence dashboard.",
    stack: ["Python", "scikit-learn", "Streamlit", "Folium", "NASA FIRMS"],
    repo: "https://github.com/Harshitcodes154/ThermoWatch-AI",
    live: "https://thermowatch-aigit-sih.streamlit.app/",
    liveLabel: "Open application",
    problem:
      "A point on a satellite map says little about its surrounding infrastructure or relationship to nearby thermal observations.",
    solution:
      "A Python pipeline groups detections, associates OpenStreetMap facilities, classifies source types and presents heuristic risk prioritization in a Streamlit dashboard.",
    features: [
      "Spatial and temporal hotspot clustering",
      "Nearby facility attribution",
      "Interactive maps and CSV/PDF reporting",
    ],
    architecture: [
      "NASA FIRMS",
      "Spatial clustering",
      "Facility attribution",
      "Source classification",
      "Streamlit dashboard",
    ],
    note: "Risk scores are application heuristics, not validated emergency forecasts. The illustration represents the project’s geospatial theme, not live satellite data.",
    source:
      "requirements.txt, cluster_hotspots.py, temporal_cluster.py, scripts, app.py",
  },
];

export const archive = [
  {
    name: "Acadence",
    category: "web",
    discipline: "Academic planning",
    stack: "Next.js · React · TypeScript",
    repo: "https://github.com/Harshitcodes154/Acadence",
    description:
      "Browser-local timetable planning, review workflows and CSV exports. Previously SIH_TimeTable.",
  },
  {
    name: "Ashoka Cooling Point",
    category: "web",
    discipline: "Product development",
    stack: "React · TypeScript · Supabase",
    repo: "https://github.com/Harshitcodes154/Ashoka-Cooling-Point",
    description:
      "Appliance-service booking with customer and administration interfaces.",
  },
  {
    name: "Malware Detection",
    category: "security",
    discipline: "Security exploration",
    stack: "Python · YARA",
    repo: "https://github.com/Harshitcodes154/Malware_detection",
    description: "Malware signatures and file metadata analysis.",
  },
  {
    name: "Web Flight Simulator",
    category: "game",
    discipline: "Fork / exploration",
    stack: "Three.js · CesiumJS · JavaScript",
    repo: "https://github.com/Harshitcodes154/web-flight-simulator",
    description:
      "A fork used to explore browser flight simulation. Original project by Dimar Tarmizi; not presented as original work.",
  },
];
