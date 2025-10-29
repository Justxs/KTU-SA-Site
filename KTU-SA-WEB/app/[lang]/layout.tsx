import Footer from "@components/footer/Footer";
import SideMargins from "@components/margins/SideMargins";
import Navbar from "@components/navbar/Navbar";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { Analytics } from "@vercel/analytics/react";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";

type Props = {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
};

export default async function RootLayout({
  children,
  params,
}: Readonly<Props>) {
  const { lang } = await params;
  if (!hasLocale(routing.locales, lang)) {
    notFound();
  }

  setRequestLocale(lang);
  const messages = await getMessages({ locale: lang });

  return (
    <html lang={lang}>
      <script src="https://fienta.com/embed.js" defer/>
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
  return routing.locales.map((locale) => ({ lang: locale }));
}
