'use client';

import React, { useState } from 'react';
import DialogBase from '../dialogBase/DialogBase';
import Image from 'next/image';
import Note from '@public/assets/design-elements/Note.svg';
import { Box } from '@mui/material';
import colors from '@theme/colors';
import { lineClamp } from '@theme/styles';

type Props = {
  title?: string;
  answer?: string;
  clickable?: boolean;
};

export default function DukCard(props: Readonly<Props>) {
  const { title = '', answer = '', clickable = false } = props;
  const [open, setOpen] = useState(false);

  return (
    <>
      <Box
        component="button"
        onClick={() => setOpen(true)}
        type="button"
        aria-haspopup="dialog"
        aria-label={title}
        sx={{
          position: 'relative',
          width: 245,
          height: 240,
          transition: '0.3s',
          cursor: clickable ? 'pointer' : 'default',
          '&:hover': {
            transform: 'scale(1.1)',
          },
          '&:focus-visible': {
            border: 'solid',
            borderRadius: '5px',
            borderColor: 'black',
            borderWidth: 2,
            transform: 'scale(1.1)',
          },
        }}
      >
        <Image src={Note} alt="" style={{ width: '100%', height: 'auto', display: 'block' }} />
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            fontWeight: 600,
            fontSize: 24,
            color: colors.dukBrown,
            ...lineClamp(5),
          }}
        >
          {title}
        </Box>
      </Box>
      {clickable && (
        <DialogBase open={open} handleClose={() => setOpen(false)} title={title}>
          {answer}
        </DialogBase>
      )}
    </>
  );
}
