import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isDrawerOpen: false,
};

const UISlice = createSlice({
    name: "UI",
    initialState,
    reducers: {
        openDrawer: (state, action) => {
            state.isDrawerOpen = true;
        },
        closeDrawer: (state, action) => {
            state.isDrawerOpen = false;
        },
    },
});

export default UISlice.reducer;
export const { openDrawer, closeDrawer } = UISlice.actions;
