import FacebookIcon from '@public/icons/social/icon-facebook.svg';
import InstagramIcon from '@public/icons/social/icon-instagram.svg';
import LinkedInIcon from '@public/icons/social/icon-linkedin.svg';
import { SOCIAL_LINKS } from '@constants/SocialLinks';
import Image from 'next/image';
import LanguageSwitcher from './LanguageSwitcher';
import { Box } from '@mui/material';
import colors from '@theme/colors';
import { focusOutline } from '@theme/styles';

const iconLinkSx = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 34,
  height: 34,
  borderRadius: '8px',
  transition: 'background-color 0.2s ease',
  '&:hover': { bgcolor: colors.navbarLightBlue },
  ...focusOutline,
};

export default function SocialIcons() {
  return (
    <Box
      sx={{
        display: 'flex',
        p: '4px 8px',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '6px',
        ml: 'auto',
        '@media (max-width: 1300px)': {
          ml: 0,
          gap: '6px',
        },
      }}
    >
      <Box
        component="a"
        href={SOCIAL_LINKS.FACEBOOK}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Facebook (opens in new tab)"
        sx={iconLinkSx}
      >
        <Image alt="" src={FacebookIcon} aria-hidden="true" />
      </Box>
      <Box
        component="a"
        href={SOCIAL_LINKS.INSTAGRAM}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Instagram (opens in new tab)"
        sx={iconLinkSx}
      >
        <Image alt="" src={InstagramIcon} aria-hidden="true" />
      </Box>
      <Box
        component="a"
        href={SOCIAL_LINKS.LINKEDIN}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn (opens in new tab)"
        sx={iconLinkSx}
      >
        <Image alt="" src={LinkedInIcon} aria-hidden="true" />
      </Box>
      <LanguageSwitcher />
    </Box>
  );
}
