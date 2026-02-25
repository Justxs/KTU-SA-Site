import FacebookIcon from '@public/icons/social/icon-facebook.svg';
import InstagramIcon from '@public/icons/social/icon-instagram.svg';
import LinkedInIcon from '@public/icons/social/icon-linkedin.svg';
import { SOCIAL_LINKS } from '@constants/SocialLinks';
import Image from 'next/image';
import LanguageSwitcher from './LanguageSwitcher';
import { Box } from '@mui/material';
import { focusOutline } from '@theme/styles';

export default function SocialIcons() {
  return (
    <Box
      sx={{
        display: 'flex',
        p: '8px 12px',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '15px',
        ml: 'auto',
        '@media (max-width: 1300px)': {
          ml: 0,
          gap: '10px',
        },
      }}
    >
      <Box
        component="a"
        href={SOCIAL_LINKS.FACEBOOK}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Facebook (opens in new tab)"
        sx={{ display: 'flex', ...focusOutline }}
      >
        <Image alt="" src={FacebookIcon} aria-hidden="true" />
      </Box>
      <Box
        component="a"
        href={SOCIAL_LINKS.INSTAGRAM}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Instagram (opens in new tab)"
        sx={{ display: 'flex', ...focusOutline }}
      >
        <Image alt="" src={InstagramIcon} aria-hidden="true" />
      </Box>
      <Box
        component="a"
        href={SOCIAL_LINKS.LINKEDIN}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn (opens in new tab)"
        sx={{ display: 'flex', ...focusOutline }}
      >
        <Image alt="" src={LinkedInIcon} aria-hidden="true" />
      </Box>
      <LanguageSwitcher />
    </Box>
  );
}
