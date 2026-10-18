import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "../styles/WebsiteDevelopment.css";

const WebsiteDevelopment = () => {
    /* ------------------------------------------------------------------ */
    /*  Data                                                               */
    /* ------------------------------------------------------------------ */
    const technologies = [
        "React.js",
        "Node.js",
        "Express.js",
        "MongoDB",
        "MySQL",
        "Bootstrap",
        "JavaScript",
        "REST API",
    ];

    const services = [
        {
            icon: "bi-window",
            title: "Business Websites",
            description:
                "Professional and responsive websites designed to build your online presence and attract customers.",
            tag: "Business",
        },
        {
            icon: "bi-shop",
            title: "E-Commerce Websites",
            description:
                "Complete online stores with product management, shopping cart, orders and payment integration.",
            tag: "E-Commerce",
        },
        {
            icon: "bi-mortarboard",
            title: "College & Education Portals",
            description:
                "Student portals, college websites, admission systems, notices, results and academic management.",
            tag: "Education",
        },
        {
            icon: "bi-speedometer2",
            title: "Admin Dashboards",
            description:
                "Powerful dashboards to manage users, products, bookings, registrations, reports and business data.",
            tag: "Dashboard",
        },
        {
            icon: "bi-calendar-check",
            title: "Booking Systems",
            description:
                "Online appointment, event, service and reservation systems with customer and admin management.",
            tag: "Booking",
        },
        {
            icon: "bi-cloud-arrow-up",
            title: "Deployment & Hosting",
            description:
                "Deployment support for your website, backend APIs, database and domain configuration.",
            tag: "DevOps",
        },
    ];

    const features = [
        "Responsive design",
        "Modern UI/UX",
        "Mobile-friendly layout",
        "Admin panel",
        "Database integration",
        "REST API integration",
        "Authentication & authorization",
        "Deployment support",
        "SEO-friendly structure",
        "GitHub source code",
    ];

    const process = [
        {
            number: "01",
            title: "Requirement",
            text: "Understand your business, project or organization requirements.",
            icon: "bi-clipboard-check",
        },
        {
            number: "02",
            title: "UI & Planning",
            text: "Plan the pages, features, database and overall system structure.",
            icon: "bi-pencil-square",
        },
        {
            number: "03",
            title: "Development",
            text: "Develop the frontend, backend, database and required integrations.",
            icon: "bi-code-slash",
        },
        {
            number: "04",
            title: "Testing",
            text: "Test the application across devices and fix functional issues.",
            icon: "bi-bug",
        },
        {
            number: "05",
            title: "Deployment",
            text: "Deploy the website and configure hosting, domain and required services.",
            icon: "bi-cloud-arrow-up",
        },
    ];

    const metrics = [
        { value: "60+", label: "Websites Delivered" },
        { value: "98%", label: "Client Satisfaction" },
        { value: "<2s", label: "Avg. Load Time" },
        { value: "100", label: "Lighthouse Score" },
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
        <div className="website-page" ref={pageRef}>

            {/* =====================================================
          HERO
      ===================================================== */}
            <section className="website-hero">
                <div className="website-hero-bg" aria-hidden="true">
                    <span className="web-orb web-orb--a" />
                    <span className="web-orb web-orb--b" />
                    <span className="web-orb web-orb--c" />
                    <span className="web-grid-bg" />
                </div>

                <div className="web-container">
                    <div className="website-hero-inner">

                        <div className="website-hero-copy">
                            <span className="website-hero-badge" data-reveal>
                                <span className="website-hero-dot" />
                                WEBSITE DEVELOPMENT
                            </span>

                            <h1 className="website-hero-title" data-reveal>
                                Professional Websites
                                <span className="website-hero-gradient">
                                    Built for Your Business
                                </span>
                            </h1>

                            <p className="website-hero-text" data-reveal>
                                We build modern, responsive and scalable websites for
                                businesses, colleges, startups, organizations and students.
                            </p>

                            <div className="website-hero-actions" data-reveal>
                                <Link
                                    to="/register?type=service&serviceId=website-development"
                                    className="web-btn web-btn--primary"
                                >
                                    Start Your Project
                                    <i className="bi bi-arrow-right" />
                                </Link>

                                <Link to="/contact" className="web-btn web-btn--ghost">
                                    Talk to Us
                                    <i className="bi bi-chat-dots" />
                                </Link>
                            </div>

                            <div className="website-trust" data-reveal>
                                <span><i className="bi bi-check-circle-fill" /> Responsive</span>
                                <span><i className="bi bi-check-circle-fill" /> Modern Technology</span>
                                <span><i className="bi bi-check-circle-fill" /> Deployment Support</span>
                            </div>
                        </div>

                        {/* Code editor visual */}
                        <div className="website-hero-visual" data-reveal>
                            <div className="code-editor">
                                <div className="code-editor-head">
                                    <div className="window-dots">
                                        <span /><span /><span />
                                    </div>
                                    <span className="code-editor-tab">
                                        <i className="bi bi-filetype-jsx" />
                                        website.jsx
                                    </span>
                                    <span className="code-editor-status">
                                        <span className="pulse-dot" />
                                        live
                                    </span>
                                </div>

                                <div className="code-editor-body">
                                    <div className="code-gutter">
                                        {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                                            <span key={n}>{n}</span>
                                        ))}
                                    </div>

                                    <pre className="code-content">
                                        <div className="code-line">
                                            <span className="code-purple">const</span>{" "}
                                            <span className="code-blue">website</span> = {"{"}
                                        </div>
                                        <div className="code-line">
                                            {"  "}<span className="code-green">responsive</span>: <span className="code-orange">true</span>,
                                        </div>
                                        <div className="code-line">
                                            {"  "}<span className="code-green">modern</span>: <span className="code-orange">true</span>,
                                        </div>
                                        <div className="code-line">
                                            {"  "}<span className="code-green">scalable</span>: <span className="code-orange">true</span>,
                                        </div>
                                        <div className="code-line">
                                            {"  "}<span className="code-green">secure</span>: <span className="code-orange">true</span>
                                        </div>
                                        <div className="code-line">{"}"};</div>
                                        <div className="code-line code-line--blank"> </div>
                                        <div className="code-line">
                                            <span className="code-comment">
                                                {"// ready to build"}
                                            </span>
                                        </div>
                                    </pre>
                                </div>

                                <div className="code-editor-foot">
                                    <span className="code-editor-status-pill">
                                        <i className="bi bi-check-circle-fill" />
                                        Ready to Build
                                    </span>
                                    <span className="code-editor-lang">JSX · React</span>
                                </div>
                            </div>

                            <span className="web-float web-float--1">
                                <i className="bi bi-shield-check" /> Secure by default
                            </span>
                            <span className="web-float web-float--2">
                                <i className="bi bi-lightning-charge-fill" /> Fast delivery
                            </span>
                        </div>

                    </div>

                    {/* Metric strip */}
                    <div className="website-metrics" data-reveal>
                        {metrics.map((m) => (
                            <div key={m.label} className="web-metric">
                                <strong>{m.value}</strong>
                                <span>{m.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* =====================================================
          SERVICES
      ===================================================== */}
            <section className="website-section">
                <div className="web-container">

                    <div className="web-section-head web-section-head--center" data-reveal>
                        <span className="section-label">WHAT WE BUILD</span>
                        <h2 className="section-title">
                            Website Solutions for <em>Different Needs</em>
                        </h2>
                        <p className="section-description">
                            From simple business websites to complete web applications,
                            we develop solutions according to your requirements.
                        </p>
                    </div>

                    <div className="web-grid web-grid--3">
                        {services.map((service) => (
                            <div
                                key={service.title}
                                className="glow-card service-card spotlight"
                                data-reveal
                                onMouseMove={handleSpotlight}
                            >
                                <span className="service-tag">{service.tag}</span>

                                <div className="glow-card-icon">
                                    <i className={`bi ${service.icon}`} />
                                </div>

                                <h4>{service.title}</h4>
                                <p>{service.description}</p>

                                <span className="glow-card-link">
                                    Learn More <i className="bi bi-arrow-right" />
                                </span>

                                <span className="card-corner card-corner--tl" />
                                <span className="card-corner card-corner--br" />
                            </div>
                        ))}
                    </div>

                </div>
            </section>

            {/* =====================================================
          FEATURES
      ===================================================== */}
            <section className="website-section website-section--soft">
                <div className="web-container">

                    <div className="features-grid">

                        <div className="features-copy" data-reveal>
                            <span className="section-label">WHAT YOU GET</span>
                            <h2 className="section-title">
                                Everything You Need for a <em>Modern Website</em>
                            </h2>
                            <p className="section-description">
                                We focus on building websites that are easy to use,
                                maintain and scale as your business or project grows.
                            </p>

                            <Link to="/contact" className="web-btn web-btn--primary">
                                Discuss Your Requirements
                                <i className="bi bi-arrow-right" />
                            </Link>
                        </div>

                        <div className="features-list" data-reveal>
                            {features.map((feature) => (
                                <div key={feature} className="feature-item">
                                    <span className="feature-check">
                                        <i className="bi bi-check-lg" />
                                    </span>
                                    <span>{feature}</span>
                                </div>
                            ))}
                        </div>

                    </div>

                </div>
            </section>

            {/* =====================================================
          TECHNOLOGIES
      ===================================================== */}
            <section className="website-section tech-section">
                <div className="web-container web-section-head web-section-head--center" data-reveal>
                    <span className="section-label">TECHNOLOGY STACK</span>
                    <h2 className="section-title">
                        Built Using <em>Modern Technologies</em>
                    </h2>
                    <p className="section-description">
                        We select technologies according to the project requirements,
                        performance and scalability.
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

                <div className="web-container">
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
          PROCESS
      ===================================================== */}
            <section className="website-section website-section--soft">
                <div className="web-container">

                    <div className="web-section-head web-section-head--center" data-reveal>
                        <span className="section-label">OUR PROCESS</span>
                        <h2 className="section-title">
                            From Idea to <em>Live Website</em>
                        </h2>
                        <p className="section-description">
                            A simple and transparent development process from requirement
                            gathering to deployment.
                        </p>
                    </div>

                    <div className="process-timeline-h">
                        {process.map((item, i) => (
                            <div
                                key={item.number}
                                className="process-step-h spotlight"
                                data-reveal
                                onMouseMove={handleSpotlight}
                            >
                                <span className="process-step-number">{item.number}</span>

                                <span className="process-step-icon">
                                    <i className={`bi ${item.icon}`} />
                                </span>

                                <h4>{item.title}</h4>
                                <p>{item.text}</p>

                                {i < process.length - 1 && (
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
            <section className="website-section">
                <div className="web-container">
                    <div className="website-cta" data-reveal>
                        <span className="cta-glow cta-glow--a" aria-hidden="true" />
                        <span className="cta-glow cta-glow--b" aria-hidden="true" />

                        <div className="website-cta-copy">
                            <span className="website-cta-badge">
                                <i className="bi bi-stars" /> LET'S BUILD TOGETHER
                            </span>

                            <h2>
                                Have a Website Idea?
                                <span>Let's Turn It Into Reality.</span>
                            </h2>

                            <p>
                                Tell us what you want to build and our team will help you
                                plan the right technology and development approach.
                            </p>
                        </div>

                        <div className="website-cta-actions">

                            <Link
                                to="/register?type=service&serviceId=website-development"
                                className="web-btn web-btn--light"
                            >
                                Start Your Project
                                <i className="bi bi-arrow-right" />
                            </Link>


                            <Link to="/contact" className="web-btn web-btn--outline">
                                Contact Us
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default WebsiteDevelopment;