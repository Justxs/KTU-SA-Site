import React from 'react';
import { useTranslation } from 'react-i18next';
import HeroImage from '../../components/heroImage/HeroImage';
import { useFetchDocuments } from '../../hooks/useFetchDocuments';
import DocumentCategory from './components/DocumentCategory';

export default function Documents() {
  const { t } = useTranslation();
  const { data: documents, isLoading, error } = useFetchDocuments();

  if (isLoading || error) {
    return null;
  }

  return (
    <>
      <HeroImage sectionName={t('sections.documents')} />
      <div style={{ marginBottom: '150px' }}>
        {documents.map((doc) => (
          <DocumentCategory
            category={doc.category}
            documents={doc.documents}
          />
        ))}
      </div>
    </>
  );
}
