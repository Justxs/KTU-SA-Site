import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { ENDPOINTS } from '../constants/endpoints';
import { fetchData } from './fetchData';

export const useFetchDuk = (count) => {
  const { i18n } = useTranslation();

  const { language } = i18n;
  const queryKey = ['duk', language, count];
  const queryParams = count ? { limit: count } : {};

  return useQuery({
    queryKey,
    queryFn: () => fetchData(ENDPOINTS.DUK(language), queryParams),
  });
};
