import React from "react";
import styles from "./ExpandNavigation.module.css";
import { motion } from "framer-motion";
import PropTypes from "prop-types";

export default function ExpandNavigation(props) {
  const { open } = props;

  const variants = {
    open: {
      scaleY: 1,
      opacity: 1,
      transition: {
        duration: 0.25,
        ease: "easeInOut",
      },
    },
    closed: {
      scaleY: 0,
      opacity: 0,
      transition: {
        duration: 0.25,
        ease: "easeInOut",
      },
    },
  };

  return (
    <motion.div
      className={styles.Container}
      variants={variants}
      initial="closed"
      animate={open ? "open" : "closed"}
      exit="closed"
      style={{ originY: 0 }}
    >
      expandNavigation
    </motion.div>
  );
}

ExpandNavigation.propTypes = {
  open: PropTypes.bool.isRequired,
};
