import styles from './DietitianRegisterForm.module.scss';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { registerDietitian } from "@slices/authSlice";

export default function DietitianRegisterForm() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        repeat_email: "",
        password: "",
        repeat_password: "",
        phone_number: "",
    });

    const [errors, setErrors] = useState({
        email_error: "",
        password_error: "",
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

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const { repeat_email, repeat_password, ...strippedFormData } = formData;
        console.log(strippedFormData);

        let userInfo = {
            email: strippedFormData.email,
            first_name: strippedFormData.first_name,
            last_name: strippedFormData.last_name,
        }

        dispatch(registerDietitian(userInfo));
        navigate("/dietitian/dashboard");
    }

    return (
        <div className={styles.main_container}>
            <form onSubmit={handleFormSubmit} className={styles.dietitian_register_form}>
                <div className={styles.input_container}>
                    <label htmlFor="dietitian_register_form_first_name" className={styles.form_label}>Name:</label>
                    <input name="first_name" 
                            id="dietitian_register_form_first_name"
                            className={styles.form_input}
                            value={formData.first_name} 
                            placeholder="Your Name" 
                            onChange={handleFormInputChange} 
                            autoComplete="off"
                            required/>
                </div>
                
                <div className={styles.input_container}>
                    <label htmlFor="dietitian_register_form_last_name" className={styles.form_label}>Surname:</label>
                    <input name="last_name"
                            id="dietitian_register_form_last_name"
                            className={styles.form_input}
                            value={formData.last_name}
                            placeholder="Your Surname"
                            onChange={handleFormInputChange}
                            autoComplete="off"
                            required/>
                </div>

                <div className={styles.input_container}>
                    <label htmlFor="dietitian_register_form_email" className={styles.form_label}>Email:</label>
                    <input type="email" 
                            name="email" 
                            id="dietitian_register_form_email"
                            className={styles.form_input}
                            value={formData.email} 
                            placeholder="john.wiliams@gmail.com" 
                            onChange={handleFormInputChange} 
                            onBlur={validateRepeatEmail} 
                            autoComplete="off"
                            required/>
                </div>

                <div className={styles.input_container}>
                    <label htmlFor="dietitian_register_form_repeat_email" className={styles.form_label}>Repeat Email:</label>
                    <input type="email" 
                            name="repeat_email" 
                            id="dietitian_register_form_repeat_email"
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
                    <label htmlFor="dietitian_register_form_password" className={styles.form_label}>Password:</label>
                    <input type="password" 
                            name="password" 
                            id="dietitian_register_form_password"
                            className={styles.form_input}
                            value={formData.password} 
                            placeholder="Password" 
                            onChange={handleFormInputChange} 
                            autoComplete="off"
                            required/>
                </div>

                <div className={styles.input_container}>
                    <label htmlFor="dietitian_register_form_repeat_password" className={styles.form_label}>Repeat Password:</label>
                    <input type="password" 
                            name="repeat_password" 
                            id="dietitian_register_form_repeat_password"
                            className={styles.form_input}
                            value={formData.repeat_password} 
                            placeholder="Repeat Password" 
                            onChange={handleFormInputChange} 
                            onBlur={validateRepeatPassword} 
                            autoComplete="off"
                            required/>
                </div>

                {errors.password_error && <p className={styles.error_message}>{errors.password_error}</p>}

                <div className={styles.input_container}>
                    <label htmlFor="dietitian_register_form_phone" className={styles.form_label}>Phone Number:</label>
                    <input type='tel'
                        name="phone_number" 
                        id="dietitian_register_form_phone"
                            className={styles.form_input}
                        value={formData.phone_number} 
                        placeholder="123456789" 
                        pattern="\d{9}"
                        onChange={handleFormInputChange} 
                        autoComplete="off"
                        required/>
                </div>

                <button type='submit' className={styles.form_submit_button} >Send register request</button>
            </form>
        </div>
    )
}

