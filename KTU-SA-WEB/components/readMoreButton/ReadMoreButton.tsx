'use client';

import { Box, Button, styled } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Link from 'next/link';
import colors from '@theme/colors';

type Props = {
  path: string;
  title: string;
  isCenter?: boolean;
  margin?: boolean;
};

const CustomButton = styled(Button)({
  backgroundColor: colors.primaryDark,
  color: colors.offWhite,
  textTransform: 'none',
  padding: '12px',
  fontSize: '20px',
  fontWeight: '600',
  fontFamily: 'PFDinTextPro-Medium',
  letterSpacing: '2px',
  lineHeight: '1',
  gap: '12px',
  '&:focus-visible': {
    outline: `2px solid ${colors.focusBlue}`,
    backgroundColor: colors.focusBlue,
  },
});

export default function ReadMoreButton(props: Readonly<Props>) {
  const { path, title, isCenter = false, margin = false } = props;

  return (
    <Box
      sx={{
        mt: '28px',
        ...(isCenter && { display: 'flex', justifyContent: 'center' }),
        ...(margin && { pb: '44px' }),
      }}
    >
      <CustomButton
        LinkComponent={Link}
        href={path}
        variant="contained"
        size="small"
        disableFocusRipple
      >
        {title}
        <ArrowForwardIcon aria-hidden="true" />
      </CustomButton>
    </Box>
  );
}
