import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { ENDPOINTS } from '../constants/endpoints';
import { fetchData } from './fetchData';

export const useFetchStaticPage = (staticPage) => {
  const { i18n } = useTranslation();
  const { language } = i18n;

  const queryKey = ['staticPage', language, staticPage];

  return useQuery({
    queryKey,
    queryFn: () => fetchData(ENDPOINTS.STATIC_PAGES(language, staticPage)),
  });
};
