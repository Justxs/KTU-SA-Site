import { Delete } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import React, { useState } from 'react';
import PropTypes from "prop-types";
import useAxiosRequest from '../../../../hooks/useAxiosRequest';
import { ENDPOINTS } from '../../../../constants/endpoints';
import { HTTP_METHODS } from '../../../../constants/http';
import ConfirmationDialog from '../../../../components/confirmationDialog/ConfirmationDialog';

export default function DeleteButton({ contact, refetch }) {
  const [openDelete, setOpenDelete] = useState(false);
  const { sendRequest } = useAxiosRequest();

  const handleDelete = (contactId) => {
    sendRequest(
      {
        url: ENDPOINTS.CONTACTS + "/" + contactId,
        method: HTTP_METHODS.delete,
      },
      () => {
        setOpenDelete(false);
        refetch();
      }
    );
    setOpenDelete(false);
  };
  return (
    <>
      <IconButton color="error" onClick={() => setOpenDelete(true)}>
        <Delete />
      </IconButton>
      <ConfirmationDialog
        open={openDelete}
        handleClose={() => setOpenDelete(false)}
        onSubmit={() => handleDelete(contact.id)}
        title={`Are you sure you want to delete ${contact.fullName} contact?`}
      />
    </>
  );
}

DeleteButton.propTypes = {
  contact: PropTypes.arrayOf(Object).isRequired,
  refetch: PropTypes.func.isRequired,
};