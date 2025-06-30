import styles from './DishCreationMenu.module.scss';

import { useState } from 'react';
import ProductSearchBar from '@components/ProductSearchBar/ProductSearchBar';


export default function DishCreationMenu({ productsData }){
    const [dishName, setDishName] = useState("");
    const [dishProductsRows, setDishProductsRows] = useState(0);
    const [dishProducts, setDishProducts] = useState([]);
    const [dishRecipe, setDishRecipe] = useState("");

    const handleDishSave = () => {
        console.log("DishName: ", dishName);
        console.log("DishProducts: ", dishProducts);
        console.log("DishRecipe: ", dishRecipe);
    }

    const handleDishDiscard = () => {
        setDishName("");
        setDishProducts([]);
        setDishProductsRows(0);
        setDishRecipe("");
    }

    return (
        <>
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
                        <span>Value</span>
                        <span>Unit</span>
                        <span>Kcal</span>
                        <span>P</span>
                        <span>C</span>
                        <span>F</span>
                        <span>Fib</span>
                        <span></span>
                        {dishProducts.length > 0 && (
                            dishProducts.map((product => (
                                <>
                                    <span>Name</span>
                                    <span>0.0</span>
                                    <span>0.0</span>
                                    <span>0.0</span>
                                    <span>0.0</span>
                                    <span>0.0</span>
                                    <span>0.0</span>
                                    <span>0.0</span>
                                    <span>D</span>
                                </>
                            )))
                        )}
                        {dishProductsRows - dishProducts.length > 0 && (
                            Array.from({ length: dishProductsRows }).map((_) => (
                                <>  
                                    <ProductSearchBar 
                                        productsData={productsData} 
                                        fontSize="1em" 
                                        onProductSelect={(productId) => {
                                            console.log(productId);
                                        }}
                                    />
                                    <span>0.0</span>
                                    <span>0.0</span>
                                    <span>0.0</span>
                                    <span>0.0</span>
                                    <span>0.0</span>
                                    <span>0.0</span>
                                    <span>0.0</span>
                                    <span>D</span>
                                </>
                            ))
                        )}
                        <button onClick={() => setDishProductsRows((prev) => prev + 1)}>+</button>
                    </div>
                    <div className={styles.total_nutritions_container}>
                        <span>P:</span>
                        <span>0</span>
                        <span>C:</span>
                        <span>0</span>
                        <span>F:</span>
                        <span>0</span>
                        <span>Fib:</span>
                        <span>0</span>
                        <span>GL:</span>
                        <span>0</span>
                        <span>GI:</span>
                        <span>0</span>
                        <span>CHO:</span>
                        <span>0</span>
                        <span>PFE:</span>
                        <span>0</span>
                    </div>
                    <div className={styles.total_kcal_container}>
                        <span>Kcal:</span>
                        <span>0.00</span>
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
        </>
    )
}