import React, { useState } from "react";
import {
  submitResearchEnquiry,
  registerResearchUser,
  loginResearchUser,
} from "../Services/researchApi";
import "../styles/ResearchGuidance.css";

const services = [
  {
    icon: "bi-journal-text",
    title: "Research Paper Support",
    text: "Structured guidance for developing a clear, well-supported research paper.",
    points: [
      "Topic refinement and research questions",
      "Literature review planning",
      "Methodology and paper structure",
      "Academic editing and formatting",
    ],
  },
  {
    icon: "bi-cpu",
    title: "PhD Project Guidance",
    text: "Technical mentoring to help you plan, build, test and explain your research prototype.",
    points: [
      "AI, ML and data science prototypes",
      "NLP and computer vision applications",
      "Implementation and debugging support",
      "Documentation and viva preparation",
    ],
  },
  {
    icon: "bi-journal-check",
    title: "Journal Publication Assistance",
    text: "Practical support to prepare a manuscript for a suitable journal or conference.",
    points: [
      "Journal scope and fit assessment",
      "Template and reference formatting",
      "Submission-readiness review",
      "Reviewer-response guidance",
    ],
  },
  {
    icon: "bi-graph-up-arrow",
    title: "Research Analytics",
    text: "Technical help with data analysis, experiments and clear presentation of findings.",
    points: [
      "Python, R, MATLAB and SPSS support",
      "Statistical analysis planning",
      "Charts, tables and visualisation",
      "Reproducible workflow guidance",
    ],
  },
];

const domains = [
  "Artificial Intelligence & Machine Learning",
  "Data Science & Analytics",
  "Computer Vision",
  "Natural Language Processing",
  "Computer Science & Information Technology",
  "Engineering, Simulation & Modelling",
  "Other research area",
];

const initialForm = {
  fullName: "",
  email: "",
  phone: "",
  affiliation: "",
  researchLevel: "PhD Scholar",
  service: "Research Consultation",
  domain: "",
  topic: "",
  supportNeeded: "",
  budget: "",
  deadline: "",
  preferredContact: "Email",
  consent: false,
};

