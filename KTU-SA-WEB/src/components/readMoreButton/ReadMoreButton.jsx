import { Button, styled } from "@mui/material";
import React from "react";
import styles from "./ReadMoreButton.module.css";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const CustomButton = styled(Button)({
  backgroundColor: "#0E2643",
  color: "#F6F7F8",
  textTransform: "none",
  padding: "12px",
  fontSize: "20px",
});

export default function ReadMoreButton(props) {
  const { path, title } = props;
  const navigate = useNavigate();

  return (
    <CustomButton
      variant="contained"
      className={styles.Button}
      onClick={() => navigate(path)}
    >
      {title}
      <ArrowForwardIcon />
    </CustomButton>
  );
}

ReadMoreButton.propTypes = {
  path: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};
