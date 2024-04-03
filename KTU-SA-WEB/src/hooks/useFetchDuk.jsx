import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { ENDPOINTS } from '../constants/endpoints';
import { fetchData } from './fetchData';

export const useFetchDuk = (count) => {
  const { i18n } = useTranslation();

  const { language } = i18n;
  const queryParams = count ? { limit: count } : {};
  const queryKey = ['duk', language, queryParams];

  return useQuery({
    queryKey,
    queryFn: () => fetchData(ENDPOINTS.DUK(language), queryParams),
  });
};
