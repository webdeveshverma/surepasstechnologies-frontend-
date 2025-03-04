import React from "react";
import { useSelector } from "react-redux";

const CustomerList = () => {
  const customers = useSelector((state) => state.bills); // Redux store se data lena

  return (
    <div style={{ padding: "20px" }}>
      <h2>Customer List</h2>
      <table border="1" cellPadding="10" width="100%">
        <thead>
          <tr>
            <th>Client Name</th>
            <th>Product Quantity</th>
            <th>Billing Date</th>
            <th>Contact</th>
            <th>Address</th>
            <th>Billing Price</th>
          </tr>
        </thead>
        <tbody>
          {customers.length > 0 ? (
            customers.map((customer, index) => (
              <tr key={index}>
                <td>{customer.name}</td>
                <td>{customer.quantity}</td>
                <td>{customer.date}</td>
                <td>{customer.contact}</td>
                <td>{customer.address}</td>
                <td>₹{customer.price}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No Customers Yet</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerList;
