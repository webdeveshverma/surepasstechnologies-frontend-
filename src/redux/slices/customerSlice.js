import { createSlice } from "@reduxjs/toolkit";

// Load existing customers from LocalStorage
const loadCustomersFromStorage = () => {
  const storedCustomers = localStorage.getItem("customers");
  return storedCustomers ? JSON.parse(storedCustomers) : [];
};

const customersSlice = createSlice({
  name: "customers",
  initialState: {
    customers: loadCustomersFromStorage(),
  },
  reducers: {
    addCustomer: (state, action) => {
      const newCustomer = { ...action.payload, id: Date.now() }; // Ensure unique ID
      state.customers.push(newCustomer);
      localStorage.setItem("customers", JSON.stringify(state.customers)); // Save to LocalStorage
    },
    removeCustomer: (state, action) => {
      const updatedCustomers = state.customers.filter((c) => c.id !== action.payload);
      state.customers = updatedCustomers;
      localStorage.setItem("customers", JSON.stringify(state.customers)); // Update LocalStorage
    },
  },
});

export const { addCustomer, removeCustomer } = customersSlice.actions;
export default customersSlice.reducer;
