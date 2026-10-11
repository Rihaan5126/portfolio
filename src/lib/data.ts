import type { NavLink, Profile, Project, SkillGroup, SocialLink } from "./types";

// Edit the values below to update the site's content; nothing else in the
// codebase needs to change. See README.md for the full guide.

export const profile: Profile = {
  name: "Rihaan",
  headline: "EE + CS Student",
  bio: "Ambitious undergrad who loves software engineering, agentic AI, and building things end to end. I'm happiest solving complex, rigorous problems, from scraping and matching pipelines to LLM-driven automation, and shipping tools people actually use.",
  location: "Birmingham, UK",
  email: "hashmanirihaan@gmail.com",
};

export const socialLinks: SocialLink[] = [
  { label: "GitHub", href: "https://github.com/Rihaan5126", icon: "github" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/rihaan-hashmani-2035a82b7",
    icon: "linkedin",
  },
  { label: "Email", href: "mailto:hashmanirihaan@gmail.com", icon: "email" },
];

export const navLinks: NavLink[] = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export const skillGroups: SkillGroup[] = [
  {
    category: "Frontend",
    skills: ["Next.js / React", "TypeScript", "Tailwind CSS"],
  },
  {
    category: "Backend & Data",
    skills: ["Python (ML / data)", "Supabase", "Machine Learning"],
  },
  {
    category: "Automation & AI",
    skills: ["Playwright", "LLM Automation", "Prompt Engineering"],
  },
];

export const projects: Project[] = [
  {
    slug: "clearing-university-scraper",
    title: "Clearing University Scraper",
    description:
      "A Playwright-driven scraper covering roughly 70% of Russell Group universities with a ~75% reliable success rate at pulling live Clearing vacancy data. I used it myself during UCAS Clearing to help secure a place at the University of Birmingham.",
    tags: ["Playwright", "TypeScript", "Automation", "Next.js", "Supabase"],
    href: "https://clearing-app-theta.vercel.app/",
    repoHref: "https://github.com/Rihaan5126/clearing-app",
    highlight: "Used it myself to secure a University of Birmingham offer",
    featured: true,
  },
  {
    slug: "rig-tracker",
    title: "RIG Tracker",
    description:
      "A local SaaS MVP for authorized Instagram profile research: historical snapshot tracking, media and engagement analytics, and scheduled monitoring with in-app notifications. Ships with a safe fictional demo provider alongside a real Meta Instagram Login integration path.",
    tags: ["Next.js", "TypeScript", "PostgreSQL", "Redis", "Recharts"],
    href: "https://rig-tracker.vercel.app/",
    repoHref: "https://github.com/Rihaan5126/RIG-Tracker",
    highlight: "1,830 generated snapshots across 5 demo accounts, zero real scraping",
    featured: true,
  },
  {
    slug: "uob-campus-map",
    title: "Interactive Campus Map",
    description:
      "A 3D digital-twin map of the University of Birmingham's Edgbaston campus: 60 real buildings extruded from OpenStreetMap footprint data, a cinematic drone-style camera, and a dedicated 360° viewer for two bespoke landmark models.",
    tags: ["Three.js", "TypeScript", "WebGL", "Vite", "Procedural Generation"],
    href: "https://rob-indol.vercel.app/",
    repoHref: "https://github.com/Rihaan5126/ROB",
    highlight:
      "Every texture is generated procedurally on canvas, nothing downloaded or scraped",
    featured: true,
  },
  {
    slug: "aether",
    title: "AETHER",
    description:
      "A research platform that trains and evolves a population of trading agents (rule-based, Random Forest, XGBoost, PyTorch) and ranks them with purged walk-forward validation and realistic costs. Historical simulation only: it never places orders and makes no profitability claims.",
    tags: ["Python", "Machine Learning", "PyTorch", "FastAPI", "Next.js"],
    href: "https://aetherbyrihaan.vercel.app/",
    repoHref: "https://github.com/Rihaan5126/AETHER",
    highlight:
      "Locked final-test split plus purged walk-forward folds to guard against leakage",
    featured: true,
  },
];

export const allProjectTags: string[] = Array.from(
  new Set(projects.flatMap((project) => project.tags)),
).sort();
