import React from "react";
import PropTypes from "prop-types";
import { CircularProgress } from "@mui/material";

export default function FallbackWrapper(props) {
  const { isLoading, error, data, emptyMessage, children } = props;

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  
  if (isLoading || data === null) {
    return <CircularProgress color="primary" />;
  }

  if (data?.length === 0) {
    return <div>{emptyMessage}</div>;
  }

  return <>{children}</>;
}

FallbackWrapper.propTypes = {
  isLoading: PropTypes.bool,
  error: PropTypes.shape({
    message: PropTypes.string,
  }),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  data: PropTypes.arrayOf(Object),
  emptyMessage: PropTypes.string,
};

FallbackWrapper.defaultProps = {
  data: null,
  error: null,
  emptyMessage: "",
  isLoading: false,
};
