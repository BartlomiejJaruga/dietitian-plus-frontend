import styles from '@pages/HomePage/HomePage.module.scss';

import NavBar from '@components/NavBar/NavBar';

export default function HomePage(){
    
    return (
        <>
            <NavBar navBarColor="green" logoColor="white"/>
            <div className={styles.homepage_container}>
            <img src="/logo_green.png" alt="Dietitian+ Green Logo"/>
                <h1>Welcome to Dietitian+ Page!</h1>
            </div>
        </>
    )
}