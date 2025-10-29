import { getHeroImage } from "@api/GetHeroImage";
import { getPage } from "@api/GetPage";
import HeroImage from "@components/heroImage/HeroImage";
import Body from "@components/htmlBody/Body";
import SideMargins from "@components/margins/SideMargins";
import { getTranslations, setRequestLocale } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const t = await getTranslations({ locale: lang });
  const heroSection = await getHeroImage(lang, t("pages.socialHelp"));

  return {
    title: heroSection.title,
    description: heroSection.description,
    openGraph: {
      images: [
        {
          url: heroSection.imgSrc,
        },
      ],
    },
    twitter: {
      site: "@KTU_SA",
      images: [heroSection.imgSrc],
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  setRequestLocale(lang);
  const t = await getTranslations();
  const page = await getPage(lang, t("pages.socialHelp"));

  return (
    <>
      <HeroImage sectionName={t("pages.socialHelp")} />
      <SideMargins>
        <Body htmlBody={page?.body} />
      </SideMargins>
    </>
  );
}
