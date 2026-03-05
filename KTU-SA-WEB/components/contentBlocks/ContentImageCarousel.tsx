'use client';

import { ArrowLeft, ArrowRight } from '@mui/icons-material';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import colors from '@theme/colors';
import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';

type Props = {
  imageUrls: Array<string>;
  onImageClick?: (imageUrl: string, imageAlt: string) => void;
};

export default function ContentImageCarousel({ imageUrls, onImageClick }: Readonly<Props>) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    slidesToScroll: 1,
    containScroll: 'trimSnaps',
    loop: false,
  });

  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index: number) => emblaApi?.scrollTo(index), [emblaApi]);

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
        my: '20px',
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
          {imageUrls.map((imageUrl, index) => (
            <Box
              key={`${imageUrl}-${index}`}
              sx={{
                flex: '0 0 100%',
                minWidth: 0,
                '@media (min-width: 700px)': { flex: '0 0 calc(50% - 8px)' },
                '@media (min-width: 1200px)': { flex: '0 0 calc(33.333% - 11px)' },
              }}
            >
              <Box
                component="button"
                type="button"
                onClick={() => {
                  onImageClick?.(imageUrl, `Gallery image ${index + 1}`);
                }}
                sx={{
                  display: 'block',
                  width: '100%',
                  border: 0,
                  p: 0,
                  m: 0,
                  bgcolor: 'transparent',
                  cursor: onImageClick ? 'zoom-in' : 'default',
                  borderRadius: '12px',
                  overflow: 'hidden',
                }}
              >
                <Box
                  sx={{
                    position: 'relative',
                    width: '100%',
                    aspectRatio: '16 / 9',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    boxShadow: '0 2px 10px rgba(14, 38, 67, 0.06)',
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                    '&:hover': {
                      transform: onImageClick ? 'translateY(-1px)' : 'none',
                      boxShadow: onImageClick
                        ? '0 6px 18px rgba(14, 38, 67, 0.12)'
                        : '0 2px 10px rgba(14, 38, 67, 0.06)',
                    },
                  }}
                >
                  <Image
                    src={imageUrl}
                    alt={`Gallery image ${index + 1}`}
                    fill
                    sizes="(max-width: 699px) calc(100vw - 48px), (max-width: 1199px) 50vw, 33vw"
                    style={{ objectFit: 'cover' }}
                  />
                </Box>
              </Box>
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
            mt: '12px',
          }}
        >
          {scrollSnaps.map((snap, index) => (
            <Box
              key={snap}
              component="button"
              onClick={() => scrollTo(index)}
              aria-label={`Go to slide ${index + 1}`}
              sx={{
                width: 10,
                height: 10,
                borderRadius: '50%',
                border: 'none',
                cursor: 'pointer',
                p: 0,
                bgcolor: index === selectedIndex ? colors.navDarkBlue : colors.arrowGray,
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
