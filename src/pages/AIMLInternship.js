import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import internships from "../data/internships";
import "../styles/AIMLInternship.css";

const AIMLInternship = () => {
    const internship = internships.aiML;

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
    }, []);

    const handleSpotlight = (e) => {
        const el = e.currentTarget;
        const rect = el.getBoundingClientRect();
        el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
        el.style.setProperty("--my", `${e.clientY - rect.top}px`);
    };

    /* ------------------------------------------------------------------ */
    /*  FAQ (accordion managed in React so no Bootstrap JS needed)         */
    /* ------------------------------------------------------------------ */
    const [openFaq, setOpenFaq] = useState(0);

    /* ------------------------------------------------------------------ */
    /*  Render                                                             */
    /* ------------------------------------------------------------------ */
    return (
        <div className="internship-detail-page" ref={pageRef}>

            {/* =====================================================
          HERO
      ===================================================== */}
            <section className="internship-detail-hero">
                <div className="internship-detail-bg" aria-hidden="true">
                    <span className="id-orb id-orb--a" />
                    <span className="id-orb id-orb--b" />
                    <span className="id-orb id-orb--c" />
                    <span className="id-grid-bg" />
                </div>

                <div className="id-container">
                    <div className="internship-detail-hero-inner">

                        <div className="internship-detail-hero-copy">
                            <span className="internship-detail-badge" data-reveal>
                                <span className="internship-detail-dot" />
                                AI / ML INDUSTRY INTERNSHIP
                            </span>

                            <h1 className="internship-detail-title" data-reveal>
                                {internship.tagline}
                            </h1>

                            <p className="internship-detail-text" data-reveal>
                                {internship.description}
                            </p>

                            <div className="internship-detail-actions" data-reveal>
                                <a href="#packages" className="id-btn id-btn--primary">
                                    Join Internship
                                    <i className="bi bi-arrow-right" />
                                </a>

                                <a href="#curriculum" className="id-btn id-btn--ghost">
                                    View Curriculum
                                    <i className="bi bi-list-check" />
                                </a>
                            </div>

                            <div className="internship-detail-meta-row" data-reveal>
                                <span className="internship-meta">
                                    <i className="bi bi-calendar3" />
                                    {internship.duration}
                                </span>
                                <span className="internship-meta">
                                    <i className="bi bi-laptop" />
                                    Practical Training
                                </span>
                                <span className="internship-meta">
                                    <i className="bi bi-award" />
                                    Certificate
                                </span>
                            </div>
                        </div>

                        {/* Hero card */}
                        <div className="internship-detail-hero-visual" data-reveal>
                            <div className="hero-detail-card">
                                <div className="hero-detail-glow" aria-hidden="true" />

                                <div className="hero-detail-top">
                                    <div className="hero-card-icon">
                                        <i className="bi bi-cpu" />
                                        <span className="hero-card-icon-ring" />
                                    </div>
                                    <div className="hero-detail-title">
                                        <small>CAPWARE LEARNING</small>
                                        <strong>AI / ML Track</strong>
                                    </div>
                                    <span className="hero-detail-status">
                                        <span className="pulse-dot" />
                                        Enrolling
                                    </span>
                                </div>

                                <div className="hero-detail-body">
                                    <h4>Build Your AI/ML Project</h4>
                                    <p>
                                        Learn the complete workflow from dataset preparation
                                        to model deployment.
                                    </p>

                                    <div className="hero-detail-stats">
                                        <div className="hero-stat">
                                            <strong>8</strong>
                                            <span>Weeks</span>
                                        </div>
                                        <div className="hero-stat">
                                            <strong>10+</strong>
                                            <span>Technologies</span>
                                        </div>
                                        <div className="hero-stat">
                                            <strong>1</strong>
                                            <span>Major Project</span>
                                        </div>
                                        <div className="hero-stat">
                                            <strong>1</strong>
                                            <span>Certificate</span>
                                        </div>
                                    </div>

                                    <div className="hero-detail-progress">
                                        <div className="hero-detail-progress-head">
                                            <span>Curriculum coverage</span>
                                            <strong>100%</strong>
                                        </div>
                                        <div className="hero-detail-progress-bar">
                                            <span />
                                        </div>
                                    </div>
                                </div>

                                <div className="hero-detail-foot">
                                    <span><i className="bi bi-github" /> GitHub source</span>
                                    <span><i className="bi bi-cloud-check" /> Deployed on cloud</span>
                                </div>
                            </div>

                            <span className="id-float id-float--1">
                                <i className="bi bi-cpu" /> Model + deployment
                            </span>
                            <span className="id-float id-float--2">
                                <i className="bi bi-award" /> Verified certificate
                            </span>
                        </div>

                    </div>
                </div>
            </section>

            {/* =====================================================
          CURRICULUM
      ===================================================== */}
            <section id="curriculum" className="id-section">
                <div className="id-container">

                    <div className="id-section-head id-section-head--center" data-reveal>
                        <span className="section-label">CURRICULUM</span>
                        <h2 className="section-title">
                            What You Will <em>Learn</em>
                        </h2>
                        <p className="section-description">
                            Learn the complete AI/ML development workflow through
                            practical training and project implementation.
                        </p>
                    </div>

                    <div className="id-grid id-grid--3">
                        {internship.learning.map((item, index) => (
                            <div
                                key={item}
                                className="glow-card learning-card spotlight"
                                data-reveal
                                onMouseMove={handleSpotlight}
                            >
                                <span className="learning-number">
                                    {String(index + 1).padStart(2, "0")}
                                </span>
                                <div className="glow-card-icon">
                                    <i className="bi bi-check-lg" />
                                </div>
                                <h5>{item}</h5>
                            </div>
                        ))}
                    </div>

                </div>
            </section>

            {/* =====================================================
          TECHNOLOGIES
      ===================================================== */}
            <section id="technologies" className="id-section id-section--soft tech-section">
                <div className="id-container id-section-head id-section-head--center" data-reveal>
                    <span className="section-label">TECHNOLOGY STACK</span>
                    <h2 className="section-title">
                        Technologies You Will <em>Work With</em>
                    </h2>
                    <p className="section-description">
                        The exact tools and frameworks used throughout the program.
                    </p>
                </div>

                <div className="marquee" aria-hidden="true">
                    <div className="marquee-track">
                        {[...internship.technologies, ...internship.technologies, ...internship.technologies].map((tech, i) => (
                            <span key={i} className="tech-chip">
                                <i className="bi bi-code-square" />
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="id-container">
                    <div className="tech-grid" data-reveal>
                        {internship.technologies.map((tech) => (
                            <span key={tech} className="tech-chip tech-chip--static">
                                <i className="bi bi-code-square" />
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>
            </section>

            {/* =====================================================
          ROADMAP
      ===================================================== */}
            <section id="roadmap" className="id-section">
                <div className="id-container">

                    <div className="id-section-head id-section-head--center" data-reveal>
                        <span className="section-label">INTERNSHIP ROADMAP</span>
                        <h2 className="section-title">
                            Your 8-Week <em>Learning Journey</em>
                        </h2>
                        <p className="section-description">
                            Structured week-by-week milestones that take you from
                            fundamentals to a deployed project.
                        </p>
                    </div>

                    <div className="roadmap-grid">
                        {internship.roadmap.map((item, i) => (
                            <div
                                key={item.week}
                                className="roadmap-card spotlight"
                                data-reveal
                                onMouseMove={handleSpotlight}
                            >
                                <div className="roadmap-head">
                                    <span className="roadmap-week">{item.week}</span>
                                    <span className="roadmap-step">
                                        Step {String(i + 1).padStart(2, "0")}
                                    </span>
                                </div>

                                <div className="roadmap-icon">
                                    <i className="bi bi-arrow-right" />
                                </div>

                                <h5>{item.title}</h5>
                                <p>{item.description}</p>

                                {i < internship.roadmap.length - 1 && (
                                    <span className="roadmap-line" aria-hidden="true" />
                                )}
                            </div>
                        ))}
                    </div>

                </div>
            </section>

            {/* =====================================================
          PROJECT DOMAINS
      ===================================================== */}
            <section id="projects" className="id-section id-section--soft">
                <div className="id-container">
                    <div className="projects-grid">

                        <div className="projects-copy" data-reveal>
                            <span className="section-label">PROJECT DEVELOPMENT</span>
                            <h2 className="section-title">
                                Choose a Project That <em>Matches Your Interest</em>
                            </h2>
                            <p className="section-description">
                                Students can select a project from multiple AI/ML
                                domains and develop it with guided mentorship.
                            </p>

                            <Link to="/projects/ai-ml" className="id-btn id-btn--primary">
                                Explore AI/ML Projects
                                <i className="bi bi-arrow-right" />
                            </Link>
                        </div>

                        <div className="projects-list" data-reveal>
                            {internship.projectDomains.map((project) => (
                                <div key={project} className="project-domain">
                                    <span className="project-domain-icon">
                                        <i className="bi bi-check2-circle" />
                                    </span>
                                    <span>{project}</span>
                                </div>
                            ))}
                        </div>

                    </div>
                </div>
            </section>

            {/* =====================================================
          BENEFITS
      ===================================================== */}
            <section id="benefits" className="id-section">
                <div className="id-container">
                    <div
                        className="id-section-head id-section-head--center"
                        data-reveal
                    >
                        <span className="section-label">INTERNSHIP BENEFITS</span>
                        <h2 className="section-title">
                            Everything You Need to <em>Complete Your Project</em>
                        </h2>
                    </div>

                    <div className="id-grid id-grid--3">
                        {internship.benefits.map((benefit) => (
                            <div
                                key={benefit}
                                className="glow-card benefit-card spotlight"
                                data-reveal
                                onMouseMove={handleSpotlight}
                            >
                                <div className="glow-card-icon">
                                    <i className="bi bi-check-lg" />
                                </div>
                                <h5>{benefit}</h5>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* =====================================================
    PACKAGES
===================================================== */}
            <section id="packages" className="id-section id-section--soft">
                <div className="id-container">
                    <div
                        className="id-section-head id-section-head--center"
                        data-reveal
                    >
                        <span className="section-label">INTERNSHIP PACKAGES</span>
                        <h2 className="section-title">
                            Choose Your <em>Plan</em>
                        </h2>
                        <p className="section-description">
                            Select the level of support that matches your project needs.
                        </p>
                    </div>

                    <div className="pricing-grid">
                        {internship.packages.map((pkg) => (
                            <div
                                key={pkg.name}
                                className={`pricing-card spotlight ${pkg.popular ? "is-popular" : ""
                                    }`}
                                data-reveal
                                onMouseMove={handleSpotlight}
                            >
                                {pkg.popular && (
                                    <span className="pricing-popular">
                                        <i className="bi bi-star-fill" />
                                        MOST POPULAR
                                    </span>
                                )}

                                <h4>{pkg.name}</h4>
                                <p className="pricing-description">{pkg.description}</p>

                                <div className="pricing-amount">
                                    <span className="pricing-currency">₹</span>
                                    {pkg.price.toLocaleString("en-IN")}
                                </div>

                                <span className="pricing-note">One-time program fee</span>

                                <div className="pricing-divider" />

                                <ul className="pricing-features">
                                    {pkg.features.map((feature) => (
                                        <li key={feature}>
                                            <span className="pricing-check">
                                                <i className="bi bi-check-lg" />
                                            </span>
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                <Link
                                    to={`/register?type=internship&package=${encodeURIComponent(
                                        pkg.name
                                    )}&internship=${encodeURIComponent("AI/ML Internship")}`}
                                    className={`id-btn ${pkg.popular ? "id-btn--primary" : "id-btn--ghost"
                                        } pricing-btn`}
                                >
                                    Choose {pkg.name}
                                    <i className="bi bi-arrow-right" />
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* =====================================================
          FAQ
      ===================================================== */}
            <section id="faq" className="id-section">
                <div className="id-container">

                    <div className="id-section-head id-section-head--center" data-reveal>
                        <span className="section-label">FAQ</span>
                        <h2 className="section-title">
                            Frequently Asked <em>Questions</em>
                        </h2>
                        <p className="section-description">
                            Everything you need to know about the AI/ML internship.
                        </p>
                    </div>

                    <div className="faq-list" data-reveal>
                        {internship.faq &&
                            internship.faq.map((item, index) => {
                                const open = openFaq === index;
                                return (
                                    <div
                                        key={item.question}
                                        className={`faq-item ${open ? "is-open" : ""}`}
                                    >
                                        <button
                                            type="button"
                                            className="faq-question"
                                            aria-expanded={open}
                                            onClick={() => setOpenFaq(open ? -1 : index)}
                                        >
                                            <span>{item.question}</span>
                                            <span className="faq-toggle" aria-hidden="true">
                                                <i className="bi bi-plus-lg" />
                                            </span>
                                        </button>

                                        <div className="faq-answer">
                                            <div className="faq-answer-inner">
                                                {item.answer}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                    </div>

                </div>
            </section>

            {/* =====================================================
          FINAL CTA
      ===================================================== */}
            <section id="enroll" className="id-section">
                <div className="id-container">
                    <div className="internship-cta" data-reveal>
                        <span className="cta-glow cta-glow--a" aria-hidden="true" />
                        <span className="cta-glow cta-glow--b" aria-hidden="true" />

                        <div className="internship-cta-copy">
                            <span className="internship-cta-badge">
                                <i className="bi bi-stars" /> LIMITED INTERNSHIP BATCHES
                            </span>

                            <h2>
                                Start Your AI/ML
                                <span>Journey Today.</span>
                            </h2>

                            <p>
                                Learn AI &amp; Machine Learning, build a real project,
                                deploy it and prepare confidently for your final-year
                                presentation.
                            </p>
                        </div>

                        <div className="internship-cta-actions">
                            <Link to="/register" className="id-btn id-btn--light">
                                <i className="bi bi-rocket-takeoff" />
                                Join Internship
                            </Link>
                            <a href="#packages" className="id-btn id-btn--outline">
                                <i className="bi bi-currency-rupee" />
                                View Packages
                            </a>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default AIMLInternship;