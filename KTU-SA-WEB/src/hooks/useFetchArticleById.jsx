import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { ENDPOINTS } from '../constants/endpoints';
import { fetchData } from './fetchData';

export const useFetchArticleById = (id) => {
  const { i18n } = useTranslation();

  const { language } = i18n;
  const queryKey = ['article', language, id];

  return useQuery({
    queryKey,
    queryFn: () => fetchData(ENDPOINTS.ARTICLES_BY_ID(language, id)),
  });
};
