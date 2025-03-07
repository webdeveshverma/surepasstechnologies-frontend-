import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const InvoicePrint = (customer) => {
  if (!customer || !customer.products || customer.products.length === 0) {
    console.error("Customer data is invalid:", customer);
    return;
  }

  const doc = new jsPDF();
  doc.text("Invoice", 14, 15);
  doc.text(`Customer: ${customer.name}`, 14, 25);
  doc.text(`Billing Date: ${customer.billingDate}`, 14, 35);

  const tableColumn = ["Product Name", "Quantity", "Price", "Total"];
  const tableRows = customer.products.map((product) => [
    product.productName,
    product.quantity,
    `₹${product.price}`,
    `₹${product.quantity * product.price}`
  ]);

  autoTable(doc, {
    head: [tableColumn],
    body: tableRows,
    startY: 45,
  });

  const totalAmount = customer.products.reduce((sum, p) => sum + Number(p.price) * Number(p.quantity), 0);
  doc.text(`Total Amount: ₹${totalAmount}`, 14, doc.lastAutoTable.finalY + 10);

  doc.save(`Invoice_${customer.name}.pdf`);
};

export default InvoicePrint;
