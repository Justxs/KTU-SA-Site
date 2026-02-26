import { Box, Stack, Tooltip, Typography } from '@mui/material';
import { getLocale, getTranslations } from 'next-intl/server';
import { getHeroImage } from '@api/GetHeroImage';
import { getMainContacts } from '@api/GetContacts';
import { SA_UNITS } from '@constants/saUnits';
import { SOCIAL_LINKS } from '@constants/SocialLinks';
import Image from 'next/image';
import colors from '@theme/colors';
import {
  HERO_BLUR_PLACEHOLDER,
  bottomAccentBar,
  iconBox,
  socialIconBtn,
  contactLink,
} from '@theme/styles';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import FacebookIcon from '@public/icons/social/icon-facebook.svg';
import InstagramIcon from '@public/icons/social/icon-instagram.svg';
import LinkedInIcon from '@public/icons/social/icon-linkedin.svg';

const ACCENT = colors.mediumBlue;
const contactLinkSx = contactLink();
const iconBoxSx = iconBox();
const socialBtnSx = socialIconBtn();

export default async function HeroImage({ sectionName }: Readonly<{ sectionName: string }>) {
  const t = await getTranslations();
  const locale = await getLocale();
  const heroSection = await getHeroImage(locale, sectionName);
  const mainContacts = await getMainContacts(SA_UNITS.CSA);

  return (
    <Stack
      sx={{
        background: `linear-gradient(135deg, ${colors.lightBlueBg} 0%, #E3EEFB 50%, ${colors.lightBlueBg} 100%)`,
        position: 'relative',
        mb: { xs: '32px', md: '48px' },
        overflow: 'hidden',
      }}
    >
      {/* Decorative background circles */}
      <Box
        sx={{
          position: 'absolute',
          top: { xs: '-60px', md: '-100px' },
          left: { xs: '-80px', md: '-120px' },
          width: { xs: 220, md: 360 },
          height: { xs: 220, md: 360 },
          borderRadius: '50%',
          background: `radial-gradient(circle, ${colors.lightBlueAccent}20 0%, transparent 70%)`,
          pointerEvents: 'none',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: { xs: '-40px', md: '-80px' },
          right: { xs: '-60px', md: '-100px' },
          width: { xs: 180, md: 300 },
          height: { xs: 180, md: 300 },
          borderRadius: '50%',
          background: `radial-gradient(circle, ${colors.lightBlueAccent}18 0%, transparent 70%)`,
          pointerEvents: 'none',
        }}
      />

      <Stack
        sx={{
          px: { xs: '20px', sm: '32px', md: '64px' },
          py: { xs: '40px', md: '64px' },
          gap: { xs: '32px', md: '48px' },
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Left panel — title + contacts */}
        <Stack
          sx={{
            alignItems: { xs: 'center', md: 'flex-start' },
            textAlign: { xs: 'center', md: 'left' },
            gap: '28px',
            flex: 1,
            maxWidth: { xs: '100%', md: 560 },
            zIndex: 1,
          }}
        >
          {/* Title + description */}
          <Stack sx={{ gap: '16px' }}>
            <Typography
              component="h1"
              sx={{
                color: colors.primaryDark,
                fontFamily: 'PFDinTextPro-Medium',
                fontSize: { xs: '30px', sm: '38px', md: '46px' },
                lineHeight: 1.12,
                position: 'relative',
                pb: '12px',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: 0,
                  left: { xs: '50%', md: 0 },
                  transform: { xs: 'translateX(-50%)', md: 'none' },
                  width: 56,
                  height: 4,
                  borderRadius: 2,
                  bgcolor: colors.linkBlue,
                },
              }}
            >
              {heroSection.title}
            </Typography>
            {heroSection.description && (
              <Typography
                sx={{
                  color: colors.mediumBlue,
                  fontSize: { xs: 16, md: 20 },
                  letterSpacing: '0.5px',
                  lineHeight: 1.6,
                }}
              >
                {heroSection.description}
              </Typography>
            )}
          </Stack>

          {/* "Let's Talk" + contact rows */}
          <Stack sx={{ gap: '16px', width: '100%' }}>
            <Typography
              component="h2"
              sx={{
                fontFamily: 'PFDinTextPro-Medium',
                fontSize: { xs: '18px', md: '22px' },
                color: colors.primaryDark,
                m: 0,
                opacity: 0.85,
              }}
            >
              {t('mainContacts.letsTalk')}
            </Typography>

            <Stack sx={{ gap: '12px' }}>
              {/* Email */}
              <Stack direction="row" sx={{ alignItems: 'center', gap: '12px' }}>
                <Box sx={iconBoxSx}>
                  <EmailOutlinedIcon sx={{ fontSize: 18, color: ACCENT }} />
                </Box>
                <Box component="a" href={`mailto:${mainContacts.email}`} sx={contactLinkSx}>
                  {mainContacts.email}
                </Box>
              </Stack>

              {/* Phone */}
              <Stack direction="row" sx={{ alignItems: 'center', gap: '12px' }}>
                <Box sx={iconBoxSx}>
                  <PhoneOutlinedIcon sx={{ fontSize: 18, color: ACCENT }} />
                </Box>
                <Box component="a" href={`tel:${mainContacts.phoneNumber}`} sx={contactLinkSx}>
                  {mainContacts.phoneNumber}
                </Box>
              </Stack>

              {/* Address */}
              <Stack direction="row" sx={{ alignItems: 'center', gap: '12px' }}>
                <Box sx={iconBoxSx}>
                  <PlaceOutlinedIcon sx={{ fontSize: 18, color: ACCENT }} />
                </Box>
                <Box
                  component="a"
                  href={`http://maps.google.com/?q=${mainContacts.address}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={contactLinkSx}
                >
                  {mainContacts.address}
                </Box>
              </Stack>

              {/* Working hours */}
              <Stack direction="row" sx={{ alignItems: 'flex-start', gap: '12px' }}>
                <Box sx={iconBoxSx}>
                  <AccessTimeIcon sx={{ fontSize: 18, color: ACCENT }} />
                </Box>
                <Stack sx={{ gap: '6px', fontSize: 15, color: colors.primaryDark }}>
                  <Box sx={{ fontWeight: 600, fontSize: 14, opacity: 0.6, letterSpacing: '0.5px' }}>
                    {t('mainContacts.workingHours')}
                  </Box>
                  <Stack direction="row" sx={{ gap: '8px', alignItems: 'center' }}>
                    <Box sx={{ minWidth: 130 }}>{t('mainContacts.weekdays')}</Box>
                    <Box sx={{ opacity: 0.7 }}>{t('mainContacts.hours')}</Box>
                  </Stack>
                  <Stack direction="row" sx={{ gap: '8px', alignItems: 'center' }}>
                    <Box sx={{ minWidth: 130 }}>{t('mainContacts.friday')}</Box>
                    <Box sx={{ opacity: 0.7 }}>{t('mainContacts.friday_hours')}</Box>
                  </Stack>
                </Stack>
              </Stack>
            </Stack>

            {/* Social icons */}
            <Stack direction="row" sx={{ gap: '10px', mt: '4px' }}>
              <Tooltip title="Facebook">
                <Box
                  component="a"
                  href={SOCIAL_LINKS.FACEBOOK}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={socialBtnSx}
                >
                  <Image src={FacebookIcon} alt="Facebook" width={20} height={20} />
                </Box>
              </Tooltip>
              <Tooltip title="Instagram">
                <Box
                  component="a"
                  href={SOCIAL_LINKS.INSTAGRAM}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={socialBtnSx}
                >
                  <Image src={InstagramIcon} alt="Instagram" width={20} height={20} />
                </Box>
              </Tooltip>
              <Tooltip title="LinkedIn">
                <Box
                  component="a"
                  href={SOCIAL_LINKS.LINKEDIN}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={socialBtnSx}
                >
                  <Image src={LinkedInIcon} alt="LinkedIn" width={20} height={20} />
                </Box>
              </Tooltip>
            </Stack>
          </Stack>
        </Stack>

        {/* Right panel — hero image */}
        <Box
          sx={{
            position: 'relative',
            width: { xs: '100%', sm: '80vw', md: '48%' },
            maxWidth: 640,
            flexShrink: 0,
            zIndex: 1,
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              top: 12,
              left: 12,
              right: -12,
              bottom: -12,
              borderRadius: '20px',
              border: `3px solid ${colors.lightBlueAccent}`,
              pointerEvents: 'none',
              zIndex: 0,
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              top: { xs: -20, md: -28 },
              right: { xs: -16, md: -28 },
              width: { xs: 48, md: 64 },
              height: { xs: 48, md: 64 },
              zIndex: 0,
              pointerEvents: 'none',
              backgroundImage: `radial-gradient(${colors.lightBlueAccent} 2px, transparent 2px)`,
              backgroundSize: '10px 10px',
              opacity: 0.6,
            }}
          />
          <Box
            sx={{
              position: 'relative',
              aspectRatio: '16 / 10',
              borderRadius: '18px',
              overflow: 'hidden',
              boxShadow: '0 16px 48px rgba(14,38,67,0.18), 0 4px 12px rgba(14,38,67,0.08)',
              zIndex: 1,
            }}
          >
            <Image
              src={heroSection.imgSrc}
              alt={heroSection.title}
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
        </Box>
      </Stack>

      {/* Bottom divider */}
      <Box sx={bottomAccentBar()} />
    </Stack>
  );
}
