import * as motion from 'motion/react-client';
import KTUSA from '@public/icons/logos/KTU_SA_Logo.svg';
import Image from 'next/image';
import { Link } from '@i18n/navigation';

import { Box } from '@mui/material';
import type { Transition } from 'motion/react';

export default function Logo() {
  const spring: Transition = {
    type: 'spring',
    stiffness: 350,
    damping: 30,
  };

  return (
    <Box
      sx={{
        p: '14px 10px',
        '@media (max-width: 1300px)': {
          display: 'flex',
          width: '100%',
        },
      }}
    >
      <motion.div layout transition={spring}>
        <Link href="/" aria-label="KTU SA">
          <Image src={KTUSA} alt="" aria-hidden="true" height={72} />
        </Link>
      </motion.div>
    </Box>
  );
}
