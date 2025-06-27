import { setIsQuestionnaireCompleted } from "@slices/patientSlice";
import { sessionSavedSettingsDataENUM } from "@enums";

export const patientMiddleware = store => next => action => {
    if (setIsQuestionnaireCompleted.match(action)) {
        const isCompleted = action.payload;

        sessionStorage.setItem(
            sessionSavedSettingsDataENUM.IS_PATIENT_QUESTIONNAIRE_COMPLETED,
            JSON.stringify(isCompleted)
        );
    }

    return next(action);
};
