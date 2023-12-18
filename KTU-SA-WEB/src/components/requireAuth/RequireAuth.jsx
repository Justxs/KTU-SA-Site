import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

export default function RequireAuth({ allowedRoles, userRole }) {
  const location = useLocation();

  return allowedRoles?.includes(userRole) ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
}

RequireAuth.propTypes = {
  allowedRoles: PropTypes.arrayOf(PropTypes.string).isRequired,
  userRole: PropTypes.string.isRequired,
};
