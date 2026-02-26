import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import PlaceIcon from '@mui/icons-material/Place';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import FacebookIcon from '@mui/icons-material/Facebook';
import { Box, Chip, Stack, Tooltip, Typography, Link as MuiLink } from '@mui/material';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import colors from '@theme/colors';
import { bottomAccentBar, iconBox, inlineCardDivider } from '@theme/styles';
import dateService from '@utils/dateService';
import SA_UNITS_LOGO from '@constants/SaUnitsLogos';
const NOW = Date.now();

type Props = {
  img: string;
  title: string;
  ticketUrl?: string;
  endDate: Date;
  startDate: Date;
  facebookUrl: string;
  organizers: Array<string>;
  address?: string;
};

export default async function HeroImage(props: Readonly<Props>) {
  const { img, title, ticketUrl, endDate, startDate, facebookUrl, organizers, address } = props;
  const t = await getTranslations();
  const hasEnded = new Date(endDate).getTime() < NOW;

  const matchedLogos = SA_UNITS_LOGO.filter((saUnit) =>
    organizers.some(
      (org: string) => saUnit.name.replaceAll(/\s+/g, '_').toLowerCase() === org.toLowerCase(),
    ),
  );

  return (
    <Stack
      sx={{
        background: `linear-gradient(135deg, ${colors.lightBlueBg} 0%, #E3EEFB 50%, ${colors.lightBlueBg} 100%)`,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative background circles */}
      <Box
        sx={{
          position: 'absolute',
          top: { xs: '-60px', lg: '-100px' },
          left: { xs: '-80px', lg: '-120px' },
          width: { xs: 220, lg: 360 },
          height: { xs: 220, lg: 360 },
          borderRadius: '50%',
          background: `radial-gradient(circle, ${colors.lightBlueAccent}20 0%, transparent 70%)`,
          pointerEvents: 'none',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: { xs: '-40px', lg: '-80px' },
          right: { xs: '-60px', lg: '-100px' },
          width: { xs: 180, lg: 300 },
          height: { xs: 180, lg: 300 },
          borderRadius: '50%',
          background: `radial-gradient(circle, ${colors.lightBlueAccent}18 0%, transparent 70%)`,
          pointerEvents: 'none',
        }}
      />

      <Stack
        sx={{
          gap: { xs: '32px', lg: '48px' },
          justifyContent: 'center',
          alignItems: { xs: 'center', lg: 'stretch' },
          py: { xs: '40px', lg: '64px' },
          px: { xs: '20px', sm: '32px', lg: '64px' },
          flexDirection: { xs: 'column', lg: 'row' },
        }}
      >
        {/* Image with decorative frame */}
        <Box
          sx={{
            position: 'relative',
            width: { xs: '100%', sm: '80vw', lg: '50%' },
            maxWidth: 720,
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
              top: { xs: -20, lg: -28 },
              right: { xs: -16, lg: -28 },
              width: { xs: 48, lg: 64 },
              height: { xs: 48, lg: 64 },
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
              aspectRatio: '16 / 9',
              borderRadius: '18px',
              overflow: 'hidden',
              boxShadow: '0 16px 48px rgba(14,38,67,0.18), 0 4px 12px rgba(14,38,67,0.08)',
              zIndex: 1,
            }}
          >
            <Image
              alt={title}
              src={img}
              fill
              sizes="(max-width: 1200px) 80vw, 50vw"
              priority
              style={{ objectFit: 'cover', objectPosition: 'top' }}
            />
          </Box>
        </Box>

        <Stack
          sx={{
            flex: 1,
            maxWidth: { xs: '100%', lg: 520 },
            justifyContent: 'center',
            alignItems: { xs: 'center', lg: 'flex-start' },
            gap: '24px',
            zIndex: 1,
          }}
        >
          <Typography
            component="h1"
            sx={{
              color: colors.primaryDark,
              fontSize: { xs: '26px', sm: '32px', md: '40px' },
              lineHeight: 1.12,
              textAlign: { xs: 'center', lg: 'left' },
              fontFamily: 'PFDinTextPro-Medium',
              letterSpacing: '-0.3px',
              position: 'relative',
              pb: '12px',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: 0,
                left: { xs: '50%', lg: 0 },
                transform: { xs: 'translateX(-50%)', lg: 'none' },
                width: 56,
                height: 4,
                borderRadius: 2,
                bgcolor: colors.linkBlue,
              },
            }}
          >
            {title}
          </Typography>

          {hasEnded && (
            <Chip
              label={t('event.passed')}
              sx={{
                bgcolor: colors.navDarkBlue,
                color: colors.white,
                fontWeight: 700,
                fontSize: 14,
                letterSpacing: '1px',
                fontFamily: 'PFDinTextPro-Medium',
                height: 32,
                alignSelf: { xs: 'center', lg: 'flex-start' },
              }}
            />
          )}

          <Stack
            sx={{
              width: '100%',
              bgcolor: colors.white,
              borderRadius: '14px',
              boxShadow: '0 2px 12px rgba(14,38,67,0.06)',
              overflow: 'hidden',
            }}
          >
            <Stack
              direction="row"
              sx={{
                alignItems: 'center',
                gap: '14px',
                px: '20px',
                py: '16px',
              }}
            >
              <Box sx={iconBox(38, 'rgba(17,77,138,0.07)')}>
                {' '}
                <CalendarTodayIcon sx={{ fontSize: 18, color: colors.mediumBlue }} />
              </Box>
              <Typography sx={{ fontSize: 15, color: colors.primaryDark, lineHeight: 1.4 }}>
                {dateService.formatToDateAndTime(startDate)} –{' '}
                {dateService.formatToDateAndTime(endDate)}
              </Typography>
            </Stack>

            {address && (
              <>
                <Box sx={inlineCardDivider} />
                <Stack
                  direction="row"
                  sx={{
                    alignItems: 'center',
                    gap: '14px',
                    px: '20px',
                    py: '16px',
                  }}
                >
                  <Box sx={iconBox(38, 'rgba(17,77,138,0.07)')}>
                    <PlaceIcon sx={{ fontSize: 20, color: colors.mediumBlue }} />
                  </Box>
                  <Typography sx={{ fontSize: 15, color: colors.primaryDark }}>
                    {address}
                  </Typography>
                </Stack>
              </>
            )}

            {matchedLogos.length > 0 && (
              <>
                <Box sx={inlineCardDivider} />
                <Stack
                  direction="row"
                  sx={{
                    alignItems: 'center',
                    gap: '14px',
                    px: '20px',
                    py: '16px',
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: 12,
                      fontFamily: 'PFDinTextPro-Medium',
                      color: colors.grayText,
                      textTransform: 'uppercase',
                      letterSpacing: '1.2px',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {t('event.organisers')}
                  </Typography>
                  <Stack direction="row" sx={{ gap: '8px', flexWrap: 'wrap' }}>
                    {matchedLogos.map((unit) => (
                      <Tooltip key={unit.name} title={unit.name}>
                        <Image
                          src={unit.logo}
                          alt={unit.name}
                          width={36}
                          height={36}
                          sizes="36px"
                          style={{ height: 36, width: 'auto', objectFit: 'contain' }}
                        />
                      </Tooltip>
                    ))}
                  </Stack>
                </Stack>
              </>
            )}
          </Stack>

          <Stack direction="row" sx={{ gap: '12px', flexWrap: 'wrap' }}>
            {ticketUrl !== undefined && !hasEnded && (
              <MuiLink
                href={ticketUrl}
                underline="none"
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  px: '20px',
                  py: '10px',
                  bgcolor: colors.mediumBlue,
                  color: colors.white,
                  borderRadius: '8px',
                  fontSize: '15px',
                  fontFamily: 'PFDinTextPro-Medium',
                  letterSpacing: '0.5px',
                  transition: 'background-color 0.2s ease, transform 0.2s ease',
                  '&:hover': {
                    bgcolor: colors.accentBlue,
                    transform: 'translateY(-2px)',
                  },
                }}
              >
                <LocalActivityIcon sx={{ fontSize: 20 }} />
                {t('event.buyTickets')}
              </MuiLink>
            )}
            {facebookUrl && (
              <MuiLink
                href={facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                underline="none"
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  px: '20px',
                  py: '10px',
                  border: `1.5px solid ${colors.mediumBlue}`,
                  color: colors.mediumBlue,
                  borderRadius: '8px',
                  fontSize: '15px',
                  fontFamily: 'PFDinTextPro-Medium',
                  letterSpacing: '0.5px',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    bgcolor: colors.mediumBlue,
                    color: colors.white,
                    transform: 'translateY(-2px)',
                  },
                }}
              >
                <FacebookIcon sx={{ fontSize: 20 }} />
                Facebook
              </MuiLink>
            )}
          </Stack>
        </Stack>
      </Stack>

      {/* Divider */}
      <Box sx={bottomAccentBar()} />
    </Stack>
  );
}
