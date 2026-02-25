import React from 'react';
import { Box } from '@mui/material';
import { getTranslations } from 'next-intl/server';
import { SOCIAL_LINKS } from '@constants/SocialLinks';
import { getMainContacts } from '@api/GetContacts';
import ContactsSection from '@components/contactsSection/ContactsSection';
import colors from '@theme/colors';

export default async function MainContacts({ saUnit }: Readonly<{ saUnit: string }>) {
  const t = await getTranslations();
  const mainContacts = await getMainContacts(saUnit);

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-around',
        mb: '60px',
        '@media (max-width: 950px)': {
          flexDirection: 'column',
          alignItems: 'center',
        },
      }}
    >
      <Box component="h1" sx={{ color: colors.primaryDark, textAlign: 'center' }}>
        {t('mainContacts.letsTalk')}
      </Box>
      <Box
        sx={{
          display: 'flex',
          gap: '20px',
          '@media (max-width: 550px)': {
            flexDirection: 'column',
          },
        }}
      >
        <ContactsSection
          email={mainContacts.email}
          phoneNumber={mainContacts.phoneNumber}
          address={mainContacts.address}
          facebookUrl={SOCIAL_LINKS.FACEBOOK}
          linkedInUrl={SOCIAL_LINKS.LINKEDIN}
          instagramUrl={SOCIAL_LINKS.INSTAGRAM}
        />
        <Box>
          <Box sx={{ color: colors.linkBlue, fontWeight: 700, fontSize: 20, mb: '3px' }}>
            {t('mainContacts.workingHours')}
          </Box>
          <Box>{t('mainContacts.weekdays')}</Box>
          <Box>{t('mainContacts.hours')}</Box>
          <Box>{t('mainContacts.friday')}</Box>
          <Box>{t('mainContacts.friday_hours')}</Box>
        </Box>
      </Box>
    </Box>
  );
}
