import Link from "next/link";
import { categoryLabels } from "@/lib/data";
import type { ProjectCardData } from "@/lib/types";
import { ArrowRight } from "@/components/ui/Icons";
import { ProjectMedia } from "./ProjectMedia";
import { CardLinks } from "./ProjectLinks";
import { cssVars } from "@/components/ui/reveal";

type ProjectCardProps = {
  project: ProjectCardData;
  /** Stagger index for the mount animation. */
  index?: number;
};

/** Compact card. The title is a stretched link, so the whole card is one click target. */
export function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  return (
    <article
      className="card-in media-zoom-trigger group bg-surface/70 hover:border-border-strong relative flex h-full flex-col overflow-hidden rounded-3xl border transition-[transform,border-color] duration-300 ease-out hover:-translate-y-1"
      style={cssVars({ "--i": index })}
    >
      <ProjectMedia
        media={project.cover}
        accent={project.accent}
        sizes="(min-width: 1280px) 400px, (min-width: 640px) 45vw, 92vw"
        frameClassName="aspect-[16/10]"
      />

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="eyebrow">{categoryLabels[project.categories[0]]}</p>
        <h3 className="mt-3 text-xl font-semibold tracking-tight">
          <Link
            href={`/projects/${project.slug}`}
            className="after:absolute after:inset-0 after:content-['']"
          >
            {project.title}
          </Link>
        </h3>
        <p className="text-muted mt-2 text-[0.95rem] leading-relaxed">
          {project.tagline}
        </p>

        <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Technologies">
          {project.tags.slice(0, 4).map((tag) => (
            <li key={tag} className="pill">
              {tag}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-6">
          <CardLinks project={project} />
          <span
            aria-hidden="true"
            className="text-cyan inline-flex items-center gap-1.5 text-sm font-semibold"
          >
            Case study
            <ArrowRight
              size={15}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </span>
        </div>
      </div>
    </article>
  );
}
