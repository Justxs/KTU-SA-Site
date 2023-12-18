import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import React from "react";
import PropTypes from "prop-types";

export default function DialogBase(props) {
  const { open, handleClose, onSubmit, title, children } = props;

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>
        <Typography align="center" variant="inherit">
          {title}
        </Typography>
      </DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions sx={{ justifyContent: "center" }}>
        <Button variant="contained" onClick={onSubmit}>
          Submit
        </Button>
        <Button variant="contained" color="error" onClick={handleClose}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}

DialogBase.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node,
};

DialogBase.defaultProps = {
  children: null,
};
