import * as motion from 'motion/react-client';
import KTUSA from '@public/icons/logos/KTU_SA_Logo.svg';
import Image from 'next/image';
import Link from 'next/link';

import { Box } from '@mui/material';

export default function Logo({ isOpen }: Readonly<{ isOpen: boolean }>) {
  const spring = {
    type: 'spring',
    stiffness: 350,
    damping: 30,
  };

  return (
    <Box
      sx={{
        p: '24px 10px',
        '@media (max-width: 1300px)': {
          display: 'flex',
          width: '100%',
        },
      }}
    >
      <motion.div layout transition={spring as any}>
        <Link href="/">
          <Image src={KTUSA} alt="Logo" height={110} />
        </Link>
      </motion.div>
    </Box>
  );
}
