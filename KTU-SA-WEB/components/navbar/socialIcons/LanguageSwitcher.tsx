'use client';

import { LANGUAGES } from '@constants/Languages';
import { useLocale } from 'next-intl';
import Image from 'next/image';
import LtFlag from '@public/assets/flags/LT-flag.svg';
import EnFlag from '@public/assets/flags/EN-flag.svg';
import { usePathname, useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { Box } from '@mui/material';
import colors from '@theme/colors';

export default function LanguageSwitcher() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const locale = useLocale();
  const pathname = usePathname();

  const toggleLanguage = () => {
    const newLocale = locale === LANGUAGES.EN ? LANGUAGES.LT : LANGUAGES.EN;

    startTransition(() => {
      router.push(pathname.replace(locale, newLocale));
    });
  };

  const flagSrc = locale === LANGUAGES.EN ? EnFlag : LtFlag;
  const altText = locale === LANGUAGES.EN ? 'English' : 'Lithuanian';

  const targetLanguage = locale === LANGUAGES.EN ? 'Lietuvių' : 'English';

  return (
    <Box
      component="button"
      type="button"
      onClick={toggleLanguage}
      disabled={isPending}
      aria-label={`Switch language to ${targetLanguage}`}
      sx={{
        background: 'none',
        border: 'none',
        p: 0,
        cursor: 'pointer',
        '&:focus-visible': {
          outline: `2px solid ${colors.focusBlue}`,
          borderRadius: '5px',
        },
      }}
    >
      <Box
        component={Image}
        alt={altText}
        src={flagSrc}
        sx={{
          borderRadius: '3px',
          height: '20px',
          width: '35px',
          objectFit: 'cover',
          cursor: 'pointer',
        }}
      />
    </Box>
  );
}
