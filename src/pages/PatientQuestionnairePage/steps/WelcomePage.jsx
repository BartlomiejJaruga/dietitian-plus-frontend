import React from "react";
import styles from "./WelcomePage.module.scss";

const WelcomePage = ({ onNext }) => (
  <div className={styles.box}>
    <p className={styles.text}>Before you start please fill your questionnaire</p>
    <button className={styles.button} onClick={onNext}>Next</button>
  </div>
);

export default WelcomePage;
