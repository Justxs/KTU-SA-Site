import Footer from '@components/footer/Footer';
import SideMargins from '@components/margins/SideMargins';
import Navbar from '@components/navbar/Navbar';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Analytics } from '@vercel/analytics/react';

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function RootLayout({
  children,
  params,
}: Readonly<Props>) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <NextIntlClientProvider messages={messages}>
        <body>
          <SideMargins>
            <Navbar />
          </SideMargins>
          {children}
          <Analytics />
          <Footer />
        </body>
      </NextIntlClientProvider>
    </html>
  );
}
