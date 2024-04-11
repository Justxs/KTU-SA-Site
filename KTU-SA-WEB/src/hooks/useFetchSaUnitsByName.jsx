import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { ENDPOINTS } from '../constants/endpoints';
import { fetchData } from './fetchData';

export const useFetchSaUnitsByNames = (saUnit) => {
  const { i18n } = useTranslation();
  const { language } = i18n;

  const queryKey = ['saUnits', saUnit, language];

  return useQuery({
    queryKey,
    queryFn: () => fetchData(ENDPOINTS.SA_UNITS_BY_NAME(language, saUnit)),
  });
};
