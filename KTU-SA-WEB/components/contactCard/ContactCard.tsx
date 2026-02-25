'use client';

import { useRef, useState, useEffect } from 'react';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { ContactDto } from '@api/GetContacts';
import Image from 'next/image';
import placeholder from '@public/assets/placeholders/avatar-placeholder.png';
import { Box, Stack, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';
import colors from '@theme/colors';
import { focusOutlineInline } from '@theme/styles';

const LINE_CLAMP = 3;

export default function ContactCard({
  contact,
  small = false,
}: Readonly<{ contact: ContactDto; small?: boolean }>) {
  const t = useTranslations();
  const [expanded, setExpanded] = useState(false);
  const [isClamped, setIsClamped] = useState(false);
  const [collapsedH, setCollapsedH] = useState(0);
  const [fullH, setFullH] = useState(0);
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = textRef.current;
    if (!el) return;
    // measure full height
    const full = el.scrollHeight;
    // compute clamped height from line-height * clamp lines
    const lineH = Number.parseFloat(getComputedStyle(el).lineHeight) || 20;
    const clamped = Math.ceil(lineH * LINE_CLAMP);
    setFullH(full);
    setCollapsedH(clamped);
    setIsClamped(full > clamped + 1);
  }, [contact.responsibilities]);

  return (
    <Stack
      sx={{
        bgcolor: colors.white,
        borderRadius: '14px',
        overflow: 'hidden',
        boxShadow: '0 1px 6px rgba(14,38,67,0.06), 0 4px 20px rgba(14,38,67,0.06)',
        border: `1px solid rgba(14,38,67,0.06)`,
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
          src={contact.imageSrc}
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
              color: colors.white,
              bgcolor: colors.mediumBlue,
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
              color: colors.primaryDark,
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
                  maxHeight: expanded ? fullH : (collapsedH || 'none'),
                  overflow: 'hidden',
                  transition: 'max-height 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
              >
                <Typography
                  ref={textRef}
                  sx={{
                    fontSize: small ? 13 : 14,
                    color: colors.grayContact,
                    lineHeight: 1.55,
                  }}
                >
                  {contact.responsibilities}
                </Typography>
              </Box>
              {isClamped && (
                <Box
                  component="button"
                  onClick={() => setExpanded((v) => !v)}
                  sx={{
                    background: 'none',
                    border: 'none',
                    p: 0,
                    mt: '4px',
                    fontSize: 13,
                    fontWeight: 600,
                    color: colors.mediumBlue,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    '&:hover': { color: colors.linkBlue },
                  }}
                >
                  <Box
                    component="span"
                    sx={{
                      display: 'inline-block',
                      transition: 'transform 0.3s ease',
                      transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
                      fontSize: 16,
                      lineHeight: 1,
                    }}
                  >
                    ▾
                  </Box>
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
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 28,
              height: 28,
              borderRadius: '8px',
              bgcolor: `${colors.mediumBlue}14`,
              flexShrink: 0,
            }}
          >
            <MailOutlineIcon
              sx={{ width: 15, height: 15, color: colors.mediumBlue }}
              aria-hidden="true"
            />
          </Box>
          <Box
            component="a"
            href={`mailto:${contact.email}`}
            sx={{
              fontSize: small ? 13 : 14,
              color: colors.mediumBlue,
              textDecoration: 'none',
              fontWeight: 500,
              '&:hover': { textDecoration: 'underline', color: colors.linkBlue },
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
