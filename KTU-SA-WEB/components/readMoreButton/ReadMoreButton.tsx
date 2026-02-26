'use client';

import { Box, Button } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Link from 'next/link';
import colors from '@theme/colors';

type Props = {
  path: string;
  title: string;
  isCenter?: boolean;
  margin?: boolean;
};

export default function ReadMoreButton(props: Readonly<Props>) {
  const { path, title, isCenter = false, margin = false } = props;

  return (
    <Box
      sx={{
        mt: '28px',
        ...(isCenter && { display: 'flex', justifyContent: 'center' }),
        ...(margin && { pb: '44px' }),
      }}
    >
      <Button
        LinkComponent={Link}
        href={path}
        variant="contained"
        size="small"
        disableFocusRipple
        sx={{
          backgroundColor: colors.primaryDark,
          color: colors.offWhite,
          textTransform: 'none',
          padding: '14px 28px',
          fontSize: '17px',
          fontWeight: '600',
          fontFamily: 'PFDinTextPro-Medium',
          letterSpacing: '1.5px',
          lineHeight: '1',
          gap: '10px',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(14, 38, 67, 0.25)',
          transition: 'all 0.25s ease',
          '&:hover': {
            backgroundColor: colors.navDarkBlue,
            boxShadow: '0 4px 14px rgba(14, 38, 67, 0.35)',
            transform: 'translateY(-2px)',
            '& .arrow-icon': {
              transform: 'translateX(4px)',
            },
          },
          '&:active': {
            transform: 'translateY(0)',
            boxShadow: '0 1px 4px rgba(14, 38, 67, 0.3)',
          },
          '&:focus-visible': {
            outline: `2px solid ${colors.focusBlue}`,
            outlineOffset: '2px',
            backgroundColor: colors.navDarkBlue,
          },
        }}
      >
        {title}
        <ArrowForwardIcon
          className="arrow-icon"
          aria-hidden="true"
          sx={{ transition: 'transform 0.25s ease', fontSize: '20px' }}
        />
      </Button>
    </Box>
  );
}
