import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";

import projects from "../data/projects";
import "../styles/AIMLProjects.css";

const AIMLProjects = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [difficulty, setDifficulty] = useState("All");

  /* ------------------------------------------------------------------ */
  /*  Derived filter options                                             */
  /* ------------------------------------------------------------------ */
  const categories = useMemo(
    () => ["All", ...new Set(projects.map((project) => project.category))],
    []
  );

  const difficulties = useMemo(
    () => ["All", ...new Set(projects.map((project) => project.difficulty))],
    []
  );

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const searchText = search.toLowerCase().trim();

      const matchesSearch =
        project.title.toLowerCase().includes(searchText) ||
        project.domain.toLowerCase().includes(searchText) ||
        project.shortDescription.toLowerCase().includes(searchText) ||
        project.technologies.some((technology) =>
          technology.toLowerCase().includes(searchText)
        );

      const matchesCategory =
        category === "All" || project.category === category;

      const matchesDifficulty =
        difficulty === "All" || project.difficulty === difficulty;

      return matchesSearch && matchesCategory && matchesDifficulty;
    });
  }, [search, category, difficulty]);

  const clearFilters = () => {
    setSearch("");
    setCategory("All");
    setDifficulty("All");
  };

  const hasActiveFilters =
    search || category !== "All" || difficulty !== "All";

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
    <div className="aiml-projects-page" ref={pageRef}>

      {/* =====================================================
          HERO
      ===================================================== */}
      <section className="aiml-hero">
        <div className="aiml-hero-bg" aria-hidden="true">
          <span className="aml-orb aml-orb--a" />
          <span className="aml-orb aml-orb--b" />
          <span className="aml-orb aml-orb--c" />
          <span className="aml-grid-bg" />
        </div>

        <div className="aml-container">
          <div className="aiml-hero-inner">

            <span className="aiml-hero-badge" data-reveal>
              <span className="aiml-hero-dot" />
              AI / MACHINE LEARNING PROJECTS
            </span>

            <h1 className="aiml-hero-title" data-reveal>
              Build a Project That
              <span className="aiml-hero-gradient">
                Builds Your Future.
              </span>
            </h1>

            <p className="aiml-hero-text" data-reveal>
              Explore industry-oriented AI and Machine Learning
              final-year projects designed for practical learning,
              development, deployment and viva preparation.
            </p>

            <div className="aiml-hero-trust" data-reveal>
              <span><i className="bi bi-code-slash" /> Source Code</span>
              <span><i className="bi bi-github" /> GitHub Support</span>
              <span><i className="bi bi-file-earmark-text" /> Documentation</span>
              <span><i className="bi bi-patch-check" /> Viva Support</span>
            </div>

          </div>
        </div>
      </section>

      {/* =====================================================
          CATALOG
      ===================================================== */}
      <section className="aiml-catalog">
        <div className="aml-container">

          {/* Filter box */}
          <div className="pr-filter-box" data-reveal>
            <div className="pr-filter-grid">

              <div className="pr-filter-field pr-filter-field--search">
                <label className="pr-filter-label">Search Projects</label>
                <div className="pr-search">
                  <i className="bi bi-search" />
                  <input
                    type="text"
                    className="pr-search-input"
                    placeholder="Search by project, domain or technology..."
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
                    {categories.map((item) => (
                      <option key={item} value={item}>
                        {item}
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
                    {difficulties.map((item) => (
                      <option key={item} value={item}>
                        {item}
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

          {/* Results header */}
          <div className="aiml-results-head" data-reveal>
            <div>
              <h2 className="section-title">
                AI/ML <em>Final Year Projects</em>
              </h2>
              <p className="section-description">
                Showing <strong>{filteredProjects.length}</strong> of{" "}
                <strong>{projects.length}</strong> projects
              </p>
            </div>

            <span className="aiml-results-tag">
              <i className="bi bi-stars" />
              Industry-Oriented
            </span>
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
                      {project.category}
                    </span>
                    <span
                      className={`pr-difficulty pr-difficulty--${project.difficulty
                        .toLowerCase()
                        .replace(/\s+/g, "-")}`}
                    >
                      {project.difficulty}
                    </span>
                  </div>

                  <div className="glow-card-icon">
                    <i className="bi bi-robot" />
                  </div>

                  <span className="pr-project-domain-label">
                    {project.domain}
                  </span>

                  <h3>{project.title}</h3>
                  <p className="pr-project-desc">
                    {project.shortDescription}
                  </p>

                  <div className="pr-tech-tags">
                    {project.technologies.slice(0, 5).map((tech) => (
                      <span key={tech} className="pr-tech-tag">
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 5 && (
                      <span className="pr-tech-tag pr-tech-tag--more">
                        +{project.technologies.length - 5}
                      </span>
                    )}
                  </div>

                  <div className="pr-project-meta">
                    <span>
                      <i className="bi bi-clock" />
                      {project.duration}
                    </span>
                    <span>
                      <i className="bi bi-currency-rupee" />
                      Starting {project.price.toLocaleString("en-IN")}
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
              <h3>No Projects Found</h3>
              <p>Try changing your search or filters.</p>
              <button
                type="button"
                className="pr-btn pr-btn--primary"
                onClick={clearFilters}
              >
                Reset Filters
                <i className="bi bi-arrow-right" />
              </button>
            </div>
          )}

        </div>
      </section>

      {/* =====================================================
          CTA
      ===================================================== */}
      <section className="aiml-cta-section">
        <div className="aml-container">
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
                Tell us your course, interests and preferred technology.
                Our team can help you select a suitable project.
              </p>
            </div>

            <div className="projects-cta-actions">
              <Link to="/contact" className="pr-btn pr-btn--light">
                Talk to Our Team
                <i className="bi bi-arrow-right" />
              </Link>
              <Link to="/projects" className="pr-btn pr-btn--outline">
                All Projects
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default AIMLProjects;