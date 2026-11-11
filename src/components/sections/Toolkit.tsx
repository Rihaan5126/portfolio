import { skillGroups } from "@/lib/data";
import type { Skill, SkillGroup } from "@/lib/types";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { revealDelay } from "@/components/ui/reveal";

function SkillChip({ skill, large }: { skill: Skill; large: boolean }) {
  return (
    <li
      className={`bg-surface-raised/60 inline-flex items-center gap-2 rounded-full border ${
        large ? "px-3.5 py-1.5 text-[0.9rem]" : "px-3 py-1 text-sm"
      }`}
    >
      {skill.name}
      {skill.note && (
        <span
          className={`rounded-full px-1.5 py-0.5 font-mono text-[0.62rem] leading-none tracking-wide uppercase ${
            skill.note === "team"
              ? "bg-violet/15 text-violet"
              : "bg-accent/15 text-accent"
          }`}
        >
          {skill.note}
        </span>
      )}
    </li>
  );
}

function SkillTile({ group, index }: { group: SkillGroup; index: number }) {
  const large = Boolean(group.emphasis);
  const span = large ? "lg:col-span-2" : "lg:col-span-3";

  return (
    <li
      className={`reveal bg-surface/60 relative overflow-hidden rounded-3xl border p-6 sm:p-7 ${span}`}
      style={revealDelay(index * 80)}
    >
      {large && (
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,var(--cyan),transparent)] opacity-70"
        />
      )}
      <h3 className={`font-semibold tracking-[-0.02em] ${large ? "text-xl" : "text-lg"}`}>
        {group.title}
      </h3>
      <p className="text-muted mt-1.5 text-sm leading-relaxed">{group.blurb}</p>
      <ul className="mt-5 flex flex-wrap gap-2" aria-label={`${group.title} skills`}>
        {group.skills.map((skill) => (
          <SkillChip key={skill.name} skill={skill} large={large} />
        ))}
      </ul>
    </li>
  );
}

export function Toolkit() {
  return (
    <section
      id="toolkit"
      aria-labelledby="toolkit-title"
      className="relative py-16 sm:py-24"
    >
      <div className="mx-auto w-full max-w-[1280px] px-5 sm:px-8 lg:px-10">
        <SectionHeader
          id="toolkit-title"
          eyebrow="TECHNICAL TOOLKIT"
          title="What I build with."
          description="Grouped by what I actually reach for, with no proficiency bars. Tags mark team-built components and coursework-only languages so nothing is overstated."
        />

        <ul className="mt-12 grid gap-4 lg:grid-cols-6">
          {skillGroups.map((group, index) => (
            <SkillTile key={group.id} group={group} index={index} />
          ))}
        </ul>

        <p className="text-muted reveal mt-6 text-sm" style={revealDelay(200)}>
          <span className="bg-violet/15 text-violet rounded-full px-1.5 py-0.5 font-mono text-[0.62rem] tracking-wide uppercase">
            team
          </span>{" "}
          used in a team project, implemented by a teammate.{" "}
          <span className="bg-accent/15 text-accent rounded-full px-1.5 py-0.5 font-mono text-[0.62rem] tracking-wide uppercase">
            coursework
          </span>{" "}
          used at university only.
        </p>
      </div>
    </section>
  );
}
