import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import genaiProjects from "../data/genaiProjects";
import "../styles/GenAIProjects.css";

function GenAIProjects() {
  const [search, setSearch] = useState("");
  const [difficulty, setDifficulty] = useState("All");

  /* ------------------------------------------------------------------ */
  /*  Filtering                                                          */
  /* ------------------------------------------------------------------ */
  const filteredProjects = useMemo(() => {
    return genaiProjects.filter((project) => {
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
    <div className="genai-projects-page" ref={pageRef}>

      {/* =====================================================
          HERO
      ===================================================== */}
      <section className="genai-projects-hero">
        <div className="genai-projects-hero-bg" aria-hidden="true">
          <span className="gp-orb gp-orb--a" />
          <span className="gp-orb gp-orb--b" />
          <span className="gp-orb gp-orb--c" />
          <span className="gp-grid-bg" />
        </div>

        <div className="gp-container">
          <div className="genai-projects-hero-inner">

            <div className="genai-projects-hero-copy">
              <span className="genai-projects-badge" data-reveal>
                <span className="genai-projects-dot" />
                GENERATIVE AI PROJECTS
              </span>

              <h1 className="genai-projects-hero-title" data-reveal>
                Build the Future With
                <span className="genai-projects-hero-gradient">
                  Generative AI.
                </span>
              </h1>

              <p className="genai-projects-hero-text" data-reveal>
                Explore practical GenAI projects using LLMs, RAG, prompt
                engineering, AI APIs and modern web technologies.
              </p>

              <div className="genai-projects-hero-trust" data-reveal>
                <span><i className="bi bi-check-circle-fill" /> LLM Applications</span>
                <span><i className="bi bi-check-circle-fill" /> RAG Systems</span>
                <span><i className="bi bi-check-circle-fill" /> AI APIs</span>
                <span><i className="bi bi-check-circle-fill" /> Project Guidance</span>
              </div>

              <div className="genai-projects-hero-actions" data-reveal>
                <a href="#genai-catalog" className="pr-btn pr-btn--primary">
                  Explore GenAI Projects
                  <i className="bi bi-arrow-down" />
                </a>

                <Link to="/register" className="pr-btn pr-btn--ghost">
                  Get Project Guidance
                  <i className="bi bi-compass" />
                </Link>
              </div>
            </div>

            {/* Portfolio card */}
            <div className="genai-projects-hero-visual" data-reveal>
              <div className="projects-hero-card">
                <div className="ph-card-glow" aria-hidden="true" />

                <div className="ph-card-top">
                  <span className="ph-card-title">
                    <i className="bi bi-stars" />
                    GenAI Project
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
                    <small>Featured Technology</small>
                    <h4>Generative AI</h4>
                  </div>
                </div>

                <div className="ph-mini-grid">
                  <div className="ph-mini">
                    <i className="bi bi-chat-dots" />
                    <strong>LLM</strong>
                  </div>
                  <div className="ph-mini">
                    <i className="bi bi-database" />
                    <strong>RAG</strong>
                  </div>
                  <div className="ph-mini">
                    <i className="bi bi-lightning" />
                    <strong>AI API</strong>
                  </div>
                  <div className="ph-mini">
                    <i className="bi bi-code-slash" />
                    <strong>Apps</strong>
                  </div>
                </div>

                <div className="ph-progress">
                  <div className="ph-progress-head">
                    <span>AI Application Development</span>
                    <strong>90%</strong>
                  </div>
                  <div className="ph-progress-bar">
                    <span />
                  </div>
                </div>
              </div>

              <span className="gp-float gp-float--1">
                <i className="bi bi-cpu" /> LLM APIs
              </span>
              <span className="gp-float gp-float--2">
                <i className="bi bi-award" /> Viva ready
              </span>
            </div>

          </div>
        </div>
      </section>

      {/* =====================================================
          CATALOG
      ===================================================== */}
      <section id="genai-catalog" className="genai-projects-catalog">
        <div className="gp-container">

          <div className="gp-section-head gp-section-head--center" data-reveal>
            <span className="section-label">GENAI PROJECT CATALOG</span>
            <h2 className="section-title">
              Choose Your <em>Generative AI Project</em>
            </h2>
            <p className="section-description">
              Build practical AI applications and learn how modern Generative
              AI systems are designed and integrated.
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
                    placeholder="Search GenAI projects, technologies or domains..."
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
              Showing <strong>{filteredProjects.length}</strong> GenAI{" "}
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
                    <span className="pr-project-category">GenAI</span>
                    <span
                      className={`pr-difficulty pr-difficulty--${project.difficulty
                        .toLowerCase()
                        .replace(" ", "-")}`}
                    >
                      {project.difficulty}
                    </span>
                  </div>

                  <div className="glow-card-icon">
                    <i className="bi bi-stars" />
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
                    to={`/register?project=${project.id}`}
                    className="pr-btn pr-btn--primary pr-project-btn"
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
            <div className="pr-empty" data-reveal>
              <div className="pr-empty-icon">
                <i className="bi bi-search" />
              </div>
              <h3>No GenAI projects found</h3>
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
      <section className="genai-projects-process">
        <div className="gp-container">

          <div className="gp-section-head gp-section-head--center" data-reveal>
            <span className="section-label">WHAT YOU LEARN</span>
            <h2 className="section-title">
              Build More Than Just <em>a Chatbot</em>
            </h2>
            <p className="section-description">
              Understand the building blocks behind practical Generative AI
              applications.
            </p>
          </div>

          <div className="gp-process-grid">
            {[
              {
                n: "01",
                icon: "bi-stars",
                t: "Prompt Engineering",
                s: "Learn how to design effective prompts and control AI responses.",
              },
              {
                n: "02",
                icon: "bi-database",
                t: "RAG",
                s: "Connect AI systems with external knowledge and documents.",
              },
              {
                n: "03",
                icon: "bi-plug",
                t: "AI APIs",
                s: "Integrate LLM APIs into real-world web applications.",
              },
              {
                n: "04",
                icon: "bi-code-square",
                t: "Build & Deploy",
                s: "Turn AI concepts into usable applications with frontend and backend systems.",
              },
            ].map((step, i) => (
              <div
                key={step.n}
                className="gp-process-card spotlight"
                data-reveal
                onMouseMove={handleSpotlight}
              >
                <span className="gp-process-number">{step.n}</span>

                <span className="gp-process-icon">
                  <i className={`bi ${step.icon}`} />
                </span>

                <h4>{step.t}</h4>
                <p>{step.s}</p>

                {i < 3 && (
                  <span className="gp-process-arrow" aria-hidden="true">
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
      <section className="genai-projects-cta-section">
        <div className="gp-container">
          <div className="projects-cta-box" data-reveal>
            <span className="cta-glow cta-glow--a" aria-hidden="true" />
            <span className="cta-glow cta-glow--b" aria-hidden="true" />

            <div className="projects-cta-copy">
              <span className="projects-cta-badge">
                <i className="bi bi-stars" /> START BUILDING
              </span>

              <h2>
                Have a GenAI Idea?
                <span>Let's Build It.</span>
              </h2>

              <p>
                Get project guidance, development support, documentation and
                viva preparation from the Capware team.
              </p>
            </div>

            <div className="projects-cta-actions">
              <Link to="/register" className="pr-btn pr-btn--light">
                Start Your Project
                <i className="bi bi-arrow-right" />
              </Link>
              <Link to="/internships/genai" className="pr-btn pr-btn--outline">
                GenAI Internship
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

export default GenAIProjects;