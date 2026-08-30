import { Box, Chip, Stack, Typography } from '@mui/material';
import { getTranslations } from 'next-intl/server';
import colors from '@theme/colors';
import { bottomAccentBar } from '@theme/styles';
import SA_UNITS_LOGO from '@constants/SaUnitsLogos';
import HeroActionButtons from './HeroActionButtons';
import HeroArtwork from './HeroArtwork';
import HeroEventDetails from './HeroEventDetails';

const NOW = Date.now();

type Props = {
  img: string;
  title: string;
  ticketUrl?: string;
  endDate: string;
  startDate: string;
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
        <HeroArtwork img={img} title={title} />

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

          <HeroEventDetails
            address={address}
            endDate={endDate}
            organisersLabel={t('event.organisers')}
            startDate={startDate}
            matchedLogos={matchedLogos}
          />

          <HeroActionButtons
            buyTicketsLabel={t('event.buyTickets')}
            facebookUrl={facebookUrl}
            hasEnded={hasEnded}
            ticketUrl={ticketUrl}
          />
        </Stack>
      </Stack>

      <Box sx={bottomAccentBar()} />
    </Stack>
  );
}
