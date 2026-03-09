import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import FacebookIcon from '@mui/icons-material/Facebook';
import { Link as MuiLink, Stack } from '@mui/material';
import colors from '@theme/colors';

type Props = {
  buyTicketsLabel: string;
  facebookUrl: string;
  hasEnded: boolean;
  ticketUrl?: string;
};

export default function HeroActionButtons({
  buyTicketsLabel,
  facebookUrl,
  hasEnded,
  ticketUrl,
}: Readonly<Props>) {
  return (
    <Stack direction="row" sx={{ gap: '12px', flexWrap: 'wrap' }}>
      {ticketUrl !== undefined && !hasEnded && (
        <MuiLink
          href={ticketUrl}
          underline="none"
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            px: '20px',
            py: '10px',
            bgcolor: colors.mediumBlue,
            color: colors.white,
            borderRadius: '8px',
            fontSize: '15px',
            fontFamily: 'PFDinTextPro-Medium',
            letterSpacing: '0.5px',
            transition: 'background-color 0.2s ease, transform 0.2s ease',
            '&:hover': {
              bgcolor: colors.accentBlue,
              transform: 'translateY(-2px)',
            },
          }}
        >
          <LocalActivityIcon sx={{ fontSize: 20 }} />
          {buyTicketsLabel}
        </MuiLink>
      )}
      {facebookUrl && (
        <MuiLink
          href={facebookUrl}
          target="_blank"
          rel="noopener noreferrer"
          underline="none"
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            px: '20px',
            py: '10px',
            border: `1.5px solid ${colors.mediumBlue}`,
            color: colors.mediumBlue,
            borderRadius: '8px',
            fontSize: '15px',
            fontFamily: 'PFDinTextPro-Medium',
            letterSpacing: '0.5px',
            transition: 'all 0.2s ease',
            '&:hover': {
              bgcolor: colors.mediumBlue,
              color: colors.white,
              transform: 'translateY(-2px)',
            },
          }}
        >
          <FacebookIcon sx={{ fontSize: 20 }} />
          Facebook
        </MuiLink>
      )}
    </Stack>
  );
}
