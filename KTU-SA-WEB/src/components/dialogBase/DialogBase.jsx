import {
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import React from "react";
import PropTypes from "prop-types";

export default function DialogBase(props) {
  const { open, handleClose, title, children } = props;

  return (
    <Dialog
      open={open} 
      onClose={handleClose}
      maxWidth="md"
      disableScrollLock 
      fullWidth 
    >
      <DialogTitle>
        <Typography align="center" variant="inherit">
          {title}
        </Typography>
      </DialogTitle>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
}

DialogBase.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};


