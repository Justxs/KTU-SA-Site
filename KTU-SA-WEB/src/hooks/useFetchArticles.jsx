import { useQuery } from '@tanstack/react-query';
import { ENDPOINTS } from '../constants/endpoints';
import { fetchData } from './fetchData';

export const useFetchArticles = (language, count) => {
  const queryKey = ['articles', language, count];
  const queryParams = count ? { limit: count } : {};
  
  return useQuery({
    queryKey: queryKey,
    queryFn: () => fetchData(ENDPOINTS.ARTICLES(language), queryParams),
  });
};