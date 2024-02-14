import React from "react";
import DashboardLayout from "./DashboardLayout";
import { DataGrid } from "@mui/x-data-grid";

const ViewAllProducts = () => {
  const getAllProducts = () => {
    const result = localStorage.getItem("products");
    return JSON.parse(result) || [];
  };

  const products = getAllProducts();
  const columnsName = ["title", "description", "category", "price"];
  const columns = columnsName.map((item) => ({
    field: item,
    headerName: item[0].toUpperCase() + item.slice(1),
  }));

  const rows = products.map((product, index) => ({
    id: index,
    title: product.title,
    description: product.description,
    category: product.category,
    price: product.price,
  }));

  return (
    <DashboardLayout>
      <div>
        <h1>View All Products</h1>

        <div style={{ width: "100%", textAlign: "center" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10]}
            sx={{
              boxShadow: 2,

              m: 5,
              textAlign: "center",

              // '& MuiTablePagination-displayedRows': {
              //   backgroundColor: 'white',
              //   color:'black',
              // },
            }}
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ViewAllProducts;
