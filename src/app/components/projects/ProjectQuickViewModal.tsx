"use client";

import { useEffect, useRef, useState, useCallback, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";

const emptySubscribe = () => () => {};
import Image from "next/image";
import Link from "next/link";
import { Project } from "@/types/project";

interface ProjectQuickViewModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectQuickViewModal({
  project,
  isOpen,
  onClose,
}: ProjectQuickViewModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const previouslyFocusedElementRef = useRef<HTMLElement | null>(null);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const isClient = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );

  // Collect unique images for the visual gallery
  const galleryImages: string[] = project
    ? Array.from(
        new Set([
          project.media.thumbnail,
          ...(project.media.gallery || []),
        ].filter(Boolean))
      )
    : [];

  const hasMultipleImages = galleryImages.length > 1;

  // Gallery Navigation Handlers
  const handleNextImage = useCallback(() => {
    if (!hasMultipleImages) return;
    setGalleryIndex((prev) => (prev + 1) % galleryImages.length);
  }, [hasMultipleImages, galleryImages.length]);

  const handlePrevImage = useCallback(() => {
    if (!hasMultipleImages) return;
    setGalleryIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  }, [hasMultipleImages, galleryImages.length]);

  // Accessibility: Focus Trap, Keyboard Listeners, and Scroll Lock with Zero Layout Shift
  useEffect(() => {
    if (!isOpen || !project) return;

    // Save previous active element for focus restoration
    previouslyFocusedElementRef.current = document.activeElement as HTMLElement | null;

    // Prevent body layout shift by compensating for scrollbar width
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;

    document.body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    // Set initial focus to close button
    const focusTimer = setTimeout(() => {
      closeBtnRef.current?.focus();
    }, 40);

    // Keyboard navigation handler
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }

      // Gallery keyboard controls
      if (hasMultipleImages) {
        if (e.key === "ArrowRight") {
          e.preventDefault();
          handleNextImage();
          return;
        }
        if (e.key === "ArrowLeft") {
          e.preventDefault();
          handlePrevImage();
          return;
        }
      }

      // WAI-ARIA Focus Trap within dialog
      if (e.key === "Tab" && dialogRef.current) {
        const focusableElements = dialogRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );

        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      clearTimeout(focusTimer);
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;
      window.removeEventListener("keydown", handleKeyDown);
      // Restore focus to original trigger element
      if (previouslyFocusedElementRef.current && typeof previouslyFocusedElementRef.current.focus === "function") {
        previouslyFocusedElementRef.current.focus();
      }
    };
  }, [isOpen, project, onClose, hasMultipleImages, handleNextImage, handlePrevImage]);

  if (!isOpen || !project || !isClient) return null;

  // Backdrop dismissal (click outside modal dialog)
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Status configuration
  const getStatusBadge = (status: Project["status"]) => {
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
  };

  const statusBadge = getStatusBadge(project.status);
  const currentImage = galleryImages[galleryIndex] || project.media.thumbnail;

  // Check whether project has a full narrative case study or a factual project overview
  const isFullCaseStudy = Boolean(project.caseStudy?.isFullCaseStudy);

  return createPortal(
    <div
      className="quickview-overlay"
      onClick={handleBackdropClick}
      role="presentation"
      aria-hidden={!isOpen}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="quickview-title"
        aria-describedby="quickview-summary"
        className="quickview-dialog"
        tabIndex={-1}
      >
        {/* Subtle Ambient Radial Glow */}
        <div className="quickview-glow" aria-hidden="true" />

        {/* Modal Header */}
        <header className="quickview-header">
          <div className="quickview-header-content">
            <div className="bento-badge-group">
              <span className="bento-category-pill">
                {project.categoryLabel || project.category}
              </span>
              <span
                className={`bento-status-pill ${statusBadge.className}`}
                title={`Development status: ${statusBadge.label}`}
              >
                <span className="bento-status-dot" aria-hidden="true">
                  {statusBadge.icon}
                </span>
                <span>{statusBadge.label}</span>
              </span>
              {project.isFeatured && (
                <span className="bento-featured-pill">Flagship</span>
              )}
            </div>

            <h2 id="quickview-title" className="quickview-title">
              {project.title}
            </h2>

            {project.subtitle && (
              <p className="quickview-subtitle">{project.subtitle}</p>
            )}
          </div>

          {/* Accessible 44px Close Button */}
          <button
            ref={closeBtnRef}
            type="button"
            onClick={onClose}
            className="quickview-close-btn"
            aria-label="Close project preview"
            title="Close preview (Esc)"
          >
            <span aria-hidden="true">✕</span>
          </button>
        </header>

        {/* Modal Visual / Lightweight Gallery Section */}
        <div className="quickview-visual-wrapper">
          <div className="quickview-image-container">
            <Image
              src={currentImage}
              alt={`${project.title} preview image ${
                hasMultipleImages ? `${galleryIndex + 1} of ${galleryImages.length}` : ""
              }`}
              fill
              sizes="(max-width: 768px) 100vw, 800px"
              className="quickview-image"
              priority
            />

            {/* Gallery Navigation Controls (Only when verified multiple images exist) */}
            {hasMultipleImages && (
              <>
                <button
                  type="button"
                  onClick={handlePrevImage}
                  className="quickview-gallery-btn prev"
                  aria-label="View previous image"
                >
                  <span aria-hidden="true">‹</span>
                </button>

                <button
                  type="button"
                  onClick={handleNextImage}
                  className="quickview-gallery-btn next"
                  aria-label="View next image"
                >
                  <span aria-hidden="true">›</span>
                </button>

                <div
                  className="quickview-gallery-counter"
                  aria-live="polite"
                  aria-atomic="true"
                >
                  {galleryIndex + 1} / {galleryImages.length}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Modal Body Content */}
        <div className="quickview-body">
          {/* Quick Facts Grid */}
          <div className="quickview-facts-grid" role="region" aria-label="Project Quick Facts">
            <div className="quickview-fact-item">
              <span className="quickview-fact-label">Context</span>
              <span className="quickview-fact-value">{project.projectContext}</span>
            </div>
            <div className="quickview-fact-item">
              <span className="quickview-fact-label">My Role</span>
              <span className="quickview-fact-value">{project.role}</span>
            </div>
            <div className="quickview-fact-item">
              <span className="quickview-fact-label">Repository Access</span>
              <span className="quickview-fact-value">
                {project.isPrivateRepo ? "🔒 Private Commercial" : "✓ Public Open Source"}
              </span>
            </div>
          </div>

          {/* Executive Summary */}
          <section className="quickview-section">
            <h3 className="quickview-section-heading">Overview &amp; Purpose</h3>
            <p id="quickview-summary" className="quickview-summary-text">
              {project.summary}
            </p>
          </section>

          {/* Technical Architecture Overview */}
          {project.architecturalDetails && (
            <section className="quickview-section">
              <h3 className="quickview-section-heading">Technical Architecture</h3>
              <p className="quickview-text">{project.architecturalDetails}</p>
            </section>
          )}

          {/* Three Key Verified Features */}
          {project.keyFeatures && project.keyFeatures.length > 0 && (
            <section className="quickview-section">
              <h3 className="quickview-section-heading">Key Capabilities</h3>
              <ul className="quickview-feature-list">
                {project.keyFeatures.slice(0, 3).map((feature, idx) => (
                  <li key={idx}>{feature}</li>
                ))}
              </ul>
            </section>
          )}

          {/* Technology Badges Breakdown */}
          <section className="quickview-section">
            <h3 className="quickview-section-heading">Technology Stack</h3>

            {project.structuredStack ? (
              <div className="quickview-stack-breakdown">
                {project.structuredStack.core && (
                  <div className="quickview-stack-row">
                    <span className="quickview-stack-cat">Core:</span>
                    <div className="bento-tech-tags">
                      {project.structuredStack.core.map((tech) => (
                        <span key={tech} className="bento-tech-tag">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {project.structuredStack.backend && (
                  <div className="quickview-stack-row">
                    <span className="quickview-stack-cat">Backend:</span>
                    <div className="bento-tech-tags">
                      {project.structuredStack.backend.map((tech) => (
                        <span key={tech} className="bento-tech-tag">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {project.structuredStack.frontend && (
                  <div className="quickview-stack-row">
                    <span className="quickview-stack-cat">Frontend:</span>
                    <div className="bento-tech-tags">
                      {project.structuredStack.frontend.map((tech) => (
                        <span key={tech} className="bento-tech-tag">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {project.structuredStack.database && (
                  <div className="quickview-stack-row">
                    <span className="quickview-stack-cat">Database:</span>
                    <div className="bento-tech-tags">
                      {project.structuredStack.database.map((tech) => (
                        <span key={tech} className="bento-tech-tag">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="bento-tech-tags">
                {project.techStack.map((tech) => (
                  <span key={tech} className="bento-tech-tag">
                    {tech}
                  </span>
                ))}
              </div>
            )}
          </section>

          {/* Verification Details */}
          {project.verificationNotes && (
            <div className="quickview-verification-note">
              <span className="quickview-note-badge">Verification Note</span>
              <p>{project.verificationNotes}</p>
            </div>
          )}
        </div>

        {/* Modal Action Footer */}
        <footer className="quickview-footer">
          <div className="quickview-footer-actions">
            {project.links.liveUrl && (
              <a
                href={project.links.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bento-btn bento-btn-primary"
                aria-label={`Open live deployment of ${project.title}`}
              >
                <span>Live Demo</span>
                <span aria-hidden="true">↗</span>
              </a>
            )}

            {project.links.sourceUrl && (
              <a
                href={project.links.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bento-btn bento-btn-secondary"
                aria-label={`View GitHub source code for ${project.title}`}
              >
                <span>Source Code</span>
                <span aria-hidden="true">↗</span>
              </a>
            )}

            {project.isPrivateRepo && !project.links.sourceUrl && (
              <span
                className="bento-private-badge"
                title="Commercial enterprise software. Source code is kept confidential."
              >
                <span>🔒 Private Commercial Repository</span>
              </span>
            )}

            {/* Project Navigation CTA: Adapts label to Case Study vs Project Details */}
            {project.links.caseStudyUrl && (
              <Link
                href={project.links.caseStudyUrl}
                onClick={onClose}
                className="bento-btn bento-btn-secondary"
                aria-label={
                  isFullCaseStudy
                    ? `Explore full technical case study for ${project.title}`
                    : `View project details for ${project.title}`
                }
              >
                <span>{isFullCaseStudy ? "Explore Full Case Study" : "View Project Details"}</span>
                <span aria-hidden="true">→</span>
              </Link>
            )}
          </div>
        </footer>
      </div>
    </div>,
    document.body
  );
}
