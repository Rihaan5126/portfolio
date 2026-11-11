import Link from "next/link";
import { navLinks, profile } from "@/lib/data";
import { Monogram } from "@/components/nav/Monogram";
import { SocialLinks } from "./SocialLinks";

export function Footer() {
  return (
    <footer
      className="relative overflow-hidden border-t"
      style={{ background: "var(--footer)" }}
    >
      <div className="hairline absolute inset-x-0 top-0" aria-hidden="true" />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-48 opacity-70"
        style={{
          background:
            "radial-gradient(60% 100% at 50% 0%, var(--aurora-a), transparent 72%)",
        }}
        aria-hidden="true"
      />
      <div className="relative mx-auto w-full max-w-[1280px] px-5 py-14 sm:px-8 lg:px-10">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="flex items-center gap-3">
              <Monogram size={34} />
              <span className="text-lg font-semibold tracking-tight">{profile.name}</span>
            </div>
            <p className="text-muted mt-4 max-w-sm text-sm leading-relaxed">
              Computer Engineering student building systems that think, render and
              explore. Based in {profile.location}.
            </p>
            <SocialLinks className="mt-6" />
          </div>

          <nav aria-label="Footer" className="md:col-span-4 md:col-start-7">
            <p className="eyebrow">Sections</p>
            <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2.5 text-sm">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={`/${link.href}`}
                    className="text-muted hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-2 md:col-start-11">
            <p className="eyebrow">Contact</p>
            <a
              href={`mailto:${profile.email}`}
              className="text-muted hover:text-foreground mt-4 block text-sm break-all transition-colors"
            >
              {profile.email}
            </a>
          </div>
        </div>

        <div className="text-muted mt-12 flex flex-col gap-3 border-t pt-6 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} {profile.name}. Designed and built with
            Next.js, TypeScript and Tailwind CSS.{" "}
            <a
              href="https://github.com/Rihaan5126/portfolio"
              target="_blank"
              rel="noreferrer noopener"
              className="hover:text-foreground underline underline-offset-4 transition-colors"
            >
              Source on GitHub
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </p>
          <a
            href="#top"
            className="hover:text-foreground w-fit font-mono transition-colors"
          >
            Back to top &uarr;
          </a>
        </div>
      </div>
    </footer>
  );
}
