import React from 'react';
import PropTypes from 'prop-types';
import LinkedInIcon from "../../assets/icon-linkedin.svg";
import { LinkedinShareButton } from 'react-share';

export default function LinkedInShare({title, preview, currentUrl}) {
  
  return (
    <LinkedinShareButton
      url={currentUrl}
      title={title}
      summary={preview}
      source={window.location.origin}
    >
      <img src={LinkedInIcon} />
    </LinkedinShareButton>
  );
}

LinkedInShare.propTypes = {
  title: PropTypes.string.isRequired,
  preview: PropTypes.string.isRequired,
  currentUrl: PropTypes.string.isRequired,
};

