import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 18,
        backgroundImage: "linear-gradient(135deg, #397cff, #54d9ff)",
        color: "#04101f",
        fontSize: 42,
        fontWeight: 800,
        fontFamily: "sans-serif",
      }}
    >
      R
    </div>,
    { ...size },
  );
}
