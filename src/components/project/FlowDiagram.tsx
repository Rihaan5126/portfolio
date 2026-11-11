import type { FlowStep } from "@/lib/types";
import { cssVars } from "@/components/ui/reveal";

/**
 * "How it works" as a numbered flow. Horizontal on wide screens, a vertical
 * rail on narrow ones. It is a real ordered list, so it reads in order for
 * assistive tech.
 */
export function FlowDiagram({ steps, label }: { steps: FlowStep[]; label: string }) {
  return (
    <ol
      aria-label={label}
      className="grid lg:[grid-template-columns:repeat(var(--cols),minmax(0,1fr))] lg:gap-6"
      style={cssVars({ "--cols": steps.length })}
    >
      {steps.map((step, index) => {
        const last = index === steps.length - 1;
        return (
          <li
            key={step.title}
            className="relative pb-9 pl-16 last:pb-0 lg:pt-16 lg:pb-0 lg:pl-0"
          >
            <span
              aria-hidden="true"
              className={`absolute top-0 left-0 inline-flex h-10 w-10 items-center justify-center rounded-full border font-mono text-sm ${
                last
                  ? "text-brand-ink border-transparent bg-[linear-gradient(135deg,var(--brand-from),var(--brand-to))]"
                  : "bg-surface text-cyan"
              }`}
            >
              {index + 1}
            </span>
            {!last && (
              <span
                aria-hidden="true"
                className="absolute top-10 bottom-0 left-5 w-px bg-[linear-gradient(var(--border-strong),var(--border))] lg:top-5 lg:right-[-1.5rem] lg:bottom-auto lg:left-12 lg:h-px lg:w-auto lg:bg-[linear-gradient(90deg,var(--border-strong),var(--border))]"
              />
            )}
            <h3 className="text-lg font-semibold tracking-[-0.02em]">{step.title}</h3>
            <p className="text-muted mt-2 text-[0.95rem] leading-relaxed">{step.body}</p>
          </li>
        );
      })}
    </ol>
  );
}
