import React from 'react';
import { useTranslation } from 'react-i18next';
import HeroImage from '../../components/heroImage/HeroImage';
import { useFetchDocuments } from '../../hooks/useFetchDocuments';
import DocumentCategory from './components/DocumentCategory';
import Smiley from '../../components/iconElements/Smiley';

export default function Documents() {
  const { t } = useTranslation();
  const { data: documents, isLoading, error } = useFetchDocuments();

  if (isLoading || error) {
    return null;
  }

  return (
    <>
      <HeroImage sectionName={t('sections.documents')} />
      {documents.map((doc) => (
        <DocumentCategory
          category={doc.category}
          documents={doc.documents}
        />
      ))}
      <Smiley />
    </>
  );
}
