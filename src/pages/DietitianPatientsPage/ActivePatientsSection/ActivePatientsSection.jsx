import styles from "./ActivePatientsSection.module.scss";


export default function ActivePatientsSection() {
    return (
        <>
            <div className={styles.main_container}>
                <h3>Active Patients</h3>
                <div className={styles.patients_container}>
                    <h4>Name</h4>
                    <h4>Surname</h4>
                    <h4>Email</h4>
                    <h4>Options</h4>

                    <h5>John</h5>
                    <h5>Pork</h5>
                    <h5>john.pork@gmail.com</h5>
                    <div className={styles.option_buttons}>
                        <button className={styles.option_buttons_plan_diet}>Plan Diet</button>
                        <button className={styles.option_buttons_more_info}>More info</button>
                        <button className={styles.option_buttons_delete}>Delete</button>
                    </div>
                </div>
            </div>
        </>
    );
}