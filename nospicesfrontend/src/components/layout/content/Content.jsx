import React from "react";
import RezeptSuche from "../../rezeptsuche/RezeptSuche";

import styles from "./Content.module.css";
export default function Content() {
  return (
    <div className={styles.contentContainer}>
      <RezeptSuche />
      {/* <div className="contentContainer">Nospices</div> */}
    </div>
  );
}
