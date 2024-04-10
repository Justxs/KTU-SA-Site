import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { ENDPOINTS } from '../constants/endpoints';
import { fetchData } from './fetchData';

export const useFetchEvents = (saUnit) => {
  const { i18n } = useTranslation();
  const { language } = i18n;

  const endpoint = saUnit
    ? ENDPOINTS.EVENTS_BY_SA_UNIT(language, saUnit)
    : ENDPOINTS.EVENTS(language);

  const queryKey = ['events', language, endpoint];

  return useQuery({
    queryKey,
    queryFn: () => fetchData(endpoint),
  });
};
