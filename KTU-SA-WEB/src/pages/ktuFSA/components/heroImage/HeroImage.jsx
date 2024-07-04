import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import styles from './HeroImage.module.css';
import FSA_DATA from '../../../../constants/FsaUnits';
import GoBackButton from '../../../../components/goBackButton/GoBackButton';

export default function HeroImage(props) {
  const {
    fsaName,
    coverUrl,
  } = props;

  const { t } = useTranslation();
  const fsa = FSA_DATA(t).find((f) => f.name === fsaName);

  const elementRef = useRef(null);
  const [Height, setHeight] = useState({});

  useEffect(() => {
    const updateSize = () => {
      if (elementRef.current) {
        const height = elementRef.current.offsetHeight;
        setHeight(height);
      }
    };

    const observer = new ResizeObserver(updateSize);
    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.unobserve(elementRef.current);
      }
    };
  }, [elementRef]);

  if (!fsa) {
    return <h1>FSA not found</h1>;
  }

  const fsaStyles = {
    backgroundColor: fsa.backgroundColor,
    color: fsa.textColor,
    borderColor: fsa.borderColor,
  };

  return (
    <div style={{ marginBottom: `${Height + 50}px` }}>
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
              src={coverUrl}
              alt=""
            />
          </div>
          <div
            className={styles.Divider}
            style={{ borderColor: fsa.borderColor, top: `${Height}px` }}
          />
        </div>
      </div>
    </div>
  );
}

HeroImage.propTypes = {
  fsaName: PropTypes.string.isRequired,
  coverUrl: PropTypes.string.isRequired,
};
