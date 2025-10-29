import Footer from "@components/footer/Footer";
import SideMargins from "@components/margins/SideMargins";
import Navbar from "@components/navbar/Navbar";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Analytics } from "@vercel/analytics/react";
import { LANGUAGES } from "@constants/Languages";

type Props = {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
};

export default async function RootLayout({
  children,
  params,
}: Readonly<Props>) {
  const { lang } = await params;
  const messages = await getMessages({ locale: lang });

  return (
    <html lang={lang}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <SideMargins>
            <Navbar />
          </SideMargins>
          {children}
          <Analytics />
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

export async function generateStaticParams(): Promise<Array<{ lang: string }>> {
  return Object.values(LANGUAGES).map((l) => ({ lang: l }));
}
