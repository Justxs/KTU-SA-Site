'use client';

import HelpOutlineIcon from '@mui/icons-material/HelpOutlineOutlined';
import { Box, Typography } from '@mui/material';
import colors from '@theme/colors';

type Props = {
  message: string;
};

export default function FaqEmptyState({ message }: Readonly<Props>) {
  return (
    <Box
      sx={{
        textAlign: 'center',
        py: 6,
        px: 3,
        borderRadius: '16px',
        backgroundColor: colors.lightBlueBg,
        border: `1px dashed ${colors.navbarLightBlue}`,
      }}
    >
      <HelpOutlineIcon sx={{ fontSize: 48, color: colors.lightBlueAccent, mb: 1, opacity: 0.7 }} />
      <Typography
        sx={{
          color: colors.grayContact,
          fontSize: 16,
          fontWeight: 500,
        }}
      >
        {message}
      </Typography>
    </Box>
  );
}
