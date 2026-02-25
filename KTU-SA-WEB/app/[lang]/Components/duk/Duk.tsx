import { Box } from '@mui/material';
import ReadMoreButton from '@components/readMoreButton/ReadMoreButton';
import SectionName from '@components/sectionName/SectionName';
import DukCard from '@components/dukCard/DukCard';
import { getLocale, getTranslations } from 'next-intl/server';
import { getDuks } from '@api/GetDuks';
import colors from '@theme/colors';

export default async function Duk() {
  const t = await getTranslations();
  const locale = await getLocale();
  const duks = await getDuks(locale, 4);

  if (duks?.length === 0) return null;

  return (
    <Box sx={{ bgcolor: colors.lightBlueBg }}>
      <Box
        sx={{
          pt: '44px',
          ml: '150px',
          '@media (max-width: 1200px)': {
            ml: '24px',
          },
        }}
      >
        <SectionName title={t('sections.duk')} />
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          mb: '44px',
          '& > *:nth-of-type(odd)': {
            transform: 'rotate(5deg)',
            ml: '-30px',
          },
          '& > *:nth-of-type(even)': {
            transform: 'rotate(-15deg)',
            ml: '-20px',
          },
          '@media (max-width: 940px)': {
            flexDirection: 'column',
            alignItems: 'center',
            '& > *:nth-of-type(odd)': {
              ml: 0,
              width: 245,
              mt: '-20px',
            },
            '& > *:nth-of-type(even)': {
              ml: 0,
              width: 245,
              mt: '-50px',
            },
          },
        }}
      >
        {duks.map((duk) => (
          <Box key={duk.id}>
            <DukCard title={duk.question} answer={duk.answer} clickable />
          </Box>
        ))}
      </Box>
      <ReadMoreButton title={t('button.duk')} path="/faq" isCenter margin />
    </Box>
  );
}
