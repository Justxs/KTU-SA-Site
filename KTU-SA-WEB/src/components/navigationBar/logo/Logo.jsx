import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import KTUSA from '../../../assets/KTU_SA_Logo.svg';
import styles from './Logo.module.css';

export default function Logo({ isOpen }) {
  const spring = {
    type: 'spring',
    stiffness: 350,
    damping: 30,
  };

  return (
    <div className={styles.Container} data-ison={isOpen}>
      <motion.div
        layout
        transition={spring}
      >
        <Link to="/">
          <img src={KTUSA} alt="Logo" height={110} />
        </Link>
      </motion.div>
    </div>
  );
}

Logo.propTypes = {
  isOpen: PropTypes.bool.isRequired,
};
