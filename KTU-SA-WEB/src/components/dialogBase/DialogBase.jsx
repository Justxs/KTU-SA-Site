import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';
import CloseIcon from '@mui/icons-material/Close';

export default function DialogBase(props) {
  const {
    open, handleClose, title, children,
  } = props;

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
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
        }}
      >
        <CloseIcon />
      </IconButton>
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
