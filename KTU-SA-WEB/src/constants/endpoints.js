const baseURL = import.meta.env.VITE_KTU_SA_WEB_API_URL;

export const ENDPOINTS = {
  USERS: `${baseURL}/Users`,
  POSITIONS: `${baseURL}/Positions`,
  POSITIONS_SA_UNITS: (id) => `${baseURL}/api/Positions/${id}/StudentAssociationUnits`,
  CONTACTS: `${baseURL}/Contacts`,
  ARTICLES: (language) => `${baseURL}/${language}/Articles`,
  DUK: (language) => `${baseURL}/${language}/Duks`,
  SPONSORS: `${baseURL}/Sponsors`,
};