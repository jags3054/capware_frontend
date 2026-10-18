
import React, { useState } from "react";
import axios from "axios";
import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";
import "../styles/Login.css";

const API_URL = "http://localhost:5000/api/auth";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [forgotEmail, setForgotEmail] = useState("");
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setNotice("");
    setLoading(true);

    try {
      const response = await axios.post(`${API_URL}/login`, {
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
      });

      const { token, user } = response.data || {};

      if (!response.data?.success || !token || !user) {
        throw new Error(
          response.data?.message ||
            "The server returned an invalid login response."
        );
      }

      localStorage.setItem("capwareToken", token);
      localStorage.setItem("capwareUser", JSON.stringify(user));

      localStorage.removeItem("capwareStudentToken");
      localStorage.removeItem("studentToken");
      localStorage.removeItem("token");

      window.dispatchEvent(new Event("capware-auth-change"));

      const requestedDestination = location.state?.from;

      const destination =
        typeof requestedDestination === "string" &&
        requestedDestination.startsWith("/") &&
        !requestedDestination.startsWith("//") &&
        !requestedDestination.startsWith("/login")
          ? requestedDestination
          : "/dashboard";

      navigate(destination, { replace: true });
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Unable to log in. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setError("");
    setNotice("");

    const email = forgotEmail.trim().toLowerCase();

    if (!email) {
      setError("Please enter your registered email address.");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        `${API_URL}/forgot-password`,
        { email }
      );

      setNotice(
        response.data?.message ||
          "If an account exists for this email, password reset instructions will be sent."
      );
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to process your request. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const openForgotPassword = () => {
    setForgotEmail(formData.email);
    setError("");
    setNotice("");
    setShowForgotPassword(true);
  };

  const returnToLogin = () => {
    setShowForgotPassword(false);
    setError("");
    setNotice("");
  };

  return (
    <main className="cw-login-page">
      <div className="cw-login-glow cw-login-glow-one" />
      <div className="cw-login-glow cw-login-glow-two" />

      <section className="cw-login-card">
        {/* BRAND */}
        <Link to="/" className="cw-login-brand">
          <span className="cw-login-brand-icon">
            <i className="bi bi-code-slash" />
          </span>

          <span>
            <strong>CAPWARE</strong>
            <small> ACCESS PORTAL</small>
          </span>
        </Link>

        {/* HEADING */}
        <div className="cw-login-heading">
          <span className="cw-login-eyebrow">
            {showForgotPassword ? "ACCOUNT RECOVERY" : "WELCOME BACK"}
          </span>

          <h1>
            {showForgotPassword ? "Forgot Password?" : "Login"}
          </h1>

          <p>
            {showForgotPassword
              ? "Enter your registered email address to receive instructions to reset your password."
              : "Sign in to access your programs, projects and learning dashboard."}
          </p>
        </div>

        {/* ERROR MESSAGE */}
        {error && (
          <div className="cw-login-error" role="alert">
            <i className="bi bi-exclamation-circle" />
            <span>{error}</span>
          </div>
        )}

        {/* SUCCESS / INFORMATION MESSAGE */}
        {notice && (
          <div
            className="cw-login-notice"
            role="status"
            aria-live="polite"
          >
            <i className="bi bi-check-circle" />
            <span>{notice}</span>
          </div>
        )}

        {showForgotPassword ? (
          /* FORGOT PASSWORD FORM */
          <form onSubmit={handleForgotPassword}>
            <div className="cw-login-field">
              <label htmlFor="forgot-email">
                Registered Email Address
              </label>

              <div className="cw-login-input-wrap">
                <i className="bi bi-envelope" />

                <input
                  id="forgot-email"
                  name="forgotEmail"
                  type="email"
                  placeholder="you@example.com"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  autoComplete="email"
                  required
                  disabled={loading}
                />
              </div>
            </div>

            <button
              className="cw-login-submit"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span
                    className="cw-login-spinner"
                    aria-hidden="true"
                  />
                  Sending instructions...
                </>
              ) : (
                <>
                  Send Reset Instructions
                  <i className="bi bi-arrow-right" />
                </>
              )}
            </button>

            <button
              type="button"
              className="cw-login-back-button"
              onClick={returnToLogin}
              disabled={loading}
            >
              <i className="bi bi-arrow-left" />
              Back to Login
            </button>
          </form>
        ) : (
          /* LOGIN FORM */
          <form onSubmit={handleSubmit}>
            <div className="cw-login-field">
              <label htmlFor="login-email">Email Address</label>

              <div className="cw-login-input-wrap">
                <i className="bi bi-envelope" />

                <input
                  id="login-email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  autoComplete="email"
                  required
                  disabled={loading}
                />
              </div>
            </div>

            <div className="cw-login-field">
              <div className="cw-login-password-heading">
                <label htmlFor="login-password">Password</label>

                <button
                  type="button"
                  className="cw-login-forgot-link"
                  onClick={openForgotPassword}
                >
                  Forgot Password?
                </button>
              </div>

              <div className="cw-login-input-wrap">
                <i className="bi bi-lock" />

                <input
                  id="login-password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  autoComplete="current-password"
                  required
                  disabled={loading}
                />
              </div>
            </div>

            <button
              className="cw-login-submit"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span
                    className="cw-login-spinner"
                    aria-hidden="true"
                  />
                  Signing in...
                </>
              ) : (
                <>
                  Sign In
                  <i className="bi bi-arrow-right" />
                </>
              )}
            </button>
          </form>
        )}

        {/* REGISTER LINK */}
        {!showForgotPassword && (
          <div className="cw-login-footer">
            Don't have an account?{" "}
            <Link to="/register">Register here</Link>
          </div>
        )}

        {/* HOME LINK */}
        <Link to="/" className="cw-login-home">
          <i className="bi bi-arrow-left" />
          Back to website
        </Link>
      </section>
    </main>
  );
}

export default Login;
