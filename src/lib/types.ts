export type Profile = {
  name: string;
  role: string;
  location: string;
  email: string;
  /** Short description used in metadata and structured data. */
  description: string;
  heroEyebrow: string;
  heroLead: string;
  heroWords: string[];
  heroIntro: string;
  aboutHeading: string;
  aboutBody: string[];
  contactHeading: string;
  contactBody: string;
};

export type SocialLink = {
  label: string;
  href: string;
  icon: "github" | "linkedin" | "email";
};

export type NavLink = {
  label: string;
  href: string;
};

export type ProjectCategory = "ai-ml" | "systems-graphics" | "robotics" | "full-stack";

export type ProjectMedia = {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
  /** "screenshot" is captured from the real project. "illustration" is abstract art and is labelled as such in the UI. */
  kind: "screenshot" | "illustration";
  /** "cover" crops to the frame. "contain" shows the whole image on an abstract backdrop (portrait screenshots). */
  fit?: "cover" | "contain";
  /** Which part of the image to keep when cropping to a card. Dashboards read best from the top. */
  focus?: "top" | "center";
};

export type Metric = {
  value: string;
  label: string;
  note?: string;
};

export type DetailItem = {
  title: string;
  body: string;
};

export type FlowStep = DetailItem;

export type Project = {
  slug: string;
  title: string;
  subtitle?: string;
  tagline: string;
  summary: string;
  categories: ProjectCategory[];
  tags: string[];
  year: string;
  status: string;
  /** One line, shown on cards. */
  role: string;
  /** Credit line for collaborators. */
  team?: string;
  /** Case study: what I personally built (paragraphs). */
  contribution: string[];
  /** Case study: what was hard or missing (paragraphs). */
  problem: string[];
  /** Case study: how it works, 3 to 5 steps. */
  approach: FlowStep[];
  engineering: DetailItem[];
  metrics: Metric[];
  resultsSummary: string;
  limitations: string[];
  features: string[];
  cover: ProjectMedia;
  gallery: ProjectMedia[];
  demoHref?: string;
  /** Shown instead of a demo link when none exists yet. */
  demoNote?: string;
  repoHref?: string;
  repoLabel?: string;
  /** Shown instead of a repository link when the repo is private. */
  repoNote?: string;
  articleHref?: string;
  articleLabel?: string;
  featured: boolean;
  order: number;
  accent: "blue" | "cyan" | "violet";
  /** A single headline number for the big feature cards. */
  keyMetric?: Metric;
};

export type Skill = {
  name: string;
  /** "coursework" = used at university only. "team" = used in a team project but implemented by a teammate. */
  note?: "coursework" | "team";
};

export type SkillGroup = {
  id: string;
  title: string;
  blurb: string;
  skills: Skill[];
  /** Larger tiles for the domains I am strongest in. */
  emphasis?: boolean;
};

export type ExperienceKind = "role" | "hackathon" | "challenge" | "education";

export type ExperienceItem = {
  id: string;
  title: string;
  org: string;
  period: string;
  kind: ExperienceKind;
  summary: string;
  details?: string[];
  projectSlug?: string;
};

export type NowItem = {
  title: string;
  body: string;
};

/** The slice of a project that cards need, so the client filter does not ship whole case studies. */
export type ProjectCardData = Pick<
  Project,
  | "slug"
  | "title"
  | "subtitle"
  | "tagline"
  | "categories"
  | "tags"
  | "year"
  | "status"
  | "role"
  | "cover"
  | "demoHref"
  | "demoNote"
  | "repoHref"
  | "repoNote"
  | "repoLabel"
  | "featured"
  | "accent"
>;
