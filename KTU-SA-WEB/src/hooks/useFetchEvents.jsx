import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { ENDPOINTS } from '../constants/endpoints';
import { fetchData } from './fetchData';
// TODO add to fetch by sa unit
export const useFetchEvents = () => {
  const { i18n } = useTranslation();

  const { language } = i18n;
  const queryKey = ['events', language];

  return useQuery({
    queryKey,
    queryFn: () => fetchData(ENDPOINTS.EVENTS(language)),
  });
};
