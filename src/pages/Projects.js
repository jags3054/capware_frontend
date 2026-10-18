import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import projects from "../data/projects";
import "../styles/Projects.css";

/* ------------------------------------------------------------------ */
/*  Canonical helpers — normalize whatever shape the data comes in     */
/* ------------------------------------------------------------------ */
const slug = (v) => String(v || "").trim().toLowerCase();

const CATEGORY_ALIASES = {
  "ai / ml": "ai-ml",
  "ai/ml": "ai-ml",
  "ai-ml": "ai-ml",
  "aiml": "ai-ml",
  "artificial intelligence": "ai-ml",
  "machine learning": "ai-ml",
  "ml": "ai-ml",

  "genai": "genai",
  "generative ai": "genai",
  "gen ai": "genai",
  "llm": "genai",

  "computer vision": "cv",
  "cv": "cv",
  "vision": "cv",

  "data science": "ds",
  "ds": "ds",
  "data analytics": "ds",
  "analytics": "ds",
};

const DIFFICULTY_ALIASES = {
  beginner: "beginner",
  easy: "beginner",
  basic: "beginner",

  intermediate: "intermediate",
  medium: "intermediate",
  moderate: "intermediate",

  advanced: "advanced",
  hard: "advanced",
  expert: "advanced",
};

const canonCategory = (v) => CATEGORY_ALIASES[slug(v)] || slug(v);
const canonDifficulty = (v) => DIFFICULTY_ALIASES[slug(v)] || slug(v);

const CATEGORY_OPTIONS = [
  { value: "all",   label: "All" },
  { value: "ai-ml", label: "AI / ML" },
  { value: "genai", label: "GenAI" },
  { value: "cv",    label: "Computer Vision" },
  { value: "ds",    label: "Data Science" },
];

