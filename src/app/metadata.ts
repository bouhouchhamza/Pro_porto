import type { Metadata } from "next";

export const SITE_URL = "https://bouhouch.site";
export const SITE_NAME = "Hamza Bouhouch";

const title = "Hamza Bouhouch | Full Stack Developer & AI Automation Engineer Morocco";
const description =
  "Hamza Bouhouch is a Full Stack Developer and AI Automation Engineer in Morocco specializing in Laravel, React, Next.js, n8n, SaaS products, and custom business automation.";

export const siteMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  title: {
    default: title,
    template: "%s | Hamza Bouhouch",
  },
  description,
  keywords: [
    "Hamza Bouhouch",
    "Bouhouch",
    "Full Stack Developer Morocco",
    "Web Developer Morocco",
    "Website Developer Morocco",
    "AI Automation Engineer Morocco",
    "Laravel Developer Morocco",
    "React Developer Morocco",
    "Next.js Developer Morocco",
    "n8n Developer Morocco",
    "SaaS Developer Morocco",
    "Business Automation Morocco",
    "Custom Web Application Developer",
    "Freelance Full Stack Developer Morocco",
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "technology",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Hamza Bouhouch Portfolio",
    title,
    description,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Hamza Bouhouch, Full Stack Developer and AI Automation Engineer in Morocco",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
    : undefined,
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.webmanifest",
  other: {
    "geo.region": "MA",
    "geo.placename": "Morocco",
  },
};

export const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: SITE_NAME,
      alternateName: "Bouhouch",
      url: SITE_URL,
      image: `${SITE_URL}/byby.jpg`,
      email: "mailto:bouhouchhamza075@gmail.com",
      telephone: "+212772247633",
      jobTitle: ["Full Stack Developer", "AI Automation Engineer"],
      description,
      address: {
        "@type": "PostalAddress",
        addressCountry: "MA",
        addressRegion: "Morocco",
      },
      knowsAbout: [
        "Laravel development",
        "React development",
        "Next.js development",
        "n8n automation",
        "AI automation",
        "SaaS development",
        "Custom web applications",
        "Business automation",
      ],
      sameAs: ["https://github.com/bouhouchhamza"],
      mainEntityOfPage: { "@id": `${SITE_URL}/#website` },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Hamza Bouhouch Portfolio",
      description,
      inLanguage: "en",
      publisher: { "@id": `${SITE_URL}/#person` },
      about: { "@id": `${SITE_URL}/#person` },
    },
    {
      "@type": ["ProfessionalService", "LocalBusiness"],
      "@id": `${SITE_URL}/#professional-service`,
      name: "Hamza Bouhouch Web Development & AI Automation",
      url: SITE_URL,
      image: `${SITE_URL}/byby.jpg`,
      logo: `${SITE_URL}/logo.png`,
      email: "mailto:bouhouchhamza075@gmail.com",
      telephone: "+212772247633",
      priceRange: "$$",
      areaServed: [
        { "@type": "Country", name: "Morocco" },
        { "@type": "AdministrativeArea", name: "Worldwide" },
      ],
      address: {
        "@type": "PostalAddress",
        addressCountry: "MA",
      },
      founder: { "@id": `${SITE_URL}/#person` },
      knowsAbout: [
        "Full stack development",
        "AI automation",
        "Laravel",
        "React",
        "Next.js",
        "n8n",
        "SaaS",
      ],
    },
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "Hamza Bouhouch",
      url: SITE_URL,
      logo: `${SITE_URL}/logo.png`,
      founder: { "@id": `${SITE_URL}/#person` },
      sameAs: ["https://github.com/bouhouchhamza"],
    },
    {
      "@type": "ItemList",
      "@id": `${SITE_URL}/#portfolio-projects`,
      name: "Hamza Bouhouch Full Stack and AI Automation Projects",
      itemListElement: [
        {
          "@type": "CreativeWork",
          position: 1,
          name: "Financial Risk Simulation Platform",
          description:
            "Laravel fintech platform for transaction simulation, risk scoring, fraud signals, and admin review workflows.",
          url: "https://github.com/bouhouchhamza/Financial_Risk_Simulation_Platform",
          creator: { "@id": `${SITE_URL}/#person` },
        },
        {
          "@type": "CreativeWork",
          position: 2,
          name: "AI Automation Systems",
          description:
            "n8n and OpenAI workflow automations that connect business tools and reduce repetitive manual work.",
          url: "https://github.com/bouhouchhamza",
          creator: { "@id": `${SITE_URL}/#person` },
        },
        {
          "@type": "CreativeWork",
          position: 3,
          name: "Pet Journey",
          description: "A full-stack pet care web application with frontend and backend systems.",
          url: "https://github.com/bouhouchhamza/petJourney",
          creator: { "@id": `${SITE_URL}/#person` },
        },
      ],
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${SITE_URL}/#breadcrumbs`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Hamza Bouhouch Portfolio",
          item: SITE_URL,
        },
      ],
    },
  ],
};
