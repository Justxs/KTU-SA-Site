import React from "react";
import { useAuthContext } from "../../context/authContext";
import { Button } from "@mui/material";

const LogoutButton = () => {
  const { logout } = useAuthContext();

  const handleLogout = () => {
    logout();
  };

  return (
    <Button variant="contained" color="error" onClick={handleLogout}>
      Logout
    </Button>
  );
};

export default LogoutButton;
