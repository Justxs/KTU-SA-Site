import React, { useState } from "react";
import SectionName from "../../../../components/sectionName/SectionName";
import styles from "./Fsa.module.css";
import KTU_SA_Logo from "../../../../assets/KTU_SA_Logo.png";
import { Button, styled } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import FSA_DATA from "../../../../constants/FsaUnits";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import AllSaUnitsLogo from "../../../../components/allSaUnitsLogo/AllSaUnitsLogo";
import { useTranslation } from "react-i18next";

const FsaButton = styled(Button)({
  color: "#0E2643",
  background: "#fff",
  textTransform: "none",
  padding: "12px",
  fontFamily: "PFDinTextPro-Regular",
  fontWeight: "600",
  letterSpacing: "1px",
  fontSize: "20px",
  textAlign: "start",
  "&:hover": {
    background: "#fff",
    color: "#4A9FE6",
  },
});

export default function Fsa() {
  const { t } = useTranslation();
  const [currentLogo, setCurrentLogo] = useState(KTU_SA_Logo);
  const navigate = useNavigate();

  const fsaData = FSA_DATA(t);

  const logoVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <div className={styles.SectionContainer}>
      <SectionName title={t('sections.fsa')} />
      <div className={styles.Container}>
        <div className={styles.LogoContainer}>
          <motion.img
            key={currentLogo}
            src={currentLogo}
            alt="FSA Logo"
            className={styles.Logo}
            variants={logoVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.5 }}
          />
        </div>
        <div className={styles.Render}>
          <AllSaUnitsLogo />
        </div>
        <div className={styles.FsaList}>
          {fsaData.map((fsa) => (
            <div
              key={fsa.name}
              onMouseEnter={() => setCurrentLogo(fsa.logo)}
              onMouseLeave={() => setCurrentLogo(KTU_SA_Logo)}
            >
              <FsaButton onClick={() => navigate(`/fsa/${fsa.name}`)}>
                {fsa.fullName} {fsa.name}
                <ArrowForwardIcon className={styles.Arrow} />
              </FsaButton>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
