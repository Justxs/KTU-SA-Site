import React from 'react';
import PropTypes from 'prop-types';
import { FacebookShareButton } from 'react-share';
import FacebookIcon from "../../assets/icon-facebook.svg";
import { Tooltip } from '@mui/material';
import { useTranslation } from 'react-i18next';

export default function FacebookShare({currentUrl}) {
  const {t} = useTranslation();

  return (
    <Tooltip title={t("common.shareToFb")}>
      <FacebookShareButton
        url={currentUrl}
      >
        <img src={FacebookIcon} />
      </FacebookShareButton>
    </Tooltip>
  );
}

FacebookShare.propTypes = {
  currentUrl: PropTypes.string.isRequired,
};
