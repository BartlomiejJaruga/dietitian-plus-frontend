import styles from "./PatientAboutMePage.module.scss";

import NavBar from "@components/NavBar/NavBar";

export default function PatientAboutMePage() {
    return (
        <>
            <NavBar/>
            <div className={styles.patient_about_me_page_container}>
                <h1>Patient About Me Page</h1>
            </div>
        </>
    );
}