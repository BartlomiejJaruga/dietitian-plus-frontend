import styles from "./AuthPage.module.scss";

import NavBar from "@components/NavBar/NavBar";
import { userRolesENUM } from "@enums";
import { useDispatch } from "react-redux";
import { authenticateUser } from "@slices/authSlice";
import { useNavigate } from "react-router-dom";

export default function AuthPage(){
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleAuthenticate = (user_type) => {
        console.log(user_type);
        let userInfo;
        if(user_type === userRolesENUM.DIETITIAN){
            userInfo = {
                email: "dietitian@gmail.com",
                first_name: "Frodo",
                last_name: "Baggins",
                user_type: userRolesENUM.DIETITIAN,
            }
        }
        else {
            userInfo = {
                email: "patient@gmail.com",
                first_name: "Gandalf",
                last_name: "The White",
                user_type: userRolesENUM.PATIENT,
            }
        }

        dispatch(authenticateUser(userInfo));
        navigate("/");
    }


    return (
        <>  
            <NavBar />
            <div className={styles.authpage_container}>
                <h1>Authenticate yourself!</h1>
                <button onClick={() => handleAuthenticate(userRolesENUM.DIETITIAN)}>Authenticate me as Dietitian</button>
                <button onClick={() => handleAuthenticate(userRolesENUM.PATIENT)}>Authenticate me as Patient</button>
            </div>
        </>
    )
}