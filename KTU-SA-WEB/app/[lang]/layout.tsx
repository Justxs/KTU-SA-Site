import Footer from '@components/footer/Footer';
import Navbar from '@components/navbar/Navbar';
import JsonLd from '@components/seo/JsonLd';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { routing } from '@/i18n/routing';
import { notFound } from 'next/navigation';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import ThemeRegistry from '@theme/ThemeRegistry';
import { getBaseUrl, toAbsoluteUrl } from '@/lib/seo/siteUrl';

export const revalidate = 3600;

type Props = {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
};

const baseUrl = getBaseUrl();

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${baseUrl}#organization`,
  name: 'KTU Studentų atstovybė',
  alternateName: 'KTU SA',
  url: baseUrl,
  logo: toAbsoluteUrl('/opengraph-image.png'),
  sameAs: [
    'https://www.facebook.com/KTU.SA',
    'https://www.instagram.com/ktu_sa',
    'https://www.linkedin.com/company/ktu-student-atstovyb-',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    availableLanguage: ['Lithuanian', 'English'],
  },
};

export default async function RootLayout({ children, params }: Readonly<Props>) {
  const { lang } = await params;
  if (!hasLocale(routing.locales, lang)) {
    notFound();
  }

  setRequestLocale(lang);
  const messages = await getMessages({ locale: lang });

  return (
    <html lang={lang}>
      <body>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <JsonLd data={organizationJsonLd} />
        <AppRouterCacheProvider>
          <NextIntlClientProvider messages={messages}>
            <ThemeRegistry>
              <Navbar />
              <main id="main-content">{children}</main>
              <Analytics />
              <SpeedInsights />
              <Footer />
            </ThemeRegistry>
          </NextIntlClientProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}

export async function generateStaticParams(): Promise<Array<{ lang: string }>> {
  return routing.locales.map((locale) => ({ lang: locale }));
}
