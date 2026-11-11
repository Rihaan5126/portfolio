import type { SkillGroup } from "../types";

// Only tools I have actually used in the projects on this site, or am currently
// learning. "team" marks components a teammate implemented in a shared project;
// "coursework" marks languages used at university only.
export const skillGroups: SkillGroup[] = [
  {
    id: "ai-ml",
    title: "AI, ML & computer vision",
    blurb: "Training, evaluating and stress-testing models, with honest baselines.",
    emphasis: true,
    skills: [
      { name: "PyTorch" },
      { name: "XGBoost" },
      { name: "scikit-learn" },
      { name: "Experiment evaluation" },
      { name: "Bayesian modelling", note: "team" },
      { name: "YOLO", note: "team" },
      { name: "OpenCV", note: "team" },
      { name: "DINOv2", note: "team" },
    ],
  },
  {
    id: "full-stack",
    title: "Frontend & full stack",
    blurb: "Products from database to interface.",
    emphasis: true,
    skills: [
      { name: "React" },
      { name: "Next.js" },
      { name: "Tailwind CSS" },
      { name: "Node.js" },
      { name: "FastAPI" },
      { name: "REST APIs" },
      { name: "PostgreSQL" },
      { name: "Redis" },
      { name: "Supabase" },
      { name: "SQLite" },
    ],
  },
  {
    id: "systems-graphics",
    title: "Graphics, systems & algorithms",
    blurb: "Engines, renderers and pathfinding, measured rather than guessed.",
    emphasis: true,
    skills: [
      { name: "Rust" },
      { name: "Rayon" },
      { name: "wgpu" },
      { name: "Three.js" },
      { name: "WebGL" },
      { name: "Procedural generation" },
      { name: "Pathfinding / Dijkstra" },
      { name: "Performance profiling" },
    ],
  },
  {
    id: "languages",
    title: "Languages",
    blurb: "What I write most, and what I've used at university.",
    skills: [
      { name: "Python" },
      { name: "Rust" },
      { name: "TypeScript" },
      { name: "JavaScript" },
      { name: "SQL" },
      { name: "C", note: "coursework" },
      { name: "Java", note: "coursework" },
    ],
  },
  {
    id: "tools",
    title: "Tools & workflow",
    blurb: "How the work gets tested and shipped.",
    skills: [
      { name: "Git / GitHub" },
      { name: "Docker" },
      { name: "Playwright" },
      { name: "Vitest" },
      { name: "pytest" },
      { name: "Vercel" },
      { name: "GitHub Actions" },
      { name: "Vite" },
    ],
  },
];
