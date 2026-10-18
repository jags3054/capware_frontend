import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import "../styles/Home.css";

const Home = () => {
  /* ------------------------------------------------------------------ */
  /*  Data                                                               */
  /* ------------------------------------------------------------------ */
  const services = [
    {
      icon: "bi bi-globe2",
      title: "Website Development",
      description:
        "Modern, responsive and business-focused websites designed to build your digital presence.",
      link: "/services/website",
      tag: "Web",
    },
    {
      icon: "bi bi-phone",
      title: "Mobile App Development",
      description:
        "Android and cross-platform mobile applications for startups, businesses and organizations.",
      link: "/services/mobile",
      tag: "Mobile",
    },
    {
      icon: "bi bi-window-stack",
      title: "Business Software",
      description:
        "Custom desktop, billing, management and workflow software built around your business needs.",
      link: "/services/software",
      tag: "Software",
    },
    {
      icon: "bi bi-stars",
      title: "AI & GenAI Solutions",
      description:
        "AI-powered applications, intelligent assistants, automation and GenAI solutions for modern businesses.",
      link: "/services/genai",
      tag: "AI",
    },
  ];

  const businessSolutions = [
    { icon: "bi bi-receipt",        title: "Billing & POS",        description: "Billing, invoicing and point-of-sale solutions." },
    { icon: "bi bi-box-seam",       title: "Inventory Management", description: "Track products, stock, purchases and sales." },
    { icon: "bi bi-calendar-check", title: "Booking Systems",      description: "Appointment, event and service booking platforms." },
    { icon: "bi bi-building",       title: "ERP & Management",     description: "Centralized management systems for institutions and businesses." },
    { icon: "bi bi-people",         title: "CRM Solutions",        description: "Manage customers, leads, communication and sales." },
    { icon: "bi bi-bar-chart-line", title: "Business Analytics",   description: "Dashboards and reports to understand your business." },
  ];

  const aiSolutions = [
    "AI Chatbots",
    "Generative AI Applications",
    "WhatsApp Automation",
    "Document Intelligence",
    "AI Recommendation Systems",
    "Business Process Automation",
  ];

  const industries = [
    { icon: "bi bi-mortarboard", title: "Education",           count: "12+" },
    { icon: "bi bi-heart-pulse", title: "Healthcare",          count: "8+"  },
    { icon: "bi bi-shop",        title: "Retail & E-Commerce", count: "20+" },
    { icon: "bi bi-bank",        title: "Finance & Insurance", count: "6+"  },
    { icon: "bi bi-house",       title: "Real Estate",         count: "5+"  },
    { icon: "bi bi-cup-hot",     title: "Restaurants",         count: "10+" },
  ];

  const techStack = [
    "React.js", "React Native", "Node.js", "Express.js",
    "MongoDB", "MySQL", "Python", "Machine Learning",
    "Generative AI", "REST APIs", "Git & GitHub", "Cloud Deployment",
  ];

  const processSteps = [
    { number: "01", icon: "bi bi-chat-dots",      title: "Discuss",          text: "Understand your idea, business and requirements." },
    { number: "02", icon: "bi bi-pencil-square",  title: "Plan & Design",    text: "Create the solution architecture and user experience." },
    { number: "03", icon: "bi bi-code-slash",     title: "Develop",          text: "Build and test the application using modern technologies." },
    { number: "04", icon: "bi bi-cloud-arrow-up", title: "Deploy & Support", text: "Deploy your product and provide ongoing technical support." },
  ];

  const metrics = [
    { value: 150, suffix: "+",  label: "Projects Delivered" },
    { value: 80,  suffix: "+",  label: "Happy Clients" },
    { value: 5,   suffix: "+",  label: "Years Experience" },
    { value: 24,  suffix: "/7", label: "Technical Support" },
  ];

  const rotatingWords = [
    "Modern Businesses",
    "Students & Startups",
    "Growing Organizations",
    "Bold Ideas",
  ];

  const tickerItems = [
    "Website Development", "Mobile Apps", "Campus Cloud ERP",
    "AI Chatbots", "GenAI Solutions", "Billing Software",
    "School Management", "Inventory Systems", "Internships",
    "Final Year Projects",
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
/*  Card tilt on hover                                                 */
/* ------------------------------------------------------------------ */
useEffect(() => {
  const cards = pageRef.current?.querySelectorAll(".glow-card") ?? [];
  const handlers = [];

  cards.forEach((card) => {
    const onMove = (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.setProperty("--tiltX", `${y * -6}deg`);
      card.style.setProperty("--tiltY", `${x * 8}deg`);
    };
    const onLeave = () => {
      card.style.setProperty("--tiltX", "0deg");
      card.style.setProperty("--tiltY", "0deg");
    };
    card.addEventListener("mousemove", onMove);
    card.addEventListener("mouseleave", onLeave);
    handlers.push({ card, onMove, onLeave });
  });

  return () =>
    handlers.forEach(({ card, onMove, onLeave }) => {
      card.removeEventListener("mousemove", onMove);
      card.removeEventListener("mouseleave", onLeave);
    });
}, []);
  /* ------------------------------------------------------------------ */
  /*  Rotating headline word                                             */
  /* ------------------------------------------------------------------ */
  const [wordIndex, setWordIndex] = useState(0);
  const [wordFade, setWordFade]   = useState(true);

  useEffect(() => {
    const id = setInterval(() => {
      setWordFade(false);
      setTimeout(() => {
        setWordIndex((i) => (i + 1) % rotatingWords.length);
        setWordFade(true);
      }, 420);
    }, 3200);
    return () => clearInterval(id);
  }, []);

  /* ------------------------------------------------------------------ */
  /*  Hero parallax + cursor follow                                      */
  /* ------------------------------------------------------------------ */
  const heroRef = useRef(null);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const onMove = (e) => {
      const rect = hero.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width  - 0.5;
      const y = (e.clientY - rect.top)  / rect.height - 0.5;

      /* Tilt the terminal */
      hero.style.setProperty("--px", `${x * 20}px`);
      hero.style.setProperty("--py", `${y * 20}px`);
      hero.style.setProperty("--rx", `${y * -4}deg`);
      hero.style.setProperty("--ry", `${x * 6}deg`);

      /* Move the cursor glow */
      hero.style.setProperty("--cx", `${e.clientX - rect.left}px`);
      hero.style.setProperty("--cy", `${e.clientY - rect.top}px`);
    };

    const onLeave = () => {
      hero.style.setProperty("--px", "0px");
      hero.style.setProperty("--py", "0px");
      hero.style.setProperty("--rx", "0deg");
      hero.style.setProperty("--ry", "0deg");
    };

    hero.addEventListener("mousemove", onMove);
    hero.addEventListener("mouseleave", onLeave);
    return () => {
      hero.removeEventListener("mousemove", onMove);
      hero.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  /* ------------------------------------------------------------------ */
  /*  Scroll progress (drives hero fade + ticker offset)                 */
  /* ------------------------------------------------------------------ */
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let raf = null;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        setScrollY(window.scrollY);
        raf = null;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  /* ------------------------------------------------------------------ */
  /*  Animated metric counters                                           */
  /* ------------------------------------------------------------------ */
  const Metric = ({ value, suffix, label }) => {
    const [display, setDisplay] = useState(0);
    const ref = useRef(null);

    useEffect(() => {
      const node = ref.current;
      if (!node) return;

      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const duration = 1400;
              const start = performance.now();
              const tick = (now) => {
                const t = Math.min((now - start) / duration, 1);
                const eased = 1 - Math.pow(1 - t, 3);
                setDisplay(Math.round(value * eased));
                if (t < 1) requestAnimationFrame(tick);
              };
              requestAnimationFrame(tick);
              io.unobserve(node);
            }
          });
        },
        { threshold: 0.4 }
      );
      io.observe(node);
      return () => io.disconnect();
    }, [value]);

    return (
      <div className="metric" ref={ref}>
        <strong>
          {display}
          <span className="metric-suffix">{suffix}</span>
        </strong>
        <span>{label}</span>
      </div>
    );
  };

  /* ------------------------------------------------------------------ */
  /*  Magnetic buttons + icon pull                                       */
  /* ------------------------------------------------------------------ */
  useEffect(() => {
    const nodes = pageRef.current?.querySelectorAll(".home-btn") ?? [];

    const handlers = [];
    nodes.forEach((btn) => {
      const onMove = (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top  - rect.height / 2;
        btn.style.transform = `translate(${x * 0.15}px, ${y * 0.25}px)`;
      };
      const onLeave = () => {
        btn.style.transform = "";
      };

      btn.addEventListener("mousemove", onMove);
      btn.addEventListener("mouseleave", onLeave);
      handlers.push({ btn, onMove, onLeave });
    });

    return () =>
      handlers.forEach(({ btn, onMove, onLeave }) => {
        btn.removeEventListener("mousemove", onMove);
        btn.removeEventListener("mouseleave", onLeave);
      });
  }, []);

  /* ------------------------------------------------------------------ */
  /*  Render                                                             */
  /* ------------------------------------------------------------------ */
  return (
    <div className="home-page" ref={pageRef}>

      {/* =====================================================
          HERO
      ===================================================== */}
      <section
        className="hero"
        ref={heroRef}
        style={{ "--scrolled": Math.min(scrollY, 400) }}
      >
        <div className="hero-bg" aria-hidden="true">
          <span className="hero-orb hero-orb--a" />
          <span className="hero-orb hero-orb--b" />
          <span className="hero-orb hero-orb--c" />
          <span className="hero-grid" />
          <span className="hero-noise" />
          <span className="hero-beam hero-beam--1" />
          <span className="hero-beam hero-beam--2" />
          <span className="hero-cursor-glow" />
        </div>

        {/* Floating particles */}
        <div className="hero-particles" aria-hidden="true">
          {Array.from({ length: 26 }).map((_, i) => (
            <span
              key={i}
              className="hero-particle"
              style={{
                "--x": `${Math.random() * 100}%`,
                "--y": `${Math.random() * 100}%`,
                "--d": `${8 + Math.random() * 10}s`,
                "--delay": `${Math.random() * 6}s`,
                "--size": `${1 + Math.random() * 2.5}px`,
              }}
            />
          ))}
        </div>

        <div className="home-container hero-inner">

          <div className="hero-copy">
            <span className="hero-badge" data-reveal>
              <span className="hero-badge-dot" />
              TECHNOLOGY • AI • SOFTWARE • DIGITAL
            </span>

            <h1 className="hero-title" data-reveal>
              Bringing Ideas
              <span className="hero-gradient">Into the Web</span>
              <span className="hero-rotator">
                For{" "}
                <em className={wordFade ? "is-in" : "is-out"}>
                  {rotatingWords[wordIndex]}
                </em>
              </span>
            </h1>

            <p className="hero-text" data-reveal>
              We build websites, mobile applications, business software
              and AI-powered solutions that help businesses turn ideas
              into real digital products.
            </p>

            <div className="hero-actions" data-reveal>
              <Link to="/contact" className="home-btn home-btn--primary">
                <i className="bi bi-chat-dots" />
                Start Your Project
                <span className="home-btn-shine" aria-hidden="true" />
              </Link>

              <Link to="/services" className="home-btn home-btn--ghost">
                Explore Our Services
                <i className="bi bi-arrow-right" />
              </Link>
            </div>

            <div className="hero-stats" data-reveal>
              <div className="hero-stat">
                <i className="bi bi-code-slash" />
                <span>Custom Development</span>
              </div>
              <div className="hero-stat">
                <i className="bi bi-cpu" />
                <span>AI Solutions</span>
              </div>
              <div className="hero-stat">
                <i className="bi bi-cloud-check" />
                <span>Deployment Support</span>
              </div>
            </div>
          </div>

          {/* Hero visual */}
          <div className="hero-visual" data-reveal>
            <div className="hero-visual-inner">
              <div className="code-window">
                <div className="code-window-head">
                  <div className="window-dots">
                    <span /><span /><span />
                  </div>
                  <span className="code-window-url">
                    <i className="bi bi-shield-lock" />
                    capwaresystems.in
                  </span>
                  <span className="code-window-status">
                    <span className="pulse-dot" />
                    live
                  </span>
                </div>

                <div className="code-window-body">
                  <div className="code-window-icon">
                    <i className="bi bi-cpu" />
                    <span className="code-window-icon-ring" />
                  </div>
                  <h4>Digital Solutions</h4>
                  <p>
                    From business websites to intelligent AI applications,
                    we build technology around your requirements.
                  </p>

                  <div className="code-window-grid">
                    <div className="code-chip"><i className="bi bi-globe" /><span>Websites</span></div>
                    <div className="code-chip"><i className="bi bi-phone" /><span>Mobile Apps</span></div>
                    <div className="code-chip"><i className="bi bi-window-stack" /><span>Software</span></div>
                    <div className="code-chip"><i className="bi bi-stars" /><span>AI Solutions</span></div>
                  </div>

                  <div className="code-progress">
                    <div className="code-progress-head">
                      <span>Deployment readiness</span>
                      <strong>98%</strong>
                    </div>
                    <div className="code-progress-bar"><span /></div>
                  </div>
                </div>
              </div>

              <span className="hero-float hero-float--1">
                <i className="bi bi-check-circle-fill" /> Ready to deploy
              </span>
              <span className="hero-float hero-float--2">
                <i className="bi bi-lightning-charge-fill" /> Fast delivery
              </span>
              <span className="hero-float hero-float--3">
                <i className="bi bi-shield-check" /> Secure by design
              </span>
            </div>
          </div>

        </div>

        {/* Metric strip */}
        <div className="home-container hero-metrics" data-reveal>
          {metrics.map((m) => (
            <Metric key={m.label} value={m.value} suffix={m.suffix} label={m.label} />
          ))}
        </div>

        {/* Scroll cue */}
        <div className="hero-scroll" aria-hidden="true">
          <span className="hero-scroll-line" />
          <span className="hero-scroll-text">scroll</span>
        </div>
      </section>

      {/* =====================================================
          SERVICE TICKER
      ===================================================== */}
      <section className="ticker" aria-hidden="true">
        <div
          className="ticker-track"
          style={{ transform: `translateX(-${(scrollY * 0.15) % 400}px)` }}
        >
          {[...tickerItems, ...tickerItems].map((item, i) => (
            <span key={i} className="ticker-item">
              <i className="bi bi-asterisk" />
              {item}
            </span>
          ))}
        </div>
      </section>

      {/* =====================================================
          SERVICES
      ===================================================== */}
      <section className="section">
        <div className="home-container">

          <div className="section-head" data-reveal>
            <span className="section-label">WHAT WE DO</span>
            <h2 className="section-title">
              Technology Solutions for <em>Modern Businesses</em>
            </h2>
            <p className="section-description">
              From a simple business website to a complete AI-powered
              platform, we design and develop solutions based on your
              business requirements.
            </p>
          </div>

          <div className="grid grid--4">
            {services.map((service, i) => (
              <Link
                to={service.link}
                key={service.title}
                className="glow-card service-card spotlight"
                data-reveal
                onMouseMove={handleSpotlight}
                style={{ "--i": i }}
              >
                <span className="card-tag">{service.tag}</span>
                <div className="glow-card-icon">
                  <i className={service.icon} />
                </div>
                <h5>{service.title}</h5>
                <p>{service.description}</p>
                <span className="glow-card-link">
                  Learn More <i className="bi bi-arrow-right" />
                </span>
                <span className="card-corner card-corner--tl" />
                <span className="card-corner card-corner--br" />
              </Link>
            ))}
          </div>

        </div>
      </section>

      {/* =====================================================
          BUSINESS SOLUTIONS
      ===================================================== */}
      <section className="section section--soft">
        <div className="home-container">

          <div className="section-split" data-reveal>
            <div>
              <span className="section-label">BUSINESS SOLUTIONS</span>
              <h2 className="section-title">
                Software That Solves <em>Real Business Problems</em>
              </h2>
            </div>
            <p className="section-description">
              Every business has different processes. We develop
              customized software that simplifies operations,
              improves productivity and gives you better control.
            </p>
          </div>

          <div className="grid grid--3">
            {businessSolutions.map((item, i) => (
              <div
                key={item.title}
                className="glow-card biz-card spotlight"
                data-reveal
                onMouseMove={handleSpotlight}
                style={{ "--i": i }}
              >
                <div className="glow-card-icon">
                  <i className={item.icon} />
                </div>
                <h6>{item.title}</h6>
                <p>{item.description}</p>
                <span className="card-corner card-corner--tr" />
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* =====================================================
          AI & AUTOMATION
      ===================================================== */}
      <section className="section ai-section">
        <div className="home-container">
          <div className="ai-grid">

            <div className="ai-visual" data-reveal>
              <div className="code-window code-window--ai">
                <div className="code-window-head">
                  <div className="window-dots"><span /><span /><span /></div>
                  <span className="code-window-url">AI Automation</span>
                </div>
                <div className="code-window-body">
                  <div className="code-window-icon">
                    <i className="bi bi-stars" />
                    <span className="code-window-icon-ring" />
                  </div>
                  <h4>Make Your Business Smarter</h4>
                  <p>
                    Integrate AI into your existing business processes
                    and applications.
                  </p>

                  <div className="ai-checklist">
                    {aiSolutions.slice(0, 4).map((item) => (
                      <div key={item} className="check-item">
                        <i className="bi bi-check-circle-fill" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  <div className="ai-bars">
                    {[92, 78, 86, 64].map((v, i) => (
                      <span key={i} className="ai-bar">
                        <span style={{ height: `${v}%` }} />
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="ai-copy" data-reveal>
              <span className="section-label">AI & AUTOMATION</span>
              <h2 className="section-title">
                Bring Artificial Intelligence <em>Into Your Business</em>
              </h2>
              <p className="section-description">
                We develop practical AI and Generative AI solutions
                that automate repetitive tasks, improve customer
                experience and help businesses make better decisions.
              </p>

              <div className="check-grid">
                {aiSolutions.map((item) => (
                  <div key={item} className="check-item">
                    <i className="bi bi-check-circle-fill" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <Link to="/services/genai" className="home-btn home-btn--primary">
                Explore AI Solutions
                <i className="bi bi-arrow-right" />
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* =====================================================
          TECHNOLOGY STACK (marquee)
      ===================================================== */}
      <section className="section section--soft tech-section">
        <div className="home-container section-head section-head--center" data-reveal>
          <span className="section-label">TECHNOLOGY</span>
          <h2 className="section-title">Built With <em>Modern Technologies</em></h2>
          <p className="section-description">
            We choose the right technology according to the
            requirements, scale and future growth of your project.
          </p>
        </div>

        <div className="marquee" aria-hidden="true">
          <div className="marquee-track">
            {[...techStack, ...techStack].map((tech, i) => (
              <span key={i} className="tech-chip">
                <i className="bi bi-braces" />
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="home-container">
          <div className="tech-grid" data-reveal>
            {techStack.map((tech) => (
              <span key={tech} className="tech-chip tech-chip--static">
                <i className="bi bi-braces" />
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          INDUSTRIES
      ===================================================== */}
      <section className="section">
        <div className="home-container">

          <div className="section-head section-head--center" data-reveal>
            <span className="section-label">INDUSTRIES</span>
            <h2 className="section-title">
              Solutions Across <em>Multiple Industries</em>
            </h2>
          </div>

          <div className="industry-grid">
            {industries.map((industry, i) => (
              <div
                key={industry.title}
                className="industry-card spotlight"
                data-reveal
                onMouseMove={handleSpotlight}
                style={{ "--i": i }}
              >
                <span className="industry-icon">
                  <i className={industry.icon} />
                </span>
                <h6>{industry.title}</h6>
                <span className="industry-count">{industry.count}</span>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* =====================================================
          STUDENTS & CAREER
      ===================================================== */}
      <section className="section">
        <div className="home-container">
          <div className="student-panel" data-reveal>

            <div className="student-copy">
              <span className="section-label">STUDENTS & CAREER</span>
              <h2 className="section-title">
                Learn. Build. <em>Get Industry Ready.</em>
              </h2>
              <p className="section-description">
                Along with business technology solutions, Capware
                helps students gain practical experience through
                internships, workshops, training and guided
                final-year projects.
              </p>

              <div className="check-grid">
                <div className="check-item"><i className="bi bi-check-circle-fill" /><span>Industry Internships</span></div>
                <div className="check-item"><i className="bi bi-check-circle-fill" /><span>Technical Workshops</span></div>
                <div className="check-item"><i className="bi bi-check-circle-fill" /><span>Final-Year Projects</span></div>
                <div className="check-item"><i className="bi bi-check-circle-fill" /><span>Project Guidance</span></div>
              </div>

              <Link to="/internships" className="home-btn home-btn--primary">
                Explore Student Programs
                <i className="bi bi-arrow-right" />
              </Link>
            </div>

            <div className="student-card">
              <div className="student-card-icon">
                <i className="bi bi-mortarboard" />
              </div>
              <h4>Capware Learning</h4>
              <p>
                Practical learning programs designed around
                real technologies and real development workflows.
              </p>

              <ul className="student-list">
                <li><span>Internships</span><strong>Available</strong></li>
                <li><span>Workshops</span><strong>Available</strong></li>
                <li><span>Project Guidance</span><strong>Available</strong></li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* =====================================================
          PROCESS
      ===================================================== */}
      <section className="section section--soft">
        <div className="home-container">

          <div className="section-head section-head--center" data-reveal>
            <span className="section-label">OUR PROCESS</span>
            <h2 className="section-title">From Idea to <em>Digital Product</em></h2>
          </div>

          <div className="process-grid">
            {processSteps.map((step, i) => (
              <div
                key={step.number}
                className="process-card spotlight"
                data-reveal
                onMouseMove={handleSpotlight}
                style={{ "--i": i }}
              >
                <span className="process-number">{step.number}</span>
                <span className="process-icon">
                  <i className={step.icon} />
                </span>
                <h5>{step.title}</h5>
                <p>{step.text}</p>
                {i < processSteps.length - 1 && (
                  <span className="process-connector" aria-hidden="true" />
                )}
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* =====================================================
          WHY CAPWARE
      ===================================================== */}
      <section className="section">
        <div className="home-container why-grid">

          <div className="why-copy" data-reveal>
            <span className="section-label">WHY CAPWARE</span>
            <h2 className="section-title">
              Technology Built <em>Around Your Needs</em>
            </h2>
            <p className="section-description">
              We don't believe in one-size-fits-all solutions.
              Our approach focuses on understanding your
              requirements and creating technology that fits
              your business, organization or idea.
            </p>

            <Link to="/about" className="home-btn home-btn--ghost">
              About Capware
              <i className="bi bi-arrow-right" />
            </Link>
          </div>

          <div className="why-cards">
            {[
              { icon: "bi bi-lightbulb",     t: "Idea to Product",      s: "Turn your concept into a working digital product." },
              { icon: "bi bi-code-square",   t: "Custom Development",   s: "Solutions designed around your requirements." },
              { icon: "bi bi-rocket-takeoff",t: "Modern Technology",    s: "Scalable applications using modern technology." },
              { icon: "bi bi-headset",       t: "Technical Support",    s: "Support even after your product goes live." },
            ].map((card, i) => (
              <div
                key={card.t}
                className="glow-card why-card spotlight"
                data-reveal
                onMouseMove={handleSpotlight}
                style={{ "--i": i }}
              >
                <div className="glow-card-icon"><i className={card.icon} /></div>
                <h6>{card.t}</h6>
                <p>{card.s}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* =====================================================
          FINAL CTA
      ===================================================== */}
      <section className="section">
        <div className="home-container">
          <div className="cta-panel" data-reveal>
            <span className="cta-glow cta-glow--a" aria-hidden="true" />
            <span className="cta-glow cta-glow--b" aria-hidden="true" />
            <span className="cta-beam" aria-hidden="true" />

            <span className="cta-badge">
              <i className="bi bi-stars" /> LET'S BUILD SOMETHING
            </span>
            <h2>
              Have an Idea?
              <span>Let's Turn It Into Reality.</span>
            </h2>
            <p>
              Tell us about your website, application, software
              or AI idea and let's discuss how we can build it.
            </p>

            <div className="cta-actions">
              <Link to="/contact" className="home-btn home-btn--light">
                Start a Conversation
                <i className="bi bi-arrow-right" />
                <span className="home-btn-shine" aria-hidden="true" />
              </Link>
              <Link to="/services" className="home-btn home-btn--outline">
                Explore Services
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;