import React, { useState, useEffect } from "react";
import styles from "./BasicInformation.module.scss";

function BasicInformation({ onNext, onBack }) {

  const [birthDate, setBirthDate] = useState("");
  const [gender, setGender] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [pal, setPal] = useState("");

  const [bmi, setBmi] = useState(null);
  const [dcr, setDcr] = useState(null);

  useEffect(() => {
    const h = parseFloat(height);
    const w = parseFloat(weight);

    if (h > 0 && w > 0) {
      const bmiValue = w / ((h / 100) ** 2);
      setBmi(bmiValue.toFixed(2));
    } else {
      setBmi(null);
    }

    if (h > 0 && w > 0 && gender && birthDate && pal) {
      const age = getAge(birthDate);
      let bmr;

      if (gender === "male") {
        bmr = 10 * w + 6.25 * h - 5 * age + 5;
      } else if (gender === "female") {
        bmr = 10 * w + 6.25 * h - 5 * age - 161;
      } else {
        bmr = 10 * w + 6.25 * h - 5 * age;
      }

      const palFactor = {
        Low: 1.4,
        Middle: 1.6,
        High: 1.8
      }[pal];

      setDcr((bmr * palFactor).toFixed(0));
    } else {
      setDcr(null);
    }
  }, [birthDate, gender, height, weight, pal]);

  const getAge = (birthDateStr) => {
    const birth = new Date(birthDateStr);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  const getBmiClass = (bmi) => {
    if (!bmi) return "";
      const value = parseFloat(bmi);
    if (value < 18.5) return styles.bmiWarning;
    if (value < 25) return styles.bmiGood;
    if (value < 30) return styles.bmiNormal;
    return styles.bmiBad;
  };

  return (
    <div className={styles.step}>
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
          <h2 className={styles.heading}>Personal Information</h2>
           <form className={styles.formGrid}>
              <div className={styles.formGroup}>
              <label>Birth date</label>
              <input type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} />
            </div>
            <div className={styles.formGroup}>
              <label>Gender</label>
              <select value={gender} onChange={(e) => setGender(e.target.value)}>
                <option value=""></option>
                <option value="female">Female</option>
                <option value="male">Male</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className={styles.formGroup}>
              <label>Height</label>
              <input type="number" placeholder="ex. 180cm" value={height} onChange={(e) => setHeight(e.target.value)} />
            </div>
            <div className={styles.formGroup}>
              <label>Weight</label>
              <input type="number" placeholder="ex. 80kg" value={weight} onChange={(e) => setWeight(e.target.value)} />
            </div>
            <div className={styles.formGroup}>
              <label>PAL</label>
              <select value={pal} onChange={(e) => setPal(e.target.value)}>
                <option value=""></option>
                <option value="High">High</option>
                <option value="Middle">Middle</option>
                <option value="Low">Low</option>
              </select>
            </div>
          </form>
          <div className={styles.outputInformation}>
            <p><strong>Your BMI:</strong></p>
            <p className={`${styles.bmiStatus} ${getBmiClass(bmi)}`}>
              {bmi ? `${bmi} (kg/m²)` : "Fill all fields to see your BMI"}
            </p><br></br>
            <br></br>
            <p><strong>Your Daily Caloric Requirement (DCR):</strong></p>
            <p>{dcr ? `${dcr} kcal` : "Fill all fields to see your DCR"}</p>
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
