export const ENDPOINTS = {
  CONTACTS: (language) => `/${language}/Contacts`,
  ARTICLES: (language) => `/${language}/Articles`,
  DUK: (language) => `/${language}/Duks`,
  HERO_SECTION: (language, sectionName) => `/${language}/HeroSections/${sectionName}`,
  MAIN_CONTACTS: (saUnit) =>`/MainContacts/${saUnit}`,
  SPONSORS: `/Sponsors`,
};