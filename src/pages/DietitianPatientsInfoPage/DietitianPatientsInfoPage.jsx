import styles from "./DietitianPatientsInfoPage.module.scss";

import NavBar from "@components/NavBar/NavBar";
import axiosInstance from "@services/axiosInstance";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function DietitianPatientsInfoPage() {
    const { patientId }= useParams();
    const [loadedPatientData, setLoadedPatientData] = useState({});
    const [loadedPatientAllergies, setLoadedPatientAllergies] = useState([]);
    const [loadedPatientDislikedProducts, setLoadedPatientDislikedProducts] = useState([]);
    const [isPageBeingLoaded, setIsPageBeingLoaded] = useState(false);

    useEffect(() => {
        const loadInitialPatient = async () => {
            setIsPageBeingLoaded(true);

            loadPatientData();
            loadPatientAllergies();
            loadPatientDislikedProducts();

            setIsPageBeingLoaded(false);
        }

        loadInitialPatient();
    }, []);


    const loadPatientData = async () => {
        try {
            const response = await axiosInstance.get(`/v1/patients/${patientId}`);

            setLoadedPatientData(response.data);
        }
        catch(error){
            console.error(error);
        }
    }

    const loadPatientAllergies = async () => {
        try {
            const response = await axiosInstance.get(`/v1/patients/${patientId}/allergenic-products`);

            setLoadedPatientAllergies(response.data);
        }
        catch(error){
            console.error(error);
        }
    }

    const loadPatientDislikedProducts = async () => {
        try {
            const response = await axiosInstance.get(`/v1/patients/${patientId}/disliked-products`);

            setLoadedPatientDislikedProducts(response.data);
        }
        catch(error){
            console.error(error);
        }
    }

    const calculateBMI = (weight, height) => {
        const heightInMeters = parseInt(height)/100;
        const result = parseFloat(parseFloat(weight) / (heightInMeters * heightInMeters));
        return result.toFixed(2);
    }

    return (
        <>
            <NavBar />
            <div className={styles.main_container}>
                <div className={styles.top_container}>
                    <button className={styles.diet_plan_button}>
                        Diet plan
                    </button>
                </div>
                <div className={styles.patient_info_container}>
                    <section className={styles.patient_main_info_section}>
                        <h3>Patient</h3>
                        <div className={styles.patient_name_container}>
                            <h1>{`${loadedPatientData.first_name} ${loadedPatientData.last_name}`}</h1>
                        </div>
                        <h3>Informations</h3>
                        <div className={styles.patient_detailed_info_container}>
                            <div className={styles.patient_info_list}>
                                <div className={styles.patient_info_list_item}>
                                    <span className={styles.patient_info_list_item_title}>Birth date</span>
                                    <span className={styles.patient_info_list_item_content}>{loadedPatientData.birthdate}</span>
                                </div>
                                <div className={styles.patient_info_list_item}>
                                    <span className={styles.patient_info_list_item_title}>Height</span>
                                    <span className={styles.patient_info_list_item_content}>{loadedPatientData.height}</span>
                                </div>
                                <div className={styles.patient_info_list_item}>
                                    <span className={styles.patient_info_list_item_title}>Starting weight</span>
                                    <span className={styles.patient_info_list_item_content}>{loadedPatientData.starting_weight}</span>
                                </div>
                                <div className={styles.patient_info_list_item}>
                                    <span className={styles.patient_info_list_item_title}>PAL</span>
                                    <span className={styles.patient_info_list_item_content}>{loadedPatientData.pal}</span>
                                </div>
                                <div className={styles.patient_info_list_item}>
                                    <span className={styles.patient_info_list_item_title}>Current weight</span>
                                    <span className={styles.patient_info_list_item_content}>{loadedPatientData.current_weight}</span>
                                </div>
                            </div>
                            <div>
                                <h2>BMI</h2>
                                <h2 className={styles.bmi_value}>
                                    {calculateBMI(
                                        loadedPatientData.current_weight,
                                        loadedPatientData.height
                                    )}
                                </h2>
                            </div>
                        </div>
                    </section>
                    <section className={styles.patient_allergies_and_disliked_products_section}>
                        <div className={styles.allergies_container}>
                            <h3>Allergies</h3>
                            <div className={styles.allergies_list}>
                                <div className={styles.scrollbar_container}>
                                    {loadedPatientAllergies.length <= 0 && (
                                        <>
                                            <div className={styles.nothing_to_show_container}>
                                                <h3>Patient haven't declared<br/> any allergies</h3>
                                                <p>Patient can fill his allergies<br/> in his account panel</p>
                                            </div>
                                        </>
                                    )}
                                    
                                    {loadedPatientAllergies.length > 0 && loadedPatientAllergies.map((product) => {
                                        return (
                                            <span 
                                                key={product.product_id}
                                                className={styles.list_item}
                                            >
                                                {product.product_name}
                                            </span>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                        <div className={styles.disliked_products_container}>
                            <h3>Disliked products</h3>
                            <div className={styles.disliked_products_list}>
                                <div className={styles.scrollbar_container}>
                                    {loadedPatientDislikedProducts.length <= 0 && (
                                        <>
                                            <div className={styles.nothing_to_show_container}>
                                                <h3>Patient haven't declared<br/> any disliked products</h3>
                                                <p>Patient can fill his disliked products<br/> in his account panel</p>
                                            </div>
                                        </>
                                    )}
                                    
                                    {loadedPatientDislikedProducts.length > 0 && loadedPatientDislikedProducts.map((product) => {
                                        return (
                                            <span 
                                                key={product.product_id}
                                                className={styles.list_item}
                                            >
                                                {product.product_name}
                                            </span>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </>
    );
}