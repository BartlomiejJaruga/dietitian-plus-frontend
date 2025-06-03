import styles from "./PatientQuestionnairePage.module.scss";

import NavBar from "@components/NavBar/NavBar";

export default function PatientQuestionnairePage() {
    return (
        <>
            <NavBar/>
            <div className={styles.patient_questionnaire_container}>
                <h1>Questionnaire Page</h1>
            </div>
        </>
    );
}