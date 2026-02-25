'use client';

import { ArrowLeft, ArrowRight } from '@mui/icons-material';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import colors from '@theme/colors';

type Props = {
  direction: 'prev' | 'next';
  className?: string;
  style?: React.CSSProperties;
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
};

export default function CarouselArrow(props: Readonly<Props>) {
  const { direction, className, style, onClick } = props;

  if (className?.includes('slick-disabled')) {
    return null;
  }

  const isPrev = direction === 'prev';
  const Icon = isPrev ? ArrowLeft : ArrowRight;
  const positionSx = isPrev ? { left: '-100px' } : { right: '-100px' };

  return (
    <div className={className} style={style} onClick={onClick}>
      <Box display="flex" alignItems="center" justifyContent="center">
        <IconButton
          aria-label={isPrev ? 'previous' : 'next'}
          sx={{
            position: 'absolute',
            top: '-50px',
            ...positionSx,
            color: colors.navDarkBlue,
            bgcolor: 'transparent',
            '&:hover': { color: colors.lightBlueAccent },
          }}
        >
          <Icon sx={{ fontSize: 100 }} />
        </IconButton>
      </Box>
    </div>
  );
}
