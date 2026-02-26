import { getDuks } from '@api/GetDuks';
import EmptyData from '@components/emptyData/EmptyData';
import HeroImage from '@components/heroImage/HeroImage';
import SectionName from '@components/sectionName/SectionName';
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
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
        <div style={{ marginBottom: '20px' }}>
          <EmptyData length={duks?.length} />
          {duks?.map((faq) => (
            <Accordion key={faq.id}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                sx={{ background: colors.lightBlueBg }}
              >
                <h2 style={{ margin: '0' }}>{faq.question}</h2>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>{faq.answer}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </div>
      </SideMargins>
    </>
  );
}
