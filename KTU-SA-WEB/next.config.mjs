/* eslint-disable */
import createNextIntlPlugin from 'next-intl/plugin';
 
const withNextIntl = createNextIntlPlugin(
  './i18n.ts'
);
 
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{
      protocol: 'https',
      hostname: 'storage.googleapis.com',
      pathname: '/**'
    }]
  },
};
 
export default withNextIntl(nextConfig);