import { Box, Grid } from '@mui/material';
import { getTranslations } from 'next-intl/server';
import { ContactDto } from '@api/GetContacts';
import SectionName from '@components/sectionName/SectionName';
import ContactCard from '@components/contactCard/ContactCard';

export default async function Contacts({ contacts }: Readonly<{ contacts: Array<ContactDto> }>) {
  const t = await getTranslations();

  return (
    <>
      <SectionName title={t('fsa.team')} showArrow />
      <Grid container spacing={4}>
        {contacts?.map((contact) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={contact.id}>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <ContactCard contact={contact} small />
            </Box>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
