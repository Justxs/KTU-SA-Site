'use client';

import SearchIcon from '@mui/icons-material/Search';
import { InputAdornment, TextField } from '@mui/material';
import colors from '@theme/colors';

type Props = {
  onChange: (value: string) => void;
  placeholder: string;
  value: string;
};

export default function FaqSearchField({ onChange, placeholder, value }: Readonly<Props>) {
  return (
    <TextField
      value={value}
      onChange={(e) => {
        onChange(e.target.value);
      }}
      placeholder={placeholder}
      variant="outlined"
      fullWidth
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ color: colors.mediumBlue }} />
            </InputAdornment>
          ),
        },
      }}
      sx={{
        '& .MuiOutlinedInput-root': {
          borderRadius: '14px',
          backgroundColor: colors.lightBlueBg,
          transition: 'box-shadow 0.2s ease, border-color 0.2s ease',
          '& fieldset': {
            borderColor: colors.navbarLightBlue,
          },
          '&:hover fieldset': {
            borderColor: colors.lightBlueAccent,
          },
          '&.Mui-focused fieldset': {
            borderColor: colors.mediumBlue,
            borderWidth: 2,
          },
          '&.Mui-focused': {
            boxShadow: `0 0 0 4px ${colors.mediumBlue}14`,
          },
        },
      }}
    />
  );
}
