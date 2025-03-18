import "@styles/globals.css";
import { Metadata } from "next";

type Props = {
  children: React.ReactNode;
};

export const metadata: Metadata = {
  title: {
    default: "KTU Studentų atstovybė",
    template: "%s - KTU SA",
  },
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/en",
      lt: "/lt",
    },
  },
  description:
    "Įsikurus 1993 m. KTU SA veikla yra universiteto studentų interesų atstovavimas universitete ir Lietuvos studentų sąjungoje.",
  openGraph: {
    title: "KTU Studentų atstovybė",
    type: "website",
    locale: "lt",
    url: "/",
  },
  twitter: {
    site: "@KTU_SA",
  },
  metadataBase: new URL(process.env.KTU_SA_WEB_URL || "http://localhost:3000/"),
};

export default function RootLayout({ children }: Readonly<Props>) {
  return children;
}
