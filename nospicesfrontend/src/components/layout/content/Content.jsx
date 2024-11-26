import React from "react";
import RezeptSuche from "../../rezeptsuche/RezeptSuche";
import styles from "./Content.module.css";

export default function Content() {
  return (
    <div className={styles.contentContainer}>
      <h1>Willkommen Nospices!</h1>
      <RezeptSuche />
    </div>
  );
}
