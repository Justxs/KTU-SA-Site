import { Box } from '@mui/material';
import Image from 'next/image';
import colors from '@theme/colors';

type Props = {
  img: string;
  title: string;
};

export default function HeroArtwork({ img, title }: Readonly<Props>) {
  return (
    <Box
      sx={{
        position: 'relative',
        width: { xs: '100%', sm: '80vw', lg: '50%' },
        maxWidth: 720,
        flexShrink: 0,
        zIndex: 1,
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 12,
          left: 12,
          right: -12,
          bottom: -12,
          borderRadius: '20px',
          border: `3px solid ${colors.lightBlueAccent}`,
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          top: { xs: -20, lg: -28 },
          right: { xs: -16, lg: -28 },
          width: { xs: 48, lg: 64 },
          height: { xs: 48, lg: 64 },
          zIndex: 0,
          pointerEvents: 'none',
          backgroundImage: `radial-gradient(${colors.lightBlueAccent} 2px, transparent 2px)`,
          backgroundSize: '10px 10px',
          opacity: 0.6,
        }}
      />
      <Box
        sx={{
          position: 'relative',
          aspectRatio: '16 / 9',
          borderRadius: '18px',
          overflow: 'hidden',
          boxShadow: '0 16px 48px rgba(14,38,67,0.18), 0 4px 12px rgba(14,38,67,0.08)',
          zIndex: 1,
        }}
      >
        <Image
          alt={title}
          src={img}
          fill
          sizes="(max-width: 1200px) 80vw, 50vw"
          priority
          style={{ objectFit: 'cover', objectPosition: 'top' }}
        />
      </Box>
    </Box>
  );
}
