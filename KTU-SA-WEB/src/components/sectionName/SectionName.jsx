import React from 'react';
import PropTypes from 'prop-types';
import ArrowIcon from '../../assets/Arrow.svg';
import Styles from './SectionName.module.css';

export default function SectionName({ title, showArrow }) {
  return (
    <div className={Styles.Container}>
      <div className={Styles.Header}>
        {title}
        {showArrow && <img src={ArrowIcon} className={Styles.Arrow} alt="" />}
      </div>
    </div>
  );
}

SectionName.propTypes = {
  title: PropTypes.string.isRequired,
  showArrow: PropTypes.bool,
};

SectionName.defaultProps = {
  showArrow: false,
};
