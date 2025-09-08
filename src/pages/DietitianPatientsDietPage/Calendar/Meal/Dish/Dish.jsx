import styles from "./Dish.module.scss";

import React from "react";
import Trashcan from "@icons/trashcan.svg?react";
import ArrowLeft from "@icons/simple-arrow-left.svg?react";

export default function Dish({ text, onRemove, overlay }) {
  return (
    <div className={styles.dish}>
      <span>{text}</span>
      {(overlay || onRemove) && (
        <button onClick={overlay ? undefined : onRemove} className={styles.delete_button}>
            <Trashcan className={styles.delete_icon} />
        </button>
      )}
    </div>
  );
}

