import { useQuery } from '@tanstack/react-query';
import { ENDPOINTS } from '../constants/endpoints';
import { fetchData } from './fetchData';

export const useFetchDuk = (language, count) => {
  const queryKey = ['duk', language, count];
  const queryParams = count ? { limit: count } : {};
  
  return useQuery({
    queryKey: queryKey,
    queryFn: () => fetchData(ENDPOINTS.DUK(language), queryParams),
  });
};