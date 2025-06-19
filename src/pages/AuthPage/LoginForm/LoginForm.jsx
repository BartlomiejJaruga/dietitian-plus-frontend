import styles from './LoginForm.module.scss';

import { useState, useId, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from "@slices/authSlice";
import { setIsQuestionnaireCompleted } from '@slices/patientSlice';
import { userRolesENUM } from '@enums';
import axiosInstance from '@services/axiosInstance';
import LoadingIndicator from '@components/LoadingIndicator/LoadingIndicator';

export default function LoginForm() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const uniqueId = useId();
    const isUserAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const authenticatedUserType = useSelector((state) => state.auth.userData.user_type);
    const [signingInInProgress, setSigningInInProgress] = useState(false);

    const [formData, setFormData] = useState({
        email: "",
        password: "",
        rememberMe: false,
    });

    const [errors, setErrors] = useState({
        email_error: "",
        password_error: "",
        bad_data_error: "",
    });

    const handleFormInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value}));
    };

    const isEmailValid = () => {
        let emailValid = true;
        if(formData.email === ""){
            setErrors((prev) => ({ ...prev, email_error: "email must be filled!"}));
            emailValid = false;
        }
        else {
            setErrors((prev) => ({ ...prev, email_error: ""}));
        }

        return emailValid;
    }

    const isPasswordValid = () => {
        let passwordValid = true;
        if(formData.password === ""){
            setErrors((prev) => ({ ...prev, password_error: "password must be filled!"}));
            passwordValid = false;
        }
        else {
            setErrors((prev) => ({ ...prev, password_error: ""}));
        }

        return passwordValid;
    } 

    const validateFormData = () => {
        let formValid = true;
        formValid = isEmailValid();
        formValid = isPasswordValid();

        return formValid;
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        if(!validateFormData()) return;

        setSigningInInProgress(true);
        const { rememberMe, ...requestBody } = formData;

        try{
            const response = await axiosInstance.post('/v1/auth/authenticate', requestBody);

            sessionStorage.setItem("Bearer_token", response.data.access_token)
            localStorage.setItem("Refresh_token", response.data.refresh_token)

            const userInfo = {
                email: requestBody.email,
                first_name: response.data.first_name,
                last_name: response.data.last_name,
                user_type: response.data.role,
                uuid: response.data.user_id,
            }

            // setErrors((prev) => ({ ...prev, bad_data_error: "" }));
            // setSigningInInProgress(false);
            dispatch(loginUser(userInfo));

            if(userInfo.user_type === userRolesENUM.PATIENT){
                const isQuestionnaireCompleted = await checkIfPatientQuestionnaireIsCompleted(userInfo.uuid);

                if(isQuestionnaireCompleted){
                    navigate("/patient/dashboard");
                }
                else{
                    navigate("/patient/questionnaire");
                }
            }
            else if(userInfo.user_type === userRolesENUM.DIETITIAN){
                navigate("/dietitian/dashboard");
            }
            else{
                console.error("Unknown user type passed by server");
                setSigningInInProgress(false);
            }
        }
        catch(error){
            if(error.response && error.response.status === 403){
                setErrors((prev) => ({ ...prev, bad_data_error: "Incorrect email or password!" }));
            }
            else{
                setErrors((prev) => ({ ...prev, bad_data_error: "Failed to sign in, please try again later" }));
            }
            
            setSigningInInProgress(false);
            console.error(error);
        }
    }   

    const checkIfPatientQuestionnaireIsCompleted = async (userId) => {
        try{
            const response = await axiosInstance.get(`/v1/patients/${userId}/questionnaire-status`);
            
            dispatch(setIsQuestionnaireCompleted({ isQuestionnaireCompleted: response.data.is_questionnaire_completed}));
            return response.data.is_questionnaire_completed;
        }
        catch(error){
            if(error.response && error.response.status === 403){
                setErrors((prev) => ({ ...prev, bad_data_error: "Failed to authenticate with JWT, please try again later" }));
            }
            else if(error.response && error.response.status === 404){
                setErrors((prev) => ({ ...prev, bad_data_error: "Patient not found" }));
            }
            else{
                setErrors((prev) => ({ ...prev, bad_data_error: "Failed to check if patient completed questionnaire" }));
            }

            setSigningInInProgress(false);
            console.error(error);
        }
    } 


    

    useEffect(() => {
        if(isUserAuthenticated){
            if(authenticatedUserType === userRolesENUM.PATIENT){
                navigate("/patient/dashboard");
            }
            else if(authenticatedUserType === userRolesENUM.DIETITIAN){
                navigate("/dietitian/dashboard");
            }
            else{
                console.error("Unknown user type authenticated");
            }
        }
    }, []);

    return (
        <div className={styles.main_container}>
            <form onSubmit={handleFormSubmit} className={styles.login_form}>
                <div className={styles.input_container}>
                    <label htmlFor={`${uniqueId}_login_form_email`} className={styles.form_label}>Email:</label>
                    <input 
                        type="email" 
                        name="email" 
                        id={`${uniqueId}_login_form_email`}
                        className={styles.form_input}
                        value={formData.email} 
                        placeholder="john.wiliams@gmail.com" 
                        onChange={handleFormInputChange} 
                        onBlur={isEmailValid}
                        autoComplete="off"
                    />
                </div>
                {errors.email_error && <p className={styles.error_message}>{errors.email_error}</p>}

                <div className={styles.input_container}>
                    <label htmlFor={`${uniqueId}_login_form_password`} className={styles.form_label}>Password:</label>
                    <input 
                        type="password" 
                        name="password" 
                        id={`${uniqueId}_login_form_password`}
                        className={styles.form_input}
                        value={formData.password} 
                        placeholder="Password" 
                        onChange={handleFormInputChange} 
                        onBlur={isPasswordValid}
                        autoComplete="off"
                    />
                </div>
                {errors.password_error && <p className={styles.error_message}>{errors.password_error}</p>}

                {signingInInProgress && (
                    <LoadingIndicator message="Checking credentials..." fontSize="1rem"/>
                )}

                <button type='submit' className={styles.form_submit_button} >Sign in</button>
                {errors.bad_data_error && (
                    <p className={styles.error_message}>{errors.bad_data_error}</p>
                )}
            </form>
        </div>
    )
}

