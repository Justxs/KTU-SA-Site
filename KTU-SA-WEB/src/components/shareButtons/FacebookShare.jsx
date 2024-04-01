import React from 'react';
import PropTypes from 'prop-types';
import { FacebookShareButton } from 'react-share';
import { Tooltip } from '@mui/material';
import { useTranslation } from 'react-i18next';
import FacebookIcon from '../../assets/icon-facebook.svg';

export default function FacebookShare({ currentUrl }) {
  const { t } = useTranslation();

  return (
    <Tooltip title={t('common.shareToFb')}>
      <div>
        <FacebookShareButton
          url={currentUrl}
        >
          <img src={FacebookIcon} />
        </FacebookShareButton>
      </div>
    </Tooltip>
  );
}

FacebookShare.propTypes = {
  currentUrl: PropTypes.string.isRequired,
};
