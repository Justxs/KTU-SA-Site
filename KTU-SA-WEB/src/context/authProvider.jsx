import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { AuthContext } from "./authContext";
import useAxiosRequest from "../hooks/useAxiosRequest";
import { ENDPOINTS } from "../constants/endpoints";
import { HTTP_METHODS } from "../constants/http";
import axiosClient from "../api/axiosClient";

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    sessionStorage.getItem("jwtToken") != null
  ); // To Do add validation for jwtToken
  const { sendRequest } = useAxiosRequest();

  useEffect(() => {
    const token = sessionStorage.getItem("jwtToken");
    if (token) {
      axiosClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  }, []);

  const login = (token) => {
    sessionStorage.setItem("jwtToken", token);
    axiosClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    setIsAuthenticated(true);
  };

  const logout = () => {
    sessionStorage.removeItem("jwtToken");
    setIsAuthenticated(false);
    sendRequest({
      url: ENDPOINTS.AUTH.LOGOUT,
      method: HTTP_METHODS.post,
    });
    axiosClient.defaults.headers.common["Authorization"] = null;
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
