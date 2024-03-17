import { useQuery } from '@tanstack/react-query';
import { ENDPOINTS } from '../constants/endpoints';
import { fetchData } from './fetchData';

export const useFetchMainContacts = (saUnit) => {
  const queryKey = ['mainContacts', saUnit];

  return useQuery({
    queryKey: queryKey,
    queryFn: () => fetchData(ENDPOINTS.MAIN_CONTACTS(saUnit)),
  });
};