import { configureStore } from "@reduxjs/toolkit";
import stateReducer from "../features/State";
import userReducer from "../features/User";
export default configureStore({
  reducer: {
    state: stateReducer,
    users: userReducer,
  },
});
