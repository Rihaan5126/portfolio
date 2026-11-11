import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { categoryLabels, getAdjacentProjects, getProject, projects } from "@/lib/data";
import { CaseStudySection, Prose } from "@/components/project/CaseStudySection";
import { FlowDiagram } from "@/components/project/FlowDiagram";
import { ProjectActions } from "@/components/project/ProjectLinks";
import { ProjectMedia } from "@/components/project/ProjectMedia";
import { ProjectNav } from "@/components/project/ProjectNav";
import { AlertIcon, ArrowLeft } from "@/components/ui/Icons";
import { MetricCallout } from "@/components/ui/MetricCallout";
import { revealDelay } from "@/components/ui/reveal";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata(
  props: PageProps<"/projects/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const project = getProject(slug);
  if (!project) return {};

  const title = project.subtitle
    ? `${project.title}: ${project.subtitle}`
    : project.title;
  return {
    title,
    description: `${project.tagline} ${project.summary}`,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      type: "article",
      title: `${title} · Rihaan`,
      description: project.tagline,
      url: `/projects/${project.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} · Rihaan`,
      description: project.tagline,
    },
  };
}

export default async function ProjectPage(props: PageProps<"/projects/[slug]">) {
  const { slug } = await props.params;
  const project = getProject(slug);
  if (!project) notFound();

  const { previous, next } = getAdjacentProjects(project.slug);
  const hasGallery = project.gallery.length > 0;

  const sections = [
    { id: "problem", label: "The problem" },
    { id: "contribution", label: "My contribution" },
    { id: "how-it-works", label: "How it works" },
    { id: "engineering", label: "Engineering details" },
    { id: "results", label: "Results & limitations" },
    ...(hasGallery ? [{ id: "gallery", label: "Gallery" }] : []),
  ];

  const meta = [
    { label: "Role", value: project.role },
    { label: "Status", value: project.status },
    { label: "Year", value: project.year },
    ...(project.team ? [{ label: "Team", value: project.team }] : []),
  ];

  return (
    <article>
      <header className="grain relative isolate overflow-hidden pt-28 pb-12 sm:pt-32">
        <div aria-hidden="true" className="aurora absolute inset-0 -z-10 opacity-80" />
        <div aria-hidden="true" className="grid-lines absolute inset-0 -z-10" />
        <div className="mx-auto w-full max-w-[1280px] px-5 sm:px-8 lg:px-10">
          <Link
            href="/#projects"
            className="text-muted hover:text-foreground inline-flex items-center gap-2 text-sm font-medium transition-colors"
          >
            <ArrowLeft size={16} />
            All projects
          </Link>

          <p className="eyebrow mt-10">
            {project.categories.map((category) => categoryLabels[category]).join(" / ")}
          </p>
          <h1 className="mt-4 max-w-4xl text-[clamp(2.6rem,7vw,5.2rem)] leading-[0.98] font-semibold tracking-[-0.045em] text-balance">
            {project.title}
          </h1>
          {project.subtitle && (
            <p className="text-muted mt-3 text-xl sm:text-2xl">{project.subtitle}</p>
          )}
          <p className="mt-6 max-w-2xl text-xl leading-snug font-medium tracking-[-0.02em] text-balance sm:text-2xl">
            {project.tagline}
          </p>

          <dl className="mt-10 grid gap-x-8 gap-y-6 border-y py-6 sm:grid-cols-2 lg:grid-cols-4">
            {meta.map((item) => (
              <div key={item.label}>
                <dt className="text-muted font-mono text-xs tracking-[0.14em] uppercase">
                  {item.label}
                </dt>
                <dd className="mt-2 text-[0.95rem] leading-snug">{item.value}</dd>
              </div>
            ))}
          </dl>

          <ProjectActions project={project} className="mt-8" />
        </div>
      </header>

      <div className="mx-auto w-full max-w-[1280px] px-5 sm:px-8 lg:px-10">
        <figure className="reveal" style={revealDelay(0)}>
          <div className="gradient-border rounded-[2rem]">
            <ProjectMedia
              media={project.cover}
              accent={project.accent}
              sizes="(min-width: 1280px) 1216px, 94vw"
              frameClassName="aspect-[16/10] sm:aspect-[16/9]"
              className="rounded-[2rem]"
              preload
            />
          </div>
          {project.cover.caption && (
            <figcaption className="text-muted mt-3 text-sm">
              {project.cover.caption}
            </figcaption>
          )}
        </figure>

        <nav aria-label="On this page" className="mt-10">
          <ul className="flex flex-wrap gap-2">
            {sections.map((section) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className="pill hover:border-cyan hover:text-foreground px-3.5 py-1.5 text-[0.8rem] transition-colors"
                >
                  {section.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-16 space-y-20 sm:space-y-24">
          <CaseStudySection id="problem" number={1} title="The problem">
            <Prose paragraphs={project.problem} />
          </CaseStudySection>

          <CaseStudySection id="contribution" number={2} title="My contribution">
            <Prose paragraphs={project.contribution} />
            <ul className="mt-6 flex flex-wrap gap-1.5" aria-label="Technologies">
              {project.tags.map((tag) => (
                <li key={tag} className="pill">
                  {tag}
                </li>
              ))}
            </ul>
          </CaseStudySection>

          <CaseStudySection
            id="how-it-works"
            number={3}
            title="How it works"
            layout="wide"
          >
            <FlowDiagram steps={project.approach} label={`How ${project.title} works`} />
          </CaseStudySection>

          <CaseStudySection
            id="engineering"
            number={4}
            title="Engineering details"
            layout="wide"
          >
            <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {project.engineering.map((detail) => (
                <li key={detail.title} className="bg-surface/60 rounded-2xl border p-6">
                  <h3 className="font-semibold tracking-[-0.015em]">{detail.title}</h3>
                  <p className="text-muted mt-2.5 text-[0.95rem] leading-relaxed">
                    {detail.body}
                  </p>
                </li>
              ))}
            </ul>
          </CaseStudySection>

          <CaseStudySection id="results" number={5} title="Results & limitations">
            <p className="max-w-[68ch] text-[1.0625rem] leading-[1.75]">
              {project.resultsSummary}
            </p>

            {project.metrics.length > 0 && (
              <ul className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {project.metrics.map((metric) => (
                  <li key={metric.label}>
                    <MetricCallout metric={metric} />
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-8 rounded-2xl border border-[var(--violet)]/40 bg-[color-mix(in_srgb,var(--violet)_7%,var(--surface))] p-5 sm:p-6">
              <h3 className="flex items-center gap-2.5 text-base font-semibold">
                <AlertIcon size={18} className="text-[var(--violet)]" />
                Limitations and honest caveats
              </h3>
              <ul className="text-muted mt-4 space-y-3 text-[0.95rem] leading-relaxed">
                {project.limitations.map((limitation) => (
                  <li key={limitation} className="relative pl-5">
                    <span
                      aria-hidden="true"
                      className="absolute top-[0.65em] left-0 h-px w-3 bg-[var(--violet)]"
                    />
                    {limitation}
                  </li>
                ))}
              </ul>
            </div>
          </CaseStudySection>

          {hasGallery && (
            <CaseStudySection id="gallery" number={6} title="Gallery" layout="wide">
              <ul className="grid gap-8 md:grid-cols-2">
                {project.gallery.map((media) => (
                  <li
                    key={media.src}
                    className={project.gallery.length === 1 ? "md:col-span-2" : ""}
                  >
                    <figure>
                      {media.fit === "contain" ? (
                        <ProjectMedia
                          media={media}
                          accent={project.accent}
                          sizes="(min-width: 768px) 600px, 94vw"
                          frameClassName="aspect-[16/10]"
                          className="rounded-2xl border"
                        />
                      ) : (
                        <Image
                          src={media.src}
                          alt={media.alt}
                          width={media.width}
                          height={media.height}
                          sizes="(min-width: 1280px) 600px, (min-width: 768px) 46vw, 94vw"
                          className="h-auto w-full rounded-2xl border"
                        />
                      )}
                      {media.caption && (
                        <figcaption className="text-muted mt-3 max-w-[60ch] text-sm leading-relaxed">
                          {media.caption}
                        </figcaption>
                      )}
                    </figure>
                  </li>
                ))}
              </ul>
            </CaseStudySection>
          )}
        </div>

        <div className="mt-24 mb-24">
          <ProjectNav previous={previous} next={next} />
        </div>
      </div>
    </article>
  );
}
