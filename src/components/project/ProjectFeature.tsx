import { categoryLabels } from "@/lib/data";
import type { Project } from "@/lib/types";
import { ButtonLink } from "@/components/ui/Button";
import { GlowSurface } from "@/components/ui/GlowSurface";
import { revealDelay } from "@/components/ui/reveal";
import { ProjectMedia } from "./ProjectMedia";
import { ProjectActions } from "./ProjectLinks";

type ProjectFeatureProps = {
  project: Project;
  index: number;
};

/**
 * A flagship project as an oversized showcase card. On wide screens the media
 * and its key facts sit on one side and the story on the other, alternating
 * down the page. On narrow screens it reads media, story, key facts.
 */
export function ProjectFeature({ project, index }: ProjectFeatureProps) {
  const flip = index % 2 === 1;
  const headingId = `feature-${project.slug}`;
  const mediaCol = flip ? "lg:col-start-6" : "lg:col-start-1";
  const textCol = flip ? "lg:col-start-1" : "lg:col-start-8";

  return (
    <article className="reveal" style={revealDelay(60)} aria-labelledby={headingId}>
      <GlowSurface className="gradient-border bg-surface/60 rounded-[2rem] shadow-[var(--shadow)]">
        <div className="media-zoom-trigger grid overflow-hidden rounded-[2rem] lg:grid-cols-12 lg:grid-rows-[auto_1fr]">
          <div className={`lg:col-span-7 lg:row-start-1 ${mediaCol}`}>
            <ProjectMedia
              media={project.cover}
              accent={project.accent}
              sizes="(min-width: 1280px) 720px, (min-width: 1024px) 58vw, 94vw"
              frameClassName="aspect-[16/10]"
            />
          </div>

          <div
            className={`flex flex-col p-6 sm:p-9 lg:col-span-5 lg:row-span-2 lg:row-start-1 lg:p-11 ${textCol}`}
          >
            <p className="eyebrow flex flex-wrap items-center gap-x-3 gap-y-1">
              <span className="text-muted font-mono">
                {String(index + 1).padStart(2, "0")}
              </span>
              {project.categories.map((category) => categoryLabels[category]).join(" / ")}
            </p>

            <h3
              id={headingId}
              className="mt-5 text-[clamp(2.1rem,3.8vw,3.1rem)] leading-[1] font-semibold tracking-[-0.04em]"
            >
              {project.title}
            </h3>
            {project.subtitle && (
              <p className="text-muted mt-2 text-base">{project.subtitle}</p>
            )}

            <p className="mt-6 text-xl leading-snug font-medium tracking-[-0.015em] text-balance">
              {project.tagline}
            </p>
            <p className="text-muted mt-4 leading-relaxed">{project.summary}</p>

            <div className="mt-6">
              <p className="text-muted font-mono text-xs tracking-[0.14em] uppercase">
                My role
              </p>
              <p className="mt-1.5 text-[0.95rem] leading-snug">{project.role}</p>
              {project.team && (
                <p className="text-muted mt-1.5 text-sm leading-snug">{project.team}</p>
              )}
            </div>

            <div className="mt-auto flex flex-wrap items-center gap-3 pt-8">
              <ButtonLink href={`/projects/${project.slug}`} variant="primary" size="sm">
                Read the case study
              </ButtonLink>
              <ProjectActions project={project} demoVariant="secondary" />
            </div>
          </div>

          <div
            className={`flex flex-col justify-center gap-5 border-t p-6 sm:px-9 lg:col-span-7 lg:row-start-2 lg:px-8 lg:py-6 ${mediaCol}`}
          >
            {project.keyMetric && (
              <div className="flex items-center gap-4 border-l-2 border-[var(--cyan)] pl-4">
                <span className="text-gradient text-3xl leading-none font-semibold tracking-[-0.03em] whitespace-nowrap">
                  {project.keyMetric.value}
                </span>
                <span className="text-muted text-sm leading-snug">
                  {project.keyMetric.label}
                </span>
              </div>
            )}
            <ul className="flex flex-wrap gap-1.5" aria-label="Technologies">
              {project.tags.map((tag) => (
                <li key={tag} className="pill">
                  {tag}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </GlowSurface>
    </article>
  );
}
