'use client';

import { Box, Tooltip, type Theme } from '@mui/material';
import type { SxProps } from '@mui/system';
import type { ElementType, ReactNode } from 'react';

type Props = {
  title: string;
  children: ReactNode;
  arrow?: boolean;
  component?: ElementType;
  sx?: SxProps<Theme>;
  href?: string;
  target?: string;
  rel?: string;
  'aria-label'?: string;
};

export default function TooltipAnchor({ title, children, arrow, ...boxProps }: Readonly<Props>) {
  return (
    <Tooltip title={title} arrow={arrow}>
      <Box {...boxProps}>{children}</Box>
    </Tooltip>
  );
}
