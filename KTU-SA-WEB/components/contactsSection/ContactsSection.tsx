import { Box, Tooltip } from '@mui/material';
import FacebookIcon from '@public/icons/social/icon-facebook.svg';
import InstagramIcon from '@public/icons/social/icon-instagram.svg';
import LinkedInIcon from '@public/icons/social/icon-linkedin.svg';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import colors from '@theme/colors';
import { focusOutlineInline } from '@theme/styles';

type Props = {
  email: string;
  phoneNumber: string;
  address: string;
  facebookUrl: string;
  linkedInUrl: string;
  instagramUrl: string;
};

const linkSx = {
  fontSize: 20,
  fontWeight: 400,
  transition: '0.3s',
  textDecoration: 'underline',
  color: 'inherit',
  '&:hover': {
    color: colors.linkBlue,
  },
  ...focusOutlineInline,
};

const headerSx = {
  color: colors.linkBlue,
  fontWeight: 700,
  fontSize: 20,
  mb: '3px',
};

const iconSx = {
  display: 'flex',
  justifyContent: 'center',
  width: 35,
};

export default async function ContactsSection(props: Readonly<Props>) {
  const { email, phoneNumber, address, facebookUrl, linkedInUrl, instagramUrl } = props;

  const t = await getTranslations();

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gridTemplateRows: '0fr 1fr',
        gap: '10px',
        '@media (max-width: 550px)': {
          gridTemplateColumns: '1fr',
          gridTemplateRows: '1fr',
          gap: '10px 30px',
          maxWidth: 350,
          textAlign: 'center',
        },
      }}
    >
      <Box>
        <Box sx={headerSx}>{t('mainContacts.email')}</Box>
        <Box component="a" href={`mailto:${email}`} sx={linkSx}>
          {email}
        </Box>
      </Box>
      <Box>
        <Box sx={headerSx}>{t('mainContacts.phone')}</Box>
        <Box component="a" href={`tel:${phoneNumber}`} sx={linkSx}>
          {phoneNumber}
        </Box>
      </Box>
      <Box>
        <Box sx={headerSx}>{t('mainContacts.live')}</Box>
        <Box
          component="a"
          href={`http://maps.google.com/?q=${address}`}
          target="_blank"
          rel="noopener noreferrer"
          sx={linkSx}
        >
          {address}
        </Box>
      </Box>
      <Box>
        <Box sx={headerSx}>{t('mainContacts.social')}</Box>
        <Box
          sx={{
            display: 'flex',
            '@media (max-width: 550px)': {
              justifyContent: 'center',
            },
          }}
        >
          <Tooltip title="Facebook">
            <Box
              component="a"
              href={facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              sx={iconSx}
            >
              <Image src={FacebookIcon} alt="Facebook" />
            </Box>
          </Tooltip>
          <Tooltip title="Instagram">
            <Box
              component="a"
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              sx={iconSx}
            >
              <Image src={InstagramIcon} alt="Instagram" />
            </Box>
          </Tooltip>
          <Tooltip title="Linkedin">
            <Box
              component="a"
              href={linkedInUrl}
              target="_blank"
              rel="noopener noreferrer"
              sx={iconSx}
            >
              <Image src={LinkedInIcon} alt="Linkedin" />
            </Box>
          </Tooltip>
        </Box>
      </Box>
    </Box>
  );
}
