const baseURL = import.meta.env.VITE_KTU_SA_WEB_API_URL;

export const ENDPOINTS = {
  AUTH: {
    LOGIN: `${baseURL}/api/Auth/Login`,
    LOGOUT: `${baseURL}/api/Auth/Logout`,
    REFRESH_TOKEN: `${baseURL}/api/Auth/Refresh`,
  },
  USERS: `${baseURL}/api/Users`,
  POSITIONS: `${baseURL}/api/Positions`,
  SA_UNITS: {
    BASE: `${baseURL}/api/StudentAssociationUnits`,
    POSITIONS: (id) => `${baseURL}/api/StudentAssociationUnits/${id}/Positions`
  },
  POSITIONS_SA_UNITS: (id) => `${baseURL}/api/Positions/${id}/StudentAssociationUnits`,
  CONTACTS: `${baseURL}/api/Contacts`,
}