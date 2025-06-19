import styles from "./PatientQuestionnairePage.module.scss";
import React, { useState } from "react";

import WelcomePage from "./steps/WelcomePage";
import BasicInformation from "./steps/BasicInformation";
import AllergiesAndDislikeProducts from "./steps/AllergiesAndDislikedProducts";
import Agreement from "./steps/Agreement";

const FormStep = {
  WelcomePage: 0,
  BasicInformation: 1,
  AllergiesAndDislikeProducts: 2,
  Agreement: 3,
};

export default function PatientQuestionnairePage() {
    const [currentStep, setCurrentStep] = useState(FormStep.WelcomePage);
    const [questionnaireData, setQuestionnaireData] = useState({
        birthData: "",
        gender: "",
        height: "",
        weight: "",
        pal: "",
    });

    const goNext = () => {
        setCurrentStep((prev) => Math.min(prev + 1, FormStep.Agreement));
    };

    const goBack = () => {
        setCurrentStep((prev) => Math.max(prev - 1, FormStep.WelcomePage));
    };

    const renderStep = () => {
        switch (currentStep) {
        case FormStep.WelcomePage:
            return <WelcomePage onNext={goNext} />;
        case FormStep.BasicInformation:
            return (
                <BasicInformation 
                    onNext={goNext} 
                    onBack={goBack} 
                    questionnaireData={questionnaireData}
                    setQuestionnaireData={setQuestionnaireData}
                />
            );
        case FormStep.AllergiesAndDislikeProducts:
            return <AllergiesAndDislikeProducts onNext={goNext} onBack={goBack} />;
        case FormStep.Agreement:
            return (
                <Agreement 
                    onBack={goBack}
                    questionnaireData={questionnaireData}
                />
            );
        default:
            return null;
        }
    };

    return (
        <>
            <div className={styles.patient_questionnaire_container}>
                {renderStep()}
            </div>
        </>
    );
}