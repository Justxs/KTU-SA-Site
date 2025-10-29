import styles from "./SocialMedia.module.css";
import SocialLinks from "./components/SocialLinks";
import DepthSvg from "@public/assets/design-elements/Depth.svg";
import SmileySvg from "@public/assets/design-elements/Smiley.svg";
import InfinitySvg from "@public/assets/design-elements/Infinity.svg";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { PHOTOS } from "@constants/photos";
import OptimizedImage from "@components/common/OptimizedImage";

export default function SocialMedia() {
  const t = useTranslations();

  return (
    <div className={styles.Section} id={t("sections.follow")}>
      <div className={styles.Triangle} />
      <div>
        <div className={styles.Container}>
          <div className={styles.Text}>
            {t("sections.follow").toUpperCase()}
          </div>
          <SocialLinks />
          <div className={styles.ImagesContainer}>
            <div className={styles.Image}>
              <OptimizedImage
                src={PHOTOS.DISCUSSION_PHOTO_URL}
                alt="Discussion"
                fill
                sizes="100%"
                style={{
                  objectFit: "cover",
                }}
              />
            </div>
            <div className={styles.Image}>
              <OptimizedImage
                src={PHOTOS.SHM_GIRLS_PHOTO_URL}
                alt="KTU FSA SHM girls"
                fill
                sizes="100%"
                style={{
                  objectFit: "cover",
                }}
              />
            </div>
            <div className={styles.Image}>
              <OptimizedImage
                src={PHOTOS.KTU_SA_PRESIDENT_PHOTO_URL}
                alt="KTU SA President running"
                fill
                sizes="100%"
                style={{
                  objectFit: "contain",
                }}
              />
            </div>
            <div className={styles.Image}>
              <OptimizedImage
                src={PHOTOS.KTU_SA_PHOTO_URL}
                alt="KTU SA"
                fill
                sizes="100%"
                style={{
                  objectFit: "cover",
                }}
              />
            </div>
            <OptimizedImage
              className={styles.Icon}
              src={DepthSvg}
              alt=""
              width="0"
              height="0"
            />
            <OptimizedImage
              className={styles.Icon}
              src={SmileySvg}
              alt=""
              width="0"
              height="0"
            />
            <OptimizedImage
              className={styles.Icon}
              src={InfinitySvg}
              alt=""
              width="0"
              height="0"
            />
          </div>
        </div>
      </div>
      <div className={styles.TriangleDown} />
    </div>
  );
}
