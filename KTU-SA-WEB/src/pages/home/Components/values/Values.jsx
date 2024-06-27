import React from 'react';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import Diversity1Icon from '@mui/icons-material/Diversity1';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';
import { useTranslation } from 'react-i18next';
import EngineeringIcon from '@mui/icons-material/Engineering';
import styles from './Values.module.css';
import SectionName from '../../../../components/sectionName/SectionName';

export default function Values() {
  const { t } = useTranslation();
  return (
    <div className={styles.Margin}>
      <SectionName
        title={t('sections.values')}
      />
      <div className={styles.Container}>
        <div className={styles.Card}>
          <EngineeringIcon
            sx={{ fontSize: '100px' }}
            className={styles.Icon}
          />
          <p className={styles.Text}>{t('values.responsibility')}</p>
        </div>
        <div className={styles.Card}>
          <Diversity3Icon
            sx={{ fontSize: '100px' }}
            className={styles.Icon}
          />
          <p className={styles.Text}>{t('values.leadership')}</p>
        </div>
        <div className={styles.Card}>
          <Diversity1Icon
            sx={{ fontSize: '100px' }}
            className={styles.Icon}
          />
          <p className={styles.Text}>{t('values.community')}</p>
        </div>
        <div className={styles.Card}>
          <EmojiObjectsIcon
            sx={{ fontSize: '100px' }}
            className={styles.Icon}
          />
          <p className={styles.Text}>{t('values.initiative')}</p>
        </div>
        <div className={styles.Card}>
          <VolunteerActivismIcon
            sx={{ fontSize: '100px' }}
            className={styles.Icon}
          />
          <p className={styles.Text}>{t('values.honesty')}</p>
        </div>
        <div className={styles.Card}>
          <ConnectWithoutContactIcon
            sx={{ fontSize: '100px' }}
            className={styles.Icon}
          />
          <p className={styles.Text}>{t('values.openness')}</p>
        </div>
      </div>
    </div>
  );
}
