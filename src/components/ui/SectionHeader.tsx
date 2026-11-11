import type { ReactNode } from "react";
import { revealDelay } from "./reveal";

type SectionHeaderProps = {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  id?: string;
  className?: string;
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  id,
  className = "",
}: SectionHeaderProps) {
  return (
    <header className={`max-w-3xl ${className}`}>
      <p className="eyebrow reveal">{eyebrow}</p>
      <h2
        id={id}
        className="reveal mt-4 text-[clamp(1.9rem,4.4vw,3.25rem)] leading-[1.05] font-semibold tracking-[-0.035em] text-balance"
        style={revealDelay(80)}
      >
        {title}
      </h2>
      {description && (
        <p
          className="reveal text-muted mt-5 max-w-2xl text-lg leading-relaxed"
          style={revealDelay(160)}
        >
          {description}
        </p>
      )}
    </header>
  );
}
