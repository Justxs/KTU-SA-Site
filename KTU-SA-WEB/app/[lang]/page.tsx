import SideMargins from "@components/margins/SideMargins";
import Articles from "./Components/articles/Articles";
import Duk from "./Components/duk/Duk";
import HeroImage from "./Components/heroImage/HeroImage";
import SocialMedia from "./Components/socialMedia/SocialMedia";
import Sponsors from "./Components/sponsors/Sponsors";
import Values from "./Components/values/Values";
import FsaSection from "@components/fsaSection/FsaSection";
import EventsSection from "@components/eventsSection/EventsSection";
import { setRequestLocale } from "next-intl/server";
import { getEvents } from "@api/GetEvents";

export default async function Index({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  setRequestLocale(lang);
  const events = await getEvents(lang);

  return (
    <>
      <SideMargins>
        <HeroImage />
        <Values />
        <Articles />
        <EventsSection events={events} />
        <Sponsors />
      </SideMargins>
      <Duk />
      <SideMargins>
        <div style={{ paddingTop: "44px" }}>
          <FsaSection />
        </div>
      </SideMargins>
      <SocialMedia />
    </>
  );
}
