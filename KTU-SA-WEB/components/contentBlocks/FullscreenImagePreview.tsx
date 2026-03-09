import CloseIcon from '@mui/icons-material/Close';
import { Box, Dialog, IconButton } from '@mui/material';
import Image from 'next/image';

type PreviewImage = {
  url: string;
  alt: string;
};

type Props = {
  image: PreviewImage | null;
  onClose: () => void;
};

export default function FullscreenImagePreview({ image, onClose }: Readonly<Props>) {
  return (
    <Dialog
      open={Boolean(image)}
      onClose={onClose}
      maxWidth={false}
      fullScreen
      disableScrollLock
      slotProps={{
        backdrop: {
          sx: {
            bgcolor: 'rgba(6, 21, 40, 0.86)',
            backdropFilter: 'blur(4px)',
          },
        },
        paper: {
          sx: {
            m: 0,
            borderRadius: 0,
            bgcolor: 'transparent',
            boxShadow: 'none',
            overflow: 'visible',
          },
        },
      }}
    >
      <Box
        sx={{
          height: '100dvh',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          p: { xs: 2, md: 4 },
        }}
      >
        {image && (
          <Box
            sx={{
              display: 'inline-flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 1.5,
              width: '100%',
            }}
          >
            <Image
              src={image.url}
              alt={image.alt}
              width={2200}
              height={1400}
              sizes="100vw"
              style={{
                width: 'auto',
                height: 'auto',
                maxWidth: 'min(94vw, 1400px)',
                maxHeight: 'calc(100dvh - 80px)',
                objectFit: 'contain',
                borderRadius: '10px',
                boxShadow: '0 18px 44px rgba(0, 0, 0, 0.45)',
                background: '#fff',
              }}
            />
          </Box>
        )}

        <IconButton
          aria-label="Close image preview"
          onClick={onClose}
          sx={{
            position: 'fixed',
            top: { xs: 10, md: 18 },
            right: { xs: 10, md: 18 },
            color: '#fff',
            bgcolor: 'rgba(0, 0, 0, 0.38)',
            '&:hover': {
              bgcolor: 'rgba(0, 0, 0, 0.56)',
            },
          }}
        >
          <CloseIcon />
        </IconButton>
      </Box>
    </Dialog>
  );
}
