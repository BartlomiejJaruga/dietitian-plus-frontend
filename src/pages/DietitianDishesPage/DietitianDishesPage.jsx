import styles from "./DietitianDishesPage.module.scss";

import NavBar from "@components/NavBar/NavBar";

export default function DietitianDishesPage() {
    return (
        <>
            <NavBar/>
            <div className={styles.dietitian_dishes_page_container}>
                <h1>Dietitian Dishes Page</h1>
            </div>
        </>
    );
}