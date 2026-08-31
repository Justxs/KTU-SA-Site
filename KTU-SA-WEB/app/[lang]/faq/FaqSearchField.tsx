'use client';

import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import SearchIcon from '@mui/icons-material/Search';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import { useRouter } from 'next/navigation';
import colors from '@theme/colors';

type Props = {
  action: string;
  defaultValue: string;
  placeholder: string;
  submitLabel: string;
};

export default function FaqSearchField({
  action,
  defaultValue,
  placeholder,
  submitLabel,
}: Readonly<Props>) {
  const router = useRouter();

  return (
    <form
      action={action}
      method="get"
      onSubmit={(event) => {
        event.preventDefault();

        const value = new FormData(event.currentTarget).get('q');
        const search = typeof value === 'string' ? value.trim() : '';

        router.push(search ? `${action}?q=${encodeURIComponent(search)}` : action);
      }}
    >
      <TextField
        name="q"
        type="search"
        defaultValue={defaultValue}
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
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  type="submit"
                  aria-label={submitLabel}
                  edge="end"
                  sx={{ color: colors.mediumBlue }}
                >
                  <ArrowForwardIcon />
                </IconButton>
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
    </form>
  );
}
