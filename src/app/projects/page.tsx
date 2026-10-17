import { Metadata } from "next";
import Link from "next/link";
import { SITE_URL, SITE_NAME } from "@/app/metadata";
import { projectsData } from "@/data/projects";
import BentoGrid from "@/app/components/projects/BentoGrid";
import ThemeSelector from "@/app/components/ThemeSelector";
import "./archive.css";

export const metadata: Metadata = {
  title: `All Engineering Projects & Architecture Case Studies | ${SITE_NAME}`,
  description:
    "Explore the complete portfolio archive of 22 verified web applications, SaaS platforms, desktop software, and REST APIs engineered with PHP/Laravel, Node.js, and modern tools.",
  alternates: {
    canonical: `${SITE_URL}/projects`,
  },
  openGraph: {
    title: `All Engineering Projects & Case Studies | ${SITE_NAME}`,
    description:
      "Explore 22 verified projects across Full-Stack, SaaS, Backend APIs, AI Automation, and Desktop Software.",
    url: `${SITE_URL}/projects`,
    type: "website",
  },
};

export default function ProjectsArchivePage() {
  const publishedCount = projectsData.length;
  const fullCaseStudiesCount = projectsData.filter((p) => p.caseStudy?.isFullCaseStudy).length;

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${SITE_URL}/projects#collection`,
        name: `All Engineering Projects Archive | ${SITE_NAME}`,
        description:
          "Complete catalog of verified software engineering projects, web applications, and architectural case studies.",
        url: `${SITE_URL}/projects`,
        author: {
          "@type": "Person",
          name: SITE_NAME,
          url: SITE_URL,
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${SITE_URL}/projects#breadcrumbs`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: SITE_URL,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Projects Archive",
            item: `${SITE_URL}/projects`,
          },
        ],
      },
    ],
  };

  return (
    <div className="projects-archive-page">
      {/* Schema.org CollectionPage & Breadcrumbs */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />

      {/* Navigation & Theme Selector Bar */}
      <nav className="projects-archive-nav" aria-label="Breadcrumb">
        <div className="projects-archive-breadcrumbs">
          <Link href="/">Home</Link>
          <span className="separator" aria-hidden="true">/</span>
          <span className="current" aria-current="page">
            Projects Archive
          </span>
        </div>

        <ThemeSelector />
      </nav>

      {/* Archive Header */}
      <header className="projects-archive-header">
        <div className="projects-archive-eyebrow" aria-hidden="true">
          <span>📂</span>
          <span>Verified Engineering Archive</span>
        </div>

        <h1 className="projects-archive-title">
          All Projects &amp; Architectural Case Studies
        </h1>

        <p className="projects-archive-subtitle">
          Browse the complete portfolio of verified applications, production-ready SaaS platforms,
          desktop software, and modular REST APIs engineered by Hamza Bouhouch. Filter by domain or explore interactive previews.
        </p>

        {/* Quick Stats Badges */}
        <div className="projects-archive-stats" aria-label="Portfolio summary statistics">
          <span className="projects-archive-stat-item">
            <strong>{publishedCount}</strong> Published Projects
          </span>
          <span className="projects-archive-stat-item">
            <strong>{fullCaseStudiesCount}</strong> Full Case Studies
          </span>
          <span className="projects-archive-stat-item">
            <strong>7</strong> Technical Categories
          </span>
        </div>
      </header>

      {/* Full Bento Grid with Category Filtering & Quick View */}
      <main id="archive-grid-region">
        <BentoGrid />
      </main>

      {/* Return to Homepage Button */}
      <div className="projects-archive-back-row">
        <Link href="/#projects" className="projects-archive-back-btn">
          <span aria-hidden="true">←</span>
          <span>Back to Homepage Showcase</span>
        </Link>
      </div>
    </div>
  );
}
