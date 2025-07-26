import styles from './DishTile.module.scss';

import axiosInstance from '@services/axiosInstance';
import Trashcan from '@icons/trashcan.svg?react';
import Pencil from '@icons/pencil.svg?react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentlyEditedDish } from '@slices/dishesTabSlice';

export default function DishTile({ dishData, allDishes, setDishes }){
    const dispatch = useDispatch();
    const currentlyEditedDish = useSelector((state) => state.dishesTab.currentlyEditedDish);

    const handleDelete = async (dishId) => {
        if(currentlyEditedDish && dishId === currentlyEditedDish.dish.dish_id){
            console.log("Can't delete dish that is being edited!");
            return;
        }

        try{
            await axiosInstance.delete(`/v1/dishes/${dishId}`);

            setDishes(allDishes.filter(dish => dish.dish_id !== dishData.dish_id));
        }
        catch(error){
            console.error(error);
        }
    }

    const handleEdit = async (dishId) => {
        if(currentlyEditedDish && dishId === currentlyEditedDish.dish.dish_id) return;

        try {
            const response = await axiosInstance.get(`/v1/dishes/${dishId}/products`);

            console.log(response);

            const dishToEditData = {
                dishData: response.data,
            }

            dispatch(setCurrentlyEditedDish(dishToEditData));
        }
        catch(error){
            console.error(error);
        }
    }

    return (
        <>
            <div className={styles.main_container}>
                <div className={styles.dish_top_section}>
                    <h3 className={styles.dish_name}>{dishData.dish_name}</h3>
                    
                    <button className={styles.dish_edit_button} onClick={() => {
                        handleEdit(dishData.dish_id);
                    }}>
                        <Pencil className={styles.pencil_icon}/>
                    </button>
                    <button className={styles.dish_delete_button} onClick={() => {
                        handleDelete(dishData.dish_id);
                    }}>
                        <Trashcan className={styles.trashcan_icon}/>
                    </button>
                </div>
                
                <div className={styles.dish_bottom_section}>
                    <div className={styles.dish_kcal_container}>
                        <span className={styles.bolded}>Kcal:</span>
                        <span>{dishData.nutrition_values.kcal.toFixed(2)}</span>
                    </div>
                    <div className={styles.dish_nutrition_values}>
                        <div>
                            <span className={styles.bolded}>P:</span>
                            <span>{dishData.nutrition_values.protein.toFixed(2)}</span>
                            <span className={styles.bolded}>C:</span>
                            <span>{dishData.nutrition_values.carbs.toFixed(2)}</span>
                            <span className={styles.bolded}>F:</span>
                            <span>{dishData.nutrition_values.fats.toFixed(2)}</span>
                        </div>
                        <div>
                            <span className={styles.bolded}>Fib:</span>
                            <span>{dishData.nutrition_values.fiber.toFixed(2)}</span>
                            <span className={styles.bolded}>GL:</span>
                            <span>{dishData.nutrition_values.glycemic_load.toFixed(2)}</span>
                            <span className={styles.bolded}>GI:</span>
                            <span>{dishData.nutrition_values.glycemic_index.toFixed(2)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}