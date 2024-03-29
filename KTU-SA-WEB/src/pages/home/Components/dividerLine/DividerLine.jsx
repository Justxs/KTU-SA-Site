import React from "react";
import styles from "./DividerLine.module.css";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export default function DividerLine() {
  const {t} = useTranslation();
  const text = t("home.dividerLine");

  const scrollTextAnimation = {
    animate: {
      x: ["0%", `-${100 / 2}%`],
      transition: {
        duration: 10,
        ease: "linear",
        repeat: Infinity,
      },
    },
  };

  return (
    <div className={styles.Container}>
      <div className={styles.Divider}>
        <motion.span
          className={styles.Text}
          variants={scrollTextAnimation}
          animate="animate"
        >
          {text}
        </motion.span>
      </div>
    </div>
  );
}
