import React from "react";
import PropTypes from "prop-types";
import { Controller } from "react-hook-form";
import { TextField } from "@mui/material";

export default function TextInputField(props) {
  const { control, name, label, defaultValue, multiline, rows, error, rules } = props;
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      rules={rules}
      render={({ field, fieldState: { error: fieldError } }) => (
        <TextField
          {...field}
          label={label}
          variant="outlined"
          margin="normal"
          fullWidth
          multiline={multiline}
          rows={rows || 1}
          error={!!fieldError || !!error}
          helperText={fieldError?.message || error?.message}
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
  error: PropTypes.object,
  rules: PropTypes.object,
};

TextInputField.defaultProps = {
  multiline: false,
  defaultValue: "",
  rows: 1,
  error: null,
  rules: {},
};
