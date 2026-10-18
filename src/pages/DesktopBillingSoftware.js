import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "../styles/DesktopBillingSoftware.css";

const DesktopBillingSoftware = () => {
    /* ------------------------------------------------------------------ */
    /*  Data                                                               */
    /* ------------------------------------------------------------------ */
    const solutions = [
        {
            icon: "bi-receipt",
            title: "Billing Software",
            description:
                "Create invoices, manage products, track sales and maintain customer records from one application.",
            tag: "Billing",
        },
        {
            icon: "bi-shop",
            title: "Business Management",
            description:
                "Manage products, customers, suppliers, purchases, sales and daily business operations efficiently.",
            tag: "Management",
        },
        {
            icon: "bi-box-seam",
            title: "Inventory Management",
            description:
                "Track stock levels, product movement, purchases, sales and low-stock items in real time.",
            tag: "Inventory",
        },
        {
            icon: "bi-bar-chart",
            title: "Reports & Analytics",
            description:
                "Generate sales, purchase, inventory, customer and business performance reports.",
            tag: "Analytics",
        },
        {
            icon: "bi-people",
            title: "Customer Management",
            description:
                "Maintain customer information, transaction history, outstanding balances and payment records.",
            tag: "CRM",
        },
        {
            icon: "bi-person-badge",
            title: "Staff Management",
            description:
                "Create staff accounts and manage application access based on user roles and permissions.",
            tag: "Access",
        },
    ];

    const features = [
        "Invoice generation",
        "Product management",
        "Inventory tracking",
        "Purchase management",
        "Sales management",
        "Customer management",
        "Supplier management",
        "Payment tracking",
        "GST-ready billing structure",
        "Sales reports",
        "User roles & permissions",
        "Database backup support",
    ];

    const technologies = [
        "React.js",
        "Electron",
        "Node.js",
        "Express.js",
        "MongoDB",
        "MySQL",
        "JavaScript",
        "REST API",
        "Bootstrap",
        "Git & GitHub",
    ];

    const businessTypes = [
        {
            icon: "bi-shop",
            title: "Retail Shops",
            description: "Billing, inventory, customers and sales management.",
            tag: "Retail",
        },
        {
            icon: "bi-cup-hot",
            title: "Restaurants",
            description: "Billing, orders, menu and daily business management.",
            tag: "F&B",
        },
        {
            icon: "bi-building",
            title: "Organizations",
            description: "Customized internal systems and management applications.",
            tag: "Enterprise",
        },
        {
            icon: "bi-mortarboard",
            title: "Institutes",
            description: "Student, fee, records and administrative management.",
            tag: "Education",
        },
    ];

    const process = [
        {
            number: "01",
            title: "Understand",
            text: "Understand your business workflow, billing process and required features.",
            icon: "bi-clipboard-check",
        },
        {
            number: "02",
            title: "Plan",
            text: "Design the application structure, modules, database and user roles.",
            icon: "bi-diagram-3",
        },
        {
            number: "03",
            title: "Develop",
            text: "Build the desktop application, backend services and database integration.",
            icon: "bi-code-slash",
        },
        {
            number: "04",
            title: "Test",
            text: "Test billing, inventory, reports and other business workflows.",
            icon: "bi-bug",
        },
        {
            number: "05",
            title: "Deploy",
            text: "Prepare the application for installation and provide deployment support.",
            icon: "bi-cloud-arrow-up",
        },
    ];

    const metrics = [
        { value: "35+", label: "Systems Delivered" },
        { value: "99.9%", label: "Uptime" },
        { value: "50k+", label: "Invoices / Month" },
        { value: "12+", label: "Industries Served" },
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
        <div className="desktop-billing-page" ref={pageRef}>

            {/* =====================================================
          HERO
      ===================================================== */}
            <section className="desktop-billing-hero">
                <div className="db-hero-bg" aria-hidden="true">
                    <span className="db-orb db-orb--a" />
                    <span className="db-orb db-orb--b" />
                    <span className="db-orb db-orb--c" />
                    <span className="db-grid-bg" />
                </div>

                <div className="db-container">
                    <div className="desktop-billing-hero-inner">

                        <div className="desktop-billing-hero-copy">
                            <span className="db-hero-badge" data-reveal>
                                <span className="db-hero-dot" />
                                DESKTOP & BILLING SOFTWARE
                            </span>

                            <h1 className="desktop-billing-hero-title" data-reveal>
                                Smart Software for
                                <span className="db-hero-gradient">
                                    Everyday Business Operations
                                </span>
                            </h1>

                            <p className="desktop-billing-hero-text" data-reveal>
                                We develop customized desktop and billing applications for
                                shops, businesses, institutes and organizations to simplify
                                daily operations and manage business data efficiently.
                            </p>

                            <div className="desktop-billing-hero-actions" data-reveal>

                                <Link
                                    to="/register?type=service&serviceId=desktop-billing"
                                    className="web-btn web-btn--light"
                                >
                                    Start Your Project
                                    <i className="bi bi-arrow-right" />
                                </Link>


                                <Link to="/contact" className="db-btn db-btn--ghost">
                                    Discuss Requirements
                                    <i className="bi bi-chat-dots" />
                                </Link>
                            </div>

                            <div className="desktop-billing-trust" data-reveal>
                                <span><i className="bi bi-check-circle-fill" /> Custom Software</span>
                                <span><i className="bi bi-check-circle-fill" /> Billing & Inventory</span>
                                <span><i className="bi bi-check-circle-fill" /> Reports</span>
                            </div>
                        </div>

                        {/* Business dashboard mockup */}
                        <div className="desktop-billing-hero-visual" data-reveal>
                            <div className="billing-dashboard">
                                <div className="billing-dashboard-top">
                                    <div className="dashboard-dots">
                                        <span /><span /><span />
                                    </div>
                                    <span className="billing-dashboard-tab">
                                        <i className="bi bi-window" />
                                        Business Dashboard
                                    </span>
                                    <span className="billing-dashboard-status">
                                        <span className="pulse-dot" />
                                        live
                                    </span>
                                </div>

                                <div className="billing-dashboard-body">

                                    <div className="billing-summary-row">
                                        <div className="billing-summary-card">
                                            <div className="billing-summary-head">
                                                <small>Total Sales</small>
                                                <i className="bi bi-graph-up-arrow" />
                                            </div>
                                            <strong>₹1,24,500</strong>
                                            <span className="billing-summary-trend">+12.4%</span>
                                        </div>

                                        <div className="billing-summary-card">
                                            <div className="billing-summary-head">
                                                <small>Invoices</small>
                                                <i className="bi bi-receipt" />
                                            </div>
                                            <strong>248</strong>
                                            <span className="billing-summary-trend">+8 this week</span>
                                        </div>
                                    </div>

                                    <div className="billing-chart">
                                        <div className="billing-chart-header">
                                            <span>Sales Overview</span>
                                            <small>This Month</small>
                                        </div>

                                        <div className="billing-bars">
                                            {[35, 55, 42, 70, 58, 82, 68].map((h, i) => (
                                                <span key={i} style={{ "--h": `${h}%`, "--i": i }}>
                                                    <i />
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="billing-bottom-row">
                                        <div className="billing-bottom-item">
                                            <i className="bi bi-box-seam" />
                                            <div>
                                                <span>Inventory</span>
                                                <small>1,248 items</small>
                                            </div>
                                        </div>

                                        <div className="billing-bottom-item">
                                            <i className="bi bi-people" />
                                            <div>
                                                <span>Customers</span>
                                                <small>412 active</small>
                                            </div>
                                        </div>

                                        <div className="billing-bottom-item">
                                            <i className="bi bi-file-earmark-text" />
                                            <div>
                                                <span>Reports</span>
                                                <small>18 ready</small>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>

                            <span className="db-float db-float--1">
                                <i className="bi bi-receipt" /> Invoice #2481
                            </span>
                            <span className="db-float db-float--2">
                                <i className="bi bi-check-circle-fill" /> Payment received
                            </span>
                        </div>

                    </div>

                    {/* Metric strip */}
                    <div className="db-metrics" data-reveal>
                        {metrics.map((m) => (
                            <div key={m.label} className="db-metric">
                                <strong>{m.value}</strong>
                                <span>{m.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* =====================================================
          SOLUTIONS
      ===================================================== */}
            <section className="desktop-billing-section">
                <div className="db-container">

                    <div className="db-section-head db-section-head--center" data-reveal>
                        <span className="section-label">BUSINESS SOLUTIONS</span>
                        <h2 className="section-title">
                            Software Built <em>Around Your Business</em>
                        </h2>
                        <p className="section-description">
                            Whether you need a billing system, inventory management
                            application or complete business management software, we can
                            build it according to your workflow.
                        </p>
                    </div>

                    <div className="db-grid db-grid--3">
                        {solutions.map((solution) => (
                            <div
                                key={solution.title}
                                className="glow-card service-card spotlight"
                                data-reveal
                                onMouseMove={handleSpotlight}
                            >
                                <span className="service-tag">{solution.tag}</span>

                                <div className="glow-card-icon">
                                    <i className={`bi ${solution.icon}`} />
                                </div>

                                <h4>{solution.title}</h4>
                                <p>{solution.description}</p>

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
            <section className="desktop-billing-section desktop-billing-section--soft">
                <div className="db-container">

                    <div className="features-grid">

                        <div className="features-copy" data-reveal>
                            <span className="section-label">KEY FEATURES</span>
                            <h2 className="section-title">
                                One System to <em>Manage Your Business</em>
                            </h2>
                            <p className="section-description">
                                Build a centralized system for billing, inventory, customers,
                                suppliers, payments and business reports.
                            </p>

                            <Link to="/contact" className="db-btn db-btn--primary">
                                Discuss Your Software
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
          WHO WE SERVE
      ===================================================== */}
            <section className="desktop-billing-section">
                <div className="db-container">

                    <div className="db-section-head db-section-head--center" data-reveal>
                        <span className="section-label">WHO WE SERVE</span>
                        <h2 className="section-title">
                            Solutions for <em>Different Businesses</em>
                        </h2>
                    </div>

                    <div className="db-grid db-grid--4">
                        {businessTypes.map((type) => (
                            <div
                                key={type.title}
                                className="glow-card business-type-card spotlight"
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
          TECHNOLOGIES
      ===================================================== */}
            <section className="desktop-billing-section desktop-billing-section--soft tech-section">
                <div className="db-container db-section-head db-section-head--center" data-reveal>
                    <span className="section-label">TECHNOLOGY</span>
                    <h2 className="section-title">
                        Modern & Reliable <em>Technology Stack</em>
                    </h2>
                    <p className="section-description">
                        Technology is selected based on your application's requirements,
                        performance and future scalability.
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

                <div className="db-container">
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
            <section className="desktop-billing-section">
                <div className="db-container">

                    <div className="db-section-head db-section-head--center" data-reveal>
                        <span className="section-label">OUR PROCESS</span>
                        <h2 className="section-title">
                            From Business Requirement to <em>Working Software</em>
                        </h2>
                        <p className="section-description">
                            We follow a structured process to make your software reliable,
                            maintainable and easy to use.
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
            <section className="desktop-billing-section">
                <div className="db-container">
                    <div className="desktop-billing-cta" data-reveal>
                        <span className="cta-glow cta-glow--a" aria-hidden="true" />
                        <span className="cta-glow cta-glow--b" aria-hidden="true" />

                        <div className="desktop-billing-cta-copy">
                            <span className="desktop-billing-cta-badge">
                                <i className="bi bi-stars" /> CUSTOM SOFTWARE DEVELOPMENT
                            </span>

                            <h2>
                                Need Software
                                <span>for Your Business?</span>
                            </h2>

                            <p>
                                Tell us about your business process and we can help you plan
                                the right billing or management software.
                            </p>
                        </div>

                        <div className="desktop-billing-cta-actions">

                            <Link
                                to="/register?type=service&serviceId=desktop-billing"
                                className="web-btn web-btn--light"
                            >
                                Start Your Project
                                <i className="bi bi-arrow-right" />
                            </Link>

                            <Link to="/contact" className="db-btn db-btn--outline">
                                Contact Us
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default DesktopBillingSoftware;