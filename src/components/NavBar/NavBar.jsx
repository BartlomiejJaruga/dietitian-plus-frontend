import styles from "./NavBar.module.scss"

import { Link } from "react-router-dom";

export default function NavBar({ navBarColor="white", logoColor="green" }){
    const containerStylesClass = `${styles.navbar_container} ${styles[`navbar_container--${navBarColor}`] || 'navbar_container--white'}`;
    const logoSrc = `/logo_${logoColor}.png`;

    return (
        <div className={containerStylesClass}>
            <Link to="/">
                <img src={logoSrc} alt={`dietitian+_${logoColor}_logo`} className={styles.navbar_logo} />
            </Link>
            <Link to="/auth">Sign In</Link>
            <Link to="/auth">Sign Up</Link>
            <Link to="/dietitian/1/dashboard">Dashboard</Link>
        </div>
    );
}