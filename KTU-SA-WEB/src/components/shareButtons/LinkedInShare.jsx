import React from 'react';
import PropTypes from 'prop-types';
import { LinkedinShareButton } from 'react-share';
import { Tooltip } from '@mui/material';
import { useTranslation } from 'react-i18next';
import LinkedInIcon from '../../assets/icon-linkedin.svg';

export default function LinkedInShare({ title, preview, currentUrl }) {
  const { t } = useTranslation();

  return (
    <Tooltip title={t('common.shareToLinkedIn')}>
      <div>
        <LinkedinShareButton
          url={currentUrl}
          title={title}
          summary={preview}
          source={window.location.origin}
        >
          <img src={LinkedInIcon} alt="LinkedIn Icon" />
        </LinkedinShareButton>
      </div>
    </Tooltip>
  );
}

LinkedInShare.propTypes = {
  title: PropTypes.string.isRequired,
  preview: PropTypes.string.isRequired,
  currentUrl: PropTypes.string.isRequired,
};
