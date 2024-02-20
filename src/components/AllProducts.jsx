import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteIcon from "@mui/icons-material/DeleteOutline";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import {
  setEditable,
  setEditableRow,
  setToEdit,
} from "../store/slice/EditProductSlice";
import { toast } from "react-toastify";

const AllProducts = () => {
  const dispatch = useDispatch();
  const { editable, editableRow } = useSelector((state) => state.editProduct);
  const allData = JSON.parse(localStorage.getItem("allProducts"));

  const columns = [
    { field: "title", headerName: "Title", editable: editable, width: 180 },
    { field: "image", headerName: "Image", width: 180, renderCell: ImageCell },
    { field: "price", headerName: "Price", editable: editable, width: 180 },
    { field: "category", headerName: "Category", width: 180 },
    {
      field: "Action",
      headerName: "Action",
      sortable: false,
      width: 100,
      renderCell: (params) => (
        <>
          {editableRow === params.row.id ? (
            <>
              <i
                onClick={() => {
                  dispatch(setEditable(!editable));
                  dispatch(setEditableRow(""));
                  dispatch(setToEdit(params.row));
                }}
                style={{ display: !editable ? "none" : "block" }}
              >
                <CheckCircleOutlineIcon />
              </i>
              <i
                onClick={() => {
                  dispatch(setEditable(!editable));
                  dispatch(setEditableRow(""));
                }}
                style={{ display: !editable ? "none" : "block" }}
              >
                <HighlightOffIcon />
              </i>
            </>
          ) : (
            <>
              <i
                onClick={() => {
                  dispatch(setEditable(!editable));
                  dispatch(setEditableRow(params.row.id));
                }}
                style={{
                  display: editableRow === params.row.id ? "none" : "block",
                }}
              >
                <EditNoteIcon />
              </i>
              <i
                onClick={() => {
                  const existingData = JSON.parse(
                    localStorage.getItem("allProducts")
                  );
                  existingData.splice(params.row.id, 1);
                  localStorage.setItem(
                    "allProducts",
                    JSON.stringify(existingData)
                  );
                  toast.success("Deleted Successfully");
                }}
                style={{
                  display: editableRow === params.row.id ? "none" : "block",
                }}
              >
                <DeleteIcon />
              </i>
            </>
          )}
        </>
      ),
    },
  ];
  const rows = allData?.map((product, id) => ({
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
