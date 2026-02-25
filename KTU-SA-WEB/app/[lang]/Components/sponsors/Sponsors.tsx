import { Box, Tooltip } from '@mui/material';
import SectionName from '@components/sectionName/SectionName';
import Image from 'next/image';
import { getSponsors } from '@api/GetSponsors';
import { getTranslations } from 'next-intl/server';
import { focusOutline } from '@theme/styles';
import colors from '@theme/colors';

export default async function Sponsors() {
  const t = await getTranslations();
  const sponsors = await getSponsors();

  if (sponsors.length === 0) return null;

  return (
    <>
      <SectionName title={t('sections.sponsors')} />
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '24px',
          justifyContent: 'center',
          width: '100%',
        }}
      >
        {sponsors.map((sponsor) => (
          <Box
            component="a"
            href={sponsor.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${sponsor.name} (opens in new tab)`}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: colors.white,
              borderRadius: '12px',
              p: '16px 24px',
              boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
              transition: 'transform 0.25s ease, box-shadow 0.25s ease',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 6px 20px rgba(0,0,0,0.1)',
              },
              ...focusOutline,
            }}
            key={sponsor.id}
          >
            <Tooltip title={sponsor.name}>
              <div style={{ position: 'relative', width: '180px', height: '90px' }}>
                <Image
                  src={sponsor.logoId}
                  alt={sponsor.name}
                  fill
                  sizes="180px"
                  style={{
                    objectFit: 'contain',
                  }}
                />
              </div>
            </Tooltip>
          </Box>
        ))}
      </Box>
    </>
  );
}
