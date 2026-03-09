import { getFaqs } from '@api/GetFaqs';
import { blocksToPlainText } from '@api/helpers';
import EmptyData from '@components/emptyData/EmptyData';
import HeroImage from '@components/heroImage/HeroImage';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import SideMargins from '@components/margins/SideMargins';
import { getStaticPage } from '@api/GetStaticPages';
import { buildPageMetadata } from '@/lib/seo/buildPageMetadata';
import JsonLd from '@components/seo/JsonLd';
import FaqAccordion from './FaqAccordion';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const t = await getTranslations({ locale: lang });
  const heroSection = await getStaticPage(lang, t('sections.duk'));

  return buildPageMetadata({ heroSection, lang, path: '/faq' });
}

export default async function Page({ params }: Readonly<{ params: Promise<{ lang: string }> }>) {
  const { lang } = await params;
  setRequestLocale(lang);
  const t = await getTranslations();
  const faqs = await getFaqs(lang);

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs?.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: blocksToPlainText(faq.answer),
      },
    })),
  };

  return (
    <>
      <JsonLd data={faqJsonLd} />
      <HeroImage sectionName={t('sections.duk')} />
      <SideMargins>
        <EmptyData length={faqs?.length} />
        {faqs.length > 0 && <FaqAccordion items={faqs} />}
      </SideMargins>
    </>
  );
}
