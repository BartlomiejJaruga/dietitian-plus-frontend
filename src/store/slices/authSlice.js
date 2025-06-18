import { createSlice } from "@reduxjs/toolkit";
import { userRolesENUM } from "@enums";

const initialUserState = {
    isAuthenticated: false,
    userData: {
        email: null,
        first_name: null,
        last_name: null,
        user_type: userRolesENUM.GUEST,
    },
};

export const authSlice = createSlice({
    name: "auth",
    initialState: initialUserState,
    reducers: {
        registerDietitian(state, action){
            state.isAuthenticated = true;
            state.userData.email = action.payload.email;
            state.userData.first_name = action.payload.first_name;
            state.userData.last_name = action.payload.last_name;
            state.userData.user_type = userRolesENUM.DIETITIAN;
            
            console.log({ ...state.userData });
        },
        registerPatient(state, action){
            state.isAuthenticated = true;
            state.userData.email = action.payload.email;
            state.userData.first_name = action.payload.first_name;
            state.userData.last_name = action.payload.last_name;
            state.userData.user_type = userRolesENUM.PATIENT;
            
            console.log({ ...state.userData });
        },
        loginUser(state, action){
            state.isAuthenticated = true;
            state.userData.email = action.payload.email;
            state.userData.first_name = action.payload.first_name;
            state.userData.last_name = action.payload.last_name;
            state.userData.user_type = action.payload.user_type;

            console.log({ ...state.userData });
        },
        logoutUser(state){
            state.isAuthenticated = false;
            state.userData.email = null;
            state.userData.first_name = null;
            state.userData.last_name = null;
            state.userData.user_type = userRolesENUM.GUEST;

            console.log("user log out!");
        },
    },
});

export const { loginUser, registerDietitian, registerPatient, logoutUser } = authSlice.actions;
export default authSlice.reducer;