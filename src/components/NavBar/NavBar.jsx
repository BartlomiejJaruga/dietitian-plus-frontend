import styles from "./NavBar.module.scss"

import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import UserAuthenticationSection from "./UserAuthenticationSection/UserAuthenticationSection";
import { userRolesENUM } from "@enums";

export default function NavBar({ navBarColor="white", logoColor="green" }){
    const containerStylesClass = `${styles.navbar_container} ${styles[`navbar_container--${navBarColor}`] || 'navbar_container--white'}`;
    const logoSrc = `/logo_${logoColor}.png`;
    const userType = useSelector((state) => state.auth.userData.user_type);

    return (
        <div className={containerStylesClass}>
            <Link to="/">
                <img src={logoSrc} alt={`dietitian+_${logoColor}_logo`} className={styles.navbar_logo} />
            </Link>

            {userType === userRolesENUM.GUEST && (
                <div className={styles.links_container}>
                    <Link to="/">About us</Link>
                    <Link to="/">Patient</Link>
                    <Link to="/">Dietitian</Link>
                    <Link to="/">Reviews</Link>
                </div>
            )}

            {userType === userRolesENUM.DIETITIAN && (
                <div className={styles.links_container}>
                    <Link to="/dietitian/dashboard">Dashboard</Link>
                    <Link to="/dietitian/dishes">Dishes</Link>
                    <Link to="/dietitian/patients">Patients</Link>
                </div>
            )}

            {userType === userRolesENUM.PATIENT && (
                <div className={styles.links_container}>
                    <Link to="/patient/questionnaire">Questionnaire</Link>
                    <Link to="/patient/dashboard">Dashboard</Link>
                    <Link to="/patient/aboutMe">About Me</Link>
                </div>
            )}

            <UserAuthenticationSection navBarColor={navBarColor}/>
        </div>
    );
}