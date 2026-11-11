import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <section className="grain relative isolate flex min-h-[80svh] items-center overflow-hidden pt-24">
      <div aria-hidden="true" className="aurora absolute inset-0 -z-10" />
      <div aria-hidden="true" className="grid-lines absolute inset-0 -z-10" />
      <div className="mx-auto w-full max-w-[1280px] px-5 sm:px-8 lg:px-10">
        <p className="eyebrow">404</p>
        <h1 className="mt-5 max-w-3xl text-[clamp(2.5rem,7vw,5rem)] leading-[1] font-semibold tracking-[-0.045em] text-balance">
          That page <span className="text-gradient">isn&rsquo;t on the map.</span>
        </h1>
        <p className="text-muted mt-6 max-w-xl text-lg leading-relaxed">
          The link may be old, or the project may have moved. The work is all still on the
          homepage.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <ButtonLink href="/" variant="primary">
            Back to the homepage
          </ButtonLink>
          <ButtonLink href="/#work" variant="secondary" arrow={false}>
            Selected work
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
