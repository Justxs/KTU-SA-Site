'use client';

import React, { useState } from 'react';
import DialogBase from '../dialogBase/DialogBase';
import Image from 'next/image';
import Note from '@public/assets/design-elements/Note.svg';
import { Box, Typography } from '@mui/material';
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
          width: { xs: 220, sm: 260 },
          height: { xs: 215, sm: 255 },
          maxWidth: '85vw',
          transition: 'transform 0.35s ease, filter 0.35s ease',
          cursor: clickable ? 'pointer' : 'default',
          background: 'none',
          border: 'none',
          padding: 0,
          filter: 'drop-shadow(0 4px 12px rgba(14, 38, 67, 0.10))',
          '&:hover': {
            filter: 'drop-shadow(0 8px 24px rgba(14, 38, 67, 0.18))',
          },
          '&:focus-visible': {
            outline: `3px solid ${colors.focusBlue}`,
            outlineOffset: '4px',
            borderRadius: '8px',
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
            width: '80%',
            px: 1,
          }}
        >
          <Typography
            component="span"
            sx={{
              fontWeight: 700,
              fontSize: { xs: 18, sm: 20 },
              lineHeight: 1.3,
              color: colors.dukBrown,
              ...lineClamp(4),
            }}
          >
            {title}
          </Typography>
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
