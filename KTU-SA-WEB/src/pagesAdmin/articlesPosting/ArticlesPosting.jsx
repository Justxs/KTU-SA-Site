import React from 'react';
import SectionName from '../../components/sectionName/SectionName';
import { useAuthContext } from '../../context/authContext';
import styles from "./ArticlesPosting.module.css";
import NewArticleButton from './component/newArcticle/NewArticleButton';
import useQuery from '../../hooks/useQuery';
import { ENDPOINTS } from '../../constants/endpoints';
import ArticlesList from './component/articlesList/ArticlesList';

export default function ArticlesPosting() {
  const { userSaUnit, userSaUnitId } = useAuthContext();
  const { data, error, isLoading, refetch } = useQuery(ENDPOINTS.POSTS);

  return (
    <div className={styles.Container}>
      <SectionName title={`${userSaUnit} articles`} showArrow/>
      <NewArticleButton saUnitId={userSaUnitId} refetch={refetch}/>
      <ArticlesList 
        data={data} 
        error={error} 
        isLoading={isLoading} 
        saUnitId={userSaUnitId} 
        saUnitName={userSaUnit} 
        refetch={refetch}
      />
    </div>
  );
}
