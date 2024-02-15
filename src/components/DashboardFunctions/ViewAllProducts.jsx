import React, { useEffect } from "react";
import DashboardLayout from "./DashboardLayout";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/DeleteOutline";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { Box, Button, Modal } from "@mui/material";
import AddProduct from "./AddProduct";
import { useDispatch, useSelector } from "react-redux";
import {
  setOpen,
  getData,
  setEdit,
  setOpenEdit,
} from "../../store/slice/AddModalSlice";
import EditProduct from "./EditProduct";
import { toast } from "react-toastify";

const ViewAllProducts = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.addModal);

  useEffect(() => {
    dispatch(getData());
  }, [dispatch]);

  const deleteProduct = (id) => {
    const existingProducts = JSON.parse(localStorage.getItem("products")) || [];
    existingProducts.splice(id, 1);
    localStorage.setItem("products", JSON.stringify(existingProducts));
    dispatch(getData());
    toast.success("Deleted Successfully");
  };

  const handleOpenEdit = (product) => {
    dispatch(setOpenEdit(true));
    dispatch(setEdit({ product }));
  };

  const columnsName = ["title", "description", "category", "price"];
  const columns = columnsName.map((item) => ({
    field: item,
    headerName: item[0].toUpperCase() + item.slice(1),
    width: item === "title" ? 150 : item === "description" ? 200 : 100,
  }));
  columns.push({
    field: "Action",
    headerName: "Action",
    sortable: false,
    width: 100,
    renderCell: (params) => (
      <>
        <i>
          <EditNoteIcon onClick={() => handleOpenEdit(params.row)} />
        </i>
        <i>
          <DeleteIcon onClick={() => deleteProduct(params.row.id)} />
        </i>
        &nbsp;
      </>
    ),
  });

  const rows = products.map((product, index) => ({
    id: index,
    title: product.title,
    description: product.description,
    category: product.category,
    price: product.price,
  }));

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const AddModal = () => {
    const dispatch = useDispatch();
    const open = useSelector((state) => state.addModal.open);
    const handleOpen = () => dispatch(setOpen(true));
    const handleClose = () => dispatch(setOpen(false));

    return (
      <div>
        <Button onClick={handleOpen}>+ Add Product</Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={modalStyle}>
            <AddProduct />
          </Box>
        </Modal>
      </div>
    );
  };
  const EditModal = () => {
    const dispatch = useDispatch();
    const openEdit = useSelector((state) => state.addModal.openEdit);

    const handleCloseEdit = () => dispatch(setOpenEdit(false));

    return (
      <div>
        <Modal
          open={openEdit}
          onClose={handleCloseEdit}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={modalStyle}>
            <EditProduct />
          </Box>
        </Modal>
      </div>
    );
  };

  return (
    <DashboardLayout>
      <div>
        <h1>View All Products</h1>
        <AddModal />
        <EditModal />
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
