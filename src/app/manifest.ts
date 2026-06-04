import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Hamza Bouhouch | Full Stack Developer & AI Automation Engineer",
    short_name: "Hamza Bouhouch",
    description:
      "Portfolio of Hamza Bouhouch, a Full Stack Developer and AI Automation Engineer in Morocco.",
    start_url: "/",
    display: "standalone",
    background_color: "#050509",
    theme_color: "#141423",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
      {
        src: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
