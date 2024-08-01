import React from 'react';
import { motion } from 'framer-motion';
import KTUSA from '@public/icons/logos/KTU_SA_Logo.svg';
import styles from './Logo.module.css';
import Image from 'next/image';
import Link from 'next/link';

export default function Logo({ isOpen } : Readonly<{isOpen: boolean}>) {
  const spring = {
    type: 'spring',
    stiffness: 350,
    damping: 30
  };

  return (
    <div className={styles.Container}>
      <motion.div
        layout
        transition={spring}
      >
        <Link href="/">
          <Image src={KTUSA} alt="Logo" height={110} />
        </Link>
      </motion.div>
    </div>
  );
}
