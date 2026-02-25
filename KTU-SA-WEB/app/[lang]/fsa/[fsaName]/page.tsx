import HeroImage from './components/heroImage/HeroImage';
import Contacts from './components/contacts/Contacts';
import { Box } from '@mui/material';
import { getLocale, getTranslations } from 'next-intl/server';
import SectionName from '@components/sectionName/SectionName';
import EventsSection from '@components/eventsSection/EventsSection';
import ContactsSection from '@components/contactsSection/ContactsSection';
import { getSaUnit } from '@api/GetFsa';
import { getEventsBySaUnit } from '@api/GetEvents';
import { getContacts } from '@api/GetContacts';
import SideMargins from '@components/margins/SideMargins';
import { notFound } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';
import colors from '@theme/colors';
import { LANGUAGES } from '@constants/Languages';

export const dynamicParams = false;

export async function generateMetadata(props: {
  params?: Promise<{ fsaName?: string }> | { fsaName?: string };
}) {
  const params = (await props?.params) ?? {};
  const locale = await getLocale();
  const rawFsa = params.fsaName ?? '';

  const decodedFsa = decodeURIComponent(rawFsa);
  const fsa = decodedFsa === 'VIVAT chemija' ? 'Vivat_Chemija' : decodedFsa.replaceAll(/\s+/g, '_');

  let fsaInfo: any = {};
  try {
    if (fsa) {
      fsaInfo = await getSaUnit(locale, fsa);
    }
  } catch (e) {
    console.warn(`generateStaticParams: failed to fetch events for ${fsaInfo}:`, e);
    return {
      title: fsa ? fsa.replace('_', ' ') : '',
      description: '',
    };
  }

  return {
    title: fsa ? fsa.replace('_', ' ') : '',
    description: fsaInfo?.description ?? '',
    openGraph: {
      type: 'website',
      url: '/',
      images: [
        {
          url: fsaInfo?.coverUrl,
        },
      ],
    },
    twitter: {
      site: '@KTU_SA',
      images: [fsaInfo?.coverUrl],
    },
  };
}

export default async function Page(props: Readonly<{
  params: Promise<{ fsaName: string }> | { fsaName: string };
}>) {
  const params = await props.params;
  const fsaName = params.fsaName ?? '';
  const locale = await getLocale();
  const t = await getTranslations();
  const decodedName = decodeURIComponent(fsaName);
  const fsa = decodedName === 'VIVAT chemija' ? 'Vivat_Chemija' : decodedName.replaceAll(/\s+/g, '_');
  const saUnitData = getSaUnit(locale, fsa);
  const eventsData = getEventsBySaUnit(locale, fsa);
  const contactsData = getContacts(locale, fsa);

  const [saUnit, events, contacts] = await Promise.all([saUnitData, eventsData, contactsData]);

  if (saUnit.description === undefined) {
    return notFound();
  }

  return (
    <>
      <HeroImage fsaName={fsaName} coverUrl={saUnit.coverUrl} />
      <SideMargins>
        <Box
          sx={{
            display: 'flex',
            gap: '80px',
            mb: '40px',
            '@media (max-width: 1500px)': {
              flexDirection: 'column-reverse',
              justifyContent: 'center',
              alignItems: 'center',
            },
          }}
        >
          <Box>
            <SectionName title={t('sections.aboutUs')} />
            {saUnit.description.split(/\r\n\r\n/).map((paragraph) => (
              <Box
                component="p"
                key={uuidv4()}
                sx={{ color: colors.primaryDark, fontSize: 20, lineHeight: 1.4, mt: 0, mb: 4 }}
              >
                {paragraph}
              </Box>
            ))}
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Box component="h1" sx={{ color: colors.primaryDark, textAlign: 'center', mt: 0 }}>
              {t('mainContacts.letsTalk')}
            </Box>
            <ContactsSection
              email={saUnit.email}
              phoneNumber={saUnit.phoneNumber}
              address={saUnit.address}
              facebookUrl={saUnit.facebookUrl}
              linkedInUrl={saUnit.linkedInUrl}
              instagramUrl={saUnit.instagramUrl}
            />
          </Box>
        </Box>
        <EventsSection events={events} />
        <Contacts contacts={contacts} />
        <div style={{ marginBottom: '20px' }} />
      </SideMargins>
    </>
  );
}

const FSA_NAMES = ['VIVAT chemija', 'FUMSA', 'InDi', 'SHM', 'STATIUS', 'VFSA', 'ESA', 'InfoSA'];

export async function generateStaticParams(): Promise<Array<{ lang: string; fsaName: string }>> {
  const langs = Object.values(LANGUAGES);
  const params: Array<{ lang: string; fsaName: string }> = [];

  for (const lang of langs) {
    for (const f of FSA_NAMES) {
      params.push({ lang, fsaName: f });
    }
  }

  return params;
}
