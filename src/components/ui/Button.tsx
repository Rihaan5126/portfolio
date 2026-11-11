import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "./Icons";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  size?: "md" | "sm";
  /** Force the arrow icon on or off. Defaults to an arrow for primary and external links. */
  arrow?: boolean;
  className?: string;
  ariaLabel?: string;
};

const isExternal = (href: string) => /^https?:\/\//.test(href);

export function ButtonLink({
  href,
  children,
  variant = "primary",
  size = "md",
  arrow,
  className = "",
  ariaLabel,
}: ButtonLinkProps) {
  const external = isExternal(href);
  const showArrow = arrow ?? (variant === "primary" || external);
  const classes =
    `btn btn-${variant} ${size === "sm" ? "btn-sm" : ""} ${className}`.trim();

  const content = (
    <>
      <span>{children}</span>
      {showArrow &&
        (external ? (
          <ArrowUpRight size={16} className="btn-arrow" />
        ) : (
          <ArrowRight size={16} className="btn-arrow" />
        ))}
      {external && <span className="sr-only"> (opens in a new tab)</span>}
    </>
  );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer noopener"
        className={classes}
        aria-label={ariaLabel}
      >
        {content}
      </a>
    );
  }

  if (href.startsWith("mailto:")) {
    return (
      <a href={href} className={classes} aria-label={ariaLabel}>
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} aria-label={ariaLabel}>
      {content}
    </Link>
  );
}
