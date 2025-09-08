import styles from "./PatientDashboardPage.module.scss";

import NavBar from "@components/NavBar/NavBar";

export default function PatientDashboardPage(){
    
    const reloadPage = () => {
        window.location.reload();
    }

    return (
        <>
            <NavBar />
            <div className={styles.main_container}>
                <div className={styles.nothing_to_see_information_container}>
                    <div className={styles.nothing_to_see_modal}>
                        <h3>Why you don't see anything?</h3>
                        <p>
                            You currently don’t have an assigned dietitian. Once a dietitian adds you to their care list, your personalized dashboard will become available.
                        </p>
                    </div>
                    <button 
                        className={styles.refresh_button}
                        onClick={reloadPage}
                    >
                        Refresh
                    </button>
                </div>
            </div>
        </>
    )
}