import React, { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/StudentDashboard.css";

const API_URL = "http://localhost:5000/api";

const StudentDashboard = () => {
    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [enrollments, setEnrollments] = useState([]);
    const [loadingEnrollments, setLoadingEnrollments] = useState(true);
    const [enrollmentError, setEnrollmentError] = useState("");
    const [profileOpen, setProfileOpen] = useState(false);
    const [profileLoading, setProfileLoading] = useState(false);
    const [profileMessage, setProfileMessage] = useState("");
    const [profileError, setProfileError] = useState("");
    const [enrollmentNotice, setEnrollmentNotice] = useState("");
    const [researchEnquiries, setResearchEnquiries] = useState([]);
    const [researchError, setResearchError] = useState("");
    const [loadingResearch, setLoadingResearch] = useState(false);

    const [profile, setProfile] = useState({
        name: "",
        mobile: "",
        college: "",
        course: "",
        year: "",
    });

    const loadResearchEnquiries = useCallback(async (token) => {
        setLoadingResearch(true);
        setResearchError("");

        try {
            const response = await axios.get(
                `${API_URL}/research/my-enquiries`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            setResearchEnquiries(response.data?.enquiries || []);
        } catch (error) {
            console.error(
                "Research enquiries error:",
                error.response?.status,
                error.response?.data || error.message
            );
            setResearchError(
                error.response?.data?.message ||
                "Could not load your research enquiries. Please refresh."
            );
        } finally {
            setLoadingResearch(false);
        }
    }, []);

    const loadDashboard = useCallback(async () => {
        const token = localStorage.getItem("capwareToken");
        const storedUser = localStorage.getItem("capwareUser");

        if (!token || !storedUser) {
            navigate("/login", { replace: true });
            return;
        }

        try {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);
            setProfile({
                name: parsedUser.name || "",
                mobile: parsedUser.mobile || "",
                college:
                    parsedUser.college === "Not provided"
                        ? ""
                        : parsedUser.college || "",
                course: parsedUser.course || "",
                year: parsedUser.year || "",
            });

            setLoadingEnrollments(true);
            setEnrollmentError("");

            const response = await axios.get(`${API_URL}/enrollments/my`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            setEnrollments(response.data?.enrollments || []);
            await loadResearchEnquiries(token);
        } catch (error) {
            if (error.response?.status === 401) {
                localStorage.removeItem("capwareToken");
                localStorage.removeItem("capwareUser");
                navigate("/login", { replace: true });
                return;
            }
            setEnrollmentError(
                error.response?.data?.message ||
                "Could not load your enrollments. Please refresh."
            );
        } finally {
            setLoadingEnrollments(false);
        }
    }, [navigate, loadResearchEnquiries]);

    useEffect(() => {
        loadDashboard();
    }, [loadDashboard]);

    const handleLogout = () => {
        localStorage.removeItem("capwareToken");
        localStorage.removeItem("capwareUser");
        navigate("/login", { replace: true });
    };

    const handleProfileChange = (event) => {
        const { name, value } = event.target;
        setProfile((previous) => ({ ...previous, [name]: value }));
    };

    const handleProfileSave = async (event) => {
        event.preventDefault();
        setProfileLoading(true);
        setProfileError("");
        setProfileMessage("");

        try {
            const token = localStorage.getItem("capwareToken");
            const response = await axios.patch(
                `${API_URL}/auth/profile`,
                {
                    name: profile.name.trim(),
                    mobile: profile.mobile.trim(),
                    college: profile.college.trim(),
                    course: profile.course,
                    year: profile.year,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            const updatedUser = response.data?.user;
            if (!response.data?.success || !updatedUser) {
                throw new Error(
                    response.data?.message || "Unable to update your profile."
                );
            }

            localStorage.setItem("capwareUser", JSON.stringify(updatedUser));
            setUser(updatedUser);
            setProfile({
                name: updatedUser.name || "",
                mobile: updatedUser.mobile || "",
                college:
                    updatedUser.college === "Not provided"
                        ? ""
                        : updatedUser.college || "",
                course: updatedUser.course || "",
                year: updatedUser.year || "",
            });

            setProfileMessage("Profile updated successfully.");
            setProfileOpen(false);
        } catch (error) {
            if (error.response?.status === 401) {
                localStorage.removeItem("capwareToken");
                localStorage.removeItem("capwareUser");
                navigate("/login", { replace: true });
                return;
            }
            setProfileError(
                error.response?.data?.message ||
                error.message ||
                "Unable to update your profile."
            );
        } finally {
            setProfileLoading(false);
        }
    };

    if (!user) return null;

    const hasInternship = Boolean(
        user.selectedInternship &&
        !["Not enrolled", "Not specified"].includes(user.selectedInternship)
    );

    const paymentPaid = user.paymentStatus === "PAID";

    const internshipAmount =
        Number(user.packagePrice ?? user.amount ?? 0) || 0;

    const internshipCanPay = internshipAmount > 0 && !paymentPaid;

    const handlePayNow = () => {
        if (!internshipCanPay) return;

        const enrollmentId =
            enrollments.find(
                (e) =>
                    e.type === "Internship" &&
                    e.itemName === user.selectedInternship
            )?._id || null;

        if (enrollmentId) {
            navigate(`/payment/${enrollmentId}`);
        } else {
            setEnrollmentNotice(
                "We could not locate your internship enrollment ID. Please refresh and try again."
            );
        }
    };

    const formatAmount = (amount) =>
        `₹${Number(amount || 0).toLocaleString("en-IN")}`;

    const formatDate = (date) => {
        if (!date) return "—";
        return new Date(date).toLocaleDateString("en-IN");
    };

    const escapeHtml = (value) =>
        String(value ?? "—").replace(/[&<>"']/g, (character) => ({
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;",
        })[character]);

    const handleDownloadInvoice = (enrollment) => {
        if (String(enrollment.paymentStatus || "").toUpperCase() !== "PAID") {
            setEnrollmentNotice(
                "Your invoice will be available after payment is completed."
            );
            return;
        }

        const enrollmentId = enrollment._id || enrollment.id || "—";
        const invoiceDate = formatDate(
            enrollment.paidAt ||
            enrollment.paymentDate ||
            enrollment.updatedAt ||
            enrollment.createdAt ||
            enrollment.enrolledAt
        );
        const paymentId =
            enrollment.razorpayPaymentId ||
            enrollment.paymentId ||
            enrollment.transactionId ||
            "—";
        const itemName =
            enrollment.itemName || enrollment.itemId || "Project / Service";

        const invoiceWindow = window.open("", "_blank", "width=850,height=900");

        if (!invoiceWindow) {
            setEnrollmentNotice(
                "Please allow pop-ups for this site to download your invoice."
            );
            return;
        }

        invoiceWindow.document.open();
        invoiceWindow.document.write(`<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Capware Invoice - ${escapeHtml(enrollmentId)}</title>
</head>
<body>
<div class="invoice">
  <div class="brand-bar"></div>
  <div class="invoice-inner">
    <header class="top">
      <div>
        <div class="brand"><div class="brand-mark">C</div><div><h1>CAPWARE</h1><div class="company-name">Capware Systems Private Limited</div></div></div>
        <p>Technology • Development • Learning</p>
        <p>capwaresystems@gmail.com</p>
        <p><strong>GSTIN:</strong> 27AAMCC9340G1ZF</p>
        <span class="paid">&#10003; PAYMENT PAID</span>
      </div>
      <div class="invoice-meta">
        <h2>INVOICE</h2>
        <div class="meta-line"><strong>Invoice No:</strong> INV-${escapeHtml(enrollmentId)}</div>
        <div class="meta-line"><strong>Invoice Date:</strong> ${escapeHtml(invoiceDate)}</div>
        <div class="meta-line"><strong>Currency:</strong> INR (₹)</div>
      </div>
    </header>
    <section class="section">
      <h3 class="section-heading">Billed To</h3>
      <div class="details">
        <div class="detail"><span>Customer Name</span><strong>${escapeHtml(user?.name || "Customer")}</strong></div>
        <div class="detail"><span>Email Address</span><strong>${escapeHtml(user?.email || "—")}</strong></div>
        <div class="detail"><span>Enrollment ID</span><strong>${escapeHtml(enrollmentId)}</strong></div>
        <div class="detail"><span>Payment Reference</span><strong>${escapeHtml(paymentId)}</strong></div>
      </div>
    </section>
    <section class="section">
      <h3 class="section-heading">Invoice Summary</h3>
      <table>
        <thead><tr><th>Description</th><th>Category</th><th>Payment</th><th>Amount</th></tr></thead>
        <tbody><tr><td><span class="item-name">${escapeHtml(itemName)}</span><span class="item-sub">Enrollment: ${escapeHtml(enrollmentId)}</span></td><td>${escapeHtml(enrollment.type || "Service")}</td><td>Paid</td><td>${escapeHtml(formatAmount(enrollment.amount))}</td></tr></tbody>
      </table>
      <div class="total-box"><div class="total">
        <div class="total-row"><span>Subtotal</span><strong>${escapeHtml(formatAmount(enrollment.amount))}</strong></div>
        <div class="total-row"><span>Tax</span><strong>Included if applicable</strong></div>
        <div class="total-row grand"><span>Total Paid</span><span>${escapeHtml(formatAmount(enrollment.amount))}</span></div>
      </div></div>
    </section>
    <div class="note">This document confirms that the enrollment payment is marked as paid in the Capware Systems student portal. Please retain this invoice for your records.</div>
    <footer class="footer">
      <strong>Thank you for choosing Capware Systems!</strong>
      <p>For payment or enrollment assistance, contact capwaresystems@gmail.com</p>
    </footer>
  </div>
</div>
<div class="actions"><button onclick="window.print()">Download / Save as PDF</button></div>
<script>window.onload = function () { setTimeout(function () { window.focus(); window.print(); }, 300); };</script>
</body>
</html>`);
        invoiceWindow.document.close();
    };

    const handleEnrollmentClick = (enrollment) => {
        setEnrollmentNotice("");

        if (String(enrollment.paymentStatus || "").toUpperCase() !== "PAID") {
            setEnrollmentNotice(
                "Please complete your payment to view the service tracking details."
            );
            return;
        }

        const id = enrollment._id || enrollment.id;
        if (!id) {
            setEnrollmentNotice(
                "Enrollment ID not found. Please refresh and try again."
            );
            return;
        }
        navigate(`/tracking/${id}`);
    };

    const showValue = (value) =>
        value && value !== "Not provided" ? value : "";

    return (
        <main className="cw-dashboard">
            {/* ===== SIDEBAR ===== */}
            <aside className="cw-dashboard-sidebar">
                <Link to="/" className="cw-dashboard-brand">
                    <i className="bi bi-code-slash" />
                    <span>CAPWARE</span>
                </Link>

                <p className="cw-dashboard-menu-label">STUDENT MENU</p>

                <Link to="/dashboard" className="cw-dashboard-nav active">
                    <i className="bi bi-grid-1x2" />
                    <span>Dashboard</span>
                </Link>

                <Link to="/internships" className="cw-dashboard-nav">
                    <i className="bi bi-laptop" />
                    <span>Internships</span>
                </Link>

                <Link to="/projects" className="cw-dashboard-nav">
                    <i className="bi bi-code-square" />
                    <span>Projects</span>
                </Link>

                <Link to="/services" className="cw-dashboard-nav">
                    <i className="bi bi-briefcase" />
                    <span>Services</span>
                </Link>

                <button
                    type="button"
                    className="cw-dashboard-nav cw-dashboard-logout"
                    onClick={handleLogout}
                >
                    <i className="bi bi-box-arrow-left" />
                    <span>Logout</span>
                </button>
            </aside>

            {/* ===== MAIN CONTENT ===== */}
            <section className="cw-dashboard-content">
                <header className="cw-dashboard-header">
                    <div>
                        <span className="cw-dashboard-eyebrow">STUDENT PORTAL</span>
                        <h1>My Dashboard</h1>
                    </div>

                    <div className="cw-dashboard-profile">
                        <div className="cw-dashboard-avatar">
                            {user.name?.charAt(0)?.toUpperCase() || "S"}
                        </div>
                        <div>
                            <strong>{user.name}</strong>
                            <span>{user.email}</span>
                        </div>
                    </div>
                </header>

                <div className="cw-dashboard-welcome">
                    <span>WELCOME TO CAPWARE</span>
                    <h2>Hello, {user.name}!</h2>
                    <p>
                        Manage your internships, projects, services and profile
                        from your personal student dashboard.
                    </p>
                </div>

                {/* ===== INTERNSHIP ===== */}
                {hasInternship && (
                    <>
                        <div className="cw-dashboard-section-heading">
                            <div>
                                <h2>My Internship</h2>
                                <p>Your registered internship and package details</p>
                            </div>
                        </div>

                        <article className="cw-program-card">
                            <div className="cw-program-card-top">
                                <div className="cw-program-icon">
                                    <i className="bi bi-laptop" />
                                </div>
                                <span
                                    className={`cw-program-status ${paymentPaid ? "is-paid" : "is-pending"
                                        }`}
                                >
                                    {paymentPaid ? "Payment Complete" : "Payment Pending"}
                                </span>
                            </div>

                            <span className="cw-program-label">INTERNSHIP PROGRAM</span>
                            <h3>{user.selectedInternship}</h3>

                            <div className="cw-program-details">
                                <div>
                                    <span>Selected Package</span>
                                    <strong>{user.selectedPackage || "—"}</strong>
                                </div>

                                <div>
                                    <span>Program Fee</span>
                                    <div className="cw-program-fee">
                                        <p>
                                            {internshipAmount > 0
                                                ? formatAmount(internshipAmount)
                                                : "Awaiting admin approval"}
                                        </p>
                                        <button
                                            type="button"
                                            className="btn btn-primary"
                                            disabled={!internshipCanPay}
                                            onClick={handlePayNow}
                                        >
                                            {internshipCanPay ? "Pay Now" : "Awaiting Price"}
                                        </button>
                                    </div>
                                </div>

                                <div>
                                    <span>Enrollment Status</span>
                                    <strong>
                                        {user.enrollmentStatus === "ACTIVE"
                                            ? "Active"
                                            : "Pending Payment"}
                                    </strong>
                                </div>

                                {user.selectedProject && (
                                    <div className="cw-program-project">
                                        <span>Selected Full Stack Project</span>
                                        <strong>{user.selectedProject}</strong>
                                    </div>
                                )}
                            </div>

                            {!paymentPaid && (
                                <div className="cw-program-notice">
                                    <i className="bi bi-info-circle" />
                                    <span>Your internship payment is pending.</span>
                                </div>
                            )}
                        </article>
                    </>
                )}

                {/* ===== PROJECT & SERVICE ENROLLMENTS ===== */}
                <div className="cw-dashboard-section-heading">
                    <div>
                        <h2>My Project &amp; Service Enrollments</h2>
                        <p>Projects and services registered using your account</p>
                    </div>

                    <button
                        type="button"
                        className="cw-dashboard-refresh"
                        onClick={loadDashboard}
                        disabled={loadingEnrollments}
                    >
                        <i className="bi bi-arrow-clockwise" />
                        {loadingEnrollments ? "Loading..." : "Refresh"}
                    </button>
                </div>

                {enrollmentError && (
                    <div className="cw-program-notice" role="alert">
                        <i className="bi bi-exclamation-triangle" />
                        <span>{enrollmentError}</span>
                    </div>
                )}

                {enrollmentNotice && (
                    <div className="cw-payment-message" role="alert">
                        <i className="bi bi-info-circle-fill" aria-hidden="true" />
                        <span>{enrollmentNotice}</span>
                        <button
                            type="button"
                            className="cw-payment-message-close"
                            onClick={() => setEnrollmentNotice("")}
                            aria-label="Dismiss message"
                        >
                            <i className="bi bi-x-lg" />
                        </button>
                    </div>
                )}

                {loadingEnrollments ? (
                    <p className="cw-loading-text">Loading your enrollments...</p>
                ) : enrollments.length === 0 ? (
                    <div className="cw-empty-state">
                        <div className="cw-empty-icon">
                            <i className="bi bi-inbox" />
                        </div>
                        <h3>No enrollments yet</h3>
                        <p>
                            You have not enrolled in any projects or services yet.
                            Browse the catalogue to get started.
                        </p>
                        <div className="cw-dashboard-empty-actions">
                            <Link to="/projects" className="rg-btn rg-btn--primary">
                                <i className="bi bi-code-square" /> Browse Projects
                            </Link>
                            <Link to="/services" className="rg-btn rg-btn--primary">
                                <i className="bi bi-briefcase" /> Browse Services
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div className="cw-enrollment-grid">
                        {enrollments.map((enrollment) => {
                            const isServiceEnrollment = enrollment.type === "Service";
                            const hasValidAmount = Number(enrollment.amount) > 0;
                            const isPaid =
                                String(enrollment.paymentStatus || "").toUpperCase() ===
                                "PAID";
                            const isPriceApproved =
                                !isServiceEnrollment ||
                                enrollment.priceApproved === true;

                            const isEnrollmentConfirmed =
                                String(enrollment.status || "").trim().toUpperCase() ===
                                "CONFIRMED";

                            const canPay =
                                hasValidAmount && isPriceApproved && !isPaid;

                            return (
                                <article
                                    className={`cw-enrollment-card ${isPaid ? "is-trackable" : "is-payment-pending"
                                        }`}
                                    key={enrollment._id}
                                    role="button"
                                    tabIndex={0}
                                    aria-label={`${enrollment.itemName || enrollment.itemId
                                        } — ${isPaid
                                            ? "view service tracking"
                                            : "complete payment to view tracking"
                                        }`}
                                    onClick={() => handleEnrollmentClick(enrollment)}
                                    onKeyDown={(event) => {
                                        if (
                                            event.key === "Enter" ||
                                            event.key === " "
                                        ) {
                                            event.preventDefault();
                                            handleEnrollmentClick(enrollment);
                                        }
                                    }}
                                >
                                    <div className="cw-enrollment-card-top">
                                        <div className="cw-program-icon">
                                            <i
                                                className={
                                                    enrollment.type === "Project"
                                                        ? "bi bi-code-square"
                                                        : "bi bi-briefcase"
                                                }
                                            />
                                        </div>
                                        <span className="cw-enrollment-type">
                                            {enrollment.type}
                                        </span>
                                    </div>

                                    <h3>
                                        {enrollment.itemName || enrollment.itemId}
                                    </h3>

                                    {enrollment.type === "Service" && (
                                        <div
                                            className="cw-service-request-notice"
                                            role="status"
                                        >
                                            <strong>
                                                {isPaid
                                                    ? "Payment completed"
                                                    : isEnrollmentConfirmed
                                                        ? "Enrollment confirmed"
                                                        : "Request received"}
                                            </strong>
                                            <p>
                                                {isPaid
                                                    ? "Your payment has been received. Service enrollment confirmed."
                                                    : canPay
                                                        ? "Your service price has been confirmed. Proceed with payment."
                                                        : isEnrollmentConfirmed
                                                            ? "Your service enrollment has been confirmed."
                                                            : "Our team will contact you to discuss your requirements."}
                                            </p>
                                            {canPay && (
                                                <p className="cw-service-request-amount">
                                                    Amount:{" "}
                                                    <strong>
                                                        {formatAmount(enrollment.amount)}
                                                    </strong>
                                                </p>
                                            )}
                                            {!isPaid && (canPay || !isEnrollmentConfirmed) && (
                                                <span className="cw-service-request-status">
                                                    {canPay
                                                        ? "Price confirmed"
                                                        : "Awaiting price"}
                                                </span>
                                            )}
                                        </div>
                                    )}

                                    <div className="cw-enrollment-details">
                                        <div>
                                            <span>Status</span>
                                            <strong>
                                                {enrollment.status || "PENDING"}
                                            </strong>
                                        </div>

                                        {enrollment.type !== "Service" && (
                                            <div>
                                                <span>Payment</span>
                                                <strong
                                                    className={
                                                        isPaid
                                                            ? "is-paid-text"
                                                            : "is-pending-text"
                                                    }
                                                >
                                                    {enrollment.paymentStatus ||
                                                        "PENDING"}
                                                </strong>
                                            </div>
                                        )}

                                        <div>
                                            <span>Amount</span>
                                            <strong>
                                                {Number(enrollment.amount) > 0
                                                    ? formatAmount(enrollment.amount)
                                                    : "Awaiting approval"}
                                            </strong>
                                        </div>

                                        <div>
                                            <span>Enrolled</span>
                                            <strong>
                                                {formatDate(
                                                    enrollment.createdAt ||
                                                    enrollment.enrolledAt
                                                )}
                                            </strong>
                                        </div>
                                    </div>

                                    {!isPaid && (
                                        <div className="cw-enrollment-payment-action">
                                            <button
                                                type="button"
                                                className="btn btn-primary"
                                                disabled={!canPay}
                                                aria-disabled={!canPay}
                                                title={
                                                    canPay
                                                        ? "Proceed to payment"
                                                        : "Payment will be enabled after the admin confirms the amount."
                                                }
                                                onClick={(event) => {
                                                    event.stopPropagation();
                                                    if (!canPay) return;
                                                    const id =
                                                        enrollment._id ||
                                                        enrollment.id;
                                                    if (!id) {
                                                        alert(
                                                            "Enrollment ID not found."
                                                        );
                                                        return;
                                                    }
                                                    navigate(`/payment/${id}`);
                                                }}
                                            >
                                                <i className="bi bi-credit-card" />
                                                {canPay ? "Pay Now" : "Awaiting Price"}
                                            </button>
                                        </div>
                                    )}

                                    {enrollment.type !== "Service" && isPaid && (
                                        <div className="cw-enrollment-payment-action">
                                            <button
                                                type="button"
                                                className="btn btn-outline-primary"
                                                onClick={(event) => {
                                                    event.stopPropagation();
                                                    handleDownloadInvoice(enrollment);
                                                }}
                                            >
                                                <i className="bi bi-download" />
                                                Invoice
                                            </button>
                                        </div>
                                    )}

                                    <div className="cw-enrollment-footer">
                                        <i className="bi bi-check-circle" />
                                        <span>Registered with your account</span>
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                )}

                {/* ===== RESEARCH ENQUIRIES ===== */}
                <div className="cw-dashboard-section-heading">
                    <div>
                        <h2>My Research &amp; PhD Guidance Enquiries</h2>
                        <p>Track your research support requests and their status.</p>
                    </div>
                    <button
                        type="button"
                        className="cw-dashboard-refresh"
                        onClick={() => {
                            const token = localStorage.getItem("capwareToken");
                            if (token) loadResearchEnquiries(token);
                        }}
                        disabled={loadingResearch}
                    >
                        <i className="bi bi-arrow-clockwise" />
                        {loadingResearch ? "Loading..." : "Refresh"}
                    </button>
                </div>

                {researchError && (
                    <div className="cw-program-notice" role="alert">
                        <i className="bi bi-exclamation-triangle" />
                        <span>{researchError}</span>
                    </div>
                )}

                {loadingResearch ? (
                    <p className="cw-loading-text">Loading your research enquiries...</p>
                ) : researchEnquiries.length === 0 ? (
                    <div className="cw-empty-state">
                        <div className="cw-empty-icon">
                            <i className="bi bi-journal-text" />
                        </div>
                        <h3>No research enquiries yet</h3>
                        <p>
                            You have not submitted any research enquiries through
                            your account yet.
                        </p>
                        <div className="cw-dashboard-empty-actions">
                            <Link
                                to="/research-guidance"
                                className="rg-btn rg-btn--primary"
                            >
                                <i className="bi bi-journal-text" /> Explore Research
                                Guidance
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div className="cw-enrollment-grid">
                        {researchEnquiries.map((enquiry) => (
                            <article
                                className="cw-enrollment-card research-tracking-card"
                                key={enquiry._id}
                                onClick={() =>
                                    navigate(`/research-tracking/${enquiry._id}`)
                                }
                                role="button"
                                tabIndex={0}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter" || e.key === " ") {
                                        e.preventDefault();
                                        navigate(
                                            `/research-tracking/${enquiry._id}`
                                        );
                                    }
                                }}
                                aria-label={`Track ${enquiry.service || "research enquiry"
                                    }`}
                            >
                                <div className="cw-enrollment-card-top">
                                    <div className="cw-program-icon">
                                        <i className="bi bi-journal-text" />
                                    </div>
                                    <span className="cw-enrollment-type">
                                        {enquiry.status === "Converted"
                                            ? "Complete"
                                            : enquiry.status || "NEW"}
                                    </span>
                                </div>

                                <h3>{enquiry.service || "Research Enquiry"}</h3>

                                <div className="cw-enrollment-details">
                                    <div>
                                        <span>Level</span>
                                        <strong>
                                            {enquiry.researchLevel || "—"}
                                        </strong>
                                    </div>
                                    <div>
                                        <span>Domain</span>
                                        <strong>{enquiry.domain || "—"}</strong>
                                    </div>
                                    <div>
                                        <span>Topic</span>
                                        <strong>
                                            {enquiry.topic || "Not specified"}
                                        </strong>
                                    </div>
                                    <div>
                                        <span>Submitted</span>
                                        <strong>
                                            {formatDate(enquiry.createdAt)}
                                        </strong>
                                    </div>
                                </div>

                                <div className="research-card-meta">
                                    <div className="research-card-meta__item">
                                        <span
                                            className="research-card-meta__icon"
                                            aria-hidden="true"
                                        >
                                            <i className="bi bi-person-check" />
                                        </span>
                                        <div>
                                            <span className="research-card-meta__label">
                                                Assigned To
                                            </span>
                                            <strong>
                                                {typeof enquiry.assignedTo ===
                                                    "object"
                                                    ? enquiry.assignedTo?.name ||
                                                    "Not assigned yet"
                                                    : enquiry.assignedTo ||
                                                    "Not assigned yet"}
                                            </strong>
                                        </div>
                                    </div>

                                    <div className="research-card-meta__item">
                                        <span
                                            className="research-card-meta__icon"
                                            aria-hidden="true"
                                        >
                                            <i className="bi bi-chat-left-text" />
                                        </span>
                                        <div>
                                            <span className="research-card-meta__label">
                                                Team Response
                                            </span>
                                            <p>
                                                {enquiry.adminNotes ||
                                                    "No response from the team yet."}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="research-card-open-hint">
                                    View tracking details
                                    <i
                                        className="bi bi-arrow-up-right"
                                        aria-hidden="true"
                                    />
                                </div>
                              
                                {/* Research enquiry payment button */}
                                {(() => {
                                    const amount = Number(enquiry.amount || 0);
                                    const isPaid =
                                        String(enquiry.paymentStatus || "").toUpperCase() === "PAID";
                                    const canPay =
                                        enquiry.status === "Converted" &&
                                        enquiry.priceApproved === true &&
                                        amount > 0 &&
                                        !isPaid;

                                    if (isPaid) {
                                        return (
                                            <div className="cw-enrollment-payment-action">
                                                <span className="is-paid-text">
                                                    <i className="bi bi-check-circle-fill" /> Payment Complete
                                                </span>
                                            </div>
                                        );
                                    }

                                    if (canPay) {
                                        return (
                                            <div className="cw-enrollment-payment-action">
                                                <button
                                                    type="button"
                                                    className="btn btn-primary"
                                                    onClick={(event) => {
                                                        event.stopPropagation();
                                                        navigate(
                                                            `/research-tracking/${enquiry._id}`
                                                        );
                                                    }}
                                                >
                                                    <i className="bi bi-credit-card" /> Pay Now
                                                    — ₹{amount.toLocaleString("en-IN")}
                                                </button>
                                            </div>
                                        );
                                    }

                                    return null;
                                })()}
                                
                            </article>
                        ))}
                    </div>
                )}

                {/* ===== PROFILE ===== */}
                <div className="cw-dashboard-section-heading">
                    <div>
                        <h2>My Profile</h2>
                        <p>Your registered student details</p>
                    </div>

                    <button
                        type="button"
                        className="cw-dashboard-refresh"
                        onClick={() => {
                            setProfileError("");
                            setProfileMessage("");
                            setProfileOpen((open) => !open);
                        }}
                    >
                        <i className="bi bi-pencil-square" />
                        {profileOpen ? "Cancel" : "Update Profile"}
                    </button>
                </div>

                {profileMessage && (
                    <div className="cw-profile-success" role="status">
                        <i className="bi bi-check-circle-fill" /> {profileMessage}
                    </div>
                )}

                {profileError && (
                    <div className="cw-register-error" role="alert">
                        <i className="bi bi-exclamation-triangle-fill" />{" "}
                        {profileError}
                    </div>
                )}

                {profileOpen && (
                    <form
                        className="cw-profile-edit"
                        onSubmit={handleProfileSave}
                    >
                        <div className="cw-profile-edit-grid">
                            <div>
                                <label htmlFor="profile-name">
                                    Full Name *
                                </label>
                                <input
                                    id="profile-name"
                                    name="name"
                                    value={profile.name}
                                    onChange={handleProfileChange}
                                    required
                                />
                            </div>

                            <div>
                                <label>Email Address</label>
                                <input value={user.email || ""} readOnly />
                                <small>Email cannot be changed here.</small>
                            </div>

                            <div>
                                <label htmlFor="profile-mobile">
                                    Mobile Number *
                                </label>
                                <input
                                    id="profile-mobile"
                                    name="mobile"
                                    type="tel"
                                    value={profile.mobile}
                                    onChange={handleProfileChange}
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="profile-college">
                                    College Name
                                </label>
                                <input
                                    id="profile-college"
                                    name="college"
                                    value={profile.college}
                                    onChange={handleProfileChange}
                                    placeholder="Enter college name"
                                />
                            </div>

                            <div>
                                <label htmlFor="profile-course">Course</label>
                                <select
                                    id="profile-course"
                                    name="course"
                                    value={profile.course}
                                    onChange={handleProfileChange}
                                >
                                    <option value="">Select course</option>
                                    <option value="BCA">BCA</option>
                                    <option value="MCA">MCA</option>
                                    <option value="B.Tech">B.Tech</option>
                                    <option value="BE">BE</option>
                                    <option value="BSc Computer Science">
                                        BSc Computer Science
                                    </option>
                                    <option value="MSc Computer Science">
                                        MSc Computer Science
                                    </option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="profile-year">
                                    Year / Semester
                                </label>
                                <select
                                    id="profile-year"
                                    name="year"
                                    value={profile.year}
                                    onChange={handleProfileChange}
                                >
                                    <option value="">
                                        Select year / semester
                                    </option>
                                    <option value="1st Year">1st Year</option>
                                    <option value="2nd Year">2nd Year</option>
                                    <option value="3rd Year">3rd Year</option>
                                    <option value="Final Year">Final Year</option>
                                    <option value="Semester 1">Semester 1</option>
                                    <option value="Semester 2">Semester 2</option>
                                    <option value="Semester 3">Semester 3</option>
                                    <option value="Semester 4">Semester 4</option>
                                </select>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="rg-btn rg-btn--primary"
                            disabled={profileLoading}
                        >
                            <i className="bi bi-save" />
                            {profileLoading ? "Saving..." : "Save Profile"}
                        </button>
                    </form>
                )}

                <div className="cw-profile-card">
                    <div>
                        <span>Full Name</span>
                        <strong>{user.name}</strong>
                    </div>

                    <div>
                        <span>Email</span>
                        <strong>{user.email}</strong>
                    </div>

                    {showValue(user.mobile) && (
                        <div>
                            <span>Mobile</span>
                            <strong>{user.mobile}</strong>
                        </div>
                    )}

                    {showValue(user.college) && (
                        <div>
                            <span>College</span>
                            <strong>{user.college}</strong>
                        </div>
                    )}

                    {showValue(user.course) && (
                        <div>
                            <span>Course</span>
                            <strong>{user.course}</strong>
                        </div>
                    )}

                    {showValue(user.year) && (
                        <div>
                            <span>Year / Semester</span>
                            <strong>{user.year}</strong>
                        </div>
                    )}

                    {!showValue(user.college) &&
                        !showValue(user.course) &&
                        !showValue(user.year) && (
                            <p>
                                Add your college, course and year/semester using
                                Update Profile whenever you are ready.
                            </p>
                        )}
                </div>
            </section>
        </main>
    );
};

export default StudentDashboard;