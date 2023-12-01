import { useState, useEffect } from 'react';
import axiosClient from '../api/axiosClient';

const useQuery = (url) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;

        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await axiosClient.get(url, { signal });
                setData(response.data);
            } catch (err) {
                if (err.response) {
                    if (err.response.status === 401) {
                        setError(err);
                    }
                } else if (!err.name === 'AbortError') {
                    setError(err);
                }
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();

        return () => {
            abortController.abort();
        };
    }, [url]);

    return { data, error, isLoading };
};

export default useQuery;
