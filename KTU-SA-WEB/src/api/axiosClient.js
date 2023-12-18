import axios from 'axios';
import { ENDPOINTS } from '../constants/endpoints';

const axiosClient = axios.create({
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' }
});

axiosClient.interceptors.response.use(
  response => {
    return response;
  },
  async error => {

    if (!error.response) {
      return Promise.reject(error);
    }

    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshTokenResponse = await axios.post(ENDPOINTS.AUTH.REFRESH_TOKEN, {}, { withCredentials: true });

        const newJwtToken = refreshTokenResponse.data;
        sessionStorage.setItem('jwtToken', newJwtToken);

        axiosClient.defaults.headers.common['Authorization'] = `Bearer ${newJwtToken}`;
        originalRequest.headers['Authorization'] = `Bearer ${newJwtToken}`;

        return axiosClient(originalRequest);
      } catch (refreshError) {
        const logoutEvent = new Event('logout');
        window.dispatchEvent(logoutEvent);
        
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosClient;
