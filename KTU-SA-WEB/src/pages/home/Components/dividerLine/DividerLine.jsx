import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import styles from './DividerLine.module.css';
import AbsoluteContainerMargin from '../../../../components/marginContainers/ObsoluteContainerMargin';

export default function DividerLine() {
  const { t } = useTranslation();
  const text = t('home.dividerLine').toUpperCase();
  const elementRef = useRef(null);

  const scrollTextAnimation = {
    animate: {
      x: ['60%', '-100%'],
      transition: {
        duration: 30,
        ease: 'linear',
        repeat: Infinity,
      },
    },
  };

  return (
    <AbsoluteContainerMargin elementRef={elementRef}>
      <div className={styles.Container} ref={elementRef}>
        <div className={styles.Divider}>
          <motion.span
            className={styles.Text}
            variants={scrollTextAnimation}
            animate="animate"
          >
            {text}
          </motion.span>
        </div>
      </div>
    </AbsoluteContainerMargin>
  );
}
