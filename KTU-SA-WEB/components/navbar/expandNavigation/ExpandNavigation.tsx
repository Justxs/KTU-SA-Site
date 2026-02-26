'use client';

import * as motion from 'motion/react-client';
import Link from 'next/link';
import { Box, Typography } from '@mui/material';
import colors from '@theme/colors';
import { focusOutline } from '@theme/styles';

type Props = {
  open: boolean;
  setOpen: (bool: boolean) => void;
  currentSection: {
    header: string;
    description: string;
    links: Array<{
      path: string;
      name: string;
    }>;
  };
};

export default function ExpandNavigation(props: Readonly<Props>) {
  const { open, setOpen, currentSection } = props;

  const variants: any = {
    open: {
      scaleY: 1,
      opacity: 1,
      transition: { duration: 0.2, ease: 'easeOut' },
    },
    closed: {
      scaleY: 0,
      opacity: 0,
      transition: { duration: 0.18, ease: 'easeIn' },
    },
  };

  return (
    <Box
      component={motion.div}
      variants={variants}
      initial="closed"
      animate={open ? 'open' : 'closed'}
      exit="closed"
      style={{ originY: 0 }}
      sx={{
        position: 'absolute',
        bgcolor: colors.white,
        right: 0,
        left: 0,
        zIndex: 10,
        boxShadow: '0 8px 24px rgba(14,38,67,0.1)',
        borderTop: `2px solid ${colors.activeYellow}`,
      }}
    >
      {currentSection && (
        <Box
          sx={{
            display: 'flex',
            maxWidth: 960,
            mx: 'auto',
            px: { xs: '24px', md: '48px' },
            py: '28px',
            gap: '48px',
            '@media (max-width: 1300px)': {
              flexDirection: 'column',
              gap: '16px',
              py: '20px',
            },
          }}
        >
          <Box sx={{ flex: '0 0 260px', '@media (max-width: 1300px)': { flex: 'none' } }}>
            <Typography
              sx={{
                fontSize: 15,
                lineHeight: 1.6,
                color: colors.grayContact,
              }}
            >
              {currentSection.description}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <Typography
              component="h2"
              sx={{
                color: colors.primaryDark,
                fontSize: 12,
                fontFamily: 'PFDinTextPro-Medium',
                textTransform: 'uppercase',
                letterSpacing: '1.5px',
                mb: '6px',
              }}
            >
              {currentSection.header}
            </Typography>
            {currentSection.links.map((link) => (
              <Box
                key={link.path}
                component={Link}
                href={link.path}
                onClick={() => setOpen(false)}
                sx={{
                  color: colors.primaryDark,
                  fontSize: 16,
                  fontWeight: 500,
                  textDecoration: 'none',
                  py: '6px',
                  px: '10px',
                  mx: '-10px',
                  borderRadius: '6px',
                  transition: 'all 0.15s ease',
                  '&:hover': {
                    bgcolor: colors.lightBlueBg,
                    color: colors.mediumBlue,
                  },
                  ...focusOutline,
                }}
              >
                {link.name}
              </Box>
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
}
