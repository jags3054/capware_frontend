import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/GenAIInternship.css";

const GenAIInternship = () => {
    /* ------------------------------------------------------------------ */
    /*  Data                                                               */
    /* ------------------------------------------------------------------ */
    const technologies = [
        "Python",
        "OpenAI APIs",
        "LLM Applications",
        "Prompt Engineering",
        "RAG",
        "LangChain",
        "Vector Databases",
        "n8n",
        "Node.js",
        "React.js",
    ];


    const plans = [
        {
            name: "Basic",
            price: 1999,
            description: "Get started with guided Generative AI project support.",
            features: [
                "Introduction to Generative AI",
                "Prompt engineering fundamentals",
                "OpenAI API integration guidance",
                "Basic AI project development",
                "Project documentation support",
                "Project explanation and presentation"
            ]
        },
        {
            name: "Internship",
            price: 2999,
            popular: true,
            description: "Complete 8-week Generative AI internship program.",
            features: [
                "8-week internship training",
                "LLMs and prompt engineering",
                "OpenAI APIs and LLM applications",
                "AI chatbot development",
                "RAG and vector databases",
                "PDF analysis and document AI",
                "LangChain and n8n introduction",
                "Complete GenAI project development",
                "GitHub and deployment guidance",
                "Documentation and viva preparation",
                "Internship completion certificate"
            ]
        },
        {
            name: "Advanced",
            price: 4999,
            description: "Advanced AI application development with personalized guidance.",
            features: [
                "Everything in Internship",
                "Advanced RAG application development",
                "Document intelligence workflows",
                "Advanced LLM integrations",
                "AI automation using n8n",
                "Customized GenAI project guidance",
                "Advanced deployment assistance",
                "Personalized documentation support",
                "Advanced project presentation and viva"
            ]
        }
    ];

    const learning = [
        "Introduction to Generative AI and LLMs",
        "Prompt engineering fundamentals",
        "Working with OpenAI and modern AI APIs",
        "Building conversational AI chatbots",
        "Retrieval-Augmented Generation (RAG) systems",
        "Vector databases and embeddings",
        "Document intelligence and PDF analysis",
        "AI automation and workflow integration",
        "Deploying AI applications",
        "Project documentation and presentation",
    ];

    const benefits = [
        {
            icon: "bi-stars",
            title: "Hands-On AI Projects",
            text: "Build real GenAI applications instead of only studying theory.",
            tag: "Build",
        },
        {
            icon: "bi-robot",
            title: "Modern LLM Workflows",
            text: "Learn how modern AI applications are designed, developed and deployed.",
            tag: "LLM",
        },
        {
            icon: "bi-search",
            title: "RAG & Vector Search",
            text: "Understand how AI answers questions using your own documents and data.",
            tag: "RAG",
        },
        {
            icon: "bi-github",
            title: "GitHub Experience",
            text: "Maintain your AI project with proper source control and collaboration.",
            tag: "Git",
        },
        {
            icon: "bi-cloud-arrow-up",
            title: "Deployment Support",
            text: "Deploy your AI application and learn hosting best practices.",
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
        { week: "Week 1", title: "GenAI Foundations", topics: "LLMs, tokens, embeddings, providers and API keys" },
        { week: "Week 2", title: "Prompt Engineering", topics: "Zero-shot, few-shot, role prompts and structured outputs" },
        { week: "Week 3", title: "AI Chatbots", topics: "Conversation memory, function calling and streaming responses" },
        { week: "Week 4", title: "RAG Systems", topics: "Chunking, embeddings, vector search and retrieval" },
        { week: "Week 5", title: "Document AI", topics: "PDF parsing, summarization and information extraction" },
        { week: "Week 6", title: "AI Automation", topics: "n8n workflows, webhooks and API integrations" },
        { week: "Week 7", title: "Project Development", topics: "Build, iterate and integrate your AI application" },
        { week: "Week 8", title: "Deployment & Viva", topics: "Deploy, document, present and prepare for viva" },
    ];

    const projectIdeas = [
        "AI Chatbot for Website",
        "PDF Q&A Assistant",
        "AI Resume Analyzer",
        "Course Recommendation Bot",
        "Document Summarizer",
        "Customer Support Assistant",
        "AI Study Assistant",
        "Knowledge Base Assistant",
    ];

    const faqs = [
        {
            question: "Who can join the GenAI Internship?",
            answer:
                "The program is suitable for students and developers who want practical experience building applications with modern generative AI tools and LLM APIs.",
        },
        {
            question: "Do I need prior AI or ML experience?",
            answer:
                "No. The internship starts from the fundamentals of LLMs and gradually builds up to complete AI applications. Basic programming familiarity helps.",
        },
        {
            question: "Will I build a complete AI project?",
            answer:
                "Yes. Students build a complete GenAI application — typically a chatbot, RAG assistant or document intelligence tool — with guided mentorship.",
        },
        {
            question: "Which AI models and tools are covered?",
            answer:
                "The program covers OpenAI APIs, open-source LLMs, vector databases, LangChain, prompt engineering and workflow tools such as n8n.",
        },
        {
            question: "Is deployment included?",
            answer:
                "Yes. Deployment concepts and support for deploying your AI application are part of the program.",
        },
        {
            question: "Will I receive a certificate?",
            answer:
                "A certificate is provided after successful completion of the internship requirements.",
        },
    ];

    const metrics = [
        { value: "8", label: "Weeks Program" },
        { value: "10", label: "Technologies" },
        { value: "1", label: "AI Project" },
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
        <div className="genai-internship-page" ref={pageRef}>

            {/* =====================================================
          HERO
      ===================================================== */}
            <section className="genai-internship-hero">
                <div className="genai-internship-bg" aria-hidden="true">
                    <span className="gi-orb gi-orb--a" />
                    <span className="gi-orb gi-orb--b" />
                    <span className="gi-orb gi-orb--c" />
                    <span className="gi-grid-bg" />
                </div>

                <div className="gi-container">
                    <div className="genai-internship-hero-inner">

                        <div className="genai-internship-hero-copy">
                            <span className="genai-internship-badge" data-reveal>
                                <span className="genai-internship-dot" />
                                GENERATIVE AI INTERNSHIP
                            </span>

                            <h1 className="genai-internship-title" data-reveal>
                                Build with Generative AI.
                                <span> Ship Real AI Applications.</span>
                            </h1>

                            <p className="genai-internship-text" data-reveal>
                                An industry-oriented internship focused on modern generative
                                AI — learn LLMs, prompt engineering, RAG systems and build
                                a complete AI application from scratch.
                            </p>

                            <div className="genai-internship-actions" data-reveal>
                                <Link to="/register" className="gi-btn gi-btn--primary">
                                    Enroll Now
                                    <i className="bi bi-arrow-right" />
                                </Link>

                                <a href="#curriculum" className="gi-btn gi-btn--ghost">
                                    View Curriculum
                                    <i className="bi bi-list-check" />
                                </a>
                            </div>

                            <div className="genai-internship-trust" data-reveal>
                                <span><i className="bi bi-check-circle-fill" /> 8 Weeks</span>
                                <span><i className="bi bi-check-circle-fill" /> AI Project</span>
                                <span><i className="bi bi-check-circle-fill" /> Certificate</span>
                            </div>
                        </div>

                        {/* AI pipeline card */}
                        <div className="genai-internship-hero-visual" data-reveal>
                            <div className="genai-internship-card">
                                <div className="genai-card-glow" aria-hidden="true" />

                                <div className="genai-internship-card-header">
                                    <div className="genai-ai-icon">
                                        <i className="bi bi-stars" />
                                        <span className="genai-ai-icon-ring" />
                                    </div>

                                    <div className="genai-card-title">
                                        <small>CAPWARE · AI PIPELINE</small>
                                        <strong>GenAI Application Stack</strong>
                                    </div>

                                    <span className="genai-card-status">
                                        <span className="pulse-dot" />
                                        Live
                                    </span>
                                </div>

                                <div className="genai-flow">
                                    {[
                                        { n: "01", t: "Prompt", s: "User input → LLM" },
                                        { n: "02", t: "Retrieve", s: "Vector search over docs" },
                                        { n: "03", t: "Generate", s: "LLM response with context" },
                                        { n: "04", t: "Deploy", s: "Ship the AI app" },
                                    ].map((step) => (
                                        <div key={step.n} className="genai-flow-item">
                                            <span className="genai-flow-number">{step.n}</span>
                                            <div className="genai-flow-text">
                                                <strong>{step.t}</strong>
                                                <small>{step.s}</small>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="genai-card-foot">
                                    <span><i className="bi bi-cpu" /> LLM APIs</span>
                                    <span><i className="bi bi-diagram-3" /> RAG ready</span>
                                </div>
                            </div>

                            <span className="gi-float gi-float--1">
                                <i className="bi bi-lightning-charge-fill" /> Streaming replies
                            </span>
                            <span className="gi-float gi-float--2">
                                <i className="bi bi-shield-check" /> Private by design
                            </span>
                        </div>

                    </div>

                    {/* Metric strip */}
                    <div className="genai-internship-metrics" data-reveal>
                        {metrics.map((m) => (
                            <div key={m.label} className="gi-metric">
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
            <section id="curriculum" className="genai-internship-section">
                <div className="gi-container">

                    <div className="gi-section-head gi-section-head--center" data-reveal>
                        <span className="section-label">CURRICULUM</span>
                        <h2 className="section-title">
                            What You Will <em>Learn</em>
                        </h2>
                        <p className="section-description">
                            Learn the complete generative AI development flow — from
                            prompts and embeddings to a deployed AI application.
                        </p>
                    </div>

                    <div className="gi-curriculum-grid">
                        {learning.map((item, index) => (
                            <div
                                key={item}
                                className="gi-curriculum-item spotlight"
                                data-reveal
                                onMouseMove={handleSpotlight}
                            >
                                <span className="gi-curriculum-number">
                                    {String(index + 1).padStart(2, "0")}
                                </span>
                                <span className="gi-curriculum-text">{item}</span>
                                <span className="gi-curriculum-check">
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
            <section className="genai-internship-section genai-internship-section--soft tech-section">
                <div className="gi-container gi-section-head gi-section-head--center" data-reveal>
                    <span className="section-label">TECHNOLOGIES</span>
                    <h2 className="section-title">
                        Modern Generative AI <em>Tech Stack</em>
                    </h2>
                    <p className="section-description">
                        Work with the tools and frameworks used to build modern AI
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

                <div className="gi-container">
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
            <section id="roadmap" className="genai-internship-section">
                <div className="gi-container">

                    <div className="gi-section-head gi-section-head--center" data-reveal>
                        <span className="section-label">8 WEEK ROADMAP</span>
                        <h2 className="section-title">
                            Your <em>AI Learning Journey</em>
                        </h2>
                        <p className="section-description">
                            A structured week-by-week path from LLM fundamentals to a
                            deployed AI application.
                        </p>
                    </div>

                    <div className="gi-roadmap-grid">
                        {roadmap.map((item, i) => (
                            <div
                                key={item.week}
                                className="genai-roadmap-card spotlight"
                                data-reveal
                                onMouseMove={handleSpotlight}
                            >
                                <div className="gi-roadmap-head">
                                    <span className="gi-roadmap-week">{item.week}</span>
                                    <span className="gi-roadmap-step">
                                        Step {String(i + 1).padStart(2, "0")}
                                    </span>
                                </div>

                                <span className="gi-roadmap-icon">
                                    <i className="bi bi-arrow-right" />
                                </span>

                                <h4>{item.title}</h4>
                                <p>{item.topics}</p>

                                {i < roadmap.length - 1 && (
                                    <span className="gi-roadmap-line" aria-hidden="true" />
                                )}
                            </div>
                        ))}
                    </div>

                </div>
            </section>

            {/* =====================================================
          PROJECT IDEAS
      ===================================================== */}
            <section id="projects" className="genai-internship-section genai-internship-section--soft">
                <div className="gi-container">

                    <div className="gi-section-head gi-section-head--center" data-reveal>
                        <span className="section-label">PROJECT DEVELOPMENT</span>
                        <h2 className="section-title">
                            AI Projects <em>You Can Build</em>
                        </h2>
                        <p className="section-description">
                            Apply your learning by building a practical AI application
                            around a real-world use case.
                        </p>
                    </div>

                    <div className="gi-projects-grid">
                        {projectIdeas.map((project) => (
                            <div
                                key={project}
                                className="glow-card project-idea-card spotlight"
                                data-reveal
                                onMouseMove={handleSpotlight}
                            >
                                <div className="glow-card-icon">
                                    <i className="bi bi-stars" />
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
            <section id="benefits" className="genai-internship-section">
                <div className="gi-container">

                    <div className="gi-section-head gi-section-head--center" data-reveal>
                        <span className="section-label">INTERNSHIP BENEFITS</span>
                        <h2 className="section-title">
                            More Than Just <em>Training</em>
                        </h2>
                    </div>

                    <div className="gi-grid gi-grid--3">
                        {benefits.map((benefit) => (
                            <div
                                key={benefit.title}
                                className="glow-card genai-benefit-card spotlight"
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
    INTERNSHIP PACKAGES
===================================================== */}
            <section
                id="packages"
                className="genai-internship-section genai-internship-section--soft"
            >
                <div className="gi-container">
                    <div
                        className="gi-section-head gi-section-head--center"
                        data-reveal
                    >
                        <span className="section-label">INTERNSHIP PACKAGES</span>

                        <h2 className="section-title">
                            Choose Your <em>GenAI Plan</em>
                        </h2>

                        <p className="section-description">
                            Choose the right plan to build practical Generative AI
                            skills and develop your own AI application.
                        </p>
                    </div>

                    <div className="gi-pricing-grid">
                        {plans.map((plan) => (
                            <div
                                key={plan.name}
                                className={`gi-pricing-card spotlight ${plan.popular ? "is-popular" : ""
                                    }`}
                                data-reveal
                                onMouseMove={handleSpotlight}
                            >
                                {plan.popular && (
                                    <span className="gi-pricing-popular">
                                        <i className="bi bi-star-fill" /> MOST POPULAR
                                    </span>
                                )}

                                <h4>{plan.name}</h4>

                                <p className="gi-pricing-description">
                                    {plan.description}
                                </p>

                                <div className="gi-pricing-amount">
                                    <span>₹</span>
                                    {plan.price.toLocaleString("en-IN")}
                                </div>

                                <span className="gi-pricing-note">
                                    One-time program fee
                                </span>

                                <div className="gi-pricing-divider" />

                                <ul className="gi-pricing-features">
                                    {plan.features.map((feature) => (
                                        <li key={feature}>
                                            <i className="bi bi-check-circle-fill" />
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                <Link
                                    to={`/register?type=internship&package=${encodeURIComponent(
                                        plan.name
                                    )}&internship=${encodeURIComponent("GenAI Internship")}`}
                                    className={`gi-btn ${plan.popular
                                        ? "gi-btn--primary"
                                        : "gi-btn--ghost"
                                        } gi-pricing-btn`}
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
            <section id="faq" className="genai-internship-section genai-internship-section--soft">
                <div className="gi-container">

                    <div className="gi-section-head gi-section-head--center" data-reveal>
                        <span className="section-label">FAQ</span>
                        <h2 className="section-title">
                            Frequently Asked <em>Questions</em>
                        </h2>
                        <p className="section-description">
                            Everything you need to know about the GenAI internship.
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
            <section id="enroll" className="genai-internship-section">
                <div className="gi-container">
                    <div className="genai-internship-cta" data-reveal>
                        <span className="cta-glow cta-glow--a" aria-hidden="true" />
                        <span className="cta-glow cta-glow--b" aria-hidden="true" />

                        <div className="genai-internship-cta-copy">
                            <span className="genai-internship-cta-badge">
                                <i className="bi bi-stars" /> GENERATIVE AI INTERNSHIP
                            </span>

                            <h2>
                                Ready to Build Your
                                <span>First AI Application?</span>
                            </h2>

                            <p>
                                Start learning modern generative AI and build a complete
                                AI application with guided project support.
                            </p>
                        </div>

                        <div className="genai-internship-cta-actions">
                            <Link
                                to="/register?type=internship&package=Internship&internship=GenAI%20Internship"
                                className="gi-btn gi-btn--light"
                            >
                                Enroll Now
                                <i className="bi bi-arrow-right" />
                            </Link>

                            <Link to="/contact" className="gi-btn gi-btn--outline">
                                Contact Us
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default GenAIInternship;