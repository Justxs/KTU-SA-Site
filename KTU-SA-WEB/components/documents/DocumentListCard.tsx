import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Box, Card, type SxProps, type Theme } from '@mui/material';
import colors from '@theme/colors';
import { focusOutline } from '@theme/styles';
import type { ReactNode } from 'react';

type Props = {
  icon: ReactNode;
  children: ReactNode;
  onClick: () => void;
  /** Extra sx to merge onto the Card */
  sx?: SxProps<Theme>;
};

const CARD_CLASS_PREFIX = 'dlc';

export default function DocumentListCard({ icon, children, onClick, sx }: Readonly<Props>) {
  return (
    <Card
      variant="outlined"
      role="button"
      tabIndex={0}
      onKeyDown={(e: React.KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: { xs: 1.5, sm: 2 },
        px: { xs: 2, sm: 3 },
        py: 2,
        cursor: 'pointer',
        borderRadius: '12px',
        border: `1px solid ${colors.lightBlueAccent}40`,
        transition: 'all 0.2s ease',
        '&:hover': {
          borderColor: colors.accentBlue,
          boxShadow: `0 4px 16px ${colors.mediumBlue}14`,
          bgcolor: colors.lightBlueBg,
          [`& .${CARD_CLASS_PREFIX}-arrow`]: {
            opacity: 1,
            transform: 'translateX(0)',
            color: colors.accentBlue,
          },
          [`& .${CARD_CLASS_PREFIX}-icon`]: {
            background: `linear-gradient(135deg, ${colors.mediumBlue}, ${colors.accentBlue})`,
          },
          [`& .${CARD_CLASS_PREFIX}-icon svg`]: {
            color: colors.white,
          },
        },
        ...focusOutline,
        ...(sx as Record<string, unknown>),
      }}
      onClick={onClick}
    >
      <Box
        className={`${CARD_CLASS_PREFIX}-icon`}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 48,
          height: 48,
          minWidth: 48,
          borderRadius: '10px',
          background: colors.lightBlueBg,
          transition: 'background 0.2s ease',
        }}
      >
        {icon}
      </Box>

      <Box sx={{ flex: 1, minWidth: 0 }}>{children}</Box>

      <ArrowForwardIosIcon
        className={`${CARD_CLASS_PREFIX}-arrow`}
        sx={{
          fontSize: 16,
          color: colors.arrowGray,
          opacity: 0,
          transform: 'translateX(-4px)',
          transition: 'all 0.2s ease',
          flexShrink: 0,
        }}
      />
    </Card>
  );
}
