import React from "react";
import styles from "./NavigationButton.module.css";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import PropTypes from "prop-types";

export default function NavigationButton(props) {
  const { title, expanded, onExpand } = props;

  return (
    <button className={styles.Button} onClick={() => onExpand(title)}>
      {title}
      {expanded ? (
        <ArrowRightIcon sx={{ color: "#B5BEC4" }} />
      ) : (
        <ArrowDropDownIcon sx={{ color: "#B5BEC4" }} />
      )}
    </button>
  );
}

NavigationButton.propTypes = {
  title: PropTypes.string.isRequired,
  expanded: PropTypes.bool.isRequired,
  onExpand: PropTypes.func.isRequired,
};
