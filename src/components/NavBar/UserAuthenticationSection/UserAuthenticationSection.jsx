import styles from "./UserAuthenticationSection.module.scss";

import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "@slices/authSlice";

export default function UserAuthenticationSection() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isUserAuthenticated = useSelector((state) => state.auth.isAuthenticated);


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

        navigate('/auth?authType=login');
    }

    return (
        <div className={styles.main_container}>
            {!isUserAuthenticated && (
                <div className={styles.buttons_container}>
                    <button 
                        className={styles.sign_up_button} 
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