import { useQuery } from '@tanstack/react-query';
import { ENDPOINTS } from '../constants/endpoints';
import { fetchData } from './fetchData';
import { useTranslation } from 'react-i18next';

export const useFetchArticles = (count) => {
  const { i18n } = useTranslation();
  
  const language = i18n.language;
  const queryKey = ['articles', language, count];
  const queryParams = count ? { limit: count } : {};
  
  return useQuery({
    queryKey: queryKey,
    queryFn: () => fetchData(ENDPOINTS.ARTICLES(language), queryParams),
  });
};