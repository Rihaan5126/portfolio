import type { ProjectCardData } from "@/lib/types";
import type { Project } from "@/lib/types";
import { ButtonLink } from "@/components/ui/Button";
import { ArrowUpRight, GithubIcon } from "@/components/ui/Icons";

type LinkSource = Pick<
  Project,
  | "title"
  | "demoHref"
  | "demoNote"
  | "repoHref"
  | "repoNote"
  | "repoLabel"
  | "articleHref"
  | "articleLabel"
>;

/** Full-size action buttons. Missing links are shown as honest notes, never as dead buttons. */
export function ProjectActions({
  project,
  className = "",
  demoVariant = "primary",
}: {
  project: LinkSource;
  className?: string;
  demoVariant?: "primary" | "secondary";
}) {
  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      {project.demoHref && (
        <ButtonLink href={project.demoHref} variant={demoVariant} size="sm">
          Live demo
        </ButtonLink>
      )}
      {project.repoHref && (
        <ButtonLink href={project.repoHref} variant="secondary" size="sm">
          {project.repoLabel ?? "GitHub"}
        </ButtonLink>
      )}
      {project.articleHref && (
        <ButtonLink href={project.articleHref} variant="secondary" size="sm">
          {project.articleLabel ?? "Write-up"}
        </ButtonLink>
      )}
      {!project.demoHref && project.demoNote && (
        <span className="pill border-dashed">{project.demoNote}</span>
      )}
      {!project.repoHref && project.repoNote && (
        <span className="pill border-dashed">{project.repoNote}</span>
      )}
    </div>
  );
}

/** Small inline links for compact cards. */
export function CardLinks({ project }: { project: ProjectCardData }) {
  const linkClass =
    "text-muted hover:text-cyan relative z-10 inline-flex items-center gap-1.5 text-sm font-medium transition-colors";

  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
      {project.demoHref && (
        <a
          href={project.demoHref}
          target="_blank"
          rel="noreferrer noopener"
          className={linkClass}
        >
          Live demo
          <ArrowUpRight size={14} />
          <span className="sr-only"> for {project.title} (opens in a new tab)</span>
        </a>
      )}
      {project.repoHref && (
        <a
          href={project.repoHref}
          target="_blank"
          rel="noreferrer noopener"
          className={linkClass}
        >
          <GithubIcon size={14} />
          {project.repoLabel ?? "Source"}
          <span className="sr-only"> for {project.title} (opens in a new tab)</span>
        </a>
      )}
      {!project.demoHref && project.demoNote && (
        <span className="text-muted text-sm">{project.demoNote}</span>
      )}
      {!project.repoHref && project.repoNote && (
        <span className="text-muted text-sm">{project.repoNote}</span>
      )}
    </div>
  );
}
