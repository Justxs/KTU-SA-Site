import React from "react";
import styles from "./DividerLine.module.css";
import { motion } from "framer-motion";

export default function DividerLine() {
  const text = "TAVO GALIMYBĖ ĮKVĖPTI, VEIKTI IR KEISTI! TAVO GALIMYBĖ ĮKVĖPTI, VEIKTI IR KEISTI!";

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
