import React, { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

const DateSort = () => {
  // eslint-disable-next-line
  const [products, setProducts] = useState(
    [
    {
      id: "1000",
      code: "f230fh0g3",
      name: "Bamboo Watch",
      description: "Product Description",
      image: "bamboo-watch.jpg",
      price: 65,
      category: "Accessories",
      quantity: 24,
      inventoryStatus: "INSTOCK",
      rating: 5,
    //   date: "09-02-2024",
    date: "2024-02-09",
    },
    {
      id: "1001",
      code: "a32sd9we4",
      name: "Leather Wallet",
      description: "Premium Leather Wallet",
      image: "leather-wallet.jpg",
      price: 40,
      category: "Accessories",
      quantity: 15,
      inventoryStatus: "INSTOCK",
      rating: 4,
    //   date: "12-01-2024",
    date: "2024-01-12",
    },
    {
      id: "1002",
      code: "8sjfh29de",
      name: "Smartphone Stand",
      description: "Adjustable Phone Stand",
      image: "phone-stand.jpg",
      price: 20,
      category: "Electronics",
      quantity: 50,
      inventoryStatus: "INSTOCK",
      rating: 4.5,
    //   date: "15-02-2024",
    date: "2024-02-15",
    },
    {
      id: "1003",
      code: "5adf8c37k",
      name: "Canvas Backpack",
      description: "Stylish Canvas Backpack",
      image: "canvas-backpack.jpg",
      price: 80,
      category: "Fashion",
      quantity: 10,
      inventoryStatus: "INSTOCK",
      rating: 4,
    //   date: "17-12-2024",
    date: "2024-12-17",
    },
    {
      id: "1004",
      code: "p92jsdf62",
      name: "Wireless Earbuds",
      description: "Noise-Canceling Earbuds",
      image: "wireless-earbuds.jpg",
      price: 90,
      category: "Electronics",
      quantity: 30,
      inventoryStatus: "INSTOCK",
      rating: 4.8,
    //   date: "17-11-2023",
    date: "2024-11-17",
    },
  ]);

  

  return (
    <div className="card">
      <DataTable value={products} tableStyle={{ minWidth: "50rem" }}>
        <Column
          field="date"
          header="date"
          sortable
          style={{ width: "25%" }}
        ></Column>
        <Column
          field="code"
          header="Code"
          sortable
          style={{ width: "25%" }}
        ></Column>
        <Column
          field="name"
          header="Name"
          sortable
          style={{ width: "25%" }}
        ></Column>
        <Column
          field="category"
          header="Category"
          sortable
          style={{ width: "25%" }}
        ></Column>
        <Column
          field="quantity"
          header="Quantity"
          sortable
          style={{ width: "25%" }}
        ></Column>
      </DataTable>
    </div>
  );
};

export default DateSort;
