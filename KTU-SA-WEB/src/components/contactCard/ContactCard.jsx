import React from "react";
import PropTypes from "prop-types";
import styles from "./ContactCard.module.css";
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';

export default function ContactCard(props) {
  const { photo, name, position, email, phone } = props;
  return (
    <div className={styles.Container}>
      <img className={styles.Image} src={photo} />
      <div className={styles.Information}>
        <div>
          <p className={styles.Position}>{position}</p>
          <p className={styles.Name}>{name}</p>
        </div>
        <div>
          <p className={styles.Contacts}><MailOutlineIcon sx={{width: "16px", height: "16px"}}/>{email}</p>
          <p className={styles.Contacts}><PhoneIphoneIcon sx={{width: "16px", height: "16px"}}/>{phone}</p>
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
