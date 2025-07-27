import styles from './DishTile.module.scss';

import axiosInstance from '@services/axiosInstance';
import Trashcan from '@icons/trashcan.svg?react';
import Pencil from '@icons/pencil.svg?react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentlyEditedDish } from '@slices/dishesTabSlice';
import ConfirmationModal from '@components/ConfirmationModal/ConfirmationModal';
import { useToastNotification } from '@hooks/useToastNotification';
import { toastNotificationTypesENUM } from '@enums';

export default function DishTile({ dishData, allDishes, setDishes }){
    const toastNotification = useToastNotification();
    const dispatch = useDispatch();
    const currentlyEditedDish = useSelector((state) => state.dishesTab.currentlyEditedDish);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const handleDelete = async (dishId) => {
        if(currentlyEditedDish && dishId === currentlyEditedDish.dish.dish_id){
            toastNotification(
                "Can't delete dish that is currently being edited.",
                toastNotificationTypesENUM.ERROR
            );
            return;
        }

        setShowDeleteModal(true);
    }

    const handleConfirmDelete = async (dishId) => {
        try{
            await axiosInstance.delete(`/v1/dishes/${dishId}`);

            setDishes(allDishes.filter(dish => dish.dish_id !== dishData.dish_id));

            toastNotification(
                "Dish successfully deleted.",
                toastNotificationTypesENUM.SUCCESS
            );
        }
        catch(error){
            console.error(error);
            toastNotification(
                "Failed to delete dish.",
                toastNotificationTypesENUM.ERROR
            );
        }
        finally{
            setShowDeleteModal(false);
        }
    }

    const handleCancelDelete = () => {
        setShowDeleteModal(false);
    }

    const handleEdit = async (dishId) => {
        if(currentlyEditedDish && dishId === currentlyEditedDish.dish.dish_id) return;

        try {
            const response = await axiosInstance.get(`/v1/dishes/${dishId}/products`);

            const dishToEditData = {
                dishData: response.data,
            }

            dispatch(setCurrentlyEditedDish(dishToEditData));
        }
        catch(error){
            console.error(error);
            toastNotification(
                "Failed to load dish data to edit.",
                toastNotificationTypesENUM.ERROR
            );
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

            <ConfirmationModal 
                isOpen={showDeleteModal} 
                message={`Do you want to delete ${dishData.dish_name} ?`}
                messageToHighlight={`${dishData.dish_name}`}
                onConfirm={() => { handleConfirmDelete(dishData.dish_id) }}
                onCancel={handleCancelDelete}
            />
        </>
    )
}