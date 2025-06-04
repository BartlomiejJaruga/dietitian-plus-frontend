import React from "react";
import styles from "./BasicInformation.module.scss";

function BasicInformation({ onNext, onBack }) {
  return (
    <div className={styles.step}>
      <h2 className={styles.heading}>Basic Information</h2>
      <div className={styles.pageArea}>
        <div className={styles.leftSection}>
          <div className={styles.textPanel}>
            <h3>Personal Information - Step Towards a Healthier You</h3>
            <p>To provide you with the most accurate and personalized nutritional guidance, we kindly ask you to fill in the following details about yourself. Information such as your date of birth, weight, height, and physical activity level will allow your dietitian to better understand your needs and prepare a tailored plan that supports your goals.</p>
          </div>
          <div className={styles.textPanel}>
            <h3>Disclaimer</h3>
            <p>Providing false or inaccurate information may mislead your dietitian and result in an inappropriate dietary plan, which could negatively impact your health. Dietitian+ is not responsible for any consequences arising from incorrect or misleading data entered into the system.
By submitting this form, you confirm that the provided information is accurate to the best of your knowledge and that you agree to the processing and storage of your personal data in accordance with applicable data protection regulations and our Privacy Policy.</p>
          </div>

            <button className={styles.backBtn} onClick={onBack}>Back</button>
        </div>
        <div className={styles.middleSection}>
           <form className={styles.formGrid}>
              <div className={styles.formGroup}>
              <label>Birth date</label>
              <input type="date" />
            </div>
            <div className={styles.formGroup}>
              <label>Gender</label>
              <select>
                <option value=""></option>
                <option value="female">Female</option>
                <option value="male">Male</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className={styles.formGroup}>
              <label>Height</label>
              <input type="number" placeholder="ex. 180cm" />
            </div>
            <div className={styles.formGroup}>
              <label>Weight</label>
              <input type="number" placeholder="ex. 80kg" />
            </div>
            <div className={styles.formGroup}>
              <label>PAL</label>
              <select>
                <option value=""></option>
                <option value="High">High</option>
                <option value="Middle">Middle</option>
                <option value="Low">Low</option>
              </select>
            </div>
          </form>
          <div>
            <p>Your BMI</p>
            <p>Fill all fields to see your BMI</p>

            <p>Your Daily Caloric Requirement</p>
            <p>Fill all fields to see your DCR</p>
          </div>
        </div>
        <div className={styles.rightSection}>
            <button className={styles.nextBtn} onClick={onNext}>Next</button>
        </div>
        </div>
      </div>
  );
}

export default BasicInformation;
