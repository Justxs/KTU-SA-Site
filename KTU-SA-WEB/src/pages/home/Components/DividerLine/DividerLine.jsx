import React from "react";
import styles from "./DividerLine.module.css";
import { motion } from "framer-motion";

function DividerLine() {
  const text = "TAVO GALIMYBĖ ĮKVĖPTI, VEIKTI IR KEISTI! ";
  const doubledText = text + text; // Repeat the text twice for a continuous scroll

  const scrollTextAnimation = {
    animate: {
      x: ["0%", `-${100 / 2}%`], // 100% divided by the number of repeated texts
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
          {doubledText}
        </motion.span>
      </div>
    </div>
  );
}

export default DividerLine;
