import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useFetchContacts } from '../../../../hooks/useFetchContacts';
import ContactCard from '../../../../components/contactCard/ContactCard';
import styles from './Contacts.module.css';
import SectionName from '../../../../components/sectionName/SectionName';

export default function Contacts({ fsaName, handleLoading }) {
  const { t } = useTranslation();
  const { data: contacts, isLoading, error } = useFetchContacts(fsaName);

  useEffect(() => {
    handleLoading(isLoading);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  if (error || contacts?.length === 0 || isLoading) {
    return null;
  }

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

Contacts.propTypes = {
  fsaName: PropTypes.string.isRequired,
  handleLoading: PropTypes.func,
};

Contacts.defaultProps = {
  handleLoading: () => {},
};
