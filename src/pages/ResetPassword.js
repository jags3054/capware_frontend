
import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import "../styles/ResetPassword.css";

const API_URL = "http://localhost:5000/api/auth";

export default function ResetPassword() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!token) {
      setError("Reset token is missing. Please request a new reset link.");
      return;
    }

    if (password.length < 8) {
      setError("Password must contain at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(`${API_URL}/reset-password`, {
        token,
        password,
      });

      setSuccess(
        response.data?.message ||
          "Password reset successfully. You can now log in."
      );

      setTimeout(() => navigate("/login", { replace: true }), 2000);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to reset password. Please request a new reset link."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="reset-page">
      <div className="reset-card">
        <Link to="/" className="reset-brand">
          <span className="reset-brand-icon">C</span>
          <span>
            Capware <strong>Systems</strong>
          </span>
        </Link>

        <div className="reset-icon" aria-hidden="true">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            width="30"
            height="30"
          >
            <rect x="4" y="10" width="16" height="11" rx="2" />
            <path d="M8 10V7a4 4 0 0 1 8 0v3" />
            <path d="M12 14v3" />
          </svg>
        </div>

        <h1>Reset your password</h1>
        <p className="reset-subtitle">
          Create a new password for your Capware account.
        </p>

        {!token && (
          <div className="reset-alert reset-error" role="alert">
            Reset token is missing. Please request a new password reset link.
          </div>
        )}

        {error && (
          <div className="reset-alert reset-error" role="alert">
            {error}
          </div>
        )}

        {success && (
          <div className="reset-alert reset-success" role="status">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <label htmlFor="new-password">New password</label>
          <div className="reset-password-wrap">
            <input
              id="new-password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={8}
              autoComplete="new-password"
              required
              disabled={!token || loading || Boolean(success)}
            />
            <button
              type="button"
              className="reset-toggle"
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          <label htmlFor="confirm-password">Confirm password</label>
          <div className="reset-password-wrap">
            <input
              id="confirm-password"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Re-enter new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              minLength={8}
              autoComplete="new-password"
              required
              disabled={!token || loading || Boolean(success)}
            />
            <button
              type="button"
              className="reset-toggle"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              aria-label={
                showConfirmPassword ? "Hide password" : "Show password"
              }
            >
              {showConfirmPassword ? "Hide" : "Show"}
            </button>
          </div>

          <p className="reset-hint">
            Use at least 8 characters for your password.
          </p>

          <button
            type="submit"
            className="reset-submit"
            disabled={!token || loading || Boolean(success)}
          >
            {loading ? "Updating password..." : "Reset Password"}
          </button>
        </form>

        <p className="reset-footer">
          Remembered your password? <Link to="/login">Sign in</Link>
        </p>
      </div>
    </main>
  );
}
