import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import dataScienceProjects from "../data/dataScienceProjects";
import "../styles/Projects.css";

function DataScienceProjects() {
  const [search, setSearch] = useState("");
  const [difficulty, setDifficulty] = useState("All");

  /* ------------------------------------------------------------------ */
  /*  Filtering                                                          */
  /* ------------------------------------------------------------------ */
  const filteredProjects = useMemo(() => {
    return dataScienceProjects.filter((project) => {
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
    <div className="ds-projects-page" ref={pageRef}>

      {/* =====================================================
          HERO
      ===================================================== */}
      <section className="ds-hero">
        <div className="ds-hero-bg" aria-hidden="true">
          <span className="ds-orb ds-orb--a" />
          <span className="ds-orb ds-orb--b" />
          <span className="ds-orb ds-orb--c" />
          <span className="ds-grid-bg" />
        </div>

        <div className="ds-container">
          <div className="ds-hero-inner">

            <div className="ds-hero-copy">
              <span className="ds-badge" data-reveal>
                <span className="ds-badge-dot" />
                DATA SCIENCE PROJECTS
              </span>

              <h1 className="ds-hero-title" data-reveal>
                Turn Data Into
                <span className="ds-hero-gradient">
                  Intelligent Insights.
                </span>
              </h1>

              <p className="ds-hero-text" data-reveal>
                Build practical Data Science and Analytics projects using
                Python, Pandas, NumPy, Scikit-learn, visualization and
                machine learning.
              </p>

              <div className="ds-hero-trust" data-reveal>
                <span><i className="bi bi-check-circle-fill" /> Data Analysis</span>
                <span><i className="bi bi-check-circle-fill" /> Machine Learning</span>
                <span><i className="bi bi-check-circle-fill" /> Visualization</span>
                <span><i className="bi bi-check-circle-fill" /> Business Analytics</span>
              </div>

              <div className="ds-hero-actions" data-reveal>
                <a href="#data-science-catalog" className="ds-btn ds-btn--primary">
                  Explore Projects
                  <i className="bi bi-arrow-down" />
                </a>

                <Link to="/register" className="ds-btn ds-btn--ghost">
                  Get Project Guidance
                  <i className="bi bi-compass" />
                </Link>
              </div>
            </div>

            {/* Analytics dashboard card */}
            <div className="ds-hero-visual" data-reveal>
              <div className="ds-dash-card">
                <div className="ds-dash-glow" aria-hidden="true" />

                <div className="ds-dash-top">
                  <span className="ds-dash-title">
                    <i className="bi bi-bar-chart" />
                    Data Science Analytics
                  </span>
                  <span className="ds-dash-status">
                    <span className="pulse-dot" />
                    Live
                  </span>
                </div>

                {/* KPI row */}
                <div className="ds-kpi-row">
                  <div className="ds-kpi">
                    <small>Accuracy</small>
                    <strong>94.2%</strong>
                    <span className="ds-kpi-trend">+3.1%</span>
                  </div>
                  <div className="ds-kpi">
                    <small>Records</small>
                    <strong>48k</strong>
                    <span className="ds-kpi-trend">+1.2k</span>
                  </div>
                </div>

                {/* Chart */}
                <div className="ds-chart">
                  <div className="ds-chart-head">
                    <span>Model Performance</span>
                    <small>Last 7 runs</small>
                  </div>
                  <div className="ds-chart-bars">
                    {[42, 58, 65, 52, 78, 88, 94].map((h, i) => (
                      <span key={i} style={{ "--h": `${h}%`, "--i": i }}>
                        <i />
                      </span>
                    ))}
                  </div>
                </div>

                {/* Featured + mini grid */}
                <div className="ds-dash-featured">
                  <div className="ds-dash-icon">
                    <i className="bi bi-graph-up-arrow" />
                  </div>
                  <div className="ds-dash-text">
                    <small>Featured Technology</small>
                    <h4>Data Science</h4>
                  </div>
                </div>

                <div className="ds-dash-grid">
                  <div className="ds-dash-mini">
                    <i className="bi bi-filetype-py" />
                    <strong>Python</strong>
                  </div>
                  <div className="ds-dash-mini">
                    <i className="bi bi-table" />
                    <strong>Pandas</strong>
                  </div>
                  <div className="ds-dash-mini">
                    <i className="bi bi-graph-up" />
                    <strong>Charts</strong>
                  </div>
                  <div className="ds-dash-mini">
                    <i className="bi bi-cpu" />
                    <strong>ML</strong>
                  </div>
                </div>

                <div className="ds-dash-progress">
                  <div className="ds-dash-progress-head">
                    <span>Data Analytics Development</span>
                    <strong>90%</strong>
                  </div>
                  <div className="ds-dash-progress-bar">
                    <span />
                  </div>
                </div>
              </div>

              <span className="ds-float ds-float--1">
                <i className="bi bi-cpu" /> Model trained
              </span>
              <span className="ds-float ds-float--2">
                <i className="bi bi-award" /> Viva ready
              </span>
            </div>

          </div>
        </div>
      </section>

      {/* =====================================================
          CATALOG
      ===================================================== */}
      <section id="data-science-catalog" className="ds-catalog">
        <div className="ds-container">

          <div className="ds-section-head ds-section-head--center" data-reveal>
            <span className="section-label">DATA SCIENCE PROJECT CATALOG</span>
            <h2 className="section-title">
              Choose Your <em>Data Science Project</em>
            </h2>
            <p className="section-description">
              Work with real datasets, perform analysis, build predictive
              models and present insights through interactive dashboards.
            </p>
          </div>

          {/* Filters */}
          <div className="ds-filter-box" data-reveal>
            <div className="ds-filter-grid">

              <div className="ds-filter-field ds-filter-field--search">
                <label className="ds-filter-label">Search Projects</label>
                <div className="ds-search">
                  <i className="bi bi-search" />
                  <input
                    type="text"
                    className="ds-search-input"
                    placeholder="Search projects, technologies or domains..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  {search && (
                    <button
                      type="button"
                      className="ds-search-clear"
                      aria-label="Clear search"
                      onClick={() => setSearch("")}
                    >
                      <i className="bi bi-x-lg" />
                    </button>
                  )}
                </div>
              </div>

              <div className="ds-filter-field">
                <label className="ds-filter-label">Difficulty</label>
                <div className="ds-select">
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

              <div className="ds-filter-field">
                <label className="ds-filter-label">&nbsp;</label>
                <button
                  type="button"
                  className="ds-btn ds-btn--ghost ds-btn--clear"
                  onClick={clearFilters}
                >
                  <i className="bi bi-arrow-counterclockwise" />
                  Clear
                </button>
              </div>

            </div>
          </div>

          {/* Result bar */}
          <div className="ds-result-bar" data-reveal>
            <span>
              Showing <strong>{filteredProjects.length}</strong> Data Science
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
            <div className="ds-projects-grid">
              {filteredProjects.map((project) => (
                <div
                  key={project.id}
                  className="glow-card ds-project-card spotlight"
                  data-reveal
                  onMouseMove={handleSpotlight}
                >
                  <div className="ds-project-head">
                    <span className="ds-project-category">Data Science</span>
                    <span
                      className={`ds-difficulty ds-difficulty--${project.difficulty
                        .toLowerCase()
                        .replace(" ", "-")}`}
                    >
                      {project.difficulty}
                    </span>
                  </div>

                  <div className="glow-card-icon ds-project-icon">
                    <i className="bi bi-bar-chart" />
                  </div>

                  <span className="ds-project-domain">
                    {project.domain}
                  </span>

                  <h3 title={project.title}>{project.title}</h3>
                  <p className="ds-project-desc">
                    {project.shortDescription}
                  </p>

                  <div className="ds-tech-tags">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <span key={tech} className="ds-tech-tag">
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="ds-tech-tag ds-tech-tag--more">
                        +{project.technologies.length - 4}
                      </span>
                    )}
                  </div>

                  <div className="ds-project-meta">
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
                    to={`/register?project=${project.id}`}
                    className="ds-btn ds-btn--primary ds-project-btn"
                  >
                    Get Project
                    <i className="bi bi-arrow-right" />
                  </Link>

                  <span className="card-corner card-corner--tl" />
                  <span className="card-corner card-corner--br" />
                </div>
              ))}
            </div>
          ) : (
            <div className="ds-empty" data-reveal>
              <div className="ds-empty-icon">
                <i className="bi bi-search" />
              </div>
              <h3>No Data Science projects found</h3>
              <p>Try changing your search or difficulty filter.</p>
              <button
                type="button"
                className="ds-btn ds-btn--primary"
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
      <section className="ds-process-section">
        <div className="ds-container">

          <div className="ds-section-head ds-section-head--center" data-reveal>
            <span className="section-label">WHAT YOU LEARN</span>
            <h2 className="section-title">
              From Raw Data to <em>Business Insights</em>
            </h2>
            <p className="section-description">
              Follow a practical data science workflow from data preparation
              to visualization and prediction.
            </p>
          </div>

          <div className="ds-process-grid">
            {[
              {
                n: "01",
                icon: "bi-database",
                t: "Collect Data",
                s: "Understand datasets and prepare data for analysis and modeling.",
              },
              {
                n: "02",
                icon: "bi-funnel",
                t: "Clean & Analyze",
                s: "Perform preprocessing, EDA and feature engineering on the dataset.",
              },
              {
                n: "03",
                icon: "bi-cpu",
                t: "Build Models",
                s: "Train machine learning models and evaluate their performance.",
              },
              {
                n: "04",
                icon: "bi-bar-chart",
                t: "Visualize Insights",
                s: "Present predictions, trends and business insights through charts and dashboards.",
              },
            ].map((step, i) => (
              <div
                key={step.n}
                className="ds-process-card spotlight"
                data-reveal
                onMouseMove={handleSpotlight}
              >
                <span className="ds-process-number">{step.n}</span>

                <span className="ds-process-icon">
                  <i className={`bi ${step.icon}`} />
                </span>

                <h4>{step.t}</h4>
                <p>{step.s}</p>

                {i < 3 && (
                  <span className="ds-process-arrow" aria-hidden="true">
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
      <section className="ds-cta-section">
        <div className="ds-container">
          <div className="ds-cta-box" data-reveal>
            <span className="ds-cta-glow ds-cta-glow--a" aria-hidden="true" />
            <span className="ds-cta-glow ds-cta-glow--b" aria-hidden="true" />

            <div className="ds-cta-copy">
              <span className="ds-cta-badge">
                <i className="bi bi-stars" /> START BUILDING
              </span>

              <h2>
                Have a Data Science
                <span>Idea?</span>
              </h2>

              <p>
                Get guidance with dataset selection, preprocessing, machine
                learning, dashboards, documentation and viva preparation.
              </p>
            </div>

            <div className="ds-cta-actions">
              <Link to="/register" className="ds-btn ds-btn--light">
                Start Your Project
                <i className="bi bi-arrow-right" />
              </Link>
              <Link to="/internships/ai-ml" className="ds-btn ds-btn--outline">
                AI / ML Internship
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

export default DataScienceProjects;