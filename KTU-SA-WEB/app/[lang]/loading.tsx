import { Box, CircularProgress } from '@mui/material';

export default function Loading() {
  return (
    <Box
      component="output"
      aria-label="Loading"
      sx={{ minHeight: '50vh', display: 'grid', placeItems: 'center' }}
    >
      <CircularProgress />
    </Box>
  );
}
