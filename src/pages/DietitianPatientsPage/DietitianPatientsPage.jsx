import styles from "./DietitianPatientsPage.module.scss";

import NavBar from "@components/NavBar/NavBar";
import NewPatientsSection from "./NewPatientsSection/NewPatientsSection";
import ActivePatientsSection from "./ActivePatientsSection/ActivePatientsSection";

export default function DietitianPatientsPage() {
    return (
        <>
            <NavBar/>
            <div className={styles.main_container}>
                <NewPatientsSection />
                <ActivePatientsSection />
            </div>
        </>
    );
}