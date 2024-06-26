/* eslint-disable react/jsx-no-constructed-context-values */
import React, { createContext, useContext, useState } from 'react';
import { Alert, Snackbar } from '@mui/material';
import PropTypes from 'prop-types';

const SnackbarContext = createContext();

export const useSnackbarContext = () => useContext(SnackbarContext);

export function SnackbarProvider({ children }) {
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    type: 'info',
  });

  const openSnackbar = (message, type = 'error') => {
    setSnackbar({ open: true, message, type });
  };

  const closeSnackbar = () => {
    setSnackbar({ open: false, message: '', type: 'error' });
  };

  return (
    <SnackbarContext.Provider value={{ openSnackbar, closeSnackbar }}>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={closeSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={closeSnackbar}
          severity={snackbar.type}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
      {children}
    </SnackbarContext.Provider>
  );
}

SnackbarProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
