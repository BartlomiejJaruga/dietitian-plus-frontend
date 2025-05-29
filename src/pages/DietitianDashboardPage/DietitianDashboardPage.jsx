import styles from "./DietitianDashboardPage.module.scss";

import NavBar from "@components/NavBar/NavBar";
import Arrow from "@icons/simple-arrow-left.svg?react";
import { useNavigate } from "react-router-dom";

export default function DietitianDashboardPage(){
    const navigate = useNavigate();

    const handleReturn = () => {
        navigate("/");
    }
    
    return (
        <>
            <NavBar />
            <div className={styles.return_to_home_page_button} onClick={handleReturn}>
                <Arrow className={styles.return_to_home_page_button_arrow}/>
                <span>Return to Home Page</span>
            </div>
            <div className={styles.dietitian_dashboard_page_container}>
                <h1>Dietitian Dashboard Page</h1>
            </div>
        </>
        
    )
}