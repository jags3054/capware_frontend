
import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "../styles/Services.css";

const Services = () => {
  /* ---------------------------------------------------------------
     Services data
  ---------------------------------------------------------------- */
  const services = [
    {
      id: "website-development",
      title: "Website Development",
      description:
        "Responsive and modern websites for businesses, colleges, startups and organizations.",
      icon: "bi-globe2",
      link: "/services/website",
      tag: "Web",
      points: [
        "Business Websites",
        "College Websites",
        "Portfolio Websites",
        "Custom Web Applications",
      ],
    },
    {
      id: "mobile-app-development",
      title: "Mobile App Development",
      description:
        "Build modern Android and cross-platform mobile applications using practical technologies.",
      icon: "bi-phone",
      link: "/services/mobile",
      tag: "Mobile",
      points: [
        "Android Applications",
        "React Native Apps",
        "Business Apps",
        "Booking & Service Apps",
      ],
    },
    {
      id: "desktop-billing-software",
      title: "Desktop & Billing Software",
      description:
        "Custom software solutions for shops, businesses, institutes and organizations.",
      icon: "bi-pc-display",
      link: "/services/software",
      tag: "Software",
      points: [
        "Billing Software",
        "Inventory Management",
        "Business Software",
        "Custom Desktop Applications",
      ],
    },
    {
      id: "genai-solutions",
      title: "GenAI Solutions",
      description:
        "AI-powered applications, automation and intelligent solutions for modern businesses.",
      icon: "bi-stars",
      link: "/services/genai",
      tag: "AI",
      points: [
        "AI Chatbots",
        "AI Automation",
        "Document Intelligence",
        "Custom GenAI Solutions",
      ],
    },
  ];

  const studentTracks = [
    { icon: "bi-cpu", title: "AI / ML Projects", count: "40+" },
    { icon: "bi-code-slash", title: "Full Stack Projects", count: "60+" },
    { icon: "bi-phone", title: "Mobile Projects", count: "25+" },
    { icon: "bi-stars", title: "GenAI Projects", count: "18+" },
  ];

  const processSteps = [
    {
      number: "01",
      title: "Understand Requirements",
      text: "We understand your idea, requirements and expected outcome.",
    },
    {
      number: "02",
      title: "Plan & Develop",
      text: "The solution is designed and developed using suitable technologies.",
    },
    {
      number: "03",
      title: "Test & Deploy",
      text: "We test the application and prepare it for deployment.",
    },
    {
      number: "04",
      title: "Support & Handover",
      text: "Receive the final solution with required guidance and support.",
    },
  ];

  const benefits = [
    {
      icon: "bi-person-check",
      title: "Personalized Support",
      text: "Solutions and guidance based on your specific requirements.",
    },
    {
      icon: "bi-code-square",
      title: "Modern Technology",
      text: "Practical technology stacks selected for the project requirements.",
    },
    {
      icon: "bi-cloud-check",
      title: "Deployment Support",
      text: "Assistance with hosting, deployment and getting your application online.",
    },
    {
      icon: "bi-headset",
      title: "Continued Support",
      text: "Assistance even after the initial development process.",
    },
  ];

  /* ---------------------------------------------------------------
     Scroll reveal
  ---------------------------------------------------------------- */
  const pageRef = useRef(null);

  useEffect(() => {
    const nodes = pageRef.current?.querySelectorAll("[data-reveal]") ?? [];

    if (!("IntersectionObserver" in window)) {
      nodes.forEach((node) => node.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    nodes.forEach((node) => observer.observe(node));

    return () => observer.disconnect();
  }, []);

  /* ---------------------------------------------------------------
     Card spotlight effect
  ---------------------------------------------------------------- */
  const handleSpotlight = (event) => {
    const element = event.currentTarget;
    const rect = element.getBoundingClientRect();

    element.style.setProperty("--mx", `${event.clientX - rect.left}px`);
    element.style.setProperty("--my", `${event.clientY - rect.top}px`);
  };

  /* ---------------------------------------------------------------
     Render
  ---------------------------------------------------------------- */
  return (
    <div className="services-page" ref={pageRef}>
      {/* HERO */}
      <section className="services-hero">
        <div className="services-hero-bg" aria-hidden="true">
          <span className="services-orb services-orb--a" />
          <span className="services-orb services-orb--b" />
          <span className="services-orb services-orb--c" />
          <span className="services-grid-bg" />
        </div>

        <div className="services-container">
          <div className="services-hero-inner">
            <span className="services-hero-badge" data-reveal>
              <span className="services-hero-dot" />
              CAPWARE SERVICES
            </span>

            <h1 className="services-hero-title" data-reveal>
              Technology Solutions
              <span className="services-hero-gradient">
                Built for Your Needs
              </span>
            </h1>

            <p className="services-hero-text" data-reveal>
              From websites and mobile applications to AI-powered solutions
              and custom software, Capware Systems helps businesses and
              students turn ideas into working technology.
            </p>

            <div className="services-hero-actions" data-reveal>
              <Link
                to="/contact"
                className="services-btn services-btn--primary"
              >
                Start a Project
                <i className="bi bi-arrow-right" />
              </Link>

              <Link
                to="/projects"
                className="services-btn services-btn--ghost"
              >
                Explore Projects
                <i className="bi bi-collection" />
              </Link>
            </div>

            <div className="services-hero-meta" data-reveal>
              <div className="services-hero-meta-item">
                <i className="bi bi-shield-check" />
                <span>NDA & IP protection</span>
              </div>

              <div className="services-hero-meta-item">
                <i className="bi bi-clock-history" />
                <span>On-time delivery</span>
              </div>

              <div className="services-hero-meta-item">
                <i className="bi bi-life-preserver" />
                <span>Post-launch support</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="services-section">
        <div className="services-container">
          <div className="services-section-head" data-reveal>
            <span className="section-label">WHAT WE DO</span>

            <h2 className="section-title">
              Our <em>Technology Services</em>
            </h2>

            <p className="section-description">
              Practical technology solutions designed around your
              requirements, budget and goals.
            </p>
          </div>

          <div className="services-grid services-grid--2">
            {services.map((service) => (
              <div
                key={service.id}
                className="glow-card service-main-card spotlight"
                data-reveal
                onMouseMove={handleSpotlight}
              >
                <span className="service-tag">{service.tag}</span>

                <div className="glow-card-icon service-main-icon">
                  <i className={`bi ${service.icon}`} />
                </div>

                <h3>{service.title}</h3>
                <p>{service.description}</p>

                <ul className="service-points">
                  {service.points.map((point) => (
                    <li key={point}>
                      <i className="bi bi-check-circle-fill" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>

                {/* Existing service details link */}
                <Link to={service.link} className="glow-card-link">
                  Explore Service
                  <i className="bi bi-arrow-right" />
                </Link>

                {/* New enrollment link */}
                <Link
                  to={`/register?type=service&serviceId=${encodeURIComponent(
                    service.id
                  )}&serviceName=${encodeURIComponent(service.title)}`}
                  className="services-btn services-btn--primary service-enroll-btn"
                >
                  Enroll Now
                  <i className="bi bi-arrow-right-circle" />
                </Link>

                <span className="card-corner card-corner--tl" />
                <span className="card-corner card-corner--br" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STUDENT SOLUTIONS + PROCESS */}
      <section className="services-section services-section--soft">
        <div className="services-container">
          <div className="student-grid">
            <div className="student-copy" data-reveal>
              <span className="section-label">FOR STUDENTS</span>

              <h2 className="section-title">
                Build Your Final-Year Project <em>With Confidence</em>
              </h2>

              <p className="section-description">
                Capware provides practical project guidance for students
                who want to build meaningful academic and industry-oriented
                projects.
              </p>

              <div className="student-tracks">
                {studentTracks.map((track) => (
                  <div
                    key={track.title}
                    className="student-track spotlight"
                    onMouseMove={handleSpotlight}
                  >
                    <span className="student-track-icon">
                      <i className={`bi ${track.icon}`} />
                    </span>

                    <span className="student-track-text">
                      <strong>{track.title}</strong>
                      <small>{track.count} delivered</small>
                    </span>
                  </div>
                ))}
              </div>

              <Link
                to="/projects"
                className="services-btn services-btn--primary"
              >
                Explore Final Year Projects
                <i className="bi bi-arrow-right" />
              </Link>
            </div>

            <div className="student-panel-right" data-reveal>
              <div className="process-panel">
                <span className="section-label">OUR PROCESS</span>

                <h3>
                  From Idea to <em>Working Product</em>
                </h3>

                <div className="process-timeline">
                  {processSteps.map((step, index) => (
                    <div
                      key={step.number}
                      className="process-row"
                      style={{ "--i": index }}
                    >
                      <span className="process-row-number">
                        {step.number}
                      </span>

                      <div className="process-row-body">
                        <h6>{step.title}</h6>
                        <p>{step.text}</p>
                      </div>

                      {index < processSteps.length - 1 && (
                        <span
                          className="process-row-line"
                          aria-hidden="true"
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY CAPWARE */}
      <section className="services-section">
        <div className="services-container">
          <div
            className="services-section-head services-section-head--center"
            data-reveal
          >
            <span className="section-label">WHY CAPWARE</span>

            <h2 className="section-title">
              More Than Just <em>Development</em>
            </h2>

            <p className="section-description">
              We pair engineering skill with a support mindset so your
              product keeps working long after launch.
            </p>
          </div>

          <div className="services-grid services-grid--4">
            {benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="glow-card benefit-card spotlight"
                data-reveal
                onMouseMove={handleSpotlight}
              >
                <div className="glow-card-icon">
                  <i className={`bi ${benefit.icon}`} />
                </div>

                <h5>{benefit.title}</h5>
                <p>{benefit.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="services-section">
        <div className="services-container">
          <div className="services-cta" data-reveal>
            <span className="cta-glow cta-glow--a" aria-hidden="true" />
            <span className="cta-glow cta-glow--b" aria-hidden="true" />

            <span className="services-cta-badge">
              <i className="bi bi-stars" /> HAVE AN IDEA?
            </span>

            <h2>
              Let's Build
              <span>Something Together</span>
            </h2>

            <p>
              Tell us what you want to build and our team will help you
              turn your idea into a practical technology solution.
            </p>

            <div className="services-cta-actions">
              <Link
                to="/contact"
                className="services-btn services-btn--light"
              >
                Discuss Your Project
                <i className="bi bi-arrow-right" />
              </Link>

              <Link
                to="/projects"
                className="services-btn services-btn--outline"
              >
                See Our Work
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
