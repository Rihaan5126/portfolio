import Link from "next/link";
import { getProject, howIWork, profile, themes } from "@/lib/data";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { revealDelay } from "@/components/ui/reveal";

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="relative py-16 sm:py-24">
      <div className="mx-auto w-full max-w-[1280px] px-5 sm:px-8 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <SectionHeader
              id="about-title"
              eyebrow="ABOUT"
              title={profile.aboutHeading}
            />
            <div className="mt-8 space-y-5">
              {profile.aboutBody.map((paragraph, index) => (
                <p
                  key={paragraph}
                  className="reveal text-muted max-w-[62ch] text-lg leading-[1.75]"
                  style={revealDelay(120 + index * 80)}
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5">
            <div
              className="reveal gradient-border bg-surface/60 rounded-3xl p-6 sm:p-8"
              style={revealDelay(120)}
            >
              <h3 className="eyebrow">How I work</h3>
              <ol className="mt-6 space-y-6">
                {howIWork.map((item, index) => (
                  <li key={item.title} className="grid grid-cols-[2.25rem_1fr] gap-x-4">
                    <span className="text-cyan pt-0.5 font-mono text-sm">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <p className="font-semibold tracking-tight">{item.title}</p>
                      <p className="text-muted mt-1.5 text-[0.95rem] leading-relaxed">
                        {item.body}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>

        <ul className="mt-14 grid gap-4 sm:grid-cols-3">
          {themes.map((theme, index) => (
            <li
              key={theme.word}
              className="reveal bg-surface/50 rounded-2xl border p-5 sm:p-6"
              style={revealDelay(index * 90)}
            >
              <p className="text-gradient text-2xl font-semibold tracking-[-0.03em]">
                {theme.word}
              </p>
              <p className="text-muted mt-1 text-sm">{theme.blurb}</p>
              <p className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5 text-sm font-medium">
                {theme.slugs.map((slug) => {
                  const project = getProject(slug);
                  if (!project) return null;
                  return (
                    <Link
                      key={slug}
                      href={`/projects/${slug}`}
                      className="hover:text-cyan underline decoration-[var(--border-strong)] underline-offset-4 transition-colors"
                    >
                      {project.title}
                    </Link>
                  );
                })}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
