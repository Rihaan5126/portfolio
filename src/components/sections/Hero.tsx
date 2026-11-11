import { heroDomains, profile } from "@/lib/data";
import { HeroOrbit } from "@/components/art/HeroOrbit";
import { ButtonLink } from "@/components/ui/Button";
import { DomainIcon } from "@/components/ui/Icons";
import { cssVars } from "@/components/ui/reveal";

export function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="grain relative isolate overflow-hidden pt-32 pb-20 sm:pt-36 lg:pt-44 lg:pb-28"
    >
      <div aria-hidden="true" className="aurora aurora-drift absolute inset-0 -z-10" />
      <div aria-hidden="true" className="grid-lines absolute inset-0 -z-10" />
      <HeroOrbit className="pointer-events-none absolute top-20 right-0 -z-10 hidden w-[44rem] max-w-none xl:block 2xl:right-[max(0px,calc((100vw-1440px)/2))]" />

      <div className="mx-auto w-full max-w-[1280px] px-5 sm:px-8 lg:px-10">
        <div className="grid grid-cols-12">
          <div className="col-span-12 lg:col-span-9">
            <p className="eyebrow">{profile.heroEyebrow}</p>

            <h1
              id="hero-title"
              className="mt-7 text-[clamp(2.9rem,8.2vw,6.4rem)] leading-[0.96] font-semibold tracking-[-0.045em] text-balance"
            >
              {profile.heroLead}{" "}
              <span className="text-gradient">{profile.heroWords.join(" ")}</span>
            </h1>

            <p
              className="hero-rise text-muted mt-8 max-w-2xl text-lg leading-relaxed sm:text-xl"
              style={cssVars({ "--i": 1 })}
            >
              {profile.heroIntro}
            </p>

            <div
              className="hero-rise mt-10 flex flex-wrap items-center gap-3"
              style={cssVars({ "--i": 2 })}
            >
              <ButtonLink href="#work" variant="primary">
                Explore my work
              </ButtonLink>
              <ButtonLink href="https://github.com/Rihaan5126" variant="secondary">
                GitHub
              </ButtonLink>
            </div>

            <ul
              className="hero-rise mt-12 flex flex-wrap gap-2.5"
              style={cssVars({ "--i": 3 })}
              aria-label="Areas I work in"
            >
              {heroDomains.map((domain) => (
                <li key={domain} className="pill px-3.5 py-2 text-[0.8rem]">
                  <DomainIcon domain={domain} size={15} className="text-cyan" />
                  {domain}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
