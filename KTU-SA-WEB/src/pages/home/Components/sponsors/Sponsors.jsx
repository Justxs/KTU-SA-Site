import React from 'react';
import { Skeleton, Tooltip } from '@mui/material';
import { useTranslation } from 'react-i18next';
import SectionName from '../../../../components/sectionName/SectionName';
import styles from './Sponsors.module.css';
import { useFetchSponsors } from '../../../../hooks/useFetchSponsors';

export default function Sponsors() {
  const { t } = useTranslation();
  const { data: sponsors, isLoading, error } = useFetchSponsors();

  if (error) {
    return null;
  }

  if (sponsors && sponsors.length === 0) {
    return null;
  }

  return (
    <div className={styles.Container}>
      <SectionName title={t('sections.sponsors')} />
      <div className={styles.Logos}>
        {isLoading
          && Array.from({ length: 8 }).map(() => (
            <div key={Math.random()}>
              <Skeleton variant="rectangular" animation="wave" width={200} height={80} />
            </div>
          ))}
        {sponsors && sponsors.map((sponsor) => (
          <a
            href={sponsor.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.Logo}
            key={sponsor.id}
          >
            <Tooltip title={sponsor.name}>
              <img
                src={sponsor.logoId}
                height={100}
                alt={sponsor.name}
              />
            </Tooltip>
          </a>
        ))}

      </div>
    </div>
  );
}
