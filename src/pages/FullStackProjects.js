import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import fsdProjects from "../data/fsdprojects";
import "../styles/Projects.css";

function FullStackProjects() {
  const [search, setSearch] = useState("");
  const [difficulty, setDifficulty] = useState("All");

  /* ------------------------------------------------------------------ */
  /*  Filtering                                                          */
  /* ------------------------------------------------------------------ */
  const filteredProjects = useMemo(() => {
    return fsdProjects.filter((project) => {
      const text = search.toLowerCase();

      const matchesSearch =
        project.title.toLowerCase().includes(text) ||
        project.shortDescription.toLowerCase().includes(text) ||
        project.domain.toLowerCase().includes(text) ||
        project.technologies.some((tech) =>
          tech.toLowerCase().includes(text)
        );

      const matchesDifficulty =
        difficulty === "All" || project.difficulty === difficulty;

      return matchesSearch && matchesDifficulty;
    });
  }, [search, difficulty]);

  const clearFilters = () => {
    setSearch("");
    setDifficulty("All");
  };

  const hasActiveFilters = search || difficulty !== "All";

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
    <div className="fsd-projects-page" ref={pageRef}>

      {/* =====================================================
          HERO
      ===================================================== */}
      <section className="fsd-hero">
        <div className="fsd-hero-bg" aria-hidden="true">
          <span className="fsd-orb fsd-orb--a" />
          <span className="fsd-orb fsd-orb--b" />
          <span className="fsd-orb fsd-orb--c" />
          <span className="fsd-grid-bg" />
        </div>

        <div className="fsd-container">
          <div className="fsd-hero-inner">

            <div className="fsd-hero-copy">
              <span className="fsd-badge" data-reveal>
                <span className="fsd-badge-dot" />
                FULL STACK DEVELOPMENT PROJECTS
              </span>

              <h1 className="fsd-hero-title" data-reveal>
                Ship Real Products.
                <span className="fsd-hero-gradient">
                  End-to-End Full Stack.
                </span>
              </h1>

              <p className="fsd-hero-text" data-reveal>
                Twenty industry-oriented full stack projects — from
                e-commerce and chat apps to auctions and ERPs — covering
                frontend, backend, database, deployment and everything
                in between.
              </p>

              <div className="fsd-hero-trust" data-reveal>
                <span><i className="bi bi-check-circle-fill" /> Frontend + Backend</span>
                <span><i className="bi bi-check-circle-fill" /> Database Design</span>
                <span><i className="bi bi-check-circle-fill" /> Deployment</span>
                <span><i className="bi bi-check-circle-fill" /> Viva Support</span>
              </div>

              <div className="fsd-hero-actions" data-reveal>
                <a href="#fsd-catalog" className="pr-btn pr-btn--primary">
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
            <div className="fsd-hero-visual" data-reveal>
              <div className="fsd-hero-card">
                <div className="fsd-card-glow" aria-hidden="true" />

                <div className="fsd-card-top">
                  <span className="fsd-card-title">
                    <i className="bi bi-code-slash" />
                    Full Stack Track
                  </span>
                  <span className="fsd-card-status">
                    <span className="pulse-dot" />
                    Live
                  </span>
                </div>

                <div className="fsd-featured">
                  <div className="fsd-featured-icon">
                    <i className="bi bi-stack" />
                    <span className="fsd-featured-icon-ring" />
                  </div>
                  <div className="fsd-featured-text">
                    <small>Flagship Build</small>
                    <h4>MERN + MySQL Stack</h4>
                  </div>
                </div>

                <div className="fsd-mini-grid">
                  <div className="fsd-mini">
                    <i className="bi bi-window" />
                    <strong>React</strong>
                  </div>
                  <div className="fsd-mini">
                    <i className="bi bi-server" />
                    <strong>Node.js</strong>
                  </div>
                  <div className="fsd-mini">
                    <i className="bi bi-database" />
                    <strong>MongoDB</strong>
                  </div>
                  <div className="fsd-mini">
                    <i className="bi bi-cloud-arrow-up" />
                    <strong>Deploy</strong>
                  </div>
                </div>

                <div className="fsd-progress">
                  <div className="fsd-progress-head">
                    <span>Production Readiness</span>
                    <strong>20 Projects</strong>
                  </div>
                  <div className="fsd-progress-bar">
                    <span />
                  </div>
                </div>
              </div>

              <span className="fsd-float fsd-float--1">
                <i className="bi bi-github" /> Source code
              </span>
              <span className="fsd-float fsd-float--2">
                <i className="bi bi-award" /> Viva ready
              </span>
            </div>

          </div>
        </div>
      </section>

      {/* =====================================================
          CATALOG
      ===================================================== */}
      <section id="fsd-catalog" className="fsd-catalog">
        <div className="fsd-container">

          <div className="fsd-section-head fsd-section-head--center" data-reveal>
            <span className="section-label">FULL STACK CATALOG</span>
            <h2 className="section-title">
              Choose Your <em>Full Stack Project</em>
            </h2>
            <p className="section-description">
              Every project includes requirement analysis, database design,
              frontend, backend, testing and deployment.
            </p>
          </div>

          {/* Filters */}
          <div className="pr-filter-box" data-reveal>
            <div className="pr-filter-grid pr-filter-grid--genai">

              <div className="pr-filter-field pr-filter-field--search">
                <label className="pr-filter-label">Search Projects</label>
                <div className="pr-search">
                  <i className="bi bi-search" />
                  <input
                    type="text"
                    className="pr-search-input"
                    placeholder="Search FSD projects, technologies or domains..."
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
                <label className="pr-filter-label">Difficulty</label>
                <div className="pr-select">
                  <select
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value)}
                  >
                    <option>All</option>
                    <option>Beginner</option>
                    <option>Intermediate</option>
                    <option>Advanced</option>
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
              Showing <strong>{filteredProjects.length}</strong> Full Stack{" "}
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
                    <span className="pr-project-category">Full Stack</span>
                    <span
                      className={`pr-difficulty pr-difficulty--${project.difficulty
                        .toLowerCase()
                        .replace(" ", "-")}`}
                    >
                      {project.difficulty}
                    </span>
                  </div>

                  <div className="glow-card-icon">
                    <i className="bi bi-code-slash" />
                  </div>

                  <span className="pr-project-domain-label">
                    {project.domain}
                  </span>

                  <h3 title={project.title}>{project.title}</h3>
                  <p className="pr-project-desc">
                    {project.shortDescription}
                  </p>

                  <div className="pr-tech-tags">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <span key={tech} className="pr-tech-tag">
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="pr-tech-tag pr-tech-tag--more">
                        +{project.technologies.length - 4}
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
                      Starting {project.price}
                    </span>
                  </div>

                  <Link
                    to={`/projects/full-stack/${project.id}`}
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
              <h3>No Full Stack projects found</h3>
              <p>Try changing your search or difficulty filter.</p>
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
          WHAT YOU LEARN
      ===================================================== */}
      <section className="fsd-process-section">
        <div className="fsd-container">

          <div className="fsd-section-head fsd-section-head--center" data-reveal>
            <span className="section-label">WHAT YOU LEARN</span>
            <h2 className="section-title">
              Complete <em>Software Delivery Lifecycle</em>
            </h2>
            <p className="section-description">
              The same five-stage pipeline every project in the catalog
              follows — from requirement to deployment.
            </p>
          </div>

          <div className="fsd-process-grid">
            {[
              {
                n: "01",
                icon: "bi-clipboard-check",
                t: "Requirement",
                s: "Define features, users and the exact scope of the application.",
              },
              {
                n: "02",
                icon: "bi-diagram-3",
                t: "Design",
                s: "Database schema, wireframes and system architecture.",
              },
              {
                n: "03",
                icon: "bi-code-slash",
                t: "Development",
                s: "Frontend, backend, APIs and third-party integrations.",
              },
              {
                n: "04",
                icon: "bi-bug",
                t: "Testing",
                s: "Functional testing, edge cases and end-to-end workflows.",
              },
              {
                n: "05",
                icon: "bi-cloud-arrow-up",
                t: "Deployment",
                s: "Ship to production with databases, CDN and monitoring.",
              },
            ].map((step, i) => (
              <div
                key={step.n}
                className="fsd-process-card spotlight"
                data-reveal
                onMouseMove={handleSpotlight}
              >
                <span className="fsd-process-number">{step.n}</span>

                <span className="fsd-process-icon">
                  <i className={`bi ${step.icon}`} />
                </span>

                <h4>{step.t}</h4>
                <p>{step.s}</p>

                {i < 4 && (
                  <span className="fsd-process-arrow" aria-hidden="true">
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
      <section className="fsd-cta-section">
        <div className="fsd-container">
          <div className="projects-cta-box" data-reveal>
            <span className="cta-glow cta-glow--a" aria-hidden="true" />
            <span className="cta-glow cta-glow--b" aria-hidden="true" />

            <div className="projects-cta-copy">
              <span className="projects-cta-badge">
                <i className="bi bi-stars" /> START BUILDING
              </span>

              <h2>
                Ready to Ship Your
                <span>Full Stack Project?</span>
              </h2>

              <p>
                Get guidance on architecture, database design, deployment
                and viva preparation from the Capware team.
              </p>
            </div>

            <div className="projects-cta-actions">
              <Link to="/register" className="pr-btn pr-btn--light">
                Start Your Project
                <i className="bi bi-arrow-right" />
              </Link>
              <Link to="/internships/full-stack" className="pr-btn pr-btn--outline">
                Full Stack Internship
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

export default FullStackProjects;