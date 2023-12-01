import React, { useCallback } from "react";
import { Button, CircularProgress } from "@mui/material";
import { ENDPOINTS } from "../../constants/endpoints";
import { HTTP_METHODS } from "../../constants/http";
import useAxiosRequest from "../../hooks/useAxiosRequest";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/authContext";

function LoginPage() {
  const { login } = useAuthContext();
  const { sendRequest, isLoading } = useAxiosRequest();
  const navigate = useNavigate();

  const onSuccess = (responseData) => {
    login(responseData.jwtToken);

    return navigate("/admin");
  };

  const onError = (error) => {
    console.error(error);
  };

  const handleLogin = (code) => {
    sendRequest(
      {
        url: ENDPOINTS.AUTH.LOGIN,
        method: HTTP_METHODS.post,
        data: code,
      },
      onSuccess,
      onError
    );
  };

  /* global google*/
  const client = google.accounts.oauth2.initCodeClient({
    client_id: import.meta.env.VITE_GOOGLE_LOGIN_CLIENT_ID,
    scope: "openid email",
    redirect_uri: "http://localhost:5173",
    ux_mode: "popup",
    callback: (response) => handleLogin(response.code),
  });

  const handleButtonClick = useCallback(() => {
    client.requestCode();
  }, [client]);

  return (
    <div>
      <Button onClick={handleButtonClick}>
        {isLoading ? <CircularProgress size={24} /> : "Authorize with Google"}
      </Button>
    </div>
  );
}

export default LoginPage;
