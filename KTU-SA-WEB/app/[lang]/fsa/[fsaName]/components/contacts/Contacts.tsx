import { Grid } from '@mui/material';
import styles from './Contacts.module.css';
import { getTranslations } from 'next-intl/server';
import { ContactDto } from '@api/GetContacts';
import SectionName from '@components/sectionName/SectionName';
import ContactCard from '@components/contactCard/ContactCard';

export default async function Contacts({ contacts } : { contacts : Array<ContactDto>}) {
  const t = await getTranslations();

  return (
    <>
      <SectionName title={t('fsa.team')} showArrow />
      <Grid container spacing={4}>
        {contacts?.map((contact) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            key={contact.id}
            className={styles.Container}
          >
            <ContactCard
              contact={contact}
              small
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
}

