'use client';

import { Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

export default function GoBackButton({
  color,
  onHover,
}: Readonly<{ color?: string; onHover?: string }>) {
  const t = useTranslations();
  const router = useRouter();

  const goBack = () => {
    router.back();
  };

  return (
    <Button
      onClick={goBack}
      sx={{
        textTransform: 'none',
        p: '12px',
        fontFamily: 'PFDinTextPro-Regular',
        fontWeight: 600,
        fontSize: '24px',
        lineHeight: 1,
        color,
        '&:hover': {
          color: onHover,
          backgroundColor: 'transparent',
        },
      }}
    >
      <ArrowBackIcon />
      {t('common.goBack')}
    </Button>
  );
}
