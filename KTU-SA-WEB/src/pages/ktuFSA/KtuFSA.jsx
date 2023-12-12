import React from "react";
import { useParams } from "react-router-dom";
import HeroImage from "./components/heroImage/HeroImage";
import styles from "./KtuFSA.module.css";

function KtuFSA() {
  const { fsaName } = useParams();

  return (
    <div className={styles.Container}>
      <HeroImage fsaName={fsaName} />
    </div>
  );
}

export default KtuFSA;
