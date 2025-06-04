import React from "react";
import styles from "./AllergiesAndDislikedProducts.module.scss";

function AllergiesAndDislikeProducts({ onNext, onBack }) {
  return (
    <div className={styles.step}>
      <h2 className={styles.heading}>Allergies & Disliked Products</h2>
      <form className={styles.formGrid}>
        <div className={styles.formGroup}>
          <label>Allergies</label>
          <textarea placeholder="List your allergies..."></textarea>
        </div>
        <div className={styles.formGroup}>
          <label>Disliked Products</label>
          <textarea placeholder="List any foods you dislike..."></textarea>
        </div>
      </form>
      <div className={styles.stepButtons}>
        <button className={styles.backBtn} onClick={onBack}>Back</button>
        <button className={styles.nextBtn} onClick={onNext}>Next</button>
      </div>
    </div>
  );
}

export default AllergiesAndDislikeProducts;
