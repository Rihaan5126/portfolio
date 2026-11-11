"use client";

import { useMemo, useState } from "react";
import { categoryLabels, categoryOrder } from "@/lib/data";
import type { ProjectCardData, ProjectCategory } from "@/lib/types";
import { ProjectCard } from "./ProjectCard";

type Filter = "all" | ProjectCategory;

/**
 * "All" shows the supporting projects (the flagship work sits in Selected Work
 * above). Choosing a category widens the view to everything in that area,
 * flagship projects included, so every filter has something to show.
 */
export function ProjectExplorer({ cards }: { cards: ProjectCardData[] }) {
  const [filter, setFilter] = useState<Filter>("all");

  const visible = useMemo(() => {
    if (filter === "all") return cards.filter((card) => !card.featured);
    return cards.filter((card) => card.categories.includes(filter));
  }, [cards, filter]);

  const counts = useMemo(() => {
    const result = new Map<Filter, number>();
    result.set("all", cards.filter((card) => !card.featured).length);
    for (const category of categoryOrder) {
      result.set(
        category,
        cards.filter((card) => card.categories.includes(category)).length,
      );
    }
    return result;
  }, [cards]);

  const summary =
    filter === "all"
      ? `Showing ${visible.length} more projects. The flagship work is above.`
      : `Showing ${visible.length} ${visible.length === 1 ? "project" : "projects"} in ${categoryLabels[filter]}, including flagship work.`;

  return (
    <div>
      <div
        role="group"
        aria-label="Filter projects by category"
        className="flex flex-wrap gap-2"
      >
        {(["all", ...categoryOrder] as Filter[]).map((option) => {
          const active = filter === option;
          return (
            <button
              key={option}
              type="button"
              aria-pressed={active}
              onClick={() => setFilter(option)}
              className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                active
                  ? "text-brand-ink border-transparent bg-[linear-gradient(110deg,var(--brand-from),var(--brand-to))]"
                  : "text-muted hover:border-cyan hover:text-foreground bg-surface/50"
              }`}
            >
              {option === "all" ? "All" : categoryLabels[option]}
              <span
                aria-hidden="true"
                className={`font-mono text-xs ${active ? "opacity-80" : "opacity-60"}`}
              >
                {counts.get(option)}
              </span>
            </button>
          );
        })}
      </div>

      <p className="text-muted mt-5 text-sm" role="status" aria-live="polite">
        {summary}
      </p>

      <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {visible.map((card, index) => (
          <li key={card.slug}>
            <ProjectCard project={card} index={index} />
          </li>
        ))}
      </ul>
    </div>
  );
}
