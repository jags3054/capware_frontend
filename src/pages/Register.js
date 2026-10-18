import React, { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Register.css";


const API_URL = "http://localhost:5000/api";

const PACKAGES = {
  Basic: 1999,
  Internship: 2999,
  Advanced: 4999,
};

const INTERNSHIPS = {
  "Full Stack Development Internship": {
    id: "full-stack-development",
    projects: [
      "E-commerce Website",
      "Student Management System",
      "Job Portal",
      "Inventory Management System",
      "Food Ordering Website",
      "Blogging Platform",
    ],
  },
  "Mobile App Development Internship": {
    id: "mobile-app-development",
    projects: [
      "Food Delivery Mobile App",
      "Fitness Tracking Mobile App",
      "Expense Tracker Mobile App",
      "Event Booking Mobile App",
      "Student Companion Mobile App",
    ],
  },
  "GenAI Internship": {
    id: "genai-internship",
    projects: [
      "AI Chatbot",
      "Document Question Answering System",
      "AI Content Generator",
      "AI Resume Assistant",
      "AI Study Assistant",
    ],
  },
  "AI/ML Internship": {
    id: "ai-ml-internship",
    projects: [
      "AI Resume Screening & Job Recommendation",
      "Student Placement Prediction System",
      "Insurance Claim Fraud Detection",
      "Loan Approval Prediction System",
      "Customer Churn Prediction",
      "Real Estate Price Prediction",
      "AI Sales Forecasting System",
      "Student Performance Prediction",
      "Healthcare Disease Prediction",
      "AI Recommendation System",
    ],
  },
};

function readStoredUser() {
  try {
    const value = localStorage.getItem("capwareUser");
    return value ? JSON.parse(value) : null;
  } catch {
    return null;
  }
}

function titleFromId(value = "") {
  return String(value || "")
    .split("-")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export default function Register() {
  const location = useLocation();
  const navigate = useNavigate();

  const params = useMemo(
    () => new URLSearchParams(location.search),
    [location.search]
  );

  // A direct visit to /register is general account registration, not an internship.
  const type = (params.get("type") || "account").trim().toLowerCase();
  const isAccountRegistration = type === "account" || type === "register";
  const internshipName =
    params.get("internship") ||
    (type === "internship" ? "Full Stack Development Internship" : "");
  const internship = internshipName ? INTERNSHIPS[internshipName] : null;

  const serviceId = params.get("serviceId");
  const projectId = params.get("projectId");
  const serviceName =
    params.get("serviceName") || titleFromId(serviceId) || "Selected Service";

  const isInternship = type === "internship";
  const isProject = type === "project";
  const isService = type === "service";
  const isSelectionFlow = isInternship || isProject || isService;
  const isValidType = isAccountRegistration || isSelectionFlow;

  const requestedPackage = params.get("package");
  const initialPackage = Object.prototype.hasOwnProperty.call(
    PACKAGES,
    requestedPackage
  )
    ? requestedPackage
    : "Internship";

  const [user, setUser] = useState(readStoredUser);
  const [selectedPackage, setSelectedPackage] = useState(initialPackage);
  const [selectedProject, setSelectedProject] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    mobile: "",
    college: "",
    course: "",
    year: "",
  });

  const isLoggedIn = Boolean(localStorage.getItem("capwareToken"));

  useEffect(() => {
    const storedUser = readStoredUser();
    setUser(storedUser);

    if (storedUser) {
      setForm((previous) => ({
        ...previous,
        name: storedUser.name || "",
        email: storedUser.email || "",
        mobile: storedUser.mobile || "",
        college: storedUser.college || "",
        course: storedUser.course || "",
        year: storedUser.year || "",
      }));
    }
  }, []);

  useEffect(() => {
    setSelectedPackage(initialPackage);
    setSelectedProject("");
    setError("");
  }, [initialPackage, internshipName, type]);

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setForm((previous) => ({ ...previous, [name]: value }));
  };

  const getSelectionPayload = () => {
    if (isInternship) {
      if (!internship) throw new Error("Please select a valid internship.");
      if (!Object.prototype.hasOwnProperty.call(PACKAGES, selectedPackage)) {
        throw new Error("Please select a valid package.");
      }
      if (!selectedProject) throw new Error("Please select a project.");

      return {
        type: "Internship",
        itemId: internship.id,
        selectedPackage,
        project: selectedProject,
      };
    }

    if (isService) {
      if (!serviceId) throw new Error("The service ID is missing from the URL.");
      return { type: "Service", itemId: serviceId, serviceId, serviceName };
    }

    if (isProject) {
      if (!projectId) throw new Error("The project ID is missing from the URL.");
      return { type: "Project", itemId: projectId, projectId };
    }

    throw new Error("This page does not require an item selection.");
  };

  const handleEnrollment = async (event) => {
    event.preventDefault();
    setError("");

    const token = localStorage.getItem("capwareToken");
    if (!token) {
      navigate("/login", {
        state: { from: location.pathname + location.search },
      });
      return;
    }

    let selection;
    try {
      selection = getSelectionPayload();
    } catch (validationError) {
      setError(validationError.message);
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}/enrollments`, selection, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.data?.success) {
        setSuccess(true);
      } else {
        setError(response.data?.message || "Your request could not be submitted.");
      }
    } catch (err) {
      if (err.response?.status === 401) {
        localStorage.removeItem("capwareToken");
        localStorage.removeItem("capwareUser");
        navigate("/login", {
          state: { from: location.pathname + location.search },
        });
        return;
      }
      setError(
        err.response?.data?.message ||
          "Submission failed. Please check your connection and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleNewStudentRegistration = async (event) => {
    event.preventDefault();
    setError("");

    let selection = null;
    if (!isAccountRegistration) {
      try {
        selection = getSelectionPayload();
      } catch (validationError) {
        setError(validationError.message);
        return;
      }
    }

    if (form.password.length < 8) {
      setError("Password must contain at least 8 characters.");
      return;
    }

    if (
      !isAccountRegistration &&
      !isService &&
      (!form.college.trim() || !form.course.trim() || !form.year.trim())
    ) {
      setError("Please complete your college, course, and academic year.");
      return;
    }

    setLoading(true);
    try {
      const registrationPayload = {
        name: form.name.trim(),
        email: form.email.trim().toLowerCase(),
        password: form.password,
        mobile: form.mobile.trim(),
      };

      let registerResponse;
      if (isAccountRegistration || isService) {
        registerResponse = await axios.post(
          `${API_URL}/auth/register-basic`,
          registrationPayload
        );
      } else if (isInternship) {
        registerResponse = await axios.post(`${API_URL}/auth/register`, {
          ...registrationPayload,
          college: form.college.trim(),
          course: form.course.trim(),
          year: form.year.trim(),
          selectedInternship: internshipName,
          selectedPackage,
          project: selectedProject,
        });
      } else {
        registerResponse = await axios.post(`${API_URL}/auth/register`, {
          ...registrationPayload,
          college: form.college.trim(),
          course: form.course.trim(),
          year: form.year.trim(),
          registrationType: "Project",
          selectedProjectId: projectId,
        });
      }

      if (!registerResponse.data?.success) {
        setError(registerResponse.data?.message || "Registration failed.");
        return;
      }

      const createdUser = registerResponse.data?.user;
      const token = registerResponse.data?.token;

      // General account registration finishes here. Do not auto-enroll or save a
      // returned token, because this flow explicitly sends the student to Login.
      if (isAccountRegistration) {
        navigate("/login", {
          replace: true,
          state: { message: "Account created successfully. Please log in." },
        });
        return;
      }

      if (token) localStorage.setItem("capwareToken", token);
      if (createdUser) localStorage.setItem("capwareUser", JSON.stringify(createdUser));

      if (isService || isProject) {
        const enrollmentToken = token || localStorage.getItem("capwareToken");
        if (!enrollmentToken) {
          navigate("/login", {
            state: {
              from: location.pathname + location.search,
              message: "Account created. Please log in to submit your request.",
            },
          });
          return;
        }

        const enrollmentResponse = await axios.post(
          `${API_URL}/enrollments`,
          selection,
          {
            headers: {
              Authorization: `Bearer ${enrollmentToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!enrollmentResponse.data?.success) {
          setError(
            enrollmentResponse.data?.message ||
              "Your account was created, but the request could not be submitted. Please log in and try again."
          );
          return;
        }

        setUser(createdUser || readStoredUser());
        setSuccess(true);
        return;
      }

      // Preserve the existing internship flow: sign in to confirm enrollment.
      navigate("/login", {
        state: {
          from: location.pathname + location.search,
          message: "Account created. Please log in to confirm your internship enrollment.",
        },
      });
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Registration failed. Please check your connection and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  if (!isValidType) {
    return (
      <main className="register-page">
        <section className="register-section">
          <div className="rg-container">
            <div className="register-card register-message-card">
              <h2>Invalid selection</h2>
              <p>Please return and select a valid service, project, or internship.</p>
              <Link to="/services">Browse Services</Link>
            </div>
          </div>
        </section>
      </main>
    );
  }

  if (isInternship && !internship) {
    return (
      <main className="register-page">
        <section className="register-section">
          <div className="rg-container">
            <div className="register-card register-message-card">
              <h2>Invalid internship selection</h2>
              <p>Please return to the internship page and select a valid plan.</p>
              <Link to="/internships">Browse Internships</Link>
            </div>
          </div>
        </section>
      </main>
    );
  }

  if (isService && !serviceId) {
    return (
      <main className="register-page">
        <section className="register-section">
          <div className="rg-container">
            <div className="register-card register-message-card">
              <h2>Service not selected</h2>
              <p>Please return to the services page and select a service.</p>
              <Link to="/services">Browse Services</Link>
            </div>
          </div>
        </section>
      </main>
    );
  }

  if (isProject && !projectId) {
    return (
      <main className="register-page">
        <section className="register-section">
          <div className="rg-container">
            <div className="register-card register-message-card">
              <h2>Project not selected</h2>
              <p>Please return to the projects page and select a project.</p>
              <Link to="/projects">Browse Projects</Link>
            </div>
          </div>
        </section>
      </main>
    );
  }

  // General account registration should not be mistaken for an enrollment form.
  if (isAccountRegistration && isLoggedIn) {
    return (
      <main className="register-page">
        <section className="register-success-section">
          <div className="rg-container">
            <div className="register-success">
              <div className="register-success-icon"><i className="bi bi-person-check" /></div>
              <span className="register-success-badge">ALREADY SIGNED IN</span>
              <h2>You already have an account</h2>
              <p>You are signed in as {user?.name || user?.email || "a Capware student"}.</p>
              <button
                type="button"
                className="rg-btn rg-btn--primary"
                onClick={() => navigate("/dashboard", { replace: true })}
              >
                Go to Dashboard <i className="bi bi-arrow-right" />
              </button>
            </div>
          </div>
        </section>
      </main>
    );
  }

  const selectionTitle = isAccountRegistration
    ? "Create your Capware account"
    : isInternship
      ? internshipName
      : isService
        ? serviceName
        : titleFromId(projectId);

  const pageTypeLabel = isAccountRegistration
    ? "Student Account"
    : isInternship
      ? "Internship Enrollment"
      : isService
        ? "Service Request"
        : "Project Request";

  if (success) {
    return (
      <main className="register-page">
        <section className="register-success-section">
          <div className="rg-container">
            <div className="register-success">
              <div className="register-success-icon"><i className="bi bi-check-lg" /></div>
              <span className="register-success-badge">
                {isInternship ? "ENROLLMENT SUBMITTED" : "REQUEST SUBMITTED"}
              </span>
              <h2>{isInternship ? "Enrollment Successful!" : "Request Submitted!"}</h2>
              <p>
                {isInternship
                  ? `Your ${internshipName} enrollment has been saved. Your payment is pending until completed and verified.`
                  : `Your request for ${selectionTitle} has been submitted.`}
              </p>
              <button
                type="button"
                className="rg-btn rg-btn--primary"
                onClick={() => navigate("/dashboard", { replace: true })}
              >
                Go to Dashboard <i className="bi bi-arrow-right" />
              </button>
            </div>
          </div>
        </section>
      </main>
    );
  }

  const formFields = [
    ["name", "Full Name", "text"],
    ["email", "Email Address", "email"],
    ["password", "Create Password", "password"],
    ["mobile", "Mobile Number", "tel"],
    ...(!isService && !isAccountRegistration
      ? [
          ["college", "College Name", "text"],
          ["course", "Course", "text"],
          ["year", "Academic Year", "text"],
        ]
      : []),
  ];

  return (
    <main className="register-page">
      <section className="register-hero">
        <div className="rg-container">
          <div className="register-hero-inner">
            <span className="register-badge">
              <span className="register-badge-dot" />
              {isAccountRegistration
                ? "STUDENT REGISTRATION"
                : isLoggedIn
                  ? pageTypeLabel.toUpperCase()
                  : "STUDENT REGISTRATION"}
            </span>

            <h1 className="register-hero-title">
              {isAccountRegistration ? "Create Your" : isLoggedIn ? "Complete Your" : "Start Your"}
              <span className="register-hero-gradient">
                {" "}
                {isAccountRegistration
                  ? "Capware Account."
                  : isInternship
                    ? "Learning Journey."
                    : isService
                      ? "Growth Journey."
                      : "Project Journey."}
              </span>
            </h1>

            <p className="register-hero-text">
              {isAccountRegistration
                ? "Create your student account to access Capware services, projects, and learning opportunities."
                : isLoggedIn
                  ? isInternship
                    ? "Choose your project and confirm your selected package."
                    : `Submit your request for ${selectionTitle}.`
                  : isInternship
                    ? "Create your Capware student account and choose your internship project."
                    : "Create your Capware student account to submit your request."}
            </p>

            <div className="register-progress" aria-label="Registration steps">
              <div className="register-progress-step is-complete">
                <span><i className="bi bi-check-lg" /></span>
                <div><strong>{isAccountRegistration ? "Account" : "Selection"}</strong><small>{isAccountRegistration ? "Basic details" : "Choose your plan"}</small></div>
              </div>
              <div className="register-progress-line" />
              <div className={`register-progress-step ${isLoggedIn ? "is-complete" : "is-current"}`}>
                <span>{isLoggedIn ? <i className="bi bi-check-lg" /> : "2"}</span>
                <div><strong>{isLoggedIn ? "Confirm" : "Your details"}</strong><small>{isLoggedIn ? "Review request" : "Create account"}</small></div>
              </div>
              <div className="register-progress-line" />
              <div className="register-progress-step">
                <span>3</span>
                <div><strong>{isAccountRegistration ? "Login" : "Submit"}</strong><small>{isAccountRegistration ? "Access your account" : "You're all set"}</small></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="register-section">
        <div className="rg-container">
          <div className="register-grid">
            <div className="register-form-wrap">
              <div className="register-card">
                <div className="register-card-header">
                  <span className="section-label">
                    {isAccountRegistration ? "CREATE YOUR ACCOUNT" : isLoggedIn ? "CONFIRM REQUEST" : "CREATE YOUR ACCOUNT"}
                  </span>
                  <h2>
                    {isAccountRegistration
                      ? "Student Registration"
                      : isLoggedIn
                        ? pageTypeLabel
                        : "Student Registration"}
                  </h2>
                  <p>
                    {isAccountRegistration
                      ? "Enter your details to create your Capware account. No internship or project selection is required."
                      : isLoggedIn
                        ? `Signed in as ${user?.name || user?.email || "existing student"}.`
                        : isInternship
                          ? "Enter your details and select your internship project."
                          : "Enter your details to continue with your request."}
                  </p>
                </div>

                {error && (
                  <div className="cw-register-error" role="alert" aria-live="assertive">
                    <i className="bi bi-exclamation-circle" /> {error}
                  </div>
                )}

                <form onSubmit={isLoggedIn ? handleEnrollment : handleNewStudentRegistration}>
                  {isAccountRegistration ? (
                    <div className="cw-selected-plan register-account-plan">
                      <div className="register-plan-icon"><i className="bi bi-person-plus" /></div>
                      <span>GENERAL ACCOUNT</span>
                      <h3>Welcome to Capware Systems</h3>
                      <p>Create one account to get started. You can choose an internship, project, or service later.</p>
                      <div className="register-plan-meta">
                        <span><i className="bi bi-shield-check" /> Secure registration</span>
                        <span><i className="bi bi-person-check" /> Student account</span>
                      </div>
                    </div>
                  ) : isInternship ? (
                    <div className="cw-selected-plan">
                      <span>SELECTED INTERNSHIP</span>
                      <h3>{internshipName}</h3>
                      <label htmlFor="selectedPackage">Internship Package</label>
                      <div className="register-select">
                        <select
                          id="selectedPackage"
                          value={selectedPackage}
                          onChange={(event) => setSelectedPackage(event.target.value)}
                        >
                          {Object.keys(PACKAGES).map((name) => (
                            <option key={name} value={name}>{name}</option>
                          ))}
                        </select>
                        <i className="bi bi-chevron-down" />
                      </div>
                      <p>Program fee: <strong>₹{PACKAGES[selectedPackage].toLocaleString("en-IN")}</strong></p>
                      <label htmlFor="project">Choose Your Project</label>
                      <div className="register-select">
                        <select
                          id="project"
                          value={selectedProject}
                          onChange={(event) => setSelectedProject(event.target.value)}
                          required
                        >
                          <option value="">Select a project</option>
                          {internship.projects.map((project) => (
                            <option key={project} value={project}>{project}</option>
                          ))}
                        </select>
                        <i className="bi bi-chevron-down" />
                      </div>
                      {selectedProject && (
                        <div className="register-selected-project">
                          <i className="bi bi-check-circle-fill" />
                          <span>Selected project</span>
                          <strong>{selectedProject}</strong>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="cw-selected-plan">
                      <div className="register-plan-icon">
                        <i className={`bi ${isService ? "bi-briefcase" : "bi-code-slash"}`} />
                      </div>
                      <span>{isService ? "SELECTED SERVICE" : "SELECTED PROJECT"}</span>
                      <h3>{selectionTitle}</h3>
                      <p>Submit your details and our team will review your request and follow up about your requirements.</p>
                      <div className="register-plan-meta">
                        <span><i className="bi bi-shield-check" /> Secure registration</span>
                        <span><i className="bi bi-chat-dots" /> Team follow-up</span>
                      </div>
                    </div>
                  )}

                  {!isLoggedIn && (
                    <div className="register-fields">
                      {formFields.map(([name, label, inputType]) => (
                        <div className="register-field" key={name}>
                          <label htmlFor={name}>{label} *</label>
                          <input
                            id={name}
                            name={name}
                            type={inputType}
                            value={form[name]}
                            onChange={handleFormChange}
                            required
                            minLength={name === "password" ? 8 : undefined}
                            autoComplete={
                              name === "password"
                                ? "new-password"
                                : name === "email"
                                  ? "email"
                                  : name === "name"
                                    ? "name"
                                    : name === "mobile"
                                      ? "tel"
                                      : "off"
                            }
                          />
                        </div>
                      ))}
                    </div>
                  )}

                  {!isLoggedIn && (
                    <p className="register-security-note">
                      <i className="bi bi-lock-fill" /> Your details are used to create your Capware student account.
                    </p>
                  )}

                  <button
                    type="submit"
                    className="rg-btn rg-btn--primary register-submit"
                    disabled={loading}
                  >
                    {loading
                      ? "Please wait..."
                      : isLoggedIn
                        ? isInternship
                          ? "Confirm Enrollment"
                          : "Submit Request"
                        : isAccountRegistration
                          ? "Create Account"
                          : isService
                            ? "Create Account & Submit Request"
                            : isProject
                              ? "Create Account & Submit Project"
                              : "Create Account"}
                    {!loading && <i className="bi bi-arrow-right" />}
                  </button>

                  {!isLoggedIn && (
                    <p className="register-login-note">
                      Already have an account? <Link to="/login">Login here</Link>
                    </p>
                  )}
                </form>
              </div>
            </div>

            <aside className="register-summary-wrap">
              <div className="register-summary-card">
                <div className="register-summary-topline">
                  <span className="register-summary-live-dot" />
                  {isAccountRegistration ? "ACCOUNT SUMMARY" : "YOUR ENROLLMENT SUMMARY"}
                </div>
                <div className="register-summary-heading">
                  <span className="register-summary-icon">
                    <i className={`bi ${isAccountRegistration ? "bi-person-badge" : "bi-laptop"}`} />
                  </span>
                  <div>
                    <span>{isAccountRegistration ? "GET STARTED" : "YOUR SELECTION"}</span>
                    <h3>{isAccountRegistration ? "Capware Account" : isInternship ? "Internship Package" : pageTypeLabel}</h3>
                  </div>
                </div>

                <p className="register-summary-selection">{selectionTitle}</p>

                {isInternship && selectedProject && (
                  <div className="register-summary-project">
                    <span>Selected project</span>
                    <strong>{selectedProject}</strong>
                  </div>
                )}

                {isInternship ? (
                  <>
                    <div className="register-summary-price">₹{PACKAGES[selectedPackage].toLocaleString("en-IN")}</div>
                    <span>One-time program fee</span>
                  </>
                ) : isAccountRegistration ? (
                  <span>No payment or enrollment is required to create an account.</span>
                ) : (
                  <span>Our team will follow up regarding your request.</span>
                )}

                <hr />
                <h4>{isAccountRegistration ? "Account Benefits" : isInternship ? "Enrollment Benefits" : "What happens next?"}</h4>
                <ul>
                  {isAccountRegistration ? (
                    <>
                      <li><i className="bi bi-check-circle-fill" /> Access your student account</li>
                      <li><i className="bi bi-check-circle-fill" /> Explore projects and services</li>
                      <li><i className="bi bi-check-circle-fill" /> Choose an internship later</li>
                    </>
                  ) : isInternship ? (
                    <>
                      <li><i className="bi bi-check-circle-fill" /> Personal student dashboard</li>
                      <li><i className="bi bi-check-circle-fill" /> Separate enrollment records</li>
                      <li><i className="bi bi-check-circle-fill" /> Enrollment status tracking</li>
                      <li><i className="bi bi-check-circle-fill" /> Payment tracking</li>
                    </>
                  ) : (
                    <>
                      <li><i className="bi bi-check-circle-fill" /> Your selected item is identified</li>
                      <li><i className="bi bi-check-circle-fill" /> Your request can be reviewed by the team</li>
                      <li><i className="bi bi-check-circle-fill" /> Follow-up about your requirements</li>
                    </>
                  )}
                </ul>

                <div className="register-summary-footer">
                  <i className="bi bi-headset" />
                  <span>Need help? Our team can guide you through the next steps.</span>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}
