import React from 'react';
import PropTypes from 'prop-types';
import DialogBase from '../../../components/dialogBase/DialogBase';

export default function DocumentDialog(props) {
  const {
    pdfUrl, open, handleClose, title,
  } = props;

  return (
    <DialogBase
      open={open}
      handleClose={handleClose}
      title={title}
    >
      <iframe
        title={title}
        src={pdfUrl}
        style={{ width: '100%', height: '100vh' }}
      >
        This browser does not support PDFs. Please download the PDF to view it.
      </iframe>
    </DialogBase>
  );
}

DocumentDialog.propTypes = {
  pdfUrl: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};
