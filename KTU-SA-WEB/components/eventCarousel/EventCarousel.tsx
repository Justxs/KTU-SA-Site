'use client';

import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { ArrowLeft, ArrowRight } from '@mui/icons-material';
import { EventPreviewDto } from '@api/GetEvents';
import EventCard from './EventCard';
import colors from '@theme/colors';
import useEmblaSnapshot from '@/lib/hooks/useEmblaSnapshot';

type Props = {
  events: Array<EventPreviewDto>;
};

export default function EventCarousel({ events }: Readonly<Props>) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      align: 'start',
      slidesToScroll: 1,
      containScroll: 'trimSnaps',
      loop: false,
    },
    [Autoplay({ delay: 5000, stopOnInteraction: true })],
  );

  const { canScrollPrev, canScrollNext, selectedIndex, scrollSnaps } = useEmblaSnapshot(emblaApi);

  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();
  const scrollTo = (index: number) => emblaApi?.scrollTo(index);

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: 1500,
        mx: 'auto',
        px: { xs: 2, sm: 4, md: 6 },
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {canScrollPrev && (
        <IconButton
          aria-label="previous"
          onClick={scrollPrev}
          sx={{
            display: { xs: 'none', md: 'flex' },
            position: 'absolute',
            top: '35%',
            left: { md: 4, lg: 0 },
            transform: 'translateY(-50%)',
            zIndex: 10,
            color: colors.navDarkBlue,
            bgcolor: colors.white,
            boxShadow: 2,
            width: 44,
            height: 44,
            '&:hover': {
              bgcolor: colors.lightBlueBg,
              color: colors.accentBlue,
            },
          }}
        >
          <ArrowLeft sx={{ fontSize: 28 }} />
        </IconButton>
      )}

      {canScrollNext && (
        <IconButton
          aria-label="next"
          onClick={scrollNext}
          sx={{
            display: { xs: 'none', md: 'flex' },
            position: 'absolute',
            top: '35%',
            right: { md: 4, lg: 0 },
            transform: 'translateY(-50%)',
            zIndex: 10,
            color: colors.navDarkBlue,
            bgcolor: colors.white,
            boxShadow: 2,
            width: 44,
            height: 44,
            '&:hover': {
              bgcolor: colors.lightBlueBg,
              color: colors.accentBlue,
            },
          }}
        >
          <ArrowRight sx={{ fontSize: 28 }} />
        </IconButton>
      )}

      <Box ref={emblaRef} sx={{ overflow: 'hidden', mx: -1 }}>
        <Box sx={{ display: 'flex', gap: '16px', px: 1, py: '12px' }}>
          {events.map((event) => (
            <Box
              key={event.id}
              sx={{
                flex: '0 0 100%',
                minWidth: 0,
                '@media (min-width: 700px)': { flex: '0 0 calc(50% - 8px)' },
                '@media (min-width: 1200px)': { flex: '0 0 calc(33.333% - 11px)' },
              }}
            >
              <EventCard event={event} />
            </Box>
          ))}
        </Box>
      </Box>

      {scrollSnaps.length > 1 && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            gap: '8px',
            mt: '20px',
          }}
        >
          {scrollSnaps.map((snap, i) => (
            <Box
              key={snap}
              component="button"
              onClick={() => scrollTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              sx={{
                width: 10,
                height: 10,
                borderRadius: '50%',
                border: 'none',
                cursor: 'pointer',
                p: 0,
                bgcolor: i === selectedIndex ? colors.navDarkBlue : colors.arrowGray,
                transition: 'background-color 0.2s',
                '&:hover': {
                  bgcolor: colors.accentBlue,
                },
              }}
            />
          ))}
        </Box>
      )}
    </Box>
  );
}
