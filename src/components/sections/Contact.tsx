import { profile } from "@/lib/data";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { revealDelay } from "@/components/ui/reveal";
import { ContactForm } from "./ContactForm";

export function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="relative isolate overflow-hidden py-20 sm:py-28"
    >
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 -z-10 h-2/3 opacity-80"
        style={{
          background:
            "radial-gradient(70% 90% at 50% 100%, var(--aurora-a), transparent 72%)",
        }}
      />

      <div className="mx-auto w-full max-w-[1280px] px-5 sm:px-8 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <p className="eyebrow reveal">CONTACT</p>
            <h2
              id="contact-title"
              className="reveal mt-4 text-[clamp(2.1rem,5vw,3.6rem)] leading-[1.02] font-semibold tracking-[-0.04em] text-balance"
              style={revealDelay(80)}
            >
              {profile.contactHeading}
            </h2>
            <p
              className="reveal text-muted mt-6 max-w-md text-lg leading-relaxed"
              style={revealDelay(160)}
            >
              {profile.contactBody}
            </p>

            <div className="reveal mt-8" style={revealDelay(220)}>
              <p className="text-muted font-mono text-xs tracking-[0.14em] uppercase">
                Email
              </p>
              <a
                href={`mailto:${profile.email}`}
                className="hover:text-cyan mt-2 inline-block text-xl font-semibold tracking-tight break-all underline decoration-[var(--border-strong)] underline-offset-[6px] transition-colors sm:text-2xl"
              >
                {profile.email}
              </a>
              <SocialLinks className="mt-6" />
            </div>
          </div>

          <div className="lg:col-span-7">
            <div
              className="reveal gradient-border bg-surface/70 relative rounded-[2rem] p-6 shadow-[var(--shadow)] sm:p-9"
              style={revealDelay(120)}
            >
              <ContactForm fallbackEmail={profile.email} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
