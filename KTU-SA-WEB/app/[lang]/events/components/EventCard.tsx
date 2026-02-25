import Image from 'next/image';
import { Box, Chip } from '@mui/material';
import { getTranslations } from 'next-intl/server';
import dateService from '@utils/dateService';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { EventPreviewDto } from '@api/GetEvents';
import colors from '@theme/colors';
import { lineClamp, focusOutline } from '@theme/styles';
import Link from 'next/link';

type Props = {
  event: EventPreviewDto;
  isActive: boolean;
};

export default async function EventCard(props: Readonly<Props>) {
  const { event, isActive } = props;

  const t = await getTranslations();
  const isPassed = dateService.isEventPassed(event.startDate);

  return (
    <Link href={`/events/${event.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          color: colors.nearBlackText,
          borderRadius: '12px',
          overflow: 'hidden',
          bgcolor: isActive ? colors.activeYellow : colors.white,
          boxShadow: isActive ? 4 : 1,
          transition: 'transform 0.25s ease, box-shadow 0.25s ease',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: isActive ? 6 : 3,
          },
          ...focusOutline,
        }}
      >
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            aspectRatio: '16 / 9',
            overflow: 'hidden',
          }}
        >
          {isPassed && (
            <Chip
              label={t('event.passed')}
              size="small"
              sx={{
                position: 'absolute',
                top: 8,
                left: 8,
                zIndex: 10,
                bgcolor: colors.navDarkBlue,
                color: colors.white,
                fontWeight: 600,
                letterSpacing: '1px',
                fontFamily: 'PFDinTextPro-Regular',
              }}
            />
          )}
          <Image
            src={event.coverImageUrl}
            alt={event.title}
            fill
            sizes={isActive ? '(max-width: 700px) 90vw, 50vw' : '(max-width: 700px) 90vw, 33vw'}
            style={{
              objectFit: 'cover',
              objectPosition: 'top',
            }}
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            p: '16px 20px 20px',
          }}
        >
          <Box
            component="h3"
            sx={{
              fontWeight: 600,
              m: 0,
              mb: '6px',
              fontSize: isActive ? 24 : 18,
              ...lineClamp(2),
            }}
          >
            {event.title}
          </Box>
          <Box
            component="time"
            sx={{
              fontSize: 14,
              color: isActive ? colors.activeDateAmber : colors.grayText,
              mb: '10px',
            }}
          >
            {dateService.formatToDateAndTime(event.startDate)}
          </Box>
          <Box
            sx={{
              mt: 'auto',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              color: colors.primaryDark,
              fontFamily: 'PFDinTextPro-Medium',
              fontWeight: 600,
              fontSize: 16,
              letterSpacing: '1px',
            }}
          >
            {t('button.readMore')}
            <ArrowForwardIcon sx={{ fontSize: 28 }} aria-hidden="true" />
          </Box>
        </Box>
      </Box>
    </Link>
  );
}
