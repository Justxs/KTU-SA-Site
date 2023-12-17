import axios from 'axios';
import { ENDPOINTS } from '../constants/endpoints';

const axiosClient = axios.create({
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' }
});

axiosClient.interceptors.response.use(
  response => {
    console.log('Response:', response);  // Log successful responses
    return response;
  },
  async error => {
    console.log('Interceptor caught an error:', error); // Log initial error info

    if (!error.response) {
      // If there's no response, it could be a network or CORS issue
      console.error('Error without response:', error.message);
      return Promise.reject(error);
    }

    const originalRequest = error.config;
    console.log('Error status:', error.response.status); // Log error status

    if (error.response.status === 401 && !originalRequest._retry) {
      console.log('Attempting to refresh token...');

      originalRequest._retry = true;
      try {
        const refreshTokenResponse = await axios.post(ENDPOINTS.AUTH.REFRESH_TOKEN, {}, { withCredentials: true });
        console.log('Refresh token response:', refreshTokenResponse); // Log refresh token response

        const newJwtToken = refreshTokenResponse.data;
        sessionStorage.setItem('jwtToken', newJwtToken);

        axiosClient.defaults.headers.common['Authorization'] = `Bearer ${newJwtToken}`;
        originalRequest.headers['Authorization'] = `Bearer ${newJwtToken}`;

        return axiosClient(originalRequest);
      } catch (refreshError) {
        console.error('Refreshing token failed:', refreshError); // Log refresh token failure
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosClient;
