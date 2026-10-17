import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { projectsData } from "@/data/projects";
import { SITE_URL, SITE_NAME } from "@/app/metadata";
import { DevelopmentStatus } from "@/types/project";
import ThemeSelector from "@/app/components/ThemeSelector";
import "@/app/components/projects/bento.css";
import "./case-study.css";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projectsData.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projectsData.find((p) => p.slug === slug);

  if (!project) {
    return {
      title: "Project Not Found | Hamza Bouhouch",
    };
  }

  const isFullCase = Boolean(project.caseStudy?.isFullCaseStudy);
  const pageTitle = isFullCase
    ? `${project.title} — Technical Case Study | ${SITE_NAME}`
    : `${project.title} — Project Overview | ${SITE_NAME}`;
  const pageDescription = project.summary;
  const canonicalUrl = `${SITE_URL}/projects/${project.slug}`;

  return {
    title: pageTitle,
    description: pageDescription,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: "article",
      url: canonicalUrl,
      title: pageTitle,
      description: pageDescription,
      siteName: `${SITE_NAME} Portfolio`,
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: `${project.title} technical case study by ${SITE_NAME}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: pageDescription,
    },
  };
}

function getStatusBadge(status: DevelopmentStatus) {
  switch (status) {
    case "live":
      return { label: "Live in Production", className: "bento-status-live", icon: "●" };
    case "completed":
      return { label: "Completed Codebase", className: "bento-status-completed", icon: "✓" };
    case "in-development":
      return { label: "In Active Development", className: "bento-status-dev", icon: "⚙" };
    case "prototype":
      return { label: "Prototype", className: "bento-status-proto", icon: "◈" };
    default:
      return { label: "Verified Project", className: "bento-status-verified", icon: "●" };
  }
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const projectIndex = projectsData.findIndex((p) => p.slug === slug);

  if (projectIndex === -1) {
    notFound();
  }

  const project = projectsData[projectIndex];
  const isFullCaseStudy = Boolean(project.caseStudy?.isFullCaseStudy);
  const statusBadge = getStatusBadge(project.status);

  const prevProject =
    projectIndex > 0 ? projectsData[projectIndex - 1] : projectsData[projectsData.length - 1];
  const nextProject =
    projectIndex < projectsData.length - 1 ? projectsData[projectIndex + 1] : projectsData[0];

  const relatedProjects = projectsData
    .filter((p) => p.slug !== project.slug && (p.category === project.category || p.isFeatured))
    .slice(0, 3);

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": isFullCaseStudy ? "TechArticle" : "SoftwareApplication",
        "@id": `${SITE_URL}/projects/${project.slug}#entity`,
        name: project.title,
        headline: `${project.title}: ${project.subtitle}`,
        description: project.summary,
        url: `${SITE_URL}/projects/${project.slug}`,
        applicationCategory: project.category,
        operatingSystem: "Web, Windows, Linux",
        datePublished: "2026-01-01",
        dateModified: new Date().toISOString(),
        author: {
          "@type": "Person",
          name: SITE_NAME,
          url: SITE_URL,
        },
        publisher: {
          "@type": "Person",
          name: SITE_NAME,
        },
        mainEntityOfPage: `${SITE_URL}/projects/${project.slug}`,
        about: project.techStack,
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${SITE_URL}/projects/${project.slug}#breadcrumbs`,
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
            name: "Projects",
            item: `${SITE_URL}/projects`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: project.title,
            item: `${SITE_URL}/projects/${project.slug}`,
          },
        ],
      },
    ],
  };

  return (
    <article className="case-study-page">
      {/* Schema.org Article & Breadcrumbs */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />

      {/* Breadcrumbs Navigation & Theme Toggle */}
      <nav className="case-study-breadcrumbs" aria-label="Breadcrumb">
        <div className="case-study-breadcrumbs-links">
          <Link href="/">Home</Link>
          <span className="separator">/</span>
          <Link href="/projects">Projects</Link>
          <span className="separator">/</span>
          <span className="current" aria-current="page">
            {project.title}
          </span>
        </div>
        <ThemeSelector className="case-study-theme-selector" />
      </nav>

      {/* Case Study Hero */}
      <header className="case-study-hero">
        <div className="case-study-hero-meta">
          <span className="bento-category-pill">
            {project.categoryLabel || project.category}
          </span>

          <span className={`bento-status-pill ${statusBadge.className}`}>
            <span className="bento-status-dot" aria-hidden="true">
              {statusBadge.icon}
            </span>
            <span>{statusBadge.label}</span>
          </span>

          <span
            className={`case-study-badge ${
              isFullCaseStudy ? "case-study-badge-study" : "case-study-badge-overview"
            }`}
          >
            {isFullCaseStudy ? "🔬 Technical Case Study" : "📋 Factual Project Overview"}
          </span>
        </div>

        <h1 className="case-study-title">{project.title}</h1>
        <p className="case-study-subtitle">{project.subtitle}</p>

        {/* Quick Facts Bar */}
        <div className="case-study-facts-bar">
          <div className="case-study-fact">
            <span className="case-study-fact-label">Context</span>
            <span className="case-study-fact-value">{project.projectContext}</span>
          </div>
          <div className="case-study-fact">
            <span className="case-study-fact-label">My Role</span>
            <span className="case-study-fact-value">{project.role}</span>
          </div>
          <div className="case-study-fact">
            <span className="case-study-fact-label">Architecture</span>
            <span className="case-study-fact-value">
              {isFullCaseStudy ? "Production Architecture" : "Verified Implementation"}
            </span>
          </div>
          <div className="case-study-fact">
            <span className="case-study-fact-label">Primary Stack</span>
            <span className="case-study-fact-value">
              {project.techStack.slice(0, 3).join(", ")}
            </span>
          </div>
        </div>

        {/* CTA Bar */}
        <div className="case-study-cta-bar">
          {project.links.liveUrl && (
            <a
              href={project.links.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bento-btn bento-btn-primary"
              aria-label={`Visit live deployment of ${project.title}`}
            >
              <span>Visit Live Application</span>
              <span aria-hidden="true">↗</span>
            </a>
          )}

          {project.links.sourceUrl && !project.isPrivateRepo && (
            <a
              href={project.links.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bento-btn bento-btn-secondary"
              aria-label={`View GitHub repository for ${project.title}`}
            >
              <span>View Source Code on GitHub</span>
              <span aria-hidden="true">↗</span>
            </a>
          )}

          {project.isPrivateRepo && (
            <span
              className="bento-private-badge"
              title="Commercial enterprise software. Source code is kept confidential."
            >
              <span>🔒 Private Commercial Repository</span>
            </span>
          )}

          <Link href="/#projects" className="bento-btn bento-btn-secondary">
            <span>← Back to All Projects</span>
          </Link>
        </div>
      </header>

      {/* Featured Media Showcase */}
      <div className="case-study-media-wrapper">
        <div className="case-study-media-glow" aria-hidden="true" />
        <div className="case-study-media-frame">
          <Image
            src={project.media.thumbnail}
            alt={`${project.title} interface architecture and implementation`}
            width={1080}
            height={520}
            priority
            className="case-study-media-image"
          />
        </div>
      </div>

      {/* Narrative Body Content */}
      <div className="case-study-content">
        {isFullCaseStudy && project.caseStudy ? (
          <>
            {/* 1. Project Overview & Objectives */}
            <section className="case-study-block">
              <h2 className="case-study-block-title">🎯 Project Overview &amp; Objective</h2>
              {project.caseStudy.targetAudience && (
                <div className="case-study-target-box">
                  <strong>Target Audience:</strong> {project.caseStudy.targetAudience}
                </div>
              )}
              <p className="case-study-text">{project.summary}</p>
            </section>

            {/* 2. The Challenge */}
            {project.caseStudy.theChallenge && (
              <section className="case-study-block">
                <h2 className="case-study-block-title">⚡ The Engineering Challenge</h2>
                <p className="case-study-text">{project.caseStudy.theChallenge}</p>
              </section>
            )}

            {/* 3. Architecture & Technical Approach */}
            {project.caseStudy.architecture && (
              <section className="case-study-block">
                <h2 className="case-study-block-title">🏗️ Architecture &amp; System Design</h2>
                <div className="case-study-arch-grid">
                  {project.caseStudy.architecture.frontend && (
                    <div className="case-study-arch-card">
                      <div className="case-study-arch-card-header">
                        <span className="case-study-arch-icon">💻</span>
                        <h3 className="case-study-arch-card-title">Frontend Architecture</h3>
                      </div>
                      <p className="case-study-arch-card-body">
                        {project.caseStudy.architecture.frontend}
                      </p>
                    </div>
                  )}

                  {project.caseStudy.architecture.backend && (
                    <div className="case-study-arch-card">
                      <div className="case-study-arch-card-header">
                        <span className="case-study-arch-icon">⚙️</span>
                        <h3 className="case-study-arch-card-title">Backend &amp; Service Layer</h3>
                      </div>
                      <p className="case-study-arch-card-body">
                        {project.caseStudy.architecture.backend}
                      </p>
                    </div>
                  )}

                  {project.caseStudy.architecture.database && (
                    <div className="case-study-arch-card">
                      <div className="case-study-arch-card-header">
                        <span className="case-study-arch-icon">🗄️</span>
                        <h3 className="case-study-arch-card-title">Database &amp; Persistence</h3>
                      </div>
                      <p className="case-study-arch-card-body">
                        {project.caseStudy.architecture.database}
                      </p>
                    </div>
                  )}

                  {project.caseStudy.architecture.apiStructure && (
                    <div className="case-study-arch-card">
                      <div className="case-study-arch-card-header">
                        <span className="case-study-arch-icon">🔌</span>
                        <h3 className="case-study-arch-card-title">API &amp; Communication</h3>
                      </div>
                      <p className="case-study-arch-card-body">
                        {project.caseStudy.architecture.apiStructure}
                      </p>
                    </div>
                  )}

                  {project.caseStudy.architecture.authAndSecurity && (
                    <div className="case-study-arch-card">
                      <div className="case-study-arch-card-header">
                        <span className="case-study-arch-icon">🔒</span>
                        <h3 className="case-study-arch-card-title">Auth, Permissions &amp; Security</h3>
                      </div>
                      <p className="case-study-arch-card-body">
                        {project.caseStudy.architecture.authAndSecurity}
                      </p>
                    </div>
                  )}

                  {project.caseStudy.architecture.infrastructure && (
                    <div className="case-study-arch-card">
                      <div className="case-study-arch-card-header">
                        <span className="case-study-arch-icon">🚀</span>
                        <h3 className="case-study-arch-card-title">Infrastructure &amp; Packaging</h3>
                      </div>
                      <p className="case-study-arch-card-body">
                        {project.caseStudy.architecture.infrastructure}
                      </p>
                    </div>
                  )}
                </div>

                {project.caseStudy.architecture.diagram && (
                  <div className="case-study-diagram-container">
                    <div className="case-study-diagram-header">
                      <span className="case-study-diagram-icon">📐</span>
                      <h3 className="case-study-diagram-title">System Architecture Data Flow</h3>
                    </div>
                    <pre className="case-study-diagram-pre">
                      <code>{project.caseStudy.architecture.diagram}</code>
                    </pre>
                  </div>
                )}
              </section>
            )}

            {/* 4. Implemented Capabilities */}
            {project.caseStudy.keyFeaturesDetailed && (
              <section className="case-study-block">
                <h2 className="case-study-block-title">🚀 Implemented Capabilities</h2>
                <div className="case-study-features-grid">
                  {project.caseStudy.keyFeaturesDetailed.map((feat, idx) => (
                    <div key={idx} className="case-study-feature-card">
                      {feat.tag && <span className="case-study-feature-tag">{feat.tag}</span>}
                      <h3 className="case-study-feature-title">{feat.title}</h3>
                      <p className="case-study-feature-desc">{feat.description}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* 5. Engineering Challenges & Deep-Dive Solutions */}
            {project.caseStudy.engineeringChallenges && (
              <section className="case-study-block">
                <h2 className="case-study-block-title">🛠️ Engineering Challenges &amp; Solutions</h2>
                <div className="case-study-challenges-list">
                  {project.caseStudy.engineeringChallenges.map((challenge, idx) => (
                    <div key={idx} className="case-study-challenge-card">
                      <div className="case-study-challenge-header">
                        <span className="case-study-challenge-num">{idx + 1}</span>
                        <h3 className="case-study-challenge-title">{challenge.title}</h3>
                      </div>
                      <div className="case-study-challenge-section">
                        <span className="case-study-challenge-label">The Technical Problem:</span>
                        <p className="case-study-challenge-text">{challenge.problem}</p>
                      </div>
                      <div className="case-study-challenge-section">
                        <span className="case-study-challenge-label case-study-challenge-solution">
                          Engineered Resolution:
                        </span>
                        <p className="case-study-challenge-text">{challenge.solution}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Technical Decisions & Architectural Trade-offs */}
            {project.caseStudy.technicalDecisions &&
              project.caseStudy.technicalDecisions.length > 0 && (
                <section className="case-study-block">
                  <h2 className="case-study-block-title">
                    ⚖️ Technical Decisions &amp; Architectural Trade-offs
                  </h2>
                  <div className="case-study-decisions-grid">
                    {project.caseStudy.technicalDecisions.map((dec, idx) => (
                      <div key={idx} className="case-study-decision-card">
                        <div className="case-study-decision-header">
                          <span className="case-study-decision-badge">Decision {idx + 1}</span>
                          <h3 className="case-study-decision-title">{dec.decision}</h3>
                        </div>
                        <div className="case-study-decision-section">
                          <span className="case-study-decision-label case-study-decision-rationale">
                            Engineering Rationale:
                          </span>
                          <p className="case-study-decision-text">{dec.rationale}</p>
                        </div>
                        <div className="case-study-decision-section">
                          <span className="case-study-decision-label case-study-decision-tradeoff">
                            Evaluated Trade-off:
                          </span>
                          <p className="case-study-decision-text">{dec.tradeOff}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

            {/* Testing Strategy & Verification */}
            {project.caseStudy.testingAndValidation && (
              <section className="case-study-block">
                <h2 className="case-study-block-title">
                  🧪 Testing Strategy &amp; Verification
                </h2>
                <div className="case-study-testing-card">
                  <p className="case-study-text">
                    <strong>Quality Strategy: </strong>
                    {project.caseStudy.testingAndValidation.strategy}
                  </p>
                  <div className="case-study-testing-scenarios">
                    <h3 className="case-study-testing-heading">Verified Test Scenarios</h3>
                    <ul className="case-study-list">
                      {project.caseStudy.testingAndValidation.verifiedScenarios.map((scen, idx) => (
                        <li key={idx}>{scen}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>
            )}

            {/* 6. Results & Learnings */}
            {project.caseStudy.resultsAndLearnings && (
              <section className="case-study-block">
                <h2 className="case-study-block-title">📈 Results &amp; Technical Learnings</h2>
                <div className="case-study-learnings-grid">
                  <div className="case-study-learnings-card">
                    <h3 className="case-study-learnings-title">Verified Implemented Outcomes</h3>
                    <ul className="case-study-list">
                      {project.caseStudy.resultsAndLearnings.implementedOutcomes.map((out, idx) => (
                        <li key={idx}>{out}</li>
                      ))}
                    </ul>
                  </div>

                  {project.caseStudy.resultsAndLearnings.plannedImprovements &&
                    project.caseStudy.resultsAndLearnings.plannedImprovements.length > 0 && (
                      <div className="case-study-learnings-card">
                        <h3 className="case-study-learnings-title">
                          Planned Next Milestones
                        </h3>
                        <ul className="case-study-list">
                          {project.caseStudy.resultsAndLearnings.plannedImprovements.map(
                            (plan, idx) => (
                              <li key={idx}>{plan}</li>
                            )
                          )}
                        </ul>
                      </div>
                    )}

                  <div className="case-study-learnings-card">
                    <h3 className="case-study-learnings-title">Architectural Takeaways</h3>
                    <ul className="case-study-list">
                      {project.caseStudy.resultsAndLearnings.technicalTakeaways.map((takeaway, idx) => (
                        <li key={idx}>{takeaway}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>
            )}
          </>
        ) : (
          /* Shorter Factual Project Overview */
          <>
            {/* Overview & Objective */}
            <section className="case-study-block">
              <h2 className="case-study-block-title">🎯 Overview &amp; Objective</h2>
              <p className="case-study-text">{project.summary}</p>
            </section>

            {/* Implemented Capabilities */}
            <section className="case-study-block">
              <h2 className="case-study-block-title">⚡ Implemented Capabilities</h2>
              <ul className="case-study-list">
                {project.keyFeatures.map((feature, idx) => (
                  <li key={idx}>{feature}</li>
                ))}
              </ul>
            </section>

            {/* Architectural Overview */}
            {project.architecturalDetails && (
              <section className="case-study-block">
                <h2 className="case-study-block-title">💡 Architecture &amp; System Design</h2>
                <p className="case-study-text">{project.architecturalDetails}</p>
              </section>
            )}

            {/* Provenance & Verification */}
            {project.verificationNotes && (
              <section className="case-study-block">
                <h2 className="case-study-block-title">📋 Verification &amp; Project Provenance</h2>
                <p className="case-study-text">{project.verificationNotes}</p>
              </section>
            )}
          </>
        )}

        {/* Technology Stack Matrix */}
        <section className="case-study-block">
          <h2 className="case-study-block-title">🧰 Complete Technology Stack</h2>
          <div className="case-study-tech-grid">
            <div className="case-study-tech-group">
              <div className="case-study-tech-group-title">Core Technologies</div>
              <div className="case-study-tag-cloud">
                {project.techStack.map((t) => (
                  <span key={t} className="bento-tech-tag">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {project.structuredStack?.backend && (
              <div className="case-study-tech-group">
                <div className="case-study-tech-group-title">Backend Architecture</div>
                <div className="case-study-tag-cloud">
                  {project.structuredStack.backend.map((t) => (
                    <span key={t} className="bento-tech-tag">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {project.structuredStack?.frontend && (
              <div className="case-study-tech-group">
                <div className="case-study-tech-group-title">Frontend &amp; UI Layer</div>
                <div className="case-study-tag-cloud">
                  {project.structuredStack.frontend.map((t) => (
                    <span key={t} className="bento-tech-tag">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {project.structuredStack?.database && (
              <div className="case-study-tech-group">
                <div className="case-study-tech-group-title">Database &amp; Storage</div>
                <div className="case-study-tag-cloud">
                  {project.structuredStack.database.map((t) => (
                    <span key={t} className="bento-tech-tag">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {project.structuredStack?.tools && (
              <div className="case-study-tech-group">
                <div className="case-study-tech-group-title">Tooling &amp; Infrastructure</div>
                <div className="case-study-tag-cloud">
                  {project.structuredStack.tools.map((t) => (
                    <span key={t} className="bento-tech-tag">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      </div>

      {/* Related Projects Showcase */}
      {relatedProjects.length > 0 && (
        <section className="case-study-related-section">
          <h2 className="case-study-related-heading">Explore Related Engineering Projects</h2>
          <div className="case-study-related-grid">
            {relatedProjects.map((rp) => (
              <Link
                key={rp.id}
                href={`/projects/${rp.slug}`}
                className="case-study-related-card"
              >
                <div className="case-study-related-card-top">
                  <span className="bento-category-pill">
                    {rp.categoryLabel || rp.category}
                  </span>
                  <span className="case-study-related-card-icon" aria-hidden="true">
                    {rp.media.badgeIcon || "●"}
                  </span>
                </div>
                <h3 className="case-study-related-card-title">{rp.title}</h3>
                <p className="case-study-related-card-summary">{rp.summary}</p>
                <div className="case-study-related-card-footer">
                  <div className="bento-tech-tags">
                    {rp.techStack.slice(0, 2).map((t) => (
                      <span key={t} className="bento-tech-tag">
                        {t}
                      </span>
                    ))}
                  </div>
                  <span className="case-study-related-link-text">
                    {rp.caseStudy?.isFullCaseStudy ? "Case Study →" : "Overview →"}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Project Navigation (Prev / Next) */}
      <nav className="case-study-nav-bar" aria-label="Project Navigation">
        <Link href={`/projects/${prevProject.slug}`} className="case-study-nav-btn">
          <span className="case-study-nav-dir">← Previous Project</span>
          <span className="case-study-nav-title">{prevProject.title}</span>
        </Link>

        <Link
          href={`/projects/${nextProject.slug}`}
          className="case-study-nav-btn case-study-nav-next"
        >
          <span className="case-study-nav-dir">Next Project →</span>
          <span className="case-study-nav-title">{nextProject.title}</span>
        </Link>
      </nav>

      {/* Bottom Conversion / Contact CTA */}
      <div className="case-study-contact-card">
        <h3>Need a Similar System or Application?</h3>
        <p>
          I collaborate with businesses and agencies to engineer scalable web backends,
          interactive client applications, and custom automation workflows.
        </p>
        <div className="case-study-contact-actions">
          <Link href="/#contact" className="bento-btn bento-btn-primary">
            <span>Let&apos;s Discuss Your Project</span>
            <span aria-hidden="true">→</span>
          </Link>
          <Link href="/#projects" className="bento-btn bento-btn-secondary">
            <span>Explore More Work</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
