import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/FullStackInternship.css";

const FullStackInternship = () => {
    /* ------------------------------------------------------------------ */
    /*  Data                                                               */
    /* ------------------------------------------------------------------ */
    const technologies = [
        "HTML5",
        "CSS3",
        "JavaScript",
        "React.js",
        "Bootstrap",
        "Node.js",
        "Express.js",
        "MongoDB",
        "REST API",
        "Git & GitHub",
    ];

    const plans = [
        {
            name: "Basic",
            price: 1999,
            description: "For students who need guided full-stack project support.",
            features: [
                "Full-stack project guidance",
                "Frontend source code explanation",
                "Database setup assistance",
                "Basic documentation",
                "PPT preparation support",
                "Project explanation"
            ]
        },
        {
            name: "Internship",
            price: 2999,
            popular: true,
            description: "Complete 8-week Full Stack Development Internship.",
            features: [
                "8-week internship training",
                "HTML, CSS, JavaScript & Bootstrap",
                "React.js frontend development",
                "Node.js & Express.js backend",
                "MongoDB database integration",
                "GitHub repository",
                "Complete project development",
                "Deployment guidance",
                "Documentation & PPT support",
                "Viva preparation",
                "Internship completion certificate"
            ]
        },
        {
            name: "Advanced",
            price: 4999,
            description: "Advanced full-stack development with personalized guidance.",
            features: [
                "Everything in Internship",
                "Customized full-stack project",
                "Advanced React.js features",
                "Authentication & authorization",
                "Advanced API integration",
                "Admin dashboard development",
                "Deployment assistance",
                "Personalized documentation",
                "Advanced viva preparation"
            ]
        }
    ];

    const learning = [
        "HTML, CSS & responsive web design",
        "JavaScript fundamentals and ES6+",
        "React.js components and state management",
        "React Router and API integration",
        "Node.js and Express.js",
        "REST API development",
        "MongoDB database integration",
        "Authentication and authorization",
        "Git & GitHub workflow",
        "Deployment and project hosting",
    ];

    const benefits = [
        {
            icon: "bi-code-square",
            title: "Hands-On Development",
            text: "Learn by building practical frontend and backend applications.",
            tag: "Build",
        },
        {
            icon: "bi-kanban",
            title: "Real Project",
            text: "Develop a complete full-stack project from frontend to database.",
            tag: "Project",
        },
        {
            icon: "bi-github",
            title: "GitHub Experience",
            text: "Learn version control and maintain your project using GitHub.",
            tag: "Git",
        },
        {
            icon: "bi-database",
            title: "Backend & Database",
            text: "Understand APIs, server-side development and database operations.",
            tag: "Backend",
        },
        {
            icon: "bi-cloud-arrow-up",
            title: "Deployment Support",
            text: "Learn how to prepare and deploy your application.",
            tag: "Deploy",
        },
        {
            icon: "bi-file-earmark-text",
            title: "Documentation & Viva",
            text: "Get guidance for documentation, presentation and technical viva.",
            tag: "Docs",
        },
    ];

    const roadmap = [
        { week: "Week 1", title: "Web Fundamentals", topics: "HTML, CSS, responsive design and Bootstrap" },
        { week: "Week 2", title: "JavaScript", topics: "ES6+, functions, arrays, objects, DOM and asynchronous JavaScript" },
        { week: "Week 3", title: "React.js", topics: "Components, props, state, hooks, routing and forms" },
        { week: "Week 4", title: "React + APIs", topics: "Axios, REST APIs, authentication and frontend integration" },
        { week: "Week 5", title: "Node & Express", topics: "Server, routes, controllers, middleware and REST APIs" },
        { week: "Week 6", title: "MongoDB", topics: "Models, CRUD operations, relationships and database integration" },
        { week: "Week 7", title: "Project Development", topics: "Build frontend, backend, authentication and core project features" },
        { week: "Week 8", title: "Deployment & Viva", topics: "Testing, deployment, documentation, presentation and viva preparation" },
    ];

    const projectIdeas = [
        "E-Commerce Management System",
        "College Student Portal",
        "Online Appointment System",
        "Event Booking Platform",
        "Restaurant Management System",
        "Job Portal",
        "Inventory Management System",
        "Learning Management System",
    ];

    const faqs = [
        {
            question: "Who can join the Full Stack Internship?",
            answer: "The program is suitable for students and beginners who want practical experience in modern web application development.",
        },
        {
            question: "Do I need prior programming experience?",
            answer: "Basic programming knowledge is helpful, but the internship is structured to gradually cover the required technologies.",
        },
        {
            question: "Will I build a complete project?",
            answer: "Yes. The internship focuses on developing a complete full-stack application using frontend, backend and database technologies.",
        },
        {
            question: "Will I learn Git and GitHub?",
            answer: "Yes. Git and GitHub are included so you can understand source-code management and project collaboration.",
        },
        {
            question: "Is deployment included?",
            answer: "Deployment concepts and project deployment support are included in the internship roadmap.",
        },
        {
            question: "Will I receive a certificate?",
            answer: "A certificate is provided after successful completion of the internship requirements.",
        },
    ];

    const metrics = [
        { value: "8", label: "Weeks Program" },
        { value: "10", label: "Technologies" },
        { value: "1", label: "Full Project" },
        { value: "100%", label: "Hands-On" },
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
    /*  FAQ (React-controlled)                                             */
    /* ------------------------------------------------------------------ */
    const [openFaq, setOpenFaq] = useState(0);

    /* ------------------------------------------------------------------ */
    /*  Render                                                             */
    /* ------------------------------------------------------------------ */
    return (
        <div className="fullstack-page" ref={pageRef}>

            {/* =====================================================
          HERO
      ===================================================== */}
            <section className="fullstack-hero">
                <div className="fullstack-hero-bg" aria-hidden="true">
                    <span className="fs-orb fs-orb--a" />
                    <span className="fs-orb fs-orb--b" />
                    <span className="fs-orb fs-orb--c" />
                    <span className="fs-grid-bg" />
                </div>

                <div className="fs-container">
                    <div className="fullstack-hero-inner">

                        <div className="fullstack-hero-copy">
                            <span className="fullstack-hero-badge" data-reveal>
                                <span className="fullstack-hero-dot" />
                                FULL STACK DEVELOPMENT INTERNSHIP
                            </span>

                            <h1 className="fullstack-hero-title" data-reveal>
                                Learn Full Stack.
                                <span className="fullstack-hero-gradient">
                                    Build Real Applications.
                                </span>
                            </h1>

                            <p className="fullstack-hero-text" data-reveal>
                                An industry-oriented internship designed to teach modern
                                frontend, backend and database technologies through practical
                                project development.
                            </p>

                            <div className="fullstack-hero-actions" data-reveal>
                                <Link to="/register" className="fs-btn fs-btn--primary">
                                    Enroll Now
                                    <i className="bi bi-arrow-right" />
                                </Link>

                                <a href="#curriculum" className="fs-btn fs-btn--ghost">
                                    View Curriculum
                                    <i className="bi bi-list-check" />
                                </a>
                            </div>

                            <div className="fullstack-trust" data-reveal>
                                <span><i className="bi bi-check-circle-fill" /> 8 Weeks</span>
                                <span><i className="bi bi-check-circle-fill" /> Hands-On Project</span>
                                <span><i className="bi bi-check-circle-fill" /> Certificate</span>
                            </div>
                        </div>

                        {/* Code editor visual */}
                        <div className="fullstack-hero-visual" data-reveal>
                            <div className="fullstack-code-card">
                                <div className="fullstack-code-glow" aria-hidden="true" />

                                <div className="fullstack-window-header">
                                    <div className="fullstack-dots">
                                        <span /><span /><span />
                                    </div>
                                    <span className="fullstack-window-tab">
                                        <i className="bi bi-filetype-js" />
                                        server.js
                                    </span>
                                    <span className="fullstack-window-status">
                                        <span className="pulse-dot" />
                                        running
                                    </span>
                                </div>

                                <div className="fullstack-code">
                                    <div className="code-gutter">
                                        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
                                            <span key={n}>{n}</span>
                                        ))}
                                    </div>

                                    <pre className="code-content">
                                        <div>
                                            <span className="code-purple">const</span>{" "}
                                            <span className="code-blue">app</span> ={" "}
                                            <span className="code-green">express</span>();
                                        </div>
                                        <div className="code-blank"> </div>
                                        <div>
                                            <span className="code-purple">app</span>.
                                            <span className="code-yellow">get</span>(
                                            <span className="code-orange">"/api/projects"</span>,
                                        </div>
                                        <div className="code-indent">
                                            <span className="code-purple">(req, res)</span>{" "}
                                            {"=> {"}
                                        </div>
                                        <div className="code-indent-2">
                                            res.<span className="code-yellow">json</span>(
                                            <span className="code-orange">
                                                {"{ success: true }"}
                                            </span>
                                            );
                                        </div>
                                        <div className="code-indent">{"}"}</div>
                                        <div>);</div>
                                    </pre>
                                </div>

                                <div className="fullstack-code-foot">
                                    <span className="fullstack-code-status">
                                        <i className="bi bi-check-circle-fill" />
                                        API Connected
                                    </span>
                                    <span className="fullstack-code-lang">Node · Express</span>
                                </div>
                            </div>

                            <span className="fs-float fs-float--1">
                                <i className="bi bi-braces" /> MERN Stack
                            </span>
                            <span className="fs-float fs-float--2">
                                <i className="bi bi-cloud-check" /> Deploy-ready
                            </span>
                        </div>

                    </div>

                    {/* Metric strip */}
                    <div className="fullstack-metrics" data-reveal>
                        {metrics.map((m) => (
                            <div key={m.label} className="fs-metric">
                                <strong>{m.value}</strong>
                                <span>{m.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* =====================================================
          CURRICULUM
      ===================================================== */}
            <section id="curriculum" className="fullstack-section">
                <div className="fs-container">

                    <div className="fs-section-head fs-section-head--center" data-reveal>
                        <span className="section-label">CURRICULUM</span>
                        <h2 className="section-title">
                            What You Will <em>Learn</em>
                        </h2>
                        <p className="section-description">
                            Learn the complete development flow from creating a responsive
                            interface to connecting a backend API and database.
                        </p>
                    </div>

                    <div className="curriculum-grid">
                        {learning.map((item, index) => (
                            <div
                                key={item}
                                className="curriculum-item spotlight"
                                data-reveal
                                onMouseMove={handleSpotlight}
                            >
                                <span className="curriculum-number">
                                    {String(index + 1).padStart(2, "0")}
                                </span>
                                <span className="curriculum-text">{item}</span>
                                <span className="curriculum-check">
                                    <i className="bi bi-check-lg" />
                                </span>
                            </div>
                        ))}
                    </div>

                </div>
            </section>

            {/* =====================================================
          TECHNOLOGIES
      ===================================================== */}
            <section className="fullstack-section fullstack-section--soft tech-section">
                <div className="fs-container fs-section-head fs-section-head--center" data-reveal>
                    <span className="section-label">TECHNOLOGIES</span>
                    <h2 className="section-title">
                        Modern Full Stack <em>Technology Stack</em>
                    </h2>
                    <p className="section-description">
                        Work with technologies commonly used to build modern web
                        applications.
                    </p>
                </div>

                <div className="marquee" aria-hidden="true">
                    <div className="marquee-track">
                        {[...technologies, ...technologies, ...technologies].map((tech, i) => (
                            <span key={i} className="tech-chip">
                                <i className="bi bi-code-square" />
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="fs-container">
                    <div className="tech-grid" data-reveal>
                        {technologies.map((tech) => (
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
            <section id="roadmap" className="fullstack-section">
                <div className="fs-container">

                    <div className="fs-section-head fs-section-head--center" data-reveal>
                        <span className="section-label">8 WEEK ROADMAP</span>
                        <h2 className="section-title">
                            Your <em>Learning Journey</em>
                        </h2>
                        <p className="section-description">
                            A structured roadmap that gradually takes you from web
                            fundamentals to complete project development.
                        </p>
                    </div>

                    <div className="fs-roadmap-grid">
                        {roadmap.map((item, i) => (
                            <div
                                key={item.week}
                                className="fs-roadmap-card spotlight"
                                data-reveal
                                onMouseMove={handleSpotlight}
                            >
                                <div className="fs-roadmap-head">
                                    <span className="fs-roadmap-week">{item.week}</span>
                                    <span className="fs-roadmap-step">
                                        Step {String(i + 1).padStart(2, "0")}
                                    </span>
                                </div>

                                <span className="fs-roadmap-icon">
                                    <i className="bi bi-arrow-right" />
                                </span>

                                <h4>{item.title}</h4>
                                <p>{item.topics}</p>

                                {i < roadmap.length - 1 && (
                                    <span className="fs-roadmap-line" aria-hidden="true" />
                                )}
                            </div>
                        ))}
                    </div>

                </div>
            </section>

            {/* =====================================================
          PROJECT IDEAS
      ===================================================== */}
            <section id="projects" className="fullstack-section fullstack-section--soft">
                <div className="fs-container">

                    <div className="fs-section-head fs-section-head--center" data-reveal>
                        <span className="section-label">PROJECT DEVELOPMENT</span>
                        <h2 className="section-title">
                            Project Ideas <em>You Can Build</em>
                        </h2>
                        <p className="section-description">
                            Apply your learning by building a practical full-stack
                            application around a real-world use case.
                        </p>
                    </div>

                    <div className="fs-projects-grid">
                        {projectIdeas.map((project) => (
                            <div
                                key={project}
                                className="glow-card project-idea-card spotlight"
                                data-reveal
                                onMouseMove={handleSpotlight}
                            >
                                <div className="glow-card-icon">
                                    <i className="bi bi-laptop" />
                                </div>
                                <h5>{project}</h5>
                                <span className="glow-card-link">
                                    Build this <i className="bi bi-arrow-right" />
                                </span>
                            </div>
                        ))}
                    </div>

                </div>
            </section>

            {/* =====================================================
          BENEFITS
      ===================================================== */}
            <section id="benefits" className="fullstack-section">
                <div className="fs-container">

                    <div className="fs-section-head fs-section-head--center" data-reveal>
                        <span className="section-label">INTERNSHIP BENEFITS</span>
                        <h2 className="section-title">
                            More Than Just <em>Training</em>
                        </h2>
                    </div>

                    <div className="fs-grid fs-grid--3">
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
    PLANS & PRICING
===================================================== */}
            <section id="packages" className="fullstack-section fullstack-section--soft">
                <div className="fs-container">

                    <div className="fs-section-head fs-section-head--center" data-reveal>
                        <span className="section-label">INTERNSHIP PACKAGES</span>

                        <h2 className="section-title">
                            Choose Your <em>Plan</em>
                        </h2>

                        <p className="section-description">
                            Choose the level of training and project support that
                            matches your learning goals.
                        </p>
                    </div>

                    <div className="pricing-grid">
                        {plans.map((plan) => (
                            <div
                                key={plan.name}
                                className={`pricing-card spotlight ${plan.popular ? "is-popular" : ""
                                    }`}
                                data-reveal
                                onMouseMove={handleSpotlight}
                            >
                                {plan.popular && (
                                    <span className="pricing-popular">
                                        <i className="bi bi-star-fill" />
                                        MOST POPULAR
                                    </span>
                                )}

                                <h4>{plan.name}</h4>

                                <p className="pricing-description">
                                    {plan.description}
                                </p>

                                <div className="pricing-amount">
                                    <span className="pricing-currency">₹</span>
                                    {plan.price.toLocaleString("en-IN")}
                                </div>

                                <span className="pricing-note">
                                    One-time program fee
                                </span>

                                <div className="pricing-divider" />

                                <ul className="pricing-features">
                                    {plan.features.map((feature) => (
                                        <li key={feature}>
                                            <span className="pricing-check">
                                                <i className="bi bi-check-lg" />
                                            </span>
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>


                                <Link
                                    to={`/register?internship=${encodeURIComponent(
                                        "Full Stack Development Internship"
                                    )}&package=${encodeURIComponent(plan.name)}`}
                                    className="fs-btn fs-btn--light"
                                >
                                    Choose {plan.name}
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
            <section id="faq" className="fullstack-section fullstack-section--soft">
                <div className="fs-container">

                    <div className="fs-section-head fs-section-head--center" data-reveal>
                        <span className="section-label">FAQ</span>
                        <h2 className="section-title">
                            Frequently Asked <em>Questions</em>
                        </h2>
                        <p className="section-description">
                            Everything you need to know about the Full Stack internship.
                        </p>
                    </div>

                    <div className="faq-list" data-reveal>
                        {faqs.map((faq, index) => {
                            const open = openFaq === index;
                            return (
                                <div
                                    key={faq.question}
                                    className={`faq-item ${open ? "is-open" : ""}`}
                                >
                                    <button
                                        type="button"
                                        className="faq-question"
                                        aria-expanded={open}
                                        onClick={() => setOpenFaq(open ? -1 : index)}
                                    >
                                        <span>{faq.question}</span>
                                        <span className="faq-toggle" aria-hidden="true">
                                            <i className="bi bi-plus-lg" />
                                        </span>
                                    </button>

                                    <div className="faq-answer">
                                        <div className="faq-answer-inner">{faq.answer}</div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                </div>
            </section>

            {/* =====================================================
          CTA
      ===================================================== */}
            <section id="enroll" className="fullstack-section">
                <div className="fs-container">
                    <div className="fullstack-cta" data-reveal>
                        <span className="cta-glow cta-glow--a" aria-hidden="true" />
                        <span className="cta-glow cta-glow--b" aria-hidden="true" />

                        <div className="fullstack-cta-copy">
                            <span className="fullstack-cta-badge">
                                <i className="bi bi-stars" /> FULL STACK DEVELOPMENT INTERNSHIP
                            </span>

                            <h2>
                                Ready to Build Your
                                <span>Full Stack Project?</span>
                            </h2>

                            <p>
                                Start learning modern web development and build a complete
                                application with guided project support.
                            </p>
                        </div>

                        <div className="fullstack-cta-actions">
                            <Link to="/register" className="fs-btn fs-btn--light">
                                Enroll Now
                                <i className="bi bi-arrow-right" />
                            </Link>

                            <Link to="/contact" className="fs-btn fs-btn--outline">
                                Contact Us
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default FullStackInternship;