import type { ReactNode } from "react";

type CaseStudySectionProps = {
  id: string;
  number: number;
  title: string;
  children: ReactNode;
  /** "split" puts the heading beside the content. "wide" puts it above, for diagrams and card grids. */
  layout?: "split" | "wide";
};

export function CaseStudySection({
  id,
  number,
  title,
  children,
  layout = "split",
}: CaseStudySectionProps) {
  const heading = (
    <>
      <p className="eyebrow">{String(number).padStart(2, "0")}</p>
      <h2
        id={`${id}-title`}
        className="mt-3 text-[clamp(1.6rem,3vw,2.2rem)] leading-[1.1] font-semibold tracking-[-0.035em] text-balance"
      >
        {title}
      </h2>
    </>
  );

  if (layout === "wide") {
    return (
      <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-28">
        <div>{heading}</div>
        <div className="mt-8">{children}</div>
      </section>
    );
  }

  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="grid scroll-mt-28 gap-6 lg:grid-cols-12 lg:gap-12"
    >
      <div className="lg:col-span-4">
        <div className="lg:sticky lg:top-28">{heading}</div>
      </div>
      <div className="lg:col-span-8">{children}</div>
    </section>
  );
}

export function Prose({ paragraphs }: { paragraphs: string[] }) {
  return (
    <div className="space-y-5">
      {paragraphs.map((paragraph) => (
        <p
          key={paragraph}
          className="text-muted max-w-[68ch] text-[1.0625rem] leading-[1.75]"
        >
          {paragraph}
        </p>
      ))}
    </div>
  );
}
