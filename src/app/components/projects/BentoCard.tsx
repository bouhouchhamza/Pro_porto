"use client";

import Image from "next/image";
import Link from "next/link";
import { Project } from "@/types/project";

interface BentoCardProps {
  project: Project;
  index: number;
  onQuickView: (project: Project) => void;
}

export default function BentoCard({ project, index, onQuickView }: BentoCardProps) {
  // Distinguish development status
  const getStatusConfig = (status: Project["status"]) => {
    switch (status) {
      case "live":
        return {
          label: "Live in Production",
          className: "bento-status-live",
          icon: "●",
        };
      case "completed":
        return {
          label: "Completed Codebase",
          className: "bento-status-completed",
          icon: "✓",
        };
      case "in-development":
        return {
          label: "In Active Development",
          className: "bento-status-dev",
          icon: "⚙",
        };
      case "prototype":
        return {
          label: "Prototype",
          className: "bento-status-proto",
          icon: "◈",
        };
      default:
        return {
          label: "Verified Project",
          className: "bento-status-verified",
          icon: "●",
        };
    }
  };

  const statusConfig = getStatusConfig(project.status);
  const isFlagship = project.bentoSpan === "col-span-2";

  return (
    <article
      className={`bento-card ${isFlagship ? "col-span-2 is-flagship" : ""}`}
      style={{ animationDelay: `${Math.min(index * 40, 400)}ms` }}
      aria-labelledby={`project-title-${project.id}`}
    >
      {/* Subtle radial ambient cosmic glow */}
      <div className="bento-card-glow" aria-hidden="true" />

      {/* Visual / Screenshot Container with fallback */}
      <div className="bento-image-wrapper">
        <Image
          src={project.media.thumbnail}
          alt={`${project.title} - Hamza Bouhouch Portfolio`}
          width={isFlagship ? 640 : 420}
          height={240}
          loading="lazy"
          sizes={
            isFlagship
              ? "(max-width: 768px) 100vw, (max-width: 1024px) 100vw, 66vw"
              : "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          }
          className="bento-thumbnail"
        />

        {/* Status & Category Overlays */}
        <div className="bento-image-overlay">
          <div className="bento-badge-group">
            <span className="bento-category-pill">
              {project.categoryLabel || project.category}
            </span>
            {project.isFeatured && (
              <span className="bento-featured-pill">Flagship</span>
            )}
          </div>

          <span
            className={`bento-status-pill ${statusConfig.className}`}
            title={`Development status: ${statusConfig.label}`}
          >
            <span className="bento-status-dot" aria-hidden="true">
              {statusConfig.icon}
            </span>
            <span>{statusConfig.label}</span>
          </span>
        </div>
      </div>

      {/* Card Core Content */}
      <div className="bento-card-body">
        <div className="bento-title-row">
          <h3 id={`project-title-${project.id}`} className="bento-card-title">
            {project.title}
          </h3>
          {project.media.badgeIcon && (
            <span className="bento-card-icon" aria-hidden="true">
              {project.media.badgeIcon}
            </span>
          )}
        </div>

        {project.subtitle && (
          <p className="bento-card-subtitle">{project.subtitle}</p>
        )}

        <p className="bento-card-summary">{project.summary}</p>

        {/* Primary Technology Tags (strictly max 3) */}
        <div className="bento-tech-tags" aria-label="Primary technologies">
          {project.techStack.slice(0, 3).map((tech) => (
            <span key={tech} className="bento-tech-tag">
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Card Footer Actions — Two-Tier Layout */}
      <div className="bento-card-footer">
        {/* Primary Action Row: Interactive Quick View + Case Study Deep Dive */}
        <div className="bento-footer-primary-row">
          <button
            type="button"
            onClick={() => onQuickView(project)}
            className="bento-btn bento-btn-quicklook"
            aria-haspopup="dialog"
            aria-label={`Open interactive preview for ${project.title}`}
          >
            <span className="bento-btn-icon" aria-hidden="true">
              👁️
            </span>
            <span>Quick View</span>
          </button>

          {project.links.caseStudyUrl ? (
            <Link
              href={project.links.caseStudyUrl}
              className="bento-btn bento-btn-case-study"
              aria-label={`Read architectural case study for ${project.title}`}
            >
              <span>Case Study</span>
              <span aria-hidden="true">→</span>
            </Link>
          ) : (
            <Link
              href={`/projects/${project.slug}`}
              className="bento-btn bento-btn-case-study"
              aria-label={`Explore details for ${project.title}`}
            >
              <span>Details</span>
              <span aria-hidden="true">→</span>
            </Link>
          )}
        </div>

        {/* Secondary Outbound Links: Live Demo, Source Code, or Private Repo */}
        {(project.links.liveUrl || (project.links.sourceUrl && !project.isPrivateRepo) || project.isPrivateRepo) && (
          <div className="bento-footer-secondary-row">
            {project.links.liveUrl && (
              <a
                href={project.links.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bento-sub-link"
                aria-label={`View live demo of ${project.title}`}
              >
                <span aria-hidden="true">🌐</span>
                <span>Live Demo</span>
                <span aria-hidden="true">↗</span>
              </a>
            )}

            {project.links.sourceUrl && !project.isPrivateRepo && (
              <a
                href={project.links.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bento-sub-link"
                aria-label={`View source code for ${project.title} on GitHub`}
              >
                <span aria-hidden="true">⌨️</span>
                <span>Source Code</span>
                <span aria-hidden="true">↗</span>
              </a>
            )}

            {project.isPrivateRepo && (
              <span
                className="bento-private-badge"
                title="Commercial software. Source code is kept in a private repository."
              >
                <span aria-hidden="true">🔒</span>
                <span>Private Repo</span>
              </span>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
