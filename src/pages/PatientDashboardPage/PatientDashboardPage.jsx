import styles from "./PatientDashboardPage.module.scss";

import NavBar from "@components/NavBar/NavBar";
import Arrow from "@icons/simple-arrow-left.svg?react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PatientDashboardPage(){
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.userData);

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
            <div className={styles.patient_dashboard_page_container}>
                <h1>Patient Dashboard Page</h1>
                <span>{`Hello ${user.first_name} ${user.last_name} (${user.email})!`}</span>
            </div>
        </>
    )
}