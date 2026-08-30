'use client';

import { useEffect } from 'react';
import { track } from '@vercel/analytics';
import { Box, Button, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';
import colors from '@theme/colors';

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error({ error, reset }: Readonly<Props>) {
  const t = useTranslations('common');

  useEffect(() => {
    console.error('Route rendering failed.', error);
    track('route_error', { digest: error.digest ?? 'unavailable' });
  }, [error]);

  return (
    <Box
      role="alert"
      sx={{
        minHeight: '50vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        px: 3,
        py: 8,
      }}
    >
      <Typography component="h1" sx={{ color: colors.primaryDark, fontSize: 32, fontWeight: 700 }}>
        {t('errorTitle')}
      </Typography>
      <Typography sx={{ color: colors.grayContact, mt: 1, mb: 3, maxWidth: 560 }}>
        {t('errorDescription')}
      </Typography>
      <Button variant="contained" onClick={reset}>
        {t('retry')}
      </Button>
    </Box>
  );
}
