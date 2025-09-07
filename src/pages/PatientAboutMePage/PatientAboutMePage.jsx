import styles from "./PatientAboutMePage.module.scss";

import NavBar from "@components/NavBar/NavBar";
import axiosInstance from "@services/axiosInstance";
import { useEffect, useState } from "react";
import LoadingIndicator from "@components/LoadingIndicator/LoadingIndicator";
import { useSelector } from "react-redux";
import { useToastNotification } from "@hooks/useToastNotification";
import { toastNotificationTypesENUM } from "@enums";

export default function PatientAboutMePage() {
    const toastNotification = useToastNotification();
    const patientId = useSelector((state) => state.auth.userData.uuid);
    const [loadedPatientData, setLoadedPatientData] = useState({});
    const [loadedPatientAllergies, setLoadedPatientAllergies] = useState([]);
    const [loadedPatientDislikedProducts, setLoadedPatientDislikedProducts] = useState([]);
    const [isPageBeingLoaded, setIsPageBeingLoaded] = useState(false);

    const [editableData, setEditableData] = useState({
        height: "",
        pal: "",
        current_weight: ""
    });
    const [isEdited, setIsEdited] = useState(false);

    useEffect(() => {
        const loadInitialPatient = async () => {
            setIsPageBeingLoaded(true);

            await Promise.all([
                loadPatientData(),
                loadPatientAllergies(),
                loadPatientDislikedProducts()
            ]);

            setIsPageBeingLoaded(false);
        };

        loadInitialPatient();
    }, []);

    const loadPatientData = async () => {
        try {
            const response = await axiosInstance.get(`/v1/patients/${patientId}`);
            setLoadedPatientData(response.data);
            setEditableData({
                height: response.data.height || "",
                pal: response.data.pal || "",
                current_weight: response.data.current_weight || ""
            });
        } catch (error) {
            console.error(error);
        }
    };

    const loadPatientAllergies = async () => {
        try {
            const response = await axiosInstance.get(`/v1/patients/${patientId}/allergenic-products`);
            setLoadedPatientAllergies(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const loadPatientDislikedProducts = async () => {
        try {
            const response = await axiosInstance.get(`/v1/patients/${patientId}/disliked-products`);
            setLoadedPatientDislikedProducts(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const calculateBMI = (weight, height) => {
        if (!weight || !height) return "-";
        const heightInMeters = parseInt(height) / 100;
        const result = parseFloat(parseFloat(weight) / (heightInMeters * heightInMeters));
        return result.toFixed(2);
    };

    function getBmiClass(bmi) {
        if (bmi < 16) return "bmi_value--severe-underweight";
        if (bmi < 17) return "bmi_value--moderate-underweight";
        if (bmi < 18.5) return "bmi_value--mild-underweight";
        if (bmi < 25) return "bmi_value--normal-weight";
        if (bmi < 30) return "bmi_value--overweight";
        if (bmi < 35) return "bmi_value--obesity-class-i";
        if (bmi < 40) return "bmi_value--obesity-class-ii";
        return "bmi_value--obesity-class-iii";
    }

    const currentBMI = calculateBMI(
        editableData.current_weight,
        editableData.height
    );

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditableData((prev) => {
            const updated = { ...prev, [name]: value };
            setIsEdited(
                updated.height !== loadedPatientData.height ||
                updated.pal !== loadedPatientData.pal ||
                updated.current_weight !== loadedPatientData.current_weight
            );
            return updated;
        });
    };

    const handleUpdate = async () => {
        try {
            const requestBody = {
                height: editableData.height,
                current_weight: editableData.current_weight,
                pal: editableData.pal,
            };

            await axiosInstance.patch(`/v1/patients/${patientId}`, requestBody);

            toastNotification(
                "Successfully updated your information.",
                toastNotificationTypesENUM.SUCCESS
            );
            setIsEdited(false);
        } catch (error) {
            console.error(error);
            toastNotification(
                "Failed to update your information. Please try again later.",
                toastNotificationTypesENUM.ERROR
            );
        }
    };

    return (
        <>
            <NavBar />
            <div className={styles.main_container}>
                {isPageBeingLoaded && (
                    <div className={styles.loading_page_info_container}>
                        <LoadingIndicator message="Loading user information..." fontSize="2rem"/>
                    </div>
                )}

                {!isPageBeingLoaded && (
                    <div className={styles.patient_info_container}>
                        <section className={styles.patient_main_info_section}>
                            <h3>Patient</h3>
                            <div className={styles.patient_name_container}>
                                <h1>{`${loadedPatientData.first_name} ${loadedPatientData.last_name}`}</h1>
                            </div>
                            <div className={styles.info_header_row}>
                                <h3>Informations</h3>
                                {isEdited && (
                                    <button 
                                        className={styles.update_button} 
                                        onClick={handleUpdate}
                                    >
                                        Update information
                                    </button>
                                )}
                            </div>
                            <div className={styles.patient_detailed_info_container}>
                                <div className={styles.patient_info_list}>
                                    <div className={styles.patient_info_list_item}>
                                        <span className={styles.patient_info_list_item_title}>Birth date</span>
                                        <span className={styles.patient_info_list_item_content}>{loadedPatientData.birthdate}</span>
                                    </div>
                                    <div className={styles.patient_info_list_item}>
                                        <span className={styles.patient_info_list_item_title}>Height</span>
                                        <input
                                            type="number"
                                            name="height"
                                            className={styles.patient_info_list_item_input}
                                            min={1}
                                            value={editableData.height}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className={styles.patient_info_list_item}>
                                        <span className={styles.patient_info_list_item_title}>Starting weight</span>
                                        <span className={styles.patient_info_list_item_content}>{loadedPatientData.starting_weight}</span>
                                    </div>
                                    <div className={styles.patient_info_list_item}>
                                        <span className={styles.patient_info_list_item_title}>PAL</span>
                                        <select
                                            name="pal"
                                            className={styles.patient_info_list_item_select}
                                            value={editableData.pal}
                                            onChange={handleChange}
                                        >
                                            <option value="" hidden disabled>Select activity level</option>
                                            <option value="1.4">Low</option>
                                            <option value="1.6">Middle</option>
                                            <option value="1.8">High</option>
                                        </select>
                                    </div>
                                    <div className={styles.patient_info_list_item}>
                                        <span className={styles.patient_info_list_item_title}>Current weight</span>
                                        <input
                                            type="number"
                                            name="current_weight"
                                            min={1}
                                            className={styles.patient_info_list_item_input}
                                            value={editableData.current_weight}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <h2>BMI</h2>
                                    <h2 className={`${styles.bmi_value} ${styles[getBmiClass(currentBMI)]}`}>
                                        {currentBMI}
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
                                            <div className={styles.nothing_to_show_container}>
                                                <h3>Patient haven't declared<br/> any allergies</h3>
                                                <p>Patient can fill his allergies<br/> in his account panel</p>
                                            </div>
                                        )}
                                        {loadedPatientAllergies.length > 0 && loadedPatientAllergies.map((product) => (
                                            <span 
                                                key={product.product_id}
                                                className={styles.list_item}
                                            >
                                                {product.product_name}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className={styles.disliked_products_container}>
                                <h3>Disliked products</h3>
                                <div className={styles.disliked_products_list}>
                                    <div className={styles.scrollbar_container}>
                                        {loadedPatientDislikedProducts.length <= 0 && (
                                            <div className={styles.nothing_to_show_container}>
                                                <h3>Patient haven't declared<br/> any disliked products</h3>
                                                <p>Patient can fill his disliked products<br/> in his account panel</p>
                                            </div>
                                        )}
                                        {loadedPatientDislikedProducts.length > 0 && loadedPatientDislikedProducts.map((product) => (
                                            <span 
                                                key={product.product_id}
                                                className={styles.list_item}
                                            >
                                                {product.product_name}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                )}
            </div>
        </>
    );
}
