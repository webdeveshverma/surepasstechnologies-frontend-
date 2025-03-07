import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../redux/slices/authSlice";
import CustomersList from "../components/CustomersList";
import BillGenerator from "../components/BillGenerator";
import { Box, Button, Typography } from "@mui/material";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("customers");
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    window.location.href = "/login";
  };

  return (
    <Box display="flex" height="100vh">
      {/* Sidebar */}
      <Box
        sx={{
          width: "250px",
          background: "#1E1E2F",
          color: "#fff",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold" }}>
            Dashboard
          </Typography>
          <Button
            fullWidth
            variant={activeTab === "customers" ? "contained" : "outlined"}
            sx={{ marginBottom: 2, color: "#fff", borderColor: "#fff" }}
            onClick={() => setActiveTab("customers")}
          >
            Customers List
          </Button>
          <Button
            fullWidth
            variant={activeTab === "bill" ? "contained" : "outlined"}
            sx={{ marginBottom: 2, color: "#fff", borderColor: "#fff" }}
            onClick={() => setActiveTab("bill")}
          >
            Bill Generator
          </Button>
        </Box>
        <Button
          fullWidth
          variant="contained"
          color="error"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Box>

      {/* Main Content */}
      <Box flex={1} padding={3} bgcolor="#F4F4F4">
        {activeTab === "customers" ? <CustomersList /> : <BillGenerator />}
      </Box>
    </Box>
  );
};

export default Dashboard;