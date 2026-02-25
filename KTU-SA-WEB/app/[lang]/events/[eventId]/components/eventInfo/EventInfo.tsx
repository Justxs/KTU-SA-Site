import React from 'react';
import { Box, Tooltip } from '@mui/material';
import dateService from '@utils/dateService';
import Image from 'next/image';
import FacebookIcon from '@public/icons/social/icon-facebook.svg';
import SA_UNITS_LOGO from '@constants/SaUnitsLogos';
import { getTranslations } from 'next-intl/server';
import colors from '@theme/colors';

type Props = {
  facebookUrl: string;
  organizers: Array<string>;
  startDate: Date;
  endDate: Date;
  address?: string;
};

export default async function EventInfo(props: Readonly<Props>) {
  const { facebookUrl, organizers, startDate, endDate, address } = props;

  const t = await getTranslations();

  const matchedLogos = SA_UNITS_LOGO.filter((saUnit) =>
    organizers.some(
      (org: string) => saUnit.name.replaceAll(/\s+/g, '_').toLowerCase() === org.toLowerCase(),
    ),
  );

  const detailsSx = {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  };

  const titleSx = {
    fontSize: 22,
    color: colors.primaryDark,
  };

  return (
    <Box
      sx={{
        display: 'flex',
        gap: '20px',
        color: colors.darkBlueSecondary,
        justifyContent: 'space-around',
        alignItems: 'flex-start',
        mb: '20px',
        '@media (max-width: 1200px)': {
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          gap: '50px',
          '@media (max-width: 700px)': {
            flexDirection: 'column',
            alignItems: 'center',
          },
        }}
      >
        <Box sx={detailsSx}>
          <Box component="h3" sx={titleSx}>
            {t('event.organisers')}
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
            {matchedLogos.map((unit) => (
              <Image
                key={unit.name}
                src={unit.logo}
                alt={unit.name}
                sizes="100%"
                width={0}
                height={0}
                style={{ height: 105, width: 'auto' }}
              />
            ))}
          </Box>
        </Box>
        {address && (
          <Box sx={detailsSx}>
            <Box component="h3" sx={titleSx}>
              {t('event.address')}
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>{address}</Box>
          </Box>
        )}
        <Box sx={detailsSx}>
          <Box component="h3" sx={titleSx}>
            {t('event.facebookEventSocial')}
          </Box>
          <Tooltip title={t('event.facebookEvent')}>
            <Box
              component="a"
              href={facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              sx={{ display: 'flex', justifyContent: 'center' }}
            >
              <Image src={FacebookIcon} alt="Facebook event" sizes="100%" width={0} height={0} />
            </Box>
          </Tooltip>
        </Box>
        <Box sx={detailsSx}>
          <Box component="h3" sx={titleSx}>
            {t('event.startsAt')}
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            {dateService.formatToDateAndTime(startDate)}
          </Box>
        </Box>
        <Box sx={detailsSx}>
          <Box component="h3" sx={titleSx}>
            {t('event.endsAt')}
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            {dateService.formatToDateAndTime(endDate)}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
