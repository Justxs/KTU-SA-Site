import { Box } from '@mui/material';
import ReadMoreButton from '@components/readMoreButton/ReadMoreButton';
import SectionName from '@components/sectionName/SectionName';
import DukCard from '@components/dukCard/DukCard';
import { getLocale, getTranslations } from 'next-intl/server';
import { getDuks } from '@api/GetDuks';
import colors from '@theme/colors';

export default async function Faq() {
  const t = await getTranslations();
  const locale = await getLocale();
  const faqs = await getDuks(locale, 4);

  if (faqs?.length === 0) return null;

  return (
    <Box sx={{ bgcolor: colors.lightBlueBg, py: { xs: '40px', md: '64px' }, overflow: 'hidden' }}>
      <Box
        sx={{
          mx: '150px',
          '@media (max-width: 1300px)': { mx: '24px' },
        }}
      >
        <SectionName title={t('sections.duk')} />
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          px: { xs: 2, sm: 4 },
          '& > *:nth-of-type(odd)': {
            transform: 'rotate(5deg)',
            ml: '-30px',
          },
          '& > *:nth-of-type(even)': {
            transform: 'rotate(-15deg)',
            ml: '-20px',
          },
          '& > *': {
            transition: 'transform 0.3s ease, z-index 0s',
          },
          '& > *:hover': {
            transform: 'rotate(0deg) translateY(-6px) !important',
            zIndex: 2,
          },
          '@media (max-width: 1100px)': {
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
        {faqs.map((faq) => (
          <Box key={faq.id}>
            <DukCard title={faq.question} answer={faq.answer} clickable />
          </Box>
        ))}
      </Box>
      <ReadMoreButton title={t('button.duk')} path="/faq" isCenter />
    </Box>
  );
}
