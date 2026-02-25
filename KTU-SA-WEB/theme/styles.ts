import type { SxProps, Theme } from '@mui/material';
import colors from './colors';

/**
 * Reusable sx style fragments for the KTU SA website.
 * Import and spread into sx props to reduce duplication.
 */

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
