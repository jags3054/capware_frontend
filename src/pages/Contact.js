import React, { useEffect, useRef, useState } from "react";

import axios from "axios";

import { Link } from "react-router-dom";

import "../styles/Contact.css";

function Contact() {

  const [formData, setFormData] = useState({

    name: "",

    email: "",

    mobile: "",

    subject: "",

    message: "",

  });

  const [loading, setLoading] = useState(false);

  const [success, setSuccess] = useState("");

  const [error, setError] = useState("");

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

  /*  Form handlers                                                      */

  /* ------------------------------------------------------------------ */

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value,

    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    setLoading(true);

    setSuccess("");

    setError("");

    try {

      await axios.post("http://localhost:5000/api/contact", formData);

      setSuccess(

        "Thank you! Your message has been submitted successfully. Our team will contact you soon."

      );

      setFormData({

        name: "",

        email: "",

        mobile: "",

        subject: "",

        message: "",

      });

    } catch (err) {

      setError(

        err.response?.data?.message ||

          "Unable to submit your message. Please try again."

      );

    } finally {

      setLoading(false);

    }

  };

  /* ------------------------------------------------------------------ */

  /*  Info tiles data                                                    */

  /* ------------------------------------------------------------------ */

  const infoTiles = [

    {

      icon: "bi-code-square",

      title: "Final Year Projects",

      text: "Need help selecting or developing your project?",

      cta: "Explore Projects",

      link: "/projects",

      tag: "Projects",

    },

    {

      icon: "bi-mortarboard",

      title: "Internships",

      text: "Looking for practical industry-oriented training?",

      cta: "Explore Internships",

      link: "/internships",

      tag: "Students",

    },

    {

      icon: "bi-laptop",

      title: "Business Solutions",

      text: "Need a website, mobile app or software solution?",

      cta: "Explore Services",

      link: "/services",

      tag: "Business",

    },

    {

      icon: "bi-stars",

      title: "AI & GenAI",

      text: "Want to build an AI-powered application?",

      cta: "Explore GenAI",

      link: "/services/genai",

      tag: "AI",

    },

  ];

  /* ------------------------------------------------------------------ */

  /*  Render                                                             */

  /* ------------------------------------------------------------------ */

  return (

    <div className="contact-page" ref={pageRef}>

      {/* =====================================================

          HERO

      ===================================================== */}

      <section className="contact-hero">

        <div className="contact-hero-bg" aria-hidden="true">

          <span className="ct-orb ct-orb--a" />

          <span className="ct-orb ct-orb--b" />

          <span className="ct-orb ct-orb--c" />

          <span className="ct-grid-bg" />

        </div>

        <div className="ct-container">

          <div className="contact-hero-inner">

            <span className="contact-badge" data-reveal>

              <span className="contact-badge-dot" />

              GET IN TOUCH

            </span>

            <h1 className="contact-hero-title" data-reveal>

              Let's Talk About

              <span className="contact-hero-gradient">

                Your Next Project.

              </span>

            </h1>

            <p className="contact-hero-text" data-reveal>

              Have a project idea, internship requirement, business

              requirement or technical question? We'd love to hear from you.

            </p>

            <div className="contact-hero-actions" data-reveal>

              <a href="#contact-form" className="ct-btn ct-btn--primary">

                Send a Message

                <i className="bi bi-send" />

              </a>

              <Link to="/services" className="ct-btn ct-btn--ghost">

                Explore Services

                <i className="bi bi-grid" />

              </Link>

            </div>

            <div className="contact-hero-meta" data-reveal>

              <div className="contact-hero-meta-item">

                <span className="contact-hero-meta-dot" />

                Typically replies within a few hours

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================

          CONTACT AREA

      ===================================================== */}

      <section className="contact-section">

        <div className="ct-container">

          <div className="contact-grid">

            {/* Info column */}

            <div className="contact-info">

              <div className="ct-section-head" data-reveal>

                <span className="section-label">CONTACT CAPWARE</span>

                <h2 className="section-title">

                  How Can <em>We Help?</em>

                </h2>

                <p className="section-description">

                  Tell us what you are looking for and our team will help you

                  understand the next steps.

                </p>

              </div>

              <div className="contact-info-list">

                {infoTiles.map((tile) => (

                  <Link

                    key={tile.title}

                    to={tile.link}

                    className="contact-info-item spotlight"

                    data-reveal

                    onMouseMove={handleSpotlight}

                  >

                    <div className="contact-info-icon">

                      <i className={`bi ${tile.icon}`} />

                    </div>

                    <div className="contact-info-text">

                      <h4>{tile.title}</h4>

                      <p>{tile.text}</p>

                      <span className="contact-info-cta">

                        {tile.cta}

                        <i className="bi bi-arrow-right" />

                      </span>

                    </div>

                    <span className="contact-info-tag">{tile.tag}</span>

                  </Link>

                ))}

              </div>

            </div>

            {/* Form column */}

            <div className="contact-form-wrap" id="contact-form" data-reveal>

              <div className="contact-form-card">

                <div className="contact-form-glow" aria-hidden="true" />

                <div className="contact-form-header">

                  <span className="section-label">SEND A MESSAGE</span>

                  <h3>Tell Us About Your Requirement</h3>

                  <p>Fill in the details below and we'll get back to you.</p>

                </div>

                {success && (

                  <div className="contact-alert contact-alert--success" role="status">

                    <i className="bi bi-check-circle-fill" />

                    <span>{success}</span>

                  </div>

                )}

                {error && (

                  <div className="contact-alert contact-alert--error" role="alert">

                    <i className="bi bi-exclamation-circle-fill" />

                    <span>{error}</span>

                  </div>

                )}

                <form onSubmit={handleSubmit} className="contact-form">

                  <div className="contact-form-row">

                    <div className="contact-field">

                      <label className="contact-label" htmlFor="name">

                        Name <span>*</span>

                      </label>

                      <input

                        id="name"

                        type="text"

                        name="name"

                        className="contact-input"

                        placeholder="Enter your name"

                        value={formData.name}

                        onChange={handleChange}

                        required

                      />

                    </div>

                    <div className="contact-field">

                      <label className="contact-label" htmlFor="email">

                        Email <span>*</span>

                      </label>

                      <input

                        id="email"

                        type="email"

                        name="email"

                        className="contact-input"

                        placeholder="Enter your email"

                        value={formData.email}

                        onChange={handleChange}

                        required

                      />

                    </div>

                    <div className="contact-field">

                      <label className="contact-label" htmlFor="mobile">

                        Mobile <span>*</span>

                      </label>

                      <input

                        id="mobile"

                        type="tel"

                        name="mobile"

                        className="contact-input"

                        placeholder="Enter mobile number"

                        value={formData.mobile}

                        onChange={handleChange}

                        required

                      />

                    </div>

                    <div className="contact-field">

                      <label className="contact-label" htmlFor="subject">

                        Subject

                      </label>

                      <div className="contact-select">

                        <select

                          id="subject"

                          name="subject"

                          value={formData.subject}

                          onChange={handleChange}

                        >

                          <option value="">Select requirement</option>

                          <option value="Final Year Project">Final Year Project</option>

                          <option value="Internship">Internship</option>

                          <option value="Website Development">Website Development</option>

                          <option value="Mobile App Development">Mobile App Development</option>

                          <option value="Software Development">Software Development</option>

                          <option value="AI / GenAI">AI / GenAI</option>

                          <option value="Other">Other</option>

                        </select>

                        <i className="bi bi-chevron-down" />

                      </div>

                    </div>

                    <div className="contact-field contact-field--full">

                      <label className="contact-label" htmlFor="message">

                        Message <span>*</span>

                      </label>

                      <textarea

                        id="message"

                        name="message"

                        rows="6"

                        className="contact-input contact-textarea"

                        placeholder="Tell us about your requirement..."

                        value={formData.message}

                        onChange={handleChange}

                        required

                      />

                    </div>

                    <div className="contact-field contact-field--full">

                      <button

                        type="submit"

                        className="ct-btn ct-btn--primary contact-submit"

                        disabled={loading}

                      >

                        {loading ? (

                          <>

                            <span className="ct-spinner" aria-hidden="true" />

                            Sending...

                          </>

                        ) : (

                          <>

                            Send Message

                            <i className="bi bi-send" />

                          </>

                        )}

                      </button>

                    </div>

                  </div>

                </form>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          DIRECT CONTACT DETAILS
      ===================================================== */}
      <section className="contact-details-section" aria-labelledby="contact-details-title">
        <div className="ct-container">
          <div className="ct-section-head contact-details-heading" data-reveal>
            <span className="section-label">REACH CAPWARE</span>
            <h2 className="section-title" id="contact-details-title">
              Let's <em>Connect Directly.</em>
            </h2>
            <p className="section-description">
              Contact us for website and app development, internships, final-year projects, and business enquiries.
            </p>
          </div>

          <div className="contact-details-grid">
            <article className="contact-detail-card spotlight" data-reveal onMouseMove={handleSpotlight}>
              <div className="contact-detail-icon"><i className="bi bi-telephone-forward" /></div>
              <div className="contact-detail-content">
                <h3>Call Us</h3>
                <a href="tel:+919765818382">+91 97658 18382</a>
                <a href="tel:+919850490772">+91 98504 90772</a>
                <a href="tel:+919158623326">+91 91586 23326</a>
                <span className="contact-detail-note">Tap a number to call</span>
              </div>
            </article>

            <article className="contact-detail-card spotlight" data-reveal onMouseMove={handleSpotlight}>
              <div className="contact-detail-icon contact-detail-icon--cyan"><i className="bi bi-envelope-at" /></div>
              <div className="contact-detail-content">
                <h3>Email Us</h3>
                <a href="mailto:capwaresystems@gmail.com">capwaresystems@gmail.com</a>
                <span className="contact-detail-note">Project, internship & business enquiries</span>
                <a className="contact-detail-action" href="mailto:capwaresystems@gmail.com">
                  Send an email <i className="bi bi-arrow-up-right" />
                </a>
              </div>
            </article>

            <article className="contact-detail-card spotlight" data-reveal onMouseMove={handleSpotlight}>
              <div className="contact-detail-icon contact-detail-icon--purple"><i className="bi bi-geo-alt" /></div>
              <div className="contact-detail-content">
                <h3>Visit Our Office</h3>
                <p>6, Vishwakaran Park, Jule Solapur,<br />Solapur, Maharashtra – 413008</p>
                <a className="contact-detail-action"
                  href="https://www.google.com/maps/search/?api=1&query=6%2C%20Vishwakaran%20Park%2C%20Jule%20Solapur%2C%20Solapur%20413008"
                  target="_blank" rel="noreferrer">
                  Get directions <i className="bi bi-arrow-up-right" />
                </a>
              </div>
            </article>
          </div>

          <div className="contact-whatsapp-bar" data-reveal>
            <div className="contact-whatsapp-copy">
              <span className="contact-whatsapp-icon"><i className="bi bi-whatsapp" /></span>
              <div>
                <strong>Prefer WhatsApp?</strong>
                <p>Message Capware Systems and tell us what you want to build.</p>
              </div>
            </div>
            <a className="ct-btn ct-btn--primary" href="https://wa.me/919765818382" target="_blank" rel="noreferrer">
              Chat on WhatsApp <i className="bi bi-arrow-up-right" />
            </a>
          </div>
        </div>
      </section>

      {/* =====================================================

          BOTTOM CTA

      ===================================================== */}

      <section className="contact-bottom-section">

        <div className="ct-container">

          <div className="contact-bottom-box" data-reveal>

            <span className="ct-cta-glow ct-cta-glow--a" aria-hidden="true" />

            <span className="ct-cta-glow ct-cta-glow--b" aria-hidden="true" />

            <div className="contact-bottom-copy">

              <span className="contact-bottom-badge">

                <i className="bi bi-stars" /> READY TO START?

              </span>

              <h2>

                Explore Our

                <span>Projects & Internships.</span>

              </h2>

              <p>

                Start learning, building and developing your next project

                with Capware Systems.

              </p>

            </div>

            <div className="contact-bottom-actions">

              <Link to="/projects" className="ct-btn ct-btn--light">

                Explore Projects

                <i className="bi bi-arrow-right" />

              </Link>

              <Link to="/internships" className="ct-btn ct-btn--outline">

                View Internships

              </Link>

            </div>

          </div>

        </div>

      </section>

    </div>

  );

}

export default Contact;