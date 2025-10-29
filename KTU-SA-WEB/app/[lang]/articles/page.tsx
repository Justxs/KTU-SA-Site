import { Grid } from "@mui/material";
import styles from "./Articles.module.css";
import ArticleListCard from "./components/ArticleListCard";
import HeroImage from "@components/heroImage/HeroImage";
import EmptyData from "@components/emptyData/EmptyData";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getArticles } from "@api/GetArticles";
import SideMargins from "@components/margins/SideMargins";
import { getHeroImage } from "@api/GetHeroImage";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const t = await getTranslations({ locale: lang });
  const heroSection = await getHeroImage(lang, t("sections.articles"));

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
  const articles = await getArticles(lang);

  return (
    <>
      <HeroImage sectionName={t("sections.articles")} />
      <SideMargins>
        <div className={styles.Margin}>
          <EmptyData length={articles?.length} />
          <Grid container spacing={2}>
            {articles &&
              articles.map((article, index) => (
                <Grid key={article.id}>
                  <div className={styles.CardContainer}>
                    <ArticleListCard article={article} isActive={index < 2} />
                  </div>
                </Grid>
              ))}
          </Grid>
        </div>
      </SideMargins>
    </>
  );
}
