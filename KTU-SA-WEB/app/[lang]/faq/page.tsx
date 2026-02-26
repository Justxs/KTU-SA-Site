import { getDuks } from '@api/GetDuks';
import EmptyData from '@components/emptyData/EmptyData';
import HeroImage from '@components/heroImage/HeroImage';
import SectionName from '@components/sectionName/SectionName';
import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from '@mui/material';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SideMargins from '@components/margins/SideMargins';
import { getHeroImage } from '@api/GetHeroImage';
import { buildPageMetadata } from '@/lib/seo/buildPageMetadata';
import colors from '@theme/colors';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const t = await getTranslations({ locale: lang });
  const heroSection = await getHeroImage(lang, t('sections.duk'));

  return buildPageMetadata({ heroSection, lang, path: '/faq' });
}

export default async function Page({ params }: Readonly<{ params: Promise<{ lang: string }> }>) {
  const { lang } = await params;
  setRequestLocale(lang);
  const t = await getTranslations();
  const duks = await getDuks(lang);

  return (
    <>
      <HeroImage sectionName={t('sections.duk')} />
      <SideMargins>
        <SectionName title={t('sections.findFaq')} showArrow />
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 6 }}>
          <EmptyData length={duks?.length} />
          {duks?.map((faq, index) => (
            <Accordion
              key={faq.id}
              disableGutters
              elevation={0}
              sx={{
                border: `1px solid ${colors.navbarLightBlue}`,
                borderRadius: '12px !important',
                overflow: 'hidden',
                transition: 'box-shadow 0.3s ease, border-color 0.3s ease',
                '&:hover': {
                  borderColor: colors.lightBlueAccent,
                  boxShadow: `0 4px 20px ${colors.mediumBlue}12`,
                },
                '&::before': { display: 'none' },
                '&.Mui-expanded': {
                  borderColor: colors.mediumBlue,
                  boxShadow: `0 4px 24px ${colors.mediumBlue}18`,
                },
              }}
            >
              <AccordionSummary
                expandIcon={
                  <ExpandMoreIcon
                    sx={{
                      color: colors.mediumBlue,
                      fontSize: 28,
                      transition: 'transform 0.3s ease',
                    }}
                  />
                }
                aria-controls={`faq-${index}-content`}
                id={`faq-${index}-header`}
                sx={{
                  background: colors.lightBlueBg,
                  px: 3,
                  py: 1,
                  minHeight: 64,
                  '&.Mui-expanded': {
                    borderBottom: `1px solid ${colors.navbarLightBlue}`,
                  },
                  '& .MuiAccordionSummary-content': {
                    my: 1.5,
                  },
                }}
              >
                <Typography
                  component="h2"
                  sx={{
                    fontSize: { xs: 16, sm: 18 },
                    fontWeight: 600,
                    color: colors.primaryDark,
                    lineHeight: 1.4,
                  }}
                >
                  {faq.question}
                </Typography>
              </AccordionSummary>
              <AccordionDetails
                sx={{
                  px: 3,
                  py: 2.5,
                  background: colors.white,
                }}
              >
                <Typography
                  sx={{
                    color: colors.grayContact,
                    fontSize: { xs: 14, sm: 16 },
                    lineHeight: 1.7,
                  }}
                >
                  {faq.answer}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </SideMargins>
    </>
  );
}
