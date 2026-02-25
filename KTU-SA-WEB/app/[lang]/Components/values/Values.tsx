import React from 'react';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import Diversity1Icon from '@mui/icons-material/Diversity1';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';
import EngineeringIcon from '@mui/icons-material/Engineering';
import { Box } from '@mui/material';
import { useTranslations } from 'next-intl';
import SectionName from '@components/sectionName/SectionName';
import colors from '@theme/colors';

const cardSx = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
};

const textSx = {
  color: colors.valuesGold,
  fontSize: 40,
  mt: 0,
  mb: 0,
  fontFamily: 'PFDinTextPro-Bold',
};

export default function Values() {
  const t = useTranslations();

  return (
    <Box mt={{ xs: '44px' }}>
      <SectionName title={t('sections.values')} />
      <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '50px' }}>
        <Box sx={cardSx}>
          <EngineeringIcon sx={{ fontSize: '100px', color: colors.mediumBlue }} />
          <Box component="p" sx={textSx}>
            {t('values.responsibility')}
          </Box>
        </Box>
        <Box sx={cardSx}>
          <Diversity3Icon sx={{ fontSize: '100px', color: colors.mediumBlue }} />
          <Box component="p" sx={textSx}>
            {t('values.leadership')}
          </Box>
        </Box>
        <Box sx={cardSx}>
          <Diversity1Icon sx={{ fontSize: '100px', color: colors.mediumBlue }} />
          <Box component="p" sx={textSx}>
            {t('values.community')}
          </Box>
        </Box>
        <Box sx={cardSx}>
          <EmojiObjectsIcon sx={{ fontSize: '100px', color: colors.mediumBlue }} />
          <Box component="p" sx={textSx}>
            {t('values.initiative')}
          </Box>
        </Box>
        <Box sx={cardSx}>
          <VolunteerActivismIcon sx={{ fontSize: '100px', color: colors.mediumBlue }} />
          <Box component="p" sx={textSx}>
            {t('values.honesty')}
          </Box>
        </Box>
        <Box sx={cardSx}>
          <ConnectWithoutContactIcon sx={{ fontSize: '100px', color: colors.mediumBlue }} />
          <Box component="p" sx={textSx}>
            {t('values.openness')}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
