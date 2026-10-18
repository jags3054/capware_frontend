import React, { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "../styles/ResearchTracking.css";

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

export default function ResearchTracking() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [enquiry, setEnquiry] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const loadEnquiry = useCallback(async () => {
        const token = localStorage.getItem("capwareToken");

        if (!token) {
            navigate("/login", { replace: true });
            return;
        }

        setLoading(true);
        setError("");

        try {
            const response = await axios.get(
                `${API_URL}/research/my-enquiries`,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            const list = Array.isArray(response.data)
                ? response.data
                : response.data.enquiries || response.data.data || [];

            const selected = list.find(
                (item) => String(item._id) === String(id)
            );

            if (!selected) {
                setError(
                    "Research enquiry not found, or you do not have access to it."
                );
                setEnquiry(null);
            } else {
                setEnquiry(selected);
            }
        } catch (err) {
            setError(
                err.response?.data?.message ||
                "Could not load research enquiry."
            );
        } finally {
            setLoading(false);
        }
    }, [id, navigate]);

    useEffect(() => {
        loadEnquiry();
    }, [loadEnquiry]);

    const startPayment = async () => {
        const token = localStorage.getItem("capwareToken");
        if (!token || !enquiry?._id) return;

        try {
            setError("");
            const response = await axios.post(
                `${API_URL}/research/${enquiry._id}/create-payment-order`,
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            );

            const { key, order } = response.data || {};
            if (!key || !order?.id || !window.Razorpay) {
                throw new Error(
                    "Payment checkout is not configured. Please contact the administrator."
                );
            }

            const checkout = new window.Razorpay({
                key,
                amount: order.amount,
                currency: order.currency || "INR",
                name: "Capware Systems",
                description: "Research service payment",
                order_id: order.id,
                handler: async (paymentResponse) => {
                    try {
                        await axios.post(
                            `${API_URL}/research/verify-payment`,
                            {
                                enquiryId: enquiry._id,
                                razorpay_order_id:
                                    paymentResponse.razorpay_order_id,
                                razorpay_payment_id:
                                    paymentResponse.razorpay_payment_id,
                                razorpay_signature:
                                    paymentResponse.razorpay_signature,
                            },
                            { headers: { Authorization: `Bearer ${token}` } }
                        );
                        await loadEnquiry();
                    } catch (verificationError) {
                        setError(
                            verificationError.response?.data?.message ||
                            "Payment was submitted but could not be verified. Contact support before retrying."
                        );
                    }
                },
                modal: { ondismiss: () => { } },
                theme: { color: "#2563eb" },
            });

            checkout.open();
        } catch (err) {
            setError(
                err.response?.data?.message ||
                err.message ||
                "Could not start payment."
            );
        }
    };

    /* ===================== LOADING ===================== */

    if (loading) {
        return (
            <main className="cw-track-page">
                <div className="cw-track-container">
                    <div className="cw-track-card cw-track-center">
                        <div className="cw-track-spinner" />
                        <h2>Loading your tracking details</h2>
                        <p>Please wait while we retrieve your research enquiry.</p>
                    </div>
                </div>
            </main>
        );
    }

    /* ===================== ERROR ===================== */

    if (error && !enquiry) {
        return (
            <main className="cw-track-page">
                <div className="cw-track-container">
                    <Link to="/dashboard" className="cw-track-back">
                        <i className="bi bi-arrow-left" /> Back to Dashboard
                    </Link>

                    <div className="cw-track-card">
                        <div className="cw-track-error" role="alert">
                            <i className="bi bi-exclamation-circle" />
                            <span>{error}</span>
                        </div>

                        <Link to="/dashboard" className="cw-track-primary">
                            Return to Dashboard
                        </Link>
                    </div>
                </div>
            </main>
        );
    }

    if (!enquiry) return null;

    /* ===================== DERIVED ===================== */

    const displayStatus =
        enquiry.status === "Converted" ? "Completed" : enquiry.status || "New";

    const isPaid = String(enquiry.paymentStatus || "").toUpperCase() === "PAID";

    const canPay =
        enquiry.status === "Converted" &&
        enquiry.priceApproved === true &&
        Number(enquiry.amount) > 0 &&
        !isPaid;

    const assignedName =
        typeof enquiry.assignedTo === "object"
            ? enquiry.assignedTo?.name || "Not assigned yet"
            : enquiry.assignedTo || "Not assigned yet";

    const paymentReference =
        enquiry.razorpayPaymentId ||
        enquiry.paymentId ||
        enquiry.transactionId;

    /* ===================== TIMELINE ===================== */

    const steps = [
        {
            title: "Enquiry Submitted",
            description: "Your research enquiry has been recorded.",
            complete: true,
            icon: "bi-file-earmark-check",
        },
        {
            title: "Enquiry Converted",
            description:
                "The Capware team has accepted and converted your enquiry.",
            complete: ["Converted", "Completed"].includes(enquiry.status),
            icon: "bi-clipboard-check",
        },
        {
            title: "Price Approved",
            description:
                "The team has reviewed and approved the payment amount.",
            complete: enquiry.priceApproved === true || isPaid,
            icon: "bi-cash-coin",
        },
        {
            title: "Payment Verified",
            description: "Your payment has been verified successfully.",
            complete: isPaid,
            icon: "bi-shield-check",
        },
    ];

    /* ===================== RENDER ===================== */

    return (
        <main className="cw-track-page">
            <div className="cw-track-container">
                <Link to="/dashboard" className="cw-track-back">
                    <i className="bi bi-arrow-left" />
                    Back to Dashboard
                </Link>

                {/* ============ HERO ============ */}
                <section className="cw-track-hero">
                    <div className="cw-track-hero-top">
                        <div className="cw-track-success-icon">
                            <i className="bi bi-check-lg" />
                        </div>

                        <span className="cw-track-paid-badge">
                            <i className="bi bi-circle-fill" />
                            {displayStatus}
                        </span>
                    </div>

                    <span className="cw-track-eyebrow">
                        CAPWARE STUDENT PORTAL
                    </span>

                    <h1>Track Your Research Enquiry</h1>

                    <p>
                        View your research enquiry information, team
                        response, payment status and progress in one place.
                    </p>

                    <div className="cw-track-hero-meta">
                        <span>
                            <i className="bi bi-calendar3" />
                            Submitted {formatDate(enquiry.createdAt)}
                        </span>

                        <span>
                            <i className="bi bi-hash" />
                            ID: {String(enquiry._id).slice(-10)}
                        </span>
                    </div>
                </section>

                {/* ============ ALERT ============ */}
                {error && (
                    <div className="cw-track-error" role="alert">
                        <i className="bi bi-exclamation-circle" />
                        <span>{error}</span>
                    </div>
                )}

                {/* ============ OVERVIEW STATS ============ */}
                <section className="cw-track-overview">
                    <article className="cw-track-stat-card">
                        <span className="cw-track-stat-icon">
                            <i className="bi bi-briefcase" />
                        </span>
                        <span className="cw-track-stat-label">Service</span>
                        <strong>{enquiry.service || "Research Consultation"}</strong>
                        <small>{enquiry.domain || "—"}</small>
                    </article>

                    <article className="cw-track-stat-card">
                        <span className="cw-track-stat-icon">
                            <i className="bi bi-clipboard-check" />
                        </span>
                        <span className="cw-track-stat-label">Status</span>
                        <strong className="cw-track-stat-status">
                            {displayStatus}
                        </strong>
                        <small>Latest saved status</small>
                    </article>

                    <article className="cw-track-stat-card">
                        <span className="cw-track-stat-icon">
                            <i className="bi bi-mortarboard" />
                        </span>
                        <span className="cw-track-stat-label">Research Level</span>
                        <strong>{enquiry.researchLevel || "—"}</strong>
                        <small>{enquiry.topic || "No topic provided"}</small>
                    </article>
                </section>

                {/* ============ MAIN GRID ============ */}
                <div className="cw-track-main-grid">
                    <div className="cw-track-main-column">
                        {/* -------- Enquiry details -------- */}
                        <section className="cw-track-card">
                            <div className="cw-track-section-heading">
                                <div>
                                    <span className="cw-track-eyebrow">
                                        ENQUIRY OVERVIEW
                                    </span>
                                    <h2>
                                        {enquiry.service || "Research Consultation"}
                                    </h2>
                                </div>

                                <span className="cw-track-type">
                                    {displayStatus}
                                </span>
                            </div>

                            <div className="cw-track-project-banner">
                                <div className="cw-track-project-icon">
                                    <i className="bi bi-lightbulb" />
                                </div>

                                <div>
                                    <span>RESEARCH TOPIC</span>
                                    <h3>{enquiry.topic || "Not specified"}</h3>
                                    <p>
                                        {enquiry.domain || "Research domain not specified"}
                                    </p>
                                </div>
                            </div>

                            <div className="cw-track-details">
                                <div>
                                    <span>Full Enquiry ID</span>
                                    <strong className="cw-track-id">
                                        {enquiry._id}
                                    </strong>
                                </div>

                                <div>
                                    <span>Service</span>
                                    <strong>{enquiry.service || "—"}</strong>
                                </div>

                                <div>
                                    <span>Research Domain</span>
                                    <strong>{enquiry.domain || "—"}</strong>
                                </div>

                                <div>
                                    <span>Research Level</span>
                                    <strong>{enquiry.researchLevel || "—"}</strong>
                                </div>

                                <div>
                                    <span>Submitted</span>
                                    <strong>{formatDateTime(enquiry.createdAt)}</strong>
                                </div>

                                <div>
                                    <span>Last Updated</span>
                                    <strong>{formatDateTime(enquiry.updatedAt)}</strong>
                                </div>

                                <div>
                                    <span>Assigned To</span>
                                    <strong>{assignedName}</strong>
                                </div>

                                {enquiry.topic && (
                                    <div>
                                        <span>Research Topic</span>
                                        <strong>{enquiry.topic}</strong>
                                    </div>
                                )}
                            </div>
                        </section>

                        {/* -------- Team response -------- */}
                        <section className="cw-track-card">
                            <div className="cw-track-section-heading">
                                <div>
                                    <span className="cw-track-eyebrow">
                                        TEAM COMMUNICATION
                                    </span>
                                    <h2>Team Response</h2>
                                </div>
                                <i className="bi bi-chat-left-text cw-track-heading-icon" />
                            </div>

                            <div className="cw-track-info">
                                <i className="bi bi-chat-dots" />
                                <p>
                                    {enquiry.adminNotes ||
                                        "No response from the team yet. We'll update this as soon as we review your enquiry."}
                                </p>
                            </div>
                        </section>

                        {/* -------- Progress timeline -------- */}
                        <section className="cw-track-card">
                            <div className="cw-track-section-heading">
                                <div>
                                    <span className="cw-track-eyebrow">
                                        STATUS HISTORY
                                    </span>
                                    <h2>Enquiry Journey</h2>
                                </div>

                                <span className="cw-track-type">
                                    {displayStatus}
                                </span>
                            </div>

                            <div className="cw-track-timeline">
                                {steps.map((step, index) => (
                                    <div
                                        key={step.title}
                                        className={`cw-track-step ${step.complete ? "is-complete" : ""
                                            }`}
                                    >
                                        <span className="cw-track-step-icon">
                                            <i
                                                className={`bi ${step.complete
                                                    ? "bi-check-lg"
                                                    : step.icon
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
                                                    {step.complete
                                                        ? "Completed"
                                                        : "Upcoming"}
                                                </span>
                                            </div>

                                            <p>{step.description}</p>

                                            {index === 0 && enquiry.createdAt && (
                                                <small>
                                                    {formatDateTime(enquiry.createdAt)}
                                                </small>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="cw-track-info">
                                <i className="bi bi-info-circle" />
                                <p>
                                    This timeline reflects your saved enquiry
                                    status. Additional milestones, assigned
                                    mentors and delivery dates will appear
                                    when those details are recorded in the
                                    system.
                                </p>
                            </div>
                        </section>
                    </div>

                    <aside className="cw-track-side-column">
                        {/* -------- Payment card -------- */}
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

                            {canPay && (
                                <>
                                    <div className="cw-track-payment-total cw-track-payment-pending">
                                        <span>Amount Approved</span>
                                        <strong>{formatAmount(enquiry.amount)}</strong>
                                        <span className="cw-track-payment-warning">
                                            <i className="bi bi-clock-history" />
                                            Payment Pending
                                        </span>
                                    </div>

                                    <button
                                        type="button"
                                        className="cw-track-primary cw-track-pay-btn"
                                        onClick={startPayment}
                                    >
                                        <i className="bi bi-credit-card" />
                                        Pay Now
                                    </button>
                                </>
                            )}

                            {isPaid && (
                                <>
                                    <div className="cw-track-payment-total">
                                        <span>Total Amount Paid</span>
                                        <strong>{formatAmount(enquiry.amount)}</strong>
                                        <span className="cw-track-payment-success">
                                            <i className="bi bi-check-circle-fill" />
                                            {prettyStatus(enquiry.paymentStatus)}
                                        </span>
                                    </div>

                                    <div className="cw-track-payment-list">
                                        <div>
                                            <span>Payment Status</span>
                                            <strong>
                                                {prettyStatus(enquiry.paymentStatus)}
                                            </strong>
                                        </div>

                                        <div>
                                            <span>Payment Date</span>
                                            <strong>
                                                {formatDateTime(
                                                    enquiry.paymentVerifiedAt ||
                                                    enquiry.updatedAt
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
                                    </div>
                                </>
                            )}

                            {!canPay && !isPaid && (
                                <div className="cw-track-info">
                                    <i className="bi bi-info-circle" />
                                    <p>
                                        {enquiry.status !== "Converted"
                                            ? "Payment will become available after the enquiry is converted and the team approves an amount."
                                            : !enquiry.priceApproved
                                                ? "Your enquiry has been accepted. The team will set the payment amount shortly."
                                                : "Payment details are being processed."}
                                    </p>
                                </div>
                            )}
                        </section>

                        {/* -------- Next steps -------- */}
                        <section className="cw-track-card cw-track-next-card">
                            <span className="cw-track-eyebrow">
                                WHAT HAPPENS NEXT?
                            </span>
                            <h2>Your Next Steps</h2>

                            <ul className="cw-track-next-list">
                                <li>
                                    <i className="bi bi-check-circle" />
                                    <span>
                                        <strong>Keep your enquiry ID</strong>
                                        <small>
                                            Use it when contacting the support team.
                                        </small>
                                    </span>
                                </li>

                                <li>
                                    <i className="bi bi-person-check" />
                                    <span>
                                        <strong>Watch for updates</strong>
                                        <small>
                                            Check your dashboard for changes to
                                            your enquiry status.
                                        </small>
                                    </span>
                                </li>

                                <li>
                                    <i className="bi bi-chat-dots" />
                                    <span>
                                        <strong>Contact support if needed</strong>
                                        <small>
                                            Include your enquiry ID in your message.
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

                {/* ============ PRINTABLE RECEIPT (full-width) ============ */}
                {isPaid && (
                    <section className="rt-receipt" id="payment-receipt">
                        <div className="rt-receipt-inner">
                            {/* Header */}
                            <header className="rt-receipt-header">
                                <div className="rt-receipt-brand">
                                    <div className="rt-receipt-logo">CS</div>
                                    <div>
                                        <h2>CAPWARE SYSTEMS</h2>
                                        <p>Research &amp; PhD Guidance Services</p>
                                    </div>
                                </div>

                                <div className="rt-receipt-meta">
                                    <span className="rt-receipt-paid-badge">
                                        <i className="bi bi-check-circle-fill" /> PAID
                                    </span>
                                    <small>Receipt No.</small>
                                    <strong>
                                        {String(enquiry._id).slice(-10).toUpperCase()}
                                    </strong>
                                    <small>Issued on</small>
                                    <strong>
                                        {formatDate(
                                            enquiry.paymentVerifiedAt || enquiry.updatedAt
                                        )}
                                    </strong>
                                </div>
                            </header>

                            <div className="rt-receipt-divider" />

                            {/* Bill to + summary */}
                            <div className="rt-receipt-parties">
                                <div>
                                    <span className="rt-receipt-label">BILLED TO</span>
                                    <strong>
                                        {enquiry.studentName ||
                                            enquiry.name ||
                                            "Student / Researcher"}
                                    </strong>
                                    <p>{enquiry.email || enquiry.studentEmail || "—"}</p>
                                </div>

                                <div>
                                    <span className="rt-receipt-label">PAYMENT METHOD</span>
                                    <strong>Razorpay</strong>
                                    <p>{enquiry.paymentMethod || "Online"}</p>
                                </div>
                            </div>

                            {/* Line items table */}
                            <table className="rt-receipt-table">
                                <thead>
                                    <tr>
                                        <th>Description</th>
                                        <th>Details</th>
                                        <th className="rt-receipt-amount-col">Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            <strong>
                                                {enquiry.service || "Research Consultation"}
                                            </strong>
                                            {enquiry.topic && <small>{enquiry.topic}</small>}
                                        </td>
                                        <td>
                                            {enquiry.domain || "—"}
                                            {enquiry.researchLevel && (
                                                <small>{enquiry.researchLevel}</small>
                                            )}
                                        </td>
                                        <td className="rt-receipt-amount-col">
                                            {formatAmount(enquiry.amount)}
                                        </td>
                                    </tr>
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td colSpan="2" className="rt-receipt-total-label">
                                            Total Paid
                                        </td>
                                        <td className="rt-receipt-amount-col rt-receipt-total">
                                            {formatAmount(enquiry.amount)}
                                        </td>
                                    </tr>
                                </tfoot>
                            </table>

                            {/* References */}
                            <div className="rt-receipt-refs">
                                <div>
                                    <span>Enquiry ID</span>
                                    <strong className="rt-receipt-id">
                                        {enquiry._id}
                                    </strong>
                                </div>

                                <div>
                                    <span>Payment Reference</span>
                                    <strong className="rt-receipt-id">
                                        {paymentReference || "Not available"}
                                    </strong>
                                </div>

                                {enquiry.razorpayOrderId && (
                                    <div>
                                        <span>Order Reference</span>
                                        <strong className="rt-receipt-id">
                                            {enquiry.razorpayOrderId}
                                        </strong>
                                    </div>
                                )}

                                <div>
                                    <span>Payment Date</span>
                                    <strong>
                                        {formatDateTime(
                                            enquiry.paymentVerifiedAt ||
                                            enquiry.updatedAt
                                        )}
                                    </strong>
                                </div>
                            </div>

                            {/* Footer */}
                            <footer className="rt-receipt-footer">
                                <p>
                                    Thank you for choosing <strong>Capware Systems</strong>.
                                    Please retain this receipt for your records.
                                </p>

                                <div className="rt-receipt-footer-actions">
                                    <span className="rt-receipt-stamp">
                                        <i className="bi bi-shield-check" />
                                        Digitally Verified
                                    </span>

                                    <button
                                        type="button"
                                        className="rt-receipt-print-btn"
                                        onClick={() => window.print()}
                                    >
                                        <i className="bi bi-printer" />
                                        Print / Save as PDF
                                    </button>
                                </div>
                            </footer>
                        </div>
                    </section>
                )}

                {/* ============ CONTACT ============ */}
                <section className="cw-track-contact">
                    <div className="cw-track-contact-icon">
                        <i className="bi bi-headset" />
                    </div>

                    <div className="cw-track-contact-content">
                        <span className="cw-track-eyebrow">CAPWARE SUPPORT</span>
                        <h2>Need help with your research enquiry?</h2>

                        <p>
                            Contact Capware Systems for assistance with your
                            payment, research domain, assigned mentor or
                            enquiry status.
                        </p>

                        <div className="cw-track-contact-actions">
                            <a
                                href={`mailto:capwaresystems@gmail.com?subject=${encodeURIComponent(
                                    `Research Support - ${enquiry._id}`
                                )}&body=${encodeURIComponent(
                                    `Hello Capware Support,\n\nI need help with research enquiry ID: ${enquiry._id}.\nService: ${enquiry.service || "—"}\nDomain: ${enquiry.domain || "—"}\n\n`
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
                        Capware Systems Portal
                    </span>

                    <Link to="/dashboard" className="cw-track-back">
                        Return to Dashboard <i className="bi bi-arrow-right" />
                    </Link>
                </footer>
            </div>
        </main>
    );
}