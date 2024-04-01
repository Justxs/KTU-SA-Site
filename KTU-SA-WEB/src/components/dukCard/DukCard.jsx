import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Skeleton } from '@mui/material';
import styles from './DukCard.module.css';
import Note from '../../assets/Note.svg';
import DialogBase from '../dialogBase/DialogBase';

export default function DukCard({
  title, answer, isLoading, clickable,
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className={styles.Card} data-ison={clickable} onClick={() => setOpen(true)}>
        <img src={Note} className={styles.Note} />
        <div className={styles.Text}>
          {title}
          {isLoading
            && <Skeleton variant="rectangular" animation="wave" width={180} height={130} />}
        </div>
      </div>
      {clickable
        && (
        <DialogBase
          open={open}
          handleClose={() => setOpen(false)}
          title={title}
        >
          {answer}
        </DialogBase>
        )}
    </>
  );
}

DukCard.propTypes = {
  title: PropTypes.string,
  answer: PropTypes.string,
  isLoading: PropTypes.bool,
  clickable: PropTypes.bool,
};

DukCard.defaultProps = {
  title: '',
  answer: '',
  isLoading: false,
  clickable: false,
};
