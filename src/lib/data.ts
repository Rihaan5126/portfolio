// Single entry point for all site content. Edit the modules in ./content:
//   profile.ts     hero, about, contact copy, nav, socials, "now" items
//   projects.ts    every project and its case study
//   skills.ts      toolkit groups
//   experience.ts  timeline
// See README.md for the full guide.

import type { Project, ProjectCategory } from "./types";
import { projects as rawProjects } from "./content/projects";

export {
  profile,
  socialLinks,
  navLinks,
  heroDomains,
  howIWork,
  themes,
  nowItems,
} from "./content/profile";
export { skillGroups } from "./content/skills";
export { experience } from "./content/experience";

export const categoryLabels: Record<ProjectCategory, string> = {
  "ai-ml": "AI & ML",
  "systems-graphics": "Systems & Graphics",
  robotics: "Robotics",
  "full-stack": "Full Stack",
};

export const categoryOrder: ProjectCategory[] = [
  "ai-ml",
  "systems-graphics",
  "robotics",
  "full-stack",
];

function validate(list: Project[]): Project[] {
  const slugs = new Set<string>();
  for (const project of list) {
    if (slugs.has(project.slug)) {
      throw new Error(`Duplicate project slug: ${project.slug}`);
    }
    slugs.add(project.slug);
    for (const href of [project.demoHref, project.repoHref, project.articleHref]) {
      if (href && !href.startsWith("https://")) {
        throw new Error(`Project ${project.slug} has a non-https link: ${href}`);
      }
    }
  }
  return [...list].sort((a, b) => a.order - b.order);
}

export const projects: Project[] = validate(rawProjects);
export const featuredProjects: Project[] = projects.filter((project) => project.featured);
export const secondaryProjects: Project[] = projects.filter(
  (project) => !project.featured,
);

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getAdjacentProjects(slug: string): {
  previous: Project | undefined;
  next: Project | undefined;
} {
  const index = projects.findIndex((project) => project.slug === slug);
  return {
    previous: index > 0 ? projects[index - 1] : undefined,
    next: index >= 0 && index < projects.length - 1 ? projects[index + 1] : undefined,
  };
}
