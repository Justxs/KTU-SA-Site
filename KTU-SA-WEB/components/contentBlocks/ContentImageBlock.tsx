import OpenInFullRoundedIcon from '@mui/icons-material/OpenInFullRounded';
import { Box } from '@mui/material';
import Image from 'next/image';

type Props = {
  imageAlt: string;
  imageUrl: string;
  onOpen: (imageUrl: string, imageAlt: string) => void;
};

export default function ContentImageBlock({ imageAlt, imageUrl, onOpen }: Readonly<Props>) {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        m: { xs: '20px 0', md: '24px 0' },
        width: '100%',
      }}
    >
      <Box
        component="button"
        type="button"
        aria-label={`Open ${imageAlt} preview`}
        onClick={() => onOpen(imageUrl, imageAlt)}
        sx={{
          position: 'relative',
          width: '100%',
          maxWidth: { xs: '100%', md: '920px' },
          border: '1px solid rgba(14, 38, 67, 0.08)',
          p: 0,
          m: 0,
          bgcolor: '#fff',
          borderRadius: { xs: '8px', md: '10px' },
          overflow: 'hidden',
          cursor: 'zoom-in',
          display: 'block',
          boxShadow: '0 8px 24px rgba(14, 38, 67, 0.08)',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
          touchAction: 'manipulation',
          '&:hover': {
            transform: 'translateY(-1px)',
            boxShadow: '0 14px 32px rgba(14, 38, 67, 0.14)',
          },
        }}
      >
        <Image
          src={imageUrl}
          alt={imageAlt}
          width={1400}
          height={900}
          sizes="(max-width: 768px) calc(100vw - 32px), 920px"
          style={{
            width: '100%',
            height: 'auto',
            display: 'block',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            top: 10,
            right: 10,
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 34,
            height: 34,
            borderRadius: '50%',
            bgcolor: 'rgba(0, 0, 0, 0.55)',
            color: '#fff',
            pointerEvents: 'none',
          }}
        >
          <OpenInFullRoundedIcon sx={{ fontSize: 18 }} />
        </Box>
      </Box>
    </Box>
  );
}
