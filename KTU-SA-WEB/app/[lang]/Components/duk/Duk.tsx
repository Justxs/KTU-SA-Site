import styles from './Duk.module.css';
import ReadMoreButton from '@components/readMoreButton/ReadMoreButton';
import SectionName from '@components/sectionName/SectionName';
import DukCard from '@components/dukCard/DukCard';
import { getLocale, getTranslations } from 'next-intl/server';
import { getDuks } from '@api/GetDuks';

export default async function Duk() {
  const t = await getTranslations();
  const locale = await getLocale();
  const duks = await getDuks(locale, 4);

  if (duks?.length === 0) return null;

  return (
    <div className={styles.Container} >
      <div className={styles.SectionName}>
        <SectionName title={t('sections.duk')} />
      </div>
      <div className={styles.Spacing}>
        {duks.map((duk) => (
          <div key={duk.id} className={styles.Note}>
            <DukCard 
              title={duk.question} 
              answer={duk.answer} 
              clickable />
          </div>
        ))}
      </div>
      <ReadMoreButton
        title={t('button.duk')}
        path="/faq"
        isCenter
        margin
      />
    </div>
  );
}
