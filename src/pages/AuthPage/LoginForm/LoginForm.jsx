import styles from './LoginForm.module.scss';

import { useState, useId } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginUser } from "@slices/authSlice";
import { userRolesENUM } from '@enums';

export default function LoginForm() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const uniqueId = useId();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
        rememberMe: false,
    });

    const [errors, setErrors] = useState({
        email_error: "",
        password_error: "",
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

    const handleFormSubmit = (e) => {
        e.preventDefault();

        if(!validateFormData()) return;

        const { rememberMe, ...strippedFormData } = formData;

        let userInfo = {
            email: strippedFormData.email,
            first_name: "placeholder_name",
            last_name: "placeholder_last_name",
            user_type: userRolesENUM.PATIENT,
        }

        dispatch(loginUser(userInfo));
        navigate("/patient/dashboard");
    }

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

                <button type='submit' className={styles.form_submit_button} >Sign in</button>
            </form>
        </div>
    )
}

