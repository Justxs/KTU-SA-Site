import React from 'react';
import PropTypes from 'prop-types';
import HamburgerIcon from '../../../assets/Hamburger.svg';
import HamburgerClose from '../../../assets/CloseHamburger.svg';
import styles from './Hamburger.module.css';

export default function Hamburger({ toggleMenu, isOpen }) {
  return (
    <div className={styles.Container}>
      <button
        className={styles.Button}
        onClick={toggleMenu}
        type="button"
      >
        {isOpen ? (
          <img alt="close hamburger" src={HamburgerClose} />
        ) : (
          <img alt="hamburger icon" src={HamburgerIcon} />
        )}
      </button>
    </div>
  );
}

Hamburger.propTypes = {
  toggleMenu: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
};
