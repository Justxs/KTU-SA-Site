'use client';

import { ArrowLeft, ArrowRight } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import colors from '@theme/colors';

type Props = {
  direction: 'prev' | 'next';
  className?: string;
  style?: React.CSSProperties;
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
};

export default function CarouselArrow(props: Readonly<Props>) {
  const { direction, className, onClick } = props;

  if (className?.includes('slick-disabled')) {
    return null;
  }

  const isPrev = direction === 'prev';
  const Icon = isPrev ? ArrowLeft : ArrowRight;

  return (
    <IconButton
      aria-label={isPrev ? 'previous' : 'next'}
      onClick={onClick as unknown as React.MouseEventHandler<HTMLButtonElement>}
      sx={{
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 10,
        ...(isPrev ? { left: { xs: -28, sm: -36, md: -44 } } : { right: { xs: -28, sm: -36, md: -44 } }),
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
      <Icon sx={{ fontSize: 50 }} />
    </IconButton>
  );
}
