import type { SxProps, Theme } from '@mui/material';
import colors from './colors';

/**
 * Reusable sx style fragments for the KTU SA website.
 * Import and spread into sx props to reduce duplication.
 */

/* ─── Blur placeholder ──────────────────────────────────── */

/** Base64-encoded SVG blur placeholder for hero images */
export const HERO_BLUR_PLACEHOLDER = `data:image/svg+xml;base64,${Buffer.from(
  '<svg width="400" height="500" xmlns="http://www.w3.org/2000/svg"><rect width="400" height="500" fill="#F1F7FE"/></svg>',
).toString('base64')}`;

/* ─── Focus outlines ────────────────────────────────────── */

/** Standard keyboard focus outline (blue) */
export const focusOutline: SxProps<Theme> = {
  '&:focus-visible': {
    outline: `2px solid ${colors.focusBlue}`,
    borderRadius: '4px',
  },
};

/** Focus outline with smaller border-radius (for inline links) */
export const focusOutlineInline: SxProps<Theme> = {
  '&:focus-visible': {
    outline: `2px solid ${colors.focusBlue}`,
    borderRadius: '2px',
  },
};

/** Focus outline with light-blue color (for dark backgrounds like footer) */
export const focusOutlineLight: SxProps<Theme> = {
  '&:focus-visible': {
    outline: `2px solid ${colors.lightBlueAccent}`,
    borderRadius: '2px',
  },
};

/** Focus style that also fills background (for primary buttons) */
export const focusFilled: SxProps<Theme> = {
  '&:focus-visible': {
    outline: `2px solid ${colors.focusBlue}`,
    backgroundColor: colors.focusBlue,
  },
};

/** Flex row centered */
export const centerFlex: SxProps<Theme> = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

/** Flex column centered */
export const centerColumnFlex: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
};

/** Standard link hover (blue) */
export const linkHoverBlue: SxProps<Theme> = {
  textDecoration: 'underline',
  color: 'inherit',
  transition: '0.3s',
  '&:hover': {
    color: colors.linkBlue,
  },
};

/** Card hover scale effect */
export const cardHover: SxProps<Theme> = {
  transition: '0.3s',
  '&:hover': {
    transform: 'scale(1.02)',
  },
};

/** Responsive breakpoints for list cards (articles/events) */
export const listCardBreakpoints: SxProps<Theme> = {
  '@media (max-width: 1500px)': { maxWidth: 400 },
  '@media (max-width: 1200px)': { maxWidth: 500 },
  '@media (max-width: 700px)': { maxWidth: '80vw' },
};

/** Text ellipsis with webkit line clamp */
export const lineClamp = (lines: number): SxProps<Theme> => ({
  display: '-webkit-box',
  WebkitLineClamp: lines,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});

/* ─── Bottom accent bar (hero divider) ──────────────────── */

/** Full-width 4px accent bar pinned to the bottom of a hero section (needs position: relative on parent) */
export const bottomAccentBar = (color: string = colors.mediumBlue): SxProps<Theme> => ({
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  height: '4px',
  bgcolor: color,
});

/* ─── Icon box (centered icon container) ────────────────── */

/** Rounded square container for an icon — used in contact rows, event detail cards, etc. */
export const iconBox = (
  size: number = 36,
  bgColor: string = `${colors.mediumBlue}18`,
  radius: string = '10px',
): SxProps<Theme> => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: size,
  height: size,
  borderRadius: radius,
  bgcolor: bgColor,
  flexShrink: 0,
});

/* ─── Social icon button ────────────────────────────────── */

/** Rounded square button for social media icons, with hover darkening */
export const socialIconBtn = (accentColor: string = colors.mediumBlue): SxProps<Theme> => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 36,
  height: 36,
  borderRadius: '10px',
  bgcolor: `${accentColor}18`,
  transition: 'background-color 0.2s ease',
  '&:hover': { bgcolor: `${accentColor}30` },
});

/* ─── Contact link ──────────────────────────────────────── */

/** Link style for contact rows (email, phone, address) with opacity hover */
export const contactLink = (textColor: string = colors.primaryDark): SxProps<Theme> => ({
  fontSize: 15,
  textDecoration: 'none',
  color: textColor,
  transition: 'opacity 0.2s ease',
  '&:hover': { opacity: 0.7 },
  '&:focus-visible': {
    outline: `2px solid ${colors.focusBlue}`,
    borderRadius: '2px',
  },
});

/* ─── Event passed chip ─────────────────────────────────── */

/** Overlay chip for passed events (positioned absolute on card image) */
export const eventPassedOverlayChip: SxProps<Theme> = {
  position: 'absolute',
  top: 8,
  left: 8,
  zIndex: 10,
  bgcolor: colors.navDarkBlue,
  color: colors.white,
  fontWeight: 600,
  letterSpacing: '1px',
  fontFamily: 'PFDinTextPro-Regular',
};

/* ─── 16:9 image container ──────────────────────────────── */

/** Relative container with 16/9 aspect ratio for card cover images */
export const imageContainer16x9: SxProps<Theme> = {
  position: 'relative',
  width: '100%',
  aspectRatio: '16 / 9',
  overflow: 'hidden',
};

/* ─── Card lift hover ───────────────────────────────────── */

/** Hover effect that lifts card upward with shadow increase */
export const cardLiftHover: SxProps<Theme> = {
  transition: 'transform 0.25s ease, box-shadow 0.25s ease',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: 3,
  },
};

/* ─── Metadata pill ─────────────────────────────────────── */

/** Small pill/badge for article metadata (date, reading time) */
export const metadataPill: SxProps<Theme> = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '6px',
  px: '12px',
  py: '6px',
  bgcolor: 'rgba(17,77,138,0.08)',
  borderRadius: '20px',
  color: colors.mediumBlue,
  fontSize: 14,
  fontFamily: 'PFDinTextPro-Medium',
};

/* ─── Inline card divider ───────────────────────────────── */

/** Thin horizontal rule for separating rows inside a card */
export const inlineCardDivider: SxProps<Theme> = {
  mx: '20px',
  height: '1px',
  bgcolor: 'rgba(14,38,67,0.07)',
};
