import React from "react";
import styles from "./HeroImage.module.css";
import PropTypes from "prop-types";
import FSA_DATA from "../../../../constants/FsaUnits";
import PlaceHolder from "../../../../assets/placeholder2.png";
import GoBackButton from "../../../../components/goBackButton/GoBackButton";
import { useTranslation } from "react-i18next";

export default function HeroImage(props) {
  const { fsaName } = props;
  const { t } = useTranslation();
  const fsa = FSA_DATA(t).find((f) => f.name === fsaName);

  if (!fsa) {
    return <h1>FSA not found</h1>;
  }

  const fsaStyles = {
    backgroundColor: fsa.backgroundColor,
    color: fsa.textColor,
    borderColor: fsa.borderColor,
  };

  return (
    <div className={styles.Container} style={fsaStyles}>
      <div className={styles.TextContainer}>
        <div className={styles.ImageContainer}>
          <GoBackButton color={fsa.textColor} onHover={fsa.backgroundColor} />
          <img className={styles.Image} alt={fsa.fullName} src={fsa.logo} />
        </div>
        <div className={styles.Text}>
          <h1>{fsa.name}</h1>
          <p>{fsa.fullName}</p>
        </div>
        <div className={styles.HeroImageContainer}>
          <img
            className={styles.HeroImage}
            style={{
              borderColor: fsa.borderColor,
              background: fsa.borderColor,
            }}
            src={PlaceHolder}
          />
        </div>
        <div
          className={styles.Divder}
          style={{
            borderColor: fsa.borderColor,
          }}
        ></div>
      </div>
    </div>
  );
}

HeroImage.propTypes = {
  fsaName: PropTypes.string.isRequired,
};
