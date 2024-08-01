import Footer from '@components/footer/Footer';
import SideMargins from '@components/margins/SideMargins';
import Navbar from '@components/navbar/Navbar';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

type Props = {
  children: React.ReactNode,
  params: {lang: string},
}

export default async function RootLayout(props : Readonly<Props>) {
  const {children, params} = props;
  const messages = await getMessages();

  return (
    <html lang={params.lang}>
      <NextIntlClientProvider messages={messages}>
        <body>
          <SideMargins>
            <Navbar />
          </SideMargins>
          {children}
          <Footer />
        </body>
      </NextIntlClientProvider>
    </html>
  );
}

