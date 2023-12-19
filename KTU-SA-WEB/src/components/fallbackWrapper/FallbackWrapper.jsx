import React from "react";
import PropTypes from "prop-types";
import { CircularProgress } from "@mui/material";

export default function FallbackWrapper(props) {
  const { isLoading, error, data, emptyMessage, children } = props;
  console.log(props);
  if (isLoading) {
    return <CircularProgress color="primary" />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (data === null || data?.length === 0) {
    return <div>{emptyMessage}</div>;
  }

  return <>{children}</>;
}

FallbackWrapper.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.shape({
    message: PropTypes.string,
  }),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  data: PropTypes.arrayOf(Object),
  emptyMessage: PropTypes.string.isRequired,
};

FallbackWrapper.defaultProps = {
  data: null,
  error: null,
};
