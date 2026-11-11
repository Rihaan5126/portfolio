import { ImageResponse } from "next/og";
import { profile } from "@/lib/data";

export const alt = `${profile.name}: software, systems and AI engineering`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
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
          "radial-gradient(circle at 85% 0%, rgba(57,124,255,0.55), rgba(7,11,22,0) 55%), radial-gradient(circle at 0% 100%, rgba(133,120,255,0.35), rgba(7,11,22,0) 50%), radial-gradient(circle at 20% 15%, rgba(84,217,255,0.18), rgba(7,11,22,0) 45%)",
      }}
    >
      <div
        style={{
          display: "flex",
          fontSize: 24,
          letterSpacing: 6,
          color: "#54d9ff",
        }}
      >
        {profile.heroEyebrow}
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          fontSize: 96,
          lineHeight: 1.02,
        }}
      >
        <div style={{ display: "flex", fontWeight: 700, letterSpacing: -3 }}>
          {profile.heroLead}
        </div>
        <div
          style={{
            display: "flex",
            fontWeight: 700,
            letterSpacing: -3,
            color: "#54d9ff",
          }}
        >
          {profile.heroWords.join(" ")}
        </div>
      </div>

      <div style={{ display: "flex", fontSize: 28, color: "#a6b5cc" }}>
        Computer Engineering, University of Birmingham
      </div>
    </div>,
    { ...size },
  );
}
