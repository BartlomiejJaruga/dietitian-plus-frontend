import { useEffect, useState } from 'react';
import styles from './YourDishesMenu.module.scss';
import axiosInstance from '@services/axiosInstance';
import { useDispatch, useSelector } from 'react-redux';
import LoadingIndicator from '@components/LoadingIndicator/LoadingIndicator';
import DishTile from './DishTile/DishTile';
import { setHasDishesChanged } from '@slices/dishesTabSlice';
import { useToastNotification } from '@hooks/useToastNotification';

export default function YourDishesMenu(){
    const toastNotification = useToastNotification();
    const dispatch = useDispatch();
    const dietitianId = useSelector((state) => state.auth.userData.uuid);
    const hasDishesChanged = useSelector((state) => state.dishesTab.hasDishesChanged);
    const [isPageBeingLoaded, setIsPageBeingLoaded] = useState(true);
    const [dishes, setDishes] = useState([]);

    const sortDishesAlfabetically = (dishes) => {
        return [...dishes].sort((a, b) =>
            a.dish_name.toLowerCase().localeCompare(b.dish_name.toLowerCase())
        );
    }

    const fetchDishes = async () => {
        try {
            const response = await axiosInstance.get(`/v1/dietitians/${dietitianId}/dishes`);
            
            const sortedData = sortDishesAlfabetically(response.data);
            setDishes(sortedData);
        }
        catch(error){
            console.log(error);
            toastNotification(
                "Failed to load your dishes.",
                toastNotificationTypesENUM.ERROR
            );
        }
    }

    useEffect(() => {
        const loadInitialData = async () => {
            setIsPageBeingLoaded(true);

            fetchDishes();

            setIsPageBeingLoaded(false);
        }
        
        loadInitialData();
    }, []);

    useEffect(() => {
        if (!hasDishesChanged) return;

        const reloadData = async () => {
            setIsPageBeingLoaded(true);

            fetchDishes();
            dispatch(setHasDishesChanged({ hasDishesChanged: false }));

            setIsPageBeingLoaded(false);
        };

        reloadData();
    }, [hasDishesChanged]);

    return (
        <>
            <div className={styles.main_container}>
                <div className={styles.above_container}>
                    <div>Your dishes</div>
                </div>

                {isPageBeingLoaded && (
                    <LoadingIndicator message="Loading dishes..." fontSize="2rem"/>
                )}

                {!isPageBeingLoaded && (
                    <>
                        <div className={`${styles.dishes_list_container} ${
                            dishes.length > 0
                            ? styles["dishes_list_container--grid"] 
                            : styles["dishes_list_container--flex"]
                        }`}>
                            {dishes.length > 0 && dishes.map((dish) => {
                                return (
                                    <DishTile key={dish.dish_id} dishData={dish} allDishes={dishes} setDishes={setDishes} />
                                );
                            })}

                            {dishes.length <= 0 && (
                                <div>
                                    <h3>Dish list empty!</h3>
                                    <p>Add new dishes using "Dish creation menu" (left panel)</p>
                                </div>
                            )}
                        </div>
                    </>
                )}
                
            </div>
        </>
    )
}