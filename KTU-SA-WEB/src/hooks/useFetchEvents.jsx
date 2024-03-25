import { useQuery } from '@tanstack/react-query';
import { ENDPOINTS } from '../constants/endpoints';
import { fetchData } from './fetchData';
import { useTranslation } from 'react-i18next';

export const useFetchEvents = (id) => {
  const { i18n } = useTranslation();
  
  const language = i18n.language;
  const queryKey = ['events', language];

  const endpoint = id 
    ? ENDPOINTS.EVENTS_BY_ID(language, id)
    : ENDPOINTS.EVENTS(language);
  
  return useQuery({
    queryKey: queryKey,
    queryFn: () => fetchData(endpoint),
  });
};