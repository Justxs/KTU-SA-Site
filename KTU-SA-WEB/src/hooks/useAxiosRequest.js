import { useState, useCallback } from 'react';
import axiosClient from '../api/axiosClient';
import { useSnackbarContext } from '../context/SnackbarContext';

const useAxiosRequest = () => {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { openSnackbar } = useSnackbarContext();

    const sendRequest = useCallback(async ({ url, method, data }, onSuccess, onError) => {
        setIsLoading(true);
    
        try {
          const response = await axiosClient({ url, method, data });
          setResponse(response.data);
          openSnackbar("Success!", "success");

          if (onSuccess) {
            onSuccess(response.data);
          }
        } catch (err) {
          setError(err);
          
          let errorMessage = "An error occurred";
          if (err.response && err.response.data && err.response.data.errors) {
              const errors = err.response.data.errors;
              const errorMessages = Object.keys(errors).map(key => errors[key].join(', ')).join('\n');
              errorMessage = errorMessages;
          }
          
          openSnackbar(errorMessage, "error");

          if (onError) {
            onError(err);
          }
        } finally {
          setIsLoading(false);
        }
      }, [openSnackbar]);
    
      return { response, error, isLoading, sendRequest };
    };

export default useAxiosRequest;
