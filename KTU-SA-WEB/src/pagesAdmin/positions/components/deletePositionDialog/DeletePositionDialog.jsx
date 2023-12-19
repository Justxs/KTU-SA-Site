import React from "react";
import ConfirmationDialog from "../../../../components/confirmationDialog/ConfirmationDialog";
import useAxiosRequest from "../../../../hooks/useAxiosRequest";
import { HTTP_METHODS } from "../../../../constants/http";
import { ENDPOINTS } from "../../../../constants/endpoints";
import PropTypes from "prop-types";

export default function DeletePositionDialog(props) {
  const { onSuccess, handleClose, open, position } = props;
  const { sendRequest } = useAxiosRequest();

  const handleDelete = (positionId) => {
    sendRequest(
      {
        url: ENDPOINTS.POSITIONS + "/" + positionId,
        method: HTTP_METHODS.delete,
      },
      onSuccess
    );
    handleClose();
  };
  return (
    <>
      <ConfirmationDialog
        open={open}
        handleClose={handleClose}
        onSubmit={() => handleDelete(position.id)}
        title={`Are you sure you want to delete ${position.name} position?`}
      />
    </>
  );
}

DeletePositionDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
  position: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
};
