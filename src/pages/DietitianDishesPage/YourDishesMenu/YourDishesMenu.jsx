import { useEffect, useState } from 'react';
import styles from './YourDishesMenu.module.scss';
import axiosInstance from '@services/axiosInstance';
import { useSelector } from 'react-redux';
import LoadingIndicator from '@components/LoadingIndicator/LoadingIndicator';
import DishTile from './DishTile/DishTile';

export default function YourDishesMenu(){
    const dietitianId = useSelector((state) => state.auth.userData.uuid);
    const [isPageBeingLoaded, setIsPageBeingLoaded] = useState(true);
    const [dishes, setDishes] = useState([]);

    const fetchDishes = async () => {
        try {
            const response = await axiosInstance.get(`/v1/dietitians/${dietitianId}/dishes`);
            
            setDishes(response.data);
            console.log(response.data);
        }
        catch(error){
            console.log(error);
        }
    }

    useEffect(() => {
        const loadData = async () => {
            setIsPageBeingLoaded(true);

            fetchDishes();

            setIsPageBeingLoaded(false);
        }
        
        loadData();
    }, []);

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