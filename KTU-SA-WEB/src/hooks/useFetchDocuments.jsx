import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { ENDPOINTS } from '../constants/endpoints';
import { fetchData } from './fetchData';

export const useFetchDocuments = () => {
  const { i18n } = useTranslation();
  const { language } = i18n;

  const queryKey = ['documents', language];

  return useQuery({
    queryKey,
    queryFn: () => fetchData(ENDPOINTS.DOCUMENTS(language)),
  });
};
