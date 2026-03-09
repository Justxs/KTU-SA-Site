import { isDirectVideoFileUrl, toVideoEmbedUrl } from '@api/helpers';
import { Box } from '@mui/material';

type Props = {
  videoUrl: string;
};

export default function VideoBlock({ videoUrl }: Readonly<Props>) {
  const trimmedVideoUrl = videoUrl.trim();

  if (isDirectVideoFileUrl(trimmedVideoUrl)) {
    return (
      <Box
        sx={{
          m: { xs: '20px 0', md: '24px 0' },
          borderRadius: { xs: '10px', md: '12px' },
          overflow: 'hidden',
          boxShadow: '0 2px 12px rgba(14, 38, 67, 0.08)',
        }}
      >
        <Box
          component="video"
          controls
          preload="metadata"
          src={trimmedVideoUrl}
          sx={{
            display: 'block',
            width: '100%',
            height: 'auto',
            maxHeight: { xs: '50vh', md: '70vh' },
            bgcolor: '#000',
          }}
        />
      </Box>
    );
  }

  const embedUrl = toVideoEmbedUrl(trimmedVideoUrl);

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        m: { xs: '20px 0', md: '28px 0' },
        borderRadius: { xs: '10px', md: '12px' },
        overflow: 'hidden',
        boxShadow: '0 2px 12px rgba(14, 38, 67, 0.08)',
      }}
    >
      <Box
        component="iframe"
        src={embedUrl}
        title="Embedded video"
        loading="lazy"
        allowFullScreen
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        sx={{
          border: 'none',
          borderRadius: { xs: '10px', md: '12px' },
          maxWidth: '100%',
          width: '100%',
          aspectRatio: '16 / 9',
          minHeight: { xs: 220, sm: 320 },
        }}
      />
    </Box>
  );
}
