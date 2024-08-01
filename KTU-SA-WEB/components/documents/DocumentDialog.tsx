import DialogBase from '@components/dialogBase/DialogBase';

type Props = {
  open: boolean;
  handleClose: () => void;
  pdfUrl?: string;
  title?: string;
};


export default function DocumentDialog(props : Props) {
  const {
    pdfUrl = '', 
    open, 
    handleClose, 
    title = ''
  } = props;

  return (
    <DialogBase
      open={open}
      handleClose={handleClose}
      title={title}
    >
      <iframe
        title={title}
        src={pdfUrl}
        style={{ width: '100%', height: '100vh' }}
      >
        This browser does not support PDFs. Please download the PDF to view it.
      </iframe>
    </DialogBase>
  );
}
