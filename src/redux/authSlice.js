import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: localStorage.getItem("auth") === "true", // Check localStorage
  },
  reducers: {
    login: (state) => {
      state.isAuthenticated = true;
      localStorage.setItem("auth", "true"); // Persist login
    },
    logout: (state) => {
      state.isAuthenticated = false;
      localStorage.removeItem("auth"); // Remove login state
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
