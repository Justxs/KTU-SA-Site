import { getPdfTitleFromUrl } from '@api/helpers';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { Box, Typography } from '@mui/material';
import DocumentListCard from '@components/documents/DocumentListCard';
import colors from '@theme/colors';

type Props = {
  onOpen: (pdfUrl: string, pdfTitle: string) => void;
  pdfUrl: string;
};

const pdfIconSx = { fontSize: 26, color: colors.mediumBlue, transition: 'color 0.2s ease' };

export default function PdfBlockCard({ onOpen, pdfUrl }: Readonly<Props>) {
  const pdfTitle = getPdfTitleFromUrl(pdfUrl);

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: '100%',
        minWidth: 0,
        m: '16px 0',
      }}
    >
      <DocumentListCard
        icon={<PictureAsPdfIcon sx={pdfIconSx} />}
        onClick={() => onOpen(pdfUrl, pdfTitle)}
      >
        <Typography
          sx={{
            fontSize: { xs: 14, sm: 15 },
            fontWeight: 600,
            color: colors.primaryDark,
            lineHeight: 1.4,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {pdfTitle}
        </Typography>
        <Typography
          sx={{
            fontSize: 12,
            color: colors.grayText,
            mt: 0.25,
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            fontWeight: 500,
          }}
        >
          PDF
        </Typography>
      </DocumentListCard>
    </Box>
  );
}
