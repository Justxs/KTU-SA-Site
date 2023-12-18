import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { AuthContext } from "./authContext";
import useAxiosRequest from "../hooks/useAxiosRequest";
import { ENDPOINTS } from "../constants/endpoints";
import { HTTP_METHODS } from "../constants/http";
import axiosClient from "../api/axiosClient";
import { jwtDecode } from "jwt-decode";

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    sessionStorage.getItem("jwtToken") != null
  ); // To Do add validation for jwtToken
  
  const [userRole, setUserRole] = useState(null);
  const [userSaUnit, setUserSaUnit] = useState(null);
  const [userEmail, setUserEmail] = useState(null);

  const { sendRequest } = useAxiosRequest();

  useEffect(() => {
    const token = sessionStorage.getItem("jwtToken");
    if (token) {
      axiosClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const decoded = jwtDecode(token);
      setUserRole(decoded.saRole || null);
      setUserSaUnit(decoded.saUnit || null);
      setUserEmail(decoded.email || null);
    }
  }, []);

  const login = (token) => {
    sessionStorage.setItem("jwtToken", token);
    axiosClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    const decoded = jwtDecode(token);
    setUserRole(decoded.role || null);
    setUserSaUnit(decoded.SaUnit || null);
    setUserEmail(decoded.email || null);
    setIsAuthenticated(true);
  };

  const logout = () => {
    sessionStorage.removeItem("jwtToken");
    setUserRole(null);
    setUserSaUnit(null);
    setUserEmail(null);
    setIsAuthenticated(false);

    sendRequest({
      url: ENDPOINTS.AUTH.LOGOUT,
      method: HTTP_METHODS.post,
    });
    axiosClient.defaults.headers.common["Authorization"] = null;
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        userRole,
        userSaUnit,
        userEmail,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
