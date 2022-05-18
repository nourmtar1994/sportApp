import { configureStore } from "@reduxjs/toolkit";
import { modeReducer } from "./ModeSlices";
import { personnelReducer } from "./PersonnelSlice";

const store = configureStore({
  reducer: {
    mode: modeReducer,
    personnel: personnelReducer,
  },
});

export default store;
