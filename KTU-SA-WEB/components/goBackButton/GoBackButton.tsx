'use client';

import styled from '@emotion/styled';
import { Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

export default function GoBackButton({ color, onHover } : { color? : string, onHover? : string}) {
  const t = useTranslations();
  const router = useRouter();

  const BackButton = styled(Button)(({}) => ({
    textTransform: 'none',
    padding: '12px',
    fontFamily: 'PFDinTextPro-Regular',
    fontWeight: '600',
    fontSize: '24px',
    lineHeight: '1',
    color: color,
    '&:hover': {
      color: onHover, 
      background: 'transparent'
    }
  }));

  const goBack = () => {
    router.back();
  };

  return (
    <BackButton sx={{ color }} onClick={goBack}>
      <ArrowBackIcon />
      {t('common.goBack')}
    </BackButton>
  );
}

