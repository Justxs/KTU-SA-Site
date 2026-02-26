import FSA_DATA from '@constants/FsaUnits';
import { Box, Stack, Tooltip, Typography } from '@mui/material';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import FacebookIcon from '@public/icons/social/icon-facebook.svg';
import InstagramIcon from '@public/icons/social/icon-instagram.svg';
import LinkedInIcon from '@public/icons/social/icon-linkedin.svg';
import {
  HERO_BLUR_PLACEHOLDER,
  bottomAccentBar,
  iconBox,
  socialIconBtn,
  contactLink,
} from '@theme/styles';

type Props = {
  fsaName: string;
  coverUrl: string;
  email: string;
  phoneNumber: string;
  address: string;
  facebookUrl: string;
  linkedInUrl: string;
  instagramUrl: string;
};

export default async function HeroImage(props: Readonly<Props>) {
  const { fsaName, coverUrl, email, phoneNumber, address, facebookUrl, linkedInUrl, instagramUrl } =
    props;

  const t = await getTranslations();
  const fsa = FSA_DATA(t).find((f) => f.name === fsaName.replace('%20', ' '));

  if (fsa === undefined) {
    return;
  }

  const contactLinkSx = contactLink(fsa.textColor);
  const iconBoxSx = iconBox(36, `${fsa.borderColor}18`);
  const socialBtnSx = socialIconBtn(fsa.borderColor);

  return (
    <Stack
      sx={{
        bgcolor: fsa.backgroundColor,
        color: fsa.textColor,
        position: 'relative',
        mb: { xs: '32px', md: '48px' },
      }}
    >
      <Stack
        sx={{
          px: { xs: '20px', md: '64px' },
          py: { xs: '36px', md: '56px' },
          gap: { xs: '32px', md: '48px' },
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: { xs: 'center', md: 'center' },
          justifyContent: 'center',
        }}
      >
        <Stack
          sx={{
            alignItems: { xs: 'center', md: 'flex-start' },
            textAlign: { xs: 'center', md: 'left' },
            gap: '28px',
            flex: 1,
            maxWidth: { xs: '100%', md: 520 },
          }}
        >
          <Stack direction="row" sx={{ alignItems: 'center', gap: '16px' }}>
            <Image
              alt={fsa.fullName}
              src={fsa.logo}
              width={56}
              height={56}
              sizes="56px"
              priority
              style={{ height: 'auto', width: 56, objectFit: 'contain', flexShrink: 0 }}
            />
            <Stack sx={{ gap: '2px' }}>
              <Typography
                component="h1"
                sx={{
                  fontFamily: 'PFDinTextPro-Medium',
                  fontSize: { xs: '26px', sm: '32px', md: '36px' },
                  lineHeight: 1.1,
                  letterSpacing: '-0.3px',
                }}
              >
                {fsa.name}
              </Typography>
              <Typography
                sx={{
                  fontSize: { xs: 13, md: 15 },
                  opacity: 0.6,
                  lineHeight: 1.4,
                }}
              >
                {fsa.fullName}
              </Typography>
            </Stack>
          </Stack>

          <Stack sx={{ gap: '16px', width: '100%' }}>
            <Typography
              component="h2"
              sx={{
                fontFamily: 'PFDinTextPro-Medium',
                fontSize: { xs: '18px', md: '22px' },
                m: 0,
                opacity: 0.85,
              }}
            >
              {t('mainContacts.letsTalk')}
            </Typography>

            <Stack sx={{ gap: '12px' }}>
              <Stack direction="row" sx={{ alignItems: 'center', gap: '12px' }}>
                <Box sx={iconBoxSx}>
                  <EmailOutlinedIcon sx={{ fontSize: 18, color: fsa.borderColor }} />
                </Box>
                <Box component="a" href={`mailto:${email}`} sx={contactLinkSx}>
                  {email}
                </Box>
              </Stack>

              <Stack direction="row" sx={{ alignItems: 'center', gap: '12px' }}>
                <Box sx={iconBoxSx}>
                  <PhoneOutlinedIcon sx={{ fontSize: 18, color: fsa.borderColor }} />
                </Box>
                <Box component="a" href={`tel:${phoneNumber}`} sx={contactLinkSx}>
                  {phoneNumber}
                </Box>
              </Stack>

              <Stack direction="row" sx={{ alignItems: 'center', gap: '12px' }}>
                <Box sx={iconBoxSx}>
                  <PlaceOutlinedIcon sx={{ fontSize: 18, color: fsa.borderColor }} />
                </Box>
                <Box
                  component="a"
                  href={`http://maps.google.com/?q=${address}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={contactLinkSx}
                >
                  {address}
                </Box>
              </Stack>
            </Stack>

            <Stack direction="row" sx={{ gap: '10px', mt: '4px' }}>
              {facebookUrl && (
                <Tooltip title="Facebook">
                  <Box
                    component="a"
                    href={facebookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={socialBtnSx}
                  >
                    <Image src={FacebookIcon} alt="Facebook" width={20} height={20} />
                  </Box>
                </Tooltip>
              )}
              {instagramUrl && (
                <Tooltip title="Instagram">
                  <Box
                    component="a"
                    href={instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={socialBtnSx}
                  >
                    <Image src={InstagramIcon} alt="Instagram" width={20} height={20} />
                  </Box>
                </Tooltip>
              )}
              {linkedInUrl && (
                <Tooltip title="LinkedIn">
                  <Box
                    component="a"
                    href={linkedInUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={socialBtnSx}
                  >
                    <Image src={LinkedInIcon} alt="LinkedIn" width={20} height={20} />
                  </Box>
                </Tooltip>
              )}
            </Stack>
          </Stack>
        </Stack>

        <Box
          sx={{
            position: 'relative',
            width: { xs: '100%', sm: '80vw', md: '48%' },
            maxWidth: 640,
            aspectRatio: '16 / 10',
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: `0 16px 48px rgba(0,0,0,0.12), 0 0 0 3px ${fsa.borderColor}`,
            flexShrink: 0,
          }}
        >
          <Image
            src={coverUrl}
            alt={`${fsa.name} cover`}
            fill
            sizes="(max-width: 1000px) 80vw, 48vw"
            priority
            placeholder="blur"
            blurDataURL={HERO_BLUR_PLACEHOLDER}
            style={{
              objectFit: 'cover',
              objectPosition: 'top',
            }}
          />
        </Box>
      </Stack>

      <Box sx={bottomAccentBar(fsa.borderColor)} />
    </Stack>
  );
}
