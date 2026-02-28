import { Box, Dialog, DialogContent, DialogTitle, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import colors from '@theme/colors';

type Props = {
  open: boolean;
  handleClose: () => void;
  title: string;
  children: React.ReactNode;
};

export default function DialogBase(props: Readonly<Props>) {
  const { open, handleClose, title, children } = props;

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      disableScrollLock
      fullWidth
      slotProps={{
        paper: {
          sx: {
            borderRadius: '16px',
            overflow: 'hidden',
          },
        },
      }}
    >
      <Box
        sx={{
          height: '6px',
          background: `linear-gradient(90deg, ${colors.mediumBlue}, ${colors.accentBlue})`,
        }}
      />
      <DialogTitle
        sx={{
          pt: 3,
          pb: 1,
          px: 4,
          pr: 6,
        }}
      >
        <Typography
          component="span"
          sx={{
            fontWeight: 700,
            fontSize: { xs: 20, sm: 24 },
            color: colors.primaryDark,
            lineHeight: 1.3,
          }}
        >
          {title}
        </Typography>
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={{
          position: 'absolute',
          right: 12,
          top: 16,
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
      <DialogContent sx={{ px: 4, pt: 1, pb: 4 }}>
        <Typography
          sx={{
            color: colors.grayContact,
            fontSize: { xs: 15, sm: 16 },
            lineHeight: 1.75,
          }}
        >
          {children}
        </Typography>
      </DialogContent>
    </Dialog>
  );
}
