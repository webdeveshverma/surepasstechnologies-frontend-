import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  customers: [], // List of customers & their bills
};

const billSlice = createSlice({
  name: "bill",
  initialState,
  reducers: {
    addBill: (state, action) => {
      state.customers.push(action.payload);
    },
  },
});

export const { addBill } = billSlice.actions;
export default billSlice.reducer;
