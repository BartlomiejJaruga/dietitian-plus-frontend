import styles from './PatientRegisterForm.module.scss';

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { userRolesENUM } from '@enums';
import LoadingIndicator from '@components/LoadingIndicator/LoadingIndicator';
import axiosInstance from '@services/axiosInstance';

export default function PatientRegisterForm() {
    const navigate = useNavigate();
    const isUserAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const authenticatedUserType = useSelector((state) => state.auth.userData.user_type);
    const [registeringInProgress, setRegisteringInProgress] = useState(false);

    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        repeat_email: "",
        password: "",
        repeat_password: "",
    });

    const [errors, setErrors] = useState({
        email_error: "",
        password_error: "",
        bad_data_error: "",
    });

    const handleFormInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value}));
    };

    const validateRepeatEmail = () => {
        if(formData.email !== formData.repeat_email && formData.email !== "" && formData.repeat_email !== ""){
            setErrors((prev) => ({ ...prev, email_error: "emails must match!"}));
        }
        else {
            setErrors((prev) => ({ ...prev, email_error: ""}));
        }
    }

    const validateRepeatPassword = () => {
        if(formData.password !== formData.repeat_password && formData.password !== "" && formData.repeat_password !== ""){
            setErrors((prev) => ({ ...prev, password_error: "password must match!"}));
        }
        else {
            setErrors((prev) => ({ ...prev, password_error: ""}));
        }
    } 

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setRegisteringInProgress(true);
        
        const requestBody = {
            email: formData.email,
            password: formData.password,
            role: userRolesENUM.PATIENT,
            first_name: formData.first_name,
            last_name: formData.last_name,
        }

        try {
            const response = await axiosInstance.post('/v1/auth/register', requestBody);
            
            console.log(response);

            // setErrors((prev) => ({ ...prev, bad_data_error: ""}));
            // setRegisteringInProgress(false);
            navigate("/auth?authType=login");
        }
        catch (error) {
            if(error.response && error.response.status === 400){
                setErrors((prev) => ({ ...prev, bad_data_error: error.response.data.message }));
            }
            else{
                setErrors((prev) => ({ ...prev, bad_data_error: "Failed to register user, please try again later" }));
            }
            
            setRegisteringInProgress(false);
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
            <form onSubmit={handleFormSubmit} className={styles.patient_register_form}>
                <div className={styles.input_container}>
                    <label htmlFor="patient_register_form_first_name" className={styles.form_label}>Name:</label>
                    <input name="first_name" 
                            id="patient_register_form_first_name"
                            className={styles.form_input}
                            value={formData.first_name} 
                            placeholder="Your Name" 
                            onChange={handleFormInputChange} 
                            autoComplete="off"
                            required/>
                </div>
                
                <div className={styles.input_container}>
                    <label htmlFor="patient_register_form_last_name" className={styles.form_label}>Surname:</label>
                    <input name="last_name"
                            id="patient_register_form_last_name"
                            className={styles.form_input}
                            value={formData.last_name}
                            placeholder="Your Surname"
                            onChange={handleFormInputChange}
                            autoComplete="off"
                            required/>
                </div>

                <div className={styles.input_container}>
                    <label htmlFor="patient_register_form_email" className={styles.form_label}>Email:</label>
                    <input type="email" 
                            name="email" 
                            id="patient_register_form_email"
                            className={styles.form_input}
                            value={formData.email} 
                            placeholder="john.wiliams@gmail.com" 
                            onChange={handleFormInputChange} 
                            onBlur={validateRepeatEmail} 
                            autoComplete="off"
                            required/>
                </div>

                <div className={styles.input_container}>
                    <label htmlFor="patient_register_form_repeat_email" className={styles.form_label}>Repeat Email:</label>
                    <input type="email" 
                            name="repeat_email" 
                            id="patient_register_form_repeat_email"
                            className={styles.form_input}
                            value={formData.repeat_email} 
                            placeholder="john.wiliams@gmail.com" 
                            onChange={handleFormInputChange} 
                            onBlur={validateRepeatEmail} 
                            autoComplete="off"
                            required/>
                </div>

                {errors.email_error && <p className={styles.error_message}>{errors.email_error}</p>}

                <div className={styles.input_container}>
                    <label htmlFor="patient_register_form_password" className={styles.form_label}>Password:</label>
                    <input type="password" 
                            name="password" 
                            id="patient_register_form_password"
                            className={styles.form_input}
                            value={formData.password} 
                            placeholder="Password" 
                            onChange={handleFormInputChange} 
                            autoComplete="off"
                            required/>
                </div>

                <div className={styles.input_container}>
                    <label htmlFor="patient_register_form_repeat_password" className={styles.form_label}>Repeat Password:</label>
                    <input type="password" 
                            name="repeat_password" 
                            id="patient_register_form_repeat_password"
                            className={styles.form_input}
                            value={formData.repeat_password} 
                            placeholder="Repeat Password" 
                            onChange={handleFormInputChange} 
                            onBlur={validateRepeatPassword} 
                            autoComplete="off"
                            required/>
                </div>

                {errors.password_error && <p className={styles.error_message}>{errors.password_error}</p>}

                {registeringInProgress && (
                    <div>
                        <LoadingIndicator message="Checking credentials..." fontSize={"1rem"} />
                    </div>
                )}
                <button type='submit' className={styles.form_submit_button} >Change your life</button>
                {errors.bad_data_error && (
                    <p className={styles.error_message}>{errors.bad_data_error}</p>
                )}
            </form>
        </div>
    )
}

