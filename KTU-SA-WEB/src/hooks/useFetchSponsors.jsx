import { useQuery } from '@tanstack/react-query';
import { ENDPOINTS } from '../constants/endpoints';
import { fetchData } from './fetchData';

export const useFetchSponsors = () => {
  const queryKey = ['sponsors'];
  
  return useQuery({
    queryKey: queryKey,
    queryFn: () => fetchData(ENDPOINTS.SPONSORS),
  });
};