import { getContacts } from "@api/GetContacts";
import HeroImage from "@components/heroImage/HeroImage";
import { SA_UNITS } from "@constants/saUnits";
import { getTranslations, setRequestLocale } from "next-intl/server";
import MainContacts from "./components/MainContacts";
import ContactCard from "@components/contactCard/ContactCard";
import styles from "./Contacts.module.css";
import { getHeroImage } from "@api/GetHeroImage";
import SideMargins from "@components/margins/SideMargins";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const t = await getTranslations({ locale: lang });
  const heroSection = await getHeroImage(lang, t("sections.contacts"));

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
  const contacts = await getContacts(lang, SA_UNITS.CSA);

  if (contacts?.length === 0) return null;

  return (
    <>
      <HeroImage sectionName={t("sections.contacts")} />
      <SideMargins>
        <MainContacts saUnit={SA_UNITS.CSA} />
        <div className={styles.ContactCards}>
          {contacts.map((contact) => (
            <ContactCard key={contact.id} contact={contact} />
          ))}
        </div>
      </SideMargins>
    </>
  );
}
