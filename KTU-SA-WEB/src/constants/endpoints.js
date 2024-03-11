const baseURL = import.meta.env.VITE_KTU_SA_WEB_API_URL;

export const ENDPOINTS = {
  USERS: `${baseURL}/Users`,
  POSITIONS: `${baseURL}/Positions`,
  SA_UNITS: {
    BASE: `${baseURL}/StudentAssociationUnits`,
    POSITIONS: (id) => `${baseURL}/StudentAssociationUnits/${id}/Positions`
  },
  POSITIONS_SA_UNITS: (id) => `${baseURL}/api/Positions/${id}/StudentAssociationUnits`,
  CONTACTS: `${baseURL}/Contacts`,
  POSTS: `${baseURL}/Posts`,
  DUK: (language) => `${baseURL}/${language}/Duks`,
};