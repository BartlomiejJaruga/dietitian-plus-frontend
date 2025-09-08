import React, { useState, useEffect } from "react";
import {
    DndContext,
    rectIntersection,
    PointerSensor,
    useSensor,
    useSensors,
    DragOverlay,
    useDroppable
} from "@dnd-kit/core";
import { SortableContext, arrayMove, verticalListSortingStrategy } from "@dnd-kit/sortable";
import Meal from "./Meal/Meal";
import styles from "./Calendar.module.scss";
import DishModal from "./DishModal/DishModal";
import axiosInstance from "@services/axiosInstance";
import { useToastNotification } from "@hooks/useToastNotification";
import { toastNotificationTypesENUM } from "@enums";
import { useSelector } from "react-redux";

let itemCounter = 1000;
let dishCounter = 1;

function Column({ 
    colId, 
    items = [], 
    overId, 
    activeId,
    findContainer, 
    onRequestAddMeal, 
    onAddDish, 
    onRemoveDish 
}) {
    const { setNodeRef } = useDroppable({ id: colId });

    const showHighlightForItem = (itemId) =>
        overId === itemId && findContainer(activeId) !== findContainer(overId);

    const showEmptyHighlight = () =>
        items.length === 0 && overId === colId && findContainer(activeId) !== findContainer(overId);

    return (
        <div ref={setNodeRef} className={styles.column} data-column={colId}>
            {items.length === 0 && showEmptyHighlight() && (
                <div className={`${styles.placeholder} ${styles.highlight}`}>Drop here</div>
            )}

            {items.map((meal) => (
                <React.Fragment key={meal.id}>
                    {showHighlightForItem(meal.id) && <div className={`${styles.placeholder} ${styles.highlight}`} />}
                    <Meal
                        item={meal}
                        onAddDish={() => onAddDish(meal.id, colId)}
                        onRemoveDish={(mealId, dishId) => onRemoveDish(mealId, dishId, colId)}
                    />
                </React.Fragment>
            ))}

            <div
                className={styles.placeholder}
                onClick={() => onRequestAddMeal(colId)}
            >
                Click to add new meal
            </div>
        </div>
    );
}

