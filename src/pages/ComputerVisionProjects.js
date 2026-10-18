import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import computerVisionProjects from "../data/computerVisionProjects";
import "../styles/Projects.css";

function ComputerVisionProjects() {
  const [search, setSearch] = useState("");
  const [difficulty, setDifficulty] = useState("All");

  /* ------------------------------------------------------------------ */
  /*  Filtering                                                          */
  /* ------------------------------------------------------------------ */
  const filteredProjects = useMemo(() => {
    return computerVisionProjects.filter((project) => {
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
    <div className="cv-projects-page" ref={pageRef}>

      {/* =====================================================
          HERO
      ===================================================== */}
      <section className="cv-hero">
        <div className="cv-hero-bg" aria-hidden="true">
          <span className="cv-orb cv-orb--a" />
          <span className="cv-orb cv-orb--b" />
          <span className="cv-orb cv-orb--c" />
          <span className="cv-grid-bg" />
        </div>

        <div className="cv-container">
          <div className="cv-hero-inner">

            <div className="cv-hero-copy">
              <span className="cv-badge" data-reveal>
                <span className="cv-badge-dot" />
                COMPUTER VISION PROJECTS
              </span>

              <h1 className="cv-hero-title" data-reveal>
                Turn Images Into
                <span className="cv-hero-gradient">
                  Intelligent Decisions.
                </span>
              </h1>

              <p className="cv-hero-text" data-reveal>
                Build practical Computer Vision applications using OpenCV,
                YOLO, deep learning, image processing and real-time video
                analytics.
              </p>

              <div className="cv-hero-trust" data-reveal>
                <span><i className="bi bi-check-circle-fill" /> Image Processing</span>
                <span><i className="bi bi-check-circle-fill" /> Object Detection</span>
                <span><i className="bi bi-check-circle-fill" /> Face Recognition</span>
                <span><i className="bi bi-check-circle-fill" /> Real-Time Vision</span>
              </div>

              <div className="cv-hero-actions" data-reveal>
                <a href="#vision-catalog" className="cv-btn cv-btn--primary">
                  Explore Projects
                  <i className="bi bi-arrow-down" />
                </a>

                <Link to="/register" className="cv-btn cv-btn--ghost">
                  Get Project Guidance
                  <i className="bi bi-compass" />
                </Link>
              </div>
            </div>

            {/* Vision card */}
            <div className="cv-hero-visual" data-reveal>
              <div className="cv-vision-card">
                <div className="cv-vision-glow" aria-hidden="true" />

                <div className="cv-vision-top">
                  <span className="cv-vision-title">
                    <i className="bi bi-camera" />
                    Computer Vision AI
                  </span>
                  <span className="cv-vision-status">
                    <span className="pulse-dot" />
                    Live
                  </span>
                </div>

                {/* Detection preview frame */}
                <div className="cv-preview">
                  <div className="cv-preview-grid" aria-hidden="true" />
                  <div className="cv-bbox cv-bbox--a">
                    <span className="cv-bbox-label">person · 98%</span>
                  </div>
                  <div className="cv-bbox cv-bbox--b">
                    <span className="cv-bbox-label">car · 94%</span>
                  </div>
                  <div className="cv-scan-line" aria-hidden="true" />
                  <div className="cv-preview-icon">
                    <i className="bi bi-eye" />
                  </div>
                </div>

                <div className="cv-vision-featured">
                  <div className="cv-vision-icon">
                    <i className="bi bi-eye" />
                  </div>
                  <div className="cv-vision-text">
                    <small>Featured Technology</small>
                    <h4>Computer Vision</h4>
                  </div>
                </div>

                <div className="cv-vision-grid">
                  <div className="cv-vision-mini">
                    <i className="bi bi-camera" />
                    <strong>Images</strong>
                  </div>
                  <div className="cv-vision-mini">
                    <i className="bi bi-bounding-box" />
                    <strong>Objects</strong>
                  </div>
                  <div className="cv-vision-mini">
                    <i className="bi bi-person-bounding-box" />
                    <strong>Faces</strong>
                  </div>
                  <div className="cv-vision-mini">
                    <i className="bi bi-play-btn" />
                    <strong>Video</strong>
                  </div>
                </div>

                <div className="cv-vision-progress">
                  <div className="cv-vision-progress-head">
                    <span>Vision Application Development</span>
                    <strong>90%</strong>
                  </div>
                  <div className="cv-vision-progress-bar">
                    <span />
                  </div>
                </div>
              </div>

              <span className="cv-float cv-float--1">
                <i className="bi bi-bounding-box" /> YOLO detection
              </span>
              <span className="cv-float cv-float--2">
                <i className="bi bi-award" /> Viva ready
              </span>
            </div>

          </div>
        </div>
      </section>

      {/* =====================================================
          CATALOG
      ===================================================== */}
      <section id="vision-catalog" className="cv-catalog">
        <div className="cv-container">

          <div className="cv-section-head cv-section-head--center" data-reveal>
            <span className="section-label">COMPUTER VISION CATALOG</span>
            <h2 className="section-title">
              Choose Your <em>Computer Vision Project</em>
            </h2>
            <p className="section-description">
              Explore projects covering face recognition, object detection,
              OCR, image classification, video analytics and more.
            </p>
          </div>

          {/* Filters */}
          <div className="cv-filter-box" data-reveal>
            <div className="cv-filter-grid">

              <div className="cv-filter-field cv-filter-field--search">
                <label className="cv-filter-label">Search Projects</label>
                <div className="cv-search">
                  <i className="bi bi-search" />
                  <input
                    type="text"
                    className="cv-search-input"
                    placeholder="Search projects, technologies or domains..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  {search && (
                    <button
                      type="button"
                      className="cv-search-clear"
                      aria-label="Clear search"
                      onClick={() => setSearch("")}
                    >
                      <i className="bi bi-x-lg" />
                    </button>
                  )}
                </div>
              </div>

              <div className="cv-filter-field">
                <label className="cv-filter-label">Difficulty</label>
                <div className="cv-select">
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

              <div className="cv-filter-field">
                <label className="cv-filter-label">&nbsp;</label>
                <button
                  type="button"
                  className="cv-btn cv-btn--ghost cv-btn--clear"
                  onClick={clearFilters}
                >
                  <i className="bi bi-arrow-counterclockwise" />
                  Clear
                </button>
              </div>

            </div>
          </div>

          {/* Result bar */}
          <div className="cv-result-bar" data-reveal>
            <span>
              Showing <strong>{filteredProjects.length}</strong> Computer
              Vision project{filteredProjects.length !== 1 ? "s" : ""}
            </span>

            {hasActiveFilters && (
              <button type="button" onClick={clearFilters}>
                Clear filters <i className="bi bi-x-lg" />
              </button>
            )}
          </div>

          {/* Cards */}
          {filteredProjects.length > 0 ? (
            <div className="cv-projects-grid">
              {filteredProjects.map((project) => (
                <div
                  key={project.id}
                  className="glow-card cv-project-card spotlight"
                  data-reveal
                  onMouseMove={handleSpotlight}
                >
                  <div className="cv-project-head">
                    <span className="cv-project-category">Computer Vision</span>
                    <span
                      className={`cv-difficulty cv-difficulty--${project.difficulty
                        .toLowerCase()
                        .replace(" ", "-")}`}
                    >
                      {project.difficulty}
                    </span>
                  </div>

                  <div className="glow-card-icon cv-project-icon">
                    <i className="bi bi-camera" />
                  </div>

                  <span className="cv-project-domain">
                    {project.domain}
                  </span>

                  <h3 title={project.title}>{project.title}</h3>
                  <p className="cv-project-desc">
                    {project.shortDescription}
                  </p>

                  <div className="cv-tech-tags">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <span key={tech} className="cv-tech-tag">
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="cv-tech-tag cv-tech-tag--more">
                        +{project.technologies.length - 4}
                      </span>
                    )}
                  </div>

                  <div className="cv-project-meta">
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
                    className="cv-btn cv-btn--primary cv-project-btn"
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
            <div className="cv-empty" data-reveal>
              <div className="cv-empty-icon">
                <i className="bi bi-search" />
              </div>
              <h3>No Computer Vision projects found</h3>
              <p>Try changing your search or difficulty filter.</p>
              <button
                type="button"
                className="cv-btn cv-btn--primary"
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
          TECHNOLOGIES
      ===================================================== */}
      <section className="cv-tech-section">
        <div className="cv-container">

          <div className="cv-section-head cv-section-head--center" data-reveal>
            <span className="section-label">TECHNOLOGIES</span>
            <h2 className="section-title">
              Technologies You Can <em>Work With</em>
            </h2>
            <p className="section-description">
              Learn the core tools used to develop modern Computer Vision
              applications.
            </p>
          </div>

          <div className="cv-tech-grid">
            {[
              {
                n: "01",
                icon: "bi-filetype-py",
                t: "Python",
                s: "Build computer vision and machine learning applications using Python.",
              },
              {
                n: "02",
                icon: "bi-camera",
                t: "OpenCV",
                s: "Process images, videos, frames and camera input using OpenCV.",
              },
              {
                n: "03",
                icon: "bi-bounding-box",
                t: "YOLO",
                s: "Learn object detection and real-time vision applications.",
              },
              {
                n: "04",
                icon: "bi-cpu",
                t: "Deep Learning",
                s: "Build and evaluate image classification and detection models.",
              },
            ].map((step, i) => (
              <div
                key={step.n}
                className="cv-tech-card spotlight"
                data-reveal
                onMouseMove={handleSpotlight}
              >
                <span className="cv-tech-number">{step.n}</span>

                <span className="cv-tech-icon">
                  <i className={`bi ${step.icon}`} />
                </span>

                <h4>{step.t}</h4>
                <p>{step.s}</p>

                {i < 3 && (
                  <span className="cv-tech-arrow" aria-hidden="true">
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
      <section className="cv-cta-section">
        <div className="cv-container">
          <div className="cv-cta-box" data-reveal>
            <span className="cv-cta-glow cv-cta-glow--a" aria-hidden="true" />
            <span className="cv-cta-glow cv-cta-glow--b" aria-hidden="true" />

            <div className="cv-cta-copy">
              <span className="cv-cta-badge">
                <i className="bi bi-stars" /> START BUILDING
              </span>

              <h2>
                Have a Computer Vision
                <span>Idea?</span>
              </h2>

              <p>
                Get technical guidance, project development support,
                documentation and viva preparation from Capware Systems.
              </p>
            </div>

            <div className="cv-cta-actions">
              <Link to="/register" className="cv-btn cv-btn--light">
                Start Your Project
                <i className="bi bi-arrow-right" />
              </Link>
              <Link to="/internships" className="cv-btn cv-btn--outline">
                Explore Internships
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

export default ComputerVisionProjects;