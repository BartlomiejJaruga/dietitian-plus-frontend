import React, { useState, useMemo } from "react";
import styles from "./DishModal.module.scss";

export default function DishModal({ open, onClose, onConfirm, dietitianDishes }) {
    const [value, setValue] = useState("");
    const [selected, setSelected] = useState(null);

    const filtered = useMemo(() => {
        if (!value.trim()) return [];
        return dietitianDishes.filter((dish) =>
            dish.dish_name.toLowerCase().includes(value.toLowerCase())
        );
    }, [value, dietitianDishes]);

    if (!open) return null;

    const handleConfirm = () => {
        if (selected) {
            const dish = dietitianDishes.find((d) => d.dish_id === selected);
            if (dish) {
                onConfirm(dish.dish_name);
            }
        } else {
            return;
        }
        setValue("");
        setSelected(null);
    };

    const handleCancel = () => {
        setValue("");
        setSelected(null);
        onClose();
    };

    return (
        <div className={styles.backdrop}>
            <div className={styles.modal}>
                <h2>Add new dish</h2>
                <input
                    type="text"
                    name="dish_name"
                    placeholder="Search dishes..."
                    value={value}
                    className={styles.search_input}
                    onChange={(e) => {
                        setValue(e.target.value);
                        setSelected(null);
                    }}
                />

                {selected !== null && (
                    <span className={styles.selected_dish_header}>Selected dish:</span>
                )}

                {filtered.length > 0 && (
                    <ul className={styles.suggestions}>
                        {filtered.map((dish) => (
                            <li
                                key={dish.dish_id}
                                className={`${styles.suggestion} ${
                                    selected === dish.dish_id ? styles.selected : ""
                                }`}
                                onClick={() => {
                                    setSelected(dish.dish_id);
                                    setValue(dish.dish_name);
                                }}
                            >
                                {dish.dish_name}
                            </li>
                        ))}
                    </ul>
                )}

                <div className={styles.actions}>
                    <button
                        className={styles.button_confirm}
                        onClick={handleConfirm}
                        disabled={!value.trim() && !selected}
                    >
                        Confirm
                    </button>
                    <button className={styles.button_cancel} onClick={handleCancel}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}
