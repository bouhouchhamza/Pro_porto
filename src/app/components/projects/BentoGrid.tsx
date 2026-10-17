"use client";

import { useState, useRef, useMemo, KeyboardEvent } from "react";
import { projectsData, PROJECT_CATEGORIES } from "@/data/projects";
import { Project, ProjectCategory } from "@/types/project";
import BentoCard from "./BentoCard";
import ProjectQuickViewModal from "./ProjectQuickViewModal";
import "./bento.css";

export default function BentoGrid() {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory | "All">("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const tabListRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Published projects baseline
  const publishedProjects = useMemo(
    () => projectsData.filter((p) => p.isPublished),
    []
  );

  // Clean trimmed search query
  const trimmedQuery = searchQuery.trim().toLowerCase();

  // Helper function to check if a project matches the query
  const matchesSearch = (p: Project, query: string): boolean => {
    if (!query) return true;

    // Project title & subtitle
    if (p.title.toLowerCase().includes(query)) return true;
    if (p.subtitle && p.subtitle.toLowerCase().includes(query)) return true;

    // Summary & role
    if (p.summary.toLowerCase().includes(query)) return true;
    if (p.role && p.role.toLowerCase().includes(query)) return true;

    // Category and label
    if (p.category.toLowerCase().includes(query)) return true;
    if (p.categoryLabel && p.categoryLabel.toLowerCase().includes(query)) return true;

    // Tech stack (both flat array and structured stack)
    if (p.techStack.some((tech) => tech.toLowerCase().includes(query))) return true;
    if (p.structuredStack) {
      const allStackValues = [
        ...(p.structuredStack.core || []),
        ...(p.structuredStack.backend || []),
        ...(p.structuredStack.frontend || []),
        ...(p.structuredStack.database || []),
        ...(p.structuredStack.tools || []),
      ];
      if (allStackValues.some((tech) => tech.toLowerCase().includes(query))) return true;
    }

    // Key features & context
    if (p.projectContext && p.projectContext.toLowerCase().includes(query)) return true;
    if (p.keyFeatures && p.keyFeatures.some((f) => f.toLowerCase().includes(query))) return true;
    if (p.verificationNotes && p.verificationNotes.toLowerCase().includes(query)) return true;

    return false;
  };

  // Filter projects by category first
  const categoryProjects = useMemo(() => {
    if (activeCategory === "All") return publishedProjects;
    return publishedProjects.filter((p) => p.category === activeCategory);
  }, [activeCategory, publishedProjects]);

  // Combined intersection: Category + Search Query
  const filteredProjects = useMemo(() => {
    if (!trimmedQuery) return categoryProjects;
    return categoryProjects.filter((p) => matchesSearch(p, trimmedQuery));
  }, [categoryProjects, trimmedQuery]);

  // Dynamic matching counts for category tabs based on current search query
  const getCategoryCount = (catId: ProjectCategory | "All"): number => {
    const base = !trimmedQuery
      ? publishedProjects
      : publishedProjects.filter((p) => matchesSearch(p, trimmedQuery));

    if (catId === "All") return base.length;
    return base.filter((p) => p.category === catId).length;
  };

  // Quick View Modal Handlers
  const handleOpenQuickView = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseQuickView = () => {
    setIsModalOpen(false);
  };

  // Clear handlers
  const handleClearSearch = () => {
    setSearchQuery("");
    searchInputRef.current?.focus();
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setActiveCategory("All");
  };

  // Keyboard navigation for tablist (WAI-ARIA tabs pattern)
  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>, currentIndex: number) => {
    const tabsCount = PROJECT_CATEGORIES.length;
    let targetIndex = -1;

    if (e.key === "ArrowRight") {
      e.preventDefault();
      targetIndex = (currentIndex + 1) % tabsCount;
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      targetIndex = (currentIndex - 1 + tabsCount) % tabsCount;
    } else if (e.key === "Home") {
      e.preventDefault();
      targetIndex = 0;
    } else if (e.key === "End") {
      e.preventDefault();
      targetIndex = tabsCount - 1;
    }

    if (targetIndex !== -1 && tabListRef.current) {
      const buttons = tabListRef.current.querySelectorAll<HTMLButtonElement>('[role="tab"]');
      const targetButton = buttons[targetIndex];
      if (targetButton) {
        targetButton.focus();
        setActiveCategory(PROJECT_CATEGORIES[targetIndex].id as ProjectCategory | "All");
      }
    }
  };

  return (
    <div className="bento-section-wrapper">
      {/* Search Input Bar (Real-Time Client-Side Filtering) */}
      <div className="bento-search-control-bar">
        <div className="bento-search-box">
          <label htmlFor="bento-project-search" className="sr-only">
            Search projects by name, technology, or domain
          </label>
          <span className="bento-search-icon" aria-hidden="true">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </span>
          <input
            ref={searchInputRef}
            id="bento-project-search"
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search projects (e.g. Laravel, Supabase, Express, CorePOS, REST API)..."
            className="bento-search-input"
            autoComplete="off"
            spellCheck="false"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={handleClearSearch}
              className="bento-search-clear-btn"
              aria-label="Clear search query"
              title="Clear search"
            >
              ✕
            </button>
          )}
        </div>

        {/* Live Filter / Results Counter */}
        <div className="bento-search-stats" aria-live="polite" aria-atomic="true">
          <span className="bento-results-badge">
            Showing <strong>{filteredProjects.length}</strong> of {publishedProjects.length} projects
          </span>
          {(trimmedQuery || activeCategory !== "All") && (
            <button
              type="button"
              onClick={handleResetFilters}
              className="bento-reset-all-link"
              aria-label="Reset all search and category filters"
            >
              Reset filters
            </button>
          )}
        </div>
      </div>

      {/* Category Filter Tabs Bar */}
      <div
        ref={tabListRef}
        className="bento-filter-bar"
        role="tablist"
        aria-label="Filter portfolio projects by category"
      >
        {PROJECT_CATEGORIES.map((cat, idx) => {
          const count = getCategoryCount(cat.id as ProjectCategory | "All");
          const isActive = activeCategory === cat.id;

          return (
            <button
              key={cat.id}
              role="tab"
              id={`filter-tab-${cat.id.toLowerCase().replace(/\s+/g, "-")}`}
              aria-selected={isActive}
              aria-controls="bento-projects-region"
              tabIndex={isActive ? 0 : -1}
              onClick={() => setActiveCategory(cat.id as ProjectCategory | "All")}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              className={`bento-filter-tab ${isActive ? "is-active" : ""}`}
            >
              <span className="bento-tab-label">{cat.label}</span>
              <span className="bento-filter-count" aria-label={`${count} projects`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Filter Status Indicator for Screen Readers */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        Showing {filteredProjects.length} projects in {activeCategory} category
        {trimmedQuery ? ` matching "${searchQuery}"` : ""}.
      </div>

      {/* Responsive Asymmetrical Bento Grid or Empty State */}
      {filteredProjects.length > 0 ? (
        <div
          id="bento-projects-region"
          className="bento-grid"
          role="region"
          aria-labelledby={`filter-tab-${activeCategory.toLowerCase().replace(/\s+/g, "-")}`}
        >
          {filteredProjects.map((project, index) => (
            <BentoCard
              key={project.id}
              project={project}
              index={index}
              onQuickView={handleOpenQuickView}
            />
          ))}
        </div>
      ) : (
        <div className="bento-empty-state" role="status" aria-live="polite">
          <div className="bento-empty-icon" aria-hidden="true">
            🔍
          </div>
          <h3 className="bento-empty-title">No projects match your search</h3>
          <p className="bento-empty-desc">
            {trimmedQuery && activeCategory !== "All"
              ? `No projects found matching "${searchQuery}" in the ${activeCategory} category.`
              : trimmedQuery
              ? `No projects found matching "${searchQuery}". Try searching for another framework, technology, or domain keyword.`
              : `No projects found in the ${activeCategory} category.`}
          </p>
          <div className="bento-empty-actions">
            {trimmedQuery && (
              <button
                type="button"
                onClick={handleClearSearch}
                className="bento-empty-btn bento-empty-btn-primary"
              >
                Clear search query
              </button>
            )}
            {activeCategory !== "All" && (
              <button
                type="button"
                onClick={() => setActiveCategory("All")}
                className="bento-empty-btn bento-empty-btn-secondary"
              >
                Show all categories
              </button>
            )}
            {trimmedQuery && activeCategory !== "All" && (
              <button
                type="button"
                onClick={handleResetFilters}
                className="bento-empty-btn bento-empty-btn-outline"
              >
                Reset all filters
              </button>
            )}
          </div>
        </div>
      )}

      {/* Interactive Quick View Modal Dialog */}
      <ProjectQuickViewModal
        key={selectedProject?.id || "quickview-modal"}
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseQuickView}
      />
    </div>
  );
}
