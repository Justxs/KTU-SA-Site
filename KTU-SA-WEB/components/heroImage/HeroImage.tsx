import { Box } from '@mui/material';
import { getLocale, getTranslations } from 'next-intl/server';
import { getHeroImage } from '@api/GetHeroImage';
import Image from 'next/image';
import colors from '@theme/colors';

const BLUR_DATA_URL =
  'data:image/svg+xml;base64,' +
  Buffer.from(
    '<svg width="400" height="500" xmlns="http://www.w3.org/2000/svg"><rect width="400" height="500" fill="#F1F7FE"/></svg>'
  ).toString('base64');

export default async function HeroImage({ sectionName }: Readonly<{ sectionName: string }>) {
  const t = await getTranslations();
  const locale = await getLocale();
  const heroSection = await getHeroImage(locale, sectionName);

  return (
    <>
      <Box
        sx={{
          height: '40vh',
          display: 'flex',
          bgcolor: colors.lightBlueBg,
          '@media (max-width: 800px)': {
            height: 'auto',
          },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '30px',
            margin: 'auto',
            '@media (max-width: 800px)': {
              flexDirection: 'column',
              gap: 0,
              mb: 0,
              justifyContent: 'flex-start',
            },
          }}
        >
          <Box
            sx={{
              color: colors.primaryDark,
              maxWidth: '50vw',
              ml: '10px',
              '@media (max-width: 800px)': {
                maxWidth: '90vw',
                textAlign: 'center',
              },
            }}
          >
            <h1>
              {t('pages.socialHelp').toLowerCase() === heroSection.title.toLowerCase()
                ? t('navbar.needHelp.EmotionalHelp')
                : heroSection.title}
            </h1>
            <Box
              component="p"
              sx={{ color: colors.mediumBlue, fontSize: 20, letterSpacing: '1.2px' }}
            >
              {heroSection.description}
            </Box>
          </Box>
          <Box
            sx={{
              position: 'relative',
              transform: 'rotate(1.5deg)',
              bottom: '-35px',
              zIndex: 0,
              width: 'auto',
            }}
          >
            <Image
              src={heroSection.imgSrc}
              alt="Hero Image"
              width={400}
              height={500}
              sizes="(max-width: 800px) 80vw, 400px"
              priority
              placeholder="blur"
              blurDataURL={BLUR_DATA_URL}
              style={{
                width: 'auto',
                height: '40vh',
                objectFit: 'contain',
                border: `8px solid ${colors.mediumBlue}`,
                borderRadius: 10,
                backgroundColor: colors.mediumBlue,
                padding: 1,
              }}
            />
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          position: 'relative',
          bgcolor: colors.white,
          width: '100%',
          borderTop: `5px solid ${colors.mediumBlue}`,
          height: 60,
          zIndex: 3,
        }}
      />
    </>
  );
}
