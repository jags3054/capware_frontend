
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "../styles/EnrollmentTracking.css";

const API_URL = "http://localhost:5000/api";

const formatAmount = (amount) =>
  `₹${Number(amount || 0).toLocaleString("en-IN", {
    maximumFractionDigits: 2,
  })}`;

const formatDate = (date) => {
  if (!date) return "—";

  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) return "—";

  return parsed.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const formatDateTime = (date) => {
  if (!date) return "—";

  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) return "—";

  return parsed.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const prettyStatus = (value) =>
  String(value || "PENDING")
    .replace(/[_-]/g, " ")
    .toLowerCase()
    .replace(/\b\w/g, (letter) => letter.toUpperCase());

export default function EnrollmentTracking() {
  const { enrollmentId } = useParams();
  const navigate = useNavigate();

  const [enrollment, setEnrollment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    const loadEnrollment = async () => {
      const token = localStorage.getItem("capwareToken");

      if (!token) {
        navigate("/login", { replace: true });
        return;
      }

      try {
        setLoading(true);
        setError("");

        const response = await axios.get(
          `${API_URL}/enrollments/my`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const rows = Array.isArray(response.data)
          ? response.data
          : response.data?.enrollments || [];

        const selected = rows.find(
          (item) =>
            String(item._id || item.id) === String(enrollmentId)
        );

        if (!selected) {
          throw new Error(
            "Enrollment not found in your account."
          );
        }

        if (cancelled) return;

        if (
          String(selected.paymentStatus || "").toUpperCase() !==
          "PAID"
        ) {
          navigate("/dashboard", { replace: true });
          return;
        }

        setEnrollment(selected);
      } catch (err) {
        if (!cancelled) {
          setError(
            err.response?.data?.message ||
              err.message ||
              "Unable to load tracking details."
          );
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    loadEnrollment();

    return () => {
      cancelled = true;
    };
  }, [enrollmentId, navigate]);

  if (loading) {
    return (
      <main className="cw-track-page">
        <div className="cw-track-container">
          <div className="cw-track-card cw-track-center">
            <div className="cw-track-spinner" />
            <h2>Loading your tracking details</h2>
            <p>Please wait while we retrieve your enrollment.</p>
          </div>
        </div>
      </main>
    );
  }

  if (error || !enrollment) {
    return (
      <main className="cw-track-page">
        <div className="cw-track-container">
          <Link to="/dashboard" className="cw-track-back">
            <i className="bi bi-arrow-left" /> Back to Dashboard
          </Link>

          <div className="cw-track-card">
            <div className="cw-track-error" role="alert">
              <i className="bi bi-exclamation-circle" />
              <span>{error || "Enrollment details are unavailable."}</span>
            </div>

            <Link to="/dashboard" className="cw-track-primary">
              Return to Dashboard
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const id = enrollment._id || enrollment.id;
  const type = enrollment.type || "Service";
  const status = String(enrollment.status || "PENDING").toUpperCase();
  const paymentStatus = String(
    enrollment.paymentStatus || "PENDING"
  ).toUpperCase();

  const itemName =
    enrollment.itemName || enrollment.itemId || "Your Enrollment";

  const isInternship = type.toLowerCase() === "internship";
  const isProject = type.toLowerCase() === "project";

  const paymentReference =
    enrollment.razorpayPaymentId ||
    enrollment.paymentId ||
    enrollment.transactionId;

  const registrationDate =
    enrollment.createdAt || enrollment.enrolledAt;

  // These steps are based only on fields currently available.
  const steps = [
    {
      title: "Enrollment Submitted",
      description: "Your enrollment has been recorded in your account.",
      complete: true,
      icon: "bi-file-earmark-check",
    },
    {
      title: "Payment Verified",
      description: "Your payment has been marked as paid.",
      complete: paymentStatus === "PAID",
      icon: "bi-shield-check",
    },
    {
      title: "Enrollment Processing",
      description:
        "Your team can update the enrollment status as work progresses.",
      complete: ["CONFIRMED", "IN_PROGRESS", "COMPLETED"].includes(status),
      icon: "bi-clipboard-check",
    },
    {
      title: "Work Completed",
      description:
        "Completion will be reflected when the enrollment status is updated.",
      complete: status === "COMPLETED",
      icon: "bi-trophy",
    },
  ];

  return (
    <main className="cw-track-page">
      <div className="cw-track-container">
        <Link to="/dashboard" className="cw-track-back">
          <i className="bi bi-arrow-left" />
          Back to Dashboard
        </Link>

        {/* Page heading */}
        <section className="cw-track-hero">
          <div className="cw-track-hero-top">
            <div className="cw-track-success-icon">
              <i className="bi bi-check-lg" />
            </div>

            <span className="cw-track-paid-badge">
              <i className="bi bi-shield-check" />
              Payment {prettyStatus(paymentStatus)}
            </span>
          </div>

          <span className="cw-track-eyebrow">
            CAPWARE STUDENT PORTAL
          </span>

          <h1>Track Your Enrollment</h1>

          <p>
            View your enrollment information, payment details and
            latest project or service status in one place.
          </p>

          <div className="cw-track-hero-meta">
            <span>
              <i className="bi bi-calendar3" />
              Registered {formatDate(registrationDate)}
            </span>

            <span>
              <i className="bi bi-hash" />
              ID: {String(id).slice(-10)}
            </span>
          </div>
        </section>

        {/* Overview cards */}
        <section className="cw-track-overview">
          <article className="cw-track-stat-card">
            <span className="cw-track-stat-icon">
              <i className="bi bi-currency-rupee" />
            </span>
            <span className="cw-track-stat-label">Amount Paid</span>
            <strong>{formatAmount(enrollment.amount)}</strong>
            <small>Recorded enrollment amount</small>
          </article>

          <article className="cw-track-stat-card">
            <span className="cw-track-stat-icon">
              <i className="bi bi-clipboard-check" />
            </span>
            <span className="cw-track-stat-label">Enrollment Status</span>
            <strong className="cw-track-stat-status">
              {prettyStatus(status)}
            </strong>
            <small>Latest saved status</small>
          </article>

          <article className="cw-track-stat-card">
            <span className="cw-track-stat-icon">
              <i className="bi bi-laptop" />
            </span>
            <span className="cw-track-stat-label">Enrollment Type</span>
            <strong>{prettyStatus(type)}</strong>
            <small>{itemName}</small>
          </article>
        </section>

        {/* Main content grid */}
        <div className="cw-track-main-grid">
          <div className="cw-track-main-column">
            {/* Project / internship details */}
            <section className="cw-track-card">
              <div className="cw-track-section-heading">
                <div>
                  <span className="cw-track-eyebrow">
                    ENROLLMENT OVERVIEW
                  </span>
                  <h2>{itemName}</h2>
                </div>

                <span className="cw-track-type">
                  {prettyStatus(type)}
                </span>
              </div>

              {(isInternship || isProject) && (
                <div className="cw-track-project-banner">
                  <div className="cw-track-project-icon">
                    <i
                      className={`bi ${
                        isInternship
                          ? "bi-mortarboard"
                          : "bi-code-square"
                      }`}
                    />
                  </div>

                  <div>
                    <span>
                      {isInternship ? "INTERNSHIP PROGRAM" : "PROJECT"}
                    </span>
                    <h3>{itemName}</h3>
                    <p>
                      {isInternship
                        ? "Your selected internship enrollment"
                        : "Your selected project enrollment"}
                    </p>
                  </div>
                </div>
              )}

              <div className="cw-track-details">
                <div>
                  <span>Full Enrollment ID</span>
                  <strong className="cw-track-id">{id}</strong>
                </div>

                <div>
                  <span>Enrollment Type</span>
                  <strong>{prettyStatus(type)}</strong>
                </div>

                <div>
                  <span>Enrollment Date</span>
                  <strong>{formatDateTime(registrationDate)}</strong>
                </div>

                <div>
                  <span>Last Updated</span>
                  <strong>{formatDateTime(enrollment.updatedAt)}</strong>
                </div>

                {isInternship && (
                  <>
                    <div>
                      <span>Selected Package</span>
                      <strong>
                        {enrollment.selectedPackage || "Not available"}
                      </strong>
                    </div>

                    <div>
                      <span>Selected Project</span>
                      <strong>
                        {enrollment.project || "Not available"}
                      </strong>
                    </div>
                  </>
                )}

                {isProject && (
                  <div>
                    <span>Project Name</span>
                    <strong>
                      {enrollment.project ||
                        enrollment.itemName ||
                        enrollment.itemId}
                    </strong>
                  </div>
                )}

                {enrollment.category && (
                  <div>
                    <span>Category</span>
                    <strong>{enrollment.category}</strong>
                  </div>
                )}
              </div>
            </section>

            {/* Progress timeline */}
            <section className="cw-track-card">
              <div className="cw-track-section-heading">
                <div>
                  <span className="cw-track-eyebrow">
                    STATUS HISTORY
                  </span>
                  <h2>Enrollment Journey</h2>
                </div>

                <span className="cw-track-type">
                  {prettyStatus(status)}
                </span>
              </div>

              <div className="cw-track-timeline">
                {steps.map((step, index) => (
                  <div
                    key={step.title}
                    className={`cw-track-step ${
                      step.complete ? "is-complete" : ""
                    }`}
                  >
                    <span className="cw-track-step-icon">
                      <i
                        className={`bi ${
                          step.complete ? "bi-check-lg" : step.icon
                        }`}
                      />
                    </span>

                    <div className="cw-track-step-content">
                      <div className="cw-track-step-title-row">
                        <h3>{step.title}</h3>

                        <span
                          className={
                            step.complete
                              ? "cw-track-step-badge complete"
                              : "cw-track-step-badge"
                          }
                        >
                          {step.complete ? "Completed" : "Upcoming"}
                        </span>
                      </div>

                      <p>{step.description}</p>

                      {index === 0 && registrationDate && (
                        <small>{formatDateTime(registrationDate)}</small>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="cw-track-info">
                <i className="bi bi-info-circle" />
                <p>
                  This timeline reflects your saved enrollment status.
                  Additional milestones, assigned mentors and delivery
                  dates will appear when those details are recorded
                  in the system.
                </p>
              </div>
            </section>
          </div>

          <aside className="cw-track-side-column">
            {/* Payment details */}
            <section className="cw-track-card">
              <div className="cw-track-section-heading">
                <div>
                  <span className="cw-track-eyebrow">
                    BILLING INFORMATION
                  </span>
                  <h2>Payment Details</h2>
                </div>
                <i className="bi bi-receipt cw-track-heading-icon" />
              </div>

              <div className="cw-track-payment-total">
                <span>Total Amount Paid</span>
                <strong>{formatAmount(enrollment.amount)}</strong>
                <span className="cw-track-payment-success">
                  <i className="bi bi-check-circle-fill" />
                  {prettyStatus(paymentStatus)}
                </span>
              </div>

              <div className="cw-track-payment-list">
                <div>
                  <span>Payment Status</span>
                  <strong>{prettyStatus(paymentStatus)}</strong>
                </div>

                <div>
                  <span>Payment Date</span>
                  <strong>
                    {formatDateTime(
                      enrollment.paidAt ||
                        enrollment.paymentDate ||
                        enrollment.updatedAt
                    )}
                  </strong>
                </div>

                {paymentReference && (
                  <div>
                    <span>Payment Reference</span>
                    <strong className="cw-track-id">
                      {paymentReference}
                    </strong>
                  </div>
                )}

                {enrollment.razorpayOrderId && (
                  <div>
                    <span>Order Reference</span>
                    <strong className="cw-track-id">
                      {enrollment.razorpayOrderId}
                    </strong>
                  </div>
                )}
              </div>

              <p className="cw-track-small-note">
                Payment references are shown when supplied by the
                backend. Use the official payment record for
                accounting or receipt verification.
              </p>
            </section>

            {/* Next steps */}
            <section className="cw-track-card cw-track-next-card">
              <span className="cw-track-eyebrow">WHAT HAPPENS NEXT?</span>
              <h2>Your Next Steps</h2>

              <ul className="cw-track-next-list">
                <li>
                  <i className="bi bi-check-circle" />
                  <span>
                    <strong>Keep your enrollment ID</strong>
                    <small>Use it when contacting the support team.</small>
                  </span>
                </li>

                <li>
                  <i className="bi bi-person-check" />
                  <span>
                    <strong>Watch for updates</strong>
                    <small>
                      Check your dashboard for changes to your status.
                    </small>
                  </span>
                </li>

                <li>
                  <i className="bi bi-chat-dots" />
                  <span>
                    <strong>Contact support if needed</strong>
                    <small>
                      Include your enrollment ID in your message.
                    </small>
                  </span>
                </li>
              </ul>

              <Link to="/dashboard" className="cw-track-primary">
                <i className="bi bi-grid-1x2" />
                Go to Dashboard
              </Link>
            </section>
          </aside>
        </div>

        {/* Contact section */}
        <section className="cw-track-contact">
          <div className="cw-track-contact-icon">
            <i className="bi bi-headset" />
          </div>

          <div className="cw-track-contact-content">
            <span className="cw-track-eyebrow">CAPWARE SUPPORT</span>
            <h2>Need help with your enrollment?</h2>

            <p>
              Contact Capware Systems for assistance with your
              payment, selected project, internship package or
              enrollment status.
            </p>

            <div className="cw-track-contact-actions">
              <a
                href={`mailto:capwaresystems@gmail.com?subject=${encodeURIComponent(
                  `Enrollment Support - ${id}`
                )}&body=${encodeURIComponent(
                  `Hello Capware Support,\n\nI need help with enrollment ID: ${id}.\nEnrollment: ${itemName}\nType: ${type}\n\n`
                )}`}
                className="cw-track-contact-link"
              >
                <i className="bi bi-envelope" />
                capwaresystems@gmail.com
              </a>

              <a href="tel:+919765818382">
                <i className="bi bi-telephone" />
                +91 97658 18382
              </a>

              <a href="tel:+919850490772">
                <i className="bi bi-telephone" />
                +91 98504 90772
              </a>

              <a href="tel:+919158623326">
                <i className="bi bi-telephone" />
                +91 91586 23326
              </a>
            </div>
          </div>
        </section>

        <footer className="cw-track-footer">
          <span>
            <i className="bi bi-shield-check" />
            Capware Systems  Portal
          </span>

          <Link to="/dashboard" className="cw-track-back">
            Return to Dashboard <i className="bi bi-arrow-right" />
          </Link>
        </footer>
      </div>
    </main>
  );
}
