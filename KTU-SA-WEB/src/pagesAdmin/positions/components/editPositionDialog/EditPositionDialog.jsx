import React, { useEffect } from "react";
import DialogBase from "../../../../components/dialogBase/DialogBase";
import useAxiosRequest from "../../../../hooks/useAxiosRequest";
import { ENDPOINTS } from "../../../../constants/endpoints";
import { HTTP_METHODS } from "../../../../constants/http";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import TextInputField from "../../../../components/inputFields/TextInputField";

export default function EditPositionDialog(props) {
  const { open, handleClose, position, onSuccess } = props;
  const { control, handleSubmit, reset } = useForm();
  const { sendRequest } = useAxiosRequest();

  useEffect(() => {
    reset({ name: position?.name, description: position?.description });
  }, [position, reset]);

  const onSubmit = (data) => {
    sendRequest(
      {
        url: ENDPOINTS.POSITIONS + "/" + position.id,
        method: HTTP_METHODS.put,
        data: data,
      },
      onSuccess
    );
    handleClose();
  };

  return (
    <DialogBase
      open={open}
      handleClose={() => {
        handleClose();
        reset();
      }}
      onSubmit={handleSubmit(onSubmit)}
      title={`Edit ${position.name} position`}
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

EditPositionDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
  position: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
};
