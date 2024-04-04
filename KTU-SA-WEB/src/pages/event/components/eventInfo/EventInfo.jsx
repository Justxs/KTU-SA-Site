import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import { Tooltip } from '@mui/material';
import styles from './EventInfo.module.css';
import dateService from '../../../../services/dateService';
import FacebookIcon from '../../../../assets/icon-facebook.svg';
import SA_UNITS_LOGO from '../../../../constants/SaUnitsLogos';

export default function EventInfo(props) {
  const {
    ticketUrl,
    facebookUrl,
    organisers,
    startDate,
    endDate,
    address,
  } = props;

  const { t } = useTranslation();

  const matchedLogos = SA_UNITS_LOGO
    .filter((saUnit) => organisers.some((org) => saUnit.name.toLowerCase() === org.toLowerCase()));

  return (
    <div className={styles.Container}>
      <div className={styles.Tickets}>
        <LocalActivityIcon sx={{ height: '30px', width: '30px' }} />
        <a className={styles.TicketUrl} href={ticketUrl}>{t('event.buyTickets')}</a>
      </div>
      <div className={styles.Details}>
        <div className={styles.DetailsTitle}>{t('event.organisers')}</div>
        <div className={styles.Oranisers}>
          {matchedLogos.map((unit) => (
            <div key={unit.name}>
              <img src={unit.logo} alt={unit.name} className={styles.OrganisersLogo} />
            </div>
          ))}
        </div>
      </div>
      <div className={styles.Info}>
        <div className={styles.Details}>
          <div className={styles.DetailsTitle}>{t('event.address')}</div>
          <div>{address}</div>
        </div>
        <div className={styles.Details}>
          <div className={styles.DetailsTitle}>{t('event.facebookEventSocial')}</div>
          <Tooltip title={t('event.facebookEvent')}>
            <a
              href={facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img alt="Facebook event" src={FacebookIcon} />
            </a>
          </Tooltip>
        </div>
        <div className={styles.Details}>
          <div className={styles.DetailsTitle}>{t('event.startsAt')}</div>
          <div>{dateService.formatToDateAndTime(startDate)}</div>
        </div>
        <div className={styles.Details}>
          <div className={styles.DetailsTitle}>{t('event.endsAt')}</div>
          <div>{dateService.formatToDateAndTime(endDate)}</div>
        </div>
      </div>
    </div>
  );
}

EventInfo.propTypes = {
  ticketUrl: PropTypes.string.isRequired,
  facebookUrl: PropTypes.string.isRequired,
  organisers: PropTypes.string.isRequired,
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
};
