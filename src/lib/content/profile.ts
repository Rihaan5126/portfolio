import type { NavLink, NowItem, Profile, SocialLink } from "../types";

export const profile: Profile = {
  name: "Rihaan",
  role: "Computer Engineering student",
  location: "Birmingham, UK",
  email: "hashmanirihaan@gmail.com",
  description:
    "Computer Engineering student at the University of Birmingham building autonomous exploration systems, machine-learning research tools, custom 3D worlds and Rust game engines.",
  heroEyebrow: "RIHAAN · SOFTWARE / SYSTEMS / AI",
  heroLead: "I build systems that",
  heroWords: ["think,", "render,", "and explore."],
  heroIntro:
    "I'm a Computer Engineering student at the University of Birmingham, building everything from autonomous underwater exploration and machine-learning research to custom game engines in Rust.",
  aboutHeading: "Curious enough to start. Stubborn enough to finish.",
  aboutBody: [
    "I like projects that force me to learn a new field properly, not just get something on screen. Sometimes that means making a Rust renderer behave; sometimes it's checking whether an ML result survives a held-out test.",
    "I enjoy the engineering and the presentation: getting complex systems to work, then making them understandable to someone else. That usually means benchmarking honestly, writing down the limitations, and building an interface people actually want to use.",
  ],
  contactHeading: "Have something ambitious in mind?",
  contactBody:
    "I'm always interested in thoughtful engineering conversations, collaborations, research and software opportunities. Feel free to reach out.",
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
  { label: "Work", href: "#work" },
  { label: "Projects", href: "#projects" },
  { label: "About", href: "#about" },
  { label: "Toolkit", href: "#toolkit" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export const heroDomains: string[] = ["AI & ML", "Systems", "Robotics", "Graphics"];

export const howIWork: { title: string; body: string }[] = [
  {
    title: "Learn the field properly",
    body: "Take on the unfamiliar problem, read the primary sources, and build the thing rather than a demo of the thing.",
  },
  {
    title: "Test the assumption",
    body: "Held-out evaluations, leakage checks, benchmarks with the hardware written down. If a result doesn't survive, say so.",
  },
  {
    title: "Ship the whole product",
    body: "Engine or model, API, interface, docs and limitations. A system is only useful if someone else can run it and understand it.",
  },
];

export const themes: { word: string; blurb: string; slugs: string[] }[] = [
  {
    word: "Learn",
    blurb: "Models that earn their results",
    slugs: ["aether", "recallai"],
  },
  {
    word: "Explore",
    blurb: "Systems that move through space",
    slugs: ["abyss", "campus-map"],
  },
  {
    word: "Build",
    blurb: "Engines and products, end to end",
    slugs: ["strata", "rigtracker"],
  },
];

export const nowItems: NowItem[] = [
  {
    title: "Hardware-agnostic underwater autonomy",
    body: "Turning the ABYSS simulation prototype into an autonomy layer that doesn't care which vehicle it runs on.",
  },
  {
    title: "Evaluation-driven ML",
    body: "Getting better at asking whether a result is real: leakage, selection bias, honest baselines.",
  },
  {
    title: "Systems performance",
    body: "Profiling, parallel workloads and GPU rendering, the kind of work Strata keeps pulling me into.",
  },
];
