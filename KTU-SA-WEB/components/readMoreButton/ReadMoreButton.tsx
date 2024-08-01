'use client';

import { Button, styled } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useRouter } from 'next/navigation';
import styles from './ReadMoreButton.module.css';

type Props = {
  path: string;
  title: string;
  isCenter?: boolean;
  margin?: boolean;
}

const CustomButton = styled(Button)({
  backgroundColor: '#0E2643',
  color: '#F6F7F8',
  textTransform: 'none',
  padding: '12px',
  fontSize: '20px',
  fontFamily: 'PFDinTextPro-Medium',
  letterSpacing: '2px',
  lineHeight: '1',
  gap: '12px',
  '&:focus-visible': {
    outline: '2px solid #007fff',
    backgroundColor: '#007fff'
  }
});

export default function ReadMoreButton(props : Readonly<Props>) {
  const {
    path,
    title,
    isCenter = false,
    margin = false
  } = props;
  
  const router = useRouter();

  const center = isCenter
    ? styles.Center 
    : undefined;

  const withMargin = margin
    ? { paddingBottom: '44px', marginTop: '30px' }
    : undefined;

  return (
    <div className={center} style={withMargin}>
      <CustomButton
        variant="contained"
        onClick={() => router.push(path)}
        size="small"
        disableFocusRipple
      >
        {title}
        <ArrowForwardIcon/>
      </CustomButton>
    </div>
  );
}
