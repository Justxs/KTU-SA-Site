import styles from "./HeroImage.module.css";
import HeroImg from "@public/assets/design-elements/MainHeroImage.png";
import Smiley from "@public/assets/design-elements/Smiley.svg";
import { useTranslations } from "next-intl";
import OptimizedImage from "@components/common/OptimizedImage";

export default function HeroImage() {
  const t = useTranslations();

  return (
    <div className={styles.Container}>
      <div className={styles.Text}>
        <div className={styles.Title}>{t("common.ktusa")}</div>
        <div className={styles.Description}>{t("home.text")}</div>
      </div>
      <div className={styles.ImagesContainer}>
        <OptimizedImage
          src={HeroImg}
          alt="Hero image"
          sizes="90%"
          className={styles.Image}
        />
      </div>
      <OptimizedImage src={Smiley} className={styles.Svg} alt="" />
    </div>
  );
}
