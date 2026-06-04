import { ImageResponse } from "next/og";

export const alt = "Hamza Bouhouch, Full Stack Developer and AI Automation Engineer in Morocco";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "72px",
          color: "white",
          background: "#050509",
          border: "2px solid rgba(139, 92, 246, 0.4)",
        }}
      >
        <div style={{ color: "#a78bfa", fontSize: 26, marginBottom: 30 }}>bouhouch.site</div>
        <div style={{ fontSize: 74, lineHeight: 1.05, marginBottom: 28 }}>Hamza Bouhouch</div>
        <div style={{ color: "#d4d4d8", fontSize: 38, lineHeight: 1.25 }}>
          Full Stack Developer &amp; AI Automation Engineer Morocco
        </div>
        <div style={{ color: "#a1a1aa", fontSize: 24, marginTop: 42 }}>
          Laravel · React · Next.js · n8n · SaaS
        </div>
      </div>
    ),
    size,
  );
}
