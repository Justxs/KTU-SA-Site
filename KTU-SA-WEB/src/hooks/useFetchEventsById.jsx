import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { ENDPOINTS } from '../constants/endpoints';
import { fetchData } from './fetchData';

export const useFetchEventsById = (id) => {
  const { i18n } = useTranslation();

  const { language } = i18n;
  const queryKey = ['events', language, id];

  return useQuery({
    queryKey,
    queryFn: () => fetchData(ENDPOINTS.EVENTS_BY_ID(language, id)),
  });
};
