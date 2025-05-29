import styles from "./NotFoundPage.module.scss";

import NavBar from "@components/NavBar/NavBar";

export default function NotFoundPage() {
    return (
        <>
            <NavBar />
            <div className={styles.not_found_page_container}>
                <h1>Error 404 - page not found!</h1>
            </div>
        </>
    )
}