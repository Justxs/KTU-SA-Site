const baseURL = import.meta.env.VITE_KTU_SA_WEB_API_URL;

export const ENDPOINTS = {
    AUTH: {
      LOGIN: `${baseURL}/api/Auth/Login`,
      LOGOUT: `${baseURL}/api/Auth/Logout`,
      REFRESH_TOKEN: `${baseURL}/api/Auth/Refresh`,
    },
    USER: {
      GET_ALL: `${baseURL}/api/User`,
    },
}