import axios from 'axios';
import { ENDPOINTS } from '../constants/endpoints';

const axiosClient = axios.create({
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' }
});

axiosClient.interceptors.response.use(
    response => response,
    async error => {
      const originalRequest = error.config;
  
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
  
        try {
          const response = await axios.post(ENDPOINTS.AUTH.REFRESH_TOKEN, {
            withCredentials: true
          });
  
          const newJwtToken = response.data;
          sessionStorage.setItem('jwtToken', newJwtToken);
  
          axiosClient.defaults.headers.common['Authorization'] = `Bearer ${newJwtToken}`;
          return axiosClient(originalRequest);
        } catch (refreshError) {
          // To Do handle if refresh token fails
          console.log("Refreshing token failed");
          return Promise.reject(refreshError);
        }
      }
  
      return Promise.reject(error);
    }
);

export default axiosClient;
