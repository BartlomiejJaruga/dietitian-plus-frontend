import styles from "./DietitianPatientsDietPage.module.scss";

import NavBar from "@components/NavBar/NavBar";
import axiosInstance from "@services/axiosInstance";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LoadingIndicator from "@components/LoadingIndicator/LoadingIndicator";
import ArrowLeft from "@icons/simple-arrow-left.svg?react";
import Calendar from "./Calendar/Calendar";

export default function DietitianPatientsDietPage() {
    const navigate = useNavigate();
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

    const handleBackToPatientListButton = () => {
        navigate("/dietitian/patients");
    }

    const handlePatientDetailsButton = () => {
        navigate(`/dietitian/patients/${patientId}/info`);
    }

    return (
        <>
            <NavBar />
            <div className={styles.main_container}>
                <div className={styles.top_container}>
                    <button 
                        className={styles.back_to_patients_list_button}
                        onClick={handleBackToPatientListButton}
                    >
                        <ArrowLeft className={styles.arrow_left_icon}/>
                        Patients List
                    </button>
                    <button 
                        className={styles.patient_details_button}
                        onClick={handlePatientDetailsButton}
                    >
                        Patient Details
                    </button>
                    <div className={styles.patient_name_container}>
                        <h1>{loadedPatientData.first_name} {loadedPatientData.last_name}</h1>
                    </div>
                </div>
                
                {isPageBeingLoaded && (
                    <>
                        <div className={styles.loading_page_info_container}>
                            <LoadingIndicator message="Loading patient diet plan..." fontSize="2rem"/>
                        </div>
                    </>
                )}

                {!isPageBeingLoaded && (
                    <>
                        <div className={styles.calendar_container}>
                            <Calendar />
                        </div>
                    </>
                )}
            </div>
        </>
    );
}