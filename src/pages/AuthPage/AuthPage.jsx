import styles from "./AuthPage.module.scss";

import NavBar from "@components/NavBar/NavBar";
import { useSearchParams } from "react-router-dom";
import DietitianRegisterForm from "@components/DietitianRegisterForm/DietitianRegisterForm";
import PatientRegisterForm from "@components/PatientRegisterForm/PatientRegisterForm";
import dietitianImage from "@images/AuthPage/anime_dietitian_person.png";
import healthBowlImage from "@images/AuthPage/healthy_products_bowl.png";

export default function AuthPage(){
    const [ searchParams, setSearchParams ] = useSearchParams();



    return (
        <div className={styles.layout}>  
            <NavBar />
            <div className={styles.authpage_container}>
                {searchParams.get("authType") === "register_dietitian" && 
                <div className={styles.register_dietitian_container}>
                    <div className={styles.register_dietitian_photo_and_quote}>
                        <img src={dietitianImage} alt="anime dietitian image"/>
                        <h1>Be the key to your clients'<br/>nutritional success.</h1>
                    </div>
                    <DietitianRegisterForm/>
                </div>}
                {searchParams.get("authType") === "register_patient" && 
                <div className={styles.register_patient_container}>
                    <PatientRegisterForm/>
                    <div className={styles.register_patient_photo_and_quote}>
                        <img src={healthBowlImage} alt="bowl of healthy products"/>
                        <h1>Eat smart, feel better.</h1>
                    </div>
                </div>}
            </div>
            
        </div>
    )
}