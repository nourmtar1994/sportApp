import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: null,
};

export const setModeSlice = createSlice({
  name: "appMode",
  initialState,
  reducers: {
    setMode: (state, action) => {
      localStorage.setItem("sporAppMode", action.payload);

      state.value = action.payload;
    },
  },
});

export const { setMode } = setModeSlice.actions;
//reducer
export const modeReducer = setModeSlice.reducer;
