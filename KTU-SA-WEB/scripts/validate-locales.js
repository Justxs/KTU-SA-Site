const { readFileSync } = require('node:fs');
const { join } = require('node:path');

const LOCALES_DIRECTORY = join(__dirname, '..', 'locales');
const REFERENCE_LOCALE = 'en';
const SUPPORTED_LOCALES = ['en', 'lt'];

function readLocale(locale) {
  const path = join(LOCALES_DIRECTORY, `${locale}.json`);

  try {
    return JSON.parse(readFileSync(path, 'utf8'));
  } catch (error) {
    console.error(`Unable to read ${path}:`, error instanceof Error ? error.message : error);
    process.exitCode = 1;
    return null;
  }
}

function getLeafKeys(value, prefix = '') {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) {
    return [prefix];
  }

  return Object.entries(value).flatMap(([key, child]) =>
    getLeafKeys(child, prefix ? `${prefix}.${key}` : key),
  );
}

const referenceMessages = readLocale(REFERENCE_LOCALE);

if (referenceMessages) {
  const referenceKeys = new Set(getLeafKeys(referenceMessages));

  for (const locale of SUPPORTED_LOCALES.filter((item) => item !== REFERENCE_LOCALE)) {
    const messages = readLocale(locale);
    if (!messages) continue;

    const localeKeys = new Set(getLeafKeys(messages));
    const missingKeys = [...referenceKeys].filter((key) => !localeKeys.has(key));
    const extraKeys = [...localeKeys].filter((key) => !referenceKeys.has(key));

    if (missingKeys.length > 0 || extraKeys.length > 0) {
      process.exitCode = 1;
      console.error(`Locale ${locale} does not match ${REFERENCE_LOCALE}.`);

      if (missingKeys.length > 0) {
        console.error(`  Missing: ${missingKeys.join(', ')}`);
      }

      if (extraKeys.length > 0) {
        console.error(`  Extra: ${extraKeys.join(', ')}`);
      }
    }
  }
}

if (!process.exitCode) {
  console.log(`Locale files are synchronized (${getLeafKeys(referenceMessages).length} keys).`);
}
