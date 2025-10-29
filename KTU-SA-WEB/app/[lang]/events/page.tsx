import { getEvents } from "@api/GetEvents";
import EmptyData from "@components/emptyData/EmptyData";
import HeroImage from "@components/heroImage/HeroImage";
import { getTranslations, setRequestLocale } from "next-intl/server";
import styles from "./Events.module.css";
import { Grid } from "@mui/material";
import EventCard from "./components/EventCard";
import SideMargins from "@components/margins/SideMargins";
import { getHeroImage } from "@api/GetHeroImage";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const t = await getTranslations({ locale: lang });
  const heroSection = await getHeroImage(lang, t("sections.events"));

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
  const events = await getEvents(lang);

  return (
    <>
      <HeroImage sectionName={t("sections.events")} />
      <EmptyData length={events?.length} />
      <SideMargins>
        <Grid container spacing={1} mb={2}>
          {events &&
            events.map((event, index) => (
              <Grid
                size={{ xs: 12, lg: 6, xl: index < 2 ? 6 : 4 }}
                key={event.id}
              >
                <div className={styles.CardContainer}>
                  <EventCard event={event} isActive={index < 2} />
                </div>
              </Grid>
            ))}
        </Grid>
      </SideMargins>
    </>
  );
}
