import Link from "next/link";
import type { Project } from "@/lib/types";
import { ArrowLeft, ArrowRight } from "@/components/ui/Icons";

function NavCard({
  project,
  direction,
}: {
  project: Project;
  direction: "previous" | "next";
}) {
  const isNext = direction === "next";
  return (
    <Link
      href={`/projects/${project.slug}`}
      className={`group bg-surface/60 hover:border-border-strong flex flex-col gap-2 rounded-2xl border p-5 transition-colors sm:p-6 ${
        isNext ? "items-end text-right sm:col-start-2" : "items-start text-left"
      }`}
    >
      <span className="text-muted inline-flex items-center gap-2 font-mono text-xs tracking-[0.14em] uppercase">
        {!isNext && (
          <ArrowLeft
            size={14}
            className="transition-transform duration-300 group-hover:-translate-x-1"
          />
        )}
        {isNext ? "Next project" : "Previous project"}
        {isNext && (
          <ArrowRight
            size={14}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        )}
      </span>
      <span className="text-xl font-semibold tracking-[-0.02em]">{project.title}</span>
      <span className="text-muted text-sm">{project.tagline}</span>
    </Link>
  );
}

export function ProjectNav({
  previous,
  next,
}: {
  previous: Project | undefined;
  next: Project | undefined;
}) {
  return (
    <nav aria-label="More projects" className="grid gap-4 sm:grid-cols-2">
      {previous && <NavCard project={previous} direction="previous" />}
      {next && <NavCard project={next} direction="next" />}
    </nav>
  );
}
