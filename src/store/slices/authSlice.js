import { createSlice } from "@reduxjs/toolkit";
import { userRolesENUM } from "@enums";

const initialUserState = {
    isAuthGettingLoaded: true,
    isAuthenticated: false,
    userData: {
        email: null,
        first_name: null,
        last_name: null,
        user_type: userRolesENUM.GUEST,
        uuid: null,
    },
};

export const authSlice = createSlice({
    name: "auth",
    initialState: initialUserState,
    reducers: {
        loginUser(state, action){
            state.isAuthenticated = true;
            
            state.userData.email = action.payload.email;
            state.userData.first_name = action.payload.first_name;
            state.userData.last_name = action.payload.last_name;
            state.userData.user_type = action.payload.user_type;
            state.userData.uuid = action.payload.uuid;

            state.isAuthGettingLoaded = false;

            console.log({ ...state.userData });
        },
        logoutUser(state){
            state.isAuthenticated = false;

            state.userData.email = null;
            state.userData.first_name = null;
            state.userData.last_name = null;
            state.userData.user_type = userRolesENUM.GUEST;
            state.userData.uuid = null;

            console.log("user log out!");
        },
        setAuthIsGettingLoaded(state, action){
            state.isAuthGettingLoaded = action.payload.isAuthGettingLoaded;
        }
    },
});

export const { 
    loginUser, 
    registerDietitian, 
    registerPatient, 
    logoutUser, 
    setAuthIsGettingLoaded 
} = authSlice.actions;
export default authSlice.reducer;