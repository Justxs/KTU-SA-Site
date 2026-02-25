import { Dialog, DialogContent, DialogTitle, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

type Props = {
  open: boolean;
  handleClose: () => void;
  title: string;
  children: React.ReactNode;
};

export default function DialogBase(props: Readonly<Props>) {
  const { open, handleClose, title, children } = props;

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" disableScrollLock fullWidth>
      <DialogTitle>
        <Typography align="center" variant="inherit">
          {title}
        </Typography>
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
}
