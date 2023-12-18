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
          openSnackbar(err.response.data || "An error occurred", "error");

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
