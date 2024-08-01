'use client';

import { motion } from 'framer-motion';
import styles from './ExpandNavigation.module.css';
import Link from 'next/link';

type Props = { 
  open: boolean,
  setOpen: (bool: boolean) => void
  currentSection: {
    header: string,
    description: string,
    links: Array<{
      path: string,
      name: string,
    }>,
  },
}

export default function ExpandNavigation(props : Readonly<Props>) {
  const { open, setOpen, currentSection } = props;

  const variants = {
    open: {
      scaleY: 1,
      opacity: 1,
      transition: {
        duration: 0.25,
        ease: 'easeInOut'
      }
    },
    closed: {
      scaleY: 0,
      opacity: 0,
      transition: {
        duration: 0.25,
        ease: 'easeInOut'
      }
    }
  };

  return (
    <motion.div
      className={styles.Container}
      variants={variants}
      initial="closed"
      animate={open ? 'open' : 'closed'}
      exit="closed"
      style={{ originY: 0 }}
    >
      {currentSection && (
        <div className={styles.ExpandedContainer}>
          <p className={styles.Description}>{currentSection.description}</p>
          <div className={styles.Section}>
            <h2 className={styles.Header}>{currentSection.header}</h2>
            {currentSection.links.map((link) => (
              <Link 
                key={link.path} 
                href={link.path} 
                className={styles.Link} 
                onClick={() => setOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}
