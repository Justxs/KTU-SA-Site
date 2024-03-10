import React from 'react';
import PropTypes from 'prop-types';
import styles from './DukCard.module.css';
import Note from '../../assets/Note.svg';

export default function DukCard({title}) {

  return (
    <div className={styles.Card}>
      <img src={Note} className={styles.Note}/>
      <div className={styles.Text}>
        {title}
      </div>
    </div>
  );
}

DukCard.propTypes = {
  title: PropTypes.string.isRequired,
};
