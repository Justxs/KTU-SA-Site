import React from 'react';
import PropTypes from 'prop-types';
import styles from './Sidebar.module.css';

export default function Sidebar({ ticketUrl, facebookUrl, organisers }) {
  return (
    <div className={styles.Container}>
      {ticketUrl}
      {' '}
      <a href={ticketUrl}>Buy Tickets</a>

      {facebookUrl}
      {organisers}
    </div>
  );
}

Sidebar.propTypes = {
  ticketUrl: PropTypes.string.isRequired,
  facebookUrl: PropTypes.string.isRequired,
  organisers: PropTypes.string.isRequired,
};
