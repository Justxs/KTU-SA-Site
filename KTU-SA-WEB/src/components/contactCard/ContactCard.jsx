import React from "react";
import PropTypes from "prop-types";
import styles from "./ContactCard.module.css";
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';

export default function ContactCard(props) {
  const { photo, name, position, email, phone } = props;
  return (
    <div className={styles.Container}>
      <img className={styles.Image} src={photo} alt={name}/>
      <div className={styles.Information}>
        <div className={styles.MainSection}>
          <div className={styles.Position}>{position}</div>
          <div className={styles.Name}>{name}</div>
        </div>
        <div>
          <div className={styles.Contacts}>
            <MailOutlineIcon sx={{width: "16px", height: "16px"}}/>
            <a href={`mailto:${email}`}>{email}</a>
          </div>
          <div className={styles.Contacts}>
            <PhoneIphoneIcon sx={{width: "16px", height: "16px"}}/>
            <a href={`tel:${phone}`}>{phone}</a>
          </div>
        </div>
      </div>
    </div>
  );
}

ContactCard.propTypes = {
  photo: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  position: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
};
