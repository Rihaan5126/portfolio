import Link from "next/link";
import { experience, getProject } from "@/lib/data";
import type { ExperienceKind } from "@/lib/types";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { revealDelay } from "@/components/ui/reveal";

const kindLabels: Record<ExperienceKind, string> = {
  role: "Role",
  hackathon: "Hackathon, participation",
  challenge: "Challenge, participation",
  education: "Education",
};

export function Experience() {
  return (
    <section
      id="experience"
      aria-labelledby="experience-title"
      className="relative py-16 sm:py-24"
    >
      <div className="mx-auto w-full max-w-[1280px] px-5 sm:px-8 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <SectionHeader
                id="experience-title"
                eyebrow="EXPERIENCE & HIGHLIGHTS"
                title="Beyond the code."
                description="Building with other people, under time pressure, and where I'm studying."
              />
            </div>
          </div>

          <ol className="lg:col-span-8">
            {experience.map((item, index) => {
              const project = item.projectSlug ? getProject(item.projectSlug) : undefined;
              return (
                <li
                  key={item.id}
                  className="reveal relative border-l pb-10 pl-8 last:pb-0 sm:pl-10"
                  style={revealDelay(index * 70)}
                >
                  <span
                    aria-hidden="true"
                    className="absolute top-1.5 -left-[7px] h-3.5 w-3.5 rounded-full border-2 border-[var(--background)] bg-[linear-gradient(135deg,var(--brand-from),var(--brand-to))] shadow-[0_0_0_4px_color-mix(in_srgb,var(--cyan)_16%,transparent)]"
                  />
                  <p className="text-muted flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs tracking-[0.12em] uppercase">
                    <span>{item.period}</span>
                    <span className="bg-surface-raised/70 rounded-full border px-2.5 py-1 tracking-[0.08em] normal-case">
                      {kindLabels[item.kind]}
                    </span>
                  </p>
                  <h3 className="mt-3 text-xl font-semibold tracking-[-0.02em]">
                    {item.title}
                    <span className="text-muted font-normal"> at {item.org}</span>
                  </h3>
                  <p className="text-muted mt-2 max-w-[62ch] leading-relaxed">
                    {item.summary}
                  </p>
                  {item.details && (
                    <ul className="text-muted mt-3 max-w-[62ch] list-disc space-y-1.5 pl-5 text-[0.95rem] leading-relaxed marker:text-[var(--cyan)]">
                      {item.details.map((detail) => (
                        <li key={detail}>{detail}</li>
                      ))}
                    </ul>
                  )}
                  {project && (
                    <Link
                      href={`/projects/${project.slug}`}
                      className="text-cyan mt-4 inline-block text-sm font-semibold underline-offset-4 hover:underline"
                    >
                      Read the {project.title} case study
                    </Link>
                  )}
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
