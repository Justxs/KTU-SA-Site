import { useQuery } from '@tanstack/react-query';
import { ENDPOINTS } from '../constants/endpoints';
import { fetchData } from './fetchData';
import { useTranslation } from 'react-i18next';

export const useFetchContacts = (saUnit) => {
  const { i18n } = useTranslation();
  
  const language = i18n.language;
  const queryKey = ['contacts', language, saUnit];
  const queryParams = {saUnit};

  return useQuery({
    queryKey: queryKey,
    queryFn: () => fetchData(ENDPOINTS.CONTACTS(language), queryParams),
  });
};