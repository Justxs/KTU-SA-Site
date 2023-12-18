import React from "react";
import DialogBase from "../dialogBase/DialogBase";
import PropTypes from "prop-types";

export default function ConfirmationDialog(props) {
  const { open, handleClose, onSubmit, title } = props;

  return (
    <DialogBase
      open={open}
      handleClose={handleClose}
      onSubmit={onSubmit}
      title={title}
    />
  );
}

ConfirmationDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};
