import React, { useEffect, useRef } from "react";

import { Link } from "react-router-dom";

import "../styles/About.css";



function About() {

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

  /*  Data                                                               */

  /* ------------------------------------------------------------------ */

  const metrics = [

    { value: "50+",  label: "Developers & Engineers Formed" },

    { value: "10+",  label: "Production Architectures Deployed" },

    { value: "100%", label: "Uptime SLA Support" },

    { value: "24/7", label: "Consultative Support" },

  ];



  const platforms = [

    {

      tag: "ERP · Cloud",

      title: "Institutional Leave Hub",

      text:

        "An automated, enterprise cloud infrastructure governing workforce leaves for modern educational systems. Integrated workflow engines ensure strict transparency.",

      icon: "bi-calendar-check",

      link: "/contact",

      cta: "Request Live Demo",

    },

    {

      tag: "ERP · Management",

      title: "School Management System",

      text:

        "A centralized command dashboard unifying academic metrics, automated accounting systems, dynamic portal updates, and deep analytical reports.",

      icon: "bi-building",

      link: "/contact",

      cta: "Request Live Demo",

    },

  ];



  const pillars = [

    {

      icon: "bi-cpu",

      t: "Enterprise Software",

      s: "High-performance custom systems architected for reliability, security and scale.",

    },

    {

      icon: "bi-window-stack",

      t: "Business Applications",

      s: "Billing, inventory, POS and workflow solutions tuned to real operations.",

    },

    {

      icon: "bi-globe2",

      t: "Web & Mobile Platforms",

      s: "Fast, modern, SEO-ready websites and native-grade cross-platform apps.",

    },

    {

      icon: "bi-mortarboard",

      t: "Student Mentorship",

      s: "Structured internship and final-year project programs with real deployment.",

    },

  ];



  return (

    <div className="about-page" ref={pageRef}>



      {/* =====================================================

          HERO

      ===================================================== */}

      <section className="about-hero">

        <div className="about-hero-bg" aria-hidden="true">

          <span className="ab-orb ab-orb--a" />

          <span className="ab-orb ab-orb--b" />

          <span className="ab-orb ab-orb--c" />

          <span className="ab-grid-bg" />

        </div>



        <div className="ab-container">

          <div className="about-hero-inner">



            <div className="about-hero-copy">

              <span className="about-badge" data-reveal>

                <span className="about-badge-dot" />

                ABOUT CAPWARE SYSTEMS PVT LTD

              </span>



              <h1 className="about-hero-title" data-reveal>

                Architecting High-Scale

                <span className="about-hero-gradient">

                  Digital Solutions &amp; Enterprise ERPs.

                </span>

              </h1>



              <p className="about-hero-text" data-reveal>

                Capware Systems provisions reliable software, end-to-end

                business applications, structured student mentorship nodes,

                and performance-tuned school ERP architectures — tailored

                for real-world reliability.

              </p>



              <div className="about-hero-actions" data-reveal>

                <Link to="/services" className="ab-btn ab-btn--primary">

                  Explore Services

                  <i className="bi bi-arrow-right" />

                </Link>



                <Link to="/contact" className="ab-btn ab-btn--ghost">

                  Talk to Us

                  <i className="bi bi-chat-dots" />

                </Link>

              </div>



              <div className="about-hero-stats" data-reveal>

                <div className="about-hero-stat">

                  <i className="bi bi-geo-alt" />

                  <span>Solapur HQ</span>

                </div>

                <div className="about-hero-stat">

                  <i className="bi bi-headset" />

                  <span>Regional Support Hub</span>

                </div>

                <div className="about-hero-stat">

                  <i className="bi bi-shield-check" />

                  <span>Production-Grade Delivery</span>

                </div>

              </div>

            </div>



            {/* Mission card */}

            <div className="about-hero-visual" data-reveal>

              <div className="about-visual-card">

                <div className="about-visual-glow" aria-hidden="true" />



                <div className="about-visual-top">

                  <span className="about-visual-title">

                    <i className="bi bi-cpu" />

                    Core System Platform

                  </span>

                  <span className="about-visual-status">

                    <span className="pulse-dot" />

                    V2 Live

                  </span>

                </div>



                <div className="about-visual-featured">

                  <div className="about-visual-icon">

                    <i className="bi bi-building" />

                    <span className="about-visual-icon-ring" />

                  </div>

                  <div className="about-visual-text">

                    <small>Flagship Product</small>

                    <h4>Campus Cloud ERP</h4>

                  </div>

                </div>



                <p className="about-visual-tagline">

                  Integrated Full-Stack Solutions Partner.

                </p>



                <div className="about-visual-mini-grid">

                  <div className="about-visual-mini">

                    <i className="bi bi-cloud" />

                    <strong>Campus</strong>

                    <small>Cloud ERP</small>

                  </div>

                  <div className="about-visual-mini">

                    <i className="bi bi-globe2" />

                    <strong>Web</strong>

                    <small>Framework</small>

                  </div>

                  <div className="about-visual-mini">

                    <i className="bi bi-phone" />

                    <strong>Mobile</strong>

                    <small>Layers</small>

                  </div>

                  <div className="about-visual-mini">

                    <i className="bi bi-mortarboard" />

                    <strong>Mentor</strong>

                    <small>Programs</small>

                  </div>

                </div>



                <div className="about-visual-progress">

                  <div className="about-visual-progress-head">

                    <span>Production Deployments</span>

                    <strong>10+</strong>

                  </div>

                  <div className="about-visual-progress-bar">

                    <span />

                  </div>

                </div>

              </div>



              <span className="ab-float ab-float--1">

                <i className="bi bi-award" /> Enterprise grade

              </span>

              <span className="ab-float ab-float--2">

                <i className="bi bi-rocket-takeoff" /> Production ready

              </span>

            </div>



          </div>

        </div>

      </section>



      {/* =====================================================

          METRICS STRIP

      ===================================================== */}

      <section className="about-section about-section--metrics">

        <div className="ab-container">

          <div className="about-metrics-grid">

            {metrics.map((m) => (

              <div

                key={m.label}

                className="about-metric spotlight"

                data-reveal

                onMouseMove={handleSpotlight}

              >

                <strong>{m.value}</strong>

                <span>{m.label}</span>

              </div>

            ))}

          </div>

        </div>

      </section>



      {/* =====================================================

          WHO WE ARE

      ===================================================== */}

      <section className="about-section">

        <div className="ab-container">

          <div className="about-who-grid">



            <div className="about-who-copy" data-reveal>

              <span className="section-label">WHO WE ARE</span>

              <h2 className="section-title">

                Practical Technology. <em>Real Learning.</em>

              </h2>

              <p className="section-description">

                Capware Systems is a Solapur-based technology company

                combining enterprise software development with structured

                student mentorship. We help businesses run more efficiently

                and help students become industry-ready engineers.

              </p>

              <p className="section-description">

                Our work spans AI/ML, Generative AI, full-stack web and

                mobile development, desktop and billing software, and

                performance-tuned Campus Cloud ERP architectures for

                educational institutions.

              </p>

              <p className="section-description">

                Whether we're shipping a production ERP for a college or

                mentoring a final-year student through their first real

                deployment, our focus stays the same: build things that

                actually work in the real world.

              </p>

            </div>



            <div className="about-who-cards" data-reveal>

              {[

                {

                  icon: "bi-lightbulb",

                  t: "Learn",

                  s: "Understand technologies through practical implementation.",

                },

                {

                  icon: "bi-code-slash",

                  t: "Build",

                  s: "Develop projects that demonstrate real technical skills.",

                },

                {

                  icon: "bi-cloud-arrow-up",

                  t: "Deploy",

                  s: "Learn how applications move from development to production.",

                },

                {

                  icon: "bi-rocket-takeoff",

                  t: "Grow",

                  s: "Build skills and project experience for future opportunities.",

                },

              ].map((item) => (

                <div

                  key={item.t}

                  className="about-info-card spotlight"

                  onMouseMove={handleSpotlight}

                >

                  <div className="about-info-icon">

                    <i className={`bi ${item.icon}`} />

                  </div>

                  <div className="about-info-text">

                    <h4>{item.t}</h4>

                    <p>{item.s}</p>

                  </div>

                </div>

              ))}

            </div>



          </div>

        </div>

      </section>



      {/* =====================================================

          WHAT WE DO

      ===================================================== */}

      <section className="about-section about-section--soft">

        <div className="ab-container">



          <div className="ab-section-head ab-section-head--center" data-reveal>

            <span className="section-label">WHAT WE DO</span>

            <h2 className="section-title">

              Engineered Systems &amp; <em>Infrastructure</em>

            </h2>

            <p className="section-description">

              High-performance software applications custom-built to

              maximize business operational throughput — for enterprises,

              institutions and students.

            </p>

          </div>



          <div className="about-pillars-grid">

            {pillars.map((p) => (

              <div

                key={p.t}

                className="glow-card about-pillar-card spotlight"

                data-reveal

                onMouseMove={handleSpotlight}

              >

                <div className="glow-card-icon">

                  <i className={`bi ${p.icon}`} />

                </div>

                <h4>{p.t}</h4>

                <p>{p.s}</p>

              </div>

            ))}

          </div>



          <div className="about-services-grid">

            {[

              {

                icon: "bi-globe",

                t: "Website Development",

                s: "Next-gen architecture tailored for maximum speed and SEO dominance.",

                link: "/services/website",

                cta: "Learn More",

                tag: "Web",

              },

              {

                icon: "bi-phone",

                t: "Mobile App Development",

                s: "Native-grade iOS & Android architectures delivering flawless experiences.",

                link: "/services/mobile",

                cta: "Learn More",

                tag: "Mobile",

              },

              {

                icon: "bi-window-stack",

                t: "Desktop & Billing",

                s: "High-throughput POS, billing and system-level inventory trackers.",

                link: "/services/software",

                cta: "Learn More",

                tag: "Software",

              },

              {

                icon: "bi-stars",

                t: "Generative AI",

                s: "AI-powered applications, chatbots, automation and LLM-based solutions.",

                link: "/services/genai",

                cta: "Learn More",

                tag: "GenAI",

              },

              {

                icon: "bi-mortarboard",

                t: "Internships",

                s: "Real ecosystem immersion featuring direct project contributions.",

                link: "/internships",

                cta: "Explore Internships",

                tag: "Students",

              },

              {

                icon: "bi-code-square",

                t: "Final Year Projects",

                s: "End-to-end consulting spanning system design, documentation and deployment.",

                link: "/projects",

                cta: "Explore Projects",

                tag: "Projects",

              },

            ].map((svc) => (

              <Link

                key={svc.t}

                to={svc.link}

                className="glow-card about-service-card spotlight"

                data-reveal

                onMouseMove={handleSpotlight}

              >

                <span className="service-tag">{svc.tag}</span>

                <div className="glow-card-icon">

                  <i className={`bi ${svc.icon}`} />

                </div>

                <h4>{svc.t}</h4>

                <p>{svc.s}</p>

                <span className="glow-card-link">

                  {svc.cta} <i className="bi bi-arrow-right" />

                </span>

                <span className="card-corner card-corner--tl" />

                <span className="card-corner card-corner--br" />

              </Link>

            ))}

          </div>



        </div>

      </section>



      {/* =====================================================

          LIVE PRODUCTION PLATFORMS

      ===================================================== */}

      <section className="about-section">

        <div className="ab-container">



          <div className="ab-section-head ab-section-head--center" data-reveal>

            <span className="section-label">VERIFIED ECOSYSTEM PROOFS</span>

            <h2 className="section-title">

              Active <em>Production Registries</em>

            </h2>

            <p className="section-description">

              Live functional systems running in real institutions —

              built and supported by the Capware engineering team.

            </p>

          </div>



          <div className="about-platforms-grid">

            {platforms.map((p, i) => (

              <div

                key={p.title}

                className="glow-card about-platform-card spotlight"

                data-reveal

                onMouseMove={handleSpotlight}

              >

                <div className="about-platform-head">

                  <span className="about-platform-node">

                    Capware Source Node // {String(i + 1).padStart(2, "0")}

                  </span>

                  <span className="service-tag">{p.tag}</span>

                </div>



                <div className="glow-card-icon">

                  <i className={`bi ${p.icon}`} />

                </div>



                <h3>{p.title}</h3>

                <p>{p.text}</p>



                <Link to={p.link} className="glow-card-link">

                  {p.cta} <i className="bi bi-arrow-right" />

                </Link>



                <span className="card-corner card-corner--tl" />

                <span className="card-corner card-corner--br" />

              </div>

            ))}

          </div>



        </div>

      </section>



      {/* =====================================================

          WHY CAPWARE

      ===================================================== */}

      <section className="about-section about-section--soft">

        <div className="ab-container">



          <div className="ab-section-head ab-section-head--center" data-reveal>

            <span className="section-label">WHY CAPWARE</span>

            <h2 className="section-title">

              Focused on <em>Practical Outcomes</em>

            </h2>

            <p className="section-description">

              Four commitments we build into every project and every

              student journey we work on.

            </p>

          </div>



          <div className="about-benefits-grid">

            {[

              {

                n: "01",

                icon: "bi-person-workspace",

                t: "Mentorship",

                s: "Guidance throughout the development journey.",

              },

              {

                n: "02",

                icon: "bi-github",

                t: "GitHub",

                s: "Learn professional source-code management workflows.",

              },

              {

                n: "03",

                icon: "bi-rocket",

                t: "Deployment",

                s: "Understand how projects are prepared for real usage.",

              },

              {

                n: "04",

                icon: "bi-mic",

                t: "Viva Support",

                s: "Documentation and presentation preparation support.",

              },

            ].map((item, i) => (

              <div

                key={item.n}

                className="about-benefit spotlight"

                data-reveal

                onMouseMove={handleSpotlight}

              >

                <span className="about-benefit-number">{item.n}</span>



                <span className="about-benefit-icon">

                  <i className={`bi ${item.icon}`} />

                </span>



                <h4>{item.t}</h4>

                <p>{item.s}</p>



                {i < 3 && (

                  <span className="about-benefit-arrow" aria-hidden="true">

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

      <section className="about-cta-section">

        <div className="ab-container">

          <div className="about-cta-box" data-reveal>

            <span className="about-cta-glow about-cta-glow--a" aria-hidden="true" />

            <span className="about-cta-glow about-cta-glow--b" aria-hidden="true" />



            <div className="about-cta-copy">

              <span className="about-cta-badge">

                <i className="bi bi-stars" /> READY TO INITIALIZE

              </span>



              <h2>

                Ready to Scope Your

                <span>Next Technical Blueprint?</span>

              </h2>



              <p>

                Let our solutions consultants map, scope and deliver your

                technical architectural goals — or help you pick the right

                internship or project track.

              </p>

            </div>



            <div className="about-cta-actions">

              <Link to="/contact" className="ab-btn ab-btn--light">

                Start a Conversation

                <i className="bi bi-arrow-right" />

              </Link>

              <Link to="/services" className="ab-btn ab-btn--outline">

                Explore Services

              </Link>

            </div>

          </div>

        </div>

      </section>



    </div>

  );

}



export default About;