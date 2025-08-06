import { loginUser, logoutUser } from "@slices/authSlice";
import { sessionSavedSettingsDataENUM } from "@enums";

export const authMiddleware = store => next => action => {
    if (loginUser.match(action)) {
        const userData = action.payload;

        sessionStorage.setItem(
            sessionSavedSettingsDataENUM.USER_DATA,
            JSON.stringify(userData)
        );
    }

    if (logoutUser.match(action)) {
        sessionStorage.removeItem(sessionSavedSettingsDataENUM.USER_DATA);
        sessionStorage.removeItem(sessionSavedSettingsDataENUM.IS_PATIENT_QUESTIONNAIRE_COMPLETED);
        sessionStorage.removeItem(sessionSavedSettingsDataENUM.UNITS_DATA);
    }

    return next(action);
};
