import React from 'react';
import PropTypes from 'prop-types';

export default function sidebar({contentList}) {
  return (
    <div>{contentList}</div>
  );
}

sidebar.propTypes = {
  contentList: PropTypes.string.isRequired,
};
