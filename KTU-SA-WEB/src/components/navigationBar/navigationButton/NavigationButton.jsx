import React from 'react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import PropTypes from 'prop-types';
import styles from './NavigationButton.module.css';

export default function NavigationButton(props) {
  const { title, expanded, onExpand } = props;

  return (
    <button
      className={styles.Button}
      onClick={() => onExpand(title)}
      type="button"
    >
      {title}
      {expanded ? (
        <ArrowDropDownIcon sx={{ color: '#B5BEC4' }} />
      ) : (
        <ArrowRightIcon sx={{ color: '#B5BEC4' }} />
      )}
    </button>
  );
}

NavigationButton.propTypes = {
  title: PropTypes.string.isRequired,
  expanded: PropTypes.bool.isRequired,
  onExpand: PropTypes.func.isRequired,
};
