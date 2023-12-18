import { useState, useEffect } from 'react';
import axiosClient from '../api/axiosClient';
import { useSnackbarContext } from '../context/SnackbarContext';

const useQuery = (url) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [reload, setReload] = useState(0);
    const { openSnackbar } = useSnackbarContext();

    const refetch = () => setReload(prev => prev + 1)

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
                    setError(err);
                    openSnackbar("An error occurred", "error");
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [url, reload]);

    return { data, error, isLoading, refetch};
};

export default useQuery;
