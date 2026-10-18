import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/MobileInternship.css";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */
const curriculum = [
  {
    week: "Week 1",
    title: "Mobile Development & React Native Basics",
    topics: [
      "Introduction to mobile app development",
      "React Native architecture",
      "Expo setup and project structure",
      "Components and JSX",
    ],
  },
  {
    week: "Week 2",
    title: "JavaScript & React Fundamentals",
    topics: [
      "Modern JavaScript",
      "Variables, functions and arrays",
      "React components",
      "Props and state",
      "Hooks",
    ],
  },
  {
    week: "Week 3",
    title: "React Native UI Development",
    topics: [
      "Views and layouts",
      "Text, Image and ScrollView",
      "FlatList",
      "Forms and input components",
      "Responsive mobile UI",
    ],
  },
  {
    week: "Week 4",
    title: "Navigation & API Integration",
    topics: [
      "React Navigation",
      "Navigation stacks",
      "Forms and validation",
      "REST API integration",
      "Axios and API handling",
    ],
  },
  {
    week: "Week 5",
    title: "Backend Development",
    topics: [
      "Node.js fundamentals",
      "Express.js",
      "REST API development",
      "Authentication APIs",
      "Connecting mobile apps with backend",
    ],
  },
  {
    week: "Week 6",
    title: "Database & Authentication",
    topics: [
      "MongoDB fundamentals",
      "CRUD operations",
      "User authentication",
      "JWT authentication",
      "Firebase introduction",
    ],
  },
  {
    week: "Week 7",
    title: "Real-World Project Development",
    topics: [
      "Project architecture",
      "Frontend development",
      "Backend integration",
      "Database integration",
      "Testing and debugging",
    ],
  },
  {
    week: "Week 8",
    title: "Testing, APK & Project Completion",
    topics: [
      "Application testing",
      "Bug fixing",
      "Building APK",
      "Project documentation",
      "Viva preparation",
      "Certificate completion",
    ],
  },
];

const plans = [
  {
    name: "Basic",
    price: 1999,
    description: "Start building mobile apps with guided project support.",
    features: [
      "React Native fundamentals",
      "Expo setup and configuration",
      "Mobile UI development",
      "Navigation and forms",
      "Basic API integration guidance",
      "Project source code explanation",
      "Documentation and presentation support"
    ]
  },
  {
    name: "Internship",
    price: 2999,
    popular: true,
    description: "Complete 8-week Mobile App Development Internship.",
    features: [
      "8-week internship training",
      "React Native and Expo",
      "JavaScript and React fundamentals",
      "Responsive mobile UI development",
      "Navigation and API integration",
      "Node.js and Express.js",
      "MongoDB and CRUD operations",
      "Authentication and JWT basics",
      "GitHub project support",
      "APK/build preparation guidance",
      "Documentation and viva preparation",
      "Internship completion certificate"
    ]
  },
  {
    name: "Advanced",
    price: 4999,
    description: "Build a more complete mobile application with advanced guidance.",
    features: [
      "Everything in Internship",
      "Customized mobile application project",
      "Advanced API integration",
      "Authentication and protected screens",
      "Database-driven application features",
      "Backend integration support",
      "Advanced project debugging",
      "APK build and deployment guidance",
      "Personalized documentation",
      "Advanced presentation and viva preparation"
    ]
  }
];

const technologies = [
  "React Native",
  "Expo",
  "JavaScript",
  "React.js",
  "Node.js",
  "Express.js",
  "MongoDB",
  "REST API",
  "Firebase",
  "Git & GitHub",
];

