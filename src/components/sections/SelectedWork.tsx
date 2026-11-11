import { featuredProjects } from "@/lib/data";
import { ProjectFeature } from "@/components/project/ProjectFeature";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function SelectedWork() {
  return (
    <section id="work" aria-labelledby="work-title" className="relative py-16 sm:py-24">
      <div className="mx-auto w-full max-w-[1280px] px-5 sm:px-8 lg:px-10">
        <SectionHeader
          id="work-title"
          eyebrow="SELECTED ENGINEERING WORK"
          title="Ideas taken all the way into working systems."
        />

        <div className="mt-12 space-y-8 lg:mt-16 lg:space-y-12">
          {featuredProjects.map((project, index) => (
            <ProjectFeature key={project.slug} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
