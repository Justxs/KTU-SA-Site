import styles from './HeroImage.module.css';
import { getLocale, getTranslations } from 'next-intl/server';
import { getHeroImage } from '@api/GetHeroImage';
import Image from 'next/image';

export default async function HeroImage({ sectionName } : { sectionName : string }) {
  const t = await getTranslations();
  const locale = await getLocale();
  const heroSection = await getHeroImage(locale, sectionName);

  return (
    <>
      <div className={styles.Container} >
        <div className={styles.TextContainer}>
          <div className={styles.Text}>
            <>
              <h1>{t('pages.socialHelp').toLowerCase() === heroSection.title.toLowerCase() ? t('navbar.needHelp.EmotionalHelp') : heroSection.title}</h1>
              <p className={styles.Description}>{heroSection.description}</p>
            </>
          </div>
          <div className={styles.HeroImageContainer}>
            <Image 
              className={styles.HeroImage} 
              src={heroSection.imgSrc} 
              alt="Hero Image"
              sizes='100%'
              width={0}
              height={0} />
          </div>
        </div>
      </div>
      <div className={styles.Divider} />
    </>
  );
}
