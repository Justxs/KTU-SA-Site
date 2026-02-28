import InstagramIcon from '@public/icons/social/Instagram-colored.svg';
import FacebookIcon from '@public/icons/social/icon-facebook.svg';
import LinkedinIcon from '@public/icons/social/icon-linkedin.svg';
import { Box } from '@mui/material';
import Image from 'next/image';
import { SOCIAL_LINKS } from '@constants/SocialLinks';
import colors from '@theme/colors';

const iconSx = {
  width: 'clamp(56px, 14vw, 100px)',
  height: 'clamp(56px, 14vw, 100px)',
  p: 'clamp(4px, 1.5vw, 14px)',
  borderRadius: 'clamp(14px, 3.5vw, 26px)',
  bgcolor: 'white',
  boxShadow: '0 6px 24px rgba(14, 38, 67, 0.15), 0 2px 6px rgba(14, 38, 67, 0.08)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  transition: 'all 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  textDecoration: 'none',
  '&:hover': {
    bgcolor: colors.navbarLightBlue,
    transform: 'translateY(-6px) rotate(0deg) !important',
    boxShadow: '0 12px 36px rgba(14, 38, 67, 0.22), 0 4px 10px rgba(14, 38, 67, 0.10)',
  },
  '&:active': {
    transform: 'translateY(-2px) scale(0.97) !important',
  },
};

const iconImgStyle = {
  width: '100%',
  height: '100%',
};

export default function SocialLinks() {
  return (
    <Box sx={{ display: 'flex', gap: 'clamp(12px, 3vw, 28px)' }}>
      <Box
        component="a"
        href={SOCIAL_LINKS.INSTAGRAM}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Instagram (opens in new tab)"
        sx={{ ...iconSx, transform: 'rotate(12deg)' }}
      >
        <Image src={InstagramIcon} alt="Instagram" width={0} height={0} style={iconImgStyle} />
      </Box>
      <Box
        component="a"
        href={SOCIAL_LINKS.LINKEDIN}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn (opens in new tab)"
        sx={{ ...iconSx, mt: 'clamp(8px, 2vw, 18px)' }}
      >
        <Image src={LinkedinIcon} alt="Linkedin" style={iconImgStyle} />
      </Box>
      <Box
        component="a"
        href={SOCIAL_LINKS.FACEBOOK}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Facebook (opens in new tab)"
        sx={{ ...iconSx, transform: 'rotate(-12deg)' }}
      >
        <Image src={FacebookIcon} alt="Facebook" style={iconImgStyle} />
      </Box>
    </Box>
  );
}
