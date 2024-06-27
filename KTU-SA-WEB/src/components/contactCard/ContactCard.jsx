import React from 'react';
import PropTypes from 'prop-types';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { Skeleton } from '@mui/material';
import styles from './ContactCard.module.css';

export default function ContactCard({ contact, skeleton, small }) {
  if (skeleton) {
    return (
      <div className={styles.Container} style={{ width: '400px' }}>
        <Skeleton variant="rectangular" width={210} height={118} animation="wave" />
        <div className={styles.Information} style={{ width: '200px' }}>
          <div className={styles.MainSection}>
            <Skeleton variant="text" width="100%" animation="wave" />
            <Skeleton variant="text" width="100%" animation="wave" />
          </div>
          <div>
            <div className={styles.Contacts}>
              <Skeleton variant="circular" width={16} height={16} animation="wave" />
              <Skeleton variant="text" width="100%" animation="wave" />
            </div>
            <div className={styles.Contacts}>
              <Skeleton variant="circular" width={16} height={16} animation="wave" />
              <Skeleton variant="text" width="100%" animation="wave" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.Container} style={small ? { flexDirection: 'column' } : null}>
      <img className={styles.Image} src={contact.imageSrc} alt={contact.name} />
      <div className={styles.Information}>
        <div className={styles.MainSection}>
          <div className={styles.Position} style={small ? { textAlign: 'center' } : null}>{contact.position}</div>
          <div className={styles.Name} style={small ? { textAlign: 'center' } : null}>{contact.name}</div>
          <div>{contact.responsibilities}</div>
        </div>
        <div>
          <div className={styles.Contacts}>
            <MailOutlineIcon sx={{ width: '16px', height: '16px' }} />
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
          </div>
        </div>
      </div>
    </div>
  );
}

ContactCard.propTypes = {
  contact: PropTypes.shape({
    imageSrc: PropTypes.string,
    name: PropTypes.string,
    position: PropTypes.string,
    email: PropTypes.string,
    responsibilities: PropTypes.string,
  }),
  skeleton: PropTypes.bool,
  small: PropTypes.bool,
};

ContactCard.defaultProps = {
  skeleton: false,
  small: false,
  contact: null,
};
