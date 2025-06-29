import { createSlice } from "@reduxjs/toolkit";

const initialUnitsState = {
    unitsData: [],
};

export const unitsSlice = createSlice({
    name: "units",
    initialState: initialUnitsState,
    reducers: {
        setUnitsData(state, action){
            state.unitsData = action.payload.unitsData;

            console.log("[UNITS SLICE] set units: ", [ ...state.unitsData ]);
        },
    },
});

export const { setUnitsData } = unitsSlice.actions;
export default unitsSlice.reducer;