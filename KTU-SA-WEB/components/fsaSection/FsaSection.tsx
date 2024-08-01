'use client';

import { useState } from 'react';
import { Button, styled } from '@mui/material';
import { motion } from 'framer-motion';
import styles from './FsaSection.module.css';
import KTUSA from '@public/icons/logos/KTU_SA_Logo.svg';
import SectionName from '@components/sectionName/SectionName';
import { useLocale, useTranslations } from 'next-intl';
import FSA_DATA from '@constants/FsaUnits';
import { useRouter } from 'next/navigation';
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';

const FsaButton = styled(Button)({
  color: '#0E2643',
  background: 'transparent',
  textTransform: 'none',
  padding: '12px',
  fontFamily: 'PFDinTextPro-Medium',
  letterSpacing: '1px',
  fontSize: '20px',
  '&:hover': {
    background: '#fff',
    color: '#4A9FE6'
  },
  '&:focus-visible': {
    outline: '2px solid #007fff'
  }
});

export default function FsaSection() {
  const t = useTranslations();
  const locale = useLocale();
  const [currentLogo, setCurrentLogo] = useState<StaticImageData>(KTUSA);
  const router = useRouter();
  const fsaData = FSA_DATA(t);

  const logoVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  return (
    <>
      <SectionName title={t('sections.fsa')} />
      <div className={styles.Container}>
        <div className={styles.LogoContainer}>
          <motion.img
            key={currentLogo.src}
            src={currentLogo.src}
            alt="FSA Logo"
            className={styles.Logo}
            variants={logoVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.5 }}
          />
        </div>
        <div className={styles.FsaList}>
          {fsaData.map((fsa) => (
            <div
              key={fsa.name}
              onMouseEnter={() => setCurrentLogo(fsa.logo)}
              onMouseLeave={() => setCurrentLogo(KTUSA)}
            >
              <div className={styles.LogoResponsive}>
                <Link href={`${locale}/fsa/${fsa.name}`}>
                  <Image 
                    src={fsa.logo} 
                    alt={fsa.name} 
                    className={styles.LogoSize} 
                  />
                </Link>
              </div>
              <FsaButton 
                onClick={() => router.push(`${locale}/fsa/${fsa.name}`)}
                disableFocusRipple
              >
                <span className={styles.FullName}>{fsa.fullName}</span>
              </FsaButton>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
