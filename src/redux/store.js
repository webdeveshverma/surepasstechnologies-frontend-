import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice"; 
import billReducer from "./billSlice"; // Bill slice ko import karna


const store = configureStore({
  reducer: {
    auth: authReducer, // Authentication slice
    bills: billReducer,
  },
});

export default store;




