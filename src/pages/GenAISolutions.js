import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/GenAISolutions.css";

const GenAISolutions = () => {
    /* ------------------------------------------------------------------ */
    /*  Data                                                               */
    /* ------------------------------------------------------------------ */
    const solutions = [
        {
            icon: "bi-chat-dots",
            title: "AI Chatbots",
            description:
                "Build intelligent conversational assistants for websites, businesses, colleges and customer support.",
            tag: "Chat",
        },
        {
            icon: "bi-file-earmark-text",
            title: "Document AI",
            description:
                "Extract, summarize and analyze information from PDFs, documents and business files.",
            tag: "Docs",
        },
        {
            icon: "bi-search",
            title: "RAG Applications",
            description:
                "Create AI systems that answer questions using your own documents, knowledge base and business data.",
            tag: "RAG",
        },
        {
            icon: "bi-robot",
            title: "AI Automation",
            description:
                "Automate repetitive business workflows using AI, APIs, webhooks and intelligent decision-making.",
            tag: "Automation",
        },
        {
            icon: "bi-stars",
            title: "Custom AI Applications",
            description:
                "Develop AI-powered applications tailored to specific business, education or industry requirements.",
            tag: "Custom",
        },
        {
            icon: "bi-diagram-3",
            title: "AI API Integration",
            description:
                "Integrate modern AI models and services into your existing websites, applications and software.",
            tag: "Integration",
        },
    ];

    const capabilities = [
        "AI chatbot development",
        "Generative AI applications",
        "RAG-based applications",
        "PDF & document analysis",
        "AI-powered search",
        "Prompt engineering",
        "AI API integration",
        "Workflow automation",
        "AI content generation",
        "Custom AI dashboards",
        "Knowledge-base assistants",
        "Business process automation",
    ];

    const technologies = [
        "Python",
        "JavaScript",
        "React.js",
        "Node.js",
        "Express.js",
        "MongoDB",
        "MySQL",
        "REST APIs",
        "OpenAI APIs",
        "LLM Applications",
        "RAG",
        "n8n",
    ];

    const useCases = [
        {
            icon: "bi-mortarboard",
            title: "Education",
            text: "College assistants, student support bots, document search and academic knowledge systems.",
            tag: "EdTech",
        },
        {
            icon: "bi-building",
            title: "Business",
            text: "Customer support, internal knowledge assistants, document processing and workflow automation.",
            tag: "Enterprise",
        },
        {
            icon: "bi-cart3",
            title: "E-Commerce",
            text: "AI product assistants, recommendation experiences and automated customer communication.",
            tag: "Retail",
        },
        {
            icon: "bi-hospital",
            title: "Healthcare",
            text: "Information assistants, document analysis and AI-powered administrative workflows.",
            tag: "Health",
        },
    ];

    const process = [
        {
            number: "01",
            title: "Understand",
            text: "Understand your business problem, users, data and expected AI outcome.",
            icon: "bi-clipboard-check",
        },
        {
            number: "02",
            title: "Design",
            text: "Select the right AI approach, model, data source and application architecture.",
            icon: "bi-diagram-3",
        },
        {
            number: "03",
            title: "Develop",
            text: "Build the AI workflow, frontend, backend, database and required integrations.",
            icon: "bi-code-slash",
        },
        {
            number: "04",
            title: "Test",
            text: "Evaluate responses, improve prompts and validate the application with real use cases.",
            icon: "bi-bug",
        },
        {
            number: "05",
            title: "Deploy",
            text: "Deploy the application and provide documentation and handover support.",
            icon: "bi-cloud-arrow-up",
        },
    ];

    const metrics = [
        { value: "25+", label: "AI Systems Built" },
        { value: "50ms", label: "Avg. Latency" },
        { value: "1M+", label: "Tokens / Month" },
        { value: "12+", label: "LLMs Integrated" },
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
    /*  Chat typing simulation                                             */
    /* ------------------------------------------------------------------ */
    const [typed, setTyped] = useState(0);
    const fullReply = "Yes. We can design and develop an AI solution around your specific requirements.";

    useEffect(() => {
        let i = 0;
        const id = setInterval(() => {
            i += 1;
            setTyped(i);
            if (i >= fullReply.length) clearInterval(id);
        }, 26);
        return () => clearInterval(id);
    }, []);

    /* ------------------------------------------------------------------ */
    /*  Render                                                             */
    /* ------------------------------------------------------------------ */
    return (
        <div className="genai-page" ref={pageRef}>

            {/* =====================================================
          HERO
      ===================================================== */}
            <section className="genai-hero">
                <div className="genai-hero-bg" aria-hidden="true">
                    <span className="gen-orb gen-orb--a" />
                    <span className="gen-orb gen-orb--b" />
                    <span className="gen-orb gen-orb--c" />
                    <span className="gen-grid-bg" />
                </div>

                <div className="gen-container">
                    <div className="genai-hero-inner">

                        <div className="genai-hero-copy">
                            <span className="genai-hero-badge" data-reveal>
                                <span className="genai-hero-dot" />
                                GENERATIVE AI SOLUTIONS
                            </span>

                            <h1 className="genai-hero-title" data-reveal>
                                Build Smarter Products
                                <span className="genai-hero-gradient">
                                    With Generative AI
                                </span>
                            </h1>

                            <p className="genai-hero-text" data-reveal>
                                We build practical AI-powered applications that help
                                businesses automate work, understand information and create
                                better digital experiences.
                            </p>

                            <div className="genai-hero-actions" data-reveal>

                                <Link
                                    to="/register?type=service&serviceId=genai-solutions"
                                    className="web-btn web-btn--light"
                                >
                                    Start Your Project
                                    <i className="bi bi-arrow-right" />
                                </Link>

                                <Link to="/contact" className="gen-btn gen-btn--ghost">
                                    Discuss Your Idea
                                    <i className="bi bi-chat-dots" />
                                </Link>
                            </div>

                            <div className="genai-trust" data-reveal>
                                <span><i className="bi bi-check-circle-fill" /> AI Applications</span>
                                <span><i className="bi bi-check-circle-fill" /> RAG & Knowledge Systems</span>
                                <span><i className="bi bi-check-circle-fill" /> AI Automation</span>
                            </div>
                        </div>

                        {/* AI chat mockup */}
                        <div className="genai-hero-visual" data-reveal>
                            <div className="genai-chat-card">
                                <div className="genai-chat-glow" aria-hidden="true" />

                                <div className="genai-chat-header">
                                    <div className="genai-avatar">
                                        <i className="bi bi-stars" />
                                        <span className="genai-avatar-ring" />
                                    </div>

                                    <div className="genai-chat-title">
                                        <strong>Capware AI Assistant</strong>
                                        <small>
                                            <span className="status-dot" />
                                            AI Online
                                        </small>
                                    </div>

                                    <span className="genai-model-pill">
                                        <i className="bi bi-cpu" />
                                        LLM
                                    </span>
                                </div>

                                <div className="genai-chat-body">
                                    <div className="chat-message user-message">
                                        <span className="chat-avatar user-avatar">
                                            <i className="bi bi-person-fill" />
                                        </span>
                                        How can AI help my business?
                                    </div>

                                    <div className="chat-message ai-message">
                                        <span className="chat-avatar ai-avatar">
                                            <i className="bi bi-stars" />
                                        </span>
                                        AI can automate repetitive tasks, answer questions from
                                        your documents and help your team work faster.
                                    </div>

                                    <div className="chat-message user-message">
                                        <span className="chat-avatar user-avatar">
                                            <i className="bi bi-person-fill" />
                                        </span>
                                        Can you build a custom AI application?
                                    </div>

                                    <div className="chat-message ai-message">
                                        <span className="chat-avatar ai-avatar">
                                            <i className="bi bi-stars" />
                                        </span>
                                        <span className="chat-typing-content">
                                            {fullReply.slice(0, typed)}
                                            {typed < fullReply.length && (
                                                <span className="chat-caret" aria-hidden="true" />
                                            )}
                                        </span>
                                    </div>
                                </div>

                                <div className="genai-chat-input">
                                    <span>Ask anything...</span>
                                    <i className="bi bi-send-fill" />
                                </div>
                            </div>

                            <span className="gen-float gen-float--1">
                                <i className="bi bi-lightning-charge-fill" /> 50ms latency
                            </span>
                            <span className="gen-float gen-float--2">
                                <i className="bi bi-shield-check" /> Private & secure
                            </span>
                        </div>

                    </div>

                    {/* Metric strip */}
                    <div className="genai-metrics" data-reveal>
                        {metrics.map((m) => (
                            <div key={m.label} className="gen-metric">
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
            <section className="genai-section">
                <div className="gen-container">

                    <div className="gen-section-head gen-section-head--center" data-reveal>
                        <span className="section-label">AI SOLUTIONS</span>
                        <h2 className="section-title">
                            What Can We <em>Build With AI?</em>
                        </h2>
                        <p className="section-description">
                            From intelligent chatbots to complete AI-powered applications,
                            we build solutions around real business problems.
                        </p>
                    </div>

                    <div className="gen-grid gen-grid--3">
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
          CAPABILITIES
      ===================================================== */}
            <section className="genai-section genai-section--soft">
                <div className="gen-container">

                    <div className="features-grid">

                        <div className="features-copy" data-reveal>
                            <span className="section-label">AI CAPABILITIES</span>
                            <h2 className="section-title">
                                Turn AI Into a <em>Practical Business Tool</em>
                            </h2>
                            <p className="section-description">
                                We focus on useful AI applications that solve specific
                                problems instead of adding AI just for the sake of it.
                            </p>

                            <Link to="/contact" className="gen-btn gen-btn--primary">
                                Discuss Your AI Idea
                                <i className="bi bi-arrow-right" />
                            </Link>
                        </div>

                        <div className="features-list" data-reveal>
                            {capabilities.map((cap) => (
                                <div key={cap} className="feature-item">
                                    <span className="feature-check">
                                        <i className="bi bi-check-lg" />
                                    </span>
                                    <span>{cap}</span>
                                </div>
                            ))}
                        </div>

                    </div>

                </div>
            </section>

            {/* =====================================================
          USE CASES
      ===================================================== */}
            <section className="genai-section">
                <div className="gen-container">

                    <div className="gen-section-head gen-section-head--center" data-reveal>
                        <span className="section-label">INDUSTRY USE CASES</span>
                        <h2 className="section-title">
                            AI Applications <em>Across Industries</em>
                        </h2>
                        <p className="section-description">
                            AI can be adapted to different workflows, industries and
                            organizational requirements.
                        </p>
                    </div>

                    <div className="gen-grid gen-grid--4">
                        {useCases.map((item) => (
                            <div
                                key={item.title}
                                className="glow-card usecase-card spotlight"
                                data-reveal
                                onMouseMove={handleSpotlight}
                            >
                                <span className="service-tag">{item.tag}</span>

                                <div className="glow-card-icon">
                                    <i className={`bi ${item.icon}`} />
                                </div>

                                <h5>{item.title}</h5>
                                <p>{item.text}</p>
                            </div>
                        ))}
                    </div>

                </div>
            </section>

            {/* =====================================================
          TECHNOLOGY
      ===================================================== */}
            <section className="genai-section genai-section--soft tech-section">
                <div className="gen-container gen-section-head gen-section-head--center" data-reveal>
                    <span className="section-label">TECHNOLOGY STACK</span>
                    <h2 className="section-title">
                        Technologies Behind <em>Our AI Solutions</em>
                    </h2>
                    <p className="section-description">
                        We combine modern frontend, backend and AI technologies to
                        build complete applications.
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

                <div className="gen-container">
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
            <section className="genai-section">
                <div className="gen-container">

                    <div className="gen-section-head gen-section-head--center" data-reveal>
                        <span className="section-label">OUR AI DEVELOPMENT PROCESS</span>
                        <h2 className="section-title">
                            From Idea to <em>AI-Powered Product</em>
                        </h2>
                        <p className="section-description">
                            We follow a structured approach to make AI solutions useful,
                            reliable and easier to maintain.
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
            <section className="genai-section">
                <div className="gen-container">
                    <div className="genai-cta" data-reveal>
                        <span className="cta-glow cta-glow--a" aria-hidden="true" />
                        <span className="cta-glow cta-glow--b" aria-hidden="true" />

                        <div className="genai-cta-copy">
                            <span className="genai-cta-badge">
                                <i className="bi bi-stars" /> BUILD WITH GENERATIVE AI
                            </span>

                            <h2>
                                Have an AI Idea?
                                <span>Let's Turn It Into Reality.</span>
                            </h2>

                            <p>
                                Tell us about your problem or idea. We can help you identify
                                where AI can create real value and plan the right solution.
                            </p>
                        </div>

                        <div className="genai-cta-actions">

                            <Link
                                to="/register?type=service&serviceId=genai-solutions"
                                className="web-btn web-btn--light"
                            >
                                Start Your Project
                                <i className="bi bi-arrow-right" />
                            </Link>


                            <Link to="/contact" className="gen-btn gen-btn--outline">
                                Contact Us
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default GenAISolutions;