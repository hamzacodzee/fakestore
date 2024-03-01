import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";

const MultipleFilter = () => {
  const [filterRows, setFilterRows] = useState([]);

  const productData = [
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
      date: "2024-02-15",
    },
    {
      id: "1003",
      code: "5adf8c37k",
      name: "Canvas Backpack",
      description: "Stylish Canvas Phone Backcover",
      image: "canvas-phone-backcover.jpg",
      price: 80,
      category: "Fashion",
      quantity: 10,
      inventoryStatus: "INSTOCK",
      rating: 4,
      date: "2024-12-17",
    },
    {
      id: "1004",
      code: "5adf8c37k",
      name: "Canvas Bamboo Backpack",
      description: "Stylish Canvas Backpack",
      image: "canvas-backpack.jpg",
      price: 80,
      category: "Fashion",
      quantity: 10,
      inventoryStatus: "INSTOCK",
      rating: 4,
      date: "2023-12-16",
    },
    {
      id: "1005",
      code: "p92jsdf62",
      name: "Wireless Earbuds",
      description: "Noise-Canceling Earbuds",
      image: "wireless-earbuds.jpg",
      price: 90,
      category: "Electronics",
      quantity: 30,
      inventoryStatus: "INSTOCK",
      rating: 4.8,
      date: "2024-11-17",
    },
    {
      id: "1006",
      code: "5adf8c37k",
      name: "Canvas Backpack",
      description: "Stylish Canvas Backpack",
      image: "canvas-backpack.jpg",
      price: 80,
      category: "Fashion",
      quantity: 10,
      inventoryStatus: "INSTOCK",
      rating: 4,
      date: "2023-12-18",
      //date: "18-12-2023",
    },
  ];

  const fieldNames = Object.keys(productData[0]);
  const [rows, setRows] = useState(productData);

  const [searching, setSearching] = useState(
    Object.fromEntries(fieldNames.map((key) => [key, ""]))
  );
  // console.log("searching", searching);

  const fieldArray = fieldNames.map((element) => ({
    field: element,
    header: element,
    width: "150",
  }));

  useEffect(() => {
    const data = filterRows.length > 0  ? filterRows : productData 
    setRows(
      data?.map((product) => {
        const rowData = {};
        fieldNames.forEach((fieldName) => {
          rowData[fieldName] = product[fieldName];
        });
        return {
          ...rowData,
          id: product.id,
        };
      })
    );
    // eslint-disable-next-line
  }, [filterRows]);

  const handleSearch = (e) => {
    console.log(e.target.value);
    setSearching({ ...searching, [e.target.name]: e.target.value });

    const searchFor = { ...searching, [e.target.name]: e.target.value };
    console.log("searchFor", searchFor);

    const oldLength = Object.entries(searching).reduce((acc, [key, value]) => {
      // console.log("value.length", value.length, "value", value);
      acc[key] = value.length;
      return acc;
    }, {});

    const newLength = Object.entries(searchFor).reduce((acc, [key, value]) => {
      // console.log("value.length", value.length, "value", value);
      acc[key] = value.length;
      return acc;
    }, {});

    const isOldLengthGreaterThanNewLength = Object.keys(oldLength).some(
      (key) => oldLength[key] > newLength[key]
    );

    //instead of saving 1 search textbox value, save all textbox values
    //map all saved searchFor values in data
    //when all search textbox values is null then assign productData
    //Take FilterRow When multiple Search Filter
    // take data on length decrement as well as null values of textbox

    const flgAllValuesNull = Object.entries(searching).every(
      ([key, value]) => value === ""
    );

    // console.log(
    //   "searchIn",
    //   flgAllValuesNull || isOldLengthGreaterThanNewLength
    // );
    const searchIn =
      flgAllValuesNull || isOldLengthGreaterThanNewLength
        ? productData
        : filterRows;
    const filteredRows = searchIn.filter((product) => {
      return Object.entries(searchFor).every(([key, value]) => {
        return (
          !value ||
          product[key]?.toString().toLowerCase().includes(value?.toLowerCase())
        );
      });
    });
    console.log("filterRows", filteredRows);

    setFilterRows(filteredRows);
  };

  return (
    <div>
      MultipleFilter
      <div>
        <div className="table-responsive">
          <div>
            <div>
              <div style={{ margin: "2rem", display: "ruby-text" }}>
                {fieldNames.map((item, index) => (
                  <div key={index} style={{ margin: "1rem" }}>
                    <label style={{ margin: "1rem" }}>
                      {item.replace(/\b\w/g, (char) => char.toUpperCase())}:
                    </label>
                    <input
                      type="text"
                      name={item}
                      id={item}
                      onChange={handleSearch}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div>
          <DataGrid
            rows={rows}
            columns={fieldArray}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10]}
            sx={{
              boxShadow: 2,
              border: 2,
              m: 5,
              borderColor: "light",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default MultipleFilter;
