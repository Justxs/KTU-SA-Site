export const ENDPOINTS = {
  CONTACTS: (language) => `/${language}/Contacts`,
  ARTICLES: (language) => `/${language}/Articles`,
  ARTICLES_BY_ID: (language, id) => `/${language}/Articles/${id}`,
  EVENTS: (language) => `/${language}/Events`,
  EVENTS_BY_SA_UNIT: (language, saUnit) => `/${language}/Events/SaUnits/${saUnit}`,
  EVENTS_BY_ID: (language, id) => `/${language}/Events/${id}`,
  SA_UNITS_BY_NAME: (language, name) => `/${language}/SaUnits/${name}`,
  DUK: (language) => `/${language}/Duks`,
  HERO_SECTION: (language, sectionName) => `/${language}/HeroSections/${sectionName}`,
  MAIN_CONTACTS: (saUnit) => `/MainContacts/${saUnit}`,
  DOCUMENTS: (language) => `/${language}/Documents`,
  SPONSORS: '/Sponsors',
};
