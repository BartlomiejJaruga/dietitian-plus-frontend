import styles from "./UnauthorizedPage.module.scss";

import NavBar from "@components/NavBar/NavBar";

export default function UnauthorizedPage() {
    return (
        <>
            <NavBar />
            <div className={styles.unauthorized_page_container}>
                <h1>Error 403 - unauthorized access!</h1>
            </div>
        </>
    )
}