import React, { useState } from "react";
import CustomersList from "../components/CustomersList";
import BillGenerator from "../components/BillGenerator";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("customers");

  return (
    <div style={{ display: "flex" }}>
      {/* Sidebar */}
      <div style={{ width: "250px", background: "#222", color: "#fff", height: "100vh", padding: "20px" }}>
        <h2>Dashboard</h2>
        <button onClick={() => setActiveTab("customers")} style={{ display: "block", margin: "10px 0" }}>
          Customers List
        </button>
        <button onClick={() => setActiveTab("bill")} style={{ display: "block", margin: "10px 0" }}>
          Bill Generator
        </button>
      </div>

      {/* Content Area */}
      <div style={{ padding: "20px", flex: 1 }}>
        {activeTab === "customers" ? <CustomersList /> : <BillGenerator />}
      </div>
    </div>
  );
};

export default Dashboard;
