import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeCustomer } from "../redux/slices/customerSlice";
import { 
  Button, Table, TableHead, TableRow, TableCell, TableBody, Typography, 
  Paper, Box, TablePagination 
} from "@mui/material";
import InvoicePrint from "./InvoicePrint"; // PDF Generator Function

const CustomersList = () => {
  const customers = useSelector((state) => state.customers.customers); // Redux se customers data la rahe hain
  const dispatch = useDispatch();

  // Pagination States
  const [page, setPage] = useState(0);  // Current Page
  const [rowsPerPage, setRowsPerPage] = useState(5); // Rows per page

  // Handle Page Change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle Rows per Page Change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to first page
  };

  return (
    <Paper sx={{ padding: 2, marginTop: 2, overflowX: "auto" }}> {/* Scrollable table on small screens */}
      <Typography variant="h5" gutterBottom>
        Customers List
      </Typography>

      {customers.length === 0 ? (
        <Typography variant="body1" color="textSecondary">
          No customers found.
        </Typography>
      ) : (
        <>
          <Box sx={{ width: "100%", overflowX: "auto" }}> {/* Table Responsive */}
            <Table sx={{ minWidth: 750 }}> {/* Ensures table doesn't shrink too much */}
              <TableHead>
                <TableRow>
                  <TableCell><b>Name</b></TableCell>
                  <TableCell><b>Billing Date</b></TableCell>
                  <TableCell><b>Contact</b></TableCell>
                  <TableCell><b>Address</b></TableCell>
                  <TableCell><b>Quantity</b></TableCell>
                  <TableCell><b>Total Price</b></TableCell>
                  <TableCell><b>Actions</b></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {customers
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) // Apply Pagination
                  .map((customer, index) => {
                    // Calculate Total Price
                    const totalAmount = customer.products?.reduce((sum, p) => sum + Number(p.price) * Number(p.quantity), 0) || 0;
                    // Calculate Total Quantity
                    const totalQuantity = customer.products?.reduce((sum, p) => sum + Number(p.quantity), 0) || 0;

                    return (
                      <TableRow key={index}>
                        <TableCell>{customer.name}</TableCell>
                        <TableCell>{customer.billingDate}</TableCell>
                        <TableCell>{customer.contact}</TableCell>
                        <TableCell>{customer.address}</TableCell>
                        <TableCell>{totalQuantity}</TableCell>
                        <TableCell>₹{totalAmount}</TableCell>
                        <TableCell>
                          <Box 
                            sx={{ 
                              display: "flex", 
                              flexDirection: { xs: "column", sm: "row" }, 
                              gap: 1 
                            }}
                          >
                            {/* Download PDF Button */}
                            <Button 
                              variant="contained" 
                              color="primary" 
                              size="small"
                              onClick={() => InvoicePrint(customer)} // PDF Generate karega
                            >
                              Download PDF
                            </Button>

                            {/* Delete Button */}
                            <Button 
                              variant="contained" 
                              color="error" 
                              size="small"
                              onClick={() => dispatch(removeCustomer(customer.id))}
                            >
                              Delete
                            </Button>
                          </Box>
                        </TableCell>
                      </TableRow>
                    );
                })}
              </TableBody>
            </Table>
          </Box>

          {/* Pagination Controls */}
          <TablePagination
            component="div"
            count={customers.length} // Total Customers
            page={page}
            rowsPerPage={rowsPerPage}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[5, 10, 15]} // Options for rows per page
          />
        </>
      )}
    </Paper>
  );
};

export default CustomersList;
