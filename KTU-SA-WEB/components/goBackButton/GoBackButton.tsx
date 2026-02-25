'use client';

import styled from '@emotion/styled';
import { Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

const BackButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'customColor' && prop !== 'customHover',
})<{
  customColor?: string;
  customHover?: string;
}>(({ customColor, customHover }) => ({
  textTransform: 'none',
  padding: '12px',
  fontFamily: 'PFDinTextPro-Regular',
  fontWeight: '600',
  fontSize: '24px',
  lineHeight: '1',
  color: customColor,
  '&:hover': {
    color: customHover,
    background: 'transparent',
  },
}));

export default function GoBackButton({ color, onHover }: Readonly<{ color?: string; onHover?: string }>) {
  const t = useTranslations();
  const router = useRouter();

  const goBack = () => {
    router.back();
  };

  return (
    <BackButton customColor={color} customHover={onHover} onClick={goBack} sx={{ color }}>
      <ArrowBackIcon />
      {t('common.goBack')}
    </BackButton>
  );
}
