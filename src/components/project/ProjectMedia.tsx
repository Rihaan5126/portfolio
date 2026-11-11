import Image from "next/image";
import type { Project, ProjectMedia as Media } from "@/lib/types";

const accents: Record<Project["accent"], [string, string]> = {
  blue: ["var(--brand-from)", "var(--cyan)"],
  cyan: ["var(--cyan)", "var(--brand-from)"],
  violet: ["var(--violet)", "var(--brand-from)"],
};

function Backdrop({ accent }: { accent: Project["accent"] }) {
  const [a, b] = accents[accent];
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0"
      style={{
        background: `radial-gradient(80% 70% at 25% 15%, color-mix(in srgb, ${a} 38%, transparent), transparent 70%), radial-gradient(70% 60% at 90% 95%, color-mix(in srgb, ${b} 30%, transparent), transparent 70%), var(--surface-raised)`,
      }}
    >
      <div className="grid-lines absolute inset-0 opacity-60" />
    </div>
  );
}

type ProjectMediaProps = {
  media: Media;
  accent: Project["accent"];
  sizes: string;
  /** Tailwind classes that set the frame's height or aspect ratio. */
  frameClassName?: string;
  className?: string;
  preload?: boolean;
};

/** A fixed-ratio frame for a project image, so layout never shifts while it loads. */
export function ProjectMedia({
  media,
  accent,
  sizes,
  frameClassName = "aspect-[16/10]",
  className = "",
  preload = false,
}: ProjectMediaProps) {
  const contain = media.fit === "contain";

  return (
    <div
      className={`media-zoom bg-surface-raised relative overflow-hidden ${frameClassName} ${className}`}
    >
      {contain ? (
        <>
          <Backdrop accent={accent} />
          <Image
            src={media.src}
            alt={media.alt}
            width={media.width}
            height={media.height}
            sizes={sizes}
            preload={preload}
            className="absolute top-[8%] left-1/2 h-auto w-[46%] max-w-[480px] -translate-x-1/2 rounded-t-xl border border-b-0 shadow-[0_24px_48px_-12px_rgb(0_0_0/0.55)]"
          />
        </>
      ) : (
        <Image
          src={media.src}
          alt={media.alt}
          fill
          sizes={sizes}
          preload={preload}
          className={media.focus === "top" ? "object-cover object-top" : "object-cover"}
        />
      )}
      {media.kind === "illustration" && (
        <span className="pill bg-background/80 absolute top-3 left-3 backdrop-blur">
          Illustration
        </span>
      )}
    </div>
  );
}
