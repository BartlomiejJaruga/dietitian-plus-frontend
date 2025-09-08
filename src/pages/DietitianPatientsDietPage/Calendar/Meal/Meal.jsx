import styles from "./Meal.module.scss";
import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Dish from "./Dish/Dish";

export default function Meal({ item, overlay = false, onAddDish, onRemoveDish }) {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
        useSortable({ id: item.id });

    const style = overlay
        ? {}
        : {
              transform: CSS.Transform.toString(transform),
              transition,
              opacity: isDragging ? 0.3 : 1
          };

    const handleAdd = (e) => {
        e.stopPropagation();
        if (typeof onAddDish === "function") onAddDish();
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={`${styles.item} ${overlay ? styles.overlay : ""}`}
        >
            <div className={styles.head}>
                <div
                    className={styles.handle}
                    {...(overlay ? {} : attributes)}
                    {...(overlay ? {} : listeners)}
                >
                    ☰
                </div>
                <div className={styles.title}>{item.title}</div>
            </div>

            <div className={styles.content}>
                <div className={styles.dishes}>
                    {item.dishes?.map((dish) => (
                        <Dish
                            key={dish.id}
                            text={dish.text}
                            onRemove={overlay ? undefined : () => onRemoveDish(item.id, dish.id)}
                            overlay={overlay}
                        />
                    ))}
                    {!overlay && (
                        <button
                            className={styles.addDish}
                            onClick={handleAdd}
                            aria-label="Add dish"
                        >
                            +
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
