import styles from "./DietitianPatientsInfoPage.module.scss";

import NavBar from "@components/NavBar/NavBar";
import { useParams } from "react-router-dom";

export default function DietitianPatientsInfoPage() {
    const { patientId }= useParams();

    return (
        <>
            <NavBar />
            <div className={styles.main_container}>
                <h3>ID: {patientId}</h3>
            </div>
        </>
    );
}