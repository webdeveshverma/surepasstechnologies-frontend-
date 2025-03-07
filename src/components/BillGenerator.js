import React, { useState } from "react";
import { 
    Button, TextField, Typography, Box, Paper, Grid, Checkbox, 
    FormControlLabel, Snackbar, Alert 
} from "@mui/material";
import { useDispatch } from "react-redux";
import { addCustomer } from "../redux/slices/customerSlice";
import InvoicePrint from "./InvoicePrint";

const BillGenerator = () => {
    const dispatch = useDispatch();
    const [customer, setCustomer] = useState({ name: "", contact: "", address: "", billingDate: "" });
    const [products, setProducts] = useState([{ productName: "", quantity: "", price: "" }]);
    const [downloadInvoice, setDownloadInvoice] = useState(false);
    const [alert, setAlert] = useState({ open: false, message: "", severity: "error" });

    const handleCustomerChange = (e) => {
        setCustomer({ ...customer, [e.target.name]: e.target.value });
    };

    const handleProductChange = (index, e) => {
        const newProducts = [...products];
        newProducts[index][e.target.name] = e.target.value;
        setProducts(newProducts);
    };

    const handleSubmit = () => {
        // Input Validations
        if (!customer.name.trim()) return showAlert("Customer name is required.");
        if (!/^\d{10}$/.test(customer.contact)) return showAlert("Enter a valid 10-digit phone number.");
        if (!customer.address.trim()) return showAlert("Address is required.");
        if (!customer.billingDate) return showAlert("Billing date is required.");

        for (let product of products) {
            if (!product.productName.trim()) return showAlert("Product name is required.");
            if (!product.quantity || product.quantity <= 0) return showAlert("Quantity must be greater than zero.");
            if (!product.price || product.price <= 0) return showAlert("Price must be greater than zero.");
        }

        const newCustomer = { ...customer, products };
        dispatch(addCustomer(newCustomer)); // Redux me store karega
        showAlert("Bill generated successfully!", "success");

        if (downloadInvoice) {
            InvoicePrint(newCustomer); // PDF bhi generate karega
        }
    };

    //  Show Alert
    const showAlert = (message, severity = "error") => {
        setAlert({ open: true, message, severity });
    };

    return (
        <Paper sx={{ padding: 3, maxWidth: 700, margin: "auto", marginTop: 3, width: "95%" }}>
            <Typography variant="h5" gutterBottom textAlign="center">
                Bill Generator
            </Typography>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <TextField label="Customer Name" name="name" fullWidth onChange={handleCustomerChange} required />
                <TextField label="Contact Number" name="contact" fullWidth onChange={handleCustomerChange} required />
                <TextField label="Address" name="address" fullWidth onChange={handleCustomerChange} required />
                <TextField
                    label="Billing Date"
                    name="billingDate"
                    type="date"
                    fullWidth
                    onChange={handleCustomerChange}
                    required
                    InputLabelProps={{ shrink: true }}
                />

                {products.map((product, index) => (
                    <Grid container spacing={2} key={index} sx={{ alignItems: "center" }}>
                        <Grid item xs={12} sm={4}>
                            <TextField label="Product Name" name="productName" fullWidth onChange={(e) => handleProductChange(index, e)} required />
                        </Grid>
                        <Grid item xs={6} sm={3}>
                            <TextField label="Quantity" name="quantity" type="number" fullWidth onChange={(e) => handleProductChange(index, e)} required />
                        </Grid>
                        <Grid item xs={6} sm={3}>
                            <TextField label="Price" name="price" type="number" fullWidth onChange={(e) => handleProductChange(index, e)} required />
                        </Grid>
                    </Grid>
                ))}

                <FormControlLabel
                    control={<Checkbox checked={downloadInvoice} onChange={(e) => setDownloadInvoice(e.target.checked)} />}
                    label="Download Invoice after Generating Bill"
                    sx={{ marginTop: 1 }}
                />

                <Button variant="contained" color="primary" fullWidth sx={{ padding: 1 }} onClick={handleSubmit}>
                    Generate Bill
                </Button>
            </Box>

            {/* Snackbar Alert */}
            <Snackbar open={alert.open} autoHideDuration={3000} onClose={() => setAlert({ ...alert, open: false })}>
                <Alert onClose={() => setAlert({ ...alert, open: false })} severity={alert.severity} sx={{ width: "100%" }}>
                    {alert.message}
                </Alert>
            </Snackbar>
        </Paper>
    );
};

export default BillGenerator;
