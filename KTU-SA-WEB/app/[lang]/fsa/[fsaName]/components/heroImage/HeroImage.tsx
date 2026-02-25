import FSA_DATA from '@constants/FsaUnits';
import { Box } from '@mui/material';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import colors from '@theme/colors';
import GoBackButton from '@components/goBackButton/GoBackButton';

type Props = {
  fsaName: string;
  coverUrl: string;
};

export default async function HeroImage(props: Readonly<Props>) {
  const { fsaName, coverUrl } = props;

  const t = await getTranslations();
  const fsa = FSA_DATA(t).find((f) => f.name === fsaName.replace('%20', ' '));

  if (fsa === undefined) {
    return;
  }

  const fsaStyles = {
    backgroundColor: fsa.backgroundColor,
    color: fsa.textColor,
    borderColor: fsa.borderColor,
  };

  return (
    <>
      <Box sx={{ display: 'flex', ...fsaStyles }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '26px',
            width: '100vw',
            '@media (max-width: 1000px)': {
              flexDirection: 'column',
              gap: 0,
              justifyContent: 'flex-start',
            },
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              '@media (max-width: 1000px)': {
                mt: '35px',
              },
            }}
          >
            <GoBackButton color={fsa.textColor} onHover={fsa.backgroundColor} />
            <Image
              alt={fsa.fullName}
              src={fsa.logo}
              sizes="100%"
              width={0}
              height={0}
              style={{ height: 'auto', width: 90, objectFit: 'contain' }}
            />
          </Box>
          <Box
            sx={{
              mt: '25px',
              fontSize: 20,
              '@media (max-width: 1000px)': { maxWidth: '80vw', textAlign: 'center' },
            }}
          >
            <h1>{fsa.name}</h1>
            <p>{fsa.fullName}</p>
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
              src={coverUrl}
              alt="Hero Image"
              sizes="100%"
              width={0}
              height={0}
              style={{
                width: 'auto',
                height: '40vh',
                border: `8px solid ${fsa.borderColor}`,
                borderRadius: 10,
                background: fsa.borderColor,
                padding: 1,
                objectFit: 'contain',
              }}
            />
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          position: 'relative',
          bgcolor: colors.white,
          borderTop: `5px solid ${fsa.borderColor}`,
          height: '5vh',
          width: '100%',
          zIndex: 2,
        }}
      />
    </>
  );
}
