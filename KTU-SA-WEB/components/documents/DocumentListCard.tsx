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
        width: '100%',
        minWidth: 0,
        display: 'flex',
        alignItems: 'center',
        gap: { xs: 1, sm: 2 },
        px: { xs: 1.25, sm: 3 },
        py: { xs: 1.25, sm: 2 },
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
          width: { xs: 40, sm: 48 },
          height: { xs: 40, sm: 48 },
          minWidth: { xs: 40, sm: 48 },
          borderRadius: '10px',
          background: colors.lightBlueBg,
          transition: 'background 0.2s ease',
        }}
      >
        {icon}
      </Box>

      <Box
        sx={{
          flex: 1,
          minWidth: 0,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          gap: 0.25,
          '& .MuiTypography-root': {
            maxWidth: '100%',
            minWidth: 0,
          },
          '& > .MuiTypography-root:first-of-type': {
            display: '-webkit-box',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'normal',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: { xs: 2, sm: 1 },
            lineHeight: 1.35,
            wordBreak: 'break-word',
          },
        }}
      >
        {children}
      </Box>

      <ArrowForwardIosIcon
        className={`${CARD_CLASS_PREFIX}-arrow`}
        sx={{
          display: { xs: 'none', sm: 'block' },
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
