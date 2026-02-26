import { Box, Dialog, DialogTitle, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DownloadIcon from '@mui/icons-material/Download';
import colors from '@theme/colors';

type Props = {
  open: boolean;
  handleClose: () => void;
  pdfUrl?: string;
  title?: string;
};

export default function DocumentDialog(props: Readonly<Props>) {
  const { pdfUrl = '', open, handleClose, title = '' } = props;

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="lg"
      fullWidth
      disableScrollLock
      slotProps={{
        paper: {
          sx: {
            borderRadius: '16px',
            overflow: 'hidden',
            height: '90vh',
            display: 'flex',
            flexDirection: 'column',
          },
        },
      }}
    >
      <Box
        sx={{
          height: '6px',
          background: `linear-gradient(90deg, ${colors.mediumBlue}, ${colors.accentBlue})`,
          flexShrink: 0,
        }}
      />
      <DialogTitle
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          pt: 2,
          pb: 1.5,
          px: 3,
          borderBottom: `1px solid ${colors.lightBlueBg}`,
          flexShrink: 0,
        }}
      >
        <Typography
          component="span"
          sx={{
            fontWeight: 700,
            fontSize: { xs: 16, sm: 20 },
            color: colors.primaryDark,
            lineHeight: 1.3,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            mr: 2,
          }}
        >
          {title}
        </Typography>
        <Box sx={{ display: 'flex', gap: 1, flexShrink: 0 }}>
          {pdfUrl && (
            <IconButton
              component="a"
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="download"
              sx={{
                color: colors.mediumBlue,
                transition: '0.2s',
                '&:hover': {
                  bgcolor: colors.lightBlueBg,
                  color: colors.accentBlue,
                },
              }}
            >
              <DownloadIcon />
            </IconButton>
          )}
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              color: colors.grayContact,
              transition: '0.2s',
              '&:hover': {
                color: colors.primaryDark,
                bgcolor: colors.lightBlueBg,
              },
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <Box sx={{ flex: 1, overflow: 'hidden' }}>
        <iframe
          title={title}
          src={pdfUrl}
          style={{ width: '100%', height: '100%', border: 'none' }}
        >
          This browser does not support PDFs. Please download the PDF to view it.
        </iframe>
      </Box>
    </Dialog>
  );
}
