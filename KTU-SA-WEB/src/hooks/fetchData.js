import axiosClient from '../api/axiosClient';

export const fetchData = async (url, params = {}) => {
  const query = new URLSearchParams(params).toString();

  const finalUrl = `${url}${query ? `?${query}` : ''}`;
  const response = await axiosClient.get(finalUrl);

  return response.data;
};
