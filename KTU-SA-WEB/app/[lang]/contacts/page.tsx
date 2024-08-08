import { getContacts } from '@api/GetContacts';
import HeroImage from '@components/heroImage/HeroImage';
import { SA_UNITS } from '@constants/saUnits';
import { getLocale, getTranslations } from 'next-intl/server';
import MainContacts from './components/MainContacts';
import ContactCard from '@components/contactCard/ContactCard';
import styles from './Contacts.module.css';
import { getHeroImage } from '@api/GetHeroImage';
import SideMargins from '@components/margins/SideMargins';

export async function generateMetadata(){
  const t = await getTranslations();
  const locale = await getLocale();
  
  const heroSection = await getHeroImage(locale, t('sections.contacts'));
  
  return {
    title: heroSection.title,
    description: heroSection.description,
    openGraph: {
      images: [{
        url: heroSection.imgSrc,
      }],
    },
    twitter: {
      site: '@KTU_SA',
      images: [heroSection.imgSrc],
    },
  };
} 

export default async function Page() {
  const t = await getTranslations();
  const locale = await getLocale();
  const contacts = await getContacts(locale, SA_UNITS.CSA);
  
  if (contacts?.length === 0) return null;
  
  return (
    <>
      <HeroImage sectionName={t('sections.contacts')} />
      <SideMargins>
        <MainContacts saUnit={SA_UNITS.CSA} />
        <div className={styles.ContactCards}>
          {contacts.map((contact) => (
            <ContactCard
              key={contact.id}
              contact={contact}
            />
          ))}
        </div>
      </SideMargins>
    </>
  );
}
  
