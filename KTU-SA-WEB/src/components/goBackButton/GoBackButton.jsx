import styled from '@emotion/styled';
import { Button } from '@mui/material';
import React from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

export default function GoBackButton({ color, onHover }) {
  const BackButton = styled(Button)({
    textTransform: 'none',
    padding: '12px',
    fontSize: '20px',
    color: { color },
    '&:hover': {
      color: { onHover },
      background: 'transparent',
    },
  });
  const { t } = useTranslation();
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };
  return (
    <BackButton sx={{ color }} onClick={goBack}>
      <ArrowBackIcon />
      {t('common.goBack')}
    </BackButton>
  );
}

GoBackButton.propTypes = {
  color: PropTypes.string.isRequired,
  onHover: PropTypes.string.isRequired,
};
