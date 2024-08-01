'use client';

import React, { useState } from 'react';
import { Skeleton } from '@mui/material';
import styles from './DukCard.module.css';
import DialogBase from '../dialogBase/DialogBase';
import Image from 'next/image';
import Note from '@public/assets/design-elements/Note.svg';

type Props = {
  title?: string;
  answer?: string;
  clickable?: boolean;
};

export default function DukCard(props : Props) {
  const {
    title = '',
    answer = '',
    clickable = false
  } = props;
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        className={styles.Card}
        data-ison={clickable}
        onClick={() => setOpen(true)}
        type="button"
      >
        <Image src={Note} className={styles.Note} alt="" />
        <div className={styles.Text}>
          {title}
        </div>
      </button>
      {clickable && (
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
