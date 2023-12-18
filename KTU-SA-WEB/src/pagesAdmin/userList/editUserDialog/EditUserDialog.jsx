import React, { useEffect } from "react";
import DialogBase from "../../../components/dialogBase/DialogBase";
import PropTypes from "prop-types";
import useAxiosRequest from "../../../hooks/useAxiosRequest";
import { ENDPOINTS } from "../../../constants/endpoints";
import { HTTP_METHODS } from "../../../constants/http";
import { useForm } from "react-hook-form";
import { ROLES } from "../../../constants/roles";
import { SA_UNITS } from "../../../constants/saUnits";
import SelectField from "../../../components/inputFields/SelectField";

export default function EditUserDialog(props) {
  const { open, handleClose, title, user, onSuccess } = props;
  const { sendRequest } = useAxiosRequest();
  const { control, handleSubmit, reset } = useForm();

  const roleOptions = Object.entries(ROLES).map(([key, value]) => ({
    value: value,
    label: key,
  }));

  useEffect(() => {
    reset({ role: user?.role, saUnit: user?.saUnit });
  }, [user, reset]);

  const onSubmit = (data) => {
    sendRequest(
      {
        url: ENDPOINTS.USERS + "/" + user.id,
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
    >
      <SelectField
        control={control}
        name="role"
        label="Role"
        defaultValue={user?.role}
        options={roleOptions}
      />
      <SelectField
        control={control}
        name="saUnit"
        label="SA Unit"
        defaultValue={user?.saUnit}
        options={SA_UNITS.map((saUnit) => ({ value: saUnit, label: saUnit }))}
      />
    </DialogBase>
  );
}

EditUserDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  user: PropTypes.shape({
    id: PropTypes.string,
    role: PropTypes.string,
    saUnit: PropTypes.string,
  }),
};

EditUserDialog.defaultProps = {
  user: null,
};
