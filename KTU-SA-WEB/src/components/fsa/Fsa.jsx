import React, { useState } from 'react';
import { Button, styled } from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import SectionName from '../sectionName/SectionName';
import styles from './Fsa.module.css';
import KtuSaLogo from '../../assets/KTU_SA_Logo.svg';
import FSA_DATA from '../../constants/FsaUnits';

const FsaButton = styled(Button)({
  color: '#0E2643',
  background: '#fff',
  textTransform: 'none',
  padding: '12px',
  fontFamily: 'PFDinTextPro-Regular',
  fontWeight: '600',
  letterSpacing: '1px',
  fontSize: '20px',
  '&:hover': {
    background: '#fff',
    color: '#4A9FE6',
  },
});

export default function Fsa() {
  const { t } = useTranslation();
  const [currentLogo, setCurrentLogo] = useState(KtuSaLogo);
  const navigate = useNavigate();

  const fsaData = FSA_DATA(t);

  const logoVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <div style={{ paddingTop: '50px' }}>
      <SectionName title={t('sections.fsa')} />
      <div className={styles.Container}>
        <div className={styles.LogoContainer}>
          <motion.img
            key={currentLogo}
            src={currentLogo}
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
              onMouseLeave={() => setCurrentLogo(KtuSaLogo)}
            >
              <div className={styles.LogoResponsive}>
                <Button onClick={() => navigate(`/fsa/${fsa.name}`)}>
                  <img src={fsa.logo} alt="" className={styles.LogoSize} />
                </Button>
              </div>
              <FsaButton onClick={() => navigate(`/fsa/${fsa.name}`)}>
                <span className={styles.FullName}>{fsa.fullName}</span>
              </FsaButton>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
