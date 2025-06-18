import { createSlice } from "@reduxjs/toolkit";

const initialPatientState = {
    isQuestionnaireCompleted: false,
};

export const patientSlice = createSlice({
    name: "patient",
    initialState: initialPatientState,
    reducers: {
        setIsQuestionnaireCompleted(state, action){
            state.isQuestionnaireCompleted = action.payload.isQuestionnaireCompleted;

            console.log("is questionnaire completed: ", state.isQuestionnaireCompleted);
        },
    },
});

export const { setIsQuestionnaireCompleted } = patientSlice.actions;
export default patientSlice.reducer;