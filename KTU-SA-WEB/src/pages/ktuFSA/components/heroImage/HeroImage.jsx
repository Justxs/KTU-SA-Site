import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import styles from './HeroImage.module.css';
import FSA_DATA from '../../../../constants/FsaUnits';
import PlaceHolder from '../../../../assets/placeholder2.png';
import GoBackButton from '../../../../components/goBackButton/GoBackButton';
import AbsoluteContainerMargin from '../../../../components/marginContainers/ObsoluteContainerMargin';

export default function HeroImage(props) {
  const { fsaName } = props;
  const { t } = useTranslation();
  const fsa = FSA_DATA(t).find((f) => f.name === fsaName);
  const elementRef = useRef(null);
  if (!fsa) {
    return <h1>FSA not found</h1>;
  }

  const fsaStyles = {
    backgroundColor: fsa.backgroundColor,
    color: fsa.textColor,
    borderColor: fsa.borderColor,
  };

  return (
    <AbsoluteContainerMargin elementRef={elementRef}>
      <div className={styles.Container} style={fsaStyles} ref={elementRef}>
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
              alt=""
            />
          </div>
          <div
            className={styles.Divder}
            style={{
              borderColor: fsa.borderColor,
            }}
          />
        </div>
      </div>
    </AbsoluteContainerMargin>
  );
}

HeroImage.propTypes = {
  fsaName: PropTypes.string.isRequired,
};
