'use client';

import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { EventPreviewDto } from '@api/GetEvents';
import dateService from '@utils/dateService';
import colors from '@theme/colors';

export default function EventCard({ event }: Readonly<{ event: EventPreviewDto }>) {
  const router = useRouter();
  const [isPassed, setIsPassed] = useState(false);
  const t = useTranslations();

  useEffect(() => {
    const passed = dateService.isEventPassed(event.startDate);
    const handle = setTimeout(() => setIsPassed(passed), 0);
    return () => clearTimeout(handle);
  }, [event.startDate]);

  return (
    <Box px={1} display="flex" justifyContent="center" alignItems="center">
      <ButtonBase
        onClick={() => router.push(`/events/${event.id}`)}
        type="button"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
          width: '100%',
          maxWidth: 468,
          textAlign: 'left',
          borderRadius: '12px',
          overflow: 'hidden',
          bgcolor: colors.white,
          boxShadow: 1,
          transition: 'transform 0.25s ease, box-shadow 0.25s ease',
          cursor: 'pointer',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: 3,
          },
          '&:focus-visible': {
            outline: `2px solid ${colors.focusBlue}`,
            borderRadius: '12px',
          },
          '@media (max-width:500px)': {
            maxWidth: '85vw',
          },
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
            sizes="(max-width: 500px) 85vw, 468px"
            style={{ objectFit: 'cover', objectPosition: 'top' }}
          />
        </Box>
        <Box sx={{ p: '14px 18px 18px' }}>
          <Typography
            sx={{
              fontWeight: 700,
              letterSpacing: '0.5px',
              fontFamily: 'PFDinTextPro-Regular',
              fontSize: 20,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {event.title}
          </Typography>
          <Typography
            sx={{
              color: colors.grayText,
              mt: 0.5,
              fontSize: 14,
              letterSpacing: '0.5px',
              fontFamily: 'PFDinTextPro-Regular',
            }}
          >
            {dateService.formatToDateAndTime(event.startDate)}
          </Typography>
        </Box>
      </ButtonBase>
    </Box>
  );
}
