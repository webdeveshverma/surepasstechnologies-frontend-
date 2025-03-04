import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const billSlice = createSlice({
  name: "bills",
  initialState,
  reducers: {
    addBill: (state, action) => {
      state.push(action.payload); // Naya bill add karna
    },
  },
});

export const { addBill } = billSlice.actions;
export default billSlice.reducer;