const DIFFICULTY_OPTIONS = [
  { value: "all",          label: "All" },
  { value: "beginner",     label: "Beginner" },
  { value: "intermediate", label: "Intermediate" },
  { value: "advanced",     label: "Advanced" },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */
function Projects() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [difficulty, setDifficulty] = useState("all");

  /* ------------------------------------------------------------------ */
  /*  Data                                                               */
  /* ------------------------------------------------------------------ */
  const allProjects = useMemo(() => {
    return projects.map((project) => {
      const rawCategory =
        project.mainCategory ??
        project.category ??
        project.domain ??
        "AI / ML";

      const rawDifficulty = project.difficulty ?? "Intermediate";

      return {
        ...project,
        _category: canonCategory(rawCategory),
        _difficulty: canonDifficulty(rawDifficulty),
        _searchBlob: [
          project.title,
          project.shortDescription,
          project.domain,
          project.mainCategory,
          project.category,
          ...(project.technologies || []),
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase(),
      };
    });
  }, []);

  const filteredProjects = useMemo(() => {
    const q = search.trim().toLowerCase();

    return allProjects.filter((project) => {
      const matchesSearch = !q || project._searchBlob.includes(q);
      const matchesCategory =
        category === "all" || project._category === category;
      const matchesDifficulty =
        difficulty === "all" || project._difficulty === difficulty;

      return matchesSearch && matchesCategory && matchesDifficulty;
    });
  }, [allProjects, search, category, difficulty]);

  const clearFilters = () => {
    setSearch("");
    setCategory("all");
    setDifficulty("all");
  };

  const hasActiveFilters =
    search.trim() !== "" || category !== "all" || difficulty !== "all";

  /* ------------------------------------------------------------------ */
  /*  Reveal + spotlight                                                 */
  /* ------------------------------------------------------------------ */
  const pageRef = useRef(null);

  useEffect(() => {
    const nodes = pageRef.current?.querySelectorAll("[data-reveal]") ?? [];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, [filteredProjects]);

  const handleSpotlight = (e) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  /* ------------------------------------------------------------------ */
  /*  Render                                                             */
  /* ------------------------------------------------------------------ */
  return (
    <div className="projects-page" ref={pageRef}>

      {/* =====================================================
          HERO
      ===================================================== */}
      <section className="projects-hero">
        <div className="projects-hero-bg" aria-hidden="true">
          <span className="pr-orb pr-orb--a" />
          <span className="pr-orb pr-orb--b" />
          <span className="pr-orb pr-orb--c" />
          <span className="pr-grid-bg" />
        </div>

        <div className="pr-container">
          <div className="projects-hero-inner">

            <div className="projects-hero-copy">
              <span className="projects-badge" data-reveal>
                <span className="projects-badge-dot" />
                FINAL YEAR PROJECTS
              </span>

              <h1 className="projects-hero-title" data-reveal>
                Build Projects That
                <span className="projects-hero-gradient">
                  Actually Matter.
                </span>
              </h1>

              <p className="projects-hero-text" data-reveal>
                Explore industry-oriented AI, ML, GenAI, Computer Vision and
                Data Science projects with complete development guidance.
              </p>

              <div className="projects-hero-highlights" data-reveal>
                <span><i className="bi bi-check-circle-fill" /> Industry-oriented</span>
                <span><i className="bi bi-check-circle-fill" /> Source Code</span>
                <span><i className="bi bi-check-circle-fill" /> Documentation</span>
                <span><i className="bi bi-check-circle-fill" /> Viva Support</span>
              </div>

              <div className="projects-hero-actions" data-reveal>
                <a href="#project-catalog" className="pr-btn pr-btn--primary">
                  Explore Projects
                  <i className="bi bi-arrow-down" />
                </a>

                <Link to="/register" className="pr-btn pr-btn--ghost">
                  Get Project Guidance
                  <i className="bi bi-compass" />
                </Link>
              </div>
            </div>

            {/* Portfolio card */}
            <div className="projects-hero-visual" data-reveal>
              <div className="projects-hero-card">
                <div className="ph-card-glow" aria-hidden="true" />

                <div className="ph-card-top">
                  <span className="ph-card-title">
                    <i className="bi bi-collection" />
                    Project Portfolio
                  </span>
                  <span className="ph-card-status">
                    <span className="pulse-dot" />
                    Live
                  </span>
                </div>

                <div className="ph-featured">
                  <div className="ph-featured-icon">
                    <i className="bi bi-robot" />
                    <span className="ph-featured-icon-ring" />
                  </div>
                  <div className="ph-featured-text">
                    <small>Featured Category</small>
                    <h4>Artificial Intelligence</h4>
                  </div>
                </div>

                <div className="ph-mini-grid">
                  <div className="ph-mini">
                    <i className="bi bi-cpu" />
                    <strong>AI / ML</strong>
                  </div>
                  <div className="ph-mini">
                    <i className="bi bi-stars" />
                    <strong>GenAI</strong>
                  </div>
                  <div className="ph-mini">
                    <i className="bi bi-camera" />
                    <strong>Vision</strong>
                  </div>
                  <div className="ph-mini">
                    <i className="bi bi-bar-chart" />
                    <strong>Data</strong>
                  </div>
                </div>

                <div className="ph-progress">
                  <div className="ph-progress-head">
                    <span>Project Development</span>
                    <strong>85%</strong>
                  </div>
                  <div className="ph-progress-bar">
                    <span />
                  </div>
                </div>
              </div>

              <span className="pr-float pr-float--1">
                <i className="bi bi-github" /> Source code included
              </span>
              <span className="pr-float pr-float--2">
                <i className="bi bi-award" /> Viva ready
              </span>
            </div>

          </div>
        </div>
      </section>

      {/* =====================================================
          CATEGORIES
      ===================================================== */}
      <section className="projects-categories">
        <div className="pr-container">
          <div className="pr-categories-grid">
            {[
              { icon: "bi-cpu",       title: "AI / ML",         sub: "Prediction & Intelligence", value: "ai-ml" },
              { icon: "bi-stars",     title: "GenAI",           sub: "LLM & AI Applications",     value: "genai" },
              { icon: "bi-camera",    title: "Computer Vision", sub: "Image & Video AI",          value: "cv" },
              { icon: "bi-bar-chart", title: "Data Science",    sub: "Analytics & Forecasting",   value: "ds" },
            ].map((cat) => (
              <button
                key={cat.value}
                type="button"
                className={`pr-category-card spotlight ${
                  category === cat.value ? "is-active" : ""
                }`}
                data-reveal
                onMouseMove={handleSpotlight}
                onClick={() => {
                  setCategory((prev) =>
                    prev === cat.value ? "all" : cat.value
                  );
                  document
                    .getElementById("project-catalog")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                <div className="pr-category-icon">
                  <i className={`bi ${cat.icon}`} />
                </div>
                <strong>{cat.title}</strong>
                <span>{cat.sub}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          CATALOG
      ===================================================== */}
      <section id="project-catalog" className="projects-catalog">
        <div className="pr-container">

          <div className="pr-section-head pr-section-head--center" data-reveal>
            <span className="section-label">PROJECT CATALOG</span>
            <h2 className="section-title">
              Find the Right <em>Project for You</em>
            </h2>
            <p className="section-description">
              Search and filter projects based on technology, category and
              difficulty level.
            </p>
          </div>

          {/* Filters */}
          <div className="pr-filter-box" data-reveal>
            <div className="pr-filter-grid">

              <div className="pr-filter-field pr-filter-field--search">
                <label className="pr-filter-label">Search Projects</label>
                <div className="pr-search">
                  <i className="bi bi-search" />
                  <input
                    type="text"
                    className="pr-search-input"
                    placeholder="Search by project, technology or domain..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  {search && (
                    <button
                      type="button"
                      className="pr-search-clear"
                      aria-label="Clear search"
                      onClick={() => setSearch("")}
                    >
                      <i className="bi bi-x-lg" />
                    </button>
                  )}
                </div>
              </div>

              <div className="pr-filter-field">
                <label className="pr-filter-label">Category</label>
                <div className="pr-select">
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    {CATEGORY_OPTIONS.map((item) => (
                      <option key={item.value} value={item.value}>
                        {item.label}
                      </option>
                    ))}
                  </select>
                  <i className="bi bi-chevron-down" />
                </div>
              </div>

              <div className="pr-filter-field">
                <label className="pr-filter-label">Difficulty</label>
                <div className="pr-select">
                  <select
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value)}
                  >
                    {DIFFICULTY_OPTIONS.map((item) => (
                      <option key={item.value} value={item.value}>
                        {item.label}
                      </option>
                    ))}
                  </select>
                  <i className="bi bi-chevron-down" />
                </div>
              </div>

              <div className="pr-filter-field">
                <label className="pr-filter-label">&nbsp;</label>
                <button
                  type="button"
                  className="pr-btn pr-btn--ghost pr-btn--clear"
                  onClick={clearFilters}
                >
                  <i className="bi bi-arrow-counterclockwise" />
                  Clear
                </button>
              </div>

            </div>
          </div>

          {/* Result bar */}
          <div className="pr-result-bar" data-reveal>
            <span>
              Showing <strong>{filteredProjects.length}</strong>{" "}
              project{filteredProjects.length !== 1 ? "s" : ""}
            </span>

            {hasActiveFilters && (
              <button type="button" onClick={clearFilters}>
                Clear filters <i className="bi bi-x-lg" />
              </button>
            )}
          </div>

          {/* Cards */}
          {filteredProjects.length > 0 ? (
            <div className="pr-projects-grid">
              {filteredProjects.map((project) => (
                <div
                  key={project.id}
                  className="glow-card pr-project-card spotlight"
                  data-reveal
                  onMouseMove={handleSpotlight}
                >
                  <div className="pr-project-head">
                    <span className="pr-project-category">
                      {
                        CATEGORY_OPTIONS.find(
                          (c) => c.value === project._category
                        )?.label || project.mainCategory
                      }
                    </span>
                    <span
                      className={`pr-difficulty pr-difficulty--${project._difficulty}`}
                    >
                      {
                        DIFFICULTY_OPTIONS.find(
                          (d) => d.value === project._difficulty
                        )?.label || project.difficulty
                      }
                    </span>
                  </div>

                  <div className="glow-card-icon">
                    <i className="bi bi-cpu" />
                  </div>

                  <h3>{project.title}</h3>
                  <p className="pr-project-desc">{project.shortDescription}</p>

                  <div className="pr-project-domain">
                    <i className="bi bi-grid" />
                    {project.domain}
                  </div>

                  <div className="pr-tech-tags">
                    {project.technologies?.slice(0, 4).map((tech) => (
                      <span key={tech} className="pr-tech-tag">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="pr-project-meta">
                    <span>
                      <i className="bi bi-clock" />
                      {project.duration}
                    </span>
                    <span>
                      <i className="bi bi-currency-rupee" />
                      Starting {project.price}
                    </span>
                  </div>

                  <Link
                    to={`/projects/ai-ml/${project.id}`}
                    className="pr-btn pr-btn--primary pr-project-btn"
                  >
                    View Project
                    <i className="bi bi-arrow-right" />
                  </Link>

                  <span className="card-corner card-corner--tl" />
                  <span className="card-corner card-corner--br" />
                </div>
              ))}
            </div>
          ) : (
            <div className="pr-empty" data-reveal>
              <div className="pr-empty-icon">
                <i className="bi bi-search" />
              </div>
              <h3>No projects found</h3>
              <p>
                Try changing your search or filter options to find a suitable
                project.
              </p>
              <button
                type="button"
                className="pr-btn pr-btn--primary"
                onClick={clearFilters}
              >
                View All Projects
                <i className="bi bi-arrow-right" />
              </button>
            </div>
          )}

        </div>
      </section>

      {/* =====================================================
          HOW IT WORKS
      ===================================================== */}
      <section className="projects-process">
        <div className="pr-container">

          <div className="pr-section-head pr-section-head--center" data-reveal>
            <span className="section-label">HOW IT WORKS</span>
            <h2 className="section-title">
              From Idea to <em>Final Project</em>
            </h2>
            <p className="section-description">
              Four clear milestones from picking a project to walking into
              your viva with confidence.
            </p>
          </div>

          <div className="pr-process-grid">
            {[
              { n: "01", icon: "bi-search",           t: "Choose",         s: "Select a project based on your course, interests and career goals." },
              { n: "02", icon: "bi-person-workspace", t: "Get Guidance",   s: "Get technical guidance throughout project development." },
              { n: "03", icon: "bi-code-square",      t: "Build & Deploy", s: "Develop, test and deploy your project with proper documentation." },
              { n: "04", icon: "bi-award",            t: "Present",        s: "Prepare your documentation, PPT and viva with confidence." },
            ].map((step, i) => (
              <div
                key={step.n}
                className="pr-process-card spotlight"
                data-reveal
                onMouseMove={handleSpotlight}
              >
                <span className="pr-process-number">{step.n}</span>

                <span className="pr-process-icon">
                  <i className={`bi ${step.icon}`} />
                </span>

                <h4>{step.t}</h4>
                <p>{step.s}</p>

                {i < 3 && (
                  <span className="pr-process-arrow" aria-hidden="true">
                    <i className="bi bi-arrow-right" />
                  </span>
                )}
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* =====================================================
          CTA
      ===================================================== */}
      <section className="projects-final-cta">
        <div className="pr-container">
          <div className="projects-cta-box" data-reveal>
            <span className="cta-glow cta-glow--a" aria-hidden="true" />
            <span className="cta-glow cta-glow--b" aria-hidden="true" />

            <div className="projects-cta-copy">
              <span className="projects-cta-badge">
                <i className="bi bi-stars" /> NEED HELP CHOOSING?
              </span>

              <h2>
                Not Sure Which Project
                <span>Is Right for You?</span>
              </h2>

              <p>
                Tell us your course, interests and preferred technology. Our
                team can help you choose a suitable project.
              </p>
            </div>

            <div className="projects-cta-actions">
              <Link to="/register" className="pr-btn pr-btn--light">
                Get Project Guidance
                <i className="bi bi-arrow-right" />
              </Link>
              <Link to="/contact" className="pr-btn pr-btn--outline">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

export default Projects;