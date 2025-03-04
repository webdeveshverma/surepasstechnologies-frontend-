import React, { useState } from "react";

const BillGenerator = () => {
  const [products, setProducts] = useState([
    { id: 1, name: "", quantity: 1, price: 0, total: 0 }
  ]);

  const [customer, setCustomer] = useState({
    name: "",
    mobile: "",
    address: "",
    billingDate: ""
  });

  const handleProductChange = (index, field, value) => {
    const updatedProducts = [...products];
    updatedProducts[index][field] = value;
    updatedProducts[index].total =
      updatedProducts[index].quantity * updatedProducts[index].price;
    setProducts(updatedProducts);
  };

  const addProduct = () => {
    setProducts([
      ...products,
      { id: products.length + 1, name: "", quantity: 1, price: 0, total: 0 }
    ]);
  };

  const removeProduct = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  const subTotal = products.reduce((sum, item) => sum + item.total, 0);
  const tax = subTotal * 0.19;
  const grandTotal = subTotal + tax;

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Bill Generator</h2>
      <div className="grid grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Customer Name"
          className="border p-2 rounded w-full"
          value={customer.name}
          onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Mobile Number"
          className="border p-2 rounded w-full"
          value={customer.mobile}
          onChange={(e) => setCustomer({ ...customer, mobile: e.target.value })}
        />
        <input
          type="text"
          placeholder="Address"
          className="border p-2 rounded w-full"
          value={customer.address}
          onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
        />
        <input
          type="date"
          className="border p-2 rounded w-full"
          value={customer.billingDate}
          onChange={(e) => setCustomer({ ...customer, billingDate: e.target.value })}
        />
      </div>
      <h3 className="text-lg font-semibold mt-4">Products</h3>
      {products.map((product, index) => (
        <div key={product.id} className="flex gap-2 mt-2">
          <input
            type="text"
            placeholder="Product Name"
            className="border p-2 rounded w-full"
            value={product.name}
            onChange={(e) => handleProductChange(index, "name", e.target.value)}
          />
          <input
            type="number"
            placeholder="Quantity"
            className="border p-2 rounded w-20"
            value={product.quantity}
            onChange={(e) => handleProductChange(index, "quantity", e.target.value)}
          />
          <input
            type="number"
            placeholder="Price"
            className="border p-2 rounded w-24"
            value={product.price}
            onChange={(e) => handleProductChange(index, "price", e.target.value)}
          />
          <span className="p-2">${product.total}</span>
          <button onClick={() => removeProduct(product.id)} className="text-red-500">✖</button>
        </div>
      ))}
      <button
        onClick={addProduct}
        className="mt-2 bg-blue-500 text-white py-2 px-4 rounded"
      >
        + Add Product
      </button>
      <div className="mt-4">
        <p>Subtotal: ${subTotal.toFixed(2)}</p>
        <p>Tax (19%): ${tax.toFixed(2)}</p>
        <p className="font-bold">Total: ${grandTotal.toFixed(2)}</p>
      </div>
      <button className="mt-4 bg-green-500 text-white py-2 px-6 rounded">
        Save Invoice
      </button>
    </div>
  );
};

export default BillGenerator;
