import { Button, styled } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import styles from './ReadMoreButton.module.css';

const CustomButton = styled(Button)({
  backgroundColor: '#0E2643',
  color: '#F6F7F8',
  textTransform: 'none',
  padding: '12px',
  fontSize: '20px',
  fontFamily: 'PFDinTextPro-Regular',
  fontWeight: '600',
  letterSpacing: '2px',
  lineHeight: '1',
  gap: '12px',
});

export default function ReadMoreButton(props) {
  const {
    path,
    title,
    isCenter,
    margin,
  } = props;
  const navigate = useNavigate();

  const center = isCenter
    ? styles.Center
    : null;

  const withMargin = margin
    ? { marginBottom: '44px', marginTop: '30px' }
    : null;

  return (
    <div className={center} style={withMargin}>
      <CustomButton
        variant="contained"
        onClick={() => navigate(path)}
        size="sm"
      >
        {title}
        <ArrowForwardIcon />
      </CustomButton>
    </div>
  );
}

ReadMoreButton.propTypes = {
  path: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  isCenter: PropTypes.bool,
  margin: PropTypes.bool,
};

ReadMoreButton.defaultProps = {
  isCenter: false,
  margin: false,
};
