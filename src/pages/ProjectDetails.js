import React, { useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";

import aiMlProjects from "../data/projects";
import genaiProjects from "../data/genaiProjects";
import fsdProjects from "../data/fsdprojects";
import cvProjects from "../data/computerVisionProjects";
import dataScienceProjects from "../data/dataScienceProjects";

import "../styles/ProjectDetails.css";

/* ------------------------------------------------------------------ */
/*  Aggregate every project catalogue into one lookup array            */
/* ------------------------------------------------------------------ */
const ALL_PROJECTS = [
    ...aiMlProjects,
    ...genaiProjects,
    ...fsdProjects,
    ...cvProjects,
    ...dataScienceProjects,
];

/* ------------------------------------------------------------------ */
/*  Category → back-link + label                                       */
/*  (used for the "Back to…" link and the "Explore More…" CTA)         */
/* ------------------------------------------------------------------ */
const CATEGORY_ROUTES = {
    "AI / ML": { to: "/projects/ai-ml", label: "AI / ML Projects" },
    "GenAI": { to: "/projects/genai", label: "Generative AI Projects" },
    "Full Stack": { to: "/projects/full-stack", label: "Full Stack Projects" },
    "Computer Vision": { to: "/projects/computer-vision", label: "Computer Vision Projects" },
    "Data Science": { to: "/projects/data-science", label: "Data Science Projects" },
};

const FALLBACK_ROUTE = { to: "/projects", label: "All Projects" };

const ProjectDetails = () => {
    const { id } = useParams();

    const project = ALL_PROJECTS.find((item) => item.id === id);

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
    }, [project]);

    const handleSpotlight = (e) => {
        const el = e.currentTarget;
        const rect = el.getBoundingClientRect();
        el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
        el.style.setProperty("--my", `${e.clientY - rect.top}px`);
    };

    /* ------------------------------------------------------------------ */
    /*  Not found                                                          */
    /* ------------------------------------------------------------------ */
    if (!project) {
        return (
            <div className="pd-page pd-page--empty">
                <div className="pd-container">
                    <div className="pd-notfound">
                        <div className="pd-notfound-icon">
                            <i className="bi bi-search" />
                        </div>
                        <h2>Project Not Found</h2>
                        <p>
                            The project you are looking for does not exist or may have
                            been moved.
                        </p>
                        <Link to="/projects" className="pd-btn pd-btn--primary">
                            Browse All Projects
                            <i className="bi bi-arrow-right" />
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    /* ------------------------------------------------------------------ */
    /*  Resolve back-link + "explore more" destination                     */
    /* ------------------------------------------------------------------ */
    const back = CATEGORY_ROUTES[project.category] || FALLBACK_ROUTE;

    /* ------------------------------------------------------------------ */
    /*  Price — handle both "₹3999" (string) and 3999 (number)             */
    /* ------------------------------------------------------------------ */
    const priceDisplay = String(project.price).replace(/^₹\s?/, "");

    /* ------------------------------------------------------------------ */
    /*  Render                                                             */
    /* ------------------------------------------------------------------ */
    return (
        <div className="pd-page" ref={pageRef}>

            {/* =====================================================
          HERO
      ===================================================== */}
            <section className="pd-hero">
                <div className="pd-hero-bg" aria-hidden="true">
                    <span className="pd-orb pd-orb--a" />
                    <span className="pd-orb pd-orb--b" />
                    <span className="pd-orb pd-orb--c" />
                    <span className="pd-grid-bg" />
                </div>

                <div className="pd-container">
                    <Link to={back.to} className="pd-back" data-reveal>
                        <i className="bi bi-arrow-left" />
                        Back to {back.label}
                    </Link>

                    <div className="pd-hero-inner">
                        <div className="pd-hero-copy" data-reveal>
                            <div className="pd-hero-tags">
                                <span className="pd-tag pd-tag--cat">{project.category}</span>
                                <span
                                    className={`pd-tag pd-tag--diff pd-tag--${project.difficulty
                                        .toLowerCase()
                                        .replace(/\s+/g, "-")}`}
                                >
                                    {project.difficulty}
                                </span>
                            </div>

                            <h1 className="pd-hero-title">{project.title}</h1>

                            <p className="pd-hero-text">{project.description}</p>

                            <div className="pd-meta-row">
                                <span className="pd-meta">
                                    <i className="bi bi-diagram-3" />
                                    {project.domain}
                                </span>
                                <span className="pd-meta">
                                    <i className="bi bi-bar-chart" />
                                    {project.difficulty}
                                </span>
                                <span className="pd-meta">
                                    <i className="bi bi-clock" />
                                    {project.duration}
                                </span>
                            </div>
                        </div>

                        {/* Enroll card */}
                        <aside className="pd-enroll-wrap" data-reveal>
                            <div className="pd-enroll-card">
                                <div className="pd-enroll-glow" aria-hidden="true" />

                                <span className="pd-enroll-label">Project Package</span>

                                <div className="pd-enroll-price">
                                    <span className="pd-enroll-currency">₹</span>
                                    {priceDisplay}
                                </div>
                                <span className="pd-enroll-note">Starting price</span>

                                <div className="pd-enroll-divider" />

                                <ul className="pd-enroll-list">
                                    {[
                                        "Project source code",
                                        "Dataset / seed data",
                                        "Project guidance",
                                        "Documentation support",
                                        "Viva preparation",
                                    ].map((item) => (
                                        <li key={item}>
                                            <span className="pd-enroll-check">
                                                <i className="bi bi-check-lg" />
                                            </span>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>

                                <Link
                                    to={`/register?type=project&projectId=${encodeURIComponent(project.id)}`}
                                    className="pd-btn pd-btn--primary pd-enroll-btn"
                                >
                                    Enroll / Get Project
                                    <i className="bi bi-arrow-right" />
                                </Link>

                                <span className="pd-enroll-foot">
                                    <i className="bi bi-shield-check" />
                                    Talk to our team before enrolling
                                </span>
                            </div>
                        </aside>
                    </div>
                </div>
            </section>

            {/* =====================================================
          OVERVIEW
      ===================================================== */}
            <section className="pd-section">
                <div className="pd-container">
                    <div className="pd-overview-grid">

                        <div className="pd-overview-copy" data-reveal>
                            <span className="section-label">PROJECT OVERVIEW</span>
                            <h2 className="section-title">
                                About <em>This Project</em>
                            </h2>

                            <p className="section-description">{project.description}</p>

                            <p className="section-description">
                                This project follows a complete software delivery
                                lifecycle — requirement analysis, system and database
                                design, development, testing and deployment — with
                                documentation and viva support throughout.
                            </p>
                        </div>

                        <div className="pd-info-card" data-reveal>
                            <h3 className="pd-info-title">Project Information</h3>

                            <div className="pd-info-rows">
                                {[
                                    { k: "Category", v: project.category },
                                    { k: "Domain", v: project.domain },
                                    { k: "Difficulty", v: project.difficulty },
                                    { k: "Duration", v: project.duration },
                                ].map((row) => (
                                    <div key={row.k} className="pd-info-row">
                                        <span>{row.k}</span>
                                        <strong>{row.v}</strong>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* =====================================================
          TECHNOLOGIES
      ===================================================== */}
            <section className="pd-section pd-section--soft tech-section">
                <div className="pd-container pd-section-head pd-section-head--center" data-reveal>
                    <span className="section-label">TECHNOLOGY STACK</span>
                    <h2 className="section-title">
                        Technologies <em>Used</em>
                    </h2>
                    <p className="section-description">
                        The exact tools, frameworks and libraries this project uses.
                    </p>
                </div>

                <div className="marquee" aria-hidden="true">
                    <div className="marquee-track">
                        {[...project.technologies, ...project.technologies, ...project.technologies].map((tech, i) => (
                            <span key={i} className="tech-chip">
                                <i className="bi bi-code-square" />
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="pd-container">
                    <div className="tech-grid" data-reveal>
                        {project.technologies.map((tech) => (
                            <span key={tech} className="tech-chip tech-chip--static">
                                <i className="bi bi-code-square" />
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>
            </section>

            {/* =====================================================
          SKILLS
      ===================================================== */}
            <section className="pd-section">
                <div className="pd-container">
                    <div className="pd-skills-grid">

                        <div className="pd-skills-copy" data-reveal>
                            <span className="section-label">SKILLS YOU WILL LEARN</span>
                            <h2 className="section-title">
                                Build Practical <em>Industry Skills</em>
                            </h2>
                            <p className="section-description">
                                The project is structured to help students understand both
                                the underlying concepts and their practical implementation.
                            </p>
                        </div>

                        <div className="pd-skills-list" data-reveal>
                            {project.skills.map((skill) => (
                                <div key={skill} className="pd-skill-item">
                                    <span className="pd-skill-check">
                                        <i className="bi bi-check-lg" />
                                    </span>
                                    <span>{skill}</span>
                                </div>
                            ))}
                        </div>

                    </div>
                </div>
            </section>

            {/* =====================================================
          FEATURES
      ===================================================== */}
            <section className="pd-section pd-section--soft">
                <div className="pd-container">

                    <div className="pd-section-head pd-section-head--center" data-reveal>
                        <span className="section-label">PROJECT FEATURES</span>
                        <h2 className="section-title">
                            What You Can <em>Build</em>
                        </h2>
                    </div>

                    <div className="pd-features-grid">
                        {project.features.map((feature) => (
                            <div
                                key={feature}
                                className="pd-feature-card spotlight"
                                data-reveal
                                onMouseMove={handleSpotlight}
                            >
                                <div className="pd-feature-icon">
                                    <i className="bi bi-lightning-charge" />
                                </div>
                                <h4>{feature}</h4>
                            </div>
                        ))}
                    </div>

                </div>
            </section>

            {/* =====================================================
          SUITABLE FOR
      ===================================================== */}
            <section className="pd-section">
                <div className="pd-container">

                    <div className="pd-section-head pd-section-head--center" data-reveal>
                        <span className="section-label">ELIGIBILITY</span>
                        <h2 className="section-title">
                            Suitable <em>For</em>
                        </h2>
                        <p className="section-description">
                            This project can be developed by students from:
                        </p>
                    </div>

                    <div className="pd-courses" data-reveal>
                        {project.suitableFor.map((course) => (
                            <span key={course} className="pd-course-badge">
                                <i className="bi bi-mortarboard" />
                                {course}
                            </span>
                        ))}
                    </div>

                </div>
            </section>

            {/* =====================================================
          FINAL CTA
      ===================================================== */}
            <section className="pd-cta-section">
                <div className="pd-container">
                    <div className="pd-cta-box" data-reveal>
                        <span className="pd-cta-glow pd-cta-glow--a" aria-hidden="true" />
                        <span className="pd-cta-glow pd-cta-glow--b" aria-hidden="true" />

                        <div className="pd-cta-copy">
                            <span className="pd-cta-badge">
                                <i className="bi bi-stars" /> READY TO BUILD?
                            </span>

                            <h2>
                                Start Your
                                <span>{project.title} Project.</span>
                            </h2>

                            <p>
                                Get project guidance, development support, documentation
                                assistance and viva preparation from the Capware team.
                            </p>
                        </div>

                        <div className="pd-cta-actions">
                            <Link
                                to={`/register?project=${project.id}`}
                                className="pd-btn pd-btn--light"
                            >
                                Get Started
                                <i className="bi bi-arrow-right" />
                            </Link>
                            <Link to={back.to} className="pd-btn pd-btn--outline">
                                Explore More {back.label}
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default ProjectDetails;