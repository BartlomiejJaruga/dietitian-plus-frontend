import styles from "./ActivePatientRow.module.scss";

import React, { useState } from "react";
import ConfirmationModal from "@components/ConfirmationModal/ConfirmationModal";
import axiosInstance from "@services/axiosInstance";
import { useToastNotification } from "@hooks/useToastNotification";
import { toastNotificationTypesENUM } from "@enums";

export default function ActivePatientRow({ patientData }) {
    const toastNotification = useToastNotification();
    const [showDeletePatientModal, setShowDeletePatientModal] = useState(false);

    const handlePatientDelete = () => {
        setShowDeletePatientModal(true);
    }

    const handleConfirmDeletePatient = async () => {
        try {
            await axiosInstance.delete(`/v1/patients/${patientData.patient_id}/dietitians`);

            setShowDeletePatientModal(false);
            toastNotification(
                "Patient deleted successfully.",
                toastNotificationTypesENUM.SUCCESS
            );
        }
        catch(error){
            console.log(error);
        }
    }

    const handleCancelDeletePatient = () => {
        setShowDeletePatientModal(false);
    }

    return (
        <>
            <>
                <h5>{patientData.first_name}</h5>
                <h5>{patientData.last_name}</h5>
                <h5>john.pork@gmail.com</h5>
                <div className={styles.option_buttons}>
                    <button 
                        className={styles.option_buttons_plan_diet}
                    >
                        Plan Diet
                    </button>
                    <button 
                        className={styles.option_buttons_more_info}
                    >
                        More info
                    </button>
                    <button 
                        className={styles.option_buttons_delete}
                        onClick={handlePatientDelete}
                    >
                        Delete
                    </button>
                </div>
            </>

            <ConfirmationModal 
                isOpen={showDeletePatientModal}
                message={`Are you sure you want to delete patient ${patientData.first_name} ${patientData.last_name} (email@example.com)?`}
                messageToHighlight={`${patientData.first_name} ${patientData.last_name} (email@example.com)`}
                onConfirm={handleConfirmDeletePatient}
                onCancel={handleCancelDeletePatient}
            />
        </>
    );
}