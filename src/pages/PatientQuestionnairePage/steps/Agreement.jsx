import React from "react";
import styles from "./Agreement.module.scss";

const Agreement = ({ onNext }) => (
  <div className="step step-welcome">
    <p className="welcome-text">Before you start please fill your questionnaire</p>
    <button className="btn next-btn" onClick={onNext}>Next</button>
  </div>
);

export default Agreement;
