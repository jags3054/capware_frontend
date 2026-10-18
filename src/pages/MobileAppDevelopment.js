import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "../styles/MobileAppDevelopment.css";

const MobileAppDevelopment = () => {
    /* ------------------------------------------------------------------ */
    /*  Data                                                               */
    /* ------------------------------------------------------------------ */
    const services = [
        {
            icon: "bi-phone",
            title: "Android Applications",
            description:
                "Modern Android applications designed for businesses, startups, educational institutions and service providers.",
            tag: "Android",
        },
        {
            icon: "bi-phone-flip",
            title: "Cross-Platform Apps",
            description:
                "Build applications for Android and iOS using a single scalable React Native codebase.",
            tag: "Cross-Platform",
        },
        {
            icon: "bi-cart3",
            title: "E-Commerce Apps",
            description:
                "Mobile shopping applications with products, cart, orders, authentication and payment integration.",
            tag: "E-Commerce",
        },
        {
            icon: "bi-calendar-check",
            title: "Booking Applications",
            description:
                "Appointment, event, service and reservation applications with customer and admin management.",
            tag: "Booking",
        },
        {
            icon: "bi-speedometer2",
            title: "Admin Panels",
            description:
                "Web-based dashboards to manage users, bookings, products, payments and application data.",
            tag: "Dashboard",
        },
        {
            icon: "bi-cloud-arrow-up",
            title: "API & Deployment",
            description:
                "Backend API integration, database setup, hosting and deployment support for your application.",
            tag: "DevOps",
        },
    ];

    const features = [
        "React Native development",
        "Expo integration",
        "Android application",
        "iOS-ready architecture",
        "REST API integration",
        "MongoDB / MySQL",
        "User authentication",
        "Push notification integration",
        "Admin dashboard",
        "APK generation",
        "GitHub source code",
        "Deployment support",
    ];

    const technologies = [
        "React Native",
        "Expo",
        "JavaScript",
        "Node.js",
        "Express.js",
        "MongoDB",
        "MySQL",
        "REST API",
        "Firebase",
        "Git & GitHub",
    ];

    const appTypes = [
        {
            icon: "bi-bicycle",
            title: "Delivery Apps",
            description: "Customer, delivery partner and admin applications.",
            tag: "Logistics",
        },
        {
            icon: "bi-calendar2-check",
            title: "Booking Apps",
            description: "Appointment, event and service booking applications.",
            tag: "Services",
        },
        {
            icon: "bi-cart-check",
            title: "E-Commerce Apps",
            description: "Product browsing, cart, orders and customer management.",
            tag: "Retail",
        },
        {
            icon: "bi-mortarboard",
            title: "Education Apps",
            description: "Student learning, courses, tests and academic portals.",
            tag: "EdTech",
        },
    ];

    const process = [
        {
            number: "01",
            title: "Requirement",
            text: "Understand your app idea, target users, features and business requirements.",
            icon: "bi-clipboard-check",
        },
        {
            number: "02",
            title: "UI Planning",
            text: "Plan application screens, navigation, user flow and overall interface.",
            icon: "bi-pencil-square",
        },
        {
            number: "03",
            title: "Development",
            text: "Develop mobile screens, backend APIs, database and application features.",
            icon: "bi-code-slash",
        },
        {
            number: "04",
            title: "Testing",
            text: "Test the application on devices and resolve functional and UI issues.",
            icon: "bi-bug",
        },
        {
            number: "05",
            title: "Build & Deploy",
            text: "Generate APK/build files and provide deployment and handover support.",
            icon: "bi-cloud-arrow-up",
        },
    ];

    const metrics = [
        { value: "40+", label: "Apps Delivered" },
        { value: "4.8★", label: "Avg. App Rating" },
        { value: "<3s", label: "Cold Start" },
        { value: "60fps", label: "Smooth Animations" },
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
        <div className="mobile-page" ref={pageRef}>

            {/* =====================================================
          HERO
      ===================================================== */}
            <section className="mobile-hero">
                <div className="mobile-hero-bg" aria-hidden="true">
                    <span className="mob-orb mob-orb--a" />
                    <span className="mob-orb mob-orb--b" />
                    <span className="mob-orb mob-orb--c" />
                    <span className="mob-grid-bg" />
                </div>

                <div className="mob-container">
                    <div className="mobile-hero-inner">

                        <div className="mobile-hero-copy">
                            <span className="mobile-hero-badge" data-reveal>
                                <span className="mobile-hero-dot" />
                                MOBILE APP DEVELOPMENT
                            </span>

                            <h1 className="mobile-hero-title" data-reveal>
                                Build Powerful
                                <span className="mobile-hero-gradient">
                                    Mobile Applications
                                </span>
                            </h1>

                            <p className="mobile-hero-text" data-reveal>
                                We develop modern, scalable and user-friendly mobile
                                applications for businesses, startups, educational
                                institutions and innovative ideas.
                            </p>

                            <div className="mobile-hero-actions" data-reveal>
                                <Link
                                    to="/register?type=service&serviceId=mobile-app-development"
                                    className="web-btn web-btn--light"
                                >
                                    Start Your Project
                                    <i className="bi bi-arrow-right" />
                                </Link>

                                <Link to="/contact" className="mob-btn mob-btn--ghost">
                                    Discuss Your Idea
                                    <i className="bi bi-chat-dots" />
                                </Link>
                            </div>

                            <div className="mobile-trust" data-reveal>
                                <span><i className="bi bi-check-circle-fill" /> Android</span>
                                <span><i className="bi bi-check-circle-fill" /> React Native</span>
                                <span><i className="bi bi-check-circle-fill" /> API Integration</span>
                                <span><i className="bi bi-check-circle-fill" /> Deployment</span>
                            </div>
                        </div>

                        {/* Phone mockup */}
                        <div className="mobile-hero-visual" data-reveal>
                            <div className="phone-wrap">
                                <div className="phone">
                                    <span className="phone-notch" />

                                    <div className="phone-screen">

                                        <div className="phone-status">
                                            <span>9:41</span>
                                            <div className="phone-status-icons">
                                                <i className="bi bi-wifi" />
                                                <i className="bi bi-reception-4" />
                                                <i className="bi bi-battery-full" />
                                            </div>
                                        </div>

                                        <div className="phone-head">
                                            <span className="phone-head-btn">
                                                <i className="bi bi-list" />
                                            </span>
                                            <strong>Capware</strong>
                                            <span className="phone-head-btn">
                                                <i className="bi bi-bell" />
                                                <span className="phone-head-dot" />
                                            </span>
                                        </div>

                                        <div className="phone-welcome">
                                            <small>Welcome Back</small>
                                            <h5>Build Your App</h5>
                                        </div>

                                        <div className="phone-stats">
                                            <div className="phone-stat">
                                                <i className="bi bi-phone" />
                                                <small>Mobile</small>
                                            </div>
                                            <div className="phone-stat">
                                                <i className="bi bi-cloud-check" />
                                                <small>API</small>
                                            </div>
                                            <div className="phone-stat">
                                                <i className="bi bi-database" />
                                                <small>Database</small>
                                            </div>
                                        </div>

                                        <div className="phone-card">
                                            <span className="phone-card-tag">PROJECT STATUS</span>
                                            <strong>Ready to Build</strong>

                                            <div className="phone-progress">
                                                <span style={{ width: "75%" }} />
                                            </div>

                                            <div className="phone-card-meta">
                                                <span>Setup</span>
                                                <span>75%</span>
                                            </div>
                                        </div>

                                        <div className="phone-nav">
                                            <i className="bi bi-house-fill" />
                                            <i className="bi bi-grid" />
                                            <i className="bi bi-person" />
                                        </div>

                                    </div>
                                </div>

                                {/* floating notification cards */}
                                <span className="phone-float phone-float--1">
                                    <span className="phone-float-icon">
                                        <i className="bi bi-bell-fill" />
                                    </span>
                                    <span className="phone-float-text">
                                        <strong>New booking</strong>
                                        <small>just now</small>
                                    </span>
                                </span>

                                <span className="phone-float phone-float--2">
                                    <span className="phone-float-icon phone-float-icon--green">
                                        <i className="bi bi-check-lg" />
                                    </span>
                                    <span className="phone-float-text">
                                        <strong>Payment received</strong>
                                        <small>₹1,499</small>
                                    </span>
                                </span>

                                <span className="phone-float phone-float--3">
                                    <span className="phone-float-icon phone-float-icon--purple">
                                        <i className="bi bi-rocket-takeoff-fill" />
                                    </span>
                                    <span className="phone-float-text">
                                        <strong>Build succeeded</strong>
                                        <small>APK ready</small>
                                    </span>
                                </span>
                            </div>
                        </div>

                    </div>

                    {/* Metric strip */}
                    <div className="mobile-metrics" data-reveal>
                        {metrics.map((m) => (
                            <div key={m.label} className="mob-metric">
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
            <section className="mobile-section">
                <div className="mob-container">

                    <div className="mob-section-head mob-section-head--center" data-reveal>
                        <span className="section-label">MOBILE SOLUTIONS</span>
                        <h2 className="section-title">
                            Applications Built <em>Around Your Requirements</em>
                        </h2>
                        <p className="section-description">
                            From simple utility applications to complete business
                            platforms, we develop mobile solutions based on your idea.
                        </p>
                    </div>

                    <div className="mob-grid mob-grid--3">
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
            <section className="mobile-section mobile-section--soft">
                <div className="mob-container">

                    <div className="features-grid">

                        <div className="features-copy" data-reveal>
                            <span className="section-label">APP FEATURES</span>
                            <h2 className="section-title">
                                Everything Your Mobile Application <em>Needs</em>
                            </h2>
                            <p className="section-description">
                                We combine a modern mobile interface with reliable backend
                                services to create applications that are ready for real-world
                                use.
                            </p>

                            <Link to="/contact" className="mob-btn mob-btn--primary">
                                Discuss Your App
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
            <section className="mobile-section tech-section">
                <div className="mob-container mob-section-head mob-section-head--center" data-reveal>
                    <span className="section-label">TECHNOLOGY STACK</span>
                    <h2 className="section-title">
                        Modern Technologies for <em>Mobile Development</em>
                    </h2>
                    <p className="section-description">
                        Our technology stack allows us to develop scalable mobile
                        applications with powerful backend systems.
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

                <div className="mob-container">
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
          APP TYPES
      ===================================================== */}
            <section className="mobile-section mobile-section--soft">
                <div className="mob-container">

                    <div className="mob-section-head mob-section-head--center" data-reveal>
                        <span className="section-label">APPLICATION IDEAS</span>
                        <h2 className="section-title">
                            What Can <em>We Build?</em>
                        </h2>
                        <p className="section-description">
                            A few of the app categories we build most often —
                            each one tailored to your users and business.
                        </p>
                    </div>

                    <div className="mob-grid mob-grid--4">
                        {appTypes.map((type) => (
                            <div
                                key={type.title}
                                className="glow-card app-type-card spotlight"
                                data-reveal
                                onMouseMove={handleSpotlight}
                            >
                                <span className="service-tag">{type.tag}</span>

                                <div className="glow-card-icon">
                                    <i className={`bi ${type.icon}`} />
                                </div>

                                <h5>{type.title}</h5>
                                <p>{type.description}</p>
                            </div>
                        ))}
                    </div>

                </div>
            </section>

            {/* =====================================================
          PROCESS
      ===================================================== */}
            <section className="mobile-section">
                <div className="mob-container">

                    <div className="mob-section-head mob-section-head--center" data-reveal>
                        <span className="section-label">OUR PROCESS</span>
                        <h2 className="section-title">
                            From Idea to <em>Mobile Application</em>
                        </h2>
                        <p className="section-description">
                            A structured development process that keeps your project
                            clear, transparent and manageable.
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
            <section className="mobile-section">
                <div className="mob-container">
                    <div className="mobile-cta" data-reveal>
                        <span className="cta-glow cta-glow--a" aria-hidden="true" />
                        <span className="cta-glow cta-glow--b" aria-hidden="true" />

                        <div className="mobile-cta-copy">
                            <span className="mobile-cta-badge">
                                <i className="bi bi-stars" /> HAVE AN APP IDEA?
                            </span>

                            <h2>
                                Let's Turn Your Idea
                                <span>Into an App.</span>
                            </h2>

                            <p>
                                Share your application idea with us and we will help you
                                plan the features, technology and development approach.
                            </p>
                        </div>

                        <div className="mobile-cta-actions">
                            <Link
                                to="/register?type=service&serviceId=mobile-app-development"
                                className="web-btn web-btn--light"
                            >
                                Start Your Project
                                <i className="bi bi-arrow-right" />
                            </Link>

                            <Link to="/contact" className="mob-btn mob-btn--outline">
                                Contact Us
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default MobileAppDevelopment;