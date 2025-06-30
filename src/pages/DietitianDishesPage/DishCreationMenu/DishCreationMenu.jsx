import styles from './DishCreationMenu.module.scss';
import React, { useState } from 'react';
import ProductSearchBar from '@components/ProductSearchBar/ProductSearchBar';
import { useSelector } from 'react-redux';

let rowIdCounter = 0;

export default function DishCreationMenu({ productsData }) {
    const units = useSelector((state) => state.units.unitsData);
    const [dishName, setDishName] = useState("");
    const [dishRecipe, setDishRecipe] = useState("");
    const [dishProductRows, setDishProductRows] = useState([]);

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
                    kcal: 0, protein: 0, carbs: 0, fats: 0, fiber: 0
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
        rows[index].nutrition_values = {
            kcal: +(base.kcal * factor).toFixed(2),
            protein: +(base.protein * factor).toFixed(2),
            carbs: +(base.carbs * factor).toFixed(2),
            fats: +(base.fats * factor).toFixed(2),
            fiber: +(base.fiber * factor).toFixed(2),
        };

        return [...rows];
    };

    const removeRow = (rowId) => {
        setDishProductRows(prev => prev.filter(row => row.id !== rowId));
    };

    const handleDishSave = () => {
        console.log("DishName:", dishName);
        console.log("DishProducts:", dishProductRows);
        console.log("DishRecipe:", dishRecipe);
    };

    const handleDishDiscard = () => {
        setDishName("");
        setDishRecipe("");
        setDishProductRows([]);
    };

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
                    className={styles.dish_name}
                />

                <div className={styles.products_list_container}>
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
                        onClick={addNewRow}
                    >
                        +
                    </button>
                </div>

                <div className={styles.total_nutritions_container}>
                    <span>P:</span><span>0</span>
                    <span>C:</span><span>0</span>
                    <span>F:</span><span>0</span>
                    <span>Fib:</span><span>0</span>
                    <span>GL:</span><span>0</span>
                    <span>GI:</span><span>0</span>
                    <span>CHO:</span><span>0</span>
                    <span>PFE:</span><span>0</span>
                </div>

                <div className={styles.total_kcal_container}>
                    <span>Kcal:</span><span>0.00</span>
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
