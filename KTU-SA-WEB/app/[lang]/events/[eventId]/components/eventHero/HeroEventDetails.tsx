import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PlaceIcon from '@mui/icons-material/Place';
import { Box, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import colors from '@theme/colors';
import { iconBox, inlineCardDivider } from '@theme/styles';
import dateService from '@utils/dateService';
import SA_UNITS_LOGO from '@constants/SaUnitsLogos';
import TooltipAnchor from '@components/tooltip/TooltipAnchor';

type Props = {
  address?: string;
  endDate: string;
  organisersLabel: string;
  startDate: string;
  matchedLogos: typeof SA_UNITS_LOGO;
};

export default function HeroEventDetails({
  address,
  endDate,
  organisersLabel,
  startDate,
  matchedLogos,
}: Readonly<Props>) {
  return (
    <Stack
      sx={{
        width: '100%',
        bgcolor: colors.white,
        borderRadius: '14px',
        boxShadow: '0 2px 12px rgba(14,38,67,0.06)',
        overflow: 'hidden',
      }}
    >
      <Stack
        direction="row"
        sx={{
          alignItems: 'center',
          gap: '14px',
          px: '20px',
          py: '16px',
        }}
      >
        <Box sx={iconBox(38, 'rgba(17,77,138,0.07)')}>
          <CalendarTodayIcon sx={{ fontSize: 18, color: colors.mediumBlue }} />
        </Box>
        <Typography sx={{ fontSize: 15, color: colors.primaryDark, lineHeight: 1.4 }}>
          {dateService.formatToDateAndTime(startDate)} - {dateService.formatToDateAndTime(endDate)}
        </Typography>
      </Stack>

      {address && (
        <>
          <Box sx={inlineCardDivider} />
          <Stack
            direction="row"
            sx={{
              alignItems: 'center',
              gap: '14px',
              px: '20px',
              py: '16px',
            }}
          >
            <Box sx={iconBox(38, 'rgba(17,77,138,0.07)')}>
              <PlaceIcon sx={{ fontSize: 20, color: colors.mediumBlue }} />
            </Box>
            <Typography sx={{ fontSize: 15, color: colors.primaryDark }}>{address}</Typography>
          </Stack>
        </>
      )}

      {matchedLogos.length > 0 && (
        <>
          <Box sx={inlineCardDivider} />
          <Stack
            direction="row"
            sx={{
              alignItems: 'center',
              gap: '14px',
              px: '20px',
              py: '16px',
            }}
          >
            <Typography
              sx={{
                fontSize: 12,
                fontFamily: 'PFDinTextPro-Medium',
                color: colors.grayText,
                textTransform: 'uppercase',
                letterSpacing: '1.2px',
                whiteSpace: 'nowrap',
              }}
            >
              {organisersLabel}
            </Typography>
            <Stack direction="row" sx={{ gap: '8px', flexWrap: 'wrap' }}>
              {matchedLogos.map((unit) => (
                <TooltipAnchor
                  key={unit.name}
                  title={unit.name}
                  sx={{ display: 'inline-flex', flexShrink: 0 }}
                >
                  <Image
                    src={unit.logo}
                    alt={unit.name}
                    width={36}
                    height={36}
                    sizes="36px"
                    style={{ height: 36, width: 'auto', objectFit: 'contain' }}
                  />
                </TooltipAnchor>
              ))}
            </Stack>
          </Stack>
        </>
      )}
    </Stack>
  );
}
