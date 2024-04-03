import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { ENDPOINTS } from '../constants/endpoints';
import { fetchData } from './fetchData';

export const useFetchContacts = (saUnit) => {
  const { i18n } = useTranslation();

  const { language } = i18n;
  const queryParams = { saUnit };
  const queryKey = ['contacts', language, queryParams];

  return useQuery({
    queryKey,
    queryFn: () => fetchData(ENDPOINTS.CONTACTS(language), queryParams),
  });
};
