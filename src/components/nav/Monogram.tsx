import { useId } from "react";

/** A geometric R: a stem, a bowl and a diagonal leg, drawn as a single stroke. */
export function Monogram({
  size = 32,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  const id = useId();
  const gradient = `monogram-${id.replace(/:/g, "")}`;

  return (
    <svg
      viewBox="0 0 32 32"
      width={size}
      height={size}
      className={className}
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient
          id={gradient}
          x1="4"
          y1="3"
          x2="28"
          y2="29"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="var(--brand-from)" />
          <stop offset="1" stopColor="var(--brand-to)" />
        </linearGradient>
      </defs>
      <rect
        x="1"
        y="1"
        width="30"
        height="30"
        rx="9"
        fill="var(--surface)"
        stroke={`url(#${gradient})`}
        strokeWidth="1.5"
      />
      <path
        d="M11.5 23V9h6.2a4.6 4.6 0 0 1 0 9.2H11.5M17 18.2 21.5 23"
        stroke={`url(#${gradient})`}
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
