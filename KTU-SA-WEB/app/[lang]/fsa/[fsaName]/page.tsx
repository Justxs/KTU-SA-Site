import HeroImage from './components/heroImage/HeroImage';
import Contacts from './components/contacts/Contacts';
import styles from './KtuFSA.module.css';
import { getLocale, getTranslations } from 'next-intl/server';
import SectionName from '@components/sectionName/SectionName';
import EventsSection from '@components/eventsSection/EventsSection';
import ContactsSection from '@components/contactsSection/ContactsSection';
import { getSaUnit } from '@api/GetFsa';
import { getEventsBySaUnit } from '@api/GetEvents';
import { getContacts } from '@api/GetContacts';
import SideMargins from '@components/margins/SideMargins';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }: { params: { fsaName: string } }){
  const t = await getTranslations();
  const locale = await getLocale();
  const fsa = params.fsaName === 'VIVAT%20chemija' ? 'Vivat_Chemija' : params.fsaName;

  const fsaInfo = await getSaUnit(locale, fsa);

  return {
    title: fsa.replace('_', ' '),
    description: fsaInfo.description,
    openGraph: {
      type: 'website',
      url: '/',
      images: [{
        url: fsaInfo.coverUrl,
      }],
    },
    twitter: {
      site: '@KTU_SA',
      images: [fsaInfo.coverUrl],
    },
  };
} 

export default async function Page({ params }: { params: { fsaName: string } }) {
  const fsaName = params.fsaName;
  const locale = await getLocale();
  const t = await getTranslations();

  const fsa = fsaName === 'VIVAT%20chemija' ? 'Vivat_Chemija' : fsaName;
  const saUnitData = await getSaUnit(locale, fsa);
  const eventsData = await getEventsBySaUnit(locale, fsa);
  const contactsData = await getContacts(locale, fsa);

  const [saUnit, events, contacts] = await Promise.all([saUnitData, eventsData, contactsData]);
  
  if (saUnit.description === undefined) {
    return notFound();
  }

  return (
    <>
      <HeroImage fsaName={fsaName} coverUrl={saUnit.coverUrl} />
      <SideMargins>
        <div className={styles.Container}>
          <div>
            <SectionName title={t('sections.aboutUs')} />
            {saUnit.description.split(/\r\n\r\n/).map((paragraph) => (
              <p key={Math.random()} className={styles.Description}>{paragraph}</p>
            ))}
          </div>
          <div className={styles.LetsTalk}>
            <h1 className={styles.Text}>
              {t('mainContacts.letsTalk')}
            </h1>
            <ContactsSection
              email={saUnit.email}
              phoneNumber={saUnit.phoneNumber}
              address={saUnit.address}
              facebookUrl={saUnit.facebookUrl}
              linkedInUrl={saUnit.linkedInUrl}
              instagramUrl={saUnit.instagramUrl}
            />
          </div>
        </div>
        <EventsSection events={events} />
        <Contacts contacts={contacts} />
        <div style={{marginBottom: '20px'}}></div>
      </SideMargins>
    </>
  );
}
