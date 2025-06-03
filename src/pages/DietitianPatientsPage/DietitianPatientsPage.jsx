import styles from "./DietitianPatientsPage.module.scss";

import NavBar from "@components/NavBar/NavBar";

export default function DietitianPatientsPage() {
    return (
        <>
            <NavBar/>
            <div className={styles.dietitian_patients_page_container}>
                <h1>Dietitian Patients Page</h1>
            </div>
        </>
    );
}