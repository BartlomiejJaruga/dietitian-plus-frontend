import styles from "./GetStartedPage.module.scss";

import NavBar from "@components/NavBar/NavBar";

export default function GetStartedPage() {
    return (
        <>
            <NavBar/>
            <div className={styles.get_started_page_container}>
                <h1>Get Started Page</h1>
            </div>
        </>
    );
}