export default function ResearchGuidance() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState({ type: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [token, setToken] = useState(
    () => localStorage.getItem("capwareToken") || ""
  );
  const [showAuthFields, setShowAuthFields] = useState(false);
  const [accountMode, setAccountMode] = useState("register");
  const [password, setPassword] = useState("");

  const update = (event) => {
    const { name, value, type, checked } = event.target;
    setForm((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const chooseService = (service) => {
    setForm((current) => ({ ...current, service }));

    const existingToken = localStorage.getItem("capwareToken") || "";
    setToken(existingToken);
    setShowAuthFields(!existingToken);
    setStatus({ type: "", message: "" });

    document.getElementById("research-enquiry")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus({ type: "", message: "" });

    let activeToken = localStorage.getItem("capwareToken") || token;

    if (!activeToken && !showAuthFields) {
      setShowAuthFields(true);
      setStatus({
        type: "info",
        message: "Please create an account or sign in to submit your enquiry.",
      });
      document.getElementById("research-enquiry")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      return;
    }

    if (!activeToken && !password) {
      setStatus({
        type: "error",
        message: "Please enter your password to continue.",
      });
      return;
    }

    setSubmitting(true);

    try {
      if (!activeToken) {
        const email = form.email.trim().toLowerCase();

        if (!form.fullName.trim() || !email) {
          throw new Error("Please enter your full name and email address first.");
        }

        if (accountMode === "register" && password.length < 8) {
          throw new Error("Your new password must contain at least 8 characters.");
        }

        const authResponse =
          accountMode === "register"
            ? await registerResearchUser({
                name: form.fullName.trim(),
                email,
                password,
                mobile: form.phone.trim(),
              })
            : await loginResearchUser({ email, password });

        activeToken = authResponse.token || authResponse.accessToken || "";

        if (!activeToken) {
          throw new Error(
            authResponse.message ||
              "Authentication succeeded without a token. Please check the auth API response."
          );
        }

        localStorage.setItem("capwareToken", activeToken);
        if (authResponse.user) {
          localStorage.setItem(
            "capwareUser",
            JSON.stringify(authResponse.user)
          );
        }

        setToken(activeToken);
        setShowAuthFields(false);
        setPassword("");
      }

      const response = await submitResearchEnquiry(
        {
          ...form,
          fullName: form.fullName.trim(),
          email: form.email.trim().toLowerCase(),
        },
        activeToken
      );

      setStatus({
        type: "success",
        message:
          response.message ||
          "Thank you. Your research enquiry has been received. Our team will contact you after reviewing the details.",
      });
      setForm(initialForm);
      setShowAuthFields(false);
      setPassword("");
      setAccountMode("register");
    } catch (error) {
      setStatus({
        type: "error",
        message:
          error.message ||
          "We could not submit your enquiry. Please check your connection and try again.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="rg-page">
      <div className="rg-container">

        {/* ============ HERO ============ */}
        <section className="rg-hero">
          <div className="rg-hero-top">
            <div className="rg-hero-icon">
              <i className="bi bi-bezier2" />
            </div>

            <span className="rg-hero-badge">
              <i className="bi bi-circle-fill" />
              RESEARCH SERVICES
            </span>
          </div>

          <span className="rg-eyebrow">CAPWARE SYSTEMS</span>

          <h1>
            Turn your research vision into{" "}
            <span>meaningful outcomes.</span>
          </h1>

          <p>
            Practical research mentoring, technical guidance and
            publication-readiness support for scholars, academics and
            research teams.
          </p>

          <div className="rg-hero-meta">
            <span><i className="bi bi-check2-circle" /> Researcher-led approach</span>
            <span><i className="bi bi-check2-circle" /> Scope-based guidance</span>
            <span><i className="bi bi-check2-circle" /> Clear next steps</span>
          </div>

          <div className="rg-hero-actions">
            <a className="rg-btn rg-btn-primary" href="#research-enquiry">
              Book a consultation <i className="bi bi-arrow-up-right" />
            </a>
            <a className="rg-btn rg-btn-outline" href="#research-services">
              Explore services
            </a>
          </div>
        </section>

        {/* ============ INTRO ============ */}
        <section className="rg-card rg-intro">
          <div className="rg-intro-grid">
            <div>
              <span className="rg-eyebrow">RESEARCH, WITH CLARITY</span>
              <h2>Support that meets you <span>where you are.</span></h2>
            </div>
            <p>
              Whether you are shaping a research question, implementing a
              prototype, analysing results or preparing a manuscript, we help
              you identify the next practical step—without taking ownership
              away from the researcher.
            </p>
          </div>
        </section>

        {/* ============ SERVICES ============ */}
        <section className="rg-section" id="research-services">
          <div className="rg-section-heading">
            <div>
              <span className="rg-eyebrow">HOW WE CAN HELP</span>
              <h2>Research support for every <span>stage.</span></h2>
            </div>
            <p>
              Choose an area to discuss your requirements. The scope, timeline
              and fee are shared after an initial review—there are no public
              package prices.
            </p>
          </div>

          <div className="rg-services-grid">
            {services.map((service, index) => (
              <article className="rg-card rg-service-card" key={service.title}>
                <div className="rg-service-top">
                  <span className="rg-service-icon">
                    <i className={`bi ${service.icon}`} />
                  </span>
                  <span className="rg-card-number">0{index + 1}</span>
                </div>

                <h3>{service.title}</h3>
                <p>{service.text}</p>

                <ul>
                  {service.points.map((point) => (
                    <li key={point}>
                      <i className="bi bi-check2" />
                      {point}
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  className="rg-card-link"
                  onClick={() => chooseService(service.title)}
                >
                  Discuss this service <i className="bi bi-arrow-up-right" />
                </button>
              </article>
            ))}
          </div>
        </section>

        {/* ============ DOMAINS ============ */}
        <section className="rg-card rg-domains">
          <div className="rg-domains-grid">
            <div>
              <span className="rg-eyebrow">RESEARCH DOMAINS</span>
              <h2>Technical depth across <span>modern disciplines.</span></h2>
              <p>
                Tell us about your domain and research objectives. We will
                review the fit and confirm the type of guidance that can be
                offered.
              </p>
              <button
                type="button"
                className="rg-card-link"
                onClick={() => chooseService("Research Consultation")}
              >
                Discuss your research <i className="bi bi-arrow-right" />
              </button>
            </div>

            <div className="rg-domain-list">
              {domains.slice(0, 6).map((domain, index) => (
                <div className="rg-domain-item" key={domain}>
                  <span className="rg-domain-index">0{index + 1}</span>
                  <span>{domain}</span>
                  <i className="bi bi-arrow-up-right" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============ PROCESS ============ */}
        <section className="rg-section rg-section--center">
          <div className="rg-section-heading rg-section-heading--center">
            <div>
              <span className="rg-eyebrow">A CLEAR PROCESS</span>
              <h2>From first conversation to <span>next steps.</span></h2>
            </div>
            <p>
              Start with your goals. We will help define a realistic and
              transparent scope.
            </p>
          </div>

          <div className="rg-process-grid">
            <article className="rg-card">
              <span className="rg-process-number">01</span>
              <h3>Share your context</h3>
              <p>
                Tell us your research area, current stage, needs and expected
                timeline.
              </p>
            </article>
            <article className="rg-card">
              <span className="rg-process-number">02</span>
              <h3>Discuss the scope</h3>
              <p>
                We review the request and discuss suitable mentoring or
                technical support.
              </p>
            </article>
            <article className="rg-card">
              <span className="rg-process-number">03</span>
              <h3>Agree on a plan</h3>
              <p>
                Receive proposed deliverables, timeline and a quotation before
                work begins.
              </p>
            </article>
          </div>
        </section>

        {/* ============ ETHICS ============ */}
        <section className="rg-card rg-ethics">
          <div className="rg-ethics-icon">
            <i className="bi bi-shield-check" />
          </div>
          <div>
            <span className="rg-eyebrow">RESPONSIBLE RESEARCH</span>
            <h2>Your work. Your contribution.</h2>
            <p>
              Our role is to mentor, review and provide technical assistance.
              Researchers remain responsible for their ideas, data,
              interpretations, citations and final submissions. We do not
              fabricate results, guarantee publication or misrepresent journal
              indexing.
            </p>
          </div>
        </section>

        {/* ============ FAQ ============ */}
        <section className="rg-section">
          <div className="rg-faq-grid">
            <div>
              <span className="rg-eyebrow">GOOD TO KNOW</span>
              <h2>Frequently asked <span>questions.</span></h2>
              <p>
                Have a question that is not covered here? Send us an enquiry
                and include your research context.
              </p>
            </div>

            <div className="rg-faq-list">
              <details>
                <summary>
                  Do you publish papers on behalf of researchers?
                  <i className="bi bi-plus-lg" />
                </summary>
                <p>
                  We offer mentoring, manuscript review, editing, formatting
                  and submission-readiness guidance. The researcher retains
                  authorship and responsibility for the final work.
                </p>
              </details>
              <details>
                <summary>
                  Can you help with AI/ML implementation?
                  <i className="bi bi-plus-lg" />
                </summary>
                <p>
                  We can assess requests involving data preparation, model
                  implementation, evaluation, visualisation, debugging and
                  prototype documentation, subject to scope and feasibility.
                </p>
              </details>
              <details>
                <summary>
                  How much does consultation or project guidance cost?
                  <i className="bi bi-plus-lg" />
                </summary>
                <p>
                  There are no fixed prices displayed here. Share your
                  requirements and we will discuss the scope, timeline and
                  applicable fee before you decide.
                </p>
              </details>
              <details>
                <summary>
                  Do you guarantee journal acceptance?
                  <i className="bi bi-plus-lg" />
                </summary>
                <p>
                  No. Editorial decisions, peer review and publication
                  timelines are controlled by journals and conferences. We do
                  not guarantee acceptance or publication.
                </p>
              </details>
            </div>
          </div>
        </section>

        {/* ============ ENQUIRY ============ */}
        <section className="rg-section rg-enquiry-section" id="research-enquiry">
          <div className="rg-enquiry-grid">
            <div className="rg-enquiry-copy">
              <span className="rg-eyebrow">LET'S DISCUSS YOUR RESEARCH</span>
              <h2>Start with a <span>conversation.</span></h2>
              <p>
                Share a few details about your work. Our team can review your
                request and contact you to discuss possible next steps.
              </p>

              <div className="rg-contact-detail">
                <span><i className="bi bi-envelope" /></span>
                <div>
                  <small>Email</small>
                  <a href="mailto:capwaresystems@gmail.com">
                    capwaresystems@gmail.com
                  </a>
                </div>
              </div>

              <div className="rg-contact-detail">
                <span><i className="bi bi-lock" /></span>
                <div>
                  <small>Privacy-minded enquiry</small>
                  <p>
                    Only submit information you are comfortable sharing. Do
                    not include passwords, confidential datasets or
                    unpublished sensitive material.
                  </p>
                </div>
              </div>
            </div>

            <form className="rg-card rg-enquiry-form" onSubmit={handleSubmit}>
              <div className="rg-form-heading">
                <div>
                  <span className="rg-eyebrow">CONSULTATION FORM</span>
                  <h3>Tell us what you need</h3>
                </div>
                <span className="rg-form-required">* Required</span>
              </div>

              {status.message && (
                <div className={`rg-form-alert ${status.type}`} role="status">
                  {status.message}
                </div>
              )}

              <div className="rg-form-grid">
                <label>
                  Full name *
                  <input
                    name="fullName"
                    value={form.fullName}
                    onChange={update}
                    autoComplete="name"
                    required
                    maxLength={100}
                    placeholder="Your full name"
                  />
                </label>
                <label>
                  Email address *
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={update}
                    autoComplete="email"
                    required
                    maxLength={160}
                    placeholder="you@example.com"
                  />
                </label>
                <label>
                  Phone number
                  <input
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={update}
                    autoComplete="tel"
                    maxLength={25}
                    placeholder="Optional"
                  />
                </label>
                <label>
                  University / organisation
                  <input
                    name="affiliation"
                    value={form.affiliation}
                    onChange={update}
                    maxLength={160}
                    placeholder="Optional"
                  />
                </label>
                <label>
                  Research level *
                  <select
                    name="researchLevel"
                    value={form.researchLevel}
                    onChange={update}
                    required
                  >
                    <option>PhD Scholar</option>
                    <option>Research Student</option>
                    <option>Faculty / Academic</option>
                    <option>Postgraduate Student</option>
                    <option>Research Team / Organisation</option>
                    <option>Other</option>
                  </select>
                </label>
                <label>
                  Service required *
                  <select
                    name="service"
                    value={form.service}
                    onChange={update}
                    required
                  >
                    <option>Research Consultation</option>
                    {services.map((service) => (
                      <option key={service.title}>{service.title}</option>
                    ))}
                  </select>
                </label>
                <label className="rg-form-full">
                  Research domain *
                  <select
                    name="domain"
                    value={form.domain}
                    onChange={update}
                    required
                  >
                    <option value="">Select your research domain</option>
                    {domains.map((domain) => (
                      <option key={domain}>{domain}</option>
                    ))}
                  </select>
                </label>
                <label className="rg-form-full">
                  Research topic / working title
                  <input
                    name="topic"
                    value={form.topic}
                    onChange={update}
                    maxLength={240}
                    placeholder="Brief topic or working title (optional)"
                  />
                </label>
                <label className="rg-form-full">
                  What support do you need? *
                  <textarea
                    name="supportNeeded"
                    value={form.supportNeeded}
                    onChange={update}
                    required
                    minLength={10}
                    maxLength={3000}
                    rows={4}
                    placeholder="Describe your current stage, specific challenges and expected deliverables."
                  />
                </label>
                <label>
                  Indicative budget
                  <select name="budget" value={form.budget} onChange={update}>
                    <option value="">Prefer to discuss</option>
                    <option>Below ₹5,000</option>
                    <option>₹5,000–₹15,000</option>
                    <option>₹15,000–₹30,000</option>
                    <option>₹30,000+</option>
                  </select>
                </label>
                <label>
                  Target timeline
                  <input
                    name="deadline"
                    value={form.deadline}
                    onChange={update}
                    maxLength={100}
                    placeholder="e.g. within 6 weeks"
                  />
                </label>
                <label className="rg-form-full">
                  Preferred contact method
                  <select
                    name="preferredContact"
                    value={form.preferredContact}
                    onChange={update}
                  >
                    <option>Email</option>
                    <option>Phone</option>
                    <option>Either</option>
                  </select>
                </label>
              </div>

              {!token && showAuthFields && (
                <div className="rg-auth-fields">
                  <h3>
                    {accountMode === "register"
                      ? "Create your Capware account"
                      : "Sign in to Capware"}
                  </h3>
                  <p className="rg-form-note">
                    Create an account or sign in to attach this enquiry to
                    your Student Dashboard.
                  </p>
                  <label>
                    Account option
                    <select
                      value={accountMode}
                      onChange={(event) =>
                        setAccountMode(event.target.value)
                      }
                    >
                      <option value="register">Create a new account</option>
                      <option value="login">I already have an account</option>
                    </select>
                  </label>
                  <label>
                    Password *
                    <input
                      type="password"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      autoComplete={
                        accountMode === "register"
                          ? "new-password"
                          : "current-password"
                      }
                      required
                      minLength={accountMode === "register" ? 8 : undefined}
                      placeholder={
                        accountMode === "register"
                          ? "Create a password (at least 8 characters)"
                          : "Your account password"
                      }
                    />
                  </label>
                </div>
              )}

              <label className="rg-consent">
                <input
                  type="checkbox"
                  name="consent"
                  checked={form.consent}
                  onChange={update}
                  required
                />
                <span>
                  I agree that Capware Systems may contact me about this
                  enquiry. I have not included confidential or sensitive
                  research data.
                </span>
              </label>

              <button
                className="rg-submit-btn"
                type="submit"
                disabled={submitting}
              >
                {submitting
                  ? "Please wait..."
                  : !token && showAuthFields
                  ? accountMode === "register"
                    ? "Create account & submit enquiry"
                    : "Sign in & submit enquiry"
                  : "Submit research enquiry"}
                <i className="bi bi-arrow-right" />
              </button>
              <p className="rg-form-note">
                Submitting this form is a request for contact, not an
                acceptance of work or a commitment to a fee.
              </p>
            </form>
          </div>
        </section>
      </div>
    </main>
  );
}