import { createSlice } from "@reduxjs/toolkit";

const initialDishesTabState = {
    currentlyEditedDish: null,
};

export const dishesTabSlice = createSlice({
    name: "dishesTab",
    initialState: initialDishesTabState,
    reducers: {
        setCurrentlyEditedDish(state, action){
            state.currentlyEditedDish = action.payload.dishData;

            console.log('[DishesTab SLICE] setCurrentlyEditedDish:', { ...state.currentlyEditedDish });
        },
        clearCurrentlyEditedDish(state){
            state.currentlyEditedDish = null;
        }
    },
});

export const { 
    setCurrentlyEditedDish,
    clearCurrentlyEditedDish
} = dishesTabSlice.actions;

export default dishesTabSlice.reducer;