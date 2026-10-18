import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "../styles/Internship.css";

const Internships = () => {
    /* ------------------------------------------------------------------ */
    /*  Data                                                               */
    /* ------------------------------------------------------------------ */
    const internships = [
        {
            icon: "bi-bar-chart-line",
            title: "AI / ML Internship",
            duration: "8 Weeks",
            level: "Beginner to Advanced",
            description:
                "Learn Python, machine learning, data science and build a real-world AI/ML project with deployment and documentation.",
            technologies: ["Python", "Machine Learning", "Pandas", "Scikit-learn"],
            link: "/internships/ai-ml",
            popular: true,
            tag: "AI / ML",
            seats: "12 seats",
        },
        {
            icon: "bi-code-slash",
            title: "Full Stack Development Internship",
            duration: "8 Weeks",
            level: "Beginner to Advanced",
            description:
                "Learn frontend, backend, databases and APIs while developing a complete full-stack web application.",
            technologies: ["React.js", "Node.js", "Express.js", "MongoDB"],
            link: "/internships/full-stack",
            tag: "Full Stack",
            seats: "18 seats",
        },
        {
            icon: "bi-stars",
            title: "Generative AI Internship",
            duration: "8 Weeks",
            level: "Intermediate",
            description:
                "Explore Generative AI, LLM applications, prompt engineering, RAG and AI-powered application development.",
            technologies: ["Python", "LLM", "RAG", "AI APIs"],
            link: "/internships/genai",
            tag: "GenAI",
            seats: "10 seats",
        },
        {
            icon: "bi-phone",
            title: "Mobile App Development Internship",
            duration: "8 Weeks",
            level: "Beginner to Advanced",
            description:
                "Build mobile applications using React Native and Expo with backend APIs, authentication and database integration.",
            technologies: ["React Native", "Expo", "Node.js", "MongoDB"],
            link: "/internships/mobile",
            tag: "Mobile",
            seats: "15 seats",
        },
    ];

    const benefits = [
        {
            icon: "bi-person-workspace",
            title: "Industry-Oriented Training",
            text: "Learn technologies and workflows used in real software development projects.",
            tag: "Training",
        },
        {
            icon: "bi-kanban",
            title: "Hands-On Project",
            text: "Work on a practical project instead of only learning theory.",
            tag: "Project",
        },
        {
            icon: "bi-github",
            title: "GitHub Experience",
            text: "Learn source-code management and maintain your project using Git and GitHub.",
            tag: "Git",
        },
        {
            icon: "bi-cloud-arrow-up",
            title: "Deployment",
            text: "Understand how to prepare and deploy your project for real-world use.",
            tag: "Deploy",
        },
        {
            icon: "bi-file-earmark-text",
            title: "Documentation",
            text: "Get guidance for project documentation, presentation and technical explanation.",
            tag: "Docs",
        },
        {
            icon: "bi-award",
            title: "Certificate",
            text: "Receive an internship certificate after successful completion of the program.",
            tag: "Reward",
        },
    ];

    const steps = [
        {
            number: "01",
            title: "Choose Internship",
            text: "Select the technology area that matches your career goals.",
            icon: "bi-compass",
        },
        {
            number: "02",
            title: "Learn & Practice",
            text: "Learn concepts through structured training and practical exercises.",
            icon: "bi-book",
        },
        {
            number: "03",
            title: "Build Project",
            text: "Apply your knowledge to develop a complete industry-oriented project.",
            icon: "bi-code-slash",
        },
        {
            number: "04",
            title: "Deploy & Present",
            text: "Deploy, document and prepare your project for presentation and viva.",
            icon: "bi-cloud-arrow-up",
        },
        {
            number: "05",
            title: "Get Certified",
            text: "Complete the internship requirements and receive your certificate.",
            icon: "bi-award",
        },
    ];

    const metrics = [
        { value: "500+", label: "Students Trained" },
        { value: "8", label: "Weeks Duration" },
        { value: "1:1", label: "Mentorship" },
        { value: "100%", label: "Project-Based" },
    ];

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
    /*  Render                                                             */
    /* ------------------------------------------------------------------ */
    return (
        <div className="internships-page" ref={pageRef}>

            {/* =====================================================
          HERO
      ===================================================== */}
            <section className="internships-hero">
                <div className="internships-hero-bg" aria-hidden="true">
                    <span className="int-orb int-orb--a" />
                    <span className="int-orb int-orb--b" />
                    <span className="int-orb int-orb--c" />
                    <span className="int-grid-bg" />
                </div>

                <div className="int-container">
                    <div className="internships-hero-inner">

                        <div className="internships-hero-copy">
                            <span className="internships-hero-badge" data-reveal>
                                <span className="internships-hero-dot" />
                                INDUSTRY-ORIENTED INTERNSHIPS
                            </span>

                            <h1 className="internships-hero-title" data-reveal>
                                Learn. Build.
                                <span className="internships-hero-gradient">
                                    Get Industry Ready.
                                </span>
                            </h1>

                            <p className="internships-hero-text" data-reveal>
                                Practical internship programs designed to help students learn
                                modern technologies, build real projects, understand
                                development workflows and prepare for careers in technology.
                            </p>

                            <div className="internships-hero-actions" data-reveal>
                                <Link to="/internships/ai-ml" className="int-btn int-btn--primary">
                                    Explore Internships
                                    <i className="bi bi-arrow-right" />
                                </Link>

                                <Link to="/register" className="int-btn int-btn--ghost">
                                    Register Now
                                    <i className="bi bi-mortarboard" />
                                </Link>
                            </div>

                            <div className="internships-trust" data-reveal>
                                <span><i className="bi bi-check-circle-fill" /> Hands-On Projects</span>
                                <span><i className="bi bi-check-circle-fill" /> Mentorship</span>
                                <span><i className="bi bi-check-circle-fill" /> Certificate</span>
                            </div>
                        </div>

                        {/* Roadmap card */}
                        <div className="internships-hero-visual" data-reveal>
                            <div className="internship-hero-card">
                                <div className="internship-card-glow" aria-hidden="true" />

                                <div className="internship-card-top">
                                    <div className="internship-card-icon">
                                        <i className="bi bi-code-square" />
                                        <span className="internship-card-icon-ring" />
                                    </div>

                                    <div className="internship-card-title">
                                        <small>CAPWARE SYSTEMS</small>
                                        <strong>Industry Internship</strong>
                                    </div>

                                    <span className="internship-card-status">
                                        <span className="pulse-dot" />
                                        Enrolling
                                    </span>
                                </div>

                                <div className="internship-roadmap-preview">
                                    <span className="roadmap-line" aria-hidden="true" />

                                    {[
                                        { n: "01", t: "Learn", s: "Technology & Concepts" },
                                        { n: "02", t: "Build", s: "Real Project" },
                                        { n: "03", t: "Deploy", s: "Working Application" },
                                        { n: "04", t: "Certify", s: "Complete Internship" },
                                    ].map((step) => (
                                        <div key={step.n} className="roadmap-item">
                                            <span className="roadmap-number">{step.n}</span>
                                            <div className="roadmap-text">
                                                <strong>{step.t}</strong>
                                                <small>{step.s}</small>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="internship-card-foot">
                                    <span className="internship-card-foot-item">
                                        <i className="bi bi-clock-history" />
                                        8 Weeks
                                    </span>
                                    <span className="internship-card-foot-item">
                                        <i className="bi bi-people" />
                                        1:1 Mentorship
                                    </span>
                                </div>
                            </div>

                            <span className="int-float int-float--1">
                                <i className="bi bi-github" /> Git-based workflow
                            </span>
                            <span className="int-float int-float--2">
                                <i className="bi bi-award" /> Certificate included
                            </span>
                        </div>

                    </div>

                    {/* Metric strip */}
                    <div className="internships-metrics" data-reveal>
                        {metrics.map((m) => (
                            <div key={m.label} className="int-metric">
                                <strong>{m.value}</strong>
                                <span>{m.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* =====================================================
          PROGRAMS
      ===================================================== */}
            <section className="internships-section">
                <div className="int-container">

                    <div className="int-section-head int-section-head--center" data-reveal>
                        <span className="section-label">OUR PROGRAMS</span>
                        <h2 className="section-title">
                            Choose Your <em>Internship</em>
                        </h2>
                        <p className="section-description">
                            Select a technology area and learn through practical
                            development, project work and mentorship.
                        </p>
                    </div>

                    <div className="int-grid int-grid--2">

                        {internships.map((program) => (
                            <Link
                                to={program.link}
                                key={program.title}
                                className={`glow-card program-card spotlight internship-card-clickable ${program.popular ? "is-popular" : ""
                                    }`}
                                data-reveal
                                onMouseMove={handleSpotlight}
                            >
                                {program.popular && (
                                    <span className="program-popular">
                                        <i className="bi bi-star-fill" />
                                        POPULAR
                                    </span>
                                )}

                                <span className="service-tag">{program.tag}</span>

                                <div className="glow-card-icon">
                                    <i className={`bi ${program.icon}`} />
                                </div>

                                <h3>{program.title}</h3>

                                <div className="internship-meta">
                                    <span className="meta-pill">
                                        <i className="bi bi-clock" />
                                        {program.duration}
                                    </span>

                                    <span className="meta-pill">
                                        <i className="bi bi-bar-chart" />
                                        {program.level}
                                    </span>

                                    <span className="meta-pill meta-pill--accent">
                                        <i className="bi bi-people" />
                                        {program.seats}
                                    </span>
                                </div>

                                <p>{program.description}</p>

                                <div className="internship-tech-list">
                                    {program.technologies.map((tech) => (
                                        <span key={tech} className="tech-mini">
                                            {tech}
                                        </span>
                                    ))}
                                </div>

                                <span className="glow-card-link">
                                    View Internship
                                    <i className="bi bi-arrow-right" />
                                </span>

                                <span className="card-corner card-corner--tl" />
                                <span className="card-corner card-corner--br" />
                            </Link>
                        ))}

                    </div>

                </div>
            </section>

            {/* =====================================================
          BENEFITS
      ===================================================== */}
            <section className="internships-section internships-section--soft">
                <div className="int-container">

                    <div className="int-section-head int-section-head--center" data-reveal>
                        <span className="section-label">WHY CAPWARE</span>
                        <h2 className="section-title">
                            More Than Just a <em>Certificate</em>
                        </h2>
                        <p className="section-description">
                            Our focus is practical learning and project development so
                            students can confidently explain what they have built.
                        </p>
                    </div>

                    <div className="int-grid int-grid--3">
                        {benefits.map((benefit) => (
                            <div
                                key={benefit.title}
                                className="glow-card benefit-card spotlight"
                                data-reveal
                                onMouseMove={handleSpotlight}
                            >
                                <span className="service-tag">{benefit.tag}</span>

                                <div className="glow-card-icon">
                                    <i className={`bi ${benefit.icon}`} />
                                </div>

                                <h4>{benefit.title}</h4>
                                <p>{benefit.text}</p>
                            </div>
                        ))}
                    </div>

                </div>
            </section>

            {/* =====================================================
          HOW IT WORKS
      ===================================================== */}
            <section className="internships-section">
                <div className="int-container">

                    <div className="int-section-head int-section-head--center" data-reveal>
                        <span className="section-label">HOW IT WORKS</span>
                        <h2 className="section-title">
                            From Learning to <em>Certification</em>
                        </h2>
                        <p className="section-description">
                            Five clear milestones that take you from picking a track
                            to walking away with a real project and certificate.
                        </p>
                    </div>

                    <div className="process-timeline-h">
                        {steps.map((step, i) => (
                            <div
                                key={step.number}
                                className="process-step-h spotlight"
                                data-reveal
                                onMouseMove={handleSpotlight}
                            >
                                <span className="process-step-number">{step.number}</span>

                                <span className="process-step-icon">
                                    <i className={`bi ${step.icon}`} />
                                </span>

                                <h4>{step.title}</h4>
                                <p>{step.text}</p>

                                {i < steps.length - 1 && (
                                    <span className="process-step-arrow" aria-hidden="true">
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
            <section className="internships-section">
                <div className="int-container">
                    <div className="internships-cta" data-reveal>
                        <span className="cta-glow cta-glow--a" aria-hidden="true" />
                        <span className="cta-glow cta-glow--b" aria-hidden="true" />

                        <div className="internships-cta-copy">
                            <span className="internships-cta-badge">
                                <i className="bi bi-stars" /> START YOUR LEARNING JOURNEY
                            </span>

                            <h2>
                                Ready to Build Your First
                                <span>Industry Project?</span>
                            </h2>

                            <p>
                                Choose an internship program and start learning through
                                practical development and guided project work.
                            </p>
                        </div>

                        <div className="internships-cta-actions">
                            <Link to="/internships/ai-ml" className="int-btn int-btn--light">
                                Explore AI/ML
                                <i className="bi bi-arrow-right" />
                            </Link>

                            <Link to="/register" className="int-btn int-btn--outline">
                                Register Now
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default Internships;