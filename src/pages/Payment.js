
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "../styles/Payment.css";

const API_URL = "http://localhost:5000/api";

const loadRazorpayScript = () =>
  new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);

    document.body.appendChild(script);
  });

const getPaymentStatus = (enrollment) =>
  String(enrollment?.paymentStatus || "PENDING").toUpperCase();

export default function Payment() {
  const navigate = useNavigate();

  // Read the ID from /payment/:enrollmentId
  const { enrollmentId } = useParams();

  const [enrollment, setEnrollment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [paying, setPaying] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  // Load the selected enrollment
  useEffect(() => {
    let cancelled = false;

    const loadEnrollment = async () => {
      const token = localStorage.getItem("capwareToken");

      if (!token) {
        navigate("/login", { replace: true });
        return;
      }

      if (!enrollmentId) {
        setError(
          "No enrollment was selected. Please return to your dashboard and click Pay Now again."
        );
        setLoading(false);
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

        // Support either { enrollments: [...] } or a direct array.
        const rows = Array.isArray(response.data)
          ? response.data
          : response.data?.enrollments ||
          response.data?.data?.enrollments ||
          [];

        const selected = rows.find(
          (row) =>
            String(row._id || row.id) === String(enrollmentId)
        );

        if (!selected) {
          throw new Error(
            "We could not find this enrollment in your account. Please return to your dashboard."
          );
        }

        if (cancelled) return;

        setEnrollment(selected);

        if (getPaymentStatus(selected) === "PAID") {
          setMessage(
            "This enrollment is already paid. You can view its tracking details from your dashboard."
          );
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err.response?.data?.message ||
            err.message ||
            "Unable to load payment details."
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadEnrollment();

    return () => {
      cancelled = true;
    };
  }, [enrollmentId, navigate]);

  const formatAmount = (amount) =>
    `₹${Number(amount || 0).toLocaleString("en-IN", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    })}`;

  // Start Razorpay checkout
  const handlePay = async () => {
    setError("");
    setMessage("");

    const selectedEnrollmentId = enrollment?._id || enrollment?.id;

    if (!selectedEnrollmentId) {
      setError("Enrollment details are missing. Please return to your dashboard.");
      return;
    }

    if (getPaymentStatus(enrollment) === "PAID") {
      navigate("/dashboard");
      return;
    }

    const token = localStorage.getItem("capwareToken");

    if (!token) {
      navigate("/login", { replace: true });
      return;
    }

    setPaying(true);

    try {
      const loaded = await loadRazorpayScript();

      if (!loaded) {
        throw new Error(
          "Unable to load Razorpay Checkout. Check your internet connection and try again."
        );
      }

      // The backend determines the amount from the enrollment record.
      const orderResponse = await axios.post(
        `${API_URL}/payments/create-order`,
        {
          enrollmentId: selectedEnrollmentId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const {
        orderId,
        amount,
        currency,
        keyId,
        name,
        description,
        prefill,
      } = orderResponse.data || {};

      if (!orderId || !keyId || !amount) {
        throw new Error(
          "The server returned incomplete payment details. Please try again."
        );
      }

      const checkout = new window.Razorpay({
        key: keyId,
        order_id: orderId,
        amount,
        currency: currency || "INR",
        name: name || "Capware Systems",
        description:
          description ||
          enrollment.itemName ||
          "Project / Service Payment",
        prefill: prefill || {},
        theme: {
          color: "#4f8cff",
        },

        // Verify payment with your backend before marking it as paid.
        handler: async (paymentResult) => {
          try {
            setError("");
            setMessage("Payment received. Verifying payment securely... Please do not close or refresh this window. You will be redirected to the tracking page.");

            await axios.post(
              `${API_URL}/payments/verify`,
              {
                enrollmentId: selectedEnrollmentId,
                razorpay_order_id:
                  paymentResult.razorpay_order_id,
                razorpay_payment_id:
                  paymentResult.razorpay_payment_id,
                razorpay_signature:
                  paymentResult.razorpay_signature,
              },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );

            setMessage(
              "Payment verified successfully. Your service tracking is now available."
            );

            navigate(`/tracking/${selectedEnrollmentId}`, {
              replace: true,
            });
          } catch (verifyError) {
            setError(
              verifyError.response?.data?.message ||
              "Payment could not be verified yet. Check your dashboard or contact support before attempting another payment."
            );
            setMessage("");
          } finally {
            setPaying(false);
          }
        },

        modal: {
          ondismiss: () => {
            setPaying(false);
          },
        },
      });

      checkout.on("payment.failed", (failure) => {
        setError(
          failure.error?.description ||
          "Payment failed. Please try again."
        );
        setPaying(false);
      });

      checkout.open();
    } catch (err) {
      setError(
        err.response?.data?.message ||
        err.message ||
        "Unable to start payment."
      );
      setPaying(false);
    }
  };

  const isPaid = getPaymentStatus(enrollment) === "PAID";

  return (
    <main className="cw-payment-page">
      <div className="cw-payment-shell">
        <Link
          to="/dashboard"
          className="cw-payment-back"
        >
          <i className="bi bi-arrow-left" /> Back to dashboard
        </Link>

        <section className="cw-payment-card">
          <div className="cw-payment-icon">
            <i className="bi bi-shield-lock" />
          </div>

          <span className="cw-payment-eyebrow">
            SECURE CHECKOUT
          </span>

          <h1>Complete your payment</h1>

          <p className="cw-payment-intro">
            Finish payment to unlock tracking for your registered
            project or service.
          </p>

          {loading ? (
            <p className="cw-payment-loading">
              Loading your enrollment...
            </p>
          ) : (
            <>
              {error && (
                <div
                  className="cw-payment-alert is-error"
                  role="alert"
                >
                  <i className="bi bi-exclamation-circle" />
                  {error}
                </div>
              )}

              {message && (
                <div
                  className="cw-payment-alert is-success"
                  role="status"
                >
                  <i className="bi bi-check-circle" />
                  {message}
                </div>
              )}

              {enrollment && (
                <div className="cw-payment-order">
                  <div>
                    <span>Enrollment type</span>
                    <strong>
                      {enrollment.type || "Service"}
                    </strong>
                  </div>

                  <div>
                    <span>Selected item</span>
                    <strong>
                      {enrollment.itemName ||
                        enrollment.itemId ||
                        "Selected enrollment"}
                    </strong>
                  </div>

                  <div>
                    <span>Payment status</span>
                    <strong
                      className={
                        isPaid ? "is-paid" : "is-pending"
                      }
                    >
                      {getPaymentStatus(enrollment)}
                    </strong>
                  </div>

                  <div className="cw-payment-total">
                    <span>Total amount</span>
                    <strong>
                      {formatAmount(enrollment.amount)}
                    </strong>
                  </div>
                </div>
              )}

              <button
                type="button"
                className="cw-payment-pay-btn"
                onClick={handlePay}
                disabled={
                  !enrollment || paying || isPaid
                }
              >
                {paying ? (
                  <>
                    <span className="cw-payment-spinner" />
                    Processing...
                  </>
                ) : isPaid ? (
                  "Payment completed"
                ) : (
                  <>
                    Pay securely with Razorpay{" "}
                    <i className="bi bi-arrow-right" />
                  </>
                )}
              </button>

              {isPaid && (
                <Link
                  to="/dashboard"
                  className="cw-payment-dashboard-btn"
                >
                  Return to dashboard
                </Link>
              )}

              <p className="cw-payment-secure-note">
                <i className="bi bi-lock-fill" /> Payment is
                verified by the Capware server before tracking
                is unlocked.
              </p>
            </>
          )}
        </section>
      </div>
    </main>
  );
}
