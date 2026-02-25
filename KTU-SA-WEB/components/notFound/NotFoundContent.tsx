import GoBackButton from '@components/goBackButton/GoBackButton';
import { Box } from '@mui/material';

export default function NotFoundContent() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '80vh',
      }}
    >
      <h1>404 Not found</h1>
      <GoBackButton />
    </Box>
  );
}
