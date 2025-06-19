import React, { useState } from "react";
import styles from "./Agreement.module.scss";
import axiosInstance from "@services/axiosInstance";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setIsQuestionnaireCompleted } from "@slices/patientSlice";

const Agreement = ({ onBack, questionnaireData }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const userId = useSelector((state) => state.auth.userData.uuid);
	const [isScrolledToBottom, setIsScrolledToBottom] = useState(false);

	const handleScroll = (e) => {
		const { scrollTop, scrollHeight, clientHeight } = e.target;
		const isAtBottom = scrollTop + clientHeight >= scrollHeight - 10;
		setIsScrolledToBottom(isAtBottom);
	};

	const handleQuestionnaireAgreement = async () => {
		const palFormat = {
			low: 1.4,
			middle: 1.6,
			high: 1.8,
		}[questionnaireData.pal]

		const responseBody = {
			height: questionnaireData.height,
			starting_weight: questionnaireData.weight,
			pal: palFormat,
			birthdate: questionnaireData.birthDate,
			// gender: questionnaireData.gender,
		}

		try{
			const response = await axiosInstance.post(
				`/v1/patients/${userId}/questionnaire`,
				responseBody
			);

			console.log(response.data.message);

			dispatch(setIsQuestionnaireCompleted({ isQuestionnaireCompleted: true }));
			navigate('/patient/dashboard');
		}
		catch(error){
			console.error(error);
		}
	}

	return (
		<div className={styles.agreementContainer}>
		<div className={styles.box}>
			<div className={styles.header}>
			<h1>Agreement</h1>
			</div>

			<div className={styles.middleSection} onScroll={handleScroll}>
			<div className={styles.termsBox}>
				<div className={styles.termsTitle}>Terms & Conditions - Dietitian+</div>
				
			<h2>1. Introduction</h2>
				<p>
					Welcome to Dietitian+ ("we", "us", or "our"). By accessing or using our platform, website, mobile application, or any related services (collectively, the "Service"), you agree to comply with and be bound by these Terms & Conditions ("Terms"). Please read them carefully before using the Service.
				</p>
				<p>If you do not agree with any part of these Terms, you must not use our Service.</p>

				<h2>2. Nature of the Service</h2>
				<p>
					Dietitian+ is a platform designed to connect users ("Clients") with certified dietitians ("Dietitians") for the purpose of dietary guidance, health planning, and nutrition-related communication. We provide the infrastructure to facilitate this interaction, but we do not provide medical advice, diagnoses, or treatments ourselves.
				</p>
				<p>
					All information, guidance, and plans are prepared and delivered by third-party dietitians registered within the platform. Dietitian+ does not employ these professionals, nor does it directly supervise, evaluate, or certify their qualifications beyond basic onboarding verification.
				</p>

				<h2>3. No Medical Liability</h2>
				<p>
					Dietitian+ is not a medical service. The Service is not intended to replace professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions regarding a medical condition or dietary restriction.
				</p>
				<p>
					In case of emergency or severe reaction (e.g., anaphylaxis, severe allergic reaction, or any medical emergency), you must contact local emergency services immediately. Dietitian+ is not liable for any medical emergencies or consequences arising from the use of the platform.
				</p>

				<h2>4. User Responsibilities</h2>
				<p>By using Dietitian+, you agree to provide truthful, accurate, current, and complete information, including:</p>
				<ul>
					<li>Your date of birth, gender, weight, height, and physical activity level</li>
					<li>Any known allergies, intolerances, or medical conditions</li>
					<li>Dietary preferences or restrictions</li>
				</ul>
				<p>
					Providing incorrect or incomplete information may lead to the creation of inappropriate or unsafe nutrition plans. You acknowledge that failure to provide accurate data may result in health risks, and that Dietitian+ is not responsible for any outcomes resulting from such false or incomplete data.
				</p>

				<h2>5. Liability Disclaimer</h2>
				<p>
					While we strive to connect users with qualified dietitians, Dietitian+ does not guarantee the effectiveness, safety, or suitability of any diet, recommendation, product, or service offered through the platform.
				</p>
				<p>We are not responsible for:</p>
				<ul>
					<li>Errors, omissions, or negligence on the part of any registered Dietitian</li>
					<li>Any adverse health effects or outcomes resulting from a diet plan</li>
					<li>Allergic reactions, deficiencies, or medical conditions caused by following dietary guidance through the platform</li>
				</ul>
				<p>All users engage with dietitians and follow nutritional plans at their own risk.</p>

				<h2>6. Professional Conduct of Dietitians</h2>
				<p>
					Dietitians using the platform are expected to act in accordance with the professional standards of their country or jurisdiction. Dietitian+ does not take responsibility for:
				</p>
				<ul>
					<li>Inaccurate or harmful recommendations made by a Dietitian</li>
					<li>Unethical or unprofessional behavior by any registered professional</li>
					<li>Lack of qualifications, certification, or experience beyond the scope of our internal verification process</li>
				</ul>
				<p>
					We reserve the right to suspend or remove any Dietitian from the platform if credible concerns are raised. However, we are not liable for their conduct or outcomes.
				</p>

				<h2>7. Data Privacy and Processing</h2>
				<p>
					By using our platform, you agree to the collection, processing, and storage of your personal data, including sensitive health information, in accordance with our Privacy Policy and applicable data protection laws (e.g., GDPR).
				</p>
				<p>
					Your data may be stored securely in encrypted databases and may be shared only with your selected dietitian(s) within the context of your dietary care.
				</p>
				<p>You have the right to:</p>
				<ul>
					<li>Access and modify your personal information</li>
					<li>Request data deletion</li>
					<li>Withdraw consent at any time (which may affect your ability to use the service)</li>
				</ul>
				<p>For more information, see our full Privacy Policy.</p>

				<h2>8. Limitation of Liability</h2>
				<p>
					To the fullest extent permitted by law, Dietitian+ disclaims all liability for any direct, indirect, incidental, consequential, or special damages arising from:
				</p>
				<ul>
					<li>Use or inability to use the Service</li>
					<li>Errors or inaccuracies in information provided by Dietitians or Users</li>
					<li>Any health issues, including injuries or illnesses, resulting from a dietary plan</li>
					<li>Technical failures or platform outages</li>
				</ul>
				<p>
					Use of the platform is provided "as is" and "as available" without warranties of any kind.
				</p>

				<h2>9. Intellectual Property</h2>
				<p>
					All content on the platform, including but not limited to logos, branding, software code, text, graphics, and layout, is the property of Dietitian+ or its licensors and is protected by intellectual property laws. You may not copy, reproduce, or distribute any part of the Service without express written consent.
				</p>

				<h2>10. Governing Law</h2>
				<p>
					These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which the company is legally registered, without regard to its conflict of law provisions.
				</p>
				<p>
					Any disputes arising under or in connection with these Terms will be subject to the exclusive jurisdiction of the courts located in that jurisdiction.
				</p>

				<h2>11. Changes to These Terms</h2>
				<p>
					Dietitian+ reserves the right to update or modify these Terms at any time. Users will be notified of material changes. Continued use of the Service after such changes constitutes acceptance of the revised Terms.
				</p>
				<div className={styles.consentText}>
				I consent to the processing and storage of my personal and health-related data provided in this form for the purposes of personalised dietary planning. I understand that providing false or incomplete information may be dangerous to my health. I further acknowledge that Dietitian+ is not liable for the consequences of such false or inappropriate data.
				</div>
			</div>
			</div>

			<div className={styles.buttonContainer}>
			<button className={styles.backBtn} onClick={onBack}>
				← Back
			</button>
			<button 
				className={styles.nextBtn} 
				onClick={handleQuestionnaireAgreement}
				disabled={!isScrolledToBottom}
			>
				Start your journey
			</button>
			</div>
		</div>
		</div>
	);
};

export default Agreement;