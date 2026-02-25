import Image from 'next/image';
import { Box } from '@mui/material';
import { getTranslations } from 'next-intl/server';
import dateService from '@utils/dateService';
import ReadMoreButton from '@components/readMoreButton/ReadMoreButton';
import { EventPreviewDto } from '@api/GetEvents';
import colors from '@theme/colors';
import { listCardBreakpoints } from '@theme/styles';

type Props = {
  event: EventPreviewDto;
  isActive: boolean;
};

export default async function EventCard(props: Readonly<Props>) {
  const { event, isActive } = props;

  const t = await getTranslations();

  const color = isActive ? colors.activeYellow : undefined;
  const dateColor = isActive ? colors.activeDateAmber : colors.grayText;

  const width = isActive ? '532' : '400';
  const height = isActive ? '270' : '200';

  const size = isActive ? '28' : '20';

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        color: colors.nearBlackText,
        borderRadius: 1,
        p: '20px',
        bgcolor: color,
        ...listCardBreakpoints,
      }}
    >
      <Image
        src={event.coverImageUrl}
        alt={event.title}
        width={width}
        height={height}
        sizes="100%"
        style={{
          objectFit: 'cover',
          borderRadius: 8,
          width: '100%',
          maxWidth: width,
          height: 'auto',
        }}
      />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          maxWidth: width,
          ...listCardBreakpoints,
        }}
      >
        <Box
          component="h3"
          sx={{ fontWeight: 600, mt: '10px', mb: '5px', width: '100%', fontSize: size }}
        >
          {event.title}
        </Box>
        <Box component="time" sx={{ fontSize: 15, mb: '10px', color: dateColor }}>
          {dateService.formatToDateAndTime(event.startDate)}
        </Box>
        <Box sx={{ pt: '10px', mt: 'auto' }}>
          <ReadMoreButton title={t('button.readMore')} path={`/events/${event.id}`} />
        </Box>
      </Box>
    </Box>
  );
}