export default function Calendar() {
    const dietitianId = useSelector((state) => state.auth.userData.uuid);
    const toastNotification = useToastNotification();
    const [columns, setColumns] = useState({
        col1: [],
        col2: [],
        col3: [], col4: [], col5: [], col6: [], col7: []
    });

    const [activeId, setActiveId] = useState(null);
    const [activeItemSnapshot, setActiveItemSnapshot] = useState(null);
    const [overId, setOverId] = useState(null);

    const [showModal, setShowModal] = useState(false);
    const [pendingColId, setPendingColId] = useState(null);
    const [mealTitle, setMealTitle] = useState("");

    const [dishModal, setDishModal] = useState({ open: false, colId: null, mealId: null });

    const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));

    const [dietitianDishes, setDietitianDishes] = useState([]);

    const sortDishesAlfabetically = (dishes) => {
        return [...dishes].sort((a, b) =>
            a.dish_name.toLowerCase().localeCompare(b.dish_name.toLowerCase())
        );
    };

    const fetchDietitianDishes = async () => {
        try {
            const response = await axiosInstance.get(`/v1/dietitians/${dietitianId}/dishes`);
            const sortedData = sortDishesAlfabetically(response.data);
            setDietitianDishes(sortedData);
        } catch (error) {
            console.log(error);
            toastNotification(
                "Failed to load your dishes.",
                toastNotificationTypesENUM.ERROR
            );
        }
    };

    useEffect(() => {
        const loadInitialData = async () => {
            fetchDietitianDishes();
        };
        loadInitialData();
    }, []);

    const findContainer = (id) => {
        if (!id) return null;
        if (Object.prototype.hasOwnProperty.call(columns, id)) return id;
        return Object.keys(columns).find((col) => columns[col].some((meal) => meal.id === id));
    };

    const handleDragStart = ({ active }) => {
        setActiveId(active.id);
        const container = findContainer(active.id);
        if (container) {
            const found = columns[container].find((m) => m.id === active.id);
            if (found) setActiveItemSnapshot({ ...found, dishes: [...(found.dishes || [])] });
        }
    };

    const handleDragOver = ({ active, over }) => {
        if (!over) {
            setOverId(null);
            return;
        }

        const activeContainer = findContainer(active.id);

        if (Object.prototype.hasOwnProperty.call(columns, over.id)) {
            setOverId(over.id === activeContainer ? null : over.id);
            return;
        }

        const overContainer = findContainer(over.id);
        if (!activeContainer || !overContainer) {
            setOverId(null);
            return;
        }
        setOverId(activeContainer !== overContainer ? over.id : null);
    };

    const handleDragEnd = ({ active, over }) => {
        setActiveId(null);
        setActiveItemSnapshot(null);
        setOverId(null);
        if (!over) return;
        const activeContainer = findContainer(active.id);

        if (Object.prototype.hasOwnProperty.call(columns, over.id)) {
            const overContainer = over.id;
            if (!activeContainer || activeContainer === overContainer) return;
            setColumns((prev) => {
                const from = [...prev[activeContainer]];
                const to = [...prev[overContainer]];
                const idx = from.findIndex((m) => m.id === active.id);
                if (idx === -1) return prev;
                const [moved] = from.splice(idx, 1);
                to.push(moved);
                return { ...prev, [activeContainer]: from, [overContainer]: to };
            });
            return;
        }

        const overContainer = findContainer(over.id);
        if (!activeContainer || !overContainer) return;

        if (activeContainer === overContainer) {
            setColumns((prev) => {
                const items = prev[activeContainer];
                const oldIndex = items.findIndex((i) => i.id === active.id);
                const newIndex = items.findIndex((i) => i.id === over.id);
                if (oldIndex === -1 || newIndex === -1 || oldIndex === newIndex) return prev;
                return { ...prev, [activeContainer]: arrayMove(items, oldIndex, newIndex) };
            });
        } else {
            setColumns((prev) => {
                const from = [...prev[activeContainer]];
                const to = [...prev[overContainer]];
                const oldIndex = from.findIndex((i) => i.id === active.id);
                if (oldIndex === -1) return prev;
                const [moved] = from.splice(oldIndex, 1);
                const newIndex = to.findIndex((i) => i.id === over.id);
                const insertIndex = newIndex === -1 ? to.length : newIndex;
                to.splice(insertIndex, 0, moved);
                return { ...prev, [activeContainer]: from, [overContainer]: to };
            });
        }
    };

    const handleDragCancel = () => {
        setActiveId(null);
        setActiveItemSnapshot(null);
        setOverId(null);
    };

    const handleConfirmAddItem = () => {
        if (!pendingColId || !mealTitle.trim()) {
            setShowModal(false);
            return;
        }
        const newItemId = `item-${itemCounter++}`;
        const newItem = { id: newItemId, title: mealTitle.trim(), dishes: [] };
        setColumns((prev) => ({ ...prev, [pendingColId]: [...prev[pendingColId], newItem] }));
        setMealTitle("");
        setPendingColId(null);
        setShowModal(false);
    };

    const handleCancelAddItem = () => {
        setMealTitle("");
        setPendingColId(null);
        setShowModal(false);
    };

    const handleRemoveDish = (mealId, dishId, colId) => {
        setColumns((prev) => {
            const updated = prev[colId].map((meal) => {
                if (meal.id !== mealId) return meal;
                return { ...meal, dishes: meal.dishes.filter((d) => d.id !== dishId) };
            });
            return { ...prev, [colId]: updated };
        });
    };

    const handleAddDish = (mealId, colId) => {
        setDishModal({ open: true, colId, mealId });
    };

    const confirmAddDish = (text) => {
        setColumns((prev) => {
            const updated = prev[dishModal.colId].map((meal) => {
                if (meal.id !== dishModal.mealId) return meal;
                const newDish = { id: `dish-${dishCounter++}`, text };
                return { ...meal, dishes: [...meal.dishes, newDish] };
            });
            return { ...prev, [dishModal.colId]: updated };
        });
        setDishModal({ open: false, colId: null, mealId: null });
    };

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={rectIntersection}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}
            onDragCancel={handleDragCancel}
        >
            <div className={styles.board}>
                {Object.keys(columns).map((colId) => (
                    <SortableContext key={colId} items={columns[colId].map((i) => i.id)} strategy={verticalListSortingStrategy}>
                        <Column
                            colId={colId}
                            items={columns[colId]}
                            overId={overId}
                            activeId={activeId}
                            findContainer={findContainer}
                            onRequestAddMeal={(col) => { setPendingColId(col); setShowModal(true); }}
                            onAddDish={handleAddDish}
                            onRemoveDish={handleRemoveDish}
                        />
                    </SortableContext>
                ))}
            </div>

            <DragOverlay>{activeItemSnapshot ? <Meal item={activeItemSnapshot} overlay /> : null}</DragOverlay>

            {showModal && (
                <div className={styles.modalBackdrop}>
                    <div className={styles.modal}>
                        <h3>Add new meal</h3>
                        <span className={styles.label}>Meal Name:</span>
                        <input
                            type="text"
							name="meal_name"
                            value={mealTitle}
                            onChange={(e) => setMealTitle(e.target.value)}
                            placeholder="ex. Breakfast"
                        />
                        <div className={styles.modalButtons}>
                            <button className={styles.confirm_button} onClick={handleConfirmAddItem}>Confirm</button>
                            <button className={styles.cancel_button} onClick={handleCancelAddItem}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}

            <DishModal
                open={dishModal.open}
                onClose={() => setDishModal({ open: false, colId: null, mealId: null })}
                onConfirm={confirmAddDish}
                dietitianDishes={dietitianDishes}
            />
        </DndContext>
    );
}
