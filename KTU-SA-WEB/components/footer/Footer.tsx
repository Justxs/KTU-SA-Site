import React from "react";
import styles from "./FooterBar.module.css";
import KTUSA from "@public/icons/logos/KTUSA_baltas.svg";
import NAVIGATION_LINKS from "@constants/NavigationLinks";
import Link from "next/link";
import OptimizedImage from "@/components/common/OptimizedImage";
import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations();
  const navigationLinks = NAVIGATION_LINKS(t);

  return (
    <footer className={styles.Container}>
      <div className={styles.LogoContainer}>
        <OptimizedImage alt="KTU SA white logo" src={KTUSA} width={84} />
        <div className={styles.Info}>
          <div>{t("common.ktusa")}</div>
          <a
            href="https://maps.app.goo.gl/NfpCNmDJq65sUCqc7"
            rel="noopener noreferrer"
            target="_blank"
            className={styles.Link}
          >
            K. Donelaičio g. 73
            <div>LT-44029 Kaunas</div>
          </a>
          <a
            href="mailto:info@ktusa.lt"
            rel="noopener noreferrer"
            target="_blank"
            className={styles.Link}
          >
            info@ktusa.lt
          </a>
        </div>
      </div>
      <div className={styles.NavigationSection}>
        {navigationLinks.map((section) => (
          <div key={section.header} className={styles.NavSection}>
            <div className={styles.Header}>{section.header}</div>
            {section.links.map((link) => (
              <Link key={link.path} href={link.path} className={styles.Link}>
                {link.name}
              </Link>
            ))}
          </div>
        ))}
        <div
          className={styles.NavSection2}
          style={{ fontFamily: "PFDinTextPro-Medium" }}
        >
          <a
            href="https://lsp.lt/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.Link}
          >
            <span>{t("navbar.lspFull")}</span>
          </a>
          <Link href="/Contacts" className={styles.Link}>
            <span>{t("navbar.contacts")}</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}
