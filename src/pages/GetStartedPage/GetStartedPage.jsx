import styles from "./GetStartedPage.module.scss";

import NavBar from "@components/NavBar/NavBar";
import Leaf from "@icons/leaf.svg?react";
import dietitianImage from "@images/GetStartedPage/anime_dietitian_person.png";
import healthyProductBowl from "@images/GetStartedPage/healthy_products_bowl.png";
import { useNavigate } from "react-router-dom";

export default function GetStartedPage() {
    const navigate = useNavigate();

    const handleStartAsPatient = () => {
        navigate('/auth?authType=register_patient')
    }

    const handleStartAsDietitian = () => {
        navigate('/auth?authType=register_dietitian')
    }


    return (
        <div className={styles.layout}>
            <NavBar/>
            <div className={styles.get_started_page_container}>
                <div className={styles.start_as_dietitian_container}>
                    <img src={dietitianImage} alt="anime dietitian person" className={styles.start_as_dietitian_image}/>
                    <button className={styles.start_as_dietitian_button} onClick={handleStartAsDietitian}>I'm a Dietitian</button>
                </div>
                <div className={styles.start_as_patient_container}>
                    <img src={healthyProductBowl} alt="bowl with healthy products" className={styles.start_as_patient_image}/>
                    <button className={styles.start_as_patient_button} onClick={handleStartAsPatient}>
                        <Leaf className={`${styles.leaf} ${styles.left_leaf}`}/>
                            I Want to Eat Healthier
                        <Leaf className={`${styles.leaf} ${styles.right_leaf}`}/>
                    </button>
                </div>
            </div>
        </div>
    );
}