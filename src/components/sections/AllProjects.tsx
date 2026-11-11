import { projects } from "@/lib/data";
import type { ProjectCardData } from "@/lib/types";
import { ProjectExplorer } from "@/components/project/ProjectExplorer";
import { SectionHeader } from "@/components/ui/SectionHeader";

function toCardData(project: (typeof projects)[number]): ProjectCardData {
  return {
    slug: project.slug,
    title: project.title,
    subtitle: project.subtitle,
    tagline: project.tagline,
    categories: project.categories,
    tags: project.tags,
    year: project.year,
    status: project.status,
    role: project.role,
    cover: project.cover,
    demoHref: project.demoHref,
    demoNote: project.demoNote,
    repoHref: project.repoHref,
    repoNote: project.repoNote,
    repoLabel: project.repoLabel,
    featured: project.featured,
    accent: project.accent,
  };
}

export function AllProjects() {
  const cards = projects.map(toCardData);

  return (
    <section
      id="projects"
      aria-labelledby="projects-title"
      className="relative py-16 sm:py-24"
    >
      <div className="mx-auto w-full max-w-[1280px] px-5 sm:px-8 lg:px-10">
        <SectionHeader
          id="projects-title"
          eyebrow="ALL PROJECTS"
          title="More things I've built."
          description="Smaller in scope, same standards. Each one has its own case study with what I built, how it works and where it falls short."
        />
        <div className="reveal mt-10 min-h-[44rem] lg:min-h-[40rem]">
          <ProjectExplorer cards={cards} />
        </div>
      </div>
    </section>
  );
}
