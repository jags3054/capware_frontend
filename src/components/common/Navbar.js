import React, { useEffect, useState } from "react";
import {
    Link,
    NavLink,
    useLocation,
    useNavigate,
} from "react-router-dom";
import "../../styles/Navbar.css";

const NAV = [
    { label: "Home", to: "/", end: true },
    {
        label: "Research & PhD Guidance",
        key: "/research-guidance",
        to: "/research-guidance",
        preview: {
            title: "Research & PhD Guidance",
            text: "Research mentoring, technical guidance and publication-readiness support.",
        },
        children: [
            { label: "Research Overview", to: "/research-guidance", end: true, icon: "bi-journal-richtext", desc: "Explore research support options" },
            { label: "Research Paper Support", to: "/research-guidance", icon: "bi-journal-text", desc: "Planning, review and formatting" },
            { label: "PhD Project Guidance", to: "/research-guidance", icon: "bi-cpu", desc: "Technical mentoring and prototypes" },
            { label: "Journal Publication Assistance", to: "/research-guidance", icon: "bi-journal-check", desc: "Submission-readiness guidance" },
            { label: "Research Analytics", to: "/research-guidance", icon: "bi-graph-up-arrow", desc: "Analysis and visualisation support" },
            { label: "Book a Consultation", to: "/research-guidance#research-enquiry", icon: "bi-calendar2-check", desc: "Share your research requirements" },
        ],
    },
    {
        label: "Services",
        key: "services",
        to: "/services",
        preview: {
            title: "Full-Stack Engineering",
            text: "Web, mobile, desktop and AI solutions built end-to-end.",
        },
        children: [
            { label: "All Services", to: "/services", end: true, icon: "bi-grid-1x2", desc: "Explore our full capability set" },
            { label: "Website Development", to: "/services/website", icon: "bi-globe2", desc: "Fast, responsive, SEO-ready sites" },
            { label: "Mobile App Development", to: "/services/mobile", icon: "bi-phone", desc: "iOS & Android, built to scale" },
            { label: "Desktop & Billing", to: "/services/software", icon: "bi-window-stack", desc: "Custom ERP, POS & billing tools" },
            { label: "GenAI Solutions", to: "/services/genai", icon: "bi-stars", desc: "LLM apps, chatbots & automation" },
        ],
    },
    {
        label: "Internships",
        key: "internships",
        to: "/internships",
        preview: {
            title: "Career Accelerators",
            text: "Hands-on programs with real project delivery and mentorship.",
        },
        children: [
            { label: "All Internships", to: "/internships", end: true, icon: "bi-mortarboard", desc: "Programs for every skill level" },
            { label: "AI / ML Internship", to: "/internships/ai-ml", icon: "bi-cpu", desc: "Models, data pipelines, deployment" },
            { label: "Full Stack Development", to: "/internships/full-stack", icon: "bi-code-slash", desc: "MERN / Java / .NET tracks" },
            { label: "GenAI Internship", to: "/internships/genai", icon: "bi-stars", desc: "Prompting, RAG & AI agents" },
            { label: "Mobile App Development", to: "/internships/mobile", icon: "bi-phone", desc: "React Native & Flutter" },
        ],
    },
    {
        label: "Final Year Projects",
        key: "projects",
        to: "/projects",
        preview: {
            title: "Final Year Blueprints",
            text: "Production-ready project tracks with source code and viva prep.",
        },
        children: [
            { label: "All Projects", to: "/projects", end: true, icon: "bi-collection", desc: "Browse the complete catalogue" },
            { label: "AI & Machine Learning", to: "/projects/ai-ml", icon: "bi-cpu", desc: "Smart systems with real datasets" },
            { label: "Full Stack Development", to: "/projects/full-stack", icon: "bi-code-slash", desc: "MERN, APIs, databases & deployment" },
            { label: "Generative AI", to: "/projects/genai", icon: "bi-stars", desc: "LLMs, diffusion & RAG apps" },
            { label: "Computer Vision", to: "/projects/computer-vision", icon: "bi-eye", desc: "Detection, tracking & OCR" },
            { label: "Data Science", to: "/projects/data-science", icon: "bi-graph-up-arrow", desc: "Analytics, forecasting & BI" },
        ],
    },
    { label: "About", to: "/about" },
    { label: "Contact", to: "/contact" },
];

