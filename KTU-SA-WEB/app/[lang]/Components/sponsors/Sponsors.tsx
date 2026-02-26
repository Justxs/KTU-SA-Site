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
    <Box>
      <SectionName title={t('sections.sponsors')} />
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: 'repeat(2, 1fr)',
            sm: 'repeat(3, 1fr)',
            md: `repeat(${Math.min(sponsors.length, 4)}, 1fr)`,
            lg: `repeat(${Math.min(sponsors.length, 5)}, 1fr)`,
          },
          gap: { xs: '16px', sm: '24px', md: '32px' },
          justifyItems: 'center',
          alignItems: 'center',
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
              width: '100%',
              maxWidth: 220,
              bgcolor: colors.white,
              borderRadius: '16px',
              p: { xs: '16px', sm: '20px 28px' },
              border: `1px solid ${colors.lightBlueBg}`,
              boxShadow: '0 2px 8px rgba(14, 38, 67, 0.04)',
              transition:
                'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.3s ease, border-color 0.3s ease',
              textDecoration: 'none',
              '& img': {
                filter: 'grayscale(40%) opacity(0.85)',
                transition: 'filter 0.3s ease',
              },
              '&:hover': {
                transform: 'translateY(-6px) scale(1.02)',
                boxShadow: `0 12px 32px rgba(14, 38, 67, 0.1)`,
                borderColor: colors.lightBlueAccent,
                '& img': {
                  filter: 'grayscale(0%) opacity(1)',
                },
              },
              ...focusOutline,
            }}
            key={sponsor.id}
          >
            <Tooltip title={sponsor.name} arrow>
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  maxWidth: '160px',
                  height: '80px',
                }}
              >
                <Image
                  src={sponsor.logoId}
                  alt={sponsor.name}
                  fill
                  sizes="(max-width: 600px) 140px, 160px"
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
