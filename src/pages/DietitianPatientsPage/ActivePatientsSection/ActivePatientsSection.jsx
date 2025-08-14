import styles from "./ActivePatientsSection.module.scss";

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axiosInstance from "@services/axiosInstance";
import LoadingIndicator from "@components/LoadingIndicator/LoadingIndicator";
import ActivePatientsRow from "./ActivePatientRow/ActivePatientRow";

export default function ActivePatientsSection() {
    const dietitianId = useSelector((state) => state.auth.userData.uuid);
    const [loadedPatientsData, setLoadedPatientsData] = useState([]);
    const [isPageBeingLoaded, setIsPageBeingLoaded] = useState(false);

    useEffect(() => {
        const loadInitialPatients = async () => {
            setIsPageBeingLoaded(true);

            loadPatientsData();

            setIsPageBeingLoaded(false);
        }

        loadInitialPatients();
    }, []);

    const loadPatientsData = async () => {
        try {
            await axiosInstance.get(`/v1/dietitians/${dietitianId}/patients`);

            setLoadedPatientsData(response.data);
        }
        catch(error){
            console.error(error);
        }
    }

    return (
        <>
            <div className={styles.main_container}>
                <h3>Active Patients</h3>
                <div className={styles.patients_container}>
                    {isPageBeingLoaded && (
                        <LoadingIndicator message="Loading patients..." fontSize="2rem"/>
                    )}
    
                    {!isPageBeingLoaded && (
                        <>
                            {loadedPatientsData.length > 0 && (
                                <>
                                    <h4>Name</h4>
                                    <h4>Surname</h4>
                                    <h4>Email</h4>
                                    <h4>Options</h4>

                                    {loadedPatientsData.map((patient) => {
                                        return (
                                            <ActivePatientsRow key={patient.patient_id} patientData={patient} />
                                        );
                                    })}
                                </>
                            )}

                            {loadedPatientsData.length <= 0 && (
                                <div>
                                    <h3>Patient list empty!</h3>
                                    <p>Add new patients using "New Patients" section (left panel)</p>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </>
    );
}