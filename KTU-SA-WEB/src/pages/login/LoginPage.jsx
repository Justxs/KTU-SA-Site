import React, { useCallback } from "react";
import { Button, CircularProgress } from "@mui/material";
import { ENDPOINTS } from "../../constants/endpoints";
import { HTTP_METHODS } from "../../constants/http";
import useAxiosRequest from "../../hooks/useAxiosRequest";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/authContext";
import styles from "./LoginPage.module.css";
import HeroImage from "../../components/heroImage/HeroImage";
import Body from "../../components/body/Body";
import logo from "../../assets/KTU_SA_baltas.png";

function LoginPage() {
  const { login } = useAuthContext();
  const { sendRequest, isLoading } = useAxiosRequest();
  const navigate = useNavigate();

  const onSuccess = (responseData) => {
    login(responseData.jwtToken);

    return navigate("/admin");
  };

  const onError = () => {
    return navigate("/");
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
      <HeroImage title="KTU SA login" description="Login page for admin" />
      <Body>
        <div className={styles.Container}>
          <Button variant="contained" onClick={handleButtonClick}>
            {isLoading ? (
              <CircularProgress color="secondary" size={24} />
            ) : (
              <>
                <img className={styles.Logo} src={logo} />
                KTU SA member login
              </>
            )}
          </Button>
        </div>
      </Body>
    </div>
  );
}

export default LoginPage;
