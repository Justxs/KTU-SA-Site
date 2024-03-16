import React from "react";
import PropTypes from "prop-types";
import styles from "./ContactCard.module.css";
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import { Skeleton } from "@mui/material";

export default function ContactCard({ contact, skeleton }) {
  if (skeleton) {
    return (
      <div className={styles.Container} style={{width: "400px"}}>
        <Skeleton variant="rectangular" width={210} height={118} animation="wave" />
        <div className={styles.Information} style={{width: "200px"}}>
          <div className={styles.MainSection} >
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
    <div className={styles.Container}>
      <img className={styles.Image} src={contact.photo} alt={name}/>
      <div className={styles.Information}>
        <div className={styles.MainSection}>
          <div className={styles.Position}>{contact.position}</div>
          <div className={styles.Name}>{name}</div>
        </div>
        <div>
          <div className={styles.Contacts}>
            <MailOutlineIcon sx={{width: "16px", height: "16px"}}/>
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
          </div>
          <div className={styles.Contacts}>
            <PhoneIphoneIcon sx={{width: "16px", height: "16px"}}/>
            <a href={`tel:${contact.phone}`}>{contact.phone}</a>
          </div>
        </div>
      </div>
    </div>
  );
}

ContactCard.propTypes = {
  contact: PropTypes.shape({
    photo: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    position: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
  }).isRequired,
  skeleton: PropTypes.bool,
};

ContactCard.defaultProps ={
  skeleton: false,
};
