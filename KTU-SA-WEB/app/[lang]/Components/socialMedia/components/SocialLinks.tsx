import InstagramIcon from '@public/icons/social/Instagram-colored.svg';
import FacebookIcon from '@public/icons/social/icon-facebook.svg';
import LinkedinIcon from '@public/icons/social/icon-linkedin.svg';
import { Box } from '@mui/material';
import Image from 'next/image';
import { SOCIAL_LINKS } from '@constants/SocialLinks';
import colors from '@theme/colors';

const iconSx = {
  width: 100,
  height: 100,
  p: '12px',
  borderRadius: '24px',
  bgcolor: 'white',
  boxShadow: '0px 1px 2px 0px black',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  transition: '0.3s',
  '&:hover': {
    bgcolor: colors.navbarLightBlue,
  },
  '@media (max-width: 450px)': {
    width: 80,
    height: 80,
    p: '10px',
  },
  '@media (max-width: 400px)': {
    width: 60,
    height: 60,
    p: '5px',
    borderRadius: '16px',
  },
};

export default function SocialLinks() {
  return (
    <Box sx={{ display: 'flex', gap: '20px' }}>
      <Box
        component="a"
        href={SOCIAL_LINKS.INSTAGRAM}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Instagram (opens in new tab)"
        sx={{ ...iconSx, transform: 'rotate(16deg)' }}
      >
        <Image
          src={InstagramIcon}
          alt="Instagram"
          width={0}
          height={0}
          style={{ width: 92, height: 92 }}
        />
      </Box>
      <Box
        component="a"
        href={SOCIAL_LINKS.LINKEDIN}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn (opens in new tab)"
        sx={{ ...iconSx, mt: '15px' }}
      >
        <Image src={LinkedinIcon} alt="Linkedin" style={{ width: 90, height: 90 }} />
      </Box>
      <Box
        component="a"
        href={SOCIAL_LINKS.FACEBOOK}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Facebook (opens in new tab)"
        sx={{ ...iconSx, transform: 'rotate(-16deg)' }}
      >
        <Image src={FacebookIcon} alt="Facebook" style={{ width: 90, height: 90 }} />
      </Box>
    </Box>
  );
}
