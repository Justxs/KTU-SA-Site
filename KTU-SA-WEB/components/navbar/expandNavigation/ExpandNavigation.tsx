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
      transition: {
        duration: 0.25,
        ease: 'easeInOut',
      },
    },
    closed: {
      scaleY: 0,
      opacity: 0,
      transition: {
        duration: 0.25,
        ease: 'easeInOut',
      },
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
        bgcolor: 'white',
        borderBottom: `1px solid ${colors.activeYellow}`,
        right: 0,
        left: 0,
        zIndex: 10,
        display: 'flex',
        justifyContent: 'center',
        gap: '30px',
        height: 'auto',
        pb: '15px',
      }}
    >
      {currentSection && (
        <Box
          sx={{
            display: 'flex',
            width: '50vw',
            '@media (max-width: 1300px)': {
              flexDirection: 'column',
              width: 'auto',
            },
          }}
        >
          <Typography
            sx={{
              color: colors.navGold,
              fontSize: 20,
              lineHeight: 1.4,
              width: '15vw',
              mr: '20vw',
              '@media (max-width: 1300px)': { width: '50vw' },
            }}
          >
            {currentSection.description}
          </Typography>
          <Box
            sx={{
              display: 'inline-flex',
              flexDirection: 'column',
              flexWrap: 'wrap',
              alignItems: 'flex-start',
              gap: '12px',
            }}
          >
            <Typography
              component="h2"
              sx={{ color: colors.navDarkBlue, fontSize: 20, m: 0, width: '100%' }}
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
                  color: colors.navDarkBlue,
                  fontSize: 16,
                  fontWeight: 500,
                  textDecoration: 'none',
                  '&:hover': { color: colors.accentBlue },
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
