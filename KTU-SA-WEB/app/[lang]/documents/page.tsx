import { getDocuments } from '@api/GetDocuments';
import { getHeroImage } from '@api/GetHeroImage';
import DocumentCategory from '@components/documents/DocumentCategory';
import EmptyData from '@components/emptyData/EmptyData';
import HeroImage from '@components/heroImage/HeroImage';
import SideMargins from '@components/margins/SideMargins';
import { getLocale, getTranslations } from 'next-intl/server';

export async function generateMetadata(){
  const t = await getTranslations();
  const locale = await getLocale();
  
  const heroSection = await getHeroImage(locale, t('sections.documents'));
  
  return {
    title: heroSection.title,
    description: heroSection.description,
    openGraph: {
      images: [{
        url: heroSection.imgSrc,
      }],
    },
    twitter: {
      site: '@KTU_SA',
      images: [heroSection.imgSrc],
    },
  };
} 

export default async function Page() {
  const t = await getTranslations();
  const locale = await getLocale();
  const documents = await getDocuments(locale);

  return (
    <>
      <HeroImage sectionName={t('sections.documents')} />
      <div style={{ marginBottom: '20px' }}>
        <SideMargins>
          <EmptyData length={documents?.length} />
          {documents.map((doc) => (
            <DocumentCategory
              key={doc.category}
              category={doc.category}
              documents={doc.documents}
            />
          ))}
        </SideMargins>
      </div>
    </>
  );
}
