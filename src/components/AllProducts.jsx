import React, { useEffect, useState } from "react";
import { fetchData } from "../store/slice/FakeStoreSlice";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteIcon from "@mui/icons-material/DeleteOutline";

const AllProducts = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.fakeStore);
  const [editable, setEditable] = useState(false);
  const getData = () => {
    dispatch(fetchData());
  };
  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, []);

  const columns = [
    { field: "title", headerName: "Title", editable: { editable }, width: 180 },
    { field: "image", headerName: "Image", width: 180, renderCell: ImageCell },
    { field: "price", headerName: "Price", editable: { editable }, width: 180 },
    { field: "category", headerName: "Category", width: 180 },
    {
      field: "Action",
      headerName: "Action",
      sortable: false,
      width: 100,
      renderCell: (params) => (
        <>
          <i onClick={() => setEditable(true)}>
            <EditNoteIcon />
          </i>
          <i>
            <DeleteIcon />
          </i>
          &nbsp;
        </>
      ),
    },
  ];
  const rows = data?.map((product, id) => ({
    id: id,
    title: product.title,
    image: product.image,
    price: product.price,
    category: product.category,
  }));

  function ImageCell(params) {
    return (
      <img
        src={params.value}
        alt="Product"
        style={{ width: "100px", height: "90px", objectFit: "contain" }}
      />
    );
  }

  function getRowHeight(params) {
    return 100;
  }

  return (
    <div>
      <h3>All Products</h3>
      <div style={{ width: "100%" }}>
        <DataGrid
          rows={rows}
          getRowHeight={getRowHeight}
          columns={columns}
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
  );
};

export default AllProducts;
