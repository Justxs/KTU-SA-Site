import React from 'react';
import PropTypes from 'prop-types';
import styles from './DukCard.module.css';
import Note from '../../assets/Note.svg';
import { Skeleton } from '@mui/material';

export default function DukCard({title, isLoading}) {
  return (
    <div className={styles.Card}>
      <img src={Note} className={styles.Note}/>
      <div className={styles.Text}>
        {title}
        {isLoading &&
            <Skeleton variant="rectangular" animation="wave" width={180} height={130}/>
        }
      </div>
    </div>
  );
}

DukCard.propTypes = {
  title: PropTypes.string,
  isLoading: PropTypes.bool,
};

DukCard.defaultProps = {
  title: "",
  isLoading: false,
};
