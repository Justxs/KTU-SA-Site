import React from 'react';
import styles from './Smiley.module.css';
import SmileySvg from '../../assets/playfullImages/Smiley.svg';

export default function Smiley() {
  return (
    <div className={styles.Center}>
      <img src={SmileySvg} alt="" />
    </div>
  );
}
