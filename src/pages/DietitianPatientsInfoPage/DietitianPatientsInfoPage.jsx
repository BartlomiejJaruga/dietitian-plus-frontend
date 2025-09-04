import styles from "./DietitianPatientsInfoPage.module.scss";

import NavBar from "@components/NavBar/NavBar";
import { useParams } from "react-router-dom";

export default function DietitianPatientsInfoPage() {
    const { patientId }= useParams();

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
                            <h1>Name Surname</h1>
                        </div>
                        <h3>Informations</h3>
                        <div className={styles.patient_detailed_info_container}>
                            <div className={styles.patient_info_list}>
                                <div className={styles.patient_info_list_item}>
                                    <span className={styles.patient_info_list_item_title}>Birth day</span>
                                    <span className={styles.patient_info_list_item_content}>value</span>
                                </div>
                                <div className={styles.patient_info_list_item}>
                                    <span className={styles.patient_info_list_item_title}>Height</span>
                                    <span className={styles.patient_info_list_item_content}>value</span>
                                </div>
                                <div className={styles.patient_info_list_item}>
                                    <span className={styles.patient_info_list_item_title}>Starting weight</span>
                                    <span className={styles.patient_info_list_item_content}>value</span>
                                </div>
                                <div className={styles.patient_info_list_item}>
                                    <span className={styles.patient_info_list_item_title}>PAL</span>
                                    <span className={styles.patient_info_list_item_content}>value</span>
                                </div>
                                <div className={styles.patient_info_list_item}>
                                    <span className={styles.patient_info_list_item_title}>Current weight</span>
                                    <span className={styles.patient_info_list_item_content}>value</span>
                                </div>
                            </div>
                            <div>
                                <h2>BMI</h2>
                                <h2 className={styles.bmi_value}>BMI value</h2>
                            </div>
                        </div>
                    </section>
                    <section className={styles.patient_allergies_and_disliked_products_section}>
                        <div className={styles.allergies_container}>
                            <h3>Allergies</h3>
                            <div className={styles.allergies_list}>
                                <div className={styles.scrollbar_container}>
                                    <span className={styles.list_item}>Product</span>
                                    <span className={styles.list_item}>Product</span>
                                    <span className={styles.list_item}>Product</span>
                                    <span className={styles.list_item}>Product</span>
                                    <span className={styles.list_item}>Product</span>
                                    <span className={styles.list_item}>Product</span>
                                    <span className={styles.list_item}>Product</span>
                                    <span className={styles.list_item}>Product</span>
                                    <span className={styles.list_item}>Product</span>
                                    <span className={styles.list_item}>Product</span>
                                    <span className={styles.list_item}>Product</span>
                                </div>
                            </div>
                        </div>
                        <div className={styles.disliked_products_container}>
                            <h3>Disliked products</h3>
                            <div className={styles.disliked_products_list}>
                                <div className={styles.scrollbar_container}>
                                    <span className={styles.list_item}>Product</span>
                                    <span className={styles.list_item}>Product</span>
                                    <span className={styles.list_item}>Product</span>
                                    <span className={styles.list_item}>Product</span>
                                    <span className={styles.list_item}>Product</span>
                                    <span className={styles.list_item}>Product</span>
                                    <span className={styles.list_item}>Product</span>
                                    <span className={styles.list_item}>Product</span>
                                    <span className={styles.list_item}>Product</span>
                                    <span className={styles.list_item}>Product</span>
                                    <span className={styles.list_item}>Product</span>
                                    <span className={styles.list_item}>Product</span>
                                    <span className={styles.list_item}>Product</span>
                                    <span className={styles.list_item}>Product</span>
                                    <span className={styles.list_item}>Product</span>
                                    <span className={styles.list_item}>Product</span>
                                    <span className={styles.list_item}>Product</span>
                                    <span className={styles.list_item}>Product</span>
                                    <span className={styles.list_item}>Product</span>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </>
    );
}