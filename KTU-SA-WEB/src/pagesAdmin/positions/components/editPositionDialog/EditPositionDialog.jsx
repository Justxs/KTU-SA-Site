import React from "react";
import DialogBase from "../../../../components/dialogBase/DialogBase";
import useAxiosRequest from "../../../../hooks/useAxiosRequest";
import { ENDPOINTS } from "../../../../constants/endpoints";
import { HTTP_METHODS } from "../../../../constants/http";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";

export default function EditPositionDialog(props) {
  const { open, handleClose, title, position, onSuccess } = props;
  const { handleSubmit } = useForm();
  const { sendRequest } = useAxiosRequest();

  const onSubmit = (data) => {
    sendRequest(
      {
        url: ENDPOINTS.POSITIONS + "/" + position.id,
        method: HTTP_METHODS.patch,
        data: data,
      },
      onSuccess
    );
    handleClose();
  };

  return (
    <DialogBase
      open={open}
      handleClose={handleClose}
      onSubmit={handleSubmit(onSubmit)}
      title={title}
    ></DialogBase>
  );
}

EditPositionDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  position: PropTypes.shape({
    id: PropTypes.string,
    role: PropTypes.string,
    saUnit: PropTypes.string,
  }),
};

EditPositionDialog.defaultProps = {
  position: null,
};
