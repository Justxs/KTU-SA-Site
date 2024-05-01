import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { ENDPOINTS } from '../constants/endpoints';
import { fetchData } from './fetchData';

export const useFetchActivityReports = (saUnit) => {
  const { i18n } = useTranslation();
  const { language } = i18n;

  const queryKey = ['ActivityReports', language, saUnit];

  return useQuery({
    queryKey,
    queryFn: () => fetchData(ENDPOINTS.ACTIVITY_REPORTS(language, saUnit)),
  });
};
