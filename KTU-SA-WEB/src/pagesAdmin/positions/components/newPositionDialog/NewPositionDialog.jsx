import React from "react";
import DialogBase from "../../../../components/dialogBase/DialogBase";
import TextInputField from "../../../../components/inputFields/TextInputField";
import PropTypes from "prop-types";
import useAxiosRequest from "../../../../hooks/useAxiosRequest";
import { useForm } from "react-hook-form";
import { ENDPOINTS } from "../../../../constants/endpoints";
import { HTTP_METHODS } from "../../../../constants/http";

export default function NewPositionDialog(props) {
  const { open, handleClose, onSuccess } = props;
  const { sendRequest } = useAxiosRequest();
  const { control, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    sendRequest(
      {
        url: ENDPOINTS.POSITIONS,
        method: HTTP_METHODS.post,
        data: data,
      },
      () => {
        onSuccess();
        reset();
      }
    );
    handleClose();
  };

  return (
    <DialogBase
      open={open}
      handleClose={handleClose}
      onSubmit={handleSubmit(onSubmit)}
      title="Create Position"
    >
      <TextInputField control={control} name="name" label="Name" />
      <TextInputField
        control={control}
        name="description"
        label="Description"
        multiline
        rows={4}
      />
    </DialogBase>
  );
}

NewPositionDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
};
