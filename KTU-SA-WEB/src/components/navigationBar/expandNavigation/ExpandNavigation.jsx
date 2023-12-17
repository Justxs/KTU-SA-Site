import React from "react";
import styles from "./ExpandNavigation.module.css";
import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export default function ExpandNavigation(props) {
  const { open, currentSection } = props;

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
      {currentSection && (
        <>
          <p className={styles.Description}>{currentSection.description}</p>
          <div className={styles.Section}>
            <h2 className={styles.Header}>{currentSection.header}</h2>
            {currentSection.links.map((link) => (
              <Link key={link.path} to={link.path} className={styles.Link}>
                {link.name}
              </Link>
            ))}
          </div>
        </>
      )}
    </motion.div>
  );
}

ExpandNavigation.propTypes = {
  open: PropTypes.bool.isRequired,
  currentSection: PropTypes.shape({
    header: PropTypes.string.isRequired,
    description: PropTypes.string,
    links: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        path: PropTypes.string.isRequired,
      })
    ),
  }),
};

ExpandNavigation.defaultProps = {
  currentSection: null,
};
