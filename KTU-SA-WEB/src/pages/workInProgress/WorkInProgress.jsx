import React from 'react';
import styles from "./WorkInProgress.module.css";
import WIP from "../../assets/work-in-progress.png";

export default function WorkInProgress() {
  return (
    <div className={styles.Container}>
      <h1>
                Work In Progress
      </h1 >
      <img width="400" src={WIP}></img>
    </div>
  );
}