import Footer from "@components/footer/Footer";
import SideMargins from "@components/margins/SideMargins";
import Navbar from "@components/navbar/Navbar";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server";
import { Analytics } from "@vercel/analytics/react";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Script from "next/script";
import { SOCIAL_LINKS } from "@/constants/SocialLinks";

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
      <body>
        <script src="https://fienta.com/embed.js" defer />
        <Script
          id="org-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name:
                lang === "lt"
                  ? "KTU Studentų atstovybė"
                  : "KTU Students Association",
              url: process.env.KTU_SA_WEB_URL || "http://localhost:3000",
              logo:
                (process.env.KTU_SA_WEB_URL || "http://localhost:3000") +
                "/icons/logos/KTU_SA_Logo.svg",
              sameAs: [
                SOCIAL_LINKS.FACEBOOK,
                SOCIAL_LINKS.INSTAGRAM,
                SOCIAL_LINKS.LINKEDIN,
              ],
            }),
          }}
        />
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

export async function generateMetadata({
  params,
}: {
  params: { lang: string };
}): Promise<Metadata> {
  const { lang } = params;
  if (!hasLocale(routing.locales, lang)) {
    return {};
  }
  const t = await getTranslations({ locale: lang });
  const title = t("common.ktusa");
  const description = t("navbar.about.description");
  const base = new URL(process.env.KTU_SA_WEB_URL || "http://localhost:3000/");
  const localesMap = Object.fromEntries(
    routing.locales.map((l) => [l, `/${l}`])
  );

  return {
    title: {
      default: title,
      template: `%s - KTU SA`,
    },
    description,
    alternates: {
      canonical: `/${lang}`,
      languages: {
        ...localesMap,
        "x-default": "/",
      },
    },
    openGraph: {
      title,
      description,
      type: "website",
      url: `/${lang}`,
      locale: lang === "lt" ? "lt_LT" : "en_US",
      images: ["/opengraph-image.jpg"],
    },
    twitter: {
      card: "summary_large_image",
      site: "@KTU_SA",
      title,
      description,
      images: ["/twitter-image.jpg"],
    },
    metadataBase: base,
  };
}
