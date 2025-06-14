import React, { useState } from "react";
import styles from "./AllergiesAndDislikedProducts.module.scss";

const mockDatabase = ["Carrots", "Milk", "Peanuts", "Fish", "Strawberries", "Tomatoes", "Eggs", "Shellfish", "Soy", "Wheat", "Tree nuts", "Corn", "Gluten"];

function AllergiesAndDislikeProducts({ onNext, onBack }) {
  const [allergyInput, setAllergyInput] = useState("");
  const [dislikeInput, setDislikeInput] = useState("");

  const [allergies, setAllergies] = useState([]);
  const [dislikedProducts, setDislikedProducts] = useState([]);

  const addAllergy = (item = allergyInput.trim()) => {
    if (item && !allergies.includes(item)) {
      setAllergies([...allergies, item]);
      setAllergyInput("");
    }
  };

  const addDislike = (item = dislikeInput.trim()) => {
    if (item && !dislikedProducts.includes(item)) {
      setDislikedProducts([...dislikedProducts, item]);
      setDislikeInput("");
    }
  };

  const removeItem = (setter, list, index) => {
    const updated = list.filter((_, i) => i !== index);
    setter(updated);
  };

  const filterSuggestions = (input) =>
    mockDatabase.filter((item) =>
      item.toLowerCase().includes(input.toLowerCase())
    ).slice(0, 100);

  return (
    <div className={styles.step}>
      <div className={styles.pageArea}>
        <div className={styles.leftSection}>
          <div className={styles.textPanel}>
            <h3>Health & Dietary Restrictions – Help Us Keep You Safe</h3>
            <p>To ensure your dietary plan is not only effective but also safe, please provide information about any allergies, food intolerances, medical conditions, or dietary restrictions you may have. This helps your dietitian avoid potentially harmful ingredients and tailor recommendations that respect your health needs.</p>
          </div>
          <div className={styles.textPanel}>
            <h3>Disclaimer</h3>
            <p>Failing to disclose allergies or health-related dietary restrictions - or providing inaccurate information - may lead to serious health risks. Dietetitian+ is not liable for any adverse effects resulting from omitted or incorrect data regarding your medical or dietary limitations.
By submitting this information, you confirm that it is accurate and complete to the best of your knowledge. You also agree to the processing and secure storage of this data in compliance with our Privacy Policy and applicable data protection laws.</p>
          </div>
          <button className={styles.backBtn} onClick={onBack}>Back</button>
        </div>

        <div className={styles.middleSection}>
          <h2 className={styles.heading}>Allergies & Disliked Products</h2>
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label>Search for allergens and illnesses</label>
              <input
                type="text"
                placeholder="e.g. Peanuts"
                value={allergyInput}
                onChange={(e) => setAllergyInput(e.target.value)}
              />
              {allergyInput && (
                <ul className={styles.suggestions}>
                  {filterSuggestions(allergyInput).map((item, index) => (
                    <li key={index} onClick={() => addAllergy(item)}>{item}</li>
                  ))}
                </ul>
              )}
            </div>

            <div className={styles.formGroup}>
              <label>Search for Disliked Products</label>
              <input
                type="text"
                placeholder="e.g. Broccoli"
                value={dislikeInput}
                onChange={(e) => setDislikeInput(e.target.value)}
              />
              {dislikeInput && (
                <ul className={styles.suggestions}>
                  {filterSuggestions(dislikeInput).map((item, index) => (
                    <li key={index} onClick={() => addDislike(item)}>{item}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>

        <div className={styles.rightSection}>
          <div className={styles.tableContainer}>
            <h4>Allergies and illnesses</h4>
            <ul className={styles.list}>
              {allergies.map((item, index) => (
                <li key={index}>
                  {item}
                  <button onClick={() => removeItem(setAllergies, allergies, index)}>✕</button>
                </li>
              ))}
            </ul>
            </div>
            <div className={styles.tableContainer}>
            <h4>Disliked Products</h4>
            <ul className={styles.list}>
              {dislikedProducts.map((item, index) => (
                <li key={index}>
                  {item}
                  <button onClick={() => removeItem(setDislikedProducts, dislikedProducts, index)}>✕</button>
                </li>
              ))}
            </ul>
          </div>
          <button className={styles.nextBtn} onClick={onNext}>Next</button>
        </div>
      </div>
    </div>
  );
}

export default AllergiesAndDislikeProducts;
