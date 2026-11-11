import type { Project } from "../types";

// Every claim below is traceable to the project's own README, docs or code.
// Statistics keep the caveats they carry in the source. Do not add a number
// here unless it can be checked, and keep demo/repo links to URLs that exist.

export const projects: Project[] = [
  {
    slug: "abyss",
    title: "ABYSS AI",
    subtitle: "Adaptive Biodiversity Exploration",
    tagline: "Intelligence for underwater exploration.",
    summary:
      "An autonomous underwater-exploration simulator that learns where biodiversity may be found and replans survey missions under energy constraints. Built on real GEBCO bathymetry from Monterey Canyon, with a Python mission engine and an interactive 3D Mission Control.",
    categories: ["robotics", "ai-ml"],
    tags: [
      "Python",
      "Three.js",
      "Bayesian planning",
      "Computer vision",
      "GEBCO bathymetry",
    ],
    year: "2026",
    status: "Research prototype and early-stage initiative",
    role: "Co-founder. Simulator, mission integration and Mission Control.",
    team: "Built with Cam and Ammar. First version made in 24 hours at WHACK 2026 for the Marshall Wace New Worlds Challenge.",
    problem: [
      "Most of the deep ocean has never been surveyed, and underwater robots run on a fixed battery. Most surveys follow a route planned before the dive, like mowing a lawn, and ignore what the robot finds on the way.",
      "ABYSS asks a narrower question: if a robot updates its beliefs after every survey and replans, does it find more life on the same energy budget, and can it still always get home?",
    ],
    contribution: [
      "I built the simulation backbone: the 900-waypoint GEBCO Monterey Canyon environment, the hidden biodiversity worlds, the energy and safe-return rules (SciPy Dijkstra over the seabed graph), deterministic runs and logging, and the mission contract that planners talk to. I also built Mission Control, the interactive Three.js replay.",
      "The Bayesian learner, planner, baselines and benchmark statistics were built by Cam. The computer-vision pipeline and findings report were Ammar's. The project has continued as an early-stage initiative since the hackathon.",
    ],
    approach: [
      {
        title: "Observe",
        body: "Survey a spot. A vision model (DINOv2 on FathomNet photos) names the kinds of life in the images.",
      },
      {
        title: "Learn",
        body: "A Bayesian regression links how many kinds were found to the terrain there, such as depth, slope and ridge or valley, and tracks how sure it is.",
      },
      {
        title: "Plan",
        body: "Score every safe, unvisited spot by predicted life plus learning value plus new ground, divided by energy cost.",
      },
      {
        title: "Explore",
        body: "Travel to the best spot and survey it. The simulator only reveals what the camera would actually see.",
      },
      {
        title: "Return safely",
        body: "A target is accepted only if the remaining energy covers travel, the survey, the trip home and a reserve.",
      },
    ],
    engineering: [
      {
        title: "Planners never see the answer",
        body: "Hidden biodiversity lives in separate reveal files. Planners only receive the public map, their own state and what the camera saw, and tests check that nothing leaks.",
      },
      {
        title: "Safe return as an invariant",
        body: "Every target must satisfy remaining energy >= travel + survey + return + reserve. Costs are symmetric, so the cost home from any cell is a single Dijkstra run from home.",
      },
      {
        title: "Fair, deterministic comparison",
        body: "Each world is generated once per seed, independent of the planner. Terrain, world and planner use separate random streams, and settings were tuned on practice oceans and frozen before the held-out run.",
      },
      {
        title: "Real seafloor, simulated life",
        body: "The bathymetry is a 30 by 30 crop of the GEBCO 2025 grid over Monterey Canyon and the photos are real. Where organisms live is simulated, so every robot can be scored against a known answer.",
      },
      {
        title: "Mission Control",
        body: "A Three.js replay of logged missions with terrain, habitat, predicted and uncertainty layers, charts and side-by-side robots. It runs in any browser, offline, with no downloads.",
      },
    ],
    metrics: [
      {
        value: "6,300",
        label: "simulated benchmark missions",
        note: "50 held-out oceans, every planner on the same worlds. All returned safely, with 0 forced returns.",
      },
      {
        value: "15.8 vs 11.1",
        label: "kinds of life found, out of 16",
        note: "ABYSS vs frontier exploration where life follows ridges. About 42% more (+4.7, 95% interval +4.3 to +5.1).",
      },
      {
        value: "3.3 fewer",
        label: "with learning switched off",
        note: "Same robot, same ridge worlds. The gain comes from the learning, not the route.",
      },
    ],
    resultsSummary:
      "Where life follows terrain, learning where to look pays off: ABYSS found about 42% more kinds of life than frontier exploration on the same battery. The gain shrinks as the link between terrain and life weakens, and it does not win everywhere.",
    limitations: [
      "It is a simulation. The seafloor and photos are real, but where organisms live is simulated so every robot can be scored against a known answer. Energy is in abstract units.",
      "It does not win universally. A simple lawnmower sweep beats it where life favours flat ground, because ABYSS predicts how much life a spot has, not whether it is new.",
      "The benchmark covers one canyon, a 30 by 30 grid and five simulated world types.",
      "No physical robot has been built or deployed. ABYSS AI is an early-stage initiative, not a product.",
    ],
    features: [
      "Real GEBCO bathymetry as a 900-waypoint planning grid",
      "Hidden simulated biodiversity the planner cannot see",
      "Observation-driven Bayesian planning under an energy budget",
      "Safe-return rule enforced on every target",
      "Interactive 3D Mission Control with replay and charts",
    ],
    cover: {
      src: "/projects/abyss/mission-control.webp",
      alt: "ABYSS Mission Control showing two simulated robots, ABYSS and a frontier baseline, exploring real GEBCO seafloor in 3D with live category counts.",
      width: 1800,
      height: 1013,
      caption:
        "Mission Control replaying a ridge-associated world: ABYSS has found 15 categories while the frontier baseline has found 9.",
      kind: "screenshot",
    },
    gallery: [
      {
        src: "/projects/abyss/paired-difference.webp",
        alt: "Chart of the paired advantage of ABYSS over each baseline across five simulated world types, with 95% bootstrap intervals.",
        width: 1460,
        height: 1221,
        caption:
          "Paired advantage of ABYSS over each baseline on identical worlds, with 95% bootstrap intervals. Right of zero means ABYSS found more. The rows near zero are the worlds where it does not win.",
        kind: "screenshot",
      },
    ],
    demoHref: "https://abyss-ai-ui.vercel.app/",
    repoHref: "https://github.com/Rihaan5126/Abyss-AI",
    featured: true,
    order: 1,
    accent: "cyan",
    keyMetric: { value: "6,300", label: "simulated missions, all returned safely" },
  },
  {
    slug: "strata",
    title: "Strata",
    subtitle: "A voxel engine in Rust",
    tagline: "A world built from blocks, rendered from scratch.",
    summary:
      "An original voxel sandbox built in Rust to explore multicore performance and GPU rendering. It has procedural terrain across seven biomes, chunk streaming and meshing, lighting, world persistence and a first version of survival.",
    categories: ["systems-graphics"],
    tags: ["Rust", "wgpu", "Rayon", "Procedural generation", "Game engine"],
    year: "2026",
    status: "Early build, private repository",
    role: "Engine design and development.",
    problem: [
      "Voxel worlds look simple and hide a lot of work. Terrain, lighting and meshing are all expensive per chunk, and every block edit has to ripple through its neighbours fast enough to feel instant.",
      "I wanted to build one from scratch to learn where the time goes, and to measure how well that work spreads across CPU cores instead of assuming it does.",
    ],
    contribution: [
      "I designed and built the engine: the job system, world and chunk storage, terrain generation, lighting, greedy meshing, fixed-tick player physics, the wgpu renderer, UI, saves and the benchmark harness.",
      "It is an original project. The art, UI, blocks and world design are its own, and it loads no assets from any other game.",
    ],
    approach: [
      {
        title: "Generate",
        body: "Seeded terrain, seven biomes, caves, ores and trees are generated per chunk on a bounded priority job system.",
      },
      {
        title: "Light",
        body: "Sky and block light are flood-filled per chunk. An edit remeshes the affected chunk and its neighbours.",
      },
      {
        title: "Mesh",
        body: "Chunks are meshed from immutable snapshots with greedy merging, so workers never need to lock the world.",
      },
      {
        title: "Draw",
        body: "A wgpu renderer streams the meshes to the GPU with ambient occlusion, water and a day and night sky.",
      },
      {
        title: "Simulate and save",
        body: "Fixed-tick player physics and raycasting drive mining and building, and worlds persist to disk.",
      },
    ],
    engineering: [
      {
        title: "A job system built for measurement",
        body: "A bounded priority queue on a dedicated Rayon pool, with backpressure, panic handling and per-job metrics, so scaling can be measured rather than guessed.",
      },
      {
        title: "Immutable meshing snapshots",
        body: "Meshing reads a snapshot of chunk data, which keeps workers independent. Greedy meshing is tested face-for-face against the unmerged output.",
      },
      {
        title: "Palette-compressed chunks",
        body: "Chunk storage uses palettes and is property-tested against a simple dense model.",
      },
      {
        title: "Benchmarks that check themselves",
        body: "The headless benchmark rotates worker counts every round, reports the median of 7, and hashes blocks and mesh vertices to prove every worker count produced identical output.",
      },
      {
        title: "A roadmap with evidence",
        body: "Each system is marked not started, in progress, implemented, tested or verified, with the evidence or the gap written next to it.",
      },
    ],
    metrics: [
      {
        value: "6.7x",
        label: "chunk generation speedup at 12 workers",
        note: "Ryzen 5 5500U (6 cores, 12 threads), seed 12345, median of 7 rounds across three runs. Identical output at every worker count.",
      },
      {
        value: "7",
        label: "biomes",
        note: "Ocean, shore, highlands, dunes, frostland, woodland and meadow.",
      },
      {
        value: "4.8x",
        label: "meshing cost once lighting was added",
        note: "About 0.7 ms to 3.3 ms per chunk on one worker. Light solving is now the largest per-chunk cost and the next target.",
      },
    ],
    resultsSummary:
      "Chunk generation, lighting and meshing all scale well past the physical core count on the one machine I measured, with workers about 98 to 100% busy, so the job queue is not the bottleneck. The numbers are one laptop, one seed and one session, and the benchmark doc says what they do not show.",
    limitations: [
      "This is an early build. There is no hunger, tools, creatures or crafting yet.",
      "It is an original engine, not an AAA engine and not a Minecraft replacement.",
      "Benchmarks are one laptop CPU, one seed and one session. Low worker-count speedups varied between runs and should not be quoted precisely.",
      "Some systems are verified by scripted runs rather than hand-testing. The roadmap says which.",
      "The repository is private for now, so there is no public source link. Screenshots are captured from the running game.",
    ],
    features: [
      "Seeded procedural terrain with seven biomes, caves, ores and trees",
      "Greedy meshing, flood-fill lighting, ambient occlusion, water and weather",
      "Worlds that save and load, with four game modes",
      "First survival systems: mining drops, health, fall damage, death and respawn",
      "Procedural block art painted at startup, no asset files",
    ],
    cover: {
      src: "/projects/strata/cover.webp",
      alt: "First-person view in Strata of a shoreline made of blocks, with grass, sand and water under a bright sun.",
      width: 1800,
      height: 913,
      caption: "In-game screenshot captured from the running engine.",
      kind: "screenshot",
    },
    gallery: [
      {
        src: "/projects/strata/woodland.webp",
        alt: "A Strata woodland with blocky trees, a pond and a stone block in the player's hand.",
        width: 1800,
        height: 913,
        caption: "Woodland biome with the hotbar and a held block.",
        kind: "screenshot",
      },
      {
        src: "/projects/strata/rain.webp",
        alt: "Rain falling over a block-built sea in Strata, with a stone block held in the foreground.",
        width: 1800,
        height: 703,
        caption: "Weather and dynamic sky, cropped from a verification screenshot.",
        kind: "screenshot",
      },
    ],
    // TODO(media): add a short gameplay clip and a public demo or release build
    // once the repository is ready to make public.
    demoNote: "Demo coming soon",
    repoNote: "Private repository",
    featured: true,
    order: 2,
    accent: "blue",
    keyMetric: {
      value: "6.7x",
      label: "generation speedup on 12 threads (one laptop)",
    },
  },
  {
    slug: "aether",
    title: "AETHER",
    subtitle: "Evolutionary ML research platform",
    tagline: "Evolutionary trading agents, evaluated without shortcuts.",
    summary:
      "A full-stack research platform for training and evolving rule-based and ML trading agents, with purged walk-forward validation, realistic transaction costs, reproducible experiment tracking and a held-out final test.",
    categories: ["ai-ml", "full-stack"],
    tags: ["Python", "PyTorch", "XGBoost", "FastAPI", "Next.js"],
    year: "2026",
    status: "Research platform with a read-only public showcase",
    role: "Platform design, ML evaluation and full-stack engineering.",
    problem: [
      "It is easy to build a trading backtest that looks brilliant: look-ahead bias, tuning against the test set, optimistic costs. The interesting question is whether a population of agents, trained and evolved on historical data, can find anything that survives honest out-of-sample evaluation.",
      "AETHER is built so the answer, whichever way it goes, can be trusted.",
    ],
    contribution: [
      "I designed the platform and its evaluation protocol and built it end to end: the research engine, the FastAPI service with background jobs, and the Next.js dashboard.",
      "A lot of the work is in the parts that stop it lying to me: point-in-time features, leakage tests for every agent family, a final test locked by type, and calibrated uncertainty on every metric.",
    ],
    approach: [
      {
        title: "Ingest",
        body: "Datasets are validated, cleaned, content-hashed and stored immutably. Every experiment records exactly which bytes it used.",
      },
      {
        title: "Featurise",
        body: "25 point-in-time features. A feature on day t only uses bars up to the close of day t.",
      },
      {
        title: "Evaluate",
        body: "Agents are scored on purged, expanding walk-forward folds with an embargo, the same costs and the same risk rules.",
      },
      {
        title: "Evolve",
        body: "Elitism, tournament selection, bounded mutation and same-family crossover, with full lineage and cached re-evaluation.",
      },
      {
        title: "Final test",
        body: "The most recent 20% of the series stays locked away until one explicit, one-time run on pre-registered champions.",
      },
    ],
    engineering: [
      {
        title: "Leakage guards",
        body: "Poisoned-future tests recompute features and check that all six agent families make bit-identical decisions up to day t, and that the simulated portfolio is unchanged.",
      },
      {
        title: "Final test locked by type",
        body: "Tournaments and evolution only accept a development-data type that cannot contain test bars. Running the final test twice needs an explicit acknowledgement and permanently flags the experiment.",
      },
      {
        title: "Uncertainty that is calibrated",
        body: "Daily returns cluster in volatility, so plain bootstrap intervals are too narrow. A stationary block bootstrap was implemented and its coverage tested on simulated data.",
      },
      {
        title: "Bit-identical reproducibility",
        body: "Seeded generators, single-threaded XGBoost and Random Forest, and deterministic PyTorch mean an identical configuration reproduces identical results, in parallel or serial.",
      },
      {
        title: "Typed genomes, never code",
        body: "Agents are built from typed, bounded genomes. The API accepts configuration, never Python or shell, and model artifacts load only after their SHA-256 matches the database record.",
      },
    ],
    metrics: [
      {
        value: "0 of 15",
        label: "evolved champions beat buy-and-hold",
        note: "On the locked 2022 to 2026 final test, run once after all selection was complete.",
      },
      {
        value: "13 of 15",
        label: "runs raised their selection score",
        note: "Yet the champion was no better than generation 0 on unseen data (6 wins, 7 losses) and lost to equal-budget random search (4 wins, 9 losses).",
      },
      {
        value: "797 / 797",
        label: "values reproduced bit for bit",
        note: "A full real-data research run re-executed from scratch matched on every value.",
      },
    ],
    resultsSummary:
      "On five liquid US instruments over 21 years, evolution reliably improves the score it is selected on, but it does not find strategies that generalise better than its own first generation or an equal-budget random search, and none beat passive exposure on the final test. The platform exists to report exactly that, and it does.",
    limitations: [
      "Historical simulation only. AETHER never places orders, connects to a broker or claims any strategy is profitable. Nothing it produces is investment advice.",
      "2022 to 2026 was largely a bull market, which favours simply staying invested.",
      "Results on synthetic data say nothing about real markets. Yahoo Finance data is unofficial and fine for prototyping, not institution-grade.",
      "The public site is a read-only snapshot of results computed locally. Training and new experiments are disabled there.",
    ],
    features: [
      "Six agent families: random, buy and hold, momentum, Random Forest, XGBoost and a PyTorch MLP",
      "Event-driven simulator with fees, slippage and a risk manager",
      "Purged walk-forward validation and a locked final test",
      "Evolution with full lineage, plus Optuna studies on validation folds only",
      "Dashboard with leaderboard, agent comparison, lineage graph and research analytics",
    ],
    cover: {
      src: "/projects/aether/overview.webp",
      alt: "AETHER dashboard overview with a chart of validation return against buy-and-hold and a list of recent experiments.",
      width: 1440,
      height: 1000,
      caption: "Dashboard overview on the synthetic demo experiment.",
      kind: "screenshot",
      focus: "top",
    },
    gallery: [
      {
        src: "/projects/aether/tournaments.webp",
        alt: "AETHER Tournaments page with a leaderboard of agents, status labels, warnings and an equity chart against buy-and-hold.",
        width: 1440,
        height: 1027,
        caption:
          "Tournaments: every agent on the same folds, costs and risk rules, with warnings for thin evidence.",
        kind: "screenshot",
      },
      {
        src: "/projects/aether/evolution.webp",
        alt: "AETHER Evolution Lab with a lineage graph and validation score by generation.",
        width: 1440,
        height: 1251,
        caption:
          "Evolution Lab: lineage and per-generation scores, with a note that validation gains can be selection bias.",
        kind: "screenshot",
      },
    ],
    demoHref: "https://aetherbyrihaan.vercel.app/",
    repoHref: "https://github.com/Rihaan5126/AETHER",
    featured: true,
    order: 3,
    accent: "violet",
    keyMetric: {
      value: "0 of 15",
      label: "evolved champions beat buy-and-hold on the locked final test",
    },
  },
  {
    slug: "recallai",
    title: "RecallAI",
    subtitle: "A visual memory assistant",
    tagline: "Helping AI remember where you last saw things.",
    summary:
      "A Cal Hacks 13.0 prototype combining object detection, visual recognition, timestamped observations and natural-language retrieval to answer questions about where belongings were last seen.",
    categories: ["ai-ml"],
    tags: ["Python", "FastAPI", "YOLO", "DINOv2", "SQLite"],
    year: "2026",
    status: "Hackathon prototype",
    role: "Temporal Memory and backend integration.",
    team: "Built at Cal Hacks 13.0 in Berkeley with Kentstar Harsono, jgsam and Chawin.",
    problem: [
      '"Where did I leave my keys?" is a memory problem. A camera that only detects objects can say what it sees now, but not what it saw twenty minutes ago, or when.',
      "RecallAI watches through an ordinary webcam, recognises your own belongings rather than generic objects, and remembers where each one was last seen, with a photo as proof.",
    ],
    contribution: [
      "I built the Temporal Memory layer: last-seen retrieval, historical observations, elapsed-time computation and the grounded, time-aware answers the assistant gives, plus backend integration.",
      "Every answer is computed from stored sighting rows, never guessed. The camera and vision pipeline, the Grok-powered assistant, the live dashboard and the sync layer were built by the team.",
    ],
    approach: [
      {
        title: "Register",
        body: "Show the camera an item from three angles. There is no training step.",
      },
      {
        title: "Detect and recognise",
        body: "YOLO finds objects in each frame, then DINOv2 compares each one with your reference photos. A similarity of 0.70 or more means it is yours.",
      },
      {
        title: "Remember",
        body: "A sighting snapshot is saved at most every 15 seconds while an item is in view, and another 5 seconds after it leaves.",
      },
      {
        title: "Answer",
        body: "Time-aware retrieval turns the stored sightings into a grounded answer with links to the snapshots it used.",
      },
    ],
    engineering: [
      {
        title: "Observed, not inferred",
        body: "A sighting is where an item was. Nothing in the memory layer says where it is now. The last-seen time is the newest sighting, never the moment the item went missing.",
      },
      {
        title: "Defensive time handling",
        body: "Timestamps are stored as UTC ISO strings, naive values are read as UTC, small clock jitter is clamped, and a stale 'seen' row means recording stopped, not that the item left.",
      },
      {
        title: "Read-only and per user",
        body: "Looking an item up never creates a sighting or resets its age, and every query is scoped to the signed-in user's own rows.",
      },
      {
        title: "Recognition by example",
        body: "The team picked DINOv2 over CLIP after it separated 'my bottle' from 'a bottle' 3 to 4 times better on their own frames, and set the 0.70 threshold from measurements.",
      },
    ],
    metrics: [
      {
        value: "3 to 4x",
        label: "better separation than CLIP",
        note: "DINOv2 vs CLIP on the team's own frames, telling your item from a similar one.",
      },
      {
        value: "0.77 to 0.95",
        label: "similarity, same item",
        note: "Other objects scored 0.64 or lower, which is why the match threshold is 0.70.",
      },
      {
        value: "250+",
        label: "backend tests",
        note: "With the assistant mocked, and CI running on every push.",
      },
    ],
    resultsSummary:
      "It works end to end on a laptop: register an item, watch it move around a room, and ask where it was last seen. The memory layer's answers are traceable to stored sightings, which is the property I cared about most.",
    limitations: [
      "A hackathon prototype tested on a handful of items in one venue.",
      "Sightings are where an item was seen, not a live location. It does not do continuous perfect tracking.",
      "The conversational assistant needs an xAI API key. Without one, everything except the assistant still works.",
      "Setup is Windows-first, and the repository belongs to a teammate.",
    ],
    features: [
      "Recognises your own items from a few reference photos",
      "Remembers every sighting with a photo, time and nearby objects",
      "Answers 'where did I leave...' questions with links to evidence",
      "Warns about items that left view and stayed gone",
    ],
    cover: {
      src: "/projects/recallai/timeline.webp",
      alt: "RecallAI's sighting history panel for a backpack, showing where it was recalled, how long ago, and a snapshot marked as seen and unchecked.",
      width: 480,
      height: 900,
      caption:
        "Sighting history for one belonging, cropped to the panel. Time-aware recall is the part I built.",
      kind: "screenshot",
      fit: "contain",
    },
    gallery: [],
    repoHref: "https://github.com/Slickstarlol/CalHacksObjectFinder",
    repoLabel: "Team repository",
    articleHref: "https://devpost.com/software/recallai-zqg29w",
    articleLabel: "Devpost",
    featured: false,
    order: 4,
    accent: "violet",
  },
  {
    slug: "campus-map",
    title: "3D Campus Digital Twin",
    subtitle: "University of Birmingham, Edgbaston",
    tagline: "A real campus reimagined in interactive 3D.",
    summary:
      "An interactive 3D digital twin built from real OpenStreetMap building footprints, with 60 campus buildings, bespoke landmarks, cinematic camera movement and walking routes over the actual path network.",
    categories: ["systems-graphics"],
    tags: ["Three.js", "TypeScript", "WebGL", "OpenStreetMap", "Dijkstra routing"],
    year: "2026",
    status: "Live demo, open source",
    role: "Design and development.",
    problem: [
      "Campus maps are flat and static. I wanted a space you can actually explore that is accurate to the real campus, with real building outlines and real paths, without photogrammetry or licensed imagery.",
    ],
    contribution: [
      "I built it end to end: the OpenStreetMap extraction, the footprint-to-mesh pipeline, procedural textures and landscaping, the bespoke Old Joe and Aston Webb models, picking and the camera system, and the Map and Directions routing.",
    ],
    approach: [
      {
        title: "Extract",
        body: "Query OpenStreetMap through Overpass for named university buildings and real footpaths inside the campus bounding box.",
      },
      {
        title: "Project",
        body: "Convert every footprint polygon to local metres around Old Joe, using one real-world mapping shared by the scene and live GPS.",
      },
      {
        title: "Generate",
        body: "Extrude each footprint into a massed building with a procedural facade, plinth, cornice and rooftop clutter.",
      },
      {
        title: "Route",
        body: "Snap start and destination to the path graph and run Dijkstra to draw a walking route with distance and time.",
      },
    ],
    engineering: [
      {
        title: "Real footprints, not guesses",
        body: "Position, plan shape and height come from OpenStreetMap data. The facade detail on generic buildings is simplified, and the project says so rather than passing it off as a scan.",
      },
      {
        title: "Instancing",
        body: "Three tree species, foundation shrubs and 1,000+ lamp posts along the real paths are drawn with instanced meshes, so the draw-call count stays low however many there are.",
      },
      {
        title: "Procedural textures",
        body: "Brick, stone, grass with mowing stripes, sky and window-grid facades are all generated on a canvas at startup. No imagery is downloaded or scraped.",
      },
      {
        title: "One coordinate system",
        body: "Live GPS fixes go through the same projection the 3D scene is built on, so the you-are-here marker lines up exactly. A manual pin works when location is unavailable.",
      },
      {
        title: "A camera that stays a map",
        body: "Orbit controls are capped so the view always reads as tilting a satellite map, with a separate 360 degree viewer for the two bespoke landmarks.",
      },
    ],
    metrics: [
      {
        value: "60",
        label: "campus buildings",
        note: "58 from OpenStreetMap footprints plus 2 bespoke landmarks.",
      },
      {
        value: "~430",
        label: "OSM path segments",
        note: "Merged into one mesh and reused for tree placement, lamp posts and walking routes.",
      },
      {
        value: "0",
        label: "downloaded textures",
        note: "Every texture is generated at startup.",
      },
    ],
    resultsSummary:
      "You can orbit the campus, click any of the 60 buildings to fly to it, open a 360 degree viewer on Old Joe or the Aston Webb building, and get walking directions along real paths from a live GPS fix or a dropped pin.",
    limitations: [
      "Building facades are simplified massing on real footprints, not photogrammetry.",
      "Only Old Joe and the Aston Webb building have bespoke models and an Explore in 3D viewer.",
      "Terrain elevation is a small procedural undulation, not survey contour data.",
      "Generic buildings do not cast shadows yet. The sun's shadow frustum is sized for the central courtyard.",
    ],
    features: [
      "60 buildings with real footprints, plus two bespoke landmarks",
      "Cinematic drone-arc camera and hover, click and fly-to interactions",
      "Layers and locations panels, and a 360 degree landmark viewer",
      "Map and Directions with live GPS or a manual pin",
    ],
    cover: {
      src: "/projects/campus-map/overview.webp",
      alt: "Overhead 3D view of the University of Birmingham campus, with Old Joe clock tower, the Aston Webb building and surrounding buildings extruded from real footprints.",
      width: 1400,
      height: 875,
      caption: "Chancellor's Court from above.",
      kind: "screenshot",
    },
    gallery: [
      {
        src: "/projects/campus-map/old-joe.webp",
        alt: "Front elevation of the bespoke Old Joe clock tower model.",
        width: 1200,
        height: 750,
        caption: "Old Joe, the Joseph Chamberlain Memorial Clock Tower, fully modelled.",
        kind: "screenshot",
      },
      {
        src: "/projects/campus-map/aston-webb.webp",
        alt: "Front elevation of the bespoke Aston Webb Great Hall model with twin domed turrets.",
        width: 1200,
        height: 750,
        caption: "The Aston Webb building and Great Hall, with twin domed turrets.",
        kind: "screenshot",
      },
      {
        src: "/projects/campus-map/muirhead-tower.webp",
        alt: "Muirhead Tower and neighbouring academic buildings generated from real footprints.",
        width: 1200,
        height: 750,
        caption:
          "Muirhead Tower and its neighbours: real footprints, simplified facades.",
        kind: "screenshot",
      },
    ],
    demoHref: "https://rob-indol.vercel.app/",
    repoHref: "https://github.com/Rihaan5126/ROB",
    featured: false,
    order: 5,
    accent: "cyan",
  },
  {
    slug: "rigtracker",
    title: "RIGtracker",
    subtitle: "Social analytics platform",
    tagline: "Historical social analytics, built as a real full-stack product.",
    summary:
      "A full-stack analytics platform with profile observations, historical timelines, media metrics, comparisons, scheduled monitoring and authenticated workspaces. The public demo runs entirely on fictional data.",
    categories: ["full-stack"],
    tags: ["Next.js", "TypeScript", "PostgreSQL", "Redis", "Recharts"],
    year: "2026",
    status: "MVP with a fictional-data demo",
    role: "Product design and full-stack development.",
    problem: [
      "Social analytics tools often hide how they know what they know, or lean on scraping. I wanted to build the product properly: historical observations, metrics that stay null when the data is missing, and a clear line around what is and is not supported.",
    ],
    contribution: [
      "I designed and built it end to end: the domain model and analytics, the provider adapters, the API with authentication, CSRF protection and rate limits, the scheduler and notification engine, and the dashboard.",
    ],
    approach: [
      {
        title: "Observe",
        body: "A provider adapter returns normalised profile and media snapshots. A mock provider supplies fictional fixtures, and a Meta adapter covers authorised Instagram Login.",
      },
      {
        title: "Store",
        body: "Versioned PostgreSQL migrations hold snapshots, field-change events, media and metrics. Development runs on embedded PGlite.",
      },
      {
        title: "Diff",
        body: "Each refresh is diffed against the last snapshot into events for username, bio, avatar and count changes, keyed on stable provider IDs.",
      },
      {
        title: "Monitor",
        body: "A worker claims due trackers with durable leases, retries with backoff and raises in-app notifications.",
      },
    ],
    engineering: [
      {
        title: "Null-aware analytics",
        body: "Engagement and growth are computed only from real observations. Missing operands stay null instead of becoming a flattering zero, and the UI states the sample coverage.",
      },
      {
        title: "Durable scheduling",
        body: "The worker claims trackers with FOR UPDATE SKIP LOCKED and a 10-minute lease, so claims survive crashes and multiple workers cannot take the same one.",
      },
      {
        title: "Security basics done properly",
        body: "Opaque hashed session tokens, HTTP-only cookies, Origin and CSRF checks, workspace-scoped repositories, AES-256-GCM token encryption, and CSV export that neutralises spreadsheet formulas.",
      },
      {
        title: "Capability boundaries in the open",
        body: "A capability matrix documents what the official API can and cannot do. Unsupported features return an explicit unsupported state rather than a fake success.",
      },
      {
        title: "Tested end to end",
        body: "Domain and database integration tests run against an in-memory PostgreSQL engine, and Playwright covers the main user journeys on desktop and mobile.",
      },
    ],
    metrics: [
      {
        value: "1,830",
        label: "generated demo snapshots",
        note: "366 daily snapshots for each of 5 fictional demo profiles.",
      },
      {
        value: "0",
        label: "real Instagram profiles shown",
        note: "All demo data is fictional. RIGtracker does not scrape Instagram or collect passwords, cookies or hidden contact details.",
      },
      {
        value: "240",
        label: "fictional media items",
        note: "48 per demo account, for the media analytics and comparison views.",
      },
    ],
    resultsSummary:
      "The demo workspace lets you search the fictional profiles, explore their history and media analytics, compare accounts, set up trackers and read notifications, all backed by a real database, API and scheduler.",
    limitations: [
      "The public demo data is entirely fictional. It is not scraped Instagram data.",
      "Anonymous access to arbitrary Instagram profiles is not supported, and was never the goal.",
      "A Meta-authorised Instagram Login path exists, but live field-level acceptance has not been established without credentials, so I make no claim of live Instagram coverage.",
      "It is an MVP, not an audited commercial deployment.",
    ],
    features: [
      "Profile history with field-level change events",
      "Media and Reels analytics with null-aware metrics",
      "Comparison of 2 to 5 tracked accounts",
      "Hourly to weekly trackers with notifications and CSV export",
    ],
    cover: {
      src: "/projects/rigtracker/dashboard-desktop.webp",
      alt: "RIGtracker dashboard with tracked-account counts, an audience growth chart, tracking health and recent changes.",
      width: 1440,
      height: 900,
      caption: "Dashboard on the fictional demo workspace.",
      kind: "screenshot",
      focus: "top",
    },
    gallery: [
      {
        src: "/projects/rigtracker/dashboard-mobile.webp",
        alt: "RIGtracker dashboard on a phone-sized screen.",
        width: 390,
        height: 844,
        caption: "The same dashboard on a phone.",
        kind: "screenshot",
        fit: "contain",
      },
    ],
    demoHref: "https://rig-tracker.vercel.app/",
    repoHref: "https://github.com/Rihaan5126/RIG-Tracker",
    featured: false,
    order: 6,
    accent: "blue",
  },
  {
    slug: "clearing-helper",
    title: "UK Clearing Helper",
    tagline: "A university search tool that solved a problem I experienced myself.",
    summary:
      "A full-stack university Clearing discovery tool with vacancy tracking, course filtering, saved target universities and call-script support, developed from my own experience navigating admissions.",
    categories: ["full-stack"],
    tags: ["Next.js", "TypeScript", "Playwright", "Supabase"],
    year: "2026",
    status: "Seasonal. Clearing has closed for the current cycle.",
    role: "Product, scraper and full-stack development.",
    problem: [
      "Clearing is stressful and the information is scattered across many university sites, with no single live view of what is open. I lived through it myself, so I built the tool I wanted: one place to see what is open, matched against my grades, with a call script ready before I dialled.",
    ],
    contribution: [
      "I built both halves: the Playwright scraper that collects vacancy data, and the Next.js and Supabase app that presents it, stores your grades and target courses, and generates a call script.",
      "It helped me during Clearing and my move to the University of Birmingham.",
    ],
    approach: [
      {
        title: "Collect",
        body: "A Playwright scraper reads vacancy pages and writes them to Supabase.",
      },
      {
        title: "Browse",
        body: "Every tracked university is browsable with vacancy status and subject filters, signed in or not.",
      },
      {
        title: "Match",
        body: "Save your grades, top three target universities and backup courses, and match them against what is actually open.",
      },
      {
        title: "Prepare",
        body: "Generate a short call script covering who you are, your grades and a fallback ask if the course is full. Edit it and save it per university.",
      },
    ],
    engineering: [
      {
        title: "No UCAS login, ever",
        body: "Access is never gated on UCAS status. The UCAS status on a profile is a manual toggle, with no UCAS API integration.",
      },
      {
        title: "Row-level security",
        body: "Universities and courses are public-read, and each profile is only readable and writable by its owner. Writes to vacancy data come from the scraper using the service role key, never from the browser's anon key.",
      },
      {
        title: "Scraping that admits its limits",
        body: "University sites differ and change, so a scraper is only as reliable as the pages it reads. I measured it rather than assuming: roughly 75% reliable in testing.",
      },
    ],
    metrics: [
      {
        value: "~70%",
        label: "of Russell Group universities covered",
        note: "In my own testing during the Clearing period. Not a claim about current coverage.",
      },
      {
        value: "~75%",
        label: "scraper success rate in testing",
        note: "From the same testing period.",
      },
    ],
    resultsSummary:
      "It did the job it was built for: I used it myself during UCAS Clearing, and it helped me secure my place at the University of Birmingham.",
    limitations: [
      "Clearing has closed for the current cycle, so out of season the live site shows no vacancies. Hotline numbers and links remain.",
      "Vacancy data came from a scraper with partial, varying coverage, so listings could be incomplete or out of date.",
      "There is no UCAS integration.",
    ],
    features: [
      "Browse tracked universities with vacancy and subject filters",
      "Save grades, target universities and backup courses",
      "Generate and save an editable phone script per university",
    ],
    cover: {
      src: "/projects/clearing-helper/home.webp",
      alt: "UK Clearing Helper landing page with the headline 'Clearing, without the panic' over a photograph of Durham Castle.",
      width: 1440,
      height: 900,
      caption:
        "Landing page. Hero photo: Durham Castle by Christophe Meneboeuf (CC BY-SA 4.0).",
      kind: "screenshot",
    },
    gallery: [],
    demoHref: "https://clearing-app-theta.vercel.app/",
    repoHref: "https://github.com/Rihaan5126/clearing-app",
    featured: false,
    order: 7,
    accent: "violet",
  },
];
