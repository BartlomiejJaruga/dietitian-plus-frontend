import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@slices/authSlice";
import patientReducer from "@slices/patientSlice";
import unitsReducer from "@slices/unitsSlice";
import dishesTabReducer from "@slices/dishesTabSlice";
import patientsTabReducer from "@slices/patientsTabSlice";
import { authMiddleware } from "@middlewares/authMiddleware";
import { patientMiddleware } from "@middlewares/patientMiddleware";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        patient: patientReducer,
        units: unitsReducer,
        dishesTab: dishesTabReducer,
        patientsTab: patientsTabReducer,
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(authMiddleware, patientMiddleware),
});