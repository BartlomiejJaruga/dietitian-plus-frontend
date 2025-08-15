import styles from "./ActivePatientsSection.module.scss";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "@services/axiosInstance";
import LoadingIndicator from "@components/LoadingIndicator/LoadingIndicator";
import ActivePatientsRow from "./ActivePatientRow/ActivePatientRow";
import { setHasPatientsChanged } from "@slices/patientsTabSlice";

export default function ActivePatientsSection() {
    const dispatch = useDispatch();
    const dietitianId = useSelector((state) => state.auth.userData.uuid);
    const hasPatientsChanged = useSelector((state) => state.patientsTab.hasPatientsChanged);
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

    useEffect(() => {
        if (!hasPatientsChanged) return;
    
        const reloadData = async () => {
            setIsPageBeingLoaded(true);

            loadPatientsData();
            dispatch(setHasPatientsChanged({ hasPatientsChanged: false }));

            setIsPageBeingLoaded(false);
        };

        reloadData();
    }, [hasPatientsChanged]);

    const loadPatientsData = async () => {
        try {
            const response = await axiosInstance.get(`/v1/dietitians/${dietitianId}/patients`);

            const sortedPatients = sortPatientsAlphebaticaly(response.data);
            setLoadedPatientsData(sortedPatients);
        }
        catch(error){
            console.error(error);
        }
    }

    const sortPatientsAlphebaticaly = (patients) => {
        return [...patients].sort((a, b) => {
            const lastNameCompare = a.last_name
                .toLowerCase()
                .localeCompare(b.last_name.toLowerCase(), "pl", { sensitivity: "base" });
            
            if (lastNameCompare !== 0) {
                return lastNameCompare;
            }
            
            return a.first_name
                .toLowerCase()
                .localeCompare(b.first_name.toLowerCase(), "pl", { sensitivity: "base" });
        });
    }

    return (
        <>
            <div className={styles.main_container}>
                <h3>Active Patients</h3>
                <div className={`
                    ${styles.patients_container}
                    ${loadedPatientsData.length > 0 ? styles["patients_container--grid"] : styles["patients_container--flex"]}
                `}>
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