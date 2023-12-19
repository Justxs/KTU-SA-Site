import React from "react";
import { Controller } from "react-hook-form";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
  Chip,
} from "@mui/material";
import PropTypes from "prop-types";
import styled from "@emotion/styled";

const StyledChip = styled(Chip)({
  margin: "5px",
});

export default function MultiSelectField({
  control,
  name,
  label,
  options,
  defaultValue,
}) {
  return (
    <FormControl fullWidth margin="normal">
      <InputLabel>{label}</InputLabel>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field }) => (
          <Select
            {...field}
            multiple
            input={<OutlinedInput label={label} />}
            renderValue={(selected) => (
              <div style={{ display: "flex", flexWrap: "wrap" }}>
                {selected.map((value) => (
                  <StyledChip
                    key={value}
                    label={
                      options.find((option) => option.value === value).label
                    }
                  />
                ))}
              </div>
            )}
          >
            {options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        )}
      />
    </FormControl>
  );
}

MultiSelectField.propTypes = {
  control: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.any.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  defaultValue: PropTypes.array,
};

MultiSelectField.defaultProps = {
  defaultValue: [],
};
