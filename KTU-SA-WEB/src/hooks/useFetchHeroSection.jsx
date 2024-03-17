import { useQuery } from '@tanstack/react-query';
import { ENDPOINTS } from '../constants/endpoints';
import { fetchData } from './fetchData';
import { useTranslation } from 'react-i18next';

export const useFetchHeroSection = (sectionName) => {
  const { i18n } = useTranslation();
  
  const language = i18n.language;
  const queryKey = ['heroSection', language, sectionName];
  
  return useQuery({
    queryKey: queryKey,
    queryFn: () => fetchData(ENDPOINTS.HERO_SECTION(language, sectionName)),
  });
};