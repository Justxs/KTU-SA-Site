import React from "react";
import { useAuthContext } from "../../context/authContext";

const LogoutButton = () => {
  const { logout } = useAuthContext();

  const handleLogout = () => {
    logout();
  };

  // eslint-disable-next-line react/jsx-no-bind
  return <button onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;
