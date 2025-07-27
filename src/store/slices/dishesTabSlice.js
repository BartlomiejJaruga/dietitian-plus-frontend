import { createSlice } from "@reduxjs/toolkit";

const initialDishesTabState = {
    currentlyEditedDish: null,
    hasDishesChanged: false,
};

export const dishesTabSlice = createSlice({
    name: "dishesTab",
    initialState: initialDishesTabState,
    reducers: {
        setCurrentlyEditedDish(state, action){
            state.currentlyEditedDish = action.payload.dishData;
        },
        clearCurrentlyEditedDish(state){
            state.currentlyEditedDish = null;
        },
        setHasDishesChanged(state, action){
            state.hasDishesChanged = action.payload.hasDishesChanged;
        }
    },
});

export const { 
    setCurrentlyEditedDish,
    clearCurrentlyEditedDish,
    setHasDishesChanged
} = dishesTabSlice.actions;

export default dishesTabSlice.reducer;