import { useId } from "react";
import { cssVars } from "@/components/ui/reveal";

/**
 * Decorative diagram of the three themes that connect the work: Learn, Explore
 * and Build. Pure SVG and CSS transforms, no data, hidden from assistive tech.
 */
export function HeroOrbit({ className = "" }: { className?: string }) {
  const id = useId().replace(/:/g, "");
  const core = `core-${id}`;
  const line = `line-${id}`;

  return (
    <svg
      viewBox="0 0 640 600"
      className={className}
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <radialGradient id={core} cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="var(--cyan)" stopOpacity="0.95" />
          <stop offset="0.55" stopColor="var(--brand-from)" stopOpacity="0.55" />
          <stop offset="1" stopColor="var(--brand-from)" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={line} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="var(--cyan)" />
          <stop offset="1" stopColor="var(--violet)" />
        </linearGradient>
      </defs>

      {/* faint contour lines, like a bathymetric chart */}
      <g stroke="var(--contour)" strokeWidth="1">
        <ellipse cx="300" cy="300" rx="296" ry="250" />
        <ellipse cx="300" cy="300" rx="236" ry="196" />
        <ellipse cx="300" cy="300" rx="156" ry="128" />
      </g>

      <g className="orbit-ring" style={cssVars({ "--orbit-duration": "70s" })}>
        <circle cx="300" cy="300" r="110" stroke="var(--border-strong)" strokeWidth="1" />
        <circle cx="410" cy="300" r="5" fill={`url(#${line})`} />
      </g>

      <g
        className="orbit-ring"
        data-reverse="true"
        style={cssVars({ "--orbit-duration": "110s" })}
      >
        <circle
          cx="300"
          cy="300"
          r="190"
          stroke="var(--border-strong)"
          strokeWidth="1"
          strokeDasharray="2 7"
        />
        <circle cx="300" cy="110" r="5" fill={`url(#${line})`} />
        <circle cx="434" cy="434" r="3.5" fill="var(--cyan)" />
      </g>

      <g className="orbit-ring" style={cssVars({ "--orbit-duration": "170s" })}>
        <circle cx="300" cy="300" r="270" stroke="var(--border)" strokeWidth="1" />
        <circle cx="30" cy="300" r="4.5" fill="var(--violet)" />
        <circle cx="491" cy="109" r="3.5" fill={`url(#${line})`} />
      </g>

      <circle cx="300" cy="300" r="64" fill={`url(#${core})`} />
      <circle
        cx="300"
        cy="300"
        r="26"
        fill="var(--surface)"
        stroke={`url(#${line})`}
        strokeWidth="1.5"
      />
      <path
        d="M293 313V287h8.4a6.6 6.6 0 0 1 0 13.2H293M301 300.2 308 313"
        stroke={`url(#${line})`}
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <g fontFamily="var(--font-geist-mono), monospace" fontSize="12" letterSpacing="2.4">
        <g className="node-pulse">
          <circle cx="371" cy="216" r="4" fill="var(--cyan)" />
          <text x="383" y="212" fill="var(--foreground)">
            LEARN
          </text>
        </g>
        <g className="node-pulse" style={{ animationDelay: "1.4s" }}>
          <circle cx="478" cy="365" r="4" fill="var(--cyan)" />
          <text x="490" y="361" fill="var(--foreground)">
            EXPLORE
          </text>
        </g>
        <g className="node-pulse" style={{ animationDelay: "2.8s" }}>
          <circle cx="562" cy="234" r="4" fill="var(--cyan)" />
          <text x="549" y="239" textAnchor="end" fill="var(--foreground)">
            BUILD
          </text>
        </g>
      </g>
    </svg>
  );
}
