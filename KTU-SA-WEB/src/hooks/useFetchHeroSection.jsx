import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { ENDPOINTS } from '../constants/endpoints';
import { fetchData } from './fetchData';

export const useFetchHeroSection = (sectionName) => {
  const { i18n } = useTranslation();

  const { language } = i18n;
  const queryKey = ['heroSection', language, sectionName];

  return useQuery({
    queryKey,
    queryFn: () => fetchData(ENDPOINTS.HERO_SECTION(language, sectionName)),
  });
};
