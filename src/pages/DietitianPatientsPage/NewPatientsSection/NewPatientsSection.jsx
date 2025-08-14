import styles from "./NewPatientsSection.module.scss";

import { useId, useState } from "react";
import { useToastNotification } from "@hooks/useToastNotification";
import axiosInstance from "@services/axiosInstance";
import { useSelector } from "react-redux";
import { toastNotificationTypesENUM } from "@enums";

export default function NewPatientsSection() {
    const toastNotification = useToastNotification();
    const uniqueId = useId();
    const dietitianId = useSelector((state) => state.auth.userData.uuid);
    const [patientEmail, setPatientEmail] = useState("");
    const [patientEmailError, setPatientEmailError] = useState(null);

    const handleAddPatient = async (e) => {
        e.preventDefault();

        if(patientEmail === ""){
            setPatientEmailError("Patient email cannot be empty.");
            return;
        }
        else{
            setPatientEmailError(null);
        }

        try{
            const requestBody = {
                dietitian_id: dietitianId,
            }

            await axiosInstance.post(
                '/v1/patients/dietitians',
                requestBody,
                {
                    params: {
                        patient_email: patientEmail,
                    }
                }
            );

            setPatientEmail("");
            toastNotification("Patient successfully assigned.", toastNotificationTypesENUM.SUCCESS);
        }
        catch(error){
            if(error?.response?.status === 400){
                toastNotification(
                    "Patient already assigned to dietitian.", 
                    toastNotificationTypesENUM.ERROR
                );
            }
            else if(error?.response?.status === 401){
                toastNotification(
                    "Unauthorized action.", 
                    toastNotificationTypesENUM.ERROR
                );
            }
            else if(error?.response?.status === 403){
                toastNotification(
                    "Access denied. Re-login.", 
                    toastNotificationTypesENUM.ERROR
                );
            }
            else if(error?.response?.status === 404){
                toastNotification(
                    "Patient with such email does not exist.", 
                    toastNotificationTypesENUM.ERROR
                );
            }
            else{
                console.error(error);
            }
        }
    };

    return (
        <>
            <div className={styles.main_container}>
                <h3>New Patients</h3>
                <form className={styles.new_patient_form} onSubmit={handleAddPatient}>
                    <div className={`
                        ${styles.new_patient_form_new_patient_email} 
                        ${(patientEmailError !== null ? styles["new_patient_form_new_patient_email--error"] : "")}
                    `}>
                        <label
                            htmlFor={`${uniqueId}-new-patient-email`}
                        >
                            Patient email:
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={patientEmail}
                            id={`${uniqueId}-new-patient-email`}
                            placeholder="ex. john.williams@email.com"
                            autoComplete="off"
                            onChange={(e) => {
                                setPatientEmail(e.target.value);
                            }}
                        />
                        {patientEmailError !== null && (
                            <p className={styles.error_message}>{patientEmailError}</p>
                        )}
                    </div>
                    
                    
                    <button 
                        className={styles.new_patient_form_submit_button}
                    >
                        Add patient
                    </button>
                </form>
            </div>
        </>
    );
}