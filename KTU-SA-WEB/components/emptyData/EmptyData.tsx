'use client';

import GoBackButton from '@components/goBackButton/GoBackButton';
import { Box, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';
import colors from '@theme/colors';

export default function EmptyData({ length = 1 }: Readonly<{ length: number }>) {
  const t = useTranslations();

  if (length !== 0) {
    return null;
  }

  return (
    <>
      <Typography
        variant="h5"
        component="h2"
        sx={{ textAlign: 'center', color: colors.primaryDark }}
      >
        {t('common.noData')}
      </Typography>
      <Typography sx={{ textAlign: 'center', color: colors.primaryDark }}>
        {t('common.tryAgain')}
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <GoBackButton />
      </Box>
    </>
  );
}
