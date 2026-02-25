import { Box, Tooltip } from '@mui/material';
import SectionName from '@components/sectionName/SectionName';
import Image from 'next/image';
import { getSponsors } from '@api/GetSponsors';
import { getTranslations } from 'next-intl/server';
import { focusOutline } from '@theme/styles';

export default async function Sponsors() {
  const t = await getTranslations();
  const sponsors = await getSponsors();

  if (sponsors.length === 0) return null;

  return (
    <Box sx={{ mb: '44px' }}>
      <SectionName title={t('sections.sponsors')} />
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '20px', width: '100%' }}>
        {sponsors.map((sponsor) => (
          <Box
            component="a"
            href={sponsor.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${sponsor.name} (opens in new tab)`}
            sx={{
              transition: '0.3s',
              '&:hover': {
                transform: 'scale(1.1)',
              },
              ...focusOutline,
            }}
            key={sponsor.id}
          >
            <Tooltip title={sponsor.name}>
              <div style={{ position: 'relative', width: '200px', height: '100px' }}>
                <Image
                  src={sponsor.logoId}
                  alt={sponsor.name}
                  fill
                  sizes="100%"
                  style={{
                    objectFit: 'contain',
                  }}
                />
              </div>
            </Tooltip>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
