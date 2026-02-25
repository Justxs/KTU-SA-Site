import { Box } from '@mui/material';

export default function SideMargins({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <Box
      sx={{
        mx: '150px',
        '@media (max-width: 1300px)': {
          mx: '24px',
        },
      }}
    >
      {children}
    </Box>
  );
}
