
import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoute = () => {
  const location = useLocation();
  const token = localStorage.getItem("capwareToken");
  const storedUser = localStorage.getItem("capwareUser");

  let user = null;

  try {
    user = storedUser ? JSON.parse(storedUser) : null;
  } catch {
    localStorage.removeItem("capwareToken");
    localStorage.removeItem("capwareUser");
  }

  // Require both a token and a valid stored user.
  if (!token || !user || !user.id) {
    return (
      <Navigate
        to="/login"
        replace
        state={{
          from: `${location.pathname}${location.search}`,
        }}
      />
    );
  }

  return <Outlet />;
};

export default ProtectedRoute;
