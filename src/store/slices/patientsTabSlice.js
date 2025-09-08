import { createSlice } from "@reduxjs/toolkit";

const initialPatientsTabState = {
    hasPatientsChanged: false,
};

export const patientsTabSlice = createSlice({
    name: "patientsTab",
    initialState: initialPatientsTabState,
    reducers: {
        setHasPatientsChanged(state, action){
            state.hasPatientsChanged = action.payload.hasPatientsChanged;
        }
    },
});

export const { 
    setHasPatientsChanged
} = patientsTabSlice.actions;

export default patientsTabSlice.reducer;