const projects = [
  {
    icon: "bi-truck",
    title: "Delivery App",
    description: "Build a real-world delivery application with customer, order and delivery workflows.",
    tag: "Logistics",
  },
  {
    icon: "bi-calendar-check",
    title: "Appointment Booking App",
    description: "Create an appointment booking application with users, services and booking management.",
    tag: "Booking",
  },
  {
    icon: "bi-calendar-event",
    title: "Event Booking App",
    description: "Develop an event discovery and booking application with registration and booking management.",
    tag: "Events",
  },
  {
    icon: "bi-cart3",
    title: "E-Commerce App",
    description: "Build a mobile shopping application with products, cart, orders and user authentication.",
    tag: "Retail",
  },
  {
    icon: "bi-mortarboard",
    title: "College Student App",
    description: "Create a student application for notices, attendance, timetable, results and academic information.",
    tag: "EdTech",
  },
  {
    icon: "bi-egg-fried",
    title: "Restaurant App",
    description: "Develop a food ordering application with menus, cart, orders and restaurant management.",
    tag: "Food",
  },
  {
    icon: "bi-person-badge",
    title: "Driver / Partner App",
    description: "Build a driver-side application for online/offline status, bookings and trip management.",
    tag: "Partner",
  },
  {
    icon: "bi-book",
    title: "Learning App",
    description: "Create an educational mobile application with courses, lessons, videos and student progress.",
    tag: "Learning",
  },
];

const benefits = [
  {
    icon: "bi-phone",
    title: "Mobile Development",
    text: "Learn how to create modern cross-platform applications using React Native and Expo.",
    tag: "Mobile",
  },
  {
    icon: "bi-code-slash",
    title: "Hands-on Coding",
    text: "Practice concepts through actual application development instead of only theoretical learning.",
    tag: "Build",
  },
  {
    icon: "bi-server",
    title: "Backend Integration",
    text: "Understand APIs, Node.js, Express.js, MongoDB and authentication.",
    tag: "Backend",
  },
  {
    icon: "bi-github",
    title: "GitHub Project",
    text: "Learn Git and GitHub workflows and maintain your project in a professional manner.",
    tag: "Git",
  },
  {
    icon: "bi-box-arrow-up",
    title: "APK / Build",
    text: "Learn the application build process and prepare a mobile application build for testing and demonstration.",
    tag: "Deploy",
  },
  {
    icon: "bi-award",
    title: "Internship Certificate",
    text: "Complete the internship requirements and receive a certificate from Capware Systems.",
    tag: "Reward",
  },
];

const roadmap = [
  { number: "01", title: "Learn",   text: "Understand JavaScript, React and React Native fundamentals.",      icon: "bi-book" },
  { number: "02", title: "Build",   text: "Develop screens, navigation, forms and application features.",     icon: "bi-phone" },
  { number: "03", title: "Connect", text: "Integrate APIs, backend services, authentication and MongoDB.",   icon: "bi-diagram-3" },
  { number: "04", title: "Deploy",  text: "Test your application and prepare an APK/build.",                 icon: "bi-cloud-arrow-up" },
  { number: "05", title: "Present", text: "Complete documentation, PPT and viva preparation.",               icon: "bi-easel" },
];

const faqs = [
  {
    question: "Who can join the Mobile App Development Internship?",
    answer: "Students from BCA, MCA, B.Tech, BE, BSc CS, MSc CS and related computer science backgrounds can join.",
  },
  {
    question: "Do I need previous React Native experience?",
    answer: "No. The internship starts with the fundamentals and gradually moves toward real-world application development.",
  },
  {
    question: "Will I build a real mobile application?",
    answer: "Yes. You will work on a practical project and learn how frontend, backend, APIs and databases work together.",
  },
  {
    question: "Will backend development be included?",
    answer: "Yes. The program covers Node.js, Express.js, REST APIs, MongoDB and authentication.",
  },
  {
    question: "Will I get an APK?",
    answer: "The internship includes learning the mobile build process and preparing an APK/build of your project.",
  },
  {
    question: "Will I get GitHub project support?",
    answer: "Yes. Git and GitHub workflows are included so that you can maintain and showcase your project properly.",
  },
  {
    question: "Will I receive a certificate?",
    answer: "Yes. After completing the internship requirements and project work, you will receive an internship certificate.",
  },
  {
    question: "Can this internship be used for a final-year project?",
    answer: "Yes. Students can use suitable project ideas as the foundation for their academic final-year project with proper guidance and customization.",
  },
];

