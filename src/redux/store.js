import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import customerReducer from "./slices/customerSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    customers: customerReducer,
  },
});

export default store;
