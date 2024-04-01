import { useQuery } from '@tanstack/react-query';
import { ENDPOINTS } from '../constants/endpoints';
import { fetchData } from './fetchData';
import { useTranslation } from 'react-i18next';

export const useFetchArticleById = (id) => {
  const { i18n } = useTranslation();
  
  const language = i18n.language;
  const queryKey = ['article', language, id];
  
  return useQuery({
    queryKey: queryKey,
    queryFn: () => fetchData(ENDPOINTS.ARTICLES_BY_ID(language, id)),
  });
};