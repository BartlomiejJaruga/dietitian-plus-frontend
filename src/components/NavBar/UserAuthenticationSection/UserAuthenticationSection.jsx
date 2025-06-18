import styles from "./UserAuthenticationSection.module.scss";

import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "@slices/authSlice";

export default function UserAuthenticationSection({ navBarColor }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isUserAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const signUpbuttonStyles = `${styles.sign_up_button} ${(navBarColor === "white") ? styles[`sign_up_button--green`] : styles['sign_up_button--beige']}`;

    const handleSignUpButtonClick = () => {
        navigate('/getStarted');
    }

    const handleSignInButtonClick = () => {
        navigate('/auth?authType=login');
    }

    const handleSignOutButtonClick = () => {
        dispatch(logoutUser());
        
        sessionStorage.removeItem("Bearer_token");
        localStorage.removeItem("Refresh_token");
        
        setTimeout(() => {
            navigate('/auth?authType=login');
        }, 0);
    }



    
    return (
        <div className={styles.main_container}>
            {!isUserAuthenticated && (
                <div className={styles.buttons_container}>
                    <button 
                        className={signUpbuttonStyles} 
                        onClick={handleSignUpButtonClick}
                    >
                        Sign up
                    </button>
                    <button 
                        className={styles.sign_in_button}
                        onClick={handleSignInButtonClick}
                    >
                        Sign in
                    </button>
                </div>
            )}

            {isUserAuthenticated && (
                <button 
                    className={styles.sign_out_button}
                    onClick={handleSignOutButtonClick}
                >
                    Sign out
                </button>
            )}
        </div>
    );
}