import React from "react";
import PropTypes from "prop-types";
import { Controller } from "react-hook-form";
import { TextField } from "@mui/material";

export default function TextInputField(props) {
  const { control, name, label, defaultValue, multiline, rows } = props;
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field }) => (
        <TextField
          {...field}
          label={label}
          variant="outlined"
          margin="normal"
          fullWidth
          multiline={multiline}
          rows={rows || 1}
        />
      )}
    />
  );
}

TextInputField.propTypes = {
  control: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  defaultValue: PropTypes.any,
  multiline: PropTypes.bool,
  rows: PropTypes.number,
};

TextInputField.defaultProps = {
  multiline: false,
  defaultValue: "",
  rows: 1,
};
