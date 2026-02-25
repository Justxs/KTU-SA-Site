import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import PlaceIcon from '@mui/icons-material/Place';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import FacebookIcon from '@mui/icons-material/Facebook';
import { Box, Chip, Stack, Tooltip, Typography, Link as MuiLink } from '@mui/material';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import colors from '@theme/colors';
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
        backgroundColor: colors.lightBlueBg,
        position: 'relative',
      }}
    >
      <Stack
        sx={{
          gap: { xs: '24px', lg: '48px' },
          justifyContent: 'center',
          alignItems: { xs: 'center', lg: 'stretch' },
          py: { xs: '32px', lg: '48px' },
          px: { xs: '20px', lg: '64px' },
          flexDirection: { xs: 'column', lg: 'row' },
        }}
      >
        <Box
          sx={{
            position: 'relative',
            width: { xs: '100%', sm: '80vw', lg: '50%' },
            maxWidth: 720,
            aspectRatio: '16 / 9',
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: '0 8px 30px rgba(14,38,67,0.12)',
            flexShrink: 0,
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

        <Stack
          sx={{
            flex: 1,
            maxWidth: { xs: '100%', lg: 520 },
            justifyContent: 'center',
            alignItems: { xs: 'center', lg: 'flex-start' },
            gap: '24px',
          }}
        >
          <Typography
            component="h1"
            sx={{
              color: colors.primaryDark,
              fontSize: { xs: '24px', sm: '30px', md: '36px' },
              lineHeight: 1.15,
              textAlign: { xs: 'center', lg: 'left' },
              fontFamily: 'PFDinTextPro-Medium',
              letterSpacing: '-0.3px',
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
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 38,
                  height: 38,
                  borderRadius: '10px',
                  bgcolor: 'rgba(17,77,138,0.07)',
                  flexShrink: 0,
                }}
              >
                <CalendarTodayIcon sx={{ fontSize: 18, color: colors.mediumBlue }} />
              </Box>
              <Typography sx={{ fontSize: 15, color: colors.primaryDark, lineHeight: 1.4 }}>
                {dateService.formatToDateAndTime(startDate)} –{' '}
                {dateService.formatToDateAndTime(endDate)}
              </Typography>
            </Stack>

            {address && (
              <>
                <Box sx={{ mx: '20px', height: '1px', bgcolor: 'rgba(14,38,67,0.07)' }} />
                <Stack
                  direction="row"
                  sx={{
                    alignItems: 'center',
                    gap: '14px',
                    px: '20px',
                    py: '16px',
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 38,
                      height: 38,
                      borderRadius: '10px',
                      bgcolor: 'rgba(17,77,138,0.07)',
                      flexShrink: 0,
                    }}
                  >
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
                <Box sx={{ mx: '20px', height: '1px', bgcolor: 'rgba(14,38,67,0.07)' }} />
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

          <Stack
            direction="row"
            sx={{ gap: '12px', flexWrap: 'wrap' }}
          >
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
      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '4px',
          bgcolor: colors.mediumBlue,
        }}
      />
    </Stack>
  );
}
