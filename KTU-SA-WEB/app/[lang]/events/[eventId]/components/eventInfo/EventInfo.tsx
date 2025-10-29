import React from "react";
import { Tooltip } from "@mui/material";
import styles from "./EventInfo.module.css";
import dateService from "@utils/dateService";
import Image from "next/image";
import FacebookIcon from "@public/icons/social/icon-facebook.svg";
import SA_UNITS_LOGO from "@constants/SaUnitsLogos";
import { getTranslations } from "next-intl/server";
import OptimizedImage from "@components/common/OptimizedImage";

type Props = {
  facebookUrl: string;
  organizers: Array<string>;
  startDate: Date;
  endDate: Date;
  address?: string;
};

export default async function EventInfo(props: Props) {
  const { facebookUrl, organizers, startDate, endDate, address } = props;

  const t = await getTranslations();

  const matchedLogos = SA_UNITS_LOGO.filter((saUnit) =>
    organizers.some(
      (org: string) =>
        saUnit.name.replace(/\s+/g, "_").toLowerCase() === org.toLowerCase()
    )
  );

  return (
    <div className={styles.Container}>
      <div className={styles.Info}>
        <div className={styles.Details}>
          <div className={styles.DetailsTitle}>{t("event.organisers")}</div>
          <div className={styles.Oranisers}>
            {matchedLogos.map((unit) => (
              <OptimizedImage
                className={styles.OrganisersLogo}
                key={unit.name}
                src={unit.logo}
                alt={unit.name}
                sizes="100%"
                width={0}
                height={0}
              />
            ))}
          </div>
        </div>
        {address && (
          <div className={styles.Details}>
            <>
              <div className={styles.DetailsTitle}>{t("event.address")}</div>
              <div className={styles.DetailsInfo}>{address}</div>
            </>
          </div>
        )}
        <div className={styles.Details}>
          <div className={styles.DetailsTitle}>
            {t("event.facebookEventSocial")}
          </div>
          <Tooltip title={t("event.facebookEvent")}>
            <a
              href={facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.DetailsInfo}
            >
              <OptimizedImage
                src={FacebookIcon}
                alt="Facebook event"
                sizes="100%"
                width={0}
                height={0}
              />
            </a>
          </Tooltip>
        </div>
        <div className={styles.Details}>
          <div className={styles.DetailsTitle}>{t("event.startsAt")}</div>
          <div className={styles.DetailsInfo}>
            {dateService.formatToDateAndTime(startDate)}
          </div>
        </div>
        <div className={styles.Details}>
          <div className={styles.DetailsTitle}>{t("event.endsAt")}</div>
          <div className={styles.DetailsInfo}>
            {dateService.formatToDateAndTime(endDate)}
          </div>
        </div>
      </div>
    </div>
  );
}
