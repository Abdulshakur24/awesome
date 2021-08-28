import { configureStore } from "@reduxjs/toolkit";
import stateReducer from "../features/State";

export default configureStore({
  reducer: {
    state: stateReducer,
  },
});