const Navbar = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [openMenu, setOpenMenu] = useState(null);
    const [isMobile, setIsMobile] = useState(
        () =>
            typeof window !== "undefined" &&
            window.matchMedia("(max-width: 991.98px)").matches
    );

    const [currentUser, setCurrentUser] = useState(() => {
        try {
            const token = localStorage.getItem("capwareToken");
            const storedUser = localStorage.getItem("capwareUser");
            return token && storedUser ? JSON.parse(storedUser) : null;
        } catch {
            return null;
        }
    });

    const isLoggedIn = Boolean(
        localStorage.getItem("capwareToken") && currentUser?.id
    );

    // Sync auth state
    useEffect(() => {
        const syncAuth = () => {
            try {
                const token = localStorage.getItem("capwareToken");
                const storedUser = localStorage.getItem("capwareUser");
                setCurrentUser(token && storedUser ? JSON.parse(storedUser) : null);
            } catch {
                setCurrentUser(null);
            }
        };
        syncAuth();
        window.addEventListener("storage", syncAuth);
        window.addEventListener("capware-auth-change", syncAuth);
        return () => {
            window.removeEventListener("storage", syncAuth);
            window.removeEventListener("capware-auth-change", syncAuth);
        };
    }, [location.pathname]);

    // Sticky shadow
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 12);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    // Viewport tracking
    useEffect(() => {
        const mq = window.matchMedia("(max-width: 991.98px)");
        const handler = (event) => {
            setIsMobile(event.matches);
            if (!event.matches) {
                setMobileOpen(false);
                setOpenMenu(null);
            }
        };
        mq.addEventListener("change", handler);
        return () => mq.removeEventListener("change", handler);
    }, []);

    // Close menus on route change
    useEffect(() => {
        setMobileOpen(false);
        setOpenMenu(null);
    }, [location.pathname]);

    // Scroll lock + Escape
    useEffect(() => {
        document.body.style.overflow = mobileOpen ? "hidden" : "";
        const onKey = (event) => {
            if (event.key === "Escape") setMobileOpen(false);
        };
        window.addEventListener("keydown", onKey);
        return () => {
            document.body.style.overflow = "";
            window.removeEventListener("keydown", onKey);
        };
    }, [mobileOpen]);

    const toggleSub = (key) => {
        setOpenMenu((previous) => (previous === key ? null : key));
    };

    const handleLogout = () => {
        localStorage.removeItem("capwareToken");
        localStorage.removeItem("capwareUser");
        setCurrentUser(null);
        setMobileOpen(false);
        setOpenMenu(null);
        window.dispatchEvent(new Event("capware-auth-change"));
        navigate("/", { replace: true });
    };

    return (
        <>
            <header className={`cap-navbar ${scrolled ? "is-scrolled" : ""}`}>
                <div className="cap-container">
                    {/* Logo */}
                    <Link
                        className="cap-logo"
                        to="/"
                        aria-label="Capware Systems Home"
                    >
                        <img
                            src="/capware-brand.png"
                            alt="Capware Systems"
                            className="cap-logo-image"
                        />
                    </Link>

                    {/* Mobile menu button */}
                    <button
                        type="button"
                        className={`cap-burger ${mobileOpen ? "is-active" : ""}`}
                        aria-label="Toggle navigation"
                        aria-expanded={mobileOpen}
                        aria-controls="capwareMenu"
                        onClick={() => setMobileOpen((value) => !value)}
                    >
                        <span className="cap-burger-lines" aria-hidden="true">
                            <i />
                            <i />
                            <i />
                        </span>
                    </button>

                    {/* Navigation */}
                    <div
                        id="capwareMenu"
                        className={`cap-menu ${mobileOpen ? "is-open" : ""}`}
                    >
                        <div className="cap-menu-head">
                            <div className="cap-menu-brand">
                                <span className="cap-menu-brand-dot" />
                                <span className="cap-menu-title">Capware Menu</span>
                            </div>
                            <button
                                type="button"
                                className="cap-close"
                                aria-label="Close menu"
                                onClick={() => setMobileOpen(false)}
                            >
                                <i className="bi bi-x-lg" />
                            </button>
                        </div>

                        <ul className="cap-nav-list">
                            {NAV.map((item) => {
                                if (item.children) {
                                    const groupActive = location.pathname.startsWith(item.to);
                                    const isOpen = openMenu === item.key;

                                    return (
                                        <li
                                            key={item.key}
                                            className={`cap-dropdown ${isOpen ? "open" : ""}`}
                                        >
                                            <button
                                                type="button"
                                                className={`cap-nav-link cap-dropdown-toggle ${groupActive ? "active" : ""
                                                    }`}
                                                aria-haspopup="true"
                                                aria-expanded={isOpen}
                                                onClick={() => {
                                                    // Always allow accordion toggle on mobile.
                                                    // On desktop, clicking navigates to the section root.
                                                    const mobile =
                                                        typeof window !== "undefined" &&
                                                        window.matchMedia("(max-width: 991.98px)").matches;
                                                    if (mobile) {
                                                        toggleSub(item.key);
                                                    } else {
                                                        navigate(item.to);
                                                    }
                                                }}
                                            >
                                                <span>{item.label}</span>
                                                <i
                                                    className="bi bi-chevron-down cap-caret"
                                                    aria-hidden="true"
                                                />
                                            </button>

                                            <div className="cap-dropdown-menu">
                                                <div className="cap-dropdown-inner">
                                                    <ul className="cap-dd-list">
                                                        {item.children.map((child) => (
                                                            <li key={child.to}>
                                                                <NavLink
                                                                    to={child.to}
                                                                    end={child.end}
                                                                    className="cap-dd-item"
                                                                    onClick={() => {
                                                                        // Close the drawer after navigating
                                                                        if (
                                                                            window.matchMedia(
                                                                                "(max-width: 991.98px)"
                                                                            ).matches
                                                                        ) {
                                                                            setMobileOpen(false);
                                                                            setOpenMenu(null);
                                                                        }
                                                                    }}
                                                                >
                                                                    <span className="cap-dd-icon">
                                                                        <i
                                                                            className={`bi ${child.icon}`}
                                                                            aria-hidden="true"
                                                                        />
                                                                    </span>
                                                                    <span className="cap-dd-text">
                                                                        <span className="cap-dd-title">
                                                                            {child.label}
                                                                        </span>
                                                                        {child.desc && (
                                                                            <span className="cap-dd-desc">
                                                                                {child.desc}
                                                                            </span>
                                                                        )}
                                                                    </span>
                                                                    <i
                                                                        className="bi bi-arrow-right cap-dd-arrow"
                                                                        aria-hidden="true"
                                                                    />
                                                                </NavLink>
                                                            </li>
                                                        ))}
                                                    </ul>

                                                    {item.preview && (
                                                        <aside className="cap-dd-preview">
                                                            <span className="cap-dd-preview-tag">
                                                                <i className="bi bi-stars" /> Featured
                                                            </span>
                                                            <h4 className="cap-dd-preview-title">
                                                                {item.preview.title}
                                                            </h4>
                                                            <p className="cap-dd-preview-text">
                                                                {item.preview.text}
                                                            </p>
                                                            <Link
                                                                to={item.to}
                                                                className="cap-dd-preview-cta"
                                                            >
                                                                View all
                                                                <i className="bi bi-arrow-right" />
                                                            </Link>
                                                        </aside>
                                                    )}
                                                </div>
                                            </div>
                                        </li>
                                    );
                                }

                                return (
                                    <li key={item.to}>
                                        <NavLink
                                            to={item.to}
                                            end={item.end}
                                            className={({ isActive }) =>
                                                `cap-nav-link ${isActive ? "active" : ""}`
                                            }
                                        >
                                            {item.label}
                                        </NavLink>
                                    </li>
                                );
                            })}
                        </ul>

                        {/* Account actions */}
                        <div className="cap-menu-foot">
                            {isLoggedIn ? (
                                <div className="cap-account-actions">
                                    <div className="cap-user-indicator">
                                        <span className="cap-user-status-dot" />
                                        <span className="cap-user-name">
                                            {currentUser.name || "Logged in"}
                                        </span>
                                    </div>

                                    <Link
                                        to="/dashboard"
                                        className="cap-nav-btn cap-dashboard-btn"
                                    >
                                        <span>Dashboard</span>
                                        <i className="bi bi-grid-1x2" aria-hidden="true" />
                                    </Link>

                                    <button
                                        type="button"
                                        className="cap-nav-btn cap-logout-btn"
                                        onClick={handleLogout}
                                    >
                                        <span>Logout</span>
                                        <i className="bi bi-box-arrow-right" aria-hidden="true" />
                                    </button>
                                </div>
                            ) : (
                                <div className="cap-account-actions">
                                    <Link to="/login" className="cap-login-link">
                                        <i className="bi bi-person-circle" aria-hidden="true" />
                                        <span>Login</span>
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            <div
                className={`cap-overlay ${mobileOpen ? "is-open" : ""}`}
                onClick={() => setMobileOpen(false)}
                aria-hidden="true"
            />
        </>
    );
};

export default Navbar;