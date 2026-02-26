'use client';

import { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { ArrowLeft, ArrowRight } from '@mui/icons-material';
import { EventPreviewDto } from '@api/GetEvents';
import EventCard from './EventCard';
import colors from '@theme/colors';

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

  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((i: number) => emblaApi?.scrollTo(i), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi, onSelect]);

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
