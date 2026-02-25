/**
 * Centralized color palette for the KTU SA website.
 * All hardcoded color values should reference these constants.
 */
const colors = {
  /** Main brand dark blue — backgrounds, headings, primary text */
  primaryDark: '#0E2643',
  /** Medium blue — borders, description text, icon color, value icons */
  mediumBlue: '#114D8A',
  /** Light blue background — hero sections, FAQ accordion, activity cards */
  lightBlueBg: '#F1F7FE',
  /** Light blue accent — social media section, footer hover, sidebar hover, carousel arrows hover */
  lightBlueAccent: '#89C0F0',
  /** Navbar / button hover light blue */
  navbarLightBlue: '#C0DCF7',
  /** Navigation dark blue — expand nav, carousel arrow, chip */
  navDarkBlue: '#153C65',
  /** Link blue — contact links, header labels */
  linkBlue: '#2383D4',
  /** Accent blue — hover states, sidebar arrows, expand nav links */
  accentBlue: '#4A9FE6',
  /** Dark blue secondary — event info, sidebar text */
  darkBlueSecondary: '#134679',
  /** Focus outline blue — keyboard focus indicators */
  focusBlue: '#007fff',
  /** Hero subtitle blue */
  heroTextBlue: '#268df5',

  /** Active / highlight yellow */
  activeYellow: '#FFD324',
  /** Values section gold text */
  valuesGold: '#EFB603',
  /** Active date amber */
  activeDateAmber: '#A46304',
  /** Navigation description gold */
  navGold: '#CE8C00',
  /** DUK card brown text */
  dukBrown: '#432005',

  /** Near-black text — card titles, body text */
  nearBlackText: '#24282D',
  /** Gray date/secondary text */
  grayText: '#8C9BA4',
  /** Gray contact text */
  grayContact: '#48535C',
  /** Arrow/icon gray */
  arrowGray: '#B5BEC4',

  /** White */
  white: '#fff',
  /** Off-white — button text, footer text */
  offWhite: '#F6F7F8',
} as const;

export default colors;
