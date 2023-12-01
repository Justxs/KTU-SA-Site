import { useState, useCallback } from 'react';
import axiosClient from '../api/axiosClient';

const useAxiosRequest = () => {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const sendRequest = useCallback(async ({ url, method, data }, onSuccess, onError) => {
        setIsLoading(true);
    
        try {
          const response = await axiosClient({ url, method, data });
          setResponse(response.data);
    
          if (onSuccess) {
            onSuccess(response.data);
          }
        } catch (err) {
          setError(err);
          
          if (onError) {
            onError(err);
          }
        } finally {
          setIsLoading(false);
        }
      }, []);
    
      return { response, error, isLoading, sendRequest };
    };

export default useAxiosRequest;
