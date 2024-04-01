import React from 'react';
import PropTypes from 'prop-types';
import { FacebookShareButton } from 'react-share';
import FacebookIcon from "../../assets/icon-facebook.svg";

export default function FacebookShare({currentUrl}) {
  return (
    <FacebookShareButton
      url={currentUrl}
    >
      <img src={FacebookIcon} />
    </FacebookShareButton>
  );
}

FacebookShare.propTypes = {
  currentUrl: PropTypes.string.isRequired,
};
