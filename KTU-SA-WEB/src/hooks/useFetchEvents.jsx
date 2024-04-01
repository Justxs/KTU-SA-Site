import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { ENDPOINTS } from '../constants/endpoints';
import { fetchData } from './fetchData';

export const useFetchEvents = (id) => {
  const { i18n } = useTranslation();

  const { language } = i18n;
  const queryKey = ['events', language];

  const endpoint = id
    ? ENDPOINTS.EVENTS_BY_ID(language, id)
    : ENDPOINTS.EVENTS(language);

  return useQuery({
    queryKey,
    queryFn: () => fetchData(endpoint),
  });
};
