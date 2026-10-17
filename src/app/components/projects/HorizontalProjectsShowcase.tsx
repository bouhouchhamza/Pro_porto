"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { Project } from "@/types/project";
import { projectsData } from "@/data/projects";
import ProjectQuickViewModal from "./ProjectQuickViewModal";
import "./horizontal-showcase.css";

// Prioritized flagship engineering projects specified for Phase 8
const FEATURED_IDS = [
  "corepos",
  "nuvomailo",
  "atlas-commerce",
  "taskflow",
  "youlearn-lms",
  "job-board",
  "financial-risk-simulation",
];

export default function HorizontalProjectsShowcase() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  // Filter and order the 7 featured projects
  const featuredProjects = FEATURED_IDS.map((id) =>
    projectsData.find((p) => p.id === id)
  ).filter((p): p is Project => Boolean(p && p.isPublished));

  // Compute scroll boundary state and active index
  const updateScrollState = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    const { scrollLeft, scrollWidth, clientWidth } = track;
    // Allow 4px margin of error for subpixel calculations
    setCanScrollLeft(scrollLeft > 4);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 4);

    // Compute approximate active card index
    const firstCard = track.querySelector<HTMLElement>(".showcase-card");
    if (firstCard) {
      const cardWidth = firstCard.offsetWidth;
      const gap = 20; // gap between cards
      const index = Math.round(scrollLeft / (cardWidth + gap));
      setActiveIndex(Math.max(0, Math.min(index, featuredProjects.length - 1)));
    }
  }, [featuredProjects.length]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    updateScrollState();

    const handleScroll = () => {
      window.requestAnimationFrame(updateScrollState);
    };

    track.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    return () => {
      track.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [updateScrollState]);

  // Programmatic scroll step (one card width)
  const scrollByCard = (direction: "left" | "right") => {
    const track = trackRef.current;
    if (!track) return;

    const firstCard = track.querySelector<HTMLElement>(".showcase-card");
    const cardWidth = firstCard ? firstCard.offsetWidth + 20 : 360;
    const scrollAmount = direction === "left" ? -cardWidth : cardWidth;

    track.scrollBy({
      left: scrollAmount,
      behavior: "smooth",
    });
  };

  const scrollToIndex = (index: number) => {
    const track = trackRef.current;
    if (!track) return;

    const firstCard = track.querySelector<HTMLElement>(".showcase-card");
    const cardWidth = firstCard ? firstCard.offsetWidth + 20 : 360;

    track.scrollTo({
      left: index * cardWidth,
      behavior: "smooth",
    });
  };

  // Quick View Modal Handlers
  const handleOpenQuickView = (project: Project) => {
    setSelectedProject(project);
    setIsQuickViewOpen(true);
  };

  const handleCloseQuickView = () => {
    setIsQuickViewOpen(false);
  };

  // Status badge config helper
  const getStatusConfig = (status: Project["status"]) => {
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

  return (
    <div className="horizontal-showcase-container">
      {/* Header & Controls Row */}
      <div className="showcase-header-row">
        <div className="showcase-heading-group">
          <div className="showcase-eyebrow" aria-hidden="true">
            <span>✨</span>
            <span>Featured Software &amp; Architectures</span>
          </div>
          <h2 id="featured-projects-heading">Selected Engineering Work</h2>
          <p>
            Explore flagship full-stack SaaS platforms, local-first desktop software, database-backed REST APIs,
            and automated systems across modern backend, database, and cloud architectures.
          </p>
        </div>

        {/* Header Actions: Compact View All Archive Link + Carousel Arrows */}
        <div className="showcase-header-actions">
          <Link
            href="/projects"
            className="showcase-view-all-btn"
            aria-label="View all 22 verified projects in archive"
          >
            <span>View All 22 Projects</span>
            <span aria-hidden="true">→</span>
          </Link>

          <div className="showcase-controls" role="group" aria-label="Showcase carousel navigation">
            <button
              type="button"
              onClick={() => scrollByCard("left")}
              disabled={!canScrollLeft}
              className="showcase-nav-btn"
              aria-label="Previous featured project"
              aria-controls="featured-projects-track"
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => scrollByCard("right")}
              disabled={!canScrollRight}
              className="showcase-nav-btn"
              aria-label="Next featured project"
              aria-controls="featured-projects-track"
            >
              →
            </button>
          </div>
        </div>
      </div>

      {/* Screen Reader Status */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        Showing featured project {activeIndex + 1} of {featuredProjects.length}:{" "}
        {featuredProjects[activeIndex]?.title}
      </div>

      {/* Scrollable Viewport & Track */}
      <div className="showcase-scroll-viewport">
        <div
          id="featured-projects-track"
          ref={trackRef}
          className="showcase-scroll-track"
          tabIndex={0}
          role="region"
          aria-labelledby="featured-projects-heading"
        >
          {featuredProjects.map((project, index) => {
            const statusConfig = getStatusConfig(project.status);

            return (
              <article
                key={project.id}
                className="showcase-card"
                aria-labelledby={`showcase-card-title-${project.id}`}
              >
                {/* Media Thumbnail */}
                <div className="showcase-image-wrapper">
                  <Image
                    src={project.media.thumbnail}
                    alt={`${project.title} screenshot - Hamza Bouhouch`}
                    width={520}
                    height={220}
                    loading={index < 2 ? "eager" : "lazy"}
                    className="showcase-thumbnail"
                  />

                  <div className="showcase-image-overlay">
                    <div className="showcase-badge-group">
                      <span className="showcase-category-pill">
                        {project.categoryLabel || project.category}
                      </span>
                      <span className="showcase-featured-pill">Flagship</span>
                    </div>

                    <span
                      className={`showcase-status-pill ${statusConfig.className}`}
                      title={`Status: ${statusConfig.label}`}
                    >
                      <span aria-hidden="true">{statusConfig.icon}</span>
                      <span>{statusConfig.label}</span>
                    </span>
                  </div>
                </div>

                {/* Card Content Body */}
                <div className="showcase-card-body">
                  <div className="showcase-title-row">
                    <h3 id={`showcase-card-title-${project.id}`} className="showcase-title">
                      {project.title}
                    </h3>
                    {project.media.badgeIcon && (
                      <span className="showcase-icon" aria-hidden="true">
                        {project.media.badgeIcon}
                      </span>
                    )}
                  </div>

                  {project.subtitle && (
                    <p className="showcase-subtitle">{project.subtitle}</p>
                  )}

                  <p className="showcase-summary">{project.summary}</p>

                  {/* Core Tech Stack Badges */}
                  <div className="showcase-tech-tags" aria-label="Core technologies">
                    {project.techStack.slice(0, 4).map((tech) => (
                      <span key={tech} className="showcase-tech-tag">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Actions Footer — Two-Tier Layout (Zero Text Wrapping & Clear Hierarchy) */}
                <div className="showcase-card-footer">
                  {/* Primary Actions: Interactive Quick View + Case Study Deep-Dive */}
                  <div className="showcase-footer-primary-row">
                    <button
                      type="button"
                      onClick={() => handleOpenQuickView(project)}
                      className="showcase-btn showcase-btn-quickview"
                      aria-haspopup="dialog"
                      aria-label={`Open interactive preview for ${project.title}`}
                    >
                      <span aria-hidden="true">👁️</span>
                      <span>Quick View</span>
                    </button>

                    <Link
                      href={`/projects/${project.slug}`}
                      className="showcase-btn showcase-btn-case-study"
                      aria-label={`Read case study for ${project.title}`}
                    >
                      <span>Case Study</span>
                      <span aria-hidden="true">→</span>
                    </Link>
                  </div>

                  {/* Secondary Outbound Links: Live Demo, Verified Source Code, or Private Repo */}
                  {(project.links.liveUrl || (project.links.sourceUrl && !project.isPrivateRepo) || project.isPrivateRepo) && (
                    <div className="showcase-footer-secondary-row">
                      {project.links.liveUrl && (
                        <a
                          href={project.links.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="showcase-sub-link"
                          aria-label={`Visit live demo for ${project.title}`}
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
                          className="showcase-sub-link"
                          aria-label={`View GitHub repository for ${project.title}`}
                        >
                          <span aria-hidden="true">⌨️</span>
                          <span>Source Code</span>
                          <span aria-hidden="true">↗</span>
                        </a>
                      )}

                      {project.isPrivateRepo && (
                        <span
                          className="showcase-private-badge"
                          title="Commercial software. Repository is private."
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
          })}
        </div>
      </div>

      {/* Pagination Indicator Dots */}
      <div className="showcase-pagination-bar" role="tablist" aria-label="Showcase slide indicators">
        {featuredProjects.map((project, idx) => (
          <button
            key={project.id}
            type="button"
            role="tab"
            aria-selected={activeIndex === idx}
            aria-label={`Go to slide ${idx + 1}: ${project.title}`}
            onClick={() => scrollToIndex(idx)}
            className={`showcase-dot ${activeIndex === idx ? "is-active" : ""}`}
          />
        ))}
      </div>



      {/* Interactive Quick View Modal Dialog */}
      <ProjectQuickViewModal
        key={selectedProject?.id || "quickview-modal"}
        project={selectedProject}
        isOpen={isQuickViewOpen}
        onClose={handleCloseQuickView}
      />
    </div>
  );
}
