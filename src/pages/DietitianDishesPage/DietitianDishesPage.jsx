import LoadingIndicator from "@components/LoadingIndicator/LoadingIndicator";
import styles from "./DietitianDishesPage.module.scss";

import NavBar from "@components/NavBar/NavBar";
import { useEffect, useState } from "react";
import axiosInstance from "@services/axiosInstance";
import DishCreationMenu from "./DishCreationMenu/DishCreationMenu";
import YourDishesMenu from "./YourDishesMenu/YourDishesMenu";
import { useToastNotification } from "@hooks/useToastNotification";

export default function DietitianDishesPage() {
    const toastNotification = useToastNotification();
    const [products, setProducts] = useState([]);
    const [isPageBeingLoaded, setIsPageBeingLoaded] = useState(true);

    const fetchProducts = async () => {
        try {
            const response = await axiosInstance.get("/v1/products");
            
            setProducts(response.data);
        }
        catch(error){
            console.error("Error while loading products: ", error);
            toastNotification(
                "Failed to load products from database.",
                toastNotificationTypesENUM.ERROR
            );
        }
    }

    useEffect(() => {
        const loadData = async () => {
            setIsPageBeingLoaded(true);

            fetchProducts();

            setIsPageBeingLoaded(false);
        }

        loadData();
    }, []);

    return (
        <>
            <NavBar/>
            <div className={styles.main_container}>
                {isPageBeingLoaded && (
                    <LoadingIndicator message="Loading dishes..." fontSize="2.5rem"/>
                )}

                {!isPageBeingLoaded && (
                    <>
                        <DishCreationMenu productsData={products}/>
                        <YourDishesMenu />
                    </>
                )}
                
            </div>
        </>
    );
}