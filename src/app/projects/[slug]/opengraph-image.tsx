import { ImageResponse } from "next/og";
import { categoryLabels, getProject, projects } from "@/lib/data";

export const alt = "Project case study";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export default async function ProjectOpengraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);

  const title = project?.title ?? "Project";
  const tagline = project?.tagline ?? "";
  const eyebrow = project
    ? `${project.categories.map((category) => categoryLabels[category]).join(" / ")} · ${project.year}`.toUpperCase()
    : "";

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "72px 80px",
        color: "#edf4ff",
        fontFamily: "sans-serif",
        backgroundColor: "#070b16",
        backgroundImage:
          "radial-gradient(circle at 90% 0%, rgba(57,124,255,0.5), rgba(7,11,22,0) 55%), radial-gradient(circle at 0% 100%, rgba(84,217,255,0.25), rgba(7,11,22,0) 50%)",
      }}
    >
      <div style={{ display: "flex", fontSize: 24, letterSpacing: 5, color: "#54d9ff" }}>
        {eyebrow}
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            display: "flex",
            fontSize: title.length > 18 ? 96 : 128,
            fontWeight: 700,
            letterSpacing: -4,
            lineHeight: 1,
          }}
        >
          {title}
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 28,
            fontSize: 40,
            color: "#a6b5cc",
            maxWidth: 940,
          }}
        >
          {tagline}
        </div>
      </div>

      <div style={{ display: "flex", fontSize: 26, color: "#a6b5cc" }}>
        Rihaan · Case study
      </div>
    </div>,
    { ...size },
  );
}