const metrics = [
  { value: "8",    label: "Weeks Program" },
  { value: "10",   label: "Technologies" },
  { value: "1",    label: "Real App" },
  { value: "100%", label: "Hands-On" },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */
function MobileInternship() {
  /* ---- Reveal + spotlight ---- */
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

  /* ---- FAQ (React-controlled) ---- */
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <div className="mobile-internship-page" ref={pageRef}>

      {/* =====================================================
          HERO
      ===================================================== */}
      <section className="mobile-internship-hero">
        <div className="mobile-internship-bg" aria-hidden="true">
          <span className="mi-orb mi-orb--a" />
          <span className="mi-orb mi-orb--b" />
          <span className="mi-orb mi-orb--c" />
          <span className="mi-grid-bg" />
        </div>

        <div className="mi-container">
          <div className="mobile-internship-hero-inner">

            <div className="mobile-internship-hero-copy">
              <span className="mobile-internship-badge" data-reveal>
                <span className="mobile-internship-dot" />
                8 WEEK INDUSTRY INTERNSHIP
              </span>

              <h1 className="mobile-internship-title" data-reveal>
                Learn Mobile Development.
                <span className="mobile-internship-gradient">
                  Build Real Apps.
                </span>
              </h1>

              <p className="mobile-internship-text" data-reveal>
                Learn React Native, Expo, Node.js, MongoDB and REST APIs by
                building practical mobile applications with industry-oriented
                guidance.
              </p>

              <div className="mobile-internship-actions" data-reveal>
                <Link to="/register" className="mi-btn mi-btn--primary">
                  Enroll Now
                  <i className="bi bi-arrow-right" />
                </Link>

                <a href="#curriculum" className="mi-btn mi-btn--ghost">
                  View Curriculum
                  <i className="bi bi-list-check" />
                </a>
              </div>

              <div className="mobile-internship-trust" data-reveal>
                <span><i className="bi bi-check-circle-fill" /> Hands-on App Development</span>
                <span><i className="bi bi-check-circle-fill" /> React Native + Expo</span>
                <span><i className="bi bi-check-circle-fill" /> Backend + Database</span>
                <span><i className="bi bi-check-circle-fill" /> Certificate</span>
              </div>
            </div>

            {/* Phone mockup */}
            <div className="mobile-internship-hero-visual" data-reveal>
              <div className="mi-phone-wrap">
                <div className="mi-phone">
                  <span className="mi-phone-notch" />

                  <div className="mi-phone-screen">
                    <div className="mi-phone-status">
                      <span>9:41</span>
                      <div className="mi-phone-status-icons">
                        <i className="bi bi-wifi" />
                        <i className="bi bi-reception-4" />
                        <i className="bi bi-battery-full" />
                      </div>
                    </div>

                    <div className="mi-app-header">
                      <span>My App</span>
                      <span className="mi-app-bell">
                        <i className="bi bi-bell" />
                        <span className="mi-app-bell-dot" />
                      </span>
                    </div>

                    <div className="mi-app-welcome">
                      <small>Welcome back</small>
                      <h5>Build Your Future</h5>
                    </div>

                    <div className="mi-app-card">
                      <div className="mi-app-icon">
                        <i className="bi bi-phone" />
                      </div>
                      <div className="mi-app-card-text">
                        <small>Internship Project</small>
                        <strong>Mobile App</strong>
                      </div>
                    </div>

                    <div className="mi-app-stats">
                      <div className="mi-app-stat">
                        <i className="bi bi-code-slash" />
                        <span>Code</span>
                      </div>
                      <div className="mi-app-stat">
                        <i className="bi bi-cloud" />
                        <span>API</span>
                      </div>
                      <div className="mi-app-stat">
                        <i className="bi bi-database" />
                        <span>DB</span>
                      </div>
                    </div>

                    <div className="mi-phone-button">
                      Start Project
                      <i className="bi bi-arrow-right" />
                    </div>
                  </div>
                </div>

                {/* floating chips */}
                <span className="mi-float mi-float--1">
                  <span className="mi-float-icon">
                    <i className="bi bi-android2" />
                  </span>
                  <span className="mi-float-text">
                    <strong>APK ready</strong>
                    <small>build #42</small>
                  </span>
                </span>

                <span className="mi-float mi-float--2">
                  <span className="mi-float-icon mi-float-icon--green">
                    <i className="bi bi-check-lg" />
                  </span>
                  <span className="mi-float-text">
                    <strong>API connected</strong>
                    <small>200 OK</small>
                  </span>
                </span>
              </div>
            </div>

          </div>

          {/* Metric strip */}
          <div className="mobile-internship-metrics" data-reveal>
            {metrics.map((m) => (
              <div key={m.label} className="mi-metric">
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
      <section id="curriculum" className="mobile-section">
        <div className="mi-container">

          <div className="mi-section-head mi-section-head--center" data-reveal>
            <span className="section-label">WHAT YOU WILL LEARN</span>
            <h2 className="section-title">
              8-Week Mobile App Development <em>Curriculum</em>
            </h2>
            <p className="section-description">
              Start from mobile development fundamentals and gradually build
              complete applications connected to real backend systems.
            </p>
          </div>

          <div className="mi-curriculum-grid">
            {curriculum.map((item, index) => (
              <div
                key={item.week}
                className="glow-card mi-curriculum-card spotlight"
                data-reveal
                onMouseMove={handleSpotlight}
              >
                <div className="mi-curriculum-head">
                  <span className="mi-curriculum-week">{item.week}</span>
                  <span className="mi-curriculum-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <h4>{item.title}</h4>

                <ul className="mi-curriculum-topics">
                  {item.topics.map((topic) => (
                    <li key={topic}>
                      <i className="bi bi-check2" />
                      <span>{topic}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* =====================================================
          TECHNOLOGIES
      ===================================================== */}
      <section id="technologies" className="mobile-section mobile-section--soft tech-section">
        <div className="mi-container mi-section-head mi-section-head--center" data-reveal>
          <span className="section-label">TECH STACK</span>
          <h2 className="section-title">
            Technologies You Will <em>Work With</em>
          </h2>
          <p className="section-description">
            Learn the tools and technologies commonly used to build modern
            cross-platform mobile applications.
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

        <div className="mi-container">
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
          PROJECTS
      ===================================================== */}
      <section id="projects" className="mobile-section">
        <div className="mi-container">

          <div className="mi-section-head mi-section-head--center" data-reveal>
            <span className="section-label">PROJECT DEVELOPMENT</span>
            <h2 className="section-title">
              Build Real <em>Mobile Applications</em>
            </h2>
            <p className="section-description">
              Choose a project based on your interests and develop it with
              frontend, backend, API and database integration.
            </p>
          </div>

          <div className="mi-projects-grid">
            {projects.map((project) => (
              <div
                key={project.title}
                className="glow-card mi-project-card spotlight"
                data-reveal
                onMouseMove={handleSpotlight}
              >
                <span className="service-tag">{project.tag}</span>

                <div className="glow-card-icon">
                  <i className={`bi ${project.icon}`} />
                </div>

                <h4>{project.title}</h4>
                <p>{project.description}</p>

                <span className="glow-card-link">
                  Build this <i className="bi bi-arrow-up-right" />
                </span>

                <span className="card-corner card-corner--tl" />
                <span className="card-corner card-corner--br" />
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* =====================================================
          ROADMAP
      ===================================================== */}
      <section id="roadmap" className="mobile-section mobile-section--soft">
        <div className="mi-container">

          <div className="mi-section-head mi-section-head--center" data-reveal>
            <span className="section-label">LEARNING JOURNEY</span>
            <h2 className="section-title">
              From Beginner to <em>App Developer</em>
            </h2>
            <p className="section-description">
              Five clear milestones that take you from learning the
              fundamentals to presenting a complete mobile application.
            </p>
          </div>

          <div className="mi-roadmap-grid">
            {roadmap.map((step, i) => (
              <div
                key={step.number}
                className="mi-roadmap-card spotlight"
                data-reveal
                onMouseMove={handleSpotlight}
              >
                <span className="mi-roadmap-number">{step.number}</span>

                <span className="mi-roadmap-icon">
                  <i className={`bi ${step.icon}`} />
                </span>

                <h4>{step.title}</h4>
                <p>{step.text}</p>

                {i < roadmap.length - 1 && (
                  <span className="mi-roadmap-arrow" aria-hidden="true">
                    <i className="bi bi-arrow-right" />
                  </span>
                )}
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* =====================================================
          BENEFITS
      ===================================================== */}
      <section id="benefits" className="mobile-section">
        <div className="mi-container">

          <div className="mi-section-head mi-section-head--center" data-reveal>
            <span className="section-label">WHY JOIN</span>
            <h2 className="section-title">
              What You Get From <em>This Internship</em>
            </h2>
          </div>

          <div className="mi-grid mi-grid--3">
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
    INTERNSHIP PACKAGES
===================================================== */}
<section
  id="packages"
  className="mobile-section mobile-section--soft"
>
  <div className="mi-container">
    <div
      className="mi-section-head mi-section-head--center"
      data-reveal
    >
      <span className="section-label">INTERNSHIP PACKAGES</span>

      <h2 className="section-title">
        Choose Your <em>Mobile App Plan</em>
      </h2>

      <p className="section-description">
        Choose the right package for your learning goals,
        project requirements and mobile development journey.
      </p>
    </div>

    <div className="mi-pricing-grid">
      {plans.map((plan) => (
        <div
          key={plan.name}
          className={`mi-pricing-card spotlight ${
            plan.popular ? "is-popular" : ""
          }`}
          data-reveal
          onMouseMove={handleSpotlight}
        >
          {plan.popular && (
            <span className="mi-pricing-popular">
              <i className="bi bi-star-fill" />
              MOST POPULAR
            </span>
          )}

          <h4>{plan.name}</h4>

          <p className="mi-pricing-description">
            {plan.description}
          </p>

          <div className="mi-pricing-amount">
            <span>₹</span>
            {plan.price.toLocaleString("en-IN")}
          </div>

          <span className="mi-pricing-note">
            One-time program fee
          </span>

          <div className="mi-pricing-divider" />

          <ul className="mi-pricing-features">
            {plan.features.map((feature) => (
              <li key={feature}>
                <i className="bi bi-check-circle-fill" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>

          <Link
            to={`/register?package=${encodeURIComponent(
              plan.name
            )}&internship=${encodeURIComponent(
              "Mobile App Development Internship"
            )}`}
            className={`mi-btn ${
              plan.popular
                ? "mi-btn--primary"
                : "mi-btn--ghost"
            } mi-pricing-btn`}
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
      <section id="faq" className="mobile-section mobile-section--soft">
        <div className="mi-container">

          <div className="mi-section-head mi-section-head--center" data-reveal>
            <span className="section-label">FAQ</span>
            <h2 className="section-title">
              Frequently Asked <em>Questions</em>
            </h2>
            <p className="section-description">
              Everything you need to know about the Mobile App internship.
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
      <section id="enroll" className="mobile-section">
        <div className="mi-container">
          <div className="mobile-final-cta" data-reveal>
            <span className="cta-glow cta-glow--a" aria-hidden="true" />
            <span className="cta-glow cta-glow--b" aria-hidden="true" />

            <div className="mobile-final-cta-copy">
              <span className="mobile-final-cta-badge">
                <i className="bi bi-stars" /> START YOUR JOURNEY
              </span>

              <h2>
                Ready to Build Your
                <span>First Real Mobile App?</span>
              </h2>

              <p>
                Learn mobile development, build a practical project and gain
                industry-oriented experience with Capware Systems.
              </p>
            </div>

            <div className="mobile-final-cta-actions">
              <Link to="/register" className="mi-btn mi-btn--light">
                Enroll Now
                <i className="bi bi-arrow-right" />
              </Link>

              <Link to="/projects" className="mi-btn mi-btn--outline">
                Explore Projects
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

export default MobileInternship;