import React from "react";
import MultiSelectField from "../../../../components/inputFields/MultiSelectField";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { ENDPOINTS } from "../../../../constants/endpoints";
import { HTTP_METHODS } from "../../../../constants/http";
import useAxiosRequest from "../../../../hooks/useAxiosRequest";
import DialogBase from "../../../../components/dialogBase/DialogBase";

export default function AssignPositionDialog(props) {
  const { open, handleClose, onSuccess, saUnits, position } = props;
  const { sendRequest } = useAxiosRequest();
  const { control, handleSubmit } = useForm();

  const onSubmit = (data) => {
    sendRequest(
      {
        url: ENDPOINTS.POSITIONS_SA_UNITS(position.id),
        method: HTTP_METHODS.post,
        data: data,
      },
      onSuccess
    );
    handleClose();
  };
  const saUnitOptions = saUnits.map((saUnit) => ({
    value: saUnit.id,
    label: saUnit.name,
  }));

  return (
    <DialogBase
      open={open}
      handleClose={handleClose}
      onSubmit={handleSubmit(onSubmit)}
      title={`Assign ${position} Position to sa unit`}
    >
      <MultiSelectField
        control={control}
        name="saUnitIds"
        label="SA Units"
        options={saUnitOptions}
      />
    </DialogBase>
  );
}

AssignPositionDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
  saUnits: PropTypes.arrayOf(Object).isRequired,
  position: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
  }).isRequired,
};
