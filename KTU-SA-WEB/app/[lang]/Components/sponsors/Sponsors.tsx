import { Tooltip } from "@mui/material";
import styles from "./Sponsors.module.css";
import SectionName from "@components/sectionName/SectionName";
import Image from "next/image";
import { getSponsors } from "@api/GetSponsors";
import { getTranslations } from "next-intl/server";
import OptimizedImage from "@components/common/OptimizedImage";

export default async function Sponsors() {
  const t = await getTranslations();
  const sponsors = await getSponsors();

  if (sponsors.length === 0) return null;

  return (
    <div className={styles.Container}>
      <SectionName title={t("sections.sponsors")} />
      <div className={styles.Logos}>
        {sponsors.map((sponsor) => (
          <a
            href={sponsor.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.Logo}
            key={sponsor.id}
          >
            <Tooltip title={sponsor.name}>
              <div
                style={{
                  position: "relative",
                  width: "200px",
                  height: "100px",
                }}
              >
                <OptimizedImage
                  src={sponsor.logoId}
                  alt={sponsor.name}
                  fill
                  sizes="100%"
                  style={{
                    objectFit: "contain",
                  }}
                />
              </div>
            </Tooltip>
          </a>
        ))}
      </div>
    </div>
  );
}
