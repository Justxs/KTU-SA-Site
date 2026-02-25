import ArrowIcon from '@public/icons/action/Arrow.svg';
import Image from 'next/image';
import { Box } from '@mui/material';
import colors from '@theme/colors';

type Props = {
  title: string;
  showArrow?: boolean;
};

export default function SectionName(props: Readonly<Props>) {
  const { title, showArrow = false } = props;

  return (
    <Box sx={{ mb: 4 }} id={title}>
      <Box
        component="h2"
        sx={{
          display: 'flex',
          color: colors.nearBlackText,
          fontSize: 38,
          fontWeight: 600,
          letterSpacing: '-0.5px',
          gap: 2,
          m: 0,
          '@media (max-width: 940px)': {
            textAlign: 'center',
            justifyContent: 'center',
            width: '100%',
          },
        }}
      >
        {title}
        {showArrow && (
          <Image
            src={ArrowIcon}
            alt=""
            aria-hidden="true"
            style={{ width: 32, height: 35, marginTop: 4 }}
          />
        )}
      </Box>
    </Box>
  );
}
