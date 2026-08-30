'use client';

import { useCallback, useRef, useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MailOutlineIcon from '@mui/icons-material/MailOutlineOutlined';
import { ContactDto } from '@api/GetContacts';
import FSA_DATA from '@constants/FsaUnits';
import Image from 'next/image';
import placeholder from '@public/assets/placeholders/avatar-placeholder.png';
import { Box, Stack, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';
import colors from '@theme/colors';
import { focusOutlineInline, iconBox } from '@theme/styles';

const LINE_CLAMP = 3;
const INITIAL_TEXT_METRICS = {
  collapsedHeight: 0,
  fullHeight: 0,
  isClamped: false,
};
const DEFAULT_PALETTE = {
  chipBackground: colors.mediumBlue,
  chipText: colors.white,
  nameColor: colors.primaryDark,
  secondaryText: colors.grayContact,
  actionColor: colors.mediumBlue,
  actionHoverColor: colors.linkBlue,
  iconBackground: `${colors.mediumBlue}14`,
  borderColor: 'rgba(14,38,67,0.06)',
};

function getContactCardPalette(
  fsaName: string | undefined,
  translate: ReturnType<typeof useTranslations>,
) {
  if (!fsaName) return DEFAULT_PALETTE;

  const normalizedFsaName = decodeURIComponent(fsaName).replaceAll('_', ' ').trim().toLowerCase();
  const fsa = FSA_DATA(translate).find((item) => item.name.toLowerCase() === normalizedFsaName);

  if (!fsa) return DEFAULT_PALETTE;

  return {
    chipBackground: fsa.borderColor,
    chipText: colors.white,
    nameColor: fsa.textColor,
    secondaryText: fsa.textColor,
    actionColor: fsa.borderColor,
    actionHoverColor: fsa.mainColor,
    iconBackground: `${fsa.borderColor}14`,
    borderColor: `${fsa.borderColor}40`,
  };
}

export default function ContactCard({
  contact,
  small = false,
  fsaName,
}: Readonly<{ contact: ContactDto; small?: boolean; fsaName?: string }>) {
  const t = useTranslations();
  const [expanded, setExpanded] = useState(false);
  const [textMetrics, setTextMetrics] = useState(INITIAL_TEXT_METRICS);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);

  const setTextElement = useCallback((element: HTMLParagraphElement | null) => {
    resizeObserverRef.current?.disconnect();
    resizeObserverRef.current = null;

    if (!element) return;

    const measure = () => {
      const lineHeight = Number.parseFloat(getComputedStyle(element).lineHeight) || 20;
      const collapsedHeight = Math.ceil(lineHeight * LINE_CLAMP);
      const fullHeight = element.scrollHeight;
      const isClamped = fullHeight > collapsedHeight + 1;

      setTextMetrics((current) => {
        if (
          current.collapsedHeight === collapsedHeight &&
          current.fullHeight === fullHeight &&
          current.isClamped === isClamped
        ) {
          return current;
        }

        return { collapsedHeight, fullHeight, isClamped };
      });
    };

    measure();

    if (typeof ResizeObserver === 'undefined') return;

    const observer = new ResizeObserver(measure);
    observer.observe(element);
    resizeObserverRef.current = observer;
  }, []);

  const { collapsedHeight, fullHeight, isClamped } = textMetrics;
  const imageSrc = contact.imageSrc || placeholder.src;
  const palette = getContactCardPalette(fsaName, t);

  return (
    <Stack
      sx={{
        bgcolor: colors.white,
        borderRadius: '14px',
        overflow: 'hidden',
        boxShadow: '0 1px 6px rgba(14,38,67,0.06), 0 4px 20px rgba(14,38,67,0.06)',
        border: `1px solid ${palette.borderColor}`,
        transition: 'box-shadow 0.25s ease, transform 0.25s ease',
        '&:hover': {
          boxShadow: '0 8px 32px rgba(14,38,67,0.13)',
          transform: 'translateY(-2px)',
        },
        width: '100%',
        maxWidth: small ? 280 : 360,
        height: '100%',
      }}
    >
      {/* Photo */}
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          aspectRatio: small ? '1 / 1' : '4 / 4.2',
          overflow: 'hidden',
          bgcolor: '#E8EFF6',
        }}
      >
        <Image
          src={imageSrc}
          alt={contact.name}
          placeholder="blur"
          blurDataURL={placeholder.src}
          fill
          sizes={small ? '280px' : '360px'}
          style={{ objectFit: 'cover', objectPosition: 'top center' }}
        />
        {/* Gradient fade at bottom for smooth transition */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '40px',
            background: 'linear-gradient(to top, rgba(255,255,255,0.5), transparent)',
            pointerEvents: 'none',
          }}
        />
      </Box>

      {/* Info */}
      <Stack
        sx={{
          p: small ? '14px 16px 16px' : '16px 22px 22px',
          gap: '8px',
          flex: 1,
          justifyContent: 'space-between',
        }}
      >
        <Stack sx={{ gap: '8px' }}>
          {/* Position chip */}
          <Typography
            sx={{
              fontSize: small ? 11 : 12,
              fontWeight: 700,
              color: palette.chipText,
              bgcolor: palette.chipBackground,
              px: '10px',
              py: '4px',
              borderRadius: '6px',
              alignSelf: 'flex-start',
              lineHeight: 1.4,
              letterSpacing: '0.2px',
              textTransform: 'uppercase',
            }}
          >
            {contact.position}
          </Typography>

          {/* Name */}
          <Typography
            component="h3"
            sx={{
              fontFamily: 'PFDinTextPro-Medium',
              fontSize: small ? 18 : 21,
              color: palette.nameColor,
              lineHeight: 1.2,
              m: 0,
              mt: '2px',
            }}
          >
            {contact.name}
          </Typography>

          {/* Responsibilities */}
          {contact.responsibilities && (
            <Box>
              <Box
                sx={{
                  maxHeight: expanded ? fullHeight || 'none' : collapsedHeight || 'none',
                  overflow: 'hidden',
                  transition: 'max-height 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
              >
                <Typography
                  key={contact.responsibilities}
                  ref={setTextElement}
                  sx={{
                    fontSize: small ? 13 : 14,
                    color: palette.secondaryText,
                    lineHeight: 1.55,
                  }}
                >
                  {contact.responsibilities}
                </Typography>
              </Box>
              {isClamped && (
                <Box
                  component="button"
                  type="button"
                  onClick={() => setExpanded((value) => !value)}
                  sx={{
                    background: 'none',
                    border: 'none',
                    p: 0,
                    mt: '4px',
                    fontSize: 13,
                    fontWeight: 600,
                    color: palette.actionColor,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    '&:hover': { color: palette.actionHoverColor },
                  }}
                >
                  <ExpandMoreIcon
                    sx={{
                      transition: 'transform 0.3s ease',
                      transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
                      fontSize: 18,
                    }}
                  />
                  {expanded ? t('common.showLess') : t('common.showMore')}
                </Box>
              )}
            </Box>
          )}
        </Stack>

        {/* Email */}
        <Stack
          direction="row"
          sx={{
            alignItems: 'center',
            gap: '8px',
            mt: '6px',
            pt: '12px',
            borderTop: `1px solid rgba(14,38,67,0.08)`,
          }}
        >
          <Box sx={iconBox(28, palette.iconBackground, '8px')}>
            <MailOutlineIcon
              sx={{ width: 15, height: 15, color: palette.actionColor }}
              aria-hidden="true"
            />
          </Box>
          <Box
            component="a"
            href={`mailto:${contact.email}`}
            sx={{
              fontSize: small ? 13 : 14,
              color: palette.actionColor,
              textDecoration: 'none',
              fontWeight: 500,
              '&:hover': { textDecoration: 'underline', color: palette.actionHoverColor },
              ...focusOutlineInline,
            }}
          >
            {contact.email}
          </Box>
        </Stack>
      </Stack>
    </Stack>
  );
}
