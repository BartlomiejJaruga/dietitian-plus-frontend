import styles from "./NewPatientsSection.module.scss";

import { useId } from "react";

export default function NewPatientsSection() {
    const uniqueId = useId();

    return (
        <>
            <div className={styles.main_container}>
                <h3>New Patients</h3>
                <form className={styles.new_patient_form}>
                    <div className={styles.new_patient_form_new_patient_email}>
                        <label
                            htmlFor={`${uniqueId}-new-patient-email`}
                        >
                            Patient email:
                        </label>
                        <input
                            type="email"
                            name="email"
                            id={`${uniqueId}-new-patient-email`}
                            placeholder="ex. john.williams@email.com"
                            autoComplete="off"
                        />
                    </div>
                    <button className={styles.new_patient_form_submit_button}>
                        Add patient
                    </button>
                </form>
            </div>
        </>
    );
}