import styles from './DishCreationMenu.module.scss';
import React, { useEffect, useState } from 'react';
import ProductSearchBar from '@components/ProductSearchBar/ProductSearchBar';
import { useSelector } from 'react-redux';

let rowIdCounter = 0;

export default function DishCreationMenu({ productsData }) {
    const units = useSelector((state) => state.units.unitsData);
    const [dishName, setDishName] = useState("");
    const [dishRecipe, setDishRecipe] = useState("");
    const [dishProductRows, setDishProductRows] = useState([]);
    const [dishErrors, setDishErrors] = useState({
        nameError: null,
        productsQuantityError: null,
        productNotChosenError: null,
    });
    const [hasTriedToSave, setHasTriedToSave] = useState(false);

    useEffect(() => {
        if(hasTriedToSave) {
            isDishDataCorrect();
        }
    }, [dishName, dishProductRows]);

    const defaultUnit = units.find(u => u.unit_name === "Gram") || units[0];

    const addNewRow = () => {
        setDishProductRows(prev => [
            ...prev,
            {
                id: rowIdCounter++,
                product: null,
                amount: 1,
                unit: defaultUnit,
                nutrition_values: {
                    kcal: 0, protein: 0, carbs: 0, fats: 0, fiber: 0,
                    glycemic_index: 0, glycemic_load: 0, cho: 0, pfe: 0
                }
            }
        ]);
    };

    const handleProductSelect = (rowId, productId) => {
        const selectedProduct = productsData.find(p => p.product_id === productId);
        if (!selectedProduct) return;

        setDishProductRows(prev => {
            const newRows = prev.map(row =>
                row.id === rowId ? { ...row, product: selectedProduct } : row
            );
            return recalculateNutrition(newRows, rowId);
        });
    };

    const handleAmountChange = (rowId, value) => {
        setDishProductRows(prev => {
            const newRows = prev.map(row =>
                row.id === rowId ? { ...row, amount: isNaN(value) ? 0 : value } : row
            );
            return recalculateNutrition(newRows, rowId);
        });
    };

    const handleUnitChange = (rowId, unitId) => {
        const newUnit = units.find(u => u.unit_id === unitId);
        setDishProductRows(prev => {
            const newRows = prev.map(row =>
                row.id === rowId ? { ...row, unit: newUnit } : row
            );
            return recalculateNutrition(newRows, rowId);
        });
    };

    const recalculateNutrition = (rows, rowId) => {
        const index = rows.findIndex(row => row.id === rowId);
        if (index === -1 || !rows[index].product) return rows;

        const row = rows[index];
        const grams = (row.amount || 0) * (row.unit?.grams || 0);
        const factor = grams / 100;

        const base = row.product.nutrition_values;
        const gi = +(base.glycemic_index * factor).toFixed(2);
        const carbs = +(base.carbs * factor).toFixed(2);
        const fiber = +(base.fiber * factor).toFixed(2);
        const protein = +(base.protein * factor).toFixed(2);
        const fats = +(base.fats * factor).toFixed(2);

        const cho = +(carbs - fiber).toFixed(2);
        const gl = +((gi * cho) / 100).toFixed(2);
        const pfe = +((protein * 4 + carbs * 4 + fats * 9) / 100).toFixed(2);

        rows[index].nutrition_values = {
            kcal: +(base.kcal * factor).toFixed(2),
            protein,
            carbs,
            fats,
            fiber,
            glycemic_index: gi,
            glycemic_load: gl,
            cho,
            pfe
        };

        return [...rows];
    };

    const removeRow = (rowId) => {
        setDishProductRows(prev => prev.filter(row => row.id !== rowId));
    };

    const isDishDataCorrect = () => {
        let isDishDataCorrect = true;

        if(dishName === ""){
            setDishErrors((prev) => ({ ...prev, nameError: "Field is required" }));
            isDishDataCorrect = false;
        }
        else{
            setDishErrors((prev) => ({ ...prev, nameError: null }));
        }

        if(dishProductRows.length < 1){
            setDishErrors((prev) => ({
                ...prev, 
                productsQuantityError: "At least 1 product is required" 
            }));
            isDishDataCorrect = false;
        }
        else{
            setDishErrors((prev) => ({ ...prev, productsQuantityError: null }));
        }

        if(dishProductRows.length > 0 && dishProductRows.some(productRow => productRow.product === null)){
            setDishErrors((prev) => ({
                ...prev, 
                productNotChosenError: "All products need to be selected" 
            }));
            isDishDataCorrect = false;
        }
        else{
            setDishErrors((prev) => ({ ...prev, productNotChosenError: null }));
        }

        return isDishDataCorrect;
    }

    const handleDishSave = () => {
        setHasTriedToSave(true);
        if(!isDishDataCorrect()) return;

        console.log("DishName:", dishName);
        console.log("DishProducts:", dishProductRows);
        console.log("DishRecipe:", dishRecipe);
    };

    const handleDishDiscard = () => {
        setDishName("");
        setDishRecipe("");
        setDishProductRows([]);
    };

    const totalNutrition = dishProductRows.reduce((totals, row) => {
        const n = row.nutrition_values;
        totals.kcal += n.kcal || 0;
        totals.protein += n.protein || 0;
        totals.carbs += n.carbs || 0;
        totals.fats += n.fats || 0;
        totals.fiber += n.fiber || 0;
        totals.glycemic_index += n.glycemic_index || 0;
        totals.glycemic_load += n.glycemic_load || 0;
        totals.cho += n.cho || 0;
        totals.pfe += n.pfe || 0;
        return totals;
    }, {
        kcal: 0, protein: 0, carbs: 0, fats: 0, fiber: 0,
        glycemic_index: 0, glycemic_load: 0, cho: 0, pfe: 0
    });

    return (
        <div className={styles.main_container}>
            <div className={styles.above_container}>
                <div>Dish creation menu</div>
            </div>
            <div className={styles.dish_creation_menu_container}>
                <input
                    type="text"
                    name="dishName"
                    value={dishName}
                    placeholder="Enter your dish name here"
                    onChange={(e) => setDishName(e.target.value)}
                    className={`${styles.dish_name} ${dishErrors.nameError ? styles["dish_name--error"] : ""}`}
                />
                {dishErrors.nameError && (
                    <p className={styles.error_message}>{dishErrors.nameError}</p>
                )}

                <div className={`${styles.products_list_container} ${
                    (dishErrors.productsQuantityError || dishErrors.productNotChosenError)
                    ? styles["products_list_container--error"] 
                    : ""
                }`}>
                    <span>Product Name</span>
                    <span>Amount</span>
                    <span>Unit</span>
                    <span>Kcal</span>
                    <span>P</span>
                    <span>C</span>
                    <span>F</span>
                    <span>Fib</span>
                    <span></span>

                    {dishProductRows.map((row) => (
                        <React.Fragment key={row.id}>
                            <ProductSearchBar
                                key={row.id}
                                productsData={productsData}
                                fontSize="1em"
                                onProductSelect={(productId) => handleProductSelect(row.id, productId)}
                            />

                            <input
                                type="number"
                                value={row.amount}
                                min="0"
                                step="0.1"
                                className={styles.product_amount_input}
                                onChange={(e) => handleAmountChange(row.id, parseFloat(e.target.value))}
                            />

                            <select
                                value={row.unit.unit_id}
                                className={styles.product_unit_select}
                                onChange={(e) => handleUnitChange(row.id, parseInt(e.target.value))}
                            >
                                {units.map((unit) => (
                                    <option key={unit.unit_id} value={unit.unit_id}>
                                        {unit.unit_name}
                                    </option>
                                ))}
                            </select>

                            <span>{row.nutrition_values.kcal}</span>
                            <span>{row.nutrition_values.protein}</span>
                            <span>{row.nutrition_values.carbs}</span>
                            <span>{row.nutrition_values.fats}</span>
                            <span>{row.nutrition_values.fiber}</span>
                            <button
                                className={styles.remove_row_button}
                                onClick={() => removeRow(row.id)}
                            >
                                -
                            </button>
                        </React.Fragment>
                    ))}

                    <button
                        className={styles.add_new_row_button}
                        onClick={() => {
                            addNewRow();
                        }}
                    >
                        +
                    </button>
                </div>
                {dishErrors.productsQuantityError && (
                    <p className={styles.error_message}>{dishErrors.productsQuantityError}</p>
                )}
                {dishErrors.productNotChosenError && (
                    <p className={styles.error_message}>{dishErrors.productNotChosenError}</p>
                )}

                <div className={styles.total_nutritions_container}>
                    <div>
                        <span>P:</span>
                        <span>{totalNutrition.protein.toFixed(2)}</span>
                    </div>
                    <div>
                        <span>C:</span>
                        <span>{totalNutrition.carbs.toFixed(2)}</span>
                    </div>
                    <div>
                        <span>F:</span>
                        <span>{totalNutrition.fats.toFixed(2)}</span>
                    </div>
                    <div>
                        <span>Fib:</span>
                        <span>{totalNutrition.fiber.toFixed(2)}</span>
                    </div>
                    <div>
                        <span>GL:</span>
                        <span>{totalNutrition.glycemic_load.toFixed(2)}</span>
                    </div>
                    <div>
                        <span>GI:</span>
                        <span>{totalNutrition.glycemic_index.toFixed(2)}</span>
                    </div>
                    <div>
                        <span>CHO:</span>
                        <span>{totalNutrition.cho.toFixed(2)}</span>
                    </div>
                    <div>
                        <span>PFE:</span>
                        <span>{totalNutrition.pfe.toFixed(2)}</span>
                    </div>
                </div>

                <div className={styles.total_kcal_container}>
                    <span>Kcal:</span><span>{totalNutrition.kcal.toFixed(2)}</span>
                </div>

                <textarea
                    className={styles.recipe}
                    value={dishRecipe}
                    onChange={(e) => setDishRecipe(e.target.value)}
                    placeholder="Enter your recipe here"
                />
            </div>

            <div className={styles.below_container}>
                <button onClick={handleDishDiscard}>Discard</button>
                <button onClick={handleDishSave}>Save</button>
            </div>
        </div>
    );
